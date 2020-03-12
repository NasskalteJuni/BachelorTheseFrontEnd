<template>
    <v-form @submit.prevent="">
        <v-container>
            <v-row>
                <v-text-field label="Suche einen Raum" v-model="search" filled :append-icon="search ? 'mdi-close' : 'mdi-magnify'" @click:append="search ? search = '' : $refs.searchbar.focus()" ref="searchbar" autocomplete="off"></v-text-field>
            </v-row>
            <v-row class="scrollable">
                <v-container class="ma-0 pa-0" v-for="(room, index) in rooms" :key="room.id">
                    <v-row>
                        <v-col>
                            <router-link :to="'/room/'+room.id">
                                {{room.name}}
                            </router-link>
                        </v-col>
                        <v-col cols="auto" class="pr-8">
                            <v-btn fab dark color="accent" @click="$router.push('/room/'+room.id)">
                                <v-icon>mdi-login-variant</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                    <v-divider v-if="index !== rooms.length-1"></v-divider>
                </v-container>
            </v-row>
        </v-container>
        <v-container>
            Keinen Raum gefunden?
            <router-link to="/create">
                Erstelle deinen eigenen Konferenz-Raum
            </router-link>
        </v-container>
    </v-form>
</template>

<script>
    import http from "../plugins/axios.js";

    export default {
        name: "ConferenceRoomList",
        data(){
            return {
                search: ''
            }
        },
        computed: {
            rooms(){
                const lowercaseSearch = this.search.toLowerCase();
                const all = this.$store.state.rooms;
                return (this.search && this.search.length > 0) ? all.filter(room => room.name.toLowerCase().indexOf(lowercaseSearch) >= 0) : all;
            }
        },
        created(){
            this.$store.dispatch('updateRooms');
            if(this.$store.state.joining && (this.$store.state.joining.id || this.$store.state.joining.name)){
                let readyToJoin = Promise.resolve();
                if(!this.$store.state.joining.id){
                    readyToJoin = http.get('/rooms?name='+this.$store.state.joining.name+"&password="+this.$store.state.joining.key)
                        .then(rooms => {
                            if(rooms.length === 0){
                                throw new Error();
                            }else{
                                this.$store.commit('setJoining', {key: this.$store.state.joining.key, id: rooms[0].id});
                            }
                        });
                }
                readyToJoin
                    .then(() => this.$router.push({name: 'ConferenceRoom', params: {id: this.$store.state.joining.id}, query: {key: this.$store.state.joining.key}}))
                    .catch(() => this.$store.commit('setJoining', null));
            }
        }
    }
</script>

<style scoped lang="scss">

    .scrollable{
        height: 55vh;
        min-height: 55vh;
        overflow-x: hidden;
        overflow-y: scroll;
    }

    .scrollable::-webkit-scrollbar{
        background-color: rgba(20,20,20,0.1);
        width: 5px;
    }

    ::-webkit-scrollbar-thumb {
        background: var(--v-accent-base);
        border-radius: 2px;
    }
</style>