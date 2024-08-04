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
};

const ThumbNailBox = ({ prevUrl, setisThumbnailUrlDeleted }: ThumbNailBoxProps) => {
  const thumbnailInput = useRef<HTMLInputElement>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>('');
  const [thumbnailName, setThumbnailName] = useState<string>('');

  const handleThumbnailChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.files?.length === 0) return;
    else if (event.target.files) {
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
        className={`w-[748px] h-[543px]  border-2 border-dashed flex flex-col items-center justify-center text-neutral-400 rounded-lg ]`}
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
              <div className="h-[38px] rounded-lg text-neutral-700 text-subtitle2 text-center content-center bg-neutral-50 px-2 py-1 ">
                {thumbnailName}
                <button
                  type="button"
                  className=" w-5 h-5 rounded-full content-center bg-neutral-200"
                  onClick={handleButtonClick}
                >
                  x
                </button>
              </div>
              <button
                type="button"
                className="bg-main-400 w-[114px] h-10 text-white rounded-[4px]"
                onClick={handleInputClick}
              >
                편집
              </button>
            </div>
          </>
        ) : (
          <>
            <p>썸네일로 설정할 이미지를 불러오세요.</p>
            <p>{`(500MB 이하의 image파일)`}</p>
            <button
              type="button"
              className="w-[130px] mt-10 h-[56px] bg-main-400 rounded-lg text-white"
              onClick={handleInputClick}
            >
              사진 올리기
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ThumbNailBox;
