<template >
<div class="px-3 pb-3 pt-2 mx-3 bg-dark rounded" style="margin-top: 20px; margin-bottom: 20px;">

	<div class="mb-2" id="edit">
		<fieldset class="form-group">
            <legend v-if="newNote" class="border-bottom border-warning text-light mb-2">Новая заметка</legend>
            <legend v-else class="border-bottom border-warning text-light mb-2">Редактирование заметки</legend>

			<label for="name-note" class="form-label text-light">Название заметки</label>
			<input type="text" class="form-control" v-model="note.name" id="name-note" name="name">

			<label for="text-note" class="form-label text-light">Текст заметки</label>
			<textarea v-model="note.body" class="form-control" id="text-note" rows="7" name="text" style="overflow: hidden"></textarea>

			<div class="form-check">
				<input class="form-check-input" type="checkbox" v-model="note.fav" id="check-favourites" name="favourites">
				<label class="form-check-label text-light" for="check-favourites">В избранное</label>
			</div>
		</fieldset>
	</div>

	<div class="d-flex flex-row justify-content-end">
		<div class="me-auto">
			<RouterLink class="btn btn-outline-light mt-2 align-self-end" to="/"><i class="bi bi-arrow-left me-1"></i>Назад</RouterLink>
		</div>

		<div class="form-group ms-2">
			<button @click="save()" class="btn btn-primary mt-2 align-self-end">Сохранить</button>
		</div>

		<div class="form-group ms-2">
			<button @click="deleteNote()" v-if="!newNote" class="btn btn-warning mt-2 align-self-end">Удалить</button>
		</div>
	</div>

	<div v-if="!newNote" class="mt-1">
		<p class="text-primary">Создано: <span class="fw-bold text-light">{{ dateToString(note.dateCreate) }}</span></p>
		<p class="text-primary">Последнее изменение: <span class="fw-bold text-light">{{ dateToString(note.dateUpdate) }}</span></p>
	</div>

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
            let response = await RefreshIfExpired($authHost.get, [`/notes/${id}`], this)
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
            if (this.newNote) {
                let response = await RefreshIfExpired($authHost.post, ['/notes/new', this.note], this)
                let result = await response.data;
                console.log(result)
                if (result.error) {
                    console.log(result.error)
                } else {
                    console.log("PUSH")     
                    this.$router.push({ name: "MyNotes" });
                }
            } else {
                let response = await RefreshIfExpired($authHost.post, [`/notes/${this.$route.params.id}/edit`, this.note], this)
                let result = await response.data;
                console.log(result)
                if (result.error) {
                    console.log(result.error)
                } else {
                    console.log("PUSH")
                    this.$router.push({ name: "MyNotes" });
                }
            }
        },

        async deleteNote () {
            let response = await RefreshIfExpired($authHost.post, [`/notes/${this.$route.params.id}/delete`], this)
            let result = await response.data;
            console.log(result)
            if (result.error) {
                console.log(result.error)
            } else {
                this.$router.push({ name: "MyNotes" });
            }
        },

        dateToString(date) {
            var options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long',
                timezone: 'UTC',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric'
            }
            date = new Date(date)
            return date.toLocaleString("ru", options)
        }
    },
}
</script>
    