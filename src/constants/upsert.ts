//메인 카테고리 dropdown 목록
export const BOARD_LIST = [
  {
    category: '포럼',
    content: '코드로 그려가는 이야기'
  },
  { category: 'Q&A', content: 'QnA질문 게시판이에요' },
  { category: '아카이브', content: '다채로운 코드의 매력!' }
] as const;

//포럼 포스트 선택시 dropdown 목록
export const FORUM_SUB_CATEGORY_LIST = ['일상', '커리어', '자기개발', '토론', '코드 리뷰'] as const;

//메인 카테고리 목록(영어, 한글)
export const CATEGORY_LIST_EN = ['forum', 'qna', 'archive'];
export const CATEGORY_LIST_KR = ['포럼', 'Q&A', '아카이브'];

//폼 유효성 검사 시퀀스
export const VALIDATION_SEQUENCE = ['category', 'title', 'content'];
export const VALIDATION_SEQUENCE_KR = ['카테고리', '제목', '본문'];

//로그인 경고문
export const LOGIN_ALERT = '로그인이 필요한 기능입니다! 로그인 페이지로 이동합니다';

//이미지 업로드 로딩문구
export const IMAGE_UPLOAD_TEXT = '![Image](이미지 업로드 중!)';

//수파베이스 글 작성, 수정 이미지 경로
export const POST_IMAGE_URL = 'https://jtorewqfshytdtgldztv.supabase.co/storage/v1/object/public/';
