<template>
    <v-form>
        <v-container>
            <v-row>
                <v-text-field label="Konferenz-Raum Bezeichnung" v-model="name" filled required @keyup.enter="$refs.password.focus()"></v-text-field>
            </v-row>
            <v-row>
                <v-text-field label="Raum-Passwort (optional)" v-model="password" filled ref="password" @keyup.enter="createRoom()"></v-text-field>
            </v-row>
            <v-row>
                <p class="text--secondary">(Ein öffentlicher Raum besitzt kein Passwort)</p>
            </v-row>
            <v-row>
                <v-btn color="accent" @click="createRoom()">
                    Erstellen
                </v-btn>
            </v-row>
            <v-row v-if="error">
                <v-alert type="error" dense outlined>
                    {{error}}
                </v-alert>
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
        name: "ConferenceRoomCreation",
        data(){
            return {
                name: '',
                password: '',
                error: ''
            }
        },
        methods: {
            async createRoom(){
                try{
                    this.error = '';
                    await this.$store.dispatch('createRoom', {name: this.name, password: this.password})
                }catch(err){
                    this.error = err;
                }
            }
        }
    }
</script>

<style scoped>

</style>