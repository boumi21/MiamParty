<template>
  <div class="container">
    <div>
      <LogoMiam class="mt-4 mb-4" />
      <h3 class="info">
        Inscrivez-vous pour découvrir toutes nos fonctionnalités
      </h3>
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group id="input-group-name" label="" label-for="input-name">
          <b-form-input
            id="input-name"
            v-model="form.name"
            placeholder="Nom du restaurant"
          ></b-form-input>
          <small id="error-name"></small>
        </b-form-group>

        <b-form-group
          id="input-group-email"
          label=""
          label-for="input-email"
          description=""
        >
          <b-form-input
            id="input-email"
            v-model="form.email"
            placeholder="E-mail"
          ></b-form-input>
          <small id="error-email"></small>
        </b-form-group>

        <b-form-group id="input-group-password" label="" label-for="input-password">
          <b-form-input
            id="input-password"
            v-model="form.password"
            type="password"
            placeholder="Choisissez un mot de passe"
          ></b-form-input>
          <small id="error-password"></small>
        </b-form-group>

        <b-form-group id="input-group-confirm-password" label="" label-for="input-confirm-password">
          <b-form-input
            id="input-confirm-password"
            v-model="form.confirmPassword"
            type="password"
            placeholder="Confirmez le mot de passe"
          ></b-form-input>
          <small id="error-confirm-password"></small>
        </b-form-group>

        <b-button type="submit" variant="primary">Je m'inscris</b-button>
        <!-- <b-button type="reset" variant="danger">Reset</b-button> -->
      </b-form>

      <div class="links mb-2">
        Vous possédez déjà un compte ?
        <a
          href="/login"
        >
        S'identifier
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import LogoMiam from "~/components/LogoMiam.vue"
import formValidate from "@/assistant/FormValidate.js"
import authService from "@/services/AuthService.js"

export default {  
components: {
    LogoMiam
  },
  data() {
     
    return {
      form: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        accountType: null
      },
      
      show: true
    }
  },
  
  methods: {
    async onSubmit(e) {
    e.preventDefault()

    /** Validate SignUp */
    
    let validate = await formValidate.validateSignUpPro(document, this.form)
        if (validate == false) {
            return
        }

    /** Send form to server-side */

    try {
      let res = await authService.registerPro(this.form)
      if (res.data.hasOwnProperty("error")) {
        let err = document.getElementById("error-password")
        err.innerText = res.data.error
        err.classList.add("text-danger")
        this.form.password = ""
        this.form.confirmPassword = ""
        return
      }
      else {
        try {
        let res = await this.$auth.loginWith('local', { data: {
          email: this.form.email,
          password: this.form.password
        } })

        this.$root.$bvToast.toast("Inscription éffectuée", {
          title: `Bienvenue !`,
          variant: "success",
          solid: true
        });
        this.$router.push("/dashboard")


      } catch (error) {
      }
      }
    }
    catch(e) {
      console.log(e)
    }

    
  },
    onReset(evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.name = ''
      this.form.food = null
      this.form.checked = null
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

</style>