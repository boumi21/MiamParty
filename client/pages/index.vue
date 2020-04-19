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
        Ceci sera la page d'accueil du site :)
      </h3>
      <b-form @submit="onSubmit" id="submit-group" v-if="show" method="post">

        <b-form-group id="input-group-login" class="input" label="" label-for="input-login">
          <b-form-input id="input-login" v-model="form.login" placeholder="E-mail ou numéro de mobile"></b-form-input>
          <small id="error-login" class=""></small>
        </b-form-group>

        <b-form-group id="input-group-password" class="input" label="" label-for="input-password" >
          <b-form-input
            id="input-password"
            v-model="form.password"
            type="password"
            placeholder="Mot de passe"
          ></b-form-input>
          <small id="error-password"></small>
        </b-form-group>

        <b-button type="submit" variant="primary">Se connecter</b-button>
        <!-- <b-button type="reset" variant="danger">Reset</b-button> -->
      </b-form>
      <div class="links">
        Envie de nous rejoindre ?
        <a
          href="/register"
        >
        Créer un compte
        </a>
      </div>
      <b-card class="mt-3" header="Form Data Result">
        <pre class="m-0">{{ form }}</pre>
      </b-card>
    </div>
  </div>
</template>

<script>
import logo from "@/components/Logo.vue"
import authService from "@/services/AuthService.js"
import formValidate from "@/assistant/FormValidate.js"

  export default {
    components: {
    logo
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

    methods: {
      async onSubmit(e) {
        e.preventDefault()

        /** Validate SignIn */

        let validate = await formValidate.validateSignIn(document, this.form)
        if (validate == false) {
          return
        }

        /** Send form to server-side */

        try {
          let res = await authService.login(this.form)
          console.log("Je reviens côté client")
          if (res.data.hasOwnProperty("error")) {
            let err = document.getElementById("error-password")
            err.innerText = res.data.error
            err.classList.add("text-danger")
            this.form.password = ""
            return
          }
          else {
            this.$router.push("/dashboard")
          }
        } catch (err) {
          console.log(err)
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
