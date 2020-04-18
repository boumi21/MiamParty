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
    <b-form @submit="onSubmit" v-if="show" method="post">
      <b-form-group id="input-group-login" label="Login" label-for="input-login">
        <b-form-input
          id="input-login"
          v-model="form.login"
          required
          placeholder="Email or username"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-password" label="Mot de passe" label-for="input-password">
        <b-form-input
          id="input-password"
          v-model="form.password"
          type="password"
          required
          placeholder="Saisir un mot de passe"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Se connecter</b-button>
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
          href="/register"
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
import authService from "@/services/AuthService.js";

//var Particular = require('~/server/dao/Particular.js');

  export default {
    components: {
    Logo
  },
    data() {
      return {
        form: {
          login   : null,
          password: null
        },
        show: true
      }
    },
    methods: {
      async onSubmit() {
      try {
        let response = await authService.login(this.form);
        console.log("Je reviens côté client");
        console.log("Réponse de authService :");
        console.log(response.data.client);
        console.log(response.data.client.ID_ACCOUNT);
      } catch (err) {
        console.log(err);
      }
    }
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
