const FormTagInput = () => {
  return (
    <div>
      <label className="block mb-2  text-neutral-900 text-h5 font-bold" htmlFor="tag">
        태그
      </label>
      <input
        className="px-1 w-full  text-neutral-900 text-body1 border h-[51px] rounded-xl border-neutral-100 focus:border-main-400 outline-none"
        type="text"
        name="tag"
        id="tag"
      />
    </div>
  );
};

export default FormTagInput;
