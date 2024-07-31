import React from 'react';

const SearchPostCard = () => {
  /* 
제목 , 카테고리,(포럼은 서브 카테고리), 내용, 테그,

유저 닉네임, 프로필 이미지, 
좋아요 수, 댓글 수, 작성 시간, 
*/
  return (
    <div className="w-[560px] h-[316px] border border-main-400 p-4 flex flex-col">
      <div className="flex-1">
        <p>카테고리('qna' | 'forum' | 'archive')</p>
        <p>(포럼은 서브 카테고리)</p>
        <p>제목</p>
        <p>내용</p>
        <p>테그</p>
      </div>
      <div className="mt-auto">
        <div className="flex">
          <span>유저 프로필</span>
          <span> | 프로필 닉네임</span>
        </div>
        <div className="flex justify-between mt-2">
          <div>
            <span>♡(임시) (숫자)</span>
            <span> | 💭(임시) (숫자)</span>
          </div>
          <div>
            <span>작성 시간</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPostCard;
