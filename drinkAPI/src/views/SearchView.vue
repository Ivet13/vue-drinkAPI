<template>
    <div>
        <section  class="">
            <h1>Search by drink title</h1>
            <!-- <GoBack /> -->
            <div class="">
                <input id="" @keyup.enter="getData" v-model="txtInput" type="text">
            </div>
        </section>

        <section v-if="items != null" class="">
            <ul>
        <router-link 
        v-for="item in items" 
        :key="item.idDrink" 
        :to="{name: 'item', params:{id:item.idDrink}}"
        class="">
        
          <li>{{ item.strDrink }}</li>
     
        </router-link></ul>
    </section>
    <p v-else> No results!</p>

    </div>
</template>

<script>
//import GoBack from '@/components/GoBack.vue';
export default {
    data() {
        return {
            items: [],
            txtInput: '',
        }
    },
    // components: { GoBack },
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