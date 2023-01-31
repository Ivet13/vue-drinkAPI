<template>
  <main class="home">
    <div>

      <button @click="initData()" class="random-drink-button">Get me a random drink!</button>
    </div>
    <div v-if="items != null" class="random-drink-container">
      <router-link v-for="item in items" :key="item.idDrink"
        :to="{ name: 'item', params: { id: item.idDrink, slug: item.strDrink.replace(/\s+/g, '_') } }" class="">
        <h2>{{ item.strDrink }}</h2>
        <img :src="`${item.strDrinkThumb}`" :alt="item.strDrink">
      </router-link>
    </div>
  </main>
</template>

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

<style>
.random-drink-container {
  width: 50%;
  margin: auto;
  /* border-radius: 5%; */
  padding: 2rem;
  margin-top: 17px;
  box-shadow: 3px 3px 15px grey;
}

img {
  width: 100%;
}

.random-drink-button {
  /* height: auto;
  width: 5rem; */
  padding: 1rem;
  font-size: large;
  font-weight: 900;
  border-radius: .5rem;
  display: block;
  margin: auto;
}

@media (min-width: 1024px) {
  /* .home {
          min-height: 100vh;
          display: flex;
          align-items: center;
        } */
}
</style>