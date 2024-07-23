import { TarchivePost, TforumPost, TqnaPost } from '@/types/upsert';

export const BOARD_LIST = [
  {
    category: '포럼',
    title: '소통으로 하나가 되는 시간',
    content: '다양한 개발자들을 만나고 지식의 폭을 넓혀 보세요!'
  },
  { category: 'Q&A', title: '질문하기', content: 'Q&A에서 최고의 개발자들과 함께 궁금증을 해결하세요!' },
  { category: '아카이브', title: '아카이브?', content: '컴포넌트를 공유하고 북마크로 추가해보세요?' }
] as const;

//포럼 포스트 dropdown 목록
export const FORUM_SUB_CATEGORY_LIST = ['전체', '일상', '커리어', '자기개발', '토론', '코드 리뷰'] as const;

//test Data 입니다.
export const forumPostData: TforumPost = {
  category: 'forum',
  content: '포럼 글인데 수정페이지 잘 동작할까요?',
  created_at: '몇시 몇분',
  forum_category: '일상',
  id: '글 아이디',
  title: '포럼 글제목입니다.',
  updated_at: '수정 된 시간',
  user_id: '유저 아이디'
};
export const archivePostData: TarchivePost = {
  category: 'archive',
  content: '아카이브 글인데 수정페이지 잘 동작할까요?',
  created_at: '몇시 몇분',
  id: '글 아이디',
  title: '아카이브 글제목입니다.',
  updated_at: '수정 된 시간',
  user_id: '유저 아이디'
};
export const qnaPostData: TqnaPost = {
  category: 'qna',
  content: 'Q&A 글인데 수정페이지 잘 동작할까요?',
  created_at: '몇시 몇분',
  id: '글 아이디',
  selected_comment: '채택된 답변 아이디',
  title: 'Q&A 글제목입니다.',
  updated_at: '수정 된 시간',
  user_id: '유저 아이디'
};
