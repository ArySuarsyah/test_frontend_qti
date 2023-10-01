import Layout from "@/components/Layout";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import {
  AiOutlineSearch,
  AiOutlinePlus,
  AiOutlineEdit,
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { LuTrash } from "react-icons/lu";
import http from "@/helpers/http";
import { getAllUser } from "../redux/reducer/userData";
import { withIronSessionSsr } from "iron-session/next";
import cookieConfig from "@/helpers/cookieConfig";
import checkCredentials from "@/helpers/checkCredentials";
import AlertMessage from "@/components/AlertMessage";
import { useDispatch, useSelector } from "react-redux";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req, res }) {
    const token = req.session?.token;
    checkCredentials(token, res);

    return {
      props: {
        token,
      },
    };
  },
  cookieConfig
);

export default function Index({ token }) {
  const dispatch = useDispatch();
  const allUser = useSelector((state) => state.userData.allUser);
  const [userId, setUserId] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [employeeValue, setEmployeeValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPassValue, setConfirmPassValue] = useState("");
  const [departementValue, setDepartementValue] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [failed, setFailed] = useState("");
  const [success, setSuccess] = useState("");
  const [pageCount, setPageCount] = useState(1);
  const [searchData, setSearchData] = useState("");
  const [deleteData, setDeleteData] = useState({});

  const getUser = useCallback(
    async (page = 1, page_size = 5, search = "") => {
      const { data } = await http(token).get("/user/", {
        params: {
          page,
          page_size,
          search,
        },
      });
      dispatch(getAllUser(data));
    },
    [token, dispatch]
  );

  const prevPage = () => {
    if (pageCount > 1) {
      setPageCount(pageCount - 1);
    }
  };

  const nextPage = () => {
    if (allUser.results.length == 5) {
      setPageCount(pageCount + 1);
    }
  };

  useEffect(() => {
    getUser(pageCount, 5, searchData);
  }, [getUser, pageCount, searchData]);

  console.log(allUser);
  console.log(pageCount);
  // create user
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const userInput = {
        email: emailValue,
        employee: employeeValue,
        password: passwordValue,
        confirm_password: confirmPassValue,
        is_active: true,
        departement: departementValue,
      };

      const { data } = await http(token).post("/user/", userInput, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.token) {
        setSuccess("User Created!")
        setUserId("");
      }
    } catch (error) {
      setFailed(error.message)
    }
  };

  // edit user
  const handleChangeUser = async (e) => {
    e.preventDefault();
    try {
      const userInput = {
        email: emailValue,
        employee: employeeValue,
        password: passwordValue,
        confirm_password: confirmPassValue,
        is_active: true,
        departement: departementValue,
      };

      const { data } = await http(token).put(`/user/${userId}`, userInput, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.token) {
        setSuccess("User updated!");
        setUserId("");
      }
    } catch (error) {
      setFailed(error.message);
    }
  };

  const handleDelete = async () => {
    const { data } = await http(token).delete(`/user/${deleteData.id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    setSuccess('User Deleted!')
  };

  const paginationData = `Ditampilkan ${
    pageCount > 1 ? (pageCount - 1) * allUser.page_size + 1 : pageCount
  } ke ${
    pageCount * 5 -
    (allUser.results.length < 5 ? allUser.results.length + 1 : 0)
  } dari ${allUser.count}`;

  return (
    <>
      <Layout userToken={token}>
        <AlertMessage messageSuccess={success} messageError={failed}/>
        <div className="flex flex-col md:flex-row md:items-center justify-between px-10 md:p-5 gap-5">
          <div className="flex flex-col font-bold">
            <span className="text-2xl font-bold">User Management</span>
            <span className="text-[#a3a3a3] font-semibold">User</span>
          </div>
          <div className="flex gap-5">
            <div className="flex flex-row w-96 items-center justify-between pr-5 border-[1px] border-[#c3c3c3] rounded-md">
              <input
                onChange={(e) => setSearchData(e.target.value)}
                type="text"
                placeholder="Search Name"
                className="input w-full max-w-xs focus:outline-none bg-transparent"
              />
              <AiOutlineSearch size={25} />
            </div>
            <div
              onClick={() =>
                document.getElementById("my_modal_create").showModal()
              }
              className="btn bg-[#198564] hover:bg-[#1c473a]"
            >
              <AiOutlinePlus size={25} color="#fff" />
              <span className="text-white">Create User</span>
            </div>
          </div>
        </div>
        <div>
          <div className="overflow-x-auto px-10 md:p-5 md:h-[29em] border-[1px] border-black">
            <table className="table font-bold">
              {/* head */}
              <thead className="h-14 text-sm">
                <tr>
                  <th>Employee</th>
                  <th className="hidden md:table-cell">Email</th>
                  <th className="hidden md:table-cell">Departement</th>
                  <th className="hidden md:table-cell">Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="bg-white p-5">
                {allUser.results?.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <div className="flex items-center space-x-3 gap-5">
                          <div className="avatar h-12 w-12 text-white bg-[#E3645C] flex items-center justify-center rounded-full overflow-hidden">
                            {item?.image ? (
                              <Image
                                height={100}
                                width={100}
                                src="/tailwind-css-component-profile-2@56w.png"
                                alt="Avatar Tailwind CSS Component"
                              />
                            ) : (
                              <span>
                                {item?.employee?.substring(0, 2).toUpperCase()}
                              </span>
                            )}
                          </div>
                          <div>
                            <div className="font-bold">{item.employee}</div>
                          </div>
                        </div>
                      </td>
                      <td className="hidden md:table-cell">{item.email}</td>
                      <td className="hidden md:table-cell">
                        {item.departement}
                      </td>
                      <td className="hidden md:table-cell">
                        <button className="btn btn-ghost btn-xs">
                          {item.is_active ? "Active" : "Non_Active"}
                        </button>
                      </td>
                      <td className="flex gap-2">
                        <div
                          onClick={() => {
                            document.getElementById("my_modal_3").showModal();
                            setUserId(item.id);
                          }}
                          className="flex justify-center items-center bg-[#2B2D2F] text-white w-10 h-10 rounded-lg cursor-pointer active:scale-[.9] duration-300"
                        >
                          <AiOutlineEdit size={20} />
                        </div>
                        <div
                          onClick={() => {
                            document.getElementById("my_modal_3").showModal();
                            setDeleteData(item);
                          }}
                          className="flex justify-center items-center bg-[#F93F40] text-white w-10 h-10 rounded-lg cursor-pointer active:scale-[.9] duration-300"
                        >
                          <LuTrash size={20} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* delete user modal */}

            <dialog id="my_modal_3" className="modal">
              <div className="modal-box">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
                <h3 className="font-bold text-lg">Confirm Delete</h3>
                <p className="py-4 font-bold">
                  {`Are you sure, delete ${deleteData.employee}?`}
                </p>
                <div
                  onClick={handleDelete}
                  className="bg-[#198564] text-white cursor-pointer flex justify-center items-center rounded-lg py-2 active:scale-[.9] duration-300"
                >
                  Confirm
                </div>
              </div>
            </dialog>

            {/* create user modal */}

            <dialog id="my_modal_create" className="modal">
              <div className="modal-box">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
                <h3 className="font-bold text-lg">Create User</h3>
                <form
                  onSubmit={handleCreate}
                  className="py-4 flex flex-col gap-3 justify-center"
                >
                  <div className="flex flex-col gap-3">
                    <label htmlFor="email">Email</label>
                    <input
                      onChange={(e) => setEmailValue(e.target.value)}
                      name="email"
                      type="email"
                      placeholder="Input Email"
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label htmlFor="employee">Employee</label>
                    <input
                      onChange={(e) => setEmployeeValue(e.target.value)}
                      name="employee"
                      type="text"
                      placeholder="Input Employee"
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label htmlFor="password">Password</label>
                    <div className="border-[1px] border-slate-300 rounded-lg flex flex-row items-center pr-5 ">
                      <input
                        onChange={(e) => setPasswordValue(e.target.value)}
                        name="password"
                        type={showPass ? "text" : "password"}
                        placeholder="Input Password"
                        className="input w-full focus:outline-none"
                      />
                      <div
                        onClick={() => setShowPass(!showPass)}
                        className="cursor-pointer"
                      >
                        {showPass ? (
                          <AiOutlineEye size={23} />
                        ) : (
                          <AiOutlineEyeInvisible size={23} />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <div className="border-[1px] border-slate-300 rounded-lg flex flex-row items-center pr-5 ">
                      <input
                        onChange={(e) => setConfirmPassValue(e.target.value)}
                        name="confirmPassword"
                        type={showConfirmPass ? "text" : "password"}
                        placeholder="Input Confirm Password"
                        className="input w-full focus:outline-none"
                      />
                      <div
                        onClick={() => setShowConfirmPass(!showConfirmPass)}
                        className="cursor-pointer"
                      >
                        {showConfirmPass ? (
                          <AiOutlineEye size={23} />
                        ) : (
                          <AiOutlineEyeInvisible size={23} />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <label htmlFor="departement">Departement</label>
                    <input
                      onChange={(e) => setDepartementValue(e.target.value)}
                      name="departement"
                      type="text"
                      placeholder="Input Departement"
                      className="input input-bordered w-full"
                    />
                  </div>
                  <button
                    type="submit"
                    className="p-3 rounded-lg bg-[#198564] text-white font-bold hover:bg-[#318068] active:bg-[#2a6150] active:scale-[.9] duration-300"
                  >
                    Create
                  </button>
                </form>
              </div>
            </dialog>

            {/* Edit user modals */}

            <dialog id="my_modal_3" className="modal">
              <div className="modal-box">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
                <h3 className="font-bold text-lg">Edit user</h3>
                <form
                  onSubmit={handleChangeUser}
                  className="py-4 flex flex-col gap-3 justify-center"
                >
                  <div className="flex flex-col gap-3">
                    <label htmlFor="email">Email</label>
                    <input
                      onChange={(e) => setEmailValue(e.target.value)}
                      name="email"
                      type="email"
                      placeholder="Input Email"
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label htmlFor="employee">Employee</label>
                    <input
                      onChange={(e) => setEmployeeValue(e.target.value)}
                      name="employee"
                      type="text"
                      placeholder="Input Employee"
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label htmlFor="password">Password</label>
                    <div className="border-[1px] border-slate-300 rounded-lg flex flex-row items-center pr-5 ">
                      <input
                        onChange={(e) => setPasswordValue(e.target.value)}
                        name="password"
                        type={showPass ? "text" : "password"}
                        placeholder="Input Password"
                        className="input w-full focus:outline-none"
                      />
                      <div
                        onClick={() => setShowPass(!showPass)}
                        className="cursor-pointer"
                      >
                        {showPass ? (
                          <AiOutlineEye size={23} />
                        ) : (
                          <AiOutlineEyeInvisible size={23} />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <div className="border-[1px] border-slate-300 rounded-lg flex flex-row items-center pr-5 ">
                      <input
                        onChange={(e) => setConfirmPassValue(e.target.value)}
                        name="confirmPassword"
                        type={showConfirmPass ? "text" : "password"}
                        placeholder="Input Confirm Password"
                        className="input w-full focus:outline-none"
                      />
                      <div
                        onClick={() => setShowConfirmPass(!showConfirmPass)}
                        className="cursor-pointer"
                      >
                        {showConfirmPass ? (
                          <AiOutlineEye size={23} />
                        ) : (
                          <AiOutlineEyeInvisible size={23} />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <label htmlFor="departement">Departement</label>
                    <input
                      onChange={(e) => setDepartementValue(e.target.value)}
                      name="departement"
                      type="text"
                      placeholder="Input Departement"
                      className="input input-bordered w-full"
                    />
                  </div>
                  <button
                    type="submit"
                    className="p-3 rounded-lg bg-[#198564] text-white font-bold hover:bg-[#318068] active:bg-[#2a6150] active:scale-[.9] duration-300"
                  >
                    Save
                  </button>
                </form>
              </div>
            </dialog>
          </div>

          {/* Pagination */}
          <div className="flex md:justify-between self-end border-[1px] border-black">
            <div className="hidden md:block">
              <span className="text-slate-400">{paginationData}</span>
            </div>
            <div className="flex items-center justify-end self-center gap-5 py-5">
              <div onClick={prevPage}>
                <AiOutlineLeft size={30} />
              </div>
              <div className="flex gap-5">
                {Array.from({ length: allUser.page_count }, (_, index) => (
                  <div
                    key={index}
                    className={`h-6 w-6 ${
                      pageCount === index + 1
                        ? "bg-slate-400 text-white"
                        : "bg-transparent"
                    } flex justify-center items-center rounded-full text-black`}
                  >
                    {index + 1}
                  </div>
                ))}
              </div>
              <div onClick={nextPage}>
                <AiOutlineRight size={30} />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
