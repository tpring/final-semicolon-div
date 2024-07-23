const TodayQna = () => {
  return (
    <div>
      <h1>오늘의 Q&A</h1>
      <p className="text-xs mb-3">가장 인기 있는 Q&A 게시글을 보여드려요!</p>
      <div className="flex flex-nowrap gap-5">
        <div className="w-1/2 bg-slate-200 h-40">1</div>
        <div className="w-1/2 bg-slate-200 h-40">2</div>
      </div>
    </div>
  );
};

export default TodayQna;
