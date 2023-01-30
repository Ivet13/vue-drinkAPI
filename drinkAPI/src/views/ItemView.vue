<template>
    <div>
        <section v-if="item" class="">
            <h1>{{ item.strDrink }}</h1>
            <span v-if="IBA" >International Bartenders Association Official Cocktail List  !</span>
            <!-- <GoBack /> -->
            <div :class="`${alco}`">
               
                <img :src="`${item.strDrinkThumb}`" :alt="item.strDrink">
                <p>Category:</p>
                <p>{{ item.strCategory }}</p>
                <p>{{ item.strInstructions }}</p>

                <p>Glass:</p>
                <p>{{ item.strGlass }}</p>

                <p>Ingredients:</p>
                <ul v-if="ingredientsTitles && ingredientsTitles.length">
                    <li v-for="item of ingredientsTitles">{{ item }}: {{ingredientsMeasurements[ingredientsTitles.indexOf(item)]}}
                    </li>
                </ul>
                
                <p>Instructions:</p>
                <p>{{ item.strInstructions }}</p>

            </div>
        </section>

    </div>
</template>

<script>
//import GoBack from '@/components/GoBack.vue';
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
    // components: { GoBack },
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
                    /*
                                        function combineArrays(array1, array2) {
                                            let combinedArray = [];
                    
                                            combinedArray['titles'] = [];
                                            combinedArray['measurements'] = [];
                    
                                            for(let i=0;i < array1.length; i++){
                                                
                                                combinedArray['titles'].push(array1[i]);
                                                combinedArray['measurements'].push(array2[i]);
                                           
                                        }
                                            return combinedArray;
                                        }
                                        this.ingredients = combineArrays(this.ingredientsTitles, this.ingredientsMeasurements);
                                        console.log(this.ingredients)
                                      */

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