<template>
    <v-container class="ma-0 pa-0">
        <v-navigation-drawer absolute left dark @transitionend="handleDrawerOffset()" id="members" ref="members">
            <v-list dense nav>
                <v-list-item two-line>
                    <v-btn color="primary" @click="$store.dispatch('leave')">Raum verlassen <v-icon>mdi-exit-to-app</v-icon></v-btn>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item two-line>
                    <h2>Nutzer von {{$store.state.room.name}}</h2>
                </v-list-item>
                <v-list-item v-for="member in members" :key="member">
                    {{member === $store.state.user.name ? (member+' (du)') : member}}
                </v-list-item>
                <v-list-item v-if="members.length === 0">
                    (Du bist alleine)
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-container class="ma-0 pa-0" ref="conference" id="conference">
            <v-row>
                <video id="mirror" ref="mirror" autoplay muted></video>
                <video id="display" ref="display" autoplay></video>
            </v-row>
            <v-row class="mt-2 pa-md-0 pa-sm-2">
                <v-col class="pa-0 ma-0" xs="12" md="9" cols="12">
                    <v-btn color="primary" fab icon v-if="stream" @click="toggleVideo()">
                        <v-icon>{{video ? 'mdi-camera' : 'mdi-camera-off'}}</v-icon>
                    </v-btn>
                    <v-btn color="primary" fab icon v-if="stream" @click="toggleAudio()">
                        <v-icon>{{audio ? 'mdi-microphone' : 'mdi-microphone-off'}}</v-icon>
                    </v-btn>
                </v-col>
                <v-col class="pa-0 ma-0 text-center" xs="12" md="3" cols="12">
                    <v-btn @click="addMedia()" color="accent" v-if="!stream">
                        Webcam aktivieren
                        <v-icon>mdi-video</v-icon>
                    </v-btn>
                    <v-btn color="accent" v-if="stream">
                        Webcam deaktivieren
                        <v-icon>mdi-video-off</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-container>
</template>

<script>
    export default {
        name: "ConferenceRoom",
        data(){
            return {
                stream: null,
                video: true,
                audio: true,
            }
        },
        computed: {
            members(){
                return this.$store.state.room.members || [];
            }
        },
        methods: {
            async addMedia(){
                this.stream = await navigator.mediaDevices.getUserMedia({audio: true, video: true});
                this.$refs.mirror.srcObject = this.stream;
            },
            handleDrawerOffset(){
                if(window.innerWidth >= 600){
                    if(document.getElementById("members").classList.contains('v-navigation-drawer--open')){
                        this.$refs.conference.classList.add('drawer-offset');
                    }else{
                        this.$refs.conference.classList.remove('drawer-offset');
                    }
                }
            },
            toggleAudio(){
                this.audio = !this.audio;
            },
            toggleVideo(){
                this.video = !this.video;
            },
            leave(){
                if(this.stream) this.stream.getTracks().forEach(track => {
                    track.enabled = false;
                    track.stop();
                });
                this.$store.dispatch('leave');
            }
        },
        created(){
            if(this.$store.state.joining.id || this.$store.state.joining.password) this.$store.commit('setJoining', {});
            this.$store.dispatch('forceUpdate');
        },
        mounted(){
            const handleDrawerOffset = () => {
                if(window.innerWidth >= 600 && document.getElementById("members").classList.contains('v-navigation-drawer--open')){
                    document.getElementById("conference").classList.add('drawer-offset');
                }
            };
            handleDrawerOffset();
            window.addEventListener('resize', handleDrawerOffset);
            window.addEventListener('beforeunload', () => this.$store.dispatch('leave'));
        }
    }
</script>

<style scoped lang="scss">
    #display{
        width: 100%;
        height: 100%;
        background-color: black;
    }

    #mirror{
        position: absolute;
        z-index: 99;
        top: 20px;
        right: 20px;
        width: calc(640px / 4);
        max-width: 15vw;
        height: auto;
        background-color: black;
        outline: var(--v-primary-base) thin solid;
        transform: scaleX(-1);
    }

    #conference{
        position: relative;
        left: 0;
        top: 0;
    }

    #conference.drawer-offset{
        margin-left: 256px !important;
        width: calc(100% - 256px) !important;
    }
</style>