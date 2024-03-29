<template>
    <div>
        <section  class="container listSearch">
            <h1>List of drinks by alphabet</h1>
            <GoBack/>
            <div class="search-bar">
                        
                <select name="input" @change="getData" v-model="input">
                <optgroup label="Letters">
                    <option value="A" selected>A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
                    <option value="G">G</option>
                    <option value="H">H</option>
                    <option value="I">I</option>
                    <option value="K">K</option>
                    <option value="L">L</option>
                    <option value="M">M</option>
                    <option value="N">N</option>
                    <option value="O">O</option>
                    <option value="P">P</option>
                    <option value="Q">Q</option>
                    <option value="R">R</option>
                    <option value="S">S</option>
                    <option value="T">T</option>
                    <option value="U">U</option>
                    <option value="V">V</option>
                    <option value="W">W</option>
                    <option value="X">X</option>
                    <option value="Y">Y</option>
                    <option value="Z">Z</option>
                </optgroup>
                <optgroup label="Numbers">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                </optgroup>

                </select>
            </div>
        </section>

        <section v-if="items != null" class="list-results-container container">
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
            const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${this.input}`)
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
.listSearch{
    width: 80%;
}
/* .search-bar{
    width: 100%;
    margin-top: 2%;
    margin-bottom: 2%;
    position: relative;
} */
/* .search-bar input{
    min-width: 50%;
    font-size: 1.5em;
    font-stretch: expanded;
    text-align: center;
    letter-spacing: 2px;
    border: 2px solid var(--vt-c-indigo);
    background-image: url(../assets/search.svg);
    background-position: 2px 4px;
    background-repeat: no-repeat;
} */
/* input[type=search]:focus {
    background-color: var(--vt-c-text-dark-2);
} */
/* .search-bar-tooltip{
    visibility: hidden;
    display: inline-block;
    z-index: 1;
    position: absolute;
    background-color: var(--vt-c-black-soft);
    color: var(--vt-c-white-soft);
    border-radius: 9px;
    width: 50%;
    top: 100%;
    margin-left: -25%;
    left: 50%;
    padding:0.3rem;
} */
/* .search-bar:hover .search-bar-tooltip{
    visibility: visible;
    position: absolute;
    z-index:1;
} */
.list-results-container{
    display: flex;
    justify-content: center;
    padding:5%;
    flex-direction: column;
    align-items: center;
    font-size:larger;
    width: 80%;
}

.list-results-container ul{
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