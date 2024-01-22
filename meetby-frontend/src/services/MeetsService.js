import httpClient from './http/httpClient'

class MeetsService {
    async getAll(filter) {
        const params = {}
        if (filter) {
            params["status"] = filter
        }
        const response = await httpClient.get("/meets", { params: params })
        if (response.status === 200) {
            return response.data
        } else {
            return []
        }
    }
}

export default new MeetsService()