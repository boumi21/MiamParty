import api from "./api";

export default {
  login(credentials) {
    return api().post("user/login", credentials);
  },
  registerPart(credentials) {
    return api().post("user/registerPart", credentials);
  },
  registerPro(credentials) {
    return api().post("user/registerPro", credentials);
  },
  getCookingLevels(cookingLevels) {
    return api().post("part/getCookingLevels", cookingLevels);
  }
};
