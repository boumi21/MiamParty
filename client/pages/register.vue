<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-email"
        label="Courrier électronique:"
        label-for="input-email"
        description="Votre adresse vous servira pour vous connecter. Nous n'enverrons pas de pub, promis."
      >
        <b-form-input
          id="input-email"
          v-model="form.email"
          type="email"
          required
          placeholder="Votre mel"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-username" label="Votre pseudo:" label-for="input-username">
        <b-form-input
          id="input-username"
          v-model="form.username"
          required
          placeholder="Entrez votre pseudo"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-password" label="Mot de passe:" label-for="input-password">
        <b-form-input
          id="input-password"
          v-model="form.password"
          type="password"
          required
          placeholder="Entrez votre mot de passe"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-level" label="Votre niveau de cuisine:" label-for="input-level">
        <b-form-select
          id="input-level"
          v-model="form.level"
          :options="levels"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-sexe" label="Votre sexe:" label-for="input-sexe">
        <b-form-radio-group
          v-model="form.sexe"
          :options="sexes"
          id="input-sexe"
          required
      ></b-form-radio-group>
      </b-form-group>

      <b-form-group id="input-group-birth" label="Date de naissance:" label-for="input-birth">
        <b-form-input type="date" id="input-birth" v-model="form.birth" required></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-status" label="Votre statut:" label-for="input-status">
        <b-form-radio-group
          v-model="form.status"
          :options="statuss"
          id="input-status"
          required
      ></b-form-radio-group>
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

  export default {
    data() {
      return {
        form: {
          email: '',
          username: '',
          password: '',
          level: null,
          sexe: null,
          birth: '',
          status: null
        },
        levels: [{ text: 'Sélectionner un niveau', value: null }, { text: 'Débutant', value: 0 }, { text: 'Intermédiaire', value: 1 }, { text: 'Confirmé', value: 2 }, { text: 'Chef cuisto', value: 3 } ],
        sexes: [{text: 'Homme', value: '0'}, {text: 'Femme', value: '1'}],
        statuss: [{text: 'Particulier', value: '0'}, {text: 'Pro', value: '1'}],
        show: true
      }
    },
    methods: {
  //     async onSubmit(registrationInfo) {
  //       //let response = await this.$axios.post('/users', registrationInfo)
  //       //let response = await particulier.test(this.form, function(err, task) {
    
  //   if (err)
  //     res.send(err);
  //   res.json(task);
  // });
  //       console.log(response)
  //     },
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