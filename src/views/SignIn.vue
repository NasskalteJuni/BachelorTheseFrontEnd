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
                    <v-text-field filled label="Password" required v-model="password" :type="showPassword ? 'text' : 'password'" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPassword = !showPassword" ref="password" @keyup.enter="login()"></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="auto">
                    <v-btn color="accent" :disabled="!valid" @click="login()">Anmelden</v-btn>
                </v-col>
                <v-col v-if="error">
                    <v-alert type="error" dark outlined dense>
                        {{error}}
                    </v-alert>
                </v-col>
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
                valid: true,
                showPassword: false,
                password: '',
                username: '',
                error: '',
                usernameRules: [
                    () => !!this.username || 'Nutzername fehlt'
                ],
                passwordRules: [
                    () => !!this.password || 'Passwort fehlt',
                    () => this.password.length >= 8 || 'Passwort ist zu kurz'
                ]
            }
        },
        methods: {
            login(){
                this.$store.dispatch('login',{name: this.username, password: this.password})
                    .then(() => this.$router.push('/rooms'))
                    .catch(err => {
                        if(err.message && err.message.endsWith('403')) this.error = 'Nutzername oder Passwort sind falsch';
                        else this.error = 'Anmeldung fehlgeschlagen'
                    });
            }
        }
    }
</script>

<style scoped>

</style>