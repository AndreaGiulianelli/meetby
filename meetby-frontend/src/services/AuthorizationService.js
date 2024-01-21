import httpClient from './http/httpClient'

class AuthorizationService {
    async login(email, password) {
        try {
            const response = await httpClient.post("/login", { email: email, password: password })
            return response.data.accessToken
        } catch (error) {
            return false    
        }
    }

    async signup(user) {
        try {
            await httpClient.post("/signup", {
                name: user.name,
                surname: user.surname,
                username: user.username,
                email: user.email,
                password: user.password,
            })

            return { success: true }
        } catch(error) {
            if (error.status == 409) {
                return {
                    status: false,
                    error: error.data.message.includes("username") ? "username" : "email"
                }
            } else {
                return { success: false }
            }
        }
    }
}

export default new AuthorizationService()