<template>
    <v-row>
        <v-col sm="12" class="pa-0 small-text">
            <v-row>
                <v-col sm="8" class="pa-0 pt-2 pb-1">
                    <h2>{{architecture.toUpperCase()}}</h2>
                </v-col>
                <v-col sm="2" class="pa-0">
                    <v-icon style="padding-bottom: -12px; padding-top: 12px;">mdi-upload-network</v-icon>
                </v-col>
                <v-col sm="2" class="pa-0">
                    <v-icon style="padding-bottom: -12px; padding-top: 12px;">mdi-download-network</v-icon>
                </v-col>
            </v-row>
            <v-row>
                <v-col sm="8" class="pa-0">
                    kB / s
                </v-col>
                <v-col sm="2" class="pa-0">
                    {{Math.max(Math.floor(report.outbound.bytes / 1000)|| 0, 0)}}
                </v-col>
                <v-col sm="2" class="pa-0">
                    {{Math.max(Math.floor(report.inbound.bytes / 1000)|| 0, 0)}}
                </v-col>
            </v-row>
            <v-row>
                <v-col sm="8" class="pa-0">
                    Pakete / s
                </v-col>
                <v-col sm="2" class="pa-0">
                    {{Math.max(report.outbound.packets || 0, 0)}}
                </v-col>
                <v-col sm="2" class="pa-0">
                    {{Math.max(report.inbound.packets || 0, 0)}}
                </v-col>
            </v-row>
            <v-row>
                <v-col sm="8" class="pa-0">
                    verlohrene Pakete / s
                </v-col>
                <v-col sm="2" class="pa-0">
                    {{report.outbound.packetLoss || 0}}
                </v-col>
                <v-col sm="2" class="pa-0">
                    {{report.inbound.packetLoss || 0}}
                </v-col>
            </v-row>
            <v-row>
                <v-col sm="8" class="pa-0">
                    Verwendete Tracks
                </v-col>
                <v-col sm="2" class="pa-0">
                    {{report.outbound.tracks || 0}}
                </v-col>
                <v-col sm="2" class="pa-0">
                    {{report.inbound.tracks || 0}}
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        props: {
            report: {
                type: Object,
                default: () => ({inbound: {bytes: 0, packets: 0, packetLoss: 0}, outbound: {bytes: 0, packets: 0, packetLoss: 0}})
            },
            architecture: {
                type: String,
                default: ""
            }
        },
        name: "ArchitectureOverview"
    }
</script>

<style scoped>
    .small-text, .small-text *{
        font-size: small;
    }

    .small-text .row{
        padding-left: 0;
        padding-right: 0;
        margin-left: 0;
        margin-right: 0;
    }
</style>