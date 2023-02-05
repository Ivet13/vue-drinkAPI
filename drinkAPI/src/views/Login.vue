<template>
    <div class="login">
        <h1>Login</h1>
        <form class="form" @submit.prevent="login">
            <label for="username">Username</label>
            <input v-model="username" name="username" type="text" class="input">
            <label for="password">Password</label>
            <input v-model="password" name="password" type="text" class="input">
            <button class="btn">Submit</button>
        </form>


    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        login() {
            // Auth user against the API -> TODO
            // POST request using fetch with error handling
          //  const requestOptions = {
            //    method: 'POST',
                //the gfollowing line triggers a CORS preflight in the browser
               // headers: { 'Content-Type': 'application/json' },
           //     body: JSON.stringify({ "username": this.username, "password": this.password })
          //  };
            //fetch('http://localhost:8080/users/login', requestOptions)
             //   .then(async response => {
              //      const data = await response.json();

                    // check for error response
               //     if (!response.ok) {
                        // get error message from body or default to response status
                //        const error = (data && data.message) || response.status;
                //        return Promise.reject(error);
               //     }

                    window.user = this.username;
                    const redirectPath = this.$route.query.redirect || '/protected';
                    this.$router.push(redirectPath);
             //   })
              //  .catch(error => {
             //       this.errorMessage = error;
               //     console.error('There was an error!', error);
             //   });


        }
    }
}
</script>


