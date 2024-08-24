import React, { useEffect, useState } from "react";
import AdminNav from "./AdminNav";
import User from "./Users";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { success } from "daisyui/src/colors";

const AllUsers = () => {
  const notify = (word) => {
    toast(word);
    setReload((reload) => !reload);
  };

  const notifier = (word) => {
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

  const [reload, setReload] = useState(false);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  let navigate = useNavigate();
  const adUser = useSelector((state) => state.auth.user);

  const [user, setUser] = useState({
    email: adUser.email,
    btc: adUser.btc,
    eth: adUser.eth,
    usdt: adUser.usdt
  });

  const [selectedCrypto, setSelectedCrypto] = useState("btc");
  const [addressValue, setAddressValue] = useState(""); // State to hold the entered the address

  const onChangeAddress = (e) => {
    setAddressValue(e.target.value);
  };

  const onChangeSelectedCrypto = (e) => {
    setSelectedCrypto(e.target.value);
  };
    
  const editCryptoAddress = async (event) => {
    const { btc, eth, usdt } = user
    const isAddressUpdated = await fetch(
      "https://wide-eyed-cyan-angler.cyclic.app/edit-addresses",
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          field: selectedCrypto, // Use the selectedCrypto value
          value: addressValue,   // Use the addressValue
        }),
      }
    ).then((isAddressUpdated) => isAddressUpdated.json())
    .then((response) => {
      notify(response.msg);
      event.preventDefault();
      navigate("/admin/users", { replace: true });
    })
    .catch((error) => {
      console.log("Error:", error);
      notify("Error updating crypto address. Please try again later.");
    });
  };
    // const editCryptoAddresses = async (event) => {

    //   const isEditCryptoAddresses = await fetch(
    //     "http://localhost:4000/edit-addresses",
    //     {
    //       method: "post",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify({
    //         cryptoAddresses: {
    //           [selectedCrypto]: cryptoAddress,
    //         },
    //       }),
    //     }
    //   );
  
    //   if (isEditCryptoAddresses.ok) {
    //     const result = await isEditCryptoAddresses.json();
    //     notify(result.msg);
    //     event.preventDefault();
    //     navigate("/admin/users", { replace: true });
    //   } else {
    //     const errorResult = await isEditCryptoAddresses.json();
    //     console.error('Error updating crypto addresses:', errorResult.err);
    //   }
    // };
  
  
  const onChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
    // console.log("userr", user);
  };


useEffect(() => {
  fetch("https://wide-eyed-cyan-angler.cyclic.app/users", {
    method: "get",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((res) => {
      // console.log("usersssssssssss", res.users);
      setUsers(res.users);
    })
    .catch((err) => console.log("errrrrrrr", err));
}, [reload]);

  return (
    <div className="px-0 lg:px-0 w-full">
      <div>
        <AdminNav />
        <div className="px-4 md:px-10 mx-auto w-full m-24">
          <div className="">
            <div>

              <div className="flex justify-center">
                <div className="flex flex-col gap-3 lg:w-44">
                  {/* Dropdown */}
                  <select
                    value={selectedCrypto}
                    onChange={onChangeSelectedCrypto}
                    className="px-2 border border-gray-300 py-3 placeholder-gray-400 text-black relative rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline focus:bg-slate-200 w-56"
                  >
                    <option value="btc">Bitcoin</option>
                    <option value="eth">Ethereum</option>
                    <option value="usdt">USDT</option>
                  </select>

                  {/* Input field to enter crypto address */}
                  <input
                    name="cryptoAddress"
                    value={addressValue}
                    onChange={onChangeAddress}
                    type="text"
                    placeholder={`Enter ${selectedCrypto} Address`}
                    className="px-3 border border-gray-300 py-3 placeholder-gray-400 text-black relative rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline focus:bg-slate-200 w-56"
                  />

                  <button
                    onClick={editCryptoAddress}
                    className="bg-red-500 text-white px-4 py-1 rounded-lg font-semibold focus:shadow-xl"
                  >
                    Update Address
                  </button>
                </div>
              </div>
              <div class="text-2xl font-semibold mb-4 text-center default_cursor_cs">
                All Users on the site
              </div>
              <ToastContainer />
              <input
                type="text"
                placeholder="search here..."
                class="mx-auto block py-2 rounded px-2 my-2"
                onChange={(event) => {
                  setSearch(event.target.value);
                }}
              />

              <div className="px-3 grid grid-cols-1 lg:grid-cols-2 mt-10 lg:gap-0 gap-6">
                {users
                  .filter((user) => {
                    if (search === "") {
                      return user;
                    } else if (
                      user.email.toLowerCase().includes(search.toLowerCase()) ||
                      user.name.toLowerCase().includes(search.toLowerCase()) ||
                      user.phone.toLowerCase().includes(search.toLowerCase())
                    ) {
                      return user;
                    }
                  })
                  .map((user, i) => {
                    return <User key={i} user={user} notify={notify} />;
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
