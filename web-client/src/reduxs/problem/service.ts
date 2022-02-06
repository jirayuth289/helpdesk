import SuperFetch from '../../helpers/superFetch';
import configs from '../../configs'

export default {
    getService: async (keyword: string) => {
        return SuperFetch.get(`${configs.endpoint}/v1/problem?keyword=${keyword}`)
    },

    createProblem: async (data) => {
        return SuperFetch.post(`${configs.endpoint}/v1/problem`, data)
    }
}