<template>
    <v-container class="font-weight-thin small">
        <v-row>
            <h1>Impressum</h1>
        </v-row>
        <v-row>
            <h2>Allgemeines</h2>
        </v-row>
        <v-row>
            <p>
                Diese Seite wurde als Demonstration für eine Abschlussarbeit angefertigt.
                Sie verfolgt keinen gewerblichen Zweck und dient einzig und allein der Forschung und akademischen Weiterbildung.
            </p>
        </v-row>
        <v-row>
            <h2>Haftungsausschluss</h2>
        </v-row>
        <v-row>
            <p>
                Es besteht keine Haftung und kein Anspruch auf Verfügbarkeit der angebotenen Dienste.
                Ein auf dieser Seite erstelltes Konto kann ohne die Angabe von Gründen gelöscht werden.
            </p>
        </v-row>
        <v-row>
            <h2>Datenschutz</h2>
        </v-row>
        <v-row>
            <p>
                Es werden nur Daten erhoben, die für den Betrieb der Web-Anwendung technisch notwendig sind.
                Die Daten werden nicht an Dritte weitergegeben. Mit der De-Registrierung werden alle gespeicherten Nutzerdaten gelöscht.
                Cookies werden nur für Nutzer-Sessions genutzt, eine Verwendung für Werbung oder Nutzer-Tracking im Netz erfolgt nicht.
            </p>
        </v-row>
        <v-row>
            <h2>Ansprechpartner</h2>
        </v-row>
        <v-row>
            <p>
                Ansprechpartner für die Seite ist Lukas Steinjan, erreichbar über die Hochschule Düsseldorf (HSD),
                Münsterstraße 156,
                40476 Düsseldorf
            </p>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "Contact"
    }
</script>

<style scoped>
    h2{
        font-size: 0.9em;
    }

    .small{
        min-height: calc(100vh - 16px) !important;
        overflow-x: hidden;
        overflow-y: auto !important;
    }

    .small p{
        font-size: 0.9em;
    }
</style>