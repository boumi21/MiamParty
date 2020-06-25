<template>
  <div class="container">
    <div>
      <b-card no-body>
        <b-tabs pills card>
          <b-tab v-if="this.$auth.user.isPro == false" title="Soirées à venir" active>
            <h1 class="display-2" v-if="itemsInc.length <= 0">Aucune soirée à afficher</h1>
            <div class="text-center" v-if="itemsInc[0] === true">
              <b-spinner variant="primary" label="Text Centered"></b-spinner>
            </div>

            <b-card-group deck>
              <div class="row">
                <div
                  class="col-sm-6 col-lg-4 min-width"
                  v-for="(itemInc, i) in itemsInc"
                  :key="`${i}-${itemInc.id_account}`"
                >
                  <b-card :img-src="itemInc.picture" img-alt="party-food" class="mb-4" img-top>
                    <b-card-text>
                      <strong>{{ itemInc.party_name }}</strong>
                    </b-card-text>
                    <b-card-text>{{ itemInc.date }}</b-card-text>
                    <b-badge v-if="itemInc.isPartyPro == 0" pill variant="primary">Particulier</b-badge>
                    <b-badge v-else pill variant="success">Pro</b-badge>
                    <b-card-text>
                      <em>{{ itemInc.firstname }}</em>
                    </b-card-text>
                    <template v-slot:footer>
                      <b-button
                        block
                        pill
                        variant="outline-primary"
                        :href="`./view/${itemInc.id_party}`"
                      >Détails</b-button>
                      <b-button
                        block
                        pill
                        variant="outline-danger"
                        @click="cancelParty(itemInc.id_party)"
                      >Annuler</b-button>
                      <b-modal
                        centered
                        hide-footer
                        id="modal-confirm-cancel-reservation"
                        title="Confirmation annulation réservation"
                      >
                        <p>Voulez-vous annuler votre réservation ?</p>
                        <hr />
                        <div class="text-right">
                          <b-button
                            type="submit"
                            variant="danger"
                            @click="cancelParty(itemInc.id_party)"
                          >Oui, Annuler</b-button>
                          <b-button
                            variant="secondary"
                            @click="$bvModal.hide('modal-confirm-cancel-reservation')"
                          >Non, Retour</b-button>
                        </div>
                      </b-modal>
                    </template>
                  </b-card>
                </div>
              </div>
            </b-card-group>
          </b-tab>

          <b-tab title="Mes soirées">
            <h1 class="display-2" v-if="itemsOwn.length <= 0">Aucune soirée à afficher</h1>
            <div class="text-center" v-if="itemsOwn[0] === true">
              <b-spinner variant="primary" label="Text Centered"></b-spinner>
            </div>

            <b-card-group deck>
              <div class="row">
                <div
                  class="col-sm-6 col-lg-4 min-width"
                  v-for="(itemOwn, i) in itemsOwn"
                  :key="`${i}-${itemOwn.id_account}`"
                >
                  <b-card :img-src="itemOwn.picture" img-alt="party-food" class="mb-4" img-top>
                    <b-card-text>
                      <strong>{{ itemOwn.party_name }}</strong>
                    </b-card-text>
                    <b-card-text>{{ itemOwn.date }}</b-card-text>
                    <b-badge v-if="itemOwn.isPartyPro == 0" pill variant="primary">Particulier</b-badge>
                    <b-badge v-else pill variant="success">Pro</b-badge>
                    <b-card-text>
                      <em>{{ itemOwn.firstname }}</em>
                    </b-card-text>
                    <template v-slot:footer>
                      <b-button
                        block
                        pill
                        variant="outline-primary"
                        :href="`./view/${itemOwn.id_party}`"
                      >Détails</b-button>
                      <b-button
                        block
                        @click="deleteParty(itemOwn.id_party)"
                        pill
                        variant="outline-danger"
                      >Supprimer</b-button>

                      <b-modal
                        centered
                        hide-footer
                        id="modal-confirm"
                        title="Confirmation suppression"
                      >
                        <p>Voulez-vous supprimer cette soirée ?</p>
                        <hr />
                        <div class="text-right">
                          <b-button
                            type="submit"
                            variant="danger"
                            @click="deleteParty(itemOwn.id_party)"
                          >Oui, Supprimer</b-button>
                          <b-button
                            variant="secondary"
                            @click="$bvModal.hide('modal-confirm')"
                          >Non, Retour</b-button>
                        </div>
                      </b-modal>
                    </template>
                  </b-card>
                </div>
              </div>
            </b-card-group>
          </b-tab>

          <b-tab title="Soirées terminées">
            <h1 class="display-2" v-if="itemsEnd.length <= 0">Aucune soirée à afficher</h1>
            <div class="text-center" v-if="itemsEnd[0] === true">
              <b-spinner variant="primary" label="Text Centered"></b-spinner>
            </div>

            <b-card-group deck>
              <div class="row">
                <div
                  class="col-sm-6 col-lg-4 min-width"
                  v-for="(itemEnd, i) in itemsEnd"
                  :key="`${i}-${itemEnd.id_account}`"
                >
                  <b-card :img-src="itemEnd.picture" img-alt="party-food" class="mb-4" img-top>
                    <b-card-text>
                      <strong>{{ itemEnd.party_name }}</strong>
                    </b-card-text>
                    <b-card-text>{{ itemEnd.date }}</b-card-text>
                    <b-badge v-if="itemEnd.isPartyPro == 0" pill variant="primary">Particulier</b-badge>
                    <b-badge v-else pill variant="success">Pro</b-badge>
                    <b-card-text>
                      <em>{{ itemEnd.firstname }}</em>
                    </b-card-text>
                    <template v-slot:footer>
                      <b-button
                        block
                        pill
                        variant="outline-danger"
                        :href="`./mark/${itemEnd.id_party}`"
                      >Noter</b-button>
                    </template>
                  </b-card>
                </div>
              </div>
            </b-card-group>
          </b-tab>
        </b-tabs>
      </b-card>
      <hr />
      <div class="text-right mb-5">
        <b-button variant="secondary" :href="'../dashboard'">Retour</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import partyService from "@/services/PartyService.js";
import util from "~/assets/js/util";

export default {
  middleware: "auth",

  mounted: function() {
    this.$nextTick(async function() {
      // Récupère les soirées à venir
      let result = await partyService.getPartiesInc({
        id_account: this.$auth.user.id
      });
      decodeImage(result.data);
      this.itemsInc = result.data;

      // Récupère les soirées de l'utilisateur
      let result2 = await partyService.getPartiesOwn({
        id_account: this.$auth.user.id
      });
      decodeImage(result2.data);
      this.itemsOwn = result2.data;

      // Récupère les oirées terminées auxquelles l'utilisateur a participé
      let result3 = await partyService.getPartiesEnd({
        id_account: this.$auth.user.id
      });
      decodeImage(result3.data);
      this.itemsEnd = result3.data;
    });
  },

  data() {
    return {
      itemsInc: [],
      itemsOwn: [],
      itemsEnd: []
    };
  },

  methods: {
    deleteParty: async function(id_party) {
      // Change le statut de la soirée dans la bdd (passage au statut supprimé)
      let result = await partyService.deleteParty({
        id_party: id_party
      });
      location.reload();
    },

    cancelParty: async function(id_party) {
      // Annula la réservation dans la bdd
      let result = await partyService.cancelParty({
        id_party: id_party,
        id_account: this.$auth.user.id
      });
      location.reload();
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
