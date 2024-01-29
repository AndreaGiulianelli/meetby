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

    async get(meetId, guest) {
        const params = {}
        if (guest) {
            params['guest'] = guest
        }
        try {
            const response = await httpClient.get(`/meets/${meetId}`, { params: params })
            if (response.status === 200) {
                return response.data
            } else {
                return null
            }
        } catch (err) {
            return null
        }
    }

    async create(meet) {
        const response = await httpClient.post('/meets', meet)
        return response.status === 201
    }

    async update(meetId, updateBody) {
        const response = await httpClient.put(`/meets/${meetId}`, updateBody)
        return response.status === 204
    }

    async delete(meetId) {
        const response = await httpClient.delete(`/meets/${meetId}`)
        return response.status === 204
    }

    async setPersonalAvailabilities(meetId, availabilities, guest) {
        const params = {}
        if (guest) {
            params['guest'] = guest
        }
        const response = await httpClient.put(`/meets/${meetId}/availabilities`, availabilities, { params: params })
        return response.status === 204
    }

    async leaveMeeting(meetId, guest) {
        const params = {}
        if (guest) {
            params['guest'] = guest
        }
        const response = await httpClient.delete(`/meets/${meetId}/partecipations`, { params: params })
        return response.status === 204
    }

    async getChat(meetId) {
        try {
            const response = await httpClient.get(`/meets/${meetId}/chat`)
            if (response.status === 200) {
                return response.data
            } else {
                return []
            }
        } catch (err) {
            return []
        }
    }
}

export default new MeetsService()