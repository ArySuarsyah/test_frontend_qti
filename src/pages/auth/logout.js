import axios from "axios";
import React, { useCallback } from "react";
import { useRouter } from "next/router";
import { withIronSessionSsr } from "iron-session/next";
import cookieCongif from "@/helpers/cookieConfig";

export const getServerSideProps = withIronSessionSsr(async ({ req, res }) => {
  req.session.destroy();

  return {
    props: {},
  };
}, cookieCongif);

export default function Logout() {
  const router = useRouter();
  React.useEffect(() => {
    router.replace("/auth/login");
  }, [router]);
  return <div></div>;
}