import actions from "./action";

export interface CustomerSearch {
  value: number;
  label: string;
}

export interface CustomerData {
  customerId: number | undefined;
  customerName: string;
  mobileNumber: string;
  createdAt: string | undefined;
}

export interface StateCustomer {
  loading: boolean;
  dataSearch: CustomerSearch[];
  data: CustomerData[];
}

const initState: StateCustomer = {
  loading: false,
  dataSearch: [],
  data: [],
};

export default function (state = initState, action: any): StateCustomer {
  switch (action.type) {
    case actions.SEARCH_CUSTOMER:
      return {
        ...state,
        loading: true,
      };
    case actions.SEARCH_CUSTOMER_SUCCESS:
      return {
        ...state,
        loading: false,
        dataSearch: action.data,
      };
    case actions.SEARCH_CUSTOMER_ERROR:
      return {
        ...state,
        loading: false,
      };
    case actions.GET_CUSTOMER:
      return {
        ...state,
        loading: true,
      };
    case actions.GET_CUSTOMER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
      };
    case actions.GET_CUSTOMER_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
