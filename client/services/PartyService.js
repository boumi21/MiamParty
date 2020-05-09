import api from "./api"

export default {
    
    createParty(partyInfo) {
        return api().post('party/create', partyInfo)
    },

    getParties(filters){
        return api().post('party/getAll', filters)
    }
}