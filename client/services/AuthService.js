import api from "./api"

export default {
    login(credentials) {
        return api().post('user/login', credentials)
    },
    register(credentials) {
        return api().post('user/register', credentials)
    }
}