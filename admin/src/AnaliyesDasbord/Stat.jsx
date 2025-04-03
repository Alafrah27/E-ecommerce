const Stat = ({ color, title, value, icon }) => {
  const dynamicCorlor = {
    blue: "bg-blue-200  text-blue-700",
    green: "bg-green-200 text-green-700",
    red: "bg-red-200    text-red-700",
    yellow: "bg-yellow-200  text-yellow-700",
  };
  return (
    <div className=" w-full">
      <div className=" stats w-full bg-gray-50  dark:bg-slate-900 dark:text-white rounded-md p-6  border border-gray-200/20  gap-y-2 gap-x-4">
        <div
          className={`icon text-[20px] row-span-full aspect-square rounded-full flex items-center justify-center ${dynamicCorlor[color]}`}
        >
          {icon}
        </div>
        <h5 className="self-end text-[13px] uppercase tracking-tight font-semibold text-gray-500 dark:text-white">
          {title}
        </h5>
        <p className="text-2xl leading-none font-bold">{value}</p>
      </div>
    </div>
  );
};

export default Stat;
