<template>
  <div>
    <b-form @submit="onSubmit" v-if="show">
      <b-form-group
        id="input-group-username"
        label="Nom d'utilisateur"
        label-for="input-username"
      >
        <b-form-input
          id="input-username"
          v-model="form.login"
          required
          placeholder="Votre nom d'utilisateur"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-mdp"
        label="Mot de passe:"
        label-for="input-mdp"
      >
        <b-form-input
          id="input-mdp"
          v-model="form.password"
          type="password"
          required
          placeholder="Votre mot de passe"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">
        Connexion
      </b-button>
      <!-- <b-button type="reset" variant="danger">Reset</b-button> -->
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </div>
</template>

<script>
import authService from "@/services/AuthService.js";

export default {
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
      try {
        this.$auth.loginWith('local', { data: {
          login: this.form.login,
          password: this.form.password
        } })

        //this.$router.push("/patate");

        // let response = await authService.login(this.form);
        // console.log("Je reviens côté client");
        // console.log("Réponse de authService :");
        // if (response.data.hasOwnProperty("error")) {
        //     console.log(response.data.error);
        //     return;
        //   }
        //   else {
        //     console.log(response.data);
        //     this.$router.push("/connection");
        //   }
        // //this.$router.push("/connection");
      } catch (err) {
        console.log(err);
      }

      
    }
  }
};
</script>
