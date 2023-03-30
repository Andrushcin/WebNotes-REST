<template>
    <div :class="alertClass" v-if="active && message">
        {{ message }}
    </div>
</template>

<script>
export default {
    name: "AlertMessage",
    props: ['message', 'type'],
    data() {
        return {
            active: true,
        }
    },
    created() {
        setTimeout(() => {
            this.active = false;
        }, 15*1000)
    },
    computed: {
        alertClass() {
            let cls = "alert alert-";

            switch (this.type) {
                case "warning":
                    return cls+"warning"
                case "success":
                    return cls+"success"
                default:
                    return cls+"secondary"
            }
        }
    }
}
</script>