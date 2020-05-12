<template>
  <div class="container">
    <div>
        <h1 class="mt-4">Informations du compte</h1>
        <hr />
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-card variant="light" header="Informations de l'organisation" style="max-width: 35rem;" align="center" class="mx-auto">
                <b-form-group id="input-group-name" label="Nom" label-for="input-name">
                <b-form-input
                    id="input-name"
                    v-model="form.name"
                    placeholder=""
                    onkeydon
                ></b-form-input>
                <small id="error-name"></small>
                </b-form-group>
            </b-card>

            <b-card variant="light" header="Sécurite du compte" style="max-width: 35rem;" align="center" class="mx-auto mt-4">
                <b-form-group
                    id="input-group-email"
                    label="E-mail"
                    label-for="input-email"
                    description=""
                >
                <b-form-input
                    id="input-email"
                    v-model="form.email"
                    placeholder=""
                ></b-form-input>
                <small id="error-email"></small>
                </b-form-group>

                <b-form-group id="input-group-password" label="Nouveau mot de passe" label-for="input-password">
                <b-form-input
                    id="input-password"
                    v-model="form.password"
                    type="password"
                    placeholder=""
                ></b-form-input>
                <small id="error-password"></small>
                </b-form-group>

                <b-form-group id="input-group-confirm-password" label="Confirmez le mot de passe" label-for="input-confirm-password">
                <b-form-input
                    id="input-confirm-password"
                    v-model="form.confirmPassword"
                    type="password"
                    placeholder=""
                ></b-form-input>
                <small id="error-confirm-password"></small>
                </b-form-group>

                <b-form-group id="input-group-actual-password" label="Mot de passe actuel" label-for="input-actual-password">
                <b-form-input
                    id="input-actual-password"
                    v-model="form.actualPassword"
                    type="password"
                    placeholder=""
                ></b-form-input>
                <small id="error-actual-password"></small>
                </b-form-group>
            </b-card>

            <b-card variant="light" header="Adresse" style="max-width: 35rem;" align="center" class="mx-auto mt-4">
                <b-form-group
                    label="Numéro :"
                    label-for="input-nb-address"
                >
                <b-form-input 
                    id="input-nb-address"
                    v-model="form.nbAddress"
                    placeholder=""
                ></b-form-input>
                <small id="error-nb-address"></small>
                </b-form-group>

                <b-form-group
                    label="Rue :"
                    label-for="input-street"
                >
                <b-form-input
                    id="input-street"
                    v-model="form.street"
                    placeholder=""
                ></b-form-input>
                <small id="error-street"></small>
                </b-form-group>

                <b-form-group
                    label="Ville :"
                    label-for="input-city"
                >
                 <b-form-input
                    id="input-city"
                    v-model="form.city"
                    placeholder=""
                    ></b-form-input>
                    <small id="error-city"></small>
                </b-form-group>

                <b-form-group
                    label="Code postal :"
                    label-for="input-postal-code"
                >
                <b-form-input
                id="input-postal-code"
                    v-model="form.postalCode"
                    placeholder=""
                ></b-form-input>
                <small id="error-postal-code"></small>
                </b-form-group>

                <b-form-group
                    label="Pays :"
                    label-for="input-country"
                >
                <b-form-input
                id="input-country"
                    v-model="form.country"
                    placeholder=""
                ></b-form-input>
                <small id="error-country"></small>
                </b-form-group>
            </b-card>

            <b-button type="submit" id="submit-btn" variant="primary" class="mt-3" :disabled=false>Modifier</b-button>
            <!-- <b-button type="reset" variant="danger">Reset</b-button> -->
        </b-form>
      
    <b-card class="mt-3" header="Form Data Result">
        <pre class="m-0">{{ form }}</pre>
    </b-card>
        </div>
    </div>
</template>

<script>
import formValidate from "@/assistant/FormValidate.js"
import userService from "@/services/UserService.js"
import authService from "@/services/AuthService.js"

export default {

    mounted: function () {
    this.$nextTick(async function () {
        try {
            let result = await userService.getUserInfo({
                id_account: this.$auth.user.id,
                id_account_type: this.$auth.user.accountType
            })
            this.form.name = result.data.name
            this.form.email = result.data.email
            this.form.nbAddress= result.data.nb_address
            this.form.street = result.data.street
            this.form.city = result.data.city
            this.form.postalCode = result.data.postal_code
            this.form.country = result.data.country
            this.form.salt = result.data.salt
            this.form.pwcheck = result.data.password
        }
        catch (e) {
            console.log(e)
        }
    })
    },
  
  data() {
     
    return {
      form: {
        name: '',
        email: '',
        password: null,
        confirmPassword: null,
        actualPassword: null,
        nbAddress: null,
        street: null,
        city: null,
        postalCode: null,
        country: null,
        salt: null,
        pwcheck: null,
        accountId: this.$auth.user.id,
        professionalId: this.$auth.user.idPro
      },
      show: true
    }
  },
  
  methods: {
    async onSubmit(e) {
        e.preventDefault()

    /** Validate Update */

    let validate = await formValidate.validateUpdatePro(document, this.form)
        if (validate == false) {
            return
        }

    /** Send form to server-side */

    try {
        console.log("jenvoie")
        let res = await userService.updatePro(this.form)
        console.log("je reviens")
        console.log(res.data)
        if (res.data.hasOwnProperty("error")) {
            console.log(res.data.error)
            let err = document.getElementById("error-password")
            err.innerText = res.data.error
            err.classList.add("text-danger")
            this.form.password = null
            this.form.confirmPassword = null
            this.form.actualPassword = null
            return
        }
        else {
            try {
                location.reload()
            }
            catch (error) {
                console.log(error)
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
      this.form.checked = null
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
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