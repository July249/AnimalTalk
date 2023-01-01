import React, { useEffect, useRef, useState } from "react";
import { HeaderBasic } from "../../shared/Header/HeaderBasic";
import Post from "../../shared/Post/Post";
import PostChatList from "./PostChatList";
import PostDetailForm from "./PostDetailForm";
import PostChatModal from "./PostChatModal";
import axios from "../../api/axios";
import { useLocation } from "react-router-dom";

const PostDetail = () => {
  const location = useLocation();
  const postId = location.state.post.id;

  const [post, setPost] = useState(null);

  const [isModal, setIsModal] = useState(false);
  const [userId, setUserId] = useState(null);
  const [commentId, setCommentId] = useState(null);
  const [commentList, setCommentList] = useState([]);
  const [isUpload, setIsUpload] = useState(true);

  const modalRef = useRef();

  useEffect(() => {
    if (!isUpload) return;
    const token = localStorage.getItem("token");

    // 채팅 정보 업데이트
    const getChatList = async () => {
      try {
        const res = await axios.get(`/post/${postId}/comments/?limit=${Infinity}&skip=0`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status !== 200) throw new Error(res.status, "통신에 실패했습니다.");
        setCommentList(res.data.comments);
      } catch (err) {
        console.log(err);
      }
    };
    getChatList();
    setIsUpload(false);

    // 게시글 정보 업데이트
    const getPost = async () => {
      try {
        const res = await axios.get(`/post/${postId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status !== 200) throw new Error(res.status, "통신에 실패했습니다.");
        setPost(res.data.post);
      } catch (err) {
        console.log(err);
      }
    };
    getPost();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpload]);

  return (
    <>
      {!!post && (
        <div className="page">
          <HeaderBasic />

          <main>
            <Post {...{ post }} />
            <ul className="border-t-[0.1rem] px-[1.6rem] py-[2rem] border-cst-light-gray">
              {!!commentList.length &&
                commentList.map((comment) => (
                  <PostChatList
                    key={crypto.randomUUID()}
                    {...{ comment }}
                    {...{ setCommentId }}
                    {...{ setIsModal }}
                    {...{ setUserId }}
                  />
                ))}
            </ul>
          </main>

          <PostDetailForm postId={post.id} {...{ setIsUpload }} />

          {/* Note: modal에 comment list의 author._id를 내려줘야 함 */}
          {isModal ? (
            <PostChatModal
              ref={modalRef}
              {...{ setIsModal }}
              {...{ userId }}
              {...{ commentId }}
              {...{ setIsUpload }}
              postId={post.id}
            />
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
};

export default PostDetail;
