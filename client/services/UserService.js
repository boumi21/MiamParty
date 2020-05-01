import api from "./api"

export default {
    
     getUserAddress(userId) {
         console.log("je passe dans getUserAddress")
         return api().post('user/userAddress', userId)
     }
}