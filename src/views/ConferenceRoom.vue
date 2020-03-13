<template>
    <v-container class="ma-0 pa-0" fluid>
        <v-navigation-drawer absolute left dark @transitionend="handleDrawerOffset()" id="members" ref="members" v-if="$store.state.room">
            <v-list dense nav>
                <v-list-item two-line>
                    <v-btn text color="primary" @click="leave()">Raum verlassen <v-icon>mdi-exit-to-app</v-icon></v-btn>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item two-line>
                    <h2>Nutzer von {{$store.state.room.name}}</h2>
                </v-list-item>
                <v-list-item v-for="member in $store.state.room.members" :key="member">
                    {{member === $store.state.user.name ? (member+' (du)') : member}}
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-container class="ma-0 pa-0" ref="conference" id="conference">
            <v-row>
                <v-col sm="auto" class="pa-0 pa-md-1 pa-lg-2 pa-xl-2">
                    <video id="display" ref="display" autoplay :width="handleVideoSize().width" :height="handleVideoSize().height" :style="'width:'+handleVideoSize().width+'px; height:'+handleVideoSize().height+'px'"></video>
                </v-col>
                <v-col ref="info">
                    <v-row><h2>Informationen</h2></v-row>
                    <ArchitectureOverview :report="reports.mesh" architecture="mesh"></ArchitectureOverview>
                    <ArchitectureOverview :report="reports.sfu" architecture="sfu"></ArchitectureOverview>
                    <ArchitectureOverview :report="reports.mcu" architecture="mcu"></ArchitectureOverview>
                    <v-divider class="mt-2 mb-2"></v-divider>
                    <v-row>Ändere verwendete Architektur:</v-row>
                    <v-row class="pa-0">
                        zur Zeit verwendet: {{(conference.architecture || '').toUpperCase()}}
                    </v-row>
                    <v-row class="pa-0 pt-1">
                        <v-col xs="6"><v-btn block @click="conference.previousArchitecture()"><v-icon>mdi-chevron-left</v-icon>{{conference.prevArchitectureValue}}</v-btn></v-col>
                        <v-col xs="6"><v-btn block @click="conference.nextArchitecture()">{{conference.nextArchitectureValue}}<v-icon>mdi-chevron-right</v-icon></v-btn></v-col>
                    </v-row>
                </v-col>
            </v-row>
            <v-row class="mt-2 pa-md-0 pa-sm-2">
                <v-col class="pa-0 text-center" xs="12" md="3">
                    <v-btn @click="addMedia()" color="accent" v-if="!stream">
                        Webcam aktivieren
                        <v-icon>mdi-video</v-icon>
                    </v-btn>
                    <v-btn @click="removeMedia()" color="accent" v-else>
                        Webcam deaktivieren
                        <v-icon>mdi-video-off</v-icon>
                    </v-btn>
                </v-col>
                <v-col xs="12" md="9" class="pa-0">
                    <v-btn icon v-if="stream && audio" color="accent" @click="toggleAudio()">
                        <v-icon>mdi-microphone</v-icon>
                    </v-btn>
                    <v-btn icon v-if="stream && !audio" color="accent" @click="toggleAudio()">
                        <v-icon>mdi-microphone-off</v-icon>
                    </v-btn>
                    <v-btn icon v-if="stream && video" color="accent" @click="toggleVideo()">
                        <v-icon>mdi-camera</v-icon>
                    </v-btn>
                    <v-btn icon v-if="stream && !video" color="accent" @click="toggleVideo()">
                        <v-icon>mdi-camera-off</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-container>
</template>

<script>
    import recursiveSmoothingFilter from "../../utils/smoothFilter.js";
    import ArchitectureOverview from "../components/ArchitectureOverview";

    export default {
        name: "ConferenceRoom",
        components:{
            ArchitectureOverview
        },
        data(){
            return {
                stream: null,
                audio: true,
                video: true,
                conference: new window.MediaUtilities.Conference({signaler: this.$store.state.signaler, name: this.$store.state.user.name, architecture: this.$store.state.room.architecture, iceServers: this.$store.state.iceServers}),
                error: '',
                updates: 0,
                reports: {
                    mcu: {inbound: {}, outbound: {}},
                    sfu: {inbound: {}, outbound: {}},
                    mesh: {inbound: {}, outbound: {}}
                }
            }
        },
        methods: {
            async addMedia(){
                try{
                    this.stream = await window.navigator.mediaDevices.getUserMedia({video: true, audio: true});
                    await this.conference.addMedia(this.stream);
                }catch(err){
                    this.error = 'Webcam konnte nicht verwendet werden: '+err.message;
                }

            },
            removeMedia(){
                this.conference.removeMedia();
                this.stream.getTracks().forEach(track => {
                    track.stop();
                    track.enabled = false;
                });
                this.stream = null;
            },
            toggleAudio(){
                this.conference.muteMedia("audio", this.audio);
                this.audio = !this.audio;
                this.stream.getAudioTracks().forEach(track => track.enabled = this.audio);
            },
            toggleVideo(){
                this.conference.muteMedia("video", this.video);
                this.video = !this.video;
                this.stream.getVideoTracks().forEach(track => track.enabled = this.video);
            },
            handleDrawerOffset(){
                if(window.innerWidth >= 600){
                    if(document.getElementById("members").classList.contains('v-navigation-drawer--open')){
                        this.$refs.conference.classList.add('drawer-offset');
                    }else{
                        this.$refs.conference.classList.remove('drawer-offset');
                    }
                }
                console.log(window.innerWidth);
            },
            handleVideoSize(){
                const maxWidth = window.innerWidth - 256 - 270;
                const maxHeight = window.innerHeight - 150;
                let width = maxWidth;
                let height = width * (3/4);
                if(height > maxHeight){
                    height = maxHeight;
                    width = height * (4/3)
                }
                return {width, height};
            },
            leave(){
                if(this.updates) clearInterval(this.updates);
                if(this.stream) this.stream.getTracks().forEach(track => {
                    track.enabled = false;
                    track.stop();
                });
                this.conference.close();
                this.conference = null;
                this.$router.push('/rooms');

            }
        },
        created(){
            if(this.$store.state.joining) this.$store.commit('setJoining', null);
            this.$store.dispatch('forceUpdate');
        },
        mounted(){
            const handleDrawerOffset = () => {
                if(this.$vuetify.breakpoint.mdAndUp && document.getElementById("members").classList.contains('v-navigation-drawer--open')){
                    document.getElementById("conference").classList.add('drawer-offset');
                }
            };
            handleDrawerOffset();
            setTimeout(handleDrawerOffset, 100);
            window.addEventListener('resize', handleDrawerOffset);
            window.addEventListener('beforeunload', () => this.leave());
            this.conference.displayOn('#display');
            const filter = () => {
                const inboundByteFilter = recursiveSmoothingFilter();
                const outboundByteFilter = recursiveSmoothingFilter();
                const inboundPacketFilter = recursiveSmoothingFilter();
                const outboundPacketFilter = recursiveSmoothingFilter();
                return (report) => {
                    report.inbound.bytes = inboundByteFilter(report.inbound.bytes);
                    report.outbound.bytes = outboundByteFilter(report.outbound.bytes);
                    report.inbound.packets = inboundPacketFilter(report.inbound.packets);
                    report.outbound.packets = outboundPacketFilter(report.outbound.packets);
                    return report;
                }
            };
            const meshFilter = filter();
            const sfuFilter = filter();
            const mcuFilter = filter();
            this.updates = setInterval(async () => {
                if(this.conference && !this.conference.closed){
                    this.reports.mesh = meshFilter(await this.conference._peers.getReport());
                    this.reports.sfu = sfuFilter(await this.conference._sfu.getReport());
                    this.reports.mcu = mcuFilter(await this.conference._mcu.getReport());
                }
            },500);
            window.conference = this.conference;
        },
        beforeDestroy(){
            this.leave();
        }
    }
</script>

<style scoped lang="scss">
    #display{
        position: relative;
        width: 480px;
        height: 360px;
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