import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { getData } from "../redux/reducer/userData";
import axios from "axios";
import http from "@/helpers/http";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import { withIronSessionSsr } from "iron-session/next";
import cookieCongif from "@/helpers/cookieConfig";
export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req, res }) {
    const token = req.session?.token;

    if (token) {
      res.setHeader("location", "/");
      res.statusCode = 302;
      res.end();
      return {
        props: {
          token,
        },
      };
    }

    return {
      props: {},
    };
  },
  cookieCongif
);

const validationSchema = Yup.object({
  email: Yup.string().required("Email is empty !"),
  password: Yup.string().required("Password is empty !"),
});

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [accept, setAccept] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const doLogin = async (values) => {
    try {
      const inputData = {
        email: values.email,
        password: values.password,
      };

      // const jsonLogin = JSON.stringify(inputData);

      const { data } = await axios.post("/api/login", inputData);
console.log(data)
      if (data.token) {
        setMessage("Login Success");
        setLoading(false);
        setTimeout(() => {
          dispatch(getData(data));
          router.push("/");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-primary w-screen h-screen flex justify-center items-center text-black">
      <div className="flex flex-col p-10 bg-white rounded-lg gap-5 w-80 md:w-96">
        <div className="flex flex-col items-center text-center">
          <span>Login</span>
          <span>Welcome back, enter your credentials to continue.</span>
        </div>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={doLogin}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleSubmit,
            handleChange,
            isSubmitting,
          }) => {
            return (
              <Form
                action=""
                onSubmit={handleSubmit}
                className="flex flex-col gap-5"
              >
                <div className="flex flex-col gap-2 ">
                  <label htmlFor="email" className="font-bold">
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    placeholder="Enter Email"
                    className="input w-full bg-slate-200"
                    value={values.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </div>
                {errors.email && touched.email ? (
                  <div className="text-red-600">{errors.email}</div>
                ) : null}
                <div className="flex flex-col gap-2">
                  <label htmlFor="password" className="font-bold">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    className="input w-full bg-slate-200"
                    value={values.password}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </div>
                {errors.password && touched.password ? (
                  <div className="text-red-600">{errors.password}</div>
                ) : null}
                <div className="form-control">
                  <label className="label cursor-pointer justify-start gap-5">
                    <input
                      type="checkbox"
                      onChange={() => setAccept(!accept)}
                      className="checkbox"
                    />
                    <span className="label-text font-bold text-lg">
                      Remember me
                    </span>
                  </label>
                </div>
                <div>
                  <button
                    type="submit"
                    className="btn btn-active btn-accent w-full text-white"
                  >
                    {loading && (
                      <span className="loading loading-spinner text-accent"></span>
                    )}
                    {!loading && "login"}
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}
