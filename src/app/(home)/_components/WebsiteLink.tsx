const WebsiteLink = () => {
  return (
    <div className="flex justify-center items-center mt-5">
      <ul className=" flex justify-around items-center gap-4  bg-slate-200 p-12 rounded-2xl w-full ">
        <li>
          <a href="" target="_blank">
            <p>추천 사이트</p>
          </a>
        </li>
        <li>
          <a href="" target="_blank">
            <p>교육</p>
          </a>
        </li>
        <li>
          <a href="" target="_blank">
            <p>IT 뉴스</p>
          </a>
        </li>
        <li>
          <a href="" target="_blank">
            <p>커리어 코칭</p>
          </a>
        </li>
        <li>
          <a href="" target="_blank">
            <p>label</p>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default WebsiteLink;
