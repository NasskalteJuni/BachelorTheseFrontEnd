<template>
    <v-container>
        <v-row>
            <router-link to="/rooms"> zur Liste verfügbarer Räume</router-link>
        </v-row>
        <v-row v-if="editName">
            <v-col><v-text-field filled v-model="newName" label="(neu)" append-icon="mdi-cancel" append-outer-icon="mdi-content-save" @click:append-outer="saveName()" @click:append="editName = false"></v-text-field></v-col>
        </v-row>
        <v-row v-else>
            <v-col cols="auto">Nutzername: {{$store.state.user.name}}</v-col>
            <v-col :cols="1"><v-btn icon @click="editName=true" color="primary"><v-icon>mdi-pencil</v-icon></v-btn></v-col>
        </v-row>
        <v-row>
            <v-col>
                Account erstellt am {{new Date($store.state.user.created.toLocaleString() || Date.now()).toLocaleDateString("de-DE")}},
                zuletzt online gewesen am {{new Date($store.state.user.lastLogin || Date.now()).toLocaleDateString("de-DE")}}
            </v-col>
        </v-row>
        <v-row v-if="editPassword">
            <v-text-field filled label="altes Passwort" v-model="oldPassword" :type="showPasswords ? 'text' : 'password'" :append-icon="showPasswords ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPasswords = !showPasswords" required @keyup.enter="$refs.newPassword.focus()"></v-text-field>
        </v-row>
        <v-row v-if="editPassword">
            <v-text-field filled label="neues Passwort" v-model="newPassword" :type="showPasswords ? 'text' : 'password'" :append-icon="showPasswords ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPasswords = !showPasswords" :rules="passwordRules" required ref="newPassword" @keyup.enter="$refs.newPasswordRepeat.focus()"></v-text-field>
        </v-row>
        <v-row v-if="editPassword">
            <v-text-field filled label="neues Passwort wiederholen" v-model="newPasswordRepeat" :type="showPasswords ? 'text' : 'password'" :append-icon="showPasswords ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPasswords = !showPasswords" :rules="passwordRepeatRules" required ref="newPasswordRepeat" @keyup.enter="changePassword()"></v-text-field>
        </v-row>
        <v-row v-if="editPassword">
            <v-btn @click="changePassword()" class="mr-2">speichern</v-btn>
            <v-btn @click="cancel()">abbrechen</v-btn>
        </v-row>
        <v-row v-else>
            <v-col>
                <v-btn color="accent" @click="editPassword = true">Passwort ändern</v-btn>
            </v-col>
        </v-row>
        <v-row v-if="error">
            <v-col :cols="12">
                <v-alert type="error" dense outlined>
                    {{error}}
                </v-alert>
            </v-col>
        </v-row>
        <v-spacer></v-spacer>
        <v-divider></v-divider>
        <v-row v-if="deleteAccount">
            <v-col>
                <v-text-field filled label="Passwort zur Bestätigung" v-model="oldPassword" :type="showPasswords ? 'text' : 'password'" :append-icon="showPasswords ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPasswords = !showPasswords"></v-text-field>
            </v-col>
        </v-row>
        <v-row v-if="deleteAccount">
            <v-col>
                <v-btn color="red" @click="unregister()"> Endgültig löschen (!) </v-btn>
            </v-col>
        </v-row>
        <v-row v-else>
            <v-col>
                <v-btn @click="deleteAccount = true">Account löschen (!)</v-btn>
            </v-col>
        </v-row>

    </v-container>
</template>

<script>
    export default {
        name: "Account",
        data(){
            return {
                editName: false,
                newName: this.$store.state.user.name || '',
                editPassword: false,
                newPassword: '',
                newPasswordRepeat: '',
                showPasswords: false,
                oldPassword: '',
                deleteAccount: false,
                error: '',
                passwordRules: [
                    () => this.newPassword.length > 0 || 'Passwort kann nicht leer sein'
                ],
                passwordRepeatRules: [
                    () => this.newPasswordRepeat === this.newPassword || 'Passwörter stimmen nicht überein'
                ]
            }
        },
        methods: {
            async saveName(){
                try{
                    this.error = '';
                    await this.$store.dispatch('changeUsername', {name: this.newName});
                    this.editName = false;
                }catch(err){
                    if(err.message.indexOf('NAME ALREADY IN USE') >= 0) this.error = 'Nutzername bereits vergeben';
                    else if(err.message.indexOf('INVALID NAME') >= 0) this.error = 'Nutzername ungültig';
                    else this.error = 'Nutzername konnte nicht geändert werden';
                }
            },
            async changePassword(){
                try{
                    this.error = '';
                    await this.$store.dispatch('changePassword', {oldPassword: this.oldPassword, newPassword: this.newPassword});
                    this.editPassword = false;
                }catch(err){
                    if(err.message.indexOf('INVALID OLD PASSWORD') >= 0) this.error = 'Passwort falsch';
                    else if(err.message.indexOf('INVALID NEW PASSWORD') >= 0) this.error = 'neues Passwort nicht erlaubt';
                    else this.error = 'Passwort konnte nicht geändert werden';
                }
            },
            cancel(){
                this.error = '';
                this.editPassword = false;
            },
            async unregister(){
                try{
                    this.error = '';
                    await this.$store.dispatch('unregister', {password: this.oldPassword});
                }catch(err){
                    this.error = 'Passwort ungültig';
                }
            }
        }
    }
</script>

<style scoped>

</style>