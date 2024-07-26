import { TBOARD_ITEM } from '@/types/upsert';

type UpsertThemeProps = { theme: TBOARD_ITEM };
const user = 'user';
const UpsertTheme = ({ theme }: UpsertThemeProps) => {
  return (
    <div className="my-5 ">
      <h2 className="text-[#727272] font-semibold">{theme.content ? user + theme.content : theme.content}</h2>
    </div>
  );
};

export default UpsertTheme;
