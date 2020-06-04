<template>
    <div class="container">
        <div>
            <h1 class="title">
            </h1>
            <h2 class="subtitle">
                Bienvenue sur <span class="brand">MiamParty</span> !
            </h2>
            <b-card border-variant="primary" header-bg-variant="primary" header-text-variant="white" header="Créer un compte pour..." style="max-width: 35rem;" align="center" class="mx-auto">
                <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                    <b-form-radio-group :options="[{text: 'Moi', value: 'part'}, {text: 'Mon entreprise', value: 'pro'}]" v-model="form.checkbox" class ="mb-3"
                    ></b-form-radio-group>

                    <b-button type="submit" variant="primary" class="w-25">Valider</b-button>
                </b-form>
            </b-card>
            <LogoMiam class="mt-4 mb-4" />
        </div>
    </div>
</template>

<script>
import LogoMiam from "~/components/LogoMiam.vue"

export default {
  components: {
    LogoMiam
  },
   data() {
     
    return {
      form: {
        checkbox: null
      },
      
      show: true
    }
  },
  
  methods: {
        async onSubmit(e) {
            e.preventDefault()
            switch (this.form.checkbox) {
                case 'part':
                    this.$router.push("/part")
                    break
                case 'pro':
                    this.$router.push("/pro")
                    break
            }
        },

        onReset(evt) {
            evt.preventDefault()
            // Reset our form values
            this.form.checkbox = null
            // Trick to reset/clear native browser form validation state
            this.show = false
            this.$nextTick(() => {
                this.show = true
            })
        }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Carter+One&display=swap');
    .brand{
        font-family: 'Carter One', cursive;
    }


.container {
  margin: 0 auto;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
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