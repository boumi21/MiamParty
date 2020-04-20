<template>
  <div class="container">
    <div>
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group id="input-group-firstname" label="" label-for="input-firstname">
          <b-form-input
            id="input-firstname"
            v-model="form.firstname"
            placeholder="Prénom"
          ></b-form-input>
          <small id="error-firstname"></small>
        </b-form-group>

        <b-form-group id="input-group-lastname" label="" label-for="input-lastname">
          <b-form-input
            id="input-lastname"
            v-model="form.lastname"
            placeholder="Nom"
          ></b-form-input>
          <small id="error-lastname"></small>
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

        <b-form-group id="input-group-level" label="" label-for="input-level">
          <b-form-select
            id="input-level"
            v-model="form.level"
            :options="levels"
          ></b-form-select>
          <small id="error-level"></small>
        </b-form-group>

        <b-form-group id="input-group-sex" label="Sexe" label-for="input-sex">
          <b-form-radio-group
            v-model="form.sex"
            :options="sexs"
            id="input-sex"
        ></b-form-radio-group>
        <small id="error-sex"></small>
        </b-form-group>

        <b-form-group id="input-group-birth" label="Date de naissance" label-for="input-birth">
          <b-form-input type="date" id="input-birth" v-model="form.birth"></b-form-input>
          <small id="error-birth"></small>
        </b-form-group>

        <b-button type="submit" variant="primary">Je m'inscris</b-button>
        <!-- <b-button type="reset" variant="danger">Reset</b-button> -->
      </b-form>

      <div class="links">
        Vous possédez déjà un compte ?
        <a
          href="/login"
        >
        S'identifier
        </a>
      </div>
      <b-card class="mt-3" header="Form Data Result">
        <pre class="m-0">{{ form }}</pre>
      </b-card>
    </div>
  </div>
</template>

<script>
import formValidate from "@/assistant/FormValidate.js"
import authService from "@/services/AuthService.js"

if (process.client) {
  (async function() {
    let result = await authService.getCookingLevels()
    console.log(this.form)
    if (result.data.hasOwnProperty("error")) {
      console.log(result.data.error)
    }
    else {
      console.log(this.form)
      for (let i = 0; i < res.data.length; i ++) {
        this.form.sexs.push({text: result.data[i].description, value: result.data[i].id_cooking_level})
      }
    }
  })()
}

export default {
  data() {
    return {
      form: {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: '',
        level: null,
        sex: null,
        birth: null,
        accountType: null
      },
      sexs: [{text: 'Femme', value: true}, {text: 'Homme', value: false}, {text: 'Non précisé', value: null}],
      levels: [{text: 'test', value: 1}, {text: 'pas vide', value: 2],
      show: true
    }
  },
  methods: {
    async onSubmit(e) {
    e.preventDefault()

    /** Validate SignUp */

    let validate = await formValidate.validateSignUpPart(document, this.form)
      if (validate == false) {
        return
      }
      console.log(this.form.sex.value)
    /** Send form to server-side */

    try {
      let res = await authService.registerPart(this.form)
      if (res.data.hasOwnProperty("error")) {
        let err = document.getElementById("error-password")
        err.innerText = res.data.error
        err.classList.add("text-danger")
        this.form.password = ""
        return
      }
      else {
        console.log("Le succès")
        //this.$router.push("/dashboard")
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

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

</style>