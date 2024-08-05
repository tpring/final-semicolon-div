import Down from '@/assets/images/common/Down';
import Up from '@/assets/images/common/Up';
import X from '@/assets/images/common/X';
import { Dispatch, MouseEventHandler, SetStateAction, useState } from 'react';
import { toast } from 'react-toastify';

type SelectTagInputProps = {
  tagList: Ttag[];
  setTagList: Dispatch<SetStateAction<Array<Ttag>>>;
};

const SelectTagInput = ({ tagList, setTagList }: SelectTagInputProps) => {
  const [openTag, setOpenTag] = useState<boolean>(false);
  const [selectedCount, setSelectedCount] = useState<number>(0);

  const handleOpenTag: MouseEventHandler<HTMLDivElement> = (event) => {
    setOpenTag((prev) => !prev);
  };

  const handleSelect = (tag: Ttag): void => {
    if (selectedCount >= 3) {
      toast.error('태그는 3개까지만 선택이 가능합니다.', { autoClose: 1500, hideProgressBar: true });
      return;
    }
    setTagList(
      tagList.map((TAG) => {
        return TAG.name === tag.name ? { name: tag.name, selected: !tag.selected } : TAG;
      })
    );
  };

  const handleRemoveTag = (tag: Ttag): void => {
    setTagList(
      tagList.map((TAG) => {
        return TAG.name === tag.name ? { name: tag.name, selected: !tag.selected } : TAG;
      })
    );
  };

  return (
    <div
      className=" w-full h-[51px] flex flex-col text-neutral-900 text-body1 border rounded-xl border-neutral-100 focus:border-main-400 outline-none relative"
      id="tag"
      onClick={handleOpenTag}
    >
      <div className=" h-[51px] flex items-center gap-2 px-6 py-3">
        <p className={`${selectedCount > 0 ? 'hidden' : ''} text-neutral-500`}> 태그를 선택하세요!(최대3개)</p>
        {tagList
          .filter((tag) => tag.selected === true)
          .map((tag) => {
            return (
              <div
                key={'selected' + tag.name}
                className="flex items-center text-subtitle2 font-medium gap-1 bg-neutral-50 px-3 py-1 rounded"
              >
                <span>#{tag.name}</span>
                <button
                  type="button"
                  className="w-4 h-4 p-1 active:bg-neutral-500"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleRemoveTag(tag);
                    setSelectedCount((prev) => prev - 1);
                  }}
                >
                  <X width={8} height={8} />
                </button>
              </div>
            );
          })}
        <div className="ml-auto">{openTag ? <Up /> : <Down />}</div>
      </div>

      <div className="relative z-10">
        <ul
          className={`${openTag ? '' : 'hidden '} w-full h-[271px] mt-2 px-6 flex flex-col gap-2 absolute overflow-y-auto bg-white py-3 border rounded-xl`}
        >
          {tagList
            .filter((tag) => tag.selected === false)
            .map((tag) => {
              return (
                <li
                  className=""
                  key={tag.name}
                  onClick={() => {
                    handleSelect(tag);
                    setSelectedCount((prev) => prev + 1);
                  }}
                >
                  {tag.name}
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default SelectTagInput;
