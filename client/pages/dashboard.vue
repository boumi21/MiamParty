<template>
  <div class="container">
    <div>
      <h1 class="mt-4">Bienvenue {{$auth.user.firstname}}</h1>
      <hr />
      <h2 class="subtitle">Vous avez "number" soirées qui arrivent !</h2>

      <b-card-group deck class="mb-4">
        <b-card img-src="/images/party-food1.jpg" img-alt="party-food" img-top>
          <b-card-text>Préparez vos soirées qui arrivent, remémorez-vous celles du passé et plus encore !</b-card-text>
          <template v-slot:footer>
            <b-button block pill variant="outline-primary">Gérez vos soirées</b-button>
          </template>
        </b-card>

        <b-card img-src="/images/party-food2.jpg" img-alt="Image" img-top class>
          <b-card-text>Parcourez les soirées proposées par les autres utilisateurs et les restaurants !</b-card-text>
          <template v-slot:footer>
            <b-button block pill variant="outline-primary" class>Recherchez une soirée</b-button>
          </template>
        </b-card>

        <b-card img-src="/images/party-food3.jpg" img-alt="Image" img-top>
          <b-card-text>
            Vous vous sentez l'âme d'un cordon bleu et êtes prêt à accueillir ?
            <br />N'attendez plus pour créez
            <b>votre</b> soirée !
          </b-card-text>
          <template v-slot:footer>
            <b-button block pill variant="outline-primary" href="/party/create">Créez votre soirée</b-button>
          </template>
        </b-card>
      </b-card-group>

      <a href="#">
        <b-button pill variant="outline-secondary">
          <img src="/svg/user-profile.svg" alt="user profile" />Profil
        </b-button>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  middleware: "auth"
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
