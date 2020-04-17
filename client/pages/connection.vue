<template>
  <div>
    <b-form @submit="onSubmit" v-if="show" method="post">
      <b-form-group
        id="input-group-username"
        label="Nom d'utilisateur"
        label-for="input-username"
      >
        <b-form-input
          id="input-username"
          v-model="form.username"
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
          v-model="form.mdp"
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
        username: "",
        mdp: ""
      },
      show: true
    };
  },
  methods: {
    async onSubmit() {
      try {
        let response = await authService.login(this.form);
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>
