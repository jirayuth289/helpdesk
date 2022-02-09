const oneMinute = 1000 * 60;
const oneHr = oneMinute * 60;
const oneDay = oneHr * 24;

export default {
  clientHost: process.env.CLIENT_HOST,
  host: process.env.HOST,
  port: process.env.PORT,
  sesstionTime: oneDay * 1,
  whitelist: [process.env.CLIENT_HOST as string, "http://localhost:9080"],
  sesseionOptions: {
    name: "ekyc-sid",
    secret: "ekyc-secretkey",
    // resave: false,
    resave: true,
    saveUninitialized: false,
    // cookie: { httpOnly: false },
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      domain: "app.ekyc.apptify.io",
      secure: true,
    },
  },
  bucketName: process.env.BUCKET,
  redis: {
    URL: process.env.REDIS_URI,
    prefix: "ekyc",
  },
  otpExpiredIn: 120,
  proxyHost: process.env.PROXY_HOST,
  mailData: {
    from: {
      email: "apptifyinfo@gmail.com",
      name: "Apptify EKYC",
    },
    replyTo: {
      email: "fuber.dev@gmail.com",
      name: "support team",
    },
  },
};
