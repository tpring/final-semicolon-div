import Image from 'next/image';
import { ChangeEventHandler, MouseEventHandler, useRef, useState } from 'react';

const ThumbNailBox = () => {
  const thumbnailInput = useRef<HTMLInputElement>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<any>();
  const [thumbnailName, setThumbnailName] = useState<any>();

  const handleThumbnailChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.files) {
      setThumbnailName(event.target.files[0].name);
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onloadend = () => {
        setThumbnailPreview(reader.result);
      };
    }
  };
  const handleInputClick: MouseEventHandler = () => {
    thumbnailInput.current?.click();
  };

  return (
    <>
      <input className="hidden" type="file" name="thumbnail" ref={thumbnailInput} onChange={handleThumbnailChange} />
      <div
        className={`w-[748px] h-[543px] mb-10 border flex flex-col items-center justify-center text-neutral-400 rounded-lg ]`}
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
            <div className="w-[700px] h-[56px] border flex justify-between items-center px-5 py-2">
              <div className="h-[38px] rounded-lg text-neutral-700 text-subtitle2 text-center content-center bg-neutral-50 px-2 py-1 ">
                {thumbnailName}
                <button
                  type="button"
                  className=" w-5 h-5 rounded-full content-center bg-neutral-200"
                  onClick={() => {
                    if (thumbnailInput.current) {
                      thumbnailInput.current.value = '';
                      setThumbnailPreview('');
                      setThumbnailName('');
                    }
                  }}
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
    </>
  );
};

export default ThumbNailBox;
