<template>
  <div class="container">
    <div>
      <LogoMiam class="mt-4 mb-4" />
      <h3 class="info">Inscrivez-vous pour découvrir toutes nos fonctionnalités</h3>
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group id="input-group-firstname" label label-for="input-firstname">
          <b-form-input id="input-firstname" v-model="form.firstname" placeholder="Prénom"></b-form-input>
          <small id="error-firstname"></small>
        </b-form-group>

        <b-form-group id="input-group-lastname" label label-for="input-lastname">
          <b-form-input id="input-lastname" v-model="form.lastname" placeholder="Nom"></b-form-input>
          <small id="error-lastname"></small>
        </b-form-group>

        <b-form-group id="input-group-email" label label-for="input-email" description>
          <b-form-input id="input-email" v-model="form.email" placeholder="E-mail"></b-form-input>
          <small id="error-email"></small>
        </b-form-group>

        <b-form-group id="input-group-password" label label-for="input-password">
          <b-form-input
            id="input-password"
            v-model="form.password"
            type="password"
            placeholder="Choisissez un mot de passe"
          ></b-form-input>
          <small id="error-password"></small>
        </b-form-group>

        <b-form-group id="input-group-confirm-password" label label-for="input-confirm-password">
          <b-form-input
            id="input-confirm-password"
            v-model="form.confirmPassword"
            type="password"
            placeholder="Confirmez le mot de passe"
          ></b-form-input>
          <small id="error-confirm-password"></small>
        </b-form-group>

        <b-form-group id="input-group-level" label label-for="input-level">
          <b-form-select id="input-level" v-model="form.level" :options="levels"></b-form-select>
          <small id="error-level"></small>
        </b-form-group>

        <b-form-group id="input-group-sex" label="Sexe" label-for="input-sex">
          <b-form-radio-group v-model="form.sex" :options="sexs" id="input-sex"></b-form-radio-group>
          <small id="error-sex"></small>
        </b-form-group>

        <b-form-group id="input-group-birth" label="Date de naissance" label-for="input-birth">
          <b-form-input type="date" id="input-birth" v-model="form.birth"></b-form-input>
          <small id="error-birth"></small>
        </b-form-group>

        <b-button type="submit" variant="primary">Je m'inscris</b-button>
      </b-form>

      <div class="links mb-4">
        Vous possédez déjà un compte ?
        <a href="/login">S'identifier</a>
      </div>
    </div>
  </div>
</template>

<script>
import LogoMiam from "~/components/LogoMiam.vue";
import formValidate from "@/assistant/FormValidate.js";
import authService from "@/services/AuthService.js";

export default {
  components: {
    LogoMiam
  },
  async asyncData() {
    // Récupère les différents niveaux de cuisine
    let result = await authService.getCookingLevels();

    return { levels: result.data };
  },

  data() {
    return {
      form: {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
        level: null,
        sex: null,
        birth: null,
        accountType: null
      },

      sexs: [
        { text: "Femme", value: true },
        { text: "Homme", value: false },
        { text: "Non précisé", value: null }
      ],
      levels: [],
      show: true
    };
  },

  methods: {
    async onSubmit(e) {
      e.preventDefault();

      /** Valide le formulaire */
      let validate = await formValidate.validateSignUpPart(document, this.form);
      if (validate == false) {
        return;
      }

      try {
        // Inscrit l'utilisateur dans la bdd
        let res = await authService.registerPart(this.form);
        if (res.data.hasOwnProperty("error")) {
          let err = document.getElementById("error-password");
          err.innerText = res.data.error;
          err.classList.add("text-danger");
          this.form.password = "";
          this.form.confirmPassword = "";
          return;
        } else {
          try {
            let res = await this.$auth.loginWith("local", {
              data: {
                email: this.form.email,
                password: this.form.password
              }
            });

            this.$root.$bvToast.toast("Inscription éffectuée", {
              title: `Bienvenue !`,
              variant: "success",
              solid: true
            });
            this.$router.push("/dashboard");
          } catch (error) {}
        }
      } catch (e) {
        console.log(e);
      }
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      this.form.food = null;
      this.form.checked = null;
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
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