import axios from "axios";
import router from "@/router"
import { useAuthStore } from '@/stores/auth.js'

function createAxiosClient() {
    const instance = axios.create({
        baseURL: import.meta.env.VITE_MEETBY_BACKEND_BASE_URL,
        headers: {
            'Content-Type': 'application/json',
        },
    })

    // Insert token when available
    instance.interceptors.request.use((config) => {
        const authStore = useAuthStore()
        if (authStore.isLoggedIn) {
            config.headers.Authorization = authStore.authToken
        }
        return config;
      }, function (error) {
        return Promise.reject(error);
      });

    // Unauthorized requests (token not provided or stale)
    instance.interceptors.response.use((response) => {
        return response;
    }, (error) => {
        if (error.response.status == 401 && !error.response.request.responseURL.includes("/login")) {
            router.push({ name: "login" })
        }
        if (error.response.status == 404) {
            router.push({ name: "not-found" })
        }
        return Promise.reject(error.response);
    });

    return instance
}

const httpClient = createAxiosClient()
export default httpClient
