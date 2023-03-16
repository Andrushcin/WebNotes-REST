<template>
    <p>Главная страница</p>
    <p>{{ getNotes }}</p>
</template>

<script>
/* eslint-disable */
import {$authHost} from "./../http";

export default {
    data () {
        return {
            notes: "",
        }
    },
    computed: {
        async getNotes () {
            let response = await $authHost.get("/notes/")
            let result = await response.data
            console.log(result)
            return result

        },
    },
    methods: {

    }

}
</script>
