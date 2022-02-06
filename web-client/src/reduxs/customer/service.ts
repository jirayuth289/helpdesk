import SuperFetch from "../../helpers/superFetch";
import configs from "../../configs";

export default {
  searchCustomerByname: async (name: string) => {
    return SuperFetch.get(
      `${configs.endpoint}/v1/customer/search?keyword=${name}`
    );
  },

  getAllCustomer: async (name: string) => {
    return SuperFetch.get(`${configs.endpoint}/v1/customer?keyword=${name}`);
  },

  createCustomer: async (data: any) => {
    return SuperFetch.post(`${configs.endpoint}/v1/customer`, data);
  },
};
