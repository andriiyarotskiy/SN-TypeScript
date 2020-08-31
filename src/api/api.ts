import axios from "axios";


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "c221a774-09dc-4bbd-a2fb-6e9202854d46"
    }
})


export const usersAPI = {
    getUser(currentPage: number, pageSize: any) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    follow(userId: number) {
        return instance.post(`follow/${userId}`)
    },
    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`)
    },
    getProfile(userId: string) {
        console.warn('Obsolete method. Please use profileAPi object')
        return profileAPI.getProfile(userId)
    }
}
export const profileAPI = {
    getProfile(userId: string) {
        return instance.get(`profile/` + userId) // query parametr
    },
    getStatus(userId: string) {
        return instance.get(`status/` + userId) // URI parametr
    },
    updateStatus(status: string) {
        return instance.put(`profile/status/`, {status})
    },
}
export const authAPI = {
    me() {
        return instance.get(`auth/me`)
    }
}
