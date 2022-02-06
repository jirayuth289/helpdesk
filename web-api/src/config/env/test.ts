const oneMinute = 1000 * 60;
const oneHr = oneMinute * 60;
const oneDay = oneHr * 24;

export default {
  clientHost: "http://app.ekyc.apptify.io",
  host: process.env.HOST,
  port: process.env.PORT,
  sesstionTime: oneDay * 180,
  whitelist: [process.env.CLIENT_HOST as string],
  sesseionOptions: {
    name: "ekyc-sid",
    secret: "ekyc-secretkey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      domain: "localhost",
      secure: false,
    },
  },
  bucketName: process.env.BUCKET,
  redis: {
    URL: process.env.REDIS_URI,
    prefix: "ekyc",
  },
  otpExpiredIn: 60,
  proxyHost: process.env.PROXY_HOST,
  mailData: {
    from: {
      email: "jirayuth.si.56@ubu.ac.th",
      name: "Apptify EKYC",
    },
    replyTo: {
      email: "fuber.dev@gmail.com",
      name: "support team",
    },
  },
};
