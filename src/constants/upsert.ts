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
export const VALIDATION_SEQUENCE_KR = ['카테고리', '포럼 카테고리', '제목', '본문'];

//로그인 경고문
export const LOGIN_ALERT = '로그인이 필요한 기능입니다! 로그인 페이지로 이동합니다';

//이미지 업로드 로딩문구
export const IMAGE_UPLOAD_TEXT = '![Image](이미지 업로드 중!)';
