<template>
  <div class="container">
    <div class="mb-4">
      <h1 class="mt-4" v-if="$auth.user.isPart">Bienvenue {{$auth.user.firstname}}</h1>
      <h1 class="mt-4" v-if="$auth.user.isPro">Bienvenue {{$auth.user.namePro}}</h1>
      <hr />
      <h2 class="subtitle">Vous avez <b-badge href="/party/management" variant="primary">{{numberParties}}</b-badge> soirée(s) à venir !</h2>

      <b-card-group deck class="mb-4">
        <b-card img-src="/images/party-food1.jpg" img-alt="party-food" img-top>
          <b-card-text>Préparez vos soirées qui arrivent, remémorez-vous celles du passé et plus encore !</b-card-text>
          <template v-slot:footer>
            <b-button block pill variant="outline-primary" href="/party/management">Gérez vos soirées</b-button>
          </template>
        </b-card>

        <b-card v-if="$auth.user.isPart" img-src="/images/party-food2.jpg" img-alt="Image" img-top class>
          <b-card-text>Parcourez les soirées proposées par les autres utilisateurs et les restaurants !</b-card-text>
          <template v-slot:footer>
            <b-button
              block
              pill
              variant="outline-primary"
              href="/party/part/search"
            >Recherchez une soirée</b-button>
          </template>
        </b-card>

        <b-card img-src="/images/party-food3.jpg" img-alt="Image" img-top>
          <b-card-text>
            Vous vous sentez l'âme d'un cordon bleu et êtes prêt à accueillir ?
            <br />N'attendez plus pour créer
            <b>votre</b> soirée !
          </b-card-text>
          <template v-slot:footer>
            <b-button block pill variant="outline-primary" href="/party/create">Créez votre soirée</b-button>
          </template>
        </b-card>
      </b-card-group>

      <a v-if="$auth.user.isPart" href="./settings/part">
        <b-button pill variant="outline-secondary">
          <img src="/svg/user-profile.svg" alt="user profile" />Profil
        </b-button>
      </a>
      <a v-if="$auth.user.isPro" href="./settings/pro">
        <b-button pill variant="outline-secondary">
          <img src="/svg/user-profile.svg" alt="user profile" />Profil
        </b-button>
      </a>
    </div>
  </div>
</template>

<script>
import partyService from "@/services/PartyService.js";

export default {
  middleware: "auth",

  data() {
    return {
      numberParties: 0
    };
  },

  async mounted() {

    let result = await partyService.getCountParties({isPart: this.$auth.user.isPart, id_account: this.$auth.user.id});
    console.log(result)
    this.numberParties = result.data[0].count
  }
};
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  /* align-items: center; */
  text-align: center;
}

.card-footer {
  background-color: white;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
</style>
