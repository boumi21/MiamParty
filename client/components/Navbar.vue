<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand href="#">MiamParty</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">

                <b-nav-item-dropdown right>
                <!-- Using 'button-content' slot -->
                <div v-if="$auth.loggedIn">
                    <p>Votre id : {{ $auth.user.id }}</p>
                    <p>Votre type : {{ $auth.user.accountType }}</p>
                    <p>Description : {{ $auth.user.description }}</p>
                    <p>Votre email : {{ $auth.user.email }}</p>
                    <p>Votre prenom : {{ $auth.user.firstname }}</p>
                    <p>Votre pet : {{ $auth.user.prout }}</p>
                </div>

                <template v-slot:button-content>
                    <em v-if="$auth.loggedIn">{{ $auth.user.email }}</em>
                    <em v-else>Non connecté</em>
                </template>
                <div v-if="$auth.loggedIn">
                <b-dropdown-item href="#">Profil</b-dropdown-item>
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
},
}
</script>

