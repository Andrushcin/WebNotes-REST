<template >
<div class="px-3 pb-3 pt-2 mx-3 bg-dark rounded" style="margin-top: 20px; margin-bottom: 20px;">
    
    <div class="d-flex flex-wrap justify-content-md-evenly justify-content-center align-items-center mb-3">

        <RouterLink to="/notes/new" v-if="!trash" class="btn btn-primary btn-sm me-2">+ Создать</RouterLink>

        <!--<RouterLink to="/trash" v-if="!trash" class="btn btn-outline-dark btn-sm"><i class="bi bi-trash me-1"></i>Корзина</RouterLink>-->

        <RouterLink to="/" v-if="trash" class="btn btn-sm btn-outline-dark"><i class="bi bi-arrow-left me-1"></i>В заметки</RouterLink>

        <div class="d-flex justify-content-sm-center m-1">
            <div class="input-group input-group-sm">
                <span class="input-group-text"><i class="bi bi-funnel"></i></span>

                <select class="form-select form-control" name="sort">
                    <option value="date_update">Дата обновления</option>
                    <option value="date_create">Дата создания</option>
                    
                    <option  v-if="trash" value="date_to_trash">Дата удаления</option>
                </select>

                <input type="checkbox" class="btn-check" id="sort-reverse" autocomplete="off" name="reverse" value="true">
                <label class="btn btn-outline-light" for="sort-reverse"><i class="bi bi-arrow-down-up"></i></label>
            </div>
        </div>
    </div>

    <div v-for="note in notes" :key="note._id" class="my-1 p-2 d-flex flex-row align-items-center border border-primary rounded">
        <div v-if="note.fav" class="star me-2"></div>
        
        <button @click="$router.push({ name:'Note', params: { id:note._id } })" style="border: none; background: none" class="flex-grow-1 d-flex flex-start text-break text-light ms-2">{{ note.name }}</button>

        <div v-if="!trash" class="ms-2">
            <button style="border: none; background: none"><a href=""><i class="bi bi-star"></i></a></button>
        </div>

        <button @click="deleteNote(note._id)" style="border: none; background: none" class="ms-2"><a href=""><i class="bi bi-trash"></i></a></button>
        
        <!--<button class="ms-2" style="border: none; background: none"><a href=""><i class="bi bi-arrow-counterclockwise"></i></a></button>

        <button class="ms-2" style="border: none; background: none"><a href=""><i class="bi bi-x-circle-fill"></i></a></button>-->

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
            notes: Array,
            trash: false,
        }
    },
    async created () {
        let response = await RefreshIfExpired($authHost.get, ["/notes"], this)
        let result = await response.data
        //this.$router.push({ name: "SignIn" })
        console.log(result)
        this.notes = result.notes;
    },
    computed: {
    },
    methods: {
        async deleteNote (noteId) {
            let response = await RefreshIfExpired($authHost.post, [`/notes/${noteId}/delete`], this)
            let result = await response.data;
            console.log(result)
            if (result.error) {
                console.log(result.error)
            }
        },
    },
}
</script>

<style>
.star {
    width: 20px;
    height: 20px;
    background-repeat: no-repeat;
    background-size: contain;
    background-image: url("./../assets/icons/star.png");
}

</style>
