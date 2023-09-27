import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string().required("Email is empty !"),
  password: Yup.string().required("Password is empty !"),
});

export default function Login() {
  const doLogin = (values) => {
    console.log(values);
  };

  return (
    <div className="bg-primary w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col p-10 bg-white rounded-lg gap-5">
        <div className="flex flex-col items-center">
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
              <form
                action=""
                onSubmit={handleSubmit}
                className="flex flex-col gap-5"
              >
                <div className="flex flex-col gap-2">
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
                <div className="flex flex-col gap-2">
                  <label htmlFor="password" className="font-bold">
                    Password
                  </label>
                  <input
                    type="text"
                    name="password"
                    placeholder="Enter Password"
                    className="input w-full bg-slate-200"
                    value={values.password}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer justify-start gap-5">
                    <input
                      type="checkbox"
                      //   checked="checked"
                      className="checkbox"
                    />
                    <span className="label-text font-bold text-lg">
                      Remember me
                    </span>
                  </label>
                </div>
                <div>
                  <button className="btn btn-active btn-accent w-full text-white" disabled={false} >Login</button>
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}
