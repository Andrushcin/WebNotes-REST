<template >
    <div></div>
</template>

<script>
/* eslint-disable */
import {$host} from "./../http";

export default {
    data () {
        return {
            message: String,
        }
    },
    async created () {
        let link = this.$route.params.link;
        let response = await $host.get(`auth/activate/${link}`)
        let result = await response.data;
        if (result.activated) {
            this.$emit("alertMessage", {message: "Аккаунт успешно активирован", type: "success"})
        } else {
            switch (result.error.name) {
                case "IncorrectActivationLink":
                    this.$emit("alertMessage", {message: result.error.message, type: "warning"})
                case "UnknownError":
                    this.$emit("alertMessage", {message: result.error.message, type: "warning"})
            } 
        }
    },
    computed: {

    },
    methods: {

    },
}
</script>
        