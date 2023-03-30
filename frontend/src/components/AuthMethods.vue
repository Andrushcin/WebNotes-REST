<template>
    <div class="m-3 px-2 col-xs-12 col-sm-11 col-md-10 col-lg-9 col-xl-7 mx-auto">
        <RouterLink to="/auth/login" class="btn btn-sm">Войти в аккаунт</RouterLink>
        <button @click="loginAnonymous(this)" class="btn btn-sm">Войти как анонимный пользователь</button>
    </div>
</template>

<script>
/* eslint-disable */
import {$authHost, $host} from "./../http";
import errs from "./../errors";
import { loginAnonymous } from "./../auth";

export default {
    name: "AuthMethods",
    props: [],
    emits: ['alert-message'],
    data() {
        return {
            
        }
    },
    created() {
        
    },
    computed: {
        
    },
    methods: {

    }
}
</script>