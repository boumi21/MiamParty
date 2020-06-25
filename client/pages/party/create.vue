<template>
  <div class="container">
    <div>
      <LogoMiam class="mt-4 mb-4" />
      <h2 class="subtitle">Créez une soirée en toute simplicité</h2>

      <b-form @submit="onSubmit" id="form_Create_Part" v-if="show" method="post">
        <hr />
        <b-card
          header="1) Informations sur votre soirée"
          border-variant="primary"
          header-bg-variant="primary"
          header-text-variant="white"
        >
          <b-form-group
            id="input-group-name"
            label="Quel sera le nom de votre soirée ?"
            label-for="input-name"
          >
            <b-form-input id="input-name" v-model="form.name" placeholder="Nom de votre soirée"></b-form-input>
            <small id="error-name"></small>
          </b-form-group>

          <b-row>
            <b-col>
              <b-form-group
                id="input-group-date"
                label="A quelle date se déroulera-t-elle ?"
                label-for="input-date"
              >
                <b-form-datepicker
                  :min="min_date"
                  id="input-date"
                  placeholder="Choisissez une date"
                  v-model="form.date"
                ></b-form-datepicker>
                <small id="error-date"></small>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                id="input-group-time"
                label="A quelle heure se déroulera-t-elle ?"
                label-for="input-time"
              >
                <b-time v-model="form.time"></b-time>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row align-v="end">
            <b-col>
              <b-form-group
                id="input-group-guest"
                label="Combien d'invités pourront participer au maximum ?"
                label-for="input-guest"
              >
                <b-form-spinbutton id="input-guest" v-model="form.guest" min="2" max="100"></b-form-spinbutton>
                <small id="error-guest"></small>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                id="input-group-price"
                label="Quel sera le prix de participation/personne ?"
                label-for="input-price"
              >
                <b-input-group size="md" prepend="€">
                  <b-form-input
                    id="input-price"
                    type="number"
                    v-model="form.price"
                    min="0"
                    max="500"
                    step="0.5"
                  ></b-form-input>
                </b-input-group>
                <small id="error-price"></small>
              </b-form-group>
            </b-col>
          </b-row>
        </b-card>

        <hr />

        <b-card
          header="2) Adresse de la soirée"
          border-variant="info"
          header-bg-variant="info"
          header-text-variant="white"
        >
          <div class="m-3">
            <b-button
              pill
              variant="outline-success"
              v-on:click="fillAddress()"
            >Utiliser l'adresse enregistrée dans mon profil</b-button>
          </div>
          <b-row align-v="end">
            <b-col cols="3">
              <b-form-group id="input-group-nbAddress">
                <b-form-input
                  id="input-nbAddress"
                  type="number"
                  placeholder="N° de rue"
                  v-model="form.nbAddress"
                  step="1"
                ></b-form-input>
                <small id="error-nbAddress"></small>
              </b-form-group>
            </b-col>
            <b-col cols="9">
              <b-form-group id="input-group-street">
                <b-form-input id="input-street" v-model="form.street" placeholder="Nom de rue"></b-form-input>
                <small id="error-street"></small>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row align-v="end">
            <b-col>
              <b-form-group id="input-group-city">
                <b-form-input id="input-city" type="text" placeholder="Ville" v-model="form.city"></b-form-input>
                <small id="error-city"></small>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group id="input-group-postCode">
                <b-form-input
                  id="input-postCode"
                  type="number"
                  v-model="form.postCode"
                  placeholder="Code postal"
                  step="1"
                ></b-form-input>
                <small id="error-postCode"></small>
              </b-form-group>
            </b-col>
          </b-row>
        </b-card>

        <hr />

        <b-card
          header="3) Informations complémentaires"
          border-variant="secondary"
          header-bg-variant="secondary"
          header-text-variant="white"
        >
          <b-row>
            <b-col>
              <b-form-group label="Ajoutez une description" label-for="input-description">
                <b-form-textarea
                  id="input-description"
                  v-model="form.description"
                  placeholder="Donnez des informations complémentaires sur votre soirée !"
                  rows="3"
                  max-rows="6"
                ></b-form-textarea>
                <small id="error-description"></small>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="Choissisez une image" label-for="input-image">
                <b-form-file
                  v-on:input="convertImage()"
                  v-model="form.image"
                  id="input-image"
                  accept=".jpg, .png"
                  placeholder="(png ou jpeg)"
                  drop-placeholder="Déposez votre image ici..."
                ></b-form-file>
                <small id="error-image"></small>
              </b-form-group>
            </b-col>
          </b-row>
        </b-card>

        <hr />

        <!-- Hidden input -->
        <input type="hidden" v-model="form.country" />

        <b-button type="submit" variant="primary" class="mb-4">Créer la soirée !</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";
import LogoMiam from "~/components/LogoMiam.vue";
import userService from "@/services/UserService.js";
import partyService from "@/services/PartyService.js";
import formValidate from "@/assistant/FormValidate.js";

export default {
  middleware: "auth",
  components: {
    Logo,
    LogoMiam
  },

  data() {
    return {
      form: {
        name: "",
        date: "",
        time: "00:00:00",
        guest: 2,
        price: 0,
        nbAddress: null,
        street: "",
        city: "",
        postCode: null,
        country: "France",
        description: "",
        image: null,
        dataImage: "",
        idAccount: this.$auth.user.id,
        isPartyPro: this.$auth.user.isPro
      },
      min_date: getMinDate(),
      show: true
    };
  },
  mounted() {},
  methods: {
    async onSubmit(e) {
      e.preventDefault();

      /** Valide le formulaire */
      let validate = await formValidate.validateCreatePart(document, this.form);
      if (validate == false) {
        return;
      }

      try {
        // Ajoute la soirée à la bdd
        let res = await partyService.createParty(this.form);

        this.$router.push("/dashboard");
      } catch (error) {}
    },

    // Converti l'image pour la bdd
    async convertImage() {
      const file = this.form.image;
      let result = "";
      if (file) {
        result = await toBase64(file);
      }
      this.form.dataImage = result;
    },

    // Rempli les champs de l'adresse automatiquement
    async fillAddress() {
      let result = await userService.getUserAddress({
        userId: this.$auth.user.id,
        isPart: this.$auth.user.isPart
      });

      this.form.nbAddress = result.data.nb_address;
      this.form.street = result.data.street;
      this.form.city = result.data.city;
      this.form.postCode = result.data.postal_code;
    }
  }
};

// Récupère la date minimum pour le calendrier
function getMinDate() {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const minDate = new Date(today);
  //minDate.setDate(minDate.getDate() + 3); -> A remmetre si on veut autoriser l'ajout seulement 3 jours après aujourd'hui
  return minDate;
}

// Converti l'image en base 64
async function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  /* align-items: center; */
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.card-header {
  font-size: 150%;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.input {
  justify-content: left;
  text-align: left;
}
.info {
  font-weight: 300;
  font-size: 20px;
  color: #000000;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
