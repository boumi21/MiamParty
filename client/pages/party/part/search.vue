<template>
  <div class="container">
    <div>
      <h1 class="mt-4">Trouvez vos futures soirées !</h1>
      <hr />


      <b-card-group deck class="mb-4">

       

        <div class="row">
            <div class="col-sm-6 col-lg-4" v-for="item in items" :key="item.id_account">
                <b-card :img-src="item.picture" img-alt="party-food" img-top>
          <b-card-text><strong>{{ item.party_name }}</strong></b-card-text>
          <b-card-text>{{ item.date }}</b-card-text>
          <b-badge v-if="item.isPartyPro == 0" pill variant="primary">Particulier</b-badge>
          <b-badge v-else pill variant="success">Pro</b-badge>
          <b-card-text><em>{{ item.firstname }}</em></b-card-text>
          <template v-slot:footer>
            <b-button block pill variant="outline-primary">Gérez vos soirées</b-button>
          </template>
        </b-card>
            </div>
        </div>

        

        
      </b-card-group>

      <ul id="example-1">
  <li v-for="item in items" :key="item.id_account">
    {{ item.party_name }}
  </li>
</ul>

<div id="testi"></div>


    </div>
  </div>
</template>

<script>

import partyService from "@/services/PartyService.js";

export default {
  middleware: "auth",

  async asyncData () {
      console.log("aha")

    let result = await partyService.getParties()
    decodeImage(result.data.error)
    //console.log(result)

    return {items: result.data.error}

  },

  data() {
    return {
      items: [
      { message: 'Foo' },
      { message: 'Bar' }
    ]
    };
  }
};

function decodeImage(data){
    
    for(let i = 0; i < data.length; i++){
        if (data[i].picture != null){
            var imgsrc = String.fromCharCode.apply(null, data[i].picture.data);
            //var image = new Image(500, 500);
            // image.src = '/images/party-food1.jpg' //imgsrc
            // var div = document.getElementById('testi');
            // div.appendChild(image);
            // console.log("division "+div)
            data[i].picture = imgsrc
        } else {
            data[i].picture = '/images/party-food1.jpg'
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

.card-img-top{
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
</style>
