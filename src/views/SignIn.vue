<template>
    <v-form v-model="valid">
        <v-container>
            <v-row>
                <v-textfield label="Nutzername" required></v-textfield>
            </v-row>
            <v-row>
                <v-textfield label="Password" :counter="8" required></v-textfield>
            </v-row>
            <v-row>
                <v-btn>Anmelden</v-btn>
            </v-row>
            <v-row>
                Noch kein Konto? <router-link to="/signup">Hier</router-link> geht es zur Anmeldung
            </v-row>
        </v-container>
    </v-form>
</template>

<script>
    export default {
        name: "SignIn",
        data(){
            return {
                valid: true
            }
        }
    }
</script>

<style scoped>

</style>