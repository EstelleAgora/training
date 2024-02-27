import {defineStore} from "pinia";
export const useMoviesStore = defineStore('moviesStore', {
  
    state :() => ({
        movies: [],
    }),
    actions: {
        addMovie(movie) {
            this.movies.push(movie);
        },
       async updateMovie(id, newMovie) {
        console.log(id);
            await fetch(`https://crudcrud.com/api/26f3d353736345a7b273edab4c74145a/movies/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newMovie) 
            // eslint-disable-next-line no-unused-vars
            }).then((response) => {          
                this.movies[this.movies.findIndex(e => e._id == id)] = newMovie;
                // eslint-disable-next-line no-undef
                navigateTo('/');
            })},      
      
       async removeMovie(id) {
            await fetch(`https://crudcrud.com/api/26f3d353736345a7b273edab4c74145a/movies/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(() => {
                this.movies.splice(this.movies.findIndex(e => e._id == id), 1);
            })

        },
        async fetchMovies() {
            this.loading = true;
            if(this.movies.length > 0) return;
            const response = await fetch('https://crudcrud.com/api/26f3d353736345a7b273edab4c74145a/movies');
            this.movies = await response.json();
            this.loading = false;
        }
    }, 
    getters: {
        getMovies() {
            return this.movies;
        },
        getMovieById: (state) => {
            return (id) => state.movies.find((e) => e._id === id)
          },     
    }
});


