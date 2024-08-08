import X from '@/assets/images/common/X';
import ImageIcon from '@/assets/images/upsert_image/ImageIcon';
import Chip from '@/components/common/Chip';
import Image from 'next/image';
import {
  ChangeEventHandler,
  Dispatch,
  DragEventHandler,
  MouseEventHandler,
  SetStateAction,
  useEffect,
  useRef,
  useState
} from 'react';

type ThumbNailBoxProps = {
  prevUrl?: string | null;
  setisThumbnailUrlDeleted?: Dispatch<SetStateAction<boolean>>;
  setThumbnail: Dispatch<SetStateAction<File | undefined>>;
};

const ThumbNailBox = ({ prevUrl, setisThumbnailUrlDeleted, setThumbnail }: ThumbNailBoxProps) => {
  const thumbnailInput = useRef<HTMLInputElement>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>('');
  const [thumbnailName, setThumbnailName] = useState<string>('');

  const handleThumbnailChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.files?.length === 0) return;
    else if (event.target.files) {
      setThumbnail(event.target.files[0]);
      setThumbnailName(event.target.files[0].name);
      setisThumbnailUrlDeleted ? setisThumbnailUrlDeleted(true) : null;
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setThumbnailPreview(reader.result);
        }
      };
    }
  };

  const handleInputClick: MouseEventHandler = () => {
    thumbnailInput.current?.click();
  };

  const handleDragOver: DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
  };

  const handleDrop: DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    if (!event.dataTransfer) {
      return;
    }
    if (event.dataTransfer.files.length > 0) {
      thumbnailInput.current ? (thumbnailInput.current.files = event.dataTransfer.files) : null;
      setisThumbnailUrlDeleted ? setisThumbnailUrlDeleted(true) : null;
      setThumbnail(event.dataTransfer.files[0]);
      setThumbnailName(event.dataTransfer.files[0].name);
      const reader = new FileReader();
      reader.readAsDataURL(event.dataTransfer.files[0]);
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setThumbnailPreview(reader.result);
        }
      };
    }
  };

  const handleButtonClick: MouseEventHandler = () => {
    if (thumbnailInput.current) {
      thumbnailInput.current.value = '';
      setThumbnailPreview('');
      setThumbnailName('');
      setisThumbnailUrlDeleted ? setisThumbnailUrlDeleted(true) : null;
    }
  };

  useEffect(() => {
    if (prevUrl) {
      setThumbnailPreview(prevUrl);
      setThumbnailName(prevUrl?.slice(-36));
    }
  }, [prevUrl]);

  return (
    <div className="flex flex-col">
      <input className="hidden" type="file" name="thumbnail" ref={thumbnailInput} onChange={handleThumbnailChange} />
      <h5 className="block mb-2 text-gray-900 text-h5 font-bold">썸네일</h5>
      <div
        className={`w-[748px] h-[550px] custom-dashed-border shadow-xl flex flex-col items-center justify-center text-neutral-400 rounded-lg ]`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {thumbnailPreview ? (
          <>
            <Image
              className="w-[700px] h-[332px] object-cover rounded-lg mb-10"
              src={thumbnailPreview}
              alt="썸네일 미리보기"
              width={700}
              height={332}
              onClick={handleInputClick}
            />
            <div className="w-[700px] h-[56px] border flex justify-between items-center px-5 py-2 rounded">
              <div className="h-[38px] flex items-center gap-[6px] rounded-lg  text-center content-center bg-neutral-50 px-2 py-1 ">
                <span className="text-neutral-700 text-subtitle2 font-medium"> {thumbnailName}</span>
                <button type="button" className=" w-4 h-4 px-1 rounded-full bg-neutral-200" onClick={handleButtonClick}>
                  <X width={7} height={7} stroke="white" />
                </button>
              </div>
              <Chip type="button" intent={'primary'} size="small" label="편집" onClick={handleInputClick} />
            </div>
          </>
        ) : (
          <>
            <div className=" flex justify-center text-center">
              <ImageIcon />
            </div>
            <div className="text-center my-10">
              <p>썸네일로 설정할 이미지를 불러오세요.</p>
              <p>{`(500MB 이하의 image파일)`}</p>
            </div>
            <Chip type="button" intent={'primary'} size={'large'} label="사진 올리기" onClick={handleInputClick} />
          </>
        )}
      </div>
    </div>
  );
};

export default ThumbNailBox;
