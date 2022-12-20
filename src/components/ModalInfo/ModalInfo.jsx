import React from "react";

const ModalInfo = ({ onModalAction, onModalInfo, contentOne, contentTwo, modalRef }) => {
  return (
    <section onClick={onModalInfo} ref={modalRef} className="absolute inset-0">
      <h2 className="ir">모달 설정창</h2>
      <div className="absolute bottom-0 left-[50%] translate-x-[-50%] bg-[#d4b886] w-[39rem] rounded-t-[1rem] mx-auto">
        <button className="bg-[#DBDBDB] border-[0.2rem] rounded-[0.5rem] block w-[5rem] mx-auto my-[1.6rem]"></button>
        <button
          onClick={() => {
            alert("준비중입니다.");
          }}
          className="block p-[1.25rem] w-[100%] text-left pl-[2.6rem]"
        >
          {contentOne}
        </button>
        <button
          onClick={onModalAction}
          className="border-t-[0.1rem] p-[1.25rem]  w-[100%] text-left pl-[2.6rem] hover:text-[#ff0000]"
        >
          {contentTwo}
        </button>
      </div>
    </section>
  );
};

export default ModalInfo;
