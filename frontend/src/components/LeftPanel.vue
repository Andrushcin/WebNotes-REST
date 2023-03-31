<template>
    <nav class="bg-dark p-1 rounded-end col-md-3 col-lg-3 col-xl-3" style="margin: 20px 0 20px 0">
        <ul class="mb-4 mx-2 nav flex-column">
            <RouterLink to="/" class="nav-link panel-link">Мои заметки</RouterLink>

            <RouterLink to="/auth/logout" class="nav-link panel-link">Выйти</RouterLink>

            <RouterLink to="/auth/register" class="nav-link panel-link">Регистрация</RouterLink>

            <RouterLink to="/auth/login" class="nav-link panel-link">Вход</RouterLink>

            <RouterLink to="/info" class="nav-link panel-link">Инфо</RouterLink>
        </ul>
    </nav>
</template>

<script>
/* eslint-disable */
import { RouterLink } from 'vue-router'

export default {
    name: 'LeftPanel',
    created() {

        console.log(this.$router.currentRoute.value.fullPath)
    }

}
</script>

<style scoped>

</style>
