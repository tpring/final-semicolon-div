const Notice = () => {
  return (
    <div>
      <div className="w-full flex flex-col justify-center items-center bg-violet-300 rounded-lg p-4 gap-4 mb-6">
        <h1 className="text-xl font-extrabold">
          공지사항 <span className="text-3xl">🌹</span>
        </h1>
        <p className="text-sm">
          <span className="text-xl">‹</span>div<span className="text-xl">›</span>의 새소식, 운영 정보를 공유하는
          공간이에요
        </p>
      </div>
    </div>
  );
};

export default Notice;
