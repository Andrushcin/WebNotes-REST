<template>
    <div class="p-3 mx-3 bg-dark rounded" style="margin-top: 20px; margin-bottom: 20px;">
          <form @submit.prevent="onSubmit">
              <fieldset class="form-group">
                  <legend class="border-bottom border-warning mb-3 text-light">WebNotes - войти в аккаунт</legend>
              </fieldset>
              <div class="my-2">
                  <label for="emailField" class="form-label text-light">Адрес электронной почты</label>
                  <input v-model="email" id="emailField" type="email" class="form-control">
              </div>
              <div class="my-2">
                  <label for="passwordField" class="form-label text-light">Пароль</label>
                  <input v-model="password" id="passwordField" class="form-control" type="password">
              </div>

              <p v-if="error != ''" class="text-warning">{{ error }}</p>
              <button v-if="email != '' & password.length > 8" class="btn btn-primary mt-2" type="submit">Войти</button>
          </form>
  
          <div class="border-top border-warning mt-2 d-flex flex-row justify-content-between">
              <RouterLink to="/auth/register" class="mt-2 mr-2">Регистрация</RouterLink>
              <RouterLink to="/auth/login_anonymous" class="mt-2 ml-2">Войти как аноним</RouterLink>
          </div>
    </div>
</template>

<script>
/* eslint-disable */
import { RouterLink } from 'vue-router'
import {$host, $authHost} from "./../http";

export default {
    data() {
        return {
            email: "",
            password: "",
            password2: "",
            error: "",
        };
    },
    components: {
    },
    emits: ['alert-message'],
    computed: {},
    methods: {
        async onSubmit() {
            let data = {
                email: this.email,
                password: this.password,
            };
            let response = await $host.post("/auth/login", data);
            let result = await response.data;
            if (result.error) {
                this.error = result.error;
            }
            else {
                localStorage.setItem("refreshToken", result.refreshToken);
                localStorage.setItem("accessToken", result.accessToken);
                this.$emit('alertMessage', {message: "Вы вошли в аккаунт", type: "success"})
                this.$router.push({ name: "MyNotes" });
            }
        },
    },

}
</script>