<template>

    <GoBack />
    <div>
        <div>
            <section class="search-container">
                <h1>Search by drink title</h1>

                <div class="search-bar">
                    <input id="" @keyup.enter="getData('s')" v-model="drinkInput" type="search" placeholder="Search..">
                    <span class="search-bar-tooltip">Type in name of the drink and hit enter.</span>
                </div>
            </section>

            <section v-if="itemsDrinks != null" class="results-container">
                <ul>
                    <router-link v-for="item in itemsDrinks" :key="item.idDrink"
                        :to="{ name: 'item', params: { id: item.idDrink, slug: item.strDrink.replace(/\s+/g, '_') } }"
                        class="">

                        <li>{{ item.strDrink }}</li>

                    </router-link>
                </ul>
            </section>
            <p v-else class="results-none-display"> No results!</p>
        </div>
        <div>
            <section class="search-container">
                <h1>Search by ingredient</h1>

                <div class="search-bar">
                    <input id="" @keyup.enter="getData('i')" v-model="ingredientInput" type="search"
                        placeholder="Search..">
                    <span class="search-bar-tooltip">Type in name of the ingredient and hit enter.</span>
                </div>
            </section>

            <section v-if="itemsIngredients != null" class="results-container">
                <ul>
                    <router-link v-for="item in itemsIngredients" :key="item.idIngredient"
                        :to="{ name: 'item', params: { id: item.idIngredient, slug: item.strIngredient.replace(/\s+/g, '_') } }"
                        class="">

                        <li>{{ item.strIngredient }}</li>

                    </router-link>
                </ul>
            </section>
            <p v-else class="results-none-display"> No results!</p>
        </div>
    </div>

</template>

<script>
import GoBack from '@/components/GoBack.vue';
export default {
    data() {
        return {
            itemsDrinks: [],
            drinkInput: '',
            itemsIngredients: [],
            ingredientInput: ''
        }
    },
    components: { GoBack },
    props: {
        id: { type: Number, required: true },
    },
    methods: {
        async getData(type) {
            console.log(type)
            switch (type) {

                case 's':
                    URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?${type}=${this.drinkInput}`;
                    break;

                case 'i':
                    URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?${type}=${this.ingredientInput}`;
                    break;
            }
            console.log(URL)
            //console.log(dataName)
            const response = await fetch(URL)
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
    
                    switch (type) {
                        case 's':
                            this.itemsDrinks = data.drinks;
                            console.log(this.itemsDrinks)
                            break;
                        case 'i':
                            this.itemsIngredients = data.ingredients;
                            console.log(this.itemsIngredients)
                            break;
                    }


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
.search-container {
    width: 100%;
    margin: auto;
    text-align: center;
}

.search-bar {
    width: 100%;
    /* height: 2rem; */
    margin-top: 2%;
    margin-bottom: 2%;
    position: relative;
}

.search-bar input {
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

.search-bar-tooltip {
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
    padding: 0.3rem;
}

.search-bar:hover .search-bar-tooltip {
    visibility: visible;
    position: absolute;
    z-index: 1;
}

.results-container {
    display: flex;
    justify-content: center;
}

.results-none-display {
    text-align: center;
}
</style>