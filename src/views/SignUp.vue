<template>
    <v-form>
        <v-form v-model="valid">
            <v-container class="pa-lg-12 pa-sm-2">
                <v-row>
                    <v-col>
                        <v-text-field filled label="Nutzername" required v-model="username" @keyup.enter="$refs.password.focus()" ref="username" :rules="usernameRules" autocomplete="off"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-text-field filled label="Passwort" required v-model="password" :type="showPassword ? 'text' : 'password'" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" :rules="passwordRules" @click:append="showPassword = !showPassword" @keyup.enter="$refs.passwordRepeat.focus()" ref="password"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-text-field filled label="Passwort wiederholen" required v-model="passwordRepeat" :type="showPassword ? 'text' : 'password'" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" :rules="passwordRepeatRules" @click:append="showPassword = !showPassword" @keyup.enter="register()" ref="passwordRepeat"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="auto">
                        <v-btn color="accent" :disabled="!valid" @click="register()">Registrieren</v-btn>
                    </v-col>
                    <v-col v-if="error">
                        <v-alert type="error" dark dense outlined>{{error}}</v-alert>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col class="text--secondary">
                        Bereits registriert? <router-link to="/">Hier</router-link> geht es zur Anmeldung
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
    </v-form>
</template>

<script>
    export default {
        name: "SignUp",
        data(){
            return {
                valid: true,
                showPassword: false,
                username: '',
                password: '',
                passwordRepeat: '',
                error: '',
                usernameRules: [
                    () => !!this.username.trim() || "Nutzername kann nicht leer sein",
                    /^[a-zA-Z0-9_\- ]/.test(this.username) || "Ungültiger Nutzername. Gültige Nutzernamen bestehen nur aus Buchstaben, Zahlen und Leerzeichen, '_' oder Minus",
                    () => this.username.length <= 200|| 'Bitte wähle einen kürzeren Nutzernamen...'
                ],
                passwordRules: [
                    () => !!this.password.trim() || "Passwort kann nicht leer sein",
                    () => this.password.length >= 8 || 'Das ist kein gültiges Passwort. Passwörter sind mindestens 8 Zeichen lang',
                    () => ['password','quertzuiop','quertyuiop','12345678','iloveyou','abcd1234','password1'].indexOf(this.password) === -1 || 'Nein. Einfach nein.'
                ],
                passwordRepeatRules: [
                    () => this.passwordRepeat === this.password || "Passwörter stimmen nicht überein"
                ]
            };
        },
        methods: {
            register(){
                    this.error = '';
                    this.$store.dispatch('register', {name: this.username, password: this.password})
                        .then(() => this.$router.push('/'))
                        .catch(err => {
                            if(err.message && err.message.endsWith('422')) this.error = 'Nutzername bereits vergeben';
                            else this.error = 'Registrierung Fehlgeschlagen';
                        });

            }
        }
    }
</script>

<style scoped>

</style>