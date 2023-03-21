<template>
    <div>
        <section v-if="item" class="container randomDrinkDetail">
            <h1>{{ item.strDrink }} - Detailed view</h1>
            <span v-if="IBA">International Bartenders' Association Official Cocktail List!</span>
            <GoBack/>
            <div :class="`${alco} drink-detail-wrapper`">

                <img class="img-detailed" :src="`${item.strDrinkThumb}`" :alt="item.strDrink">
                <div class="drink-details-text-container">

                    <p class="underlined">Category:</p>
                    <p>{{ item.strCategory }}</p>

                    <p class="underlined">Glass:</p>
                    <p>{{ item.strGlass }}</p>

                    <p class="underlined">Ingredients:</p>
                    <ul v-if="ingredientsTitles && ingredientsTitles.length">
                        <li v-for="item of ingredientsTitles">{{ item }}:
                            {{ ingredientsMeasurements[ingredientsTitles.indexOf(item)]}}
                        </li>
                    </ul>

                    <p>Instructions:</p>
                    <p>{{ item.strInstructions }}</p>

                </div>

            </div>
        </section>

    </div>
</template>

<script>
import GoBack from '@/components/GoBack.vue';
export default {
    data() {
        return {
            item: [],
            alco: "",
            IBA: false,
            ingredientsTitles: [],
            ingredientsMeasurements: []
        }
    },
    components: { GoBack },
    props: {
        id: { type: Number, required: true }
    },
    methods: {
        async initData() {
            const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${this.$route.params.id}`)
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
                    this.item = data.drinks[0];


                    this.alco = (this.item.strAlcoholic === 'Alcoholic') ? 'alco' : 'nonalco';

                    this.IBA = (this.item.strIBA != null) ? true : false;

                    function getParamsFromItem(paramsTypeArray, APIStringName, item) {
                        paramsTypeArray = [];
                        for (let itemProperty in item) {
                            if (itemProperty.includes(APIStringName) && item[itemProperty] != null) {
                                paramsTypeArray.push(item[itemProperty])
                            }
                        } return paramsTypeArray;
                    }

                    this.ingredientsTitles = getParamsFromItem('ingredients', 'strIngredient', this.item);
                    // console.log(this.ingredientsTitles);

                    this.ingredientsMeasurements = getParamsFromItem('measurements', 'strMeasure', this.item);
                    // console.log(this.ingredientsMeasurements);

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
    async created() {
        this.initData()
    }
}
</script>

<style>
.alco {
    border-top: 2px solid var(--vt-c-redborder-1);
    padding-top: 1rem;
}

.nonalco {
    border-top: 2px solid var(--vt-c-indigo);
    padding-top: 1rem;
}

.drink-detail-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
}

.img-detailed {
    width: 40%;
    height: fit-content;
}

.drink-details-text-container {
    padding: 2%;
    width: 450px;
    text-align: initial;
}
.randomDrinkDetail{
    width: 90%;
}
.underlined{
    text-decoration: underline;
}
@media (max-width: 1024px) {
    .img-detailed {
        width: 100%;
    }

    /* .random-drink-container{
        width: 95%;
    } */
}
</style>