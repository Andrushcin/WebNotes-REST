<template>
    <div class="p-3 mx-3 bg-dark rounded" style="margin-top: 20px; margin-bottom: 20px;">
          <form @submit.prevent="onSubmit">
              <fieldset class="form-group">
                  <legend class="border-bottom border-warning mb-3 text-light">Регистрация в WebNotes</legend>
              </fieldset>
              <div class="my-2">
                  <label for="emailField" class="form-label text-light">Адрес электронной почты</label>
                  <input v-model="email" id="emailField" type="email" class="form-control">
              </div>
              <div class="my-2">
                  <label for="passwordField" class="form-label text-light">Пароль</label>
                  <input v-model="password" id="passwordField" class="form-control" type="password">
              </div>
              <div class="my-2">
                  <label for="passwordField2" class="form-label text-light">Повторите пароль</label>
                  <input v-model="password2" id="passwordField2" class="form-control" type="password">
              </div>
              <p v-if="password != password2 & password2 != ''">Пароли не совпадают</p>
              <p v-if="password.length < 8 & password != ''">Пароль слишком короткий</p>
              <p v-if="error" class="text-warning">{{ error.message }}</p>
              <button v-if="email != '' & password == password2 & password.length > 8" class="btn btn-primary mt-2" type="submit">Регистрация</button>
          </form>
  
          <div class="border-top border-warning mt-2 d-flex flex-column">
              <small class="text-muted">
                  Уже есть аккаунт? <RouterLink class="ml-2" to="/auth/login">Вход</RouterLink>
              </small>
              
              <small class="text-muted">
                  <RouterLink class="ml-2" to="/info">Узнайте о функциях сайта WebNotes</RouterLink>
              </small>
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
            let response = await $host.post("/auth/registration", data);
            let result = await response.data;
            if (result.error) {       
                this.error = result.error;
            } else {
                localStorage.setItem("refreshToken", result.refreshToken);
                localStorage.setItem("accessToken", result.accessToken);
 
                this.$emit('alertMessage', {message: "Вы успешно зарегистрированы! Проверьте почту и активируйте аккаунт.", type: "success"})
                this.$router.push({ name: "MyNotes" });
            }
        },
    },

}
</script>