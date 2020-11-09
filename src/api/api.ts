import axios from "axios";
import {NullableType} from "../utils/typeAssist";


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "c221a774-09dc-4bbd-a2fb-6e9202854d46"
    }
})


export type ResponsefolowUnfollowType<T> = {
    resultCode: number
    messages: string[]
    data: T
}

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
        return instance.get(`profile/status/` + userId) // URI parametr
    },
    updateStatus(status: string) {
        return instance.put(`profile/status/`, {status})
    },
    savePhoto(photoFile: Blob) {
        const formData = new FormData();
        formData.append("image", photoFile)
        return instance.put(`profile/photo/`, formData, {headers: {'Content-Type': 'multipart/form-data'}})
    },
    saveProfile(profile: any) { // ANY!!!!!!!!!!!!!
        return instance.put(`profile`, profile);
    },
}
export const authAPI = {
    me() {
        return instance.get(`auth/me`)
    },
    login(email: string, password: string, rememberMe = false, captcha: NullableType<boolean>) {
        return instance.post(`auth/login`, {email, password, rememberMe, captcha})
    },
    logout() {
        return instance.delete(`auth/login`)
    }
}
export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`)
    },
}
