import React from "react";
import Nav from "./Navx";
import whiteIcon from "../../components/Nav/whiteIcon"
import bultpay from "../../images/bultpay3.png";
import { useParams } from "react-router-dom";
import { useState } from "react";

function SetActivate() {
  let { email } = useParams();
  const [status, setStatus] = useState("");

  email = email.slice(0, email.length - 1);
  console.log({ email });
  const onActivate = () => {
    fetch(`https://wide-eyed-cyan-angler.cyclic.app/activate/${email}`, {
      method: "get",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        setStatus(res.status);

        //console.log("usersssssssssss", res.users);
        // setUsers(res.users);
      })
      .catch((err) => console.log("errrrrrrr", err));
  };

  return (
    <div className="px-0 lg:px-0 w-full">
      <div className="flex flex-col bg-[#1f2b3a] shadow-md rounded  text-slate-700 items-center h-screen px-3 justify-center bg-reed pt-3  w-full">
        <Nav />
        <div className="lg:mx-auto  w-full lg:w-10/12  px-3 lg:px-12">
          
          <div class="mx-16 md:mx-auto pt-2 md:pt-0 font-medium max-h-screen md:h-auto flex flex-col self-center items-center md:mt-6 mb-12">
            <button
              onClick={onActivate}
              className="w-56 px-2 py-3 bg-blue-600 text-white font-medium rounded-md"
            >
              Activate Account
            </button>
            <div className="text-white text-lg">{status}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SetActivate;
