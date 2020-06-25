<template>
  <div class="container">
    <div>
      <LogoMiam class="mt-4 mb-4" />
      <h1 class="title">
        <span class="brand">MiamParty</span>
      </h1>
      <h2 class="subtitle">Bienvenue !</h2>
      <h3 class="info">Connectez-vous pour avoir accès à toutes vos fonctionnalités.</h3>
      <b-form @submit="onSubmit" id="submit-group" v-if="show" method="post">
        <b-form-group id="input-group-email" class="input">
          <b-form-input id="input-email" v-model="form.email" placeholder="E-mail"></b-form-input>
          <small id="error-email"></small>
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

      <div class="links mb-4">
        Envie de nous rejoindre ?
        <a href="/register">Créer un compte</a>
      </div>
    </div>
  </div>
</template>


<script>
import Logo from "~/components/Logo.vue";
import LogoMiam from "~/components/LogoMiam.vue";
import authService from "@/services/AuthService.js";
import formValidate from "@/assistant/FormValidate.js";

export default {
  components: {
    Logo,
    LogoMiam
  },
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      show: true
    };
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault();
      // Valide le formulaire
      let validate = await formValidate.validateSignIn(document, this.form);
      if (validate == false) {
        return;
      }

      try {
        // Tente de loguer l'utilisateur
        let res = await this.$auth.loginWith("local", {
          data: {
            email: this.form.email,
            password: this.form.password
          }
        });

        this.$router.push("/dashboard");
      } catch (error) {
        let err = document.getElementById("error-password");
        err.innerText = "Votre identifiant ou mot de passe est incorrect !";
        err.classList.add("text-danger");
      }
    }
  }
};
</script>



<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Carter+One&display=swap");
.brand {
  font-family: "Carter One", cursive;
}

.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
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
