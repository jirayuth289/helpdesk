import { DataCustomerCreation } from "./reducers";

const actions = {
  GET_PROBLEM: "GET_PROBLEM",
  GET_PROBLEM_SUCCESS: "GET_PROBLEM_SUCCESS",
  GET_PROBLEM_ERROR: "GET_PROBLEM_ERROR",

  CREATE_PROBLEM: "CREATE_PROBLEM",
  CREATE_PROBLEM_SUCCESS: "CREATE_PROBLEM_SUCCESS",
  CREATE_PROBLEM_ERROR: "CREATE_PROBLEM_ERROR",

  getDataProblem: (keyword: string) => ({
    type: actions.GET_PROBLEM,
    keyword
  }),

  createProblem: (data: DataCustomerCreation, redirect) => ({
    type: actions.CREATE_PROBLEM,
    data,
    redirect
  }),
};

export default actions;
