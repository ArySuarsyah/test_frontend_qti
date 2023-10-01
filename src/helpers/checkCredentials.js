const checkCredentials = (token, res)=>{

        if (!token) {
      res.setHeader("location", '/auth/login');
      res.statusCode = 302;
      res.end();
      return {
        props: {},
      };
    }
}

export default checkCredentials;