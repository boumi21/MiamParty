<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
            <nuxt-link to="/dashboard"><b-navbar-brand id="brand">MiamParty</b-navbar-brand></nuxt-link>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">

                <b-nav-item-dropdown right>
                <!-- Using 'button-content' slot -->


                <template v-slot:button-content>
                    <em v-if="$auth.loggedIn && $auth.user.isPart">{{ $auth.user.firstname }}</em>
                    <em v-else-if="$auth.loggedIn && $auth.user.isPro">{{ $auth.user.namePro }}</em>
                    <em v-else>Non connecté</em>
                </template>
                <div v-if="$auth.loggedIn">
                <b-dropdown-item @click="redirectSettings">Mon compte</b-dropdown-item>
                <b-dropdown-item @click="logout">Se déconneter</b-dropdown-item>
                </div>
                <div v-else>
                    <b-dropdown-item href="/login">Se connecter</b-dropdown-item>
                </div>
                </b-nav-item-dropdown>
            </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>


<script>
export default {
    methods: {
  async logout() {
    await this.$auth.logout();
  },
  redirectSettings() {
      if (this.$auth.user.hasOwnProperty("idPart"))
      {
          this.$router.push("/settings/part")
      }
      else
      {
          this.$router.push("/settings/pro")
      }
  }
},
}
</script>


<style>
    @import url('https://fonts.googleapis.com/css2?family=Carter+One&display=swap');
    #brand{
        font-family: 'Carter One', cursive;
    }
</style>

