<template>
  <main class="home">
    <div>

      <button @click="initData()" class="green random-drink-button">Get me a random drink!</button>
    </div>
    <div v-if="items != null" class="container randomDrink">
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

img {
  width: 100%;
}

.randomDrink {
  width: 45%;
}
.random-drink-button {
  /* height: auto;
  width: 5rem; */
  padding: 0.3rem;
  font-size: large;
  font-weight: 900;
  border-radius: .5rem;
  display: block;
  margin: auto;
}

@media (max-width: 1024px) {
  .randomDrink {
    width: 90%;
  }

  /* .home {
          min-height: 100vh;
          display: flex;
          align-items: center;
        } */
}
</style>