import actions from "./action";

export interface DataCustomerCreation {
  customerId: number | undefined;
  type: string;
  description: string;
  note?: string;
  location?: {
    project: string;
    addressNo: string;
    repairType: string;
  };
}

export interface ProblemSchema {
  problemId: number;
  customerId: number;
  type: string;
  description: string;
  note: string;
  createdAt: string;
  Location: {
    project: string;
    addressNo: string;
    repairType: string;
  };
  Customer: {
    customerName: string;
  };
}

export interface StateProblem {
  loading: boolean;
  data: ProblemSchema[];
}

const initState: StateProblem = {
  loading: false,
  data: [],
};

export default function (state = initState, action: any) {
  switch (action.type) {
    case actions.GET_PROBLEM:
      return {
        ...state,
        loading: true,
      };
    case actions.GET_PROBLEM_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
      };
    case actions.GET_PROBLEM_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
