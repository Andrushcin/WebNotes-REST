<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <RouterLink to="/" class="navbar-brand"><i class="bi bi-pencil-fill me-2"></i>WebNotes</RouterLink>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-content" aria-controls="navbar-content" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbar-content">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <RouterLink to="/" class="nav-link" aria-current="page" >Мои заметки</RouterLink>
                    </li>

                    <li class="nav-item">
                        <RouterLink to="/auth/logout" class="nav-link">Выйти</RouterLink>
                    </li>

                    <li class="nav-item">
                        <RouterLink to="/auth/register" class="nav-link">Регистрация</RouterLink>
                    </li>

                    <li class="nav-item">
                        <RouterLink to="/auth/login" class="nav-link">Вход</RouterLink>
                    </li>

                    <li class="nav-item">
                        <RouterLink to="/info" class="nav-link">Инфо</RouterLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
/* eslint-disable */
import { RouterLink } from 'vue-router'

export default {
    name: 'MainNavbar',
}
</script>

<style scoped>

</style>
