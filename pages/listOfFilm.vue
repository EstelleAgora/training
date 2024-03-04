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
        dataKey="_id"
        v-model:filters="filters"
        filterDisplay="row"
        :globalFilterFields="['status']"
      >
        <Column field="name" header="Title" sortable style="width: 15%"></Column>
        <Column field="director" header="Director" sortable style="width: 15%"></Column>
        <Column field="date" header="Release Date" sortable style="width: 15%"></Column>
        <Column field="description" header="Description" sortable style="width: 15%"></Column>
        <Column
          field="status"
          header="Status"
          :showFilterMenu="true"
          :filterMenuStyle="{ width: '14rem' }"
          style="min-width: 12rem"
        >
          <template #body="{ data }">
            <Tag :value="data.status" :severity="getStatusSeverity(data.status)" />
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <Dropdown
              v-model="filterModel.value"
              @change="filterCallback()"
              :options="statuses"
              placeholder="Status"
              class="p-column-filter"
              style="min-width: 12rem"
              :showClear="true"
            >
              <template #option="slotProps">
                <Tag :value="slotProps.option" :severity="getStatusSeverity(slotProps.option)" />
              </template>
            </Dropdown>
          </template>
        </Column>
        <Column header="Actions" sortable style="width: 20%">
          <template #body="slotProps">
            <Button @click="editFilm(slotProps.data._id)" icon="pi pi-pencil" rounded outlined />
            <Button
              @click="removeMovie(slotProps.data._id)"
              icon="pi pi-trash"
              severity="danger"
              rounded
              outlined
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
import { storeToRefs } from 'pinia'
import { FilterMatchMode } from 'primevue/api'
import { ref } from 'vue'
import { useMoviesStore } from '@/stores/movies'
import 'primeicons/primeicons.css'

const { movies } = storeToRefs(useMoviesStore())
const { fetchMovies, removeMovie } = useMoviesStore()

const statuses = ref(['In production', 'Released', 'Postponed', 'Cancelled'])

// eslint-disable-next-line no-undef
useAsyncData('movies', async () => {
  await fetchMovies()
})

const editFilm = (id) => {
  // eslint-disable-next-line no-undef
  navigateTo(`/editFilm/${id}`)
}

const getStatusSeverity = (status) => {
  switch (status) {
    case 'In production':
      return 'info'
    case 'Released':
      return 'success'
    case 'Postponed':
      return 'warning'
    case 'Cancelled':
      return 'danger'
  }
}

const filters = ref({
  status: { value: null, matchMode: FilterMatchMode.EQUALS }
})
</script>
