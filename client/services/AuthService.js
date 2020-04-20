import api from "./api"

export default {
    login(credentials) {
        return api().post('user/login', credentials)
    },
    registerPart(credentials) {
        return api().post('user/registerPart', credentials)
    },
    getCookingLevels() {
        console.log("je passe dans authservice")
        return api().post('query/getCookingLevels')
    }
}