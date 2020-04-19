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
      <b-form @submit="onSubmit" id="submit-group" v-if="show" method="post">

        <b-form-group id="input-group-login" class="input">
          <b-form-input id="input-login" v-model="form.login" placeholder="E-mail ou numéro de mobile"></b-form-input>
          <small id="error-login" class=""></small>
        </b-form-group>

        <b-form-group id="input-group-password" class="input">
          <b-form-input
            id="input-password"
            v-model="form.password"
            type="password"
            placeholder="Mot de passe"
          ></b-form-input>
          <small id="error-password"></small>
        </b-form-group>

        <b-button type="submit" variant="primary">Se connecter</b-button>

      </b-form>


      <div class="links">
        Envie de nous rejoindre ?
        <a href="/register">
        Créer un compte
        </a>
      </div>
      <!-- <b-card class="mt-3" header="Form Data Result">
        <pre class="m-0">{{ form }}</pre>
      </b-card> -->
    </div>
  </div>
</template>


<script>
import Logo from '~/components/Logo.vue'
import authService from "@/services/AuthService.js"
import formValidate from "@/assistant/FormValidate.js"

export default {
  components: {
    Logo
  },
  data() {
    return {
      form: {
        login: "",
        password: ""
      },
      show: true
    };
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault();

      let validate = await formValidate.validateSignIn(document, this.form)
        if (validate == false) {
          return
        }


      try {
        let res = await this.$auth.loginWith('local', { data: {
          login: this.form.login,
          password: this.form.password
        } })

        this.$router.push("/dashboard");


      } catch (error) {
        let err = document.getElementById("error-password")
        err.innerText = "Votre identifiant ou mot de passe est incorrect !";
        err.classList.add("text-danger");
      }

      
    }
  }
};
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

.input {
  justify-content: left;
  text-align: left;
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
