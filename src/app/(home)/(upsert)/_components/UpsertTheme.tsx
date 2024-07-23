import { TBOARD_ITEM } from '@/types/upsert';

type UpsertThemeProps = { theme: TBOARD_ITEM };

const UpsertTheme = ({ theme }: UpsertThemeProps) => {
  return (
    <div className="my-5">
      <h1>{theme.title}</h1>
      <h1>{theme.content}</h1>
    </div>
  );
};

export default UpsertTheme;
