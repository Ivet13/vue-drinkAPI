<template>
    <div>
        <section  class="search-container">
            <h1>Search by drink title</h1>
            <GoBack />
            <div class="search-bar">
                <input id="" @keyup.enter="getData" v-model="txtInput" type="text">
                <span class="search-bar-tooltip">Type in name of the drink and hit enter.</span>
            </div>
        </section>

        <section v-if="items != null" class="results-container">
            <ul>
        <router-link 
        v-for="item in items" 
        :key="item.idDrink" 
        :to="{name: 'item', params:{id:item.idDrink,slug:item.strDrink.replace(/\s+/g, '_')}}"
        class="">
        
          <li>{{ item.strDrink }}</li>
     
        </router-link></ul>
    </section>
    <p v-else class="results-none-display"> No results!</p>

    </div>
</template>

<script>
import GoBack from '@/components/GoBack.vue';
export default {
    data() {
        return {
            items: [],
            txtInput: '',
        }
    },
    components: { GoBack },
    props: {
        id: { type: Number, required: true },
    },
    methods: {
        async getData() {
            const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${this.txtInput}`)
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
    computed: {
        itemId() {
            return parseInt(this$route.params.id)
        },
    },
  
}
</script>

<style>
.search-container{
    width:100%;
    margin:auto;
    text-align: center;
}
.search-bar{
    width: 100%;
    /* height: 2rem; */
    margin-top: 2%;
    margin-bottom: 2%;
    position: relative;
}
.search-bar input{
    min-width: 50%;
    font-size: 1.5em;
    font: expanded;
    text-align: center;
    letter-spacing: 2px;
    border: 2px solid var(--vt-c-indigo);
}
.search-bar-tooltip{
    visibility: hidden;
    display: inline-block;
    z-index: 1;
    position: absolute;
    background-color: var(--vt-c-black-soft);
    color: var(--vt-c-white-soft);
    border-radius: 9px;
    width: 20%;
    top: 100%;
    margin-left: -60px;
    left: 50%;
}
.search-bar:hover .search-bar-tooltip{
    visibility: visible;
    position: absolute;
    z-index:1;
}
.results-container{
    display: flex;
    justify-content: center;
}
.results-none-display{
    text-align: center;
}
</style>