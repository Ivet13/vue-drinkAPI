<template>
    <div>
        <section v-if="item" class="">
            <h1>{{ item.strDrink }}</h1>
            <!-- <GoBack /> -->
            <div class="">
                <input type="text" placeholder="Search..">
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