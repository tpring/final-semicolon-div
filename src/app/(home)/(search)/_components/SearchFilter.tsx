import Down from '@/assets/images/common/Down';
import SortSetting from '@/assets/images/common/SortSetting';
import { useState, useEffect, useRef } from 'react';

type SearchFilterProps = {
  selectedCategory: 'all' | 'qna' | 'forum' | 'archive';
  selectedForumCategory: string | null;
  selectedType: 'time' | 'like' | 'comment';
  onCategoryChange: (category: 'all' | 'qna' | 'forum' | 'archive') => void;
  onForumCategoryChange: (category: string | null) => void;
  onTypeChange: (type: 'time' | 'like' | 'comment') => void;
};

const SearchFilter = ({
  selectedCategory,
  selectedForumCategory,
  selectedType,
  onCategoryChange,
  onForumCategoryChange,
  onTypeChange
}: SearchFilterProps) => {
  const [showForumMenu, setShowForumMenu] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const forumMenuRef = useRef<HTMLDivElement | null>(null);
  const menuButtonRef = useRef<HTMLDivElement | null>(null);

  const toggleForumMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    setShowForumMenu(!showForumMenu);
    const value = (e.target as HTMLButtonElement).value;
    if (value === '전체') {
      onCategoryChange('forum');
      onForumCategoryChange(null);
    } else if (value) {
      onCategoryChange('forum');
      onForumCategoryChange(value);
    } else {
      onCategoryChange('forum');
    }
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    const handleMenuClickOutside = (event: MouseEvent) => {
      if (menuButtonRef.current && !menuButtonRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    const handleForumMenuClickOutside = (event: MouseEvent) => {
      if (forumMenuRef.current && !forumMenuRef.current.contains(event.target as Node)) {
        setShowForumMenu(false);
      }
    };

    document.addEventListener('mousedown', handleMenuClickOutside);
    document.addEventListener('mousedown', handleForumMenuClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleMenuClickOutside);
      document.removeEventListener('mousedown', handleForumMenuClickOutside);
    };
  }, []);

  return (
    <div>
      <div className="p-[28px_0px_36px] flex justify-between ">
        <div className="flex">
          <button
            onClick={() => {
              onCategoryChange('all');
              onForumCategoryChange(null);
            }}
            className={`w-[87px] h-[40px] mr-6 ${
              selectedCategory === 'all'
                ? 'text-subtitle1 font-medium text-main-400 border border-main-400 rounded-lg bg-main-50'
                : 'text-subtitle1 font-medium text-neutral-700 border border-neutral-100 rounded-lg bg-white'
            }`}
          >
            전체
          </button>
          <button
            onClick={() => {
              onCategoryChange('qna');
              onForumCategoryChange(null);
            }}
            className={`w-[87px] h-[40px] mr-6 ${
              selectedCategory === 'qna'
                ? 'text-subtitle1 font-medium text-main-400 border border-main-400 rounded-lg bg-main-50'
                : 'text-subtitle1 font-medium text-neutral-700 border border-neutral-100 rounded-lg bg-white'
            }`}
          >
            Q&A
          </button>
          <div>
            <button
              onClick={toggleForumMenu}
              className={`w-[118px] h-[40px] p-[8px_16px_8px_16px] mr-6 flex items-center justify-between ${
                selectedCategory === 'forum'
                  ? 'text-subtitle1 font-medium text-main-400 border border-main-400 rounded-lg bg-main-50'
                  : 'text-subtitle1 font-medium text-neutral-700 border border-neutral-100 rounded-lg bg-white'
              }`}
            >
              {selectedForumCategory === '전체' ? (
                <p className="w-[64px]">포럼</p>
              ) : selectedForumCategory === '일상' ? (
                <p className="w-[64px]">일상</p>
              ) : selectedForumCategory === '커리어' ? (
                <p className="w-[64px]">커리어</p>
              ) : selectedForumCategory === '자기개발' ? (
                <p className="w-[64px]">자기개발</p>
              ) : selectedForumCategory === '토론' ? (
                <p className="w-[64px]">토론</p>
              ) : selectedForumCategory === '코드리뷰' ? (
                <p className="w-[64px]">코드리뷰</p>
              ) : (
                <p className="w-[64px]">포럼</p>
              )}
              <Down />
            </button>

            {showForumMenu && (
              <div
                ref={forumMenuRef}
                className="absolute z-[1000] left-[222px] top-[24px] w-[118px] border border-neutral-100 rounded-lg bg-white  hover:border hover:border-main-400"
              >
                <li
                  onClick={() => {
                    onForumCategoryChange('전체');
                    setShowForumMenu(false);
                  }}
                  className={`flex items-center justify-between p-[8px_16px_8px_32px] h-[40px] ${
                    selectedForumCategory === '전체'
                      ? 'text-subtitle1 font-medium text-main-400 '
                      : 'text-subtitle1 font-medium text-neutral-700'
                  } cursor-pointer`}
                >
                  포럼
                  <Down />
                </li>
                <li
                  onClick={() => {
                    onForumCategoryChange('일상');
                    setShowForumMenu(false);
                  }}
                  className={`p-[8px_8px_8px_8px] h-[40px] center-alignment ${
                    selectedForumCategory === '일상'
                      ? 'text-subtitle1 font-medium text-main-400 bg-main-50'
                      : 'text-subtitle1 font-medium text-neutral-700'
                  } cursor-pointer`}
                >
                  일상
                </li>
                <li
                  onClick={() => {
                    onForumCategoryChange('커리어');
                    setShowForumMenu(false);
                  }}
                  className={`p-[8px_8px_8px_8px] h-[40px] center-alignment ${
                    selectedForumCategory === '커리어'
                      ? 'text-subtitle1 font-medium text-main-400 bg-main-50 '
                      : 'text-subtitle1 font-medium text-neutral-700'
                  } cursor-pointer`}
                >
                  커리어
                </li>
                <li
                  onClick={() => {
                    onForumCategoryChange('자기개발');
                    setShowForumMenu(false);
                  }}
                  className={`p-[8px_8px_8px_8px] h-[40px] center-alignment ${
                    selectedForumCategory === '자기개발'
                      ? 'text-subtitle1 font-medium text-main-400 bg-main-50 '
                      : 'text-subtitle1 font-medium text-neutral-700'
                  } cursor-pointer`}
                >
                  자기개발
                </li>
                <li
                  onClick={() => {
                    onForumCategoryChange('토론');
                    setShowForumMenu(false);
                  }}
                  className={`p-[8px_8px_8px_8px] h-[40px] center-alignment ${
                    selectedForumCategory === '토론'
                      ? 'text-subtitle1 font-medium text-main-400 bg-main-50 '
                      : 'text-subtitle1 font-medium text-neutral-700'
                  } cursor-pointer`}
                >
                  토론
                </li>
                <li
                  onClick={() => {
                    onForumCategoryChange('코드리뷰');
                    setShowForumMenu(false);
                  }}
                  className={`p-[8px_8px_8px_8px] h-[40px] center-alignment ${
                    selectedForumCategory === '코드리뷰'
                      ? 'text-subtitle1 font-medium text-main-400 bg-main-50 rounded-b-lg'
                      : 'text-subtitle1 font-medium text-neutral-700'
                  } cursor-pointer`}
                >
                  코드리뷰
                </li>
              </div>
            )}
          </div>
          <button
            onClick={() => {
              onCategoryChange('archive');
              onForumCategoryChange(null);
            }}
            className={`w-[118px] h-[40px] mr-6 ${
              selectedCategory === 'archive'
                ? 'text-subtitle1 font-medium text-main-400 border border-main-400 rounded-lg bg-main-50'
                : 'text-subtitle1 font-medium text-neutral-700 border border-neutral-100 rounded-lg bg-white'
            }`}
          >
            아카이브
          </button>
        </div>
        <button
          onClick={toggleMenu}
          className={` flex items-center justify-between p-[8px_16px_8px_16px] w-[140px] h-[40px] mr-6 ${
            selectedType !== 'time'
              ? 'text-subtitle1 font-medium text-main-400 border border-main-400 rounded-lg bg-main-50'
              : 'text-subtitle1 font-medium text-neutral-700 border border-neutral-100 rounded-lg bg-white'
          }`}
        >
          <SortSetting />
          {selectedType === 'time' ? <p>최신순</p> : selectedType === 'like' ? <p>좋아요순</p> : <p>댓글순</p>}
          <Down />
        </button>
        {showMenu && (
          <div
            ref={menuButtonRef}
            className="absolute z-[1000] right-[24px] w-[140px] border border-neutral-100 rounded-lg bg-white hover:border hover:border-main-400 "
          >
            <li
              className={`flex items-center justify-between p-[8px_16px_8px_16px] h-[40px] ${
                selectedType === 'time'
                  ? 'text-subtitle1 font-medium text-main-400'
                  : 'text-subtitle1 font-medium text-neutral-700'
              } cursor-pointer`}
            >
              <SortSetting />
              필터
              <Down />
            </li>
            <p
              onClick={() => {
                onTypeChange('time');
                setShowMenu(false);
              }}
              className={`p-[8px_8px_8px_8px] h-[40px] center-alignment ${
                selectedType === 'time'
                  ? 'text-subtitle1 font-medium text-main-400 bg-main-50'
                  : 'text-subtitle1 font-medium text-neutral-700'
              } cursor-pointer`}
            >
              최신순
            </p>
            <p
              onClick={() => {
                onTypeChange('like');
                setShowMenu(false);
              }}
              className={`p-[8px_8px_8px_8px] h-[40px] center-alignment ${
                selectedType === 'like'
                  ? 'text-subtitle1 font-medium text-main-400 bg-main-50'
                  : 'text-subtitle1 font-medium text-neutral-700'
              } cursor-pointer`}
            >
              좋아요순
            </p>
            <p
              onClick={() => {
                onTypeChange('comment');
                setShowMenu(false);
              }}
              className={`p-[8px_8px_8px_8px] h-[40px] center-alignment ${
                selectedType === 'comment'
                  ? 'text-subtitle1 font-medium text-main-400 bg-main-50 rounded-b-lg'
                  : 'text-subtitle1 font-medium text-neutral-700'
              } cursor-pointer`}
            >
              댓글순
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilter;
