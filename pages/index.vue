<template>
  <div class="container">
    <div>
      <logo />
      <h1 class="title">
        Miam Party
      </h1>
      <h2 class="subtitle">
        Bienvenue !
      </h2>
      <h3 class="info">
        Connectez-vous pour découvrir toutes nos fonctionnalités.
      </h3>
      <div>
    <b-form @submit="onSubmit" v-if="show">
      

      <b-form-group id="input-group-pseudo" label="Votre pseudo:" label-for="input-pseudo">
        <b-form-input
          id="input-pseudo"
          v-model="form.pseudo"
          required
          placeholder="Entrez votre pseudo"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-mdp" label="Mot de passe:" label-for="input-mdp">
        <b-form-input
          id="input-mdp"
          v-model="form.mdp"
          type="password"
          required
          placeholder="Entrez votre mot de passe"
        ></b-form-input>
      </b-form-group>

      

      <b-button type="submit" variant="primary">Je m'inscris</b-button>
      <!-- <b-button type="reset" variant="danger">Reset</b-button> -->
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </div>
      <div class="links">
        <a
          href="/connection"
          class="button--green"
        >
          Connexion
        </a>
        <a
          href="/register2"
          class="button--grey"
        >
          Inscription
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
var Database = require('~/server/database/Database.js');

//Database.request("SELECT * from TR_COOKING_LEVEL;");



var particulier = require('~/server/dao/particulier.js');

  export default {
    components: {
    Logo
  },
    data() {
      return {
        form: {
          pseudo: '',
          mdp: ''
        },
        show: true
      }
    },
    methods: {
      async onSubmit(registrationInfo) {
          console.log("lol");
        let user = await particulier.addUser(registrationInfo);
      },
    }
  }

</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
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

.info {
  font-weight: 300;
  font-size: 20px;
  color: #000000;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
