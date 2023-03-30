<template>
    <div class="mx-auto my-2 px-2 col-xs-12 col-sm-10 col-md-8 col-lg-6 col-xl-4">
          <form @submit.prevent="onSubmit">
              <fieldset class="form-group">
                  <legend class="border-bottom border-warning mb-3">WebNotes - войти в аккаунт</legend>
              </fieldset>
              <div class="my-2">
                  <label for="emailField" class="form-label">Адрес электронной почты</label>
                  <input v-model="email" id="emailField" type="email" class="form-control">
              </div>
              <div class="my-2">
                  <label for="passwordField" class="form-label">Пароль</label>
                  <input v-model="password" id="passwordField" class="form-control" type="password">
              </div>

              <p v-if="error != ''" class="text-warning">{{ error }}</p>
              <button v-if="email != '' & password.length > 8" class="btn btn-primary mt-2" type="submit">Войти</button>
          </form>
  
          <div class="border-top border-warning mt-2 d-flex flex-row justify-content-between">
              <RouterLink to="/auth/register" class="btn btn-sm btn-outline-primary mt-2 ml-2">Регистрация</RouterLink>
              <button class="btn btn-sm btn-outline-primary mt-2 ml-2" @click="loginAsAnonymous()">Войти как анонимный пользователь</button>
          </div>
    </div>
</template>

<script>
/* eslint-disable */
import { RouterLink } from 'vue-router'
import {$host, $authHost} from "./../http";
import { loginAnonymous } from "./../auth";

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
        async loginAsAnonymous() {
            await loginAnonymous(this)
        }
    },

}
</script>