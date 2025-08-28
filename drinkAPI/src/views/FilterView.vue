<template>
    <div>
        <section  class="container">
            <h1>Type</h1>
            <GoBack/>
            <div class="search-bar">                        
                <select name="input" @change="getData" v-model="input">              
                    <option value="Alcoholic" selected>Alcoholic</option>
                    <option value="Non_Alcoholic">Non Alcoholic</option>          
                </select>
            </div>
        </section>

        <section v-if="items != null" class="results-container container">
            <p>Number of found drinks: {{ items.length }}</p>
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
            input: '',
        }
    },
    components: { GoBack },
    props: {
        id: { type: Number, required: true },
    },
    methods: {
        async getData() {
            //e.preventDefault()
            const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${this.input}`)
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
                    this.items = [];
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
    font-stretch: expanded;
    text-align: center;
    letter-spacing: 2px;
    border: 2px solid var(--vt-c-indigo);
    background-image: url(../assets/search.svg);
    background-position: 2px 4px;
    background-repeat: no-repeat;
}
input[type=search]:focus {
    background-color: var(--vt-c-text-dark-2);
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
    margin-left: -5px;
    left: 50%;
    padding:0.3rem;
}
.search-bar:hover .search-bar-tooltip{
    visibility: visible;
    position: absolute;
    z-index:1;
}
.results-container{
    display: flex;
    justify-content: center;
    padding:5%;
    flex-direction: column;
    align-items: center;
    font-size:larger;
}

.results-container > ul{
  list-style: none;
  text-align: left;
  padding: 5%;
}
.results-none-display{
    text-align: center;
}
select{
    font-size: large;
    text-align: center;
}

</style>