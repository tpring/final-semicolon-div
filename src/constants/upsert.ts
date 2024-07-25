//메인 카테고리 dropdown 목록
export const BOARD_LIST = [
  {
    category: '포럼',
    content: '님! 다양한 개발자들을 만나고 지식의 폭을 넓혀 보세요!'
  },
  { category: 'Q&A', content: '님! Q&A에서 최고의 개발자들과 함께 궁금증을 해결하세요!' },
  { category: '아카이브', content: '님! 컴포넌트를 공유하세요!' }
] as const;

//포럼 포스트 선택시 dropdown 목록
export const FORUM_SUB_CATEGORY_LIST = ['일상', '커리어', '자기개발', '토론', '코드 리뷰'] as const;

//메인 카테고리 목록(영어, 한글)
export const CATEGORY_LIST_EN = ['forum', 'qna', 'archive'];
export const CATEGORY_LIST_KR = ['포럼', 'Q&A', '아카이브'];

//폼 유효성 검사 시퀀스
export const VALIDATION_SEQUENCE = ['category', 'forum_category', 'title', 'content'];
