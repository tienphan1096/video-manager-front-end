<template>
  <div class="hello">
    <b-card
      v-for="movie in movies"
      :key="movie.filename"
      style="max-width: 20rem;"
      class="mb-2"
      no-body
    >
      <a :href="`http://localhost:3000/assets/movies/${movie.filename}`">
        <b-card-img top :src="`http://localhost:3000${movie.thumbnail}`" alt="Responsive image"></b-card-img>
      </a>
      <b-card-body :title="movie.name">
        <b-card-text :key="movie.filename">
          {{movie.filename}}
        </b-card-text>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data: function () {
    return {
      movies: []
    }
  },
  mounted () {
    this.$http.get('/movies')
      .then(res => {
        this.movies = res.data
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
