import httpClient from './http/httpClient'

class UserService {
    async getUsersStarting(startWith) {
        const response = await httpClient.get("/users", {
            params: { 'startsWith': startWith }
        })
        if (response.status === 200) {
            return response.data
        } else {
            return []
        }
    }
}

export default new UserService()
