<template >
    <div class="p-3 mx-3 bg-dark rounded" style="margin-top: 20px; margin-bottom: 20px;">
        <p class="text-light">Вы вышли из аккаунта!
        </p>
    </div>
</template>
    
<script>
/* eslint-disable */
import {$authHost} from "./../http";
import { RefreshIfExpired } from "./../auth";

export default {
    data () {
        return {
            newNote: true,
            note: Object,
        }
    },
    emits: ['alert-message'],

    async created () {
        await RefreshIfExpired($authHost.get, [`/auth/logout`], this)
        localStorage.clear()
        this.$emit('alertMessage', {message: "Вы вышли из аккаунта", type: "success"})
    },
    computed: {

    },
    methods: {

    },
}
</script>
     