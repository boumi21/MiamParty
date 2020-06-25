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

  getPartyPro(partyId) {
    return api().post("party/getPro", partyId);
  },

  getPartyPart(partyId) {
    return api().post("party/getPart", partyId);
  },

  bookParty(bookingInfo) {
    return api().post("party/book", bookingInfo);
  },

  getPartiesInc(id_account) {
    return api().post("party/getPartiesInc", id_account);
  },

  deleteParty(id_party) {
    return api().post("party/deleteParty", id_party);
  },

  getPartiesOwn(id_account) {
    return api().post("party/getPartiesOwn", id_account);
  },

  cancelParty(credentials) {
    return api().post("party/cancelParty", credentials);
  },

  getPartiesEnd(id_account) {
    return api().post("party/getPartiesEnd", id_account);
  },

  setPartyMark(credentials) {
    return api().post("party/setPartyMark", credentials);
  },

  getUserMark(credentials) {
    return api().post("party/getUserMark", credentials);
  },

  getCountParties(credentials) {
    return api().post("party/getCountParties", credentials);
  },

  getReview(credentials) {
    return api().post("party/getReview", credentials);
  }
};
