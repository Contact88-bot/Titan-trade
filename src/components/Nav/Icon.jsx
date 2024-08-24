import { Link } from "react-router-dom";
import { FaTrademark } from "react-icons/fa";
const Icon = () => {
  return (
    <>
    <Link
        to="/"
        className="rounded-xl shadow-md w-40 boerder-red-600 border-2 bg-black pointer py-2 relative px- flex justify-center text-whidte updpercase m-3 font-bold text-white items-center text-[18px]"
      >
        Titan
        <span className="text-sm ml- rounded bg-red-600 px-1 font-extrabold font-mono text-black">
          Trade
        </span>
        Hub
        <span
          className=" text-whitd bdg-white absolute right-0.5 pt-1 top-0.5"
          style={{ fodntSize: "px" }}
        >
          <FaTrademark size={16} />
        </span>
      </Link>
    {/* <Link to="/">
      <div className="relative font-climate tracking-widest text-3xl w-28 text-white rounded-xl shadow-md border-2 px-5">
        T<span className="text-[#FC5C40]">T</span>H
      </div> */}
      {/* <span
          className=" text-white bdg-white absolute left-[140px] righdt-0.5 pt-1 top-0.5"
          style={{ fodntSize: "3px" }}
        >
          <FaTrademark />
        </span> */}
    {/* </Link> */}
      {/* <Link
        to="/"
        className="rounded-xl shadow-md   pointer py-2 relative ptx-4 flex justify-center bg-black text-white updpercase m-3 font-bold  border-2 items-center text-[18px]"
      >
        Rhode
        <span className="text-sm ml- rounded bg-red-600 px-1 font-extrabold font-mono text-black">
          Analytics
        </span>
        <span
          className=" text-white bdg-white absolute left-[140px] righdt-0.5 pt-1 top-0.5"
          style={{ fodntSize: "3px" }}
        >
          <FaTrademark />
        </span>
      </Link> */}
    </>
  );
};

export default Icon;
