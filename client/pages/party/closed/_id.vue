<template>
  <div class="container">
    <div>
      <h1>
        {{ party.party_name }}
        <small>par</small>
        <u>
          <small>{{ party.owner }}</small>
        </u>
        <small class="ml-5">
          <b-badge v-if="party.isPartyPro == 0" pill variant="primary">Particulier</b-badge>
          <b-badge v-else pill variant="success">Pro</b-badge>
        </small>
      </h1>
      <hr class="mb-4" />

      <div class="mb-4">
        <b-row class="mb-4">
          <b-col></b-col>
          <b-col cols="8">
            <b-img thumbnail :src="party.picture" fluid-grow alt="Responsive image"></b-img>
          </b-col>
          <b-col></b-col>
        </b-row>
        <b-row class="mb-4">
          <b-col>
            <b-card
              header="Informations"
              border-variant="primary"
              header-bg-variant="primary"
              header-text-variant="white"
            >
              <b-row>
                <b-col cols="4"></b-col>
                <b-col cols="8" class="text-left">
                  <p>
                    <font-awesome-icon icon="calendar-alt" class="mr-4" />
                    {{ party.date }}
                  </p>
                  <p>
                    <font-awesome-icon icon="euro-sign" class="mr-4" />
                    {{ party.price }}€/pers
                  </p>
                  <p>
                    <font-awesome-icon icon="chair" class="mr-4" />
                    {{ party.guests_left }} places restantes
                  </p>
                </b-col>
              </b-row>
              <hr />
              <p class="h5">
                Adresse de la soirée
                <font-awesome-icon icon="map-marker-alt" class="mr-4" />
              </p>
              <p>
                {{ party.nb_address }} {{ party.street }}, {{ party.city }},
                {{ party.postal_code }} {{ party.country }}
              </p>
            </b-card>
          </b-col>
          <b-col>
            <b-row>
              <b-col>
                <b-card
                header="Notation"
                border-variant="success"
                header-bg-variant="success"
                header-text-variant="white"
                >
                <b-card-group deck>
                  <div
                    class="mb-4 w-100"
                    v-for="(itemEnd, i) in itemsEnd"
                    :key="`${i}-${itemEnd.id_mark}`">
                    <b-card
                      :header=itemEnd.name
                      border-variant="success">
                      <b-card-text>
                        <strong>Note :</strong> {{ itemEnd.mark }}/5
                      </b-card-text>
                      <b-card-text><strong>Commentaire :</strong> {{ itemEnd.description }}</b-card-text>
                    </b-card>
                  </div>
                </b-card-group>
                </b-card>
              </b-col>
            </b-row>
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <b-card
              v-if="party.description !== ''"
              header="Description"
              border-variant="secondary"
              header-bg-variant="secondary"
              header-text-variant="white"
            >{{ party.description }}</b-card>
          </b-col>
        </b-row>
      </div>
      <hr />
      <div class="text-right mb-5">
        <b-button variant="secondary" :href="'../management'">Retour</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import partyService from "@/services/PartyService.js"
import util from '~/assets/js/util'

export default {
  middleware: "auth-part",
  data() {
    return {
      party: {},
      itemsEnd: []
    };
  },
  methods: {},
  async mounted() {
    let resultParty;
    let result = await partyService.getPartyType({
      partyId: this.$route.params.id
    });
    let isPartyPro = result.data[0].isPartyPro;
    if (isPartyPro == 0) {
      resultParty = await partyService.getPartyPart({
        partyId: this.$route.params.id
      });
    } else {
      resultParty = await partyService.getPartyPro({
        partyId: this.$route.params.id
      });
    }
    decodeImage(resultParty.data[0]);
    this.party = resultParty.data[0];

    let review = await partyService.getReview({
        id_party: this.$route.params.id,
        id_account: this.$auth.user.id
      });
      this.itemsEnd = review.data;
  }
};

function decodeImage(data) {
  if (data.picture != null) {
    if (data.picture.data.length != 0) {
      var imgsrc = util.Utf8ArrayToStr(data.picture.data);
      data.picture = imgsrc;
    } else {
      data.picture = "/images/party-food1.jpg";
    }
  } else {
    data.picture = "/images/party-food1.jpg";
  }
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

.txt-center {
    text-align: center;
}
.hide {
    display: none;
}

.clear {
    float: none;
    clear: both;
}

.rating {
    font-size: 20px;
    width: 150px;
    unicode-bidi: bidi-override;
    direction: rtl;
    text-align: center;
    position: relative;
}

.rating > label {
    float: right;
    display: inline;
    padding: 0;
    margin: 0;
    position: relative;
    width: 1.1em;
    cursor: pointer;
    color: #000;
}

.rating > label:hover,
.rating > label:hover ~ label,
.rating > input.radio-btn:checked ~ label {
    color: transparent;color: #ffd000;
}
</style>
