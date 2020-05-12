import api from "./api"

export default {
    
     getUserAddress(userId) {
         console.log("je passe dans getUserAddress")
         return api().post('user/userAddress', userId)
     },
     updatePart(credentials) {
         return api().post('user/updatePart', credentials)
     },
     updatePro(credentials) {
        return api().post('user/updatePro', credentials)
    },
     getUserInfo(credentials) {
         return api().post('user/getUserInfo', credentials)
     }

}