import api from "./api"

export default {
    
    getCookingLevels(cookingLevels) {
        console.log("je passe dans authservice")
        return api().post('part/getCookingLevels', cookingLevels)
    }
}