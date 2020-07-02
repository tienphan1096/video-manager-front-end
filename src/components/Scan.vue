<template>
  <div class="hello">
    <b-card
      v-for="file in files"
      :key="file.fileName"
      v-bind:img-src="`http://localhost:3000${file.thumbnail}`"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem;"
      class="mb-2"
    >
      <b-card-text :key="file.fileName">
      {{file.fileName}}
      </b-card-text>

      <b-button :key="file.fileName" @click="showModal(file)" variant="primary">Go somewhere</b-button>
    </b-card>
    
    <b-modal
      :title="modalTitle" ref="my-modal" ok-title="Save"
      @ok="addMovie"
    >
      <b-form-input v-model="movieName" placeholder="Movie name"></b-form-input>
      <v-select multiple label="name" :options="actors" v-model="cast"></v-select>
    </b-modal>
  </div>
</template>

<script>
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';

export default {
  name: 'HelloWorld',
  components: {
    'v-select': vSelect
  },
  data: function () {
    return {
      files: [],
      movieName: '',
      cast: [],
      actors: [],
      currentFileName: ''
    }
  },
  computed: {
    criteria() {
      // Compute the search criteria
      return this.search.trim().toLowerCase()
    },
    availableOptions() {
      const criteria = this.criteria
      // Filter out already selected options
      const options = this.options.filter(opt => this.cast.indexOf(opt) === -1)
      if (criteria) {
        // Show only options that match criteria
        return options.filter(opt => opt.toLowerCase().indexOf(criteria) > -1);
      }
      // Show all options available
      return options
    },
    searchDesc() {
      if (this.criteria && this.availableOptions.length === 0) {
        return 'There are no tags matching your search criteria'
      }
      return ''
    },
    modalTitle() {
      return `Adding ${this.currentFileName}`
    }
  },
  mounted () {
    this.$http.get('/scan')
      .then(res => {
        this.files = res.data.newFiles
      })

    this.$http.get('/actors')
      .then(res => {
        this.actors = res.data
      })
  },
  methods: {
    showModal (file) {
      this.currentFileName = file.fileName
      this.$refs['my-modal'].show()
    },
    addMovie () {
      console.log(this.currentFileName)
      this.$http.post('/movie', {
        fileName: this.currentFileName,
        name: this.movieName,
        actors: this.cast.map(actor => actor.id).join(',')
      }).then(res => {
        console.log(res)
      })
    }
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
a {
  color: #42b983;
}
</style>

<style>
ul.dropdown-menu {
  max-height: 400px;
  overflow: scroll
}
</style>
