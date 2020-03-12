<template>
    <v-form @submit.prevent="">
        <v-container>
            <v-row>
                <v-text-field label="Konferenz-Raum Bezeichnung" v-model="name" filled required autocomplete="off" spellcheck="false" @keyup.enter="createRoom()"></v-text-field>
            </v-row>
            <v-row>
                <v-col sm="12" md="2">
                    <v-checkbox hint="private Räume werden nicht gelistet und können nur mit dem generierten Link betreten werden" v-model="isPrivate" label="privater Raum"></v-checkbox>
                </v-col>
                <v-col sm="12" md="10">
                    <v-text-field v-if="isPrivate" :readonly="true" flat v-model="link" ref="link" spellcheck="false" append-icon="mdi-content-copy" @click:append="copyLink()"></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-btn color="accent" ref="create" @click="createRoom()">
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
                isPrivate: false,
                password: Array.from({length: 5}, () => Math.random().toString(32).substr(2,7)).join(''),
                error: ''
            }
        },
        computed: {
            link(){
                return window.origin+'/#/rooms?name='+this.name+'&key='+this.password;
            }
        },
        methods: {
            async createRoom(){
                try{
                    this.error = '';
                    await this.$store.dispatch('createRoom', {name: this.name, password: this.isPrivate ? this.password : ''})
                }catch(err){
                    this.error = err;
                }
            },
            copyLink(){
                const input = this.$refs.link.$el.getElementsByTagName('input')[0];
                input.focus();
                input.select();
                document.execCommand('copy');
            }
        }
    }
</script>

<style scoped>

</style>