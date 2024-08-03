import ArchiveCategoryIcon from '@/assets/images/archive/ArchiveCategoryIcon';
import ForumCategoryIcon from '@/assets/images/forum/ForumCategoryIcon';
import GradCap from '@/assets/images/qna/GradCap';
import { BOARD_LIST } from '@/constants/upsert';
import { useAuth } from '@/context/auth.context';
import { usePostingCategoryStore } from '@/store/postingCategoryStore';

// type UpsertThemeProps = { theme: TBOARD_ITEM };

const UpsertTheme = () => {
  const { me: user } = useAuth();
  const { categoryGroup } = usePostingCategoryStore();

  return (
    <div className="my-5 ">
      <h2 className="text-neutral-900 flex text-h3 font-bold h-[38px] w-full m-0 mb-2">
        {categoryGroup.content}
        <span className="content-center">
          {categoryGroup.category === BOARD_LIST[0].category ? (
            <ForumCategoryIcon />
          ) : categoryGroup.category === BOARD_LIST[1].category ? (
            <GradCap />
          ) : categoryGroup.category === BOARD_LIST[2].category ? (
            <ArchiveCategoryIcon />
          ) : null}
        </span>
      </h2>
      <h3 className="text-neutral-900 text-body1 h-[27px] w-[351px]">
        <div className="text-neutral-900 text-subtitle1">
          {user?.email?.split('@')[0]}님 &lt;div&gt;에 오신 걸을 환영합니다!✨
        </div>
      </h3>
    </div>
  );
};

export default UpsertTheme;
