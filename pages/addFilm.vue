<template>
  <div>
    <h1>Add a new film</h1>
    <form @submit="addFilm">
      <label for="name">Name:</label>
      <InputText type="text" v-model="film.name" />

      <label for="date">Date:</label>
      <Calendar v-model="film.date" />

      <label for="director">Director:</label>
      <InputText type="text" v-model="film.director" />

      <label for="description">Description:</label>
      <Textarea v-model="film.description" rows="5" cols="30" />

      <label for="director">Status de production:</label>
      <Dropdown
        v-model="film.status"
        :options="status"     
        placeholder="Select a status"
        class="w-full md:w-14rem"
      />    
      <Button label="Ajouter" @click="addFilm" />
    </form>
  </div>
</template>

<script setup>
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import Calendar from 'primevue/calendar'
import { useMoviesStore } from '~/stores/movies'
import { ref } from 'vue'

const film = ref({
  name: '',
  date: '',
  director: '',
  description: '',
  status: { name: '', severity: ''}
})

const store = useMoviesStore()

const status = ref([
  'In production',
 'Released',
  'Postponed',
   'Cancelled'
])

// const countries = ref([
//   { name: 'Australia', code: 'AU' },
//   { name: 'Brazil', code: 'BR' },
//   { name: 'China', code: 'CN' },
//   { name: 'Egypt', code: 'EG' },
//   { name: 'France', code: 'FR' },
//   { name: 'Germany', code: 'DE' },
//   { name: 'India', code: 'IN' },
//   { name: 'Japan', code: 'JP' },
//   { name: 'Spain', code: 'ES' },
//   { name: 'United States', code: 'US' }
// ])

const addFilm = () => {
  fetch('https://crudcrud.com/api/8da80d5b315146c99b6082116a9a2921/movies', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(film.value)

  })
    .then((response) => response.json())
    .then((data) => {
      console.log('addFilm:', data);
      store.addMovie(data)
      // eslint-disable-next-line no-undef
      navigateTo('/')
    })
    .catch((error) => {
      console.error('Error adding film:', error)
    })
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  width: 50%;
}
</style>



