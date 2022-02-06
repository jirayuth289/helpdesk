import ip from "ip";

const oneMinute = 1000 * 60;
const oneHr = oneMinute * 60;
const oneDay = oneHr * 24;

export default {
  clientHost: "http://localhost:3000",
  host: process.env.HOST,
  port: process.env.PORT,
  sesstionTime: oneDay * 180,
  whitelist: [
    "http://localhost:3000",
    `http://${ip.address()}:3000`,
    `http://${ip.address()}:3001`,
    undefined,
  ],
  sesseionOptions: {
    name: "ekyc-sid",
    secret: "ekyc-secretkey",
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, sameSite: 'lax', domain: 'localhost', secure: false },
  },
  bucketName: "apptify-ekyc-dev",
  redis: {
    URL: "redis://localhost:6371",
    prefix: "",
  },
  otpExpiredIn: 160, //seconds
  proxyHost: "http://localhost:9002",
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
