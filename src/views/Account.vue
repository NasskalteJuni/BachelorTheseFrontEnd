<template>
    <v-container>
        <v-row>
            Name: {{$store.user.name}}
        </v-row>
        <v-row>
            Zuletzt online gewesen am {{store.user.lastLogin}}
        </v-row>
        <v-row>
            Account erstellt am {{$store.user.created}}
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "Account"
    }
</script>

<style scoped>

</style>