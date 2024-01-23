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

    async get(meetId) {
        const response = await httpClient.get(`/meets/${meetId}`)
        if (response.status === 200) {
            return response.data
        } else {
            return null
        }
    }

    async update(meetId, updateBody) {
        const response = await httpClient.put(`/meets/${meetId}`, updateBody)
        return response.status === 204
    }

    async setPersonalAvailabilities(meetId, availabilities) {
        const response = await httpClient.put(`/meets/${meetId}/availabilities`, availabilities)
        return response.status === 204
    }

    async leaveMeeting(meetId) {
        const response = await httpClient.delete(`/meets/${meetId}/partecipations`)
        return response.status === 204
    }
}

export default new MeetsService()