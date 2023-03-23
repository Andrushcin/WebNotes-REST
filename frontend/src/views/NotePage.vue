<template >
<div class="mx-auto col-xs-12 col-sm-11 col-md-10 col-lg-9 col-xl-7 my-2 p-2">

	<div class="mb-2" id="edit">
		<fieldset class="form-group">
            <legend v-if="newNote" class="border-bottom border-warning mb-2">Новая заметка</legend>
            <legend v-else class="border-bottom border-warning mb-2">Редактирование заметки</legend>

			<label for="name-note" class="form-label">Название заметки</label>
			<input type="text" class="form-control" v-model="note.name" id="name-note" name="name">

			<label for="text-note" class="form-label">Текст заметки</label>
			<textarea v-model="note.body" class="form-control" id="text-note" rows="7" name="text" style="overflow: hidden"></textarea>

			<div class="form-check">
				<input class="form-check-input" type="checkbox" v-model="note.fav" id="check-favourites" name="favourites">
				<label class="form-check-label" for="check-favourites">В избранное</label>
			</div>

		</fieldset>
	</div>

	<div class="d-flex flex-row justify-content-end">
		<div class="me-auto">
			<RouterLink class="btn btn-outline-dark mt-2 align-self-end" to="/"><i class="bi bi-arrow-left me-1"></i>Назад</RouterLink>
		</div>

		<div class="form-group ms-2">
			<button @click="save()" class="btn btn-primary mt-2 align-self-end">Сохранить</button>
		</div>

		<div class="form-group ms-2">
			<input class="btn btn-danger mt-2 align-self-end" type="submit" value="Удалить" form="delete">
		</div>
	</div>

	<div v-if="!newNote" class="mt-1">
		<p class="dark">Создано: <span class="fw-bold">{{ Date(note.dateCreate) }}</span> пользователем <span class="fw-bold">{{ note.userEmail }}</span></p>
		<p class="dark">Последнее изменение: <span class="fw-bold">{{ note.dateUpdate }}</span></p>
	</div>

    {{ note }}
</div>
</template>

<script>
/* eslint-disable */
import {$authHost} from "./../http";
import { RefreshIfExpired } from "./../auth";

export default {
    data () {
        return {
            newNote: true,
            note: Object,
        }
    },
    async created () {
        let id = this.$route.params.id
        console.log(id)
        if (id) {
            let response = await RefreshIfExpired($authHost.get, [`/notes/${id}`])
            let result = await response.data
            console.log(result)
            this.newNote = false;
            this.note = result.note;
        } else {
            console.log("new")
            this.note = {
                name: "",
                body: "",
                fav: true,
                deleted: "",
            }
        }
    },
    computed: {

    },
    methods: {
        async save () {
            let response = await RefreshIfExpired($authHost.post, ['/notes/new', this.note])
            let result = await response.data;
            if (result.error) {
                console.log(result.error)
            } else {
                this.$router.push({ name: "Мои заметки" });
            }
        }
    },
}
</script>
    