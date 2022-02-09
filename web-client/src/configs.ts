export default {
  endpoint:
    process.env.NODE_ENV === "development"
      ? "http://localhost:9000"
      : process.env.REACT_APP_API_ENDPOINT,
  table: {
    pageSize: 10,
  },
};
