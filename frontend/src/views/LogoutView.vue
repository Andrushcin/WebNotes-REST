<template >
    <div class="mx-auto col-xs-12 col-sm-11 col-md-10 col-lg-9 col-xl-7 my-2 p-2">
        
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
     