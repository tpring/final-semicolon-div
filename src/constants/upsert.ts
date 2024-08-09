import { TcategoryEN, TcategoryKR } from '@/types/upsert';

//카테고리 선택 문구
export const CATEGORY_ALERT_TEXT = '게시판을 선택해 주세요';
export const SUB_CATEGORY_TEXT = '포럼 카테고리를 선택해주세요';
//메인 카테고리 dropdown 목록
export const BOARD_LIST = [
  {
    category: '포럼',
    content: '디브 유어 포럼'
  },
  { category: 'QnA', content: 'QnA 질문 게시판이에요' },
  { category: '라이브러리', content: '내 코드를 소개합니다!' }
] as const;

//카테고리 서브타이틀 포럼-qna-라이브러리 순
export const CATEGORY_SUBTITLE = [
  '님, 소통으로 하나가 되어 보세요.',
  '님 궁금한 게 생겼나요? 디브 회원들과 해답을 찾아 보세요!',
  '님의 코드여정을 공유하고 의견을 나눠 보세요.'
];

//포럼 포스트 선택시 dropdown 목록
export const FORUM_SUB_CATEGORY_LIST = ['일상', '커리어', '자기개발', '토론', '코드 리뷰'] as const;

//메인 카테고리 목록(영어, 한글)
export const CATEGORY_LIST_EN: TcategoryEN[] = ['forum', 'qna', 'archive'];
export const CATEGORY_LIST_KR: TcategoryKR[] = ['포럼', 'QnA', '라이브러리'];

//폼 유효성 검사 시퀀스
export const VALIDATION_SEQUENCE = ['category', 'title', 'content'];
export const VALIDATION_SEQUENCE_KR = ['카테고리', '제목', '본문'];

//로그인 경고문
export const LOGIN_ALERT = '로그인이 필요한 기능입니다! 로그인 페이지로 이동합니다';

//이미지 업로드 로딩문구
export const IMAGE_UPLOAD_TEXT = '![Image](이미지 업로드 중!)';

//수파베이스 글 작성, 수정 이미지 경로
export const POST_IMAGE_URL = 'https://jtorewqfshytdtgldztv.supabase.co/storage/v1/object/public/';

//작성페이지 확인 메세지
export const POST_APPROVE_TEXT = '게시글을 등록할까요?';

//작성페이지 취소 메세지
export const POST_CANCLE_TEXT = '게시글 작성을 중단할까요?';

//수정 페이지 확인 메세지
export const EDIT_APPROVE_TEXT = '게시글을 수정할까요?';

//작성 페이지 취소 메세지
export const EDIT_CANCLE_TEXT = '게시글 수정을 중단할까요?';

//작성 페이지 삭제 확인 메세지
export const POST_DELETE_TEXT = '게시글을 삭제하시겠습니까?';

//댓글 작성 확인 메세지
export const POST_COMMENT_APPROVE_TEXT = '댓글을 등록할까요?';

//댓글 작성 취소 메세지
export const POST_COMMENT_CANCLE_TEXT = '댓글 작성을 중단할까요?';

//댓글 수정 확인 메세지
export const EDIT_COMMENT_APPROVE_TEXT = '댓글을 수정할까요?';

//댓글 수정 취소 메세지
export const EDIT_COMMENT_CANCLE_TEXT = '댓글 수정을 중단할까요?';

//댓글 삭제 확인 메세지
export const POST_COMMENT_DELETE_TEXT = '댓글을 삭제 하시겠습니까?';

//채택 메세지
export const SELECT_COMMENT_TEXT = '채택하시겠습니까?';
