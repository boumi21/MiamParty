import api from "./api";

export default {
  getCookingLevels(cookingLevels) {
    return api().post("part/getCookingLevels", cookingLevels);
  }
};
