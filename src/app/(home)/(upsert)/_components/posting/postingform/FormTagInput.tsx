const FormTagInput = () => {
  return (
    <div>
      <label className="block mb-2 text-[#525252] " htmlFor="tag">
        태그
      </label>
      <input
        className="px-1 w-full text-[#525252] border h-[26px] border-gray-400 focus:border-blue-500 outline-none"
        type="text"
        name="tag"
        id="tag"
      />
    </div>
  );
};

export default FormTagInput;
