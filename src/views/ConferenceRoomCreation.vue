<template>
    <v-form>
        <v-container>
            <v-row>
                <v-text-field label="Konferenz-Raum Bezeichnung" filled required></v-text-field>
            </v-row>
            <v-row>
                <v-text-field label="Raum-Passwort (optional)" filled></v-text-field>
            </v-row>
            <v-row>
                <p class="text--secondary">(Ein öffentlicher Raum besitzt kein Passwort)</p>
            </v-row>
            <v-row>
                <v-btn color="accent">
                    Erstellen
                </v-btn>
            </v-row>
            <v-spacer class="mt-4 mb-4"></v-spacer>
            <v-row>
                <p class="text--secondary">Oder doch nur einem bestehenden Raum beitreten? <router-link to="/rooms/">Hier</router-link> geht eszur Raum-Auswahl</p>
            </v-row>
        </v-container>
    </v-form>
</template>

<script>
    export default {
        name: "ConferenceRoomCreation"
    }
</script>

<style scoped>

</style>