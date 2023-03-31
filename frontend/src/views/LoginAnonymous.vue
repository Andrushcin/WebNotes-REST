<template >
    <div class="p-3 mx-3 bg-dark rounded" style="margin-top: 20px; margin-bottom: 20px;">
        <p class="text-light">Вы вошли как анонимный пользователь! В этом режиме Вам доступны все функции сайта WebNotes.
            Обратите внимание, что через 14 дней ваши данные будут удалены.
        </p>
    </div>
</template>
    
<script>
/* eslint-disable */
import {$authHost} from "./../http";
import { RefreshIfExpired } from "./../auth";
import { loginAnonymous } from "./../auth";

export default {
    data () {
        return {
            newNote: true,
            note: Object,
        }
    },
    emits: ['alert-message'],

    async created () {
        await loginAnonymous(this)
    },
    computed: {

    },
    methods: {

    },
}
</script>
     