import { withIronSessionApiRoute } from "iron-session/next";
import http from "@/helpers/http";
import cookieCongif from "@/helpers/cookieConfig";
import * as https from "https";

const httpsAgent = new https.Agent({
  rejectUnauthorized: false, // Nonaktifkan verifikasi sertifikat (Hati-hati dengan ini di lingkungan produksi)
});

export default withIronSessionApiRoute(async function loginRoute(req, res) {
  try {
    const body = req.body

    const { data } = await http().post("/auth/login", body, {
      httpsAgent,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const token = data?.token;

    if (token) {
      req.session.token = token;
      await req.session.save();
    }
    return res.json(data);
  } catch(error) {
    console.log(error.message)
  }
}, cookieCongif);