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
    <b-form @submit="onSubmit" id="submit-group" v-if="show" method="post">
      <b-form-group class="invalid" id="input-group-login" label="Login" label-for="input-login">
        <b-form-input
          id="input-login"
          v-model="form.login"
          :state="validation"
          required
          placeholder="Email or username"
          minlength="4"
          maxlength="60"
        ></b-form-input>
        <b-form-invalid-feedback id="feedback" :state="validation">
          Your login must be 4-60 characters long.
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="input-group-password" label="Mot de passe" label-for="input-password">
        <b-form-input
          id="input-password"
          v-model="form.password"
          type="password"
          required
          minlength="8"
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
          login   : '',
          password: ''
        },
        show: true
      }
    },

    computed: {
      validation() {
        if (this.form.login.length == 6) {
          document.getElementById("input-login").setCustomValidity("dede");
          console.log(document.getElementById("feedback").value);
          return true;
        }
        if (this.form.login.length > 4 && this.form.login.length < 13) {
        
        }
        if (this.form.login.length == 6) {
          
        }
        else {
      
        }
        return false;
      },
    },


    methods: {
      async onSubmit(e) {
        e.preventDefault();
        console.log("je passe ici");
        try {
          let response = await authService.login(this.form);
          console.log("Je reviens côté client");
          console.log("Réponse de authService :");
          console.log(response.data.hasOwnProperty("error"))
          if (response.data.hasOwnProperty("error")) {
            console.log(response.data.error);
            return;
          }
          else {
            console.log(response.data);
            this.$router.push("/connection");
          }
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
