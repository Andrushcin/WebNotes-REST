<template>
    <div class="mx-auto my-2 px-2 col-xs-12 col-sm-10 col-md-8 col-lg-6 col-xl-4">
          <form @submit.prevent="onSubmit">
              <fieldset class="form-group">
                  <legend class="border-bottom border-warning mb-3">Регистрация в WebNotes</legend>
              </fieldset>
              <div class="my-2">
                  <label for="emailField" class="form-label">Адрес электронной почты</label>
                  <input v-model="email" id="emailField" type="email" class="form-control">
              </div>
              <div class="my-2">
                  <label for="passwordField" class="form-label">Пароль</label>
                  <input v-model="password" id="passwordField" class="form-control">
              </div>
              <div class="my-2">
                  <label for="passwordField2" class="form-label">Повторите пароль</label>
                  <input v-model="password2" id="passwordField2" class="form-control">
              </div>
              <p v-if="password != password2 & password2 != ''">Пароли не совпадают</p>
              <p v-if="password.length < 8 & password != ''">Пароль слишком короткий</p>
              <button v-if="email != '' & password == password2 & password.length > 8" class="btn btn-primary mt-2" type="submit">Регистрация</button>
          </form>
  
          <div class="border-top border-warning mt-2 d-flex flex-column">
              <small class="text-muted">
                  Уже есть аккаунт? <RouterLink class="ml-2" to="/">Вход</RouterLink>
              </small>
              
              <small class="text-muted">
                  <RouterLink class="ml-2" to="/">Узнайте о функциях сайта WebNotes</RouterLink>
              </small>
          </div>
    </div>
</template>

<script>
/* eslint-disable */
import { RouterLink } from 'vue-router'

export default {
    data () {
        return {
            email: "",
            password: "",
            password2: "",
        }
    },
    computed: {

    },
    methods() {
        onSubmit () {
            fetch()
        }
    }

}
</script>