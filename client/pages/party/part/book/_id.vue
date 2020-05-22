<template>
  <div class="container">
    <div>
      <h2>{{party.party_name}}<small> par </small><u><small> {{party.owner}} </small></u><small class="ml-5"><b-badge v-if="party.isPartyPro == 0" pill variant="primary">Particulier</b-badge>
              <b-badge v-else pill variant="success">Pro</b-badge></small></h2>
      <hr />

      <div>

        <b-row>
    <b-col>
      
    </b-col>
    <b-col cols="8">
      <b-img :src="party.picture" fluid-grow alt="Responsive image"></b-img>
    </b-col>
    <b-col>
      
    </b-col>
  </b-row>
  <b-row>
    <b-col>
          <b-card
          header="Adresse de la soirée"
          border-variant="info"
          header-bg-variant="info"
          header-text-variant="white"
        >
        <p>{{party.nb_address}} {{party.street}}, {{party.city}}, {{party.postal_code}} {{party.country}}</p>
    </b-card>
    </b-col>
    <b-col>
      <b-card
          header="Informations"
          border-variant="primary"
          header-bg-variant="primary"
          header-text-variant="white"
        >
        <p>{{party.date}}</p>
        <p>{{party.price}}€/pers</p>
        <p>{{party.guests_left}} places restantes</p>
      </b-card>
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
        >
        {{party.description}}
      </b-card>
    </b-col>
    <b-col>
      <b-card
          header="Réservation"
          border-variant="success"
          header-bg-variant="success"
          header-text-variant="white"
        >
        
        <b-form @submit="onSubmit">
          <label for="input-participants"><font-awesome-icon icon="city"/> Nombre de places</label>
          <b-form-spinbutton
            id="input-participants"
            v-model="form.participants"
            min="1"
            :max="party.guests_left"
            step="1"
          ></b-form-spinbutton>
        </b-form>
      </b-card>
    </b-col>
  </b-row>
  
</div>

      
       <!-- <b-card class="mt-3" header="Form Data Result">
        <pre class="m-0">{{ party }}</pre>
      </b-card>  -->

    </div>
  </div>
</template>

<script>
import partyService from "@/services/PartyService.js";
export default {
  middleware: "auth",
  data() {
    return {
      party: {
        party_name: ""
      },
      form: {
        participants: 1
      }
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
  },
  async mounted() {
    let resultParty
    let result = await partyService.getPartyType({partyId: this.$route.params.id})
    let isPartyPro = result.data[0].isPartyPro
    if(isPartyPro == 0){
      resultParty = await partyService.getPartyPart({partyId: this.$route.params.id})
    } else{
      resultParty = await partyService.getPartyPro({partyId: this.$route.params.id})
    }
    decodeImage(resultParty.data[0])
    this.party = resultParty.data[0]
  }
};


function decodeImage(data) {
    if (data.picture != null) {
      if (data.picture.data.length != 0) {
        var imgsrc = String.fromCharCode.apply(null, data.picture.data);
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
</style>
