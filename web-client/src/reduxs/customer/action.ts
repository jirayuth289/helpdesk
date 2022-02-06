import { CustomerData } from "./reducers";

const actions = {
  SEARCH_CUSTOMER: "SEARCH_CUSTOMER",
  SEARCH_CUSTOMER_SUCCESS: "SEARCH_CUSTOMER_SUCCESS",
  SEARCH_CUSTOMER_ERROR: "SEARCH_CUSTOMER_ERROR",

  GET_CUSTOMER: "GET_CUSTOMER",
  GET_CUSTOMER_SUCCESS: "GET_CUSTOMER_SUCCESS",
  GET_CUSTOMER_ERROR: "GET_CUSTOMER_ERROR",

  CREATE_CUSTOMER: "CREATE_CUSTOMER",
  CREATE_CUSTOMER_SUCCESS: "CREATE_CUSTOMER_SUCCESS",
  CREATE_CUSTOMER_ERROR: "CREATE_CUSTOMER_ERROR",

  searchCustomerByName: (name: string) => ({
    type: actions.SEARCH_CUSTOMER,
    name,
  }),

  getAll: (name?: string) => ({
    type: actions.GET_CUSTOMER,
    name,
  }),

  createCustomer: (data: CustomerData, redirect: Function) => ({
    type: actions.CREATE_CUSTOMER,
    data,
    redirect
  }),
};

export default actions;
