import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setUserDetails, setToken } from "../../Redux/action";
import Icon from "../../components/Nav/Icon";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";

import bultpay from "../../images/bultpay3.png";

const ResetPassword = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  // const [exists, setexists] = useState("");
  const [msg, setMsg] = useState({
    email: "",
    error: "",
    exists: "",
  });
  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const notify = (word) => {
    toast.info(`${word}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const reset = (e) => {
    e.preventDefault();
    if (!email) {
      return notify("Enter your email");
    }

    fetch(`https://wide-eyed-cyan-angler.cyclic.app/forgot-password/${email}`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((res) => {
        console.log("eee");
        notify("Confirmation code has been delivered");
        if (res.msg) {
          setError("invalid email");
          setTimeout(() => {
            setError("");
          }, 2000);
          return;
        }

        if (res.msg) {
          setMsg(res.msg);
          console.log("msg", msg);
        }

        if (res.error) {
          setError("invalid email");
          setTimeout(() => {
            setError("");
          }, 2000);
          return;
        }
        const { token } = res;
        const { user } = res;
        dispatch(setToken(token));

        if (token != undefined) {
          dispatch(setUserDetails(user));
          navigate("/public/newpwd", { replace: true });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div class="px-0 lg:px-0 w-full">
      <div class="flex flex-col bg-[#26313f3a] shadow-md rounded text-slate-700 items-center h-screen px-3 justify-center bg-reed pt-3 w-full default_cursor_cs">
        <div class="lg:mx-auto w-full lg:w-10/12 px-3 lg:px-12 default_cursor_cs">
          <div className="flex items-center justify-center">
            <span className="flex bg-black items-center lg:pr-2 lg:w-40 rounded-lg text-gray-400 justify-center mb-6">
              <Icon />
            </span>
          </div>
          <div class=" w-full mx-auto pt-2 mt-12 md:pt-0 max-h-screen md:h-auto flex flex-col self-center items-center md:mt-6 mb-12">
            <div class="bg-white pt-8 sm:max-w-sm w-full pb-4 md:pb-0 default_cursor_cs">
              <div class="relative flex flex-col min-w-0 break-words w-full mb-6 rounded-lg border-0">
                <div class="flex-auto px-4 lg:mx-10_ py-10 pt-0 default_cursor_cs">
                  <div class="container mx-auto px-4 h-full relative">
                    <div class="flex flex-col content-center justify-center h-full default_cursor_cs">
                      <div class="text-black text-lg text-center mb-4 uppercase font-bold default_cursor_cs">
                        Forgot Password
                      </div>
                      <div class="w-full px-4 default_cursor_cs">
                        <div class="flex flex-col min-w-0 break-words _w-96 mb-6 g border-0 default_cursor_cs">
                          <div class="pb-3 default_cursor_cs">
                            <ToastContainer />
                            <div class="text-left font-semibold pb-1 text-xs lg:text-sm default_cursor_cs">
                              Email Address <span class="text-red-600">*</span>
                            </div>
                            <input
                              onChange={onEmailChange}
                              value={email}
                              placeholder="Enter your email"
                              class=" pl-4+ mt-1 md:w-66 lg:_w-72 block bg-white w-full border border-slate-300 rounded shadow text-black  placeholder-white text-sm h-10 py-.5 focus:ring-0 focus:bg-slate-300"
                            />
                          </div>
                          <div className="text-center text-red-400 text-xs">
                            {msg.email}
                          </div>
                          <div class="mt-7">
                            <button
                              onClick={reset}
                              class="font-semibold bg-blue-600 rounded text-white capitalize text-sm w-full btn-sm h-9 default_pointer_cs"
                            >
                              Send Confirmation Code
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
