import ArchiveCategoryIcon from '@/assets/images/archive/ArchiveCategoryIcon';
import ForumCategoryIcon from '@/assets/images/forum/ForumCategoryIcon';
import GradCap from '@/assets/images/qna/GradCap';
import Twinkle from '@/assets/images/upsert_image/Twinkle';
import { BOARD_LIST, CATEGORY_SUBTITLE } from '@/constants/upsert';
import { useAuth } from '@/context/auth.context';
import { usePostingCategoryStore } from '@/store/postingCategoryStore';

const UpsertTheme = () => {
  const { userData } = useAuth();
  const { categoryGroup } = usePostingCategoryStore();

  return (
    <div className="my-5 ">
      <h2 className="text-neutral-900 flex text-h3 font-bold h-[38px] w-full m-0 mb-2">
        {categoryGroup.content === '' ? '코드로 그려가는 이야기' : categoryGroup.content}
        <span className="content-center ml-2">
          {categoryGroup.category === BOARD_LIST[0].category ? (
            <ForumCategoryIcon />
          ) : categoryGroup.category === BOARD_LIST[1].category ? (
            <GradCap />
          ) : categoryGroup.category === BOARD_LIST[2].category ? (
            <ArchiveCategoryIcon />
          ) : (
            <Twinkle />
          )}
        </span>
      </h2>
      <h3 className="text-neutral-900 text-body1 h-[27px] ">
        <div className="text-neutral-900 text-subtitle1">
          <span className="text-subtitle1 font-medium"> {userData?.nickname}</span>
          <span className="text-body1">
            {categoryGroup.category && userData?.nickname
              ? ' ' + CATEGORY_SUBTITLE[BOARD_LIST.findIndex((BOARD) => BOARD.category === categoryGroup.category)]
              : ' 님, <div>에 오신 것을 환영합니다!'}
          </span>
        </div>
      </h3>
    </div>
  );
};

export default UpsertTheme;
