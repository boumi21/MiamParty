import api from "./api";

export default {
  createParty(partyInfo) {
    return api().post("party/create", partyInfo);
  },

  getParties(filters) {
    return api().post("party/getAll", filters);
  },

  getPartyType(partyId) {
    return api().post("party/getType", partyId);
  },

  getPartyPro(partyId){
      return api().post("party/getPro", partyId)
  },

  getPartyPart(partyId){
    return api().post("party/getPart", partyId)
}
};
