import api from "./api"

export default {
    
    createParty(partyInfo) {
        return api().post('party/create', partyInfo)
    },

    getParties(){
        return api().post('party/getAll')
    }
}