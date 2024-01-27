import httpClient from './http/httpClient'

class NotificationService {
    async getAll() {
        const response = await httpClient.get("/user/notifications")
        if (response.status === 200) {
            return response.data
        } else {
            return []
        }
    }

    async markAsRead(notificationId) {
        const response = await httpClient.put(`/user/notifications/${notificationId}`)
        if (response.status === 204) {
            return true
        } else {
            return false
        }
    }
}

export default new NotificationService()