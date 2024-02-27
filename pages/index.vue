<template>
  <NuxtLayout name="default">
    <template #header>
      <h1>Les films de l'année 2024</h1>
    </template>
    <div>
      <DataTable
        :value="movies"
        tableStyle="min-width: 50rem"
        stripedRows
        paginator
        :rows="5"
      >
        <Column field="name" header="Title" sortable style="width: 25%"></Column>
        <Column field="director" header="Director" sortable style="width: 25%"></Column>
        <Column field="date" header="Release Date" sortable style="width: 25%"></Column>
        <Column field="description" header="Description" sortable style="width: 25%"></Column>
        <!-- <Column header="Status" sortable style="width: 25%">
          <template #body="slotProps">
            <Tag :value="slotProps.data.status" :severity="slotProps.data.status" />
          </template>
        </Column> -->
        <Column header="Actions" sortable style="width: 25%">
          <template #body="slotProps">
            <Button @click="editFilm(slotProps.data._id)" label="Edit" />
            <Button
              @click="removeMovie(slotProps.data._id)"
              icon="pi pi-times"
              severity="danger"
              label="Delete"
              rounded
              aria-label="Cancel"
            />
          </template>
        </Column>
      </DataTable>
      <NuxtLink to="/addFilm"><Button label="Ajouter un film" /></NuxtLink>
    </div>
    <template #footer>
      <p>My footer</p>
    </template>
  </NuxtLayout>
</template>

<script setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { storeToRefs } from 'pinia';

import { useMoviesStore } from '@/stores/movies'



const {movies} = storeToRefs(useMoviesStore());
const {fetchMovies, removeMovie} = useMoviesStore();

// eslint-disable-next-line no-undef
useAsyncData('movies', async () => {
  await fetchMovies()
})

const editFilm = (id) => {
   // eslint-disable-next-line no-undef
   navigateTo(`/editFilm/${id}`);
  }


</script>

