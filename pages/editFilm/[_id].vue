<template>
  <div>
    <h1>Edit Movie</h1>
    <form @submit="submitForm">
      <label for="title">Title:</label>
      <InputText type="text" id="title" v-model="film.name" />

      <label for="date">Date:</label>
      <Calendar type="number" id="Date" v-model="film.date" />
      
      <label for="director">Director:</label>
      <InputText type="text" id="director" v-model="film.director" />

      <label for="description">Description:</label>
      <Textarea v-model="film.description" rows="5" cols="30" />
      
      <label for="director">Status de production:</label>
      <Dropdown
        v-model="film.status"
        :options="status"            
        placeholder="Select a status"
        class="w-full md:w-14rem"
      />    
      
      <Button type="submit">Submit</button>
    </form>
  </div>
</template>

<script setup>
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import Calendar from 'primevue/calendar'
import { useMoviesStore } from '~/stores/movies'
import {useRoute} from "vue-router";

import { ref } from 'vue'
    const route = useRoute();

    const {getMovieById, updateMovie} = useMoviesStore();
    // eslint-disable-next-line no-undef

    //Ask question
    const film = getMovieById(route.params._id);
 
    const status = ref([
  'In production',
 'Released',
  'Postponed',
   'Cancelled'
])
    const submitForm = () => {   
      updateMovie(route.params._id,  {name: film.name, director: film.director, description: film.description, date: film.date, status: film.status} ); 
      // eslint-disable-next-line no-undef
      navigateTo('/');
    };

   

</script>



<style scoped>
form {
  display: flex;
  flex-direction: column;
  width: 50%;
}
</style>


