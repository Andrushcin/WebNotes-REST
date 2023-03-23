<template>
    <div class="alert alert-warning">
        {{ message }}
    </div>
</template>

<script>

export default {
    name: "AlertMessage",
    props: ['message'],
}
</script>