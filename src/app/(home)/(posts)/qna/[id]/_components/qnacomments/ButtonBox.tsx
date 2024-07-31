const ButtonBox = () => {
  return (
    <div className="ml-auto flex gap-4">
      <button type="button" className="w-[71px] h-[48px] bg-neutral-50 rounded-md text-neutral-100">
        취소
      </button>
      <button className="w-[71px] h-[48px] bg-main-100 rounded-md text-main-50">등록</button>
    </div>
  );
};

export default ButtonBox;
