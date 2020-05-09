<template>
  <div class="container">
    <div>
      <h1 class="mt-4">Trouvez vos futures soirées !</h1>
      <hr />
      <b-form inline @submit="onSubmit">
        <b-form-group label="Sélectionnez votre type d'hôte">
          <b-form-radio v-model="form.status" name="input-status" value="3">Tout le monde</b-form-radio>
          <b-form-radio v-model="form.status" name="input-status" value="0">Particuliers seulement</b-form-radio>
          <b-form-radio v-model="form.status" name="input-status" value="1">Professionnels seulement</b-form-radio>
        </b-form-group>

        <label for="input-price">Prix max/Personne</label>
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

        <b-form-group id="input-group-date" label="A quelle date ?" label-for="input-date">
          <b-form-datepicker
            :min="min_date"
            id="input-date"
            reset-button
            placeholder="Choisissez une date"
            v-model="form.date"
          ></b-form-datepicker>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
      <hr />

      <b-card-group deck class="mb-4">
        <div class="row">
          <div
            class="col-sm-6 col-lg-4 min-width"
            v-for="(item, i) in items"
            :key="`${i}-${item.id_account}`"
          >
            <b-card :img-src="item.picture" img-alt="party-food" img-top>
              <b-card-text>
                <strong>{{ item.party_name }}</strong>
              </b-card-text>
              <b-card-text>{{ item.date }}</b-card-text>
              <b-badge v-if="item.isPartyPro == 0" pill variant="primary">Particulier</b-badge>
              <b-badge v-else pill variant="success">Pro</b-badge>
              <b-card-text>
                <em>{{ item.firstname }}</em>
              </b-card-text>
              <template v-slot:footer>
                <b-button block pill variant="outline-primary">Détails</b-button>
              </template>
            </b-card>
          </div>
        </div>
      </b-card-group>

      <!-- <b-card class="mt-3" header="Form Data Result">
        <pre class="m-0">{{ items }}</pre>
      </b-card>-->
    </div>
  </div>
</template>

<script>
import partyService from "@/services/PartyService.js";

export default {
  middleware: "auth",

  async asyncData() {
    console.log("aha");

    let result = await partyService.getParties({
      isPartyPro: 3,
      price: 1000,
      date: null
    });
    decodeImage(result.data.error);
    //console.log(result)

    return { items: result.data.error };
  },

  data() {
    return {
      form: {
        status: 3,
        price: 15,
        date: null
      },
      min_date: getMinDate(),
      items: []
    };
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault();

      let result = await partyService.getParties({
        isPartyPro: this.form.status,
        price: this.form.price,
        date: this.form.date
      });
      decodeImage(result.data.error);
      console.log(result.data.error);

      this.items = result.data.error;
    }
  }
};

function decodeImage(data) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].picture != null) {
      var imgsrc = String.fromCharCode.apply(null, data[i].picture.data);
      data[i].picture = imgsrc;
    } else {
      data[i].picture = "/images/party-food1.jpg";
    }
  }
}

function getMinDate() {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const minDate = new Date(today);
  //minDate.setDate(minDate.getDate() + 3); -> A remmetre si on veut autoriser l'ajout seulement 3 jours après aujourd'hui
  return minDate;
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

.card-footer {
  background-color: white;
}

.card-img-top {
  width: 1920;
  height: 1280;
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

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.min-width {
  min-width: 300px;
}
</style>
