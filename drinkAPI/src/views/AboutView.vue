<template>
  <div class="about">
    <h1>This is an about page</h1>

    <div v-if="items != null" class="">

      <div v-for="item in items" :key="item" class="">
      
          {{ item.strDrink }}        
      
      </div>
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

<script>
export default {
  data() {
    return {
      items: [],
    }
  },
  methods: {
    async initData() {
      //const response = await fetch(`https://travel-dummy-api.netlify.app/${this.$route.params.slug}`)

      const requestOptions = {
        method: 'GET',
        //headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') },

      };

      fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`, requestOptions)
        .then(async response => {
          const data = await response.json();

          // check for error response
          if (!response.ok) {
            console.log('items response error')
            // get error message from body or default to response status
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
          }
          console.log('item found')
          console.log(data)
          this.items = data.drinks;

        })
        .catch(error => {
          this.errorMessage = error;
          console.error('There was an error!', error);
        });

    }

  },
  async created() {
    this.initData()
  }
}
</script>