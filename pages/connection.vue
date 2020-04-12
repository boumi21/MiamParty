<template>
  <div>
    <b-form @submit="onSubmit" v-if="show">
      <b-form-group
        id="input-group-email"
        label="Courrier électronique:"
        label-for="input-email"
      >
        <b-form-input
          id="input-email"
          v-model="form.email"
          type="email"
          required
          placeholder="Votre mel"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-mdp" label="Mot de passe:" label-for="input-mdp">
        <b-form-input
          id="input-mdp"
          v-model="form.mdp"
          type="password"
          required
          placeholder="Votre mot de passe"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Connexion</b-button>
      <!-- <b-button type="reset" variant="danger">Reset</b-button> -->
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </div>
</template>

<script>

export default {
  data() {
      return {
        form: {
          email: '',
          mdp: ''
        },
        show: true
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
      }
    }
}
</script>


