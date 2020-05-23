<template>
  <div class="container">
    <div>
      <h1 class="mt-4">Trouvez vos futures soirées !</h1>
      <hr />
      <b-form inline @submit="onSubmit">
        <b-form-group class="mr-5">
          <b-form-radio v-model="form.status" name="input-status" value="3">Tout le monde</b-form-radio>
          <b-form-radio v-model="form.status" name="input-status" value="0">Particuliers seulement</b-form-radio>
          <b-form-radio v-model="form.status" name="input-status" value="1">Professionnels seulement</b-form-radio>
        </b-form-group>

        <div class="mr-5 ml-2 mb-3">
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
        </div>

        <b-form-group id="input-group-date" class="mr-5">
          <b-form-datepicker
            :min="min_date"
            id="input-date"
            reset-button
            placeholder="Choisissez une date"
            v-model="form.date"
          ></b-form-datepicker>
        </b-form-group>

        <b-button type="submit" variant="primary">Filtrer</b-button>
        
      </b-form>
      <hr />

      <h1 class="display-2" v-if="items.length <= 0" >Aucune soirée à afficher </h1>
      <div class="text-center" v-if="items[0] === true">
        <b-spinner variant="primary" label="Text Centered"></b-spinner>
      </div>

      <b-card-group deck>
        <div class="row">
          <div
            class="col-sm-6 col-lg-4 min-width"
            v-for="(item, i) in items"
            :key="`${i}-${item.id_account}`"
          >
            <b-card :img-src="item.picture" img-alt="party-food" class="mb-4" img-top>
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
                <b-button
                  block
                  pill
                  variant="outline-primary"
                  :href="`./book/${item.id_party}`"
                >Détails</b-button>
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
import partyService from "@/services/PartyService.js"
import util from '~/assets/js/util'

export default {
  middleware: "auth-part",

  mounted: function () {
    this.$nextTick(async function () {
        let result = await partyService.getParties({
      isPartyPro: 3,
      price: 1000,
      date: null,
      account: this.$auth.user.id
    });
    decodeImage(result.data.error);
    console.log("alllloooo")
    this.items = result.data.error
    })
    },

  async asyncData() {

    
  },

  data() {
    return {
      form: {
        status: 3,
        price: 15,
        date: null
      },
      min_date: getMinDate(),
      items: [true]
    };
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault();

      let result = await partyService.getParties({
        isPartyPro: this.form.status,
        price: this.form.price,
        date: this.form.date,
        account: this.$auth.user.id
      });
      decodeImage(result.data.error);

      this.items = result.data.error;
    }
  }
};

function decodeImage(data) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].picture != null) {
      if (data[i].picture.data.length != 0) {
        var imgsrc = util.Utf8ArrayToStr(data[i].picture.data);
        data[i].picture = imgsrc;
      } else {
        data[i].picture = "/images/party-food1.jpg";
      }
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
