<template >
<div class="m-3 px-2 col-xs-12 col-sm-11 col-md-10 col-lg-9 col-xl-7 mx-auto d-flex flex-column">
    
    <div class="my-2 p-1 d-flex flex-wrap justify-content-md-evenly justify-content-center align-items-center border border-warning rounded">

        <RouterLink to="/notes/new" v-if="!trash" class="btn btn-outline-dark btn-sm me-2">+ Создать</RouterLink>

        <!--<RouterLink to="/trash" v-if="!trash" class="btn btn-outline-dark btn-sm"><i class="bi bi-trash me-1"></i>Корзина</RouterLink>-->

        <RouterLink to="/" v-if="trash" class="btn btn-sm btn-outline-dark"><i class="bi bi-arrow-left me-1"></i>Назад</RouterLink>

        <div class="d-flex justify-content-sm-center m-1">
            <div class="input-group input-group-sm">
                <span class="input-group-text"><i class="bi bi-funnel"></i></span>

                <select class="form-select form-control" name="sort">
                    <option value="date_update">Дата обновления</option>
                    <option value="date_create">Дата создания</option>
                    
                    <option  v-if="trash" value="date_to_trash">Дата удаления</option>
                </select>

                <input type="checkbox" class="btn-check" id="sort-reverse" autocomplete="off" name="reverse" value="true">
                <label class="btn btn-outline-dark" for="sort-reverse"><i class="bi bi-arrow-down-up"></i></label>

                <button class="btn btn-outline-dark btn-sm">Применить</button>
            </div>
        </div>
    </div>

    <div v-for="note in notes" :key="note._id" class="my-1 p-2 d-flex flex-row align-items-center border border-dark rounded">
        <div v-if="note.fav" class="star me-2"></div>
        
        <button @click="$router.push({ name:'note', params: { id:note._id} })" style="border: none; background: none" class="flex-grow-1 d-flex flex-start text-break text-dark ms-2">{{ note.name }}</button>

        <div v-if="!trash" class="ms-2">
            <button type="submit" style="border: none; background: none"><a href=""><i class="bi bi-star"></i></a></button>
        </div>

        <button @click="$router.push({ name:'note', params: { id:note._id} })" style="border: none; background: none" ><i class="bi bi-pencil-square"></i></button>

        <button style="border: none; background: none" class="ms-2"><a href=""><i class="bi bi-trash"></i></a></button>
        
        <button class="ms-2" style="border: none; background: none"><a href=""><i class="bi bi-arrow-counterclockwise"></i></a></button>

        <button class="ms-2" style="border: none; background: none"><a href=""><i class="bi bi-x-circle-fill"></i></a></button>

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
        let response = await RefreshIfExpired($authHost.get, ["/notes"])
        let result = await response.data
        console.log(await result.notes)
        this.notes = result.notes;
    },
    computed: {
    },
    methods: {

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
