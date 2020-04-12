<template>
  <div>
    <b-form @submit="onSubmit" v-if="show">
      

      <b-form-group id="input-group-pseudo" label="Votre pseudo:" label-for="input-pseudo">
        <b-form-input
          id="input-pseudo"
          v-model="form.pseudo"
          required
          placeholder="Entrez votre pseudo"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-mdp" label="Mot de passe:" label-for="input-mdp">
        <b-form-input
          id="input-mdp"
          v-model="form.mdp"
          type="password"
          required
          placeholder="Entrez votre mot de passe"
        ></b-form-input>
      </b-form-group>

      

      <b-button type="submit" variant="primary">Je m'inscris</b-button>
      <!-- <b-button type="reset" variant="danger">Reset</b-button> -->
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </div>
</template>

<script>
var particulier = require('~/server/dao/particulier.js');

  export default {
    data() {
      return {
        form: {
          pseudo: '',
          mdp: ''
        },
        show: true
      }
    },
    methods: {
      async onSubmit() {
          console.log("lol");
        let user = await particulier.addUser(this.form);
      },
    }
  }
</script>