import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlODFiNjZkMDFiMTFmOGMxMjg1NzkxNzY3YmFhYWExZiIsIm5iZiI6MTc1Mjk5NTYwNy4zMzQsInN1YiI6IjY4N2M5NzE3MmI5MzBmYjZkNTUyODk3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1fVJCW39q7kL_U4-EQ-cnTswpTsa3FzCLgLU6CQqs-c'
  }
});

export default instance;
