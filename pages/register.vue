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

      <b-form-group id="input-group-niveau" label="Votre niveau de cuisine:" label-for="input-niveau">
        <b-form-select
          id="input-niveau"
          v-model="form.niveau"
          :options="niveaux"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-sexe" label="Votre sexe:" label-for="input-sexe">
        <b-form-radio-group
          v-model="form.sexe"
          :options="sexes"
          id="input-sexe"
      ></b-form-radio-group>
      </b-form-group>

      <b-form-group id="input-group-naissance" label="Date de naissance:" label-for="input-naissance">
        <b-form-input type="date" id="input-naissance" v-model="form.naissance" required></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-statut" label="Votre statut:" label-for="input-statut">
        <b-form-radio-group
          v-model="form.statut"
          :options="statuts"
          id="input-statut"
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
          pseudo: '',
          mdp: '',
          niveau: null,
          sexe: null,
          naissance: '',
          statut: null
        },
        niveaux: [{ text: 'Sélectionner un niveau', value: null }, { text: 'Débutant', value: 0 }, { text: 'Intermédiaire', value: 1 }, { text: 'Confirmé', value: 2 }, { text: 'Chef cuisto', value: 3 } ],
        sexes: [{text: 'Homme', value: '0'}, {text: 'Femme', value: '1'}],
        statuts: [{text: 'Particulier', value: '0'}, {text: 'Pro', value: '1'}],
        show: true
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
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