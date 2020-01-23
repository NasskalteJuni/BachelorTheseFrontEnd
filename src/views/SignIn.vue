<template>
    <v-form v-model="valid">
        <v-container class="pa-lg-12 pa-sm-2">
            <v-row>
                <v-col>
                    <v-text-field filled label="Nutzername" required v-model="username" @keyup.enter="$refs.password.focus()" ref="username" autocomplete="off"></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-text-field filled label="Password" required v-model="password" :type="showPassword ? 'text' : 'password'" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPassword = !showPassword" ref="password" @keyup.enter="valid ? login() : () => $refs.username.focus()"></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-btn color="accent" :disabled="!valid">Anmelden</v-btn>
                </v-col>
            </v-row>
            <v-row v-if="error">
                <v-alert>
                    {{error}}
                </v-alert>
            </v-row>
            <v-row>
                <v-col class="text--secondary">
                    Noch kein Konto? <router-link to="/signup">Hier</router-link> geht es zur Registrierung
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>

<script>
    export default {
        name: "SignIn",
        data(){
            return {
                valid: this.username && this.password,
                showPassword: false,
                password: '',
                username: '',
                error: '',
            }
        },
        methods: {
            async login(){
                try{
                    this.error = '';
                    await this.$store.dispatch('login',{username: this.username, password: this.password})
                }catch(err){
                    this.error = err.message || 'Anmeldung fehlgeschlagen';
                }
            }
        }
    }
</script>

<style scoped>

</style>