import api from './api'

export default {
    login(credentials) {
        return api().post('users/login', credentials);
    },
    register(credentials) {
        return api().post('users/register', credentials)
    }
}