<template>
    <div class="login-container">
        <h1>Login</h1>
        <form class="form" @submit.prevent="login">
            <label for="username">Username</label>
            <input 
                v-model="username" 
                name="username" 
                type="text" 
                class="input" 
                :class="{validated: isValidated, 'text-danger':hasError},classInputNameObject" 
                placeholder="Enter your name" 
                id="inputName">
            <span class="usernameModal" v-if="classInputNameObject.CharLenError">{{ username_hint_message }}</span>
            
            <label for="password">Password</label>
            <input 
                v-model="password" 
                name="password" 
                type="text" 
                class="input"
                :class="classInputPasswordObject" 
                placeholder="Enter password" 
                id="inputPassword">
            <span class="passwordModal">{{ password_hint_message }}</span>

            <button class="btn loginSubmitBtn">Submit</button>
        </form>
        <!-- this button cannot be inside form, because it behaves as a submit button -->
        <button @click="fillInputfields" class="btn">Fill fields</button>
        <button @click="clearInputfields" class="btn">Clear fields</button>


    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: '',
            isValidated: false,     //false == the class wont appear
            hasError: true,         //true == there is a class 'text-danger' defined in element rendered
            classInputNameObject:{
                CharLenError : true,
                'border-danger': true,         //default:true == red colored border
                'border-ok': false              //default false
            },
            //these values can be put together into 1 class and that class bound to the element >
            classInputPasswordObject:{
                passwordValidated : false,
                'border-danger': true,         //default:true == red colored border
                'border-ok':false              //default false
            }
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

                    if(this.username.length > 0 && this.password.length > 0){
                        console.info("Correct - Username and password are not empty.")
                    }
                    window.user = this.username;
                    const redirectPath = this.$route.query.redirect || '/protected';
                    this.$router.push(redirectPath);
             //   })
              //  .catch(error => {
             //       this.errorMessage = error;
               //     console.error('There was an error!', error);
             //   });


        },
        fillInputfields() {
            this.username = "tibor"
            this.password = "random_password"
            // document.getElementById("inputName").value = "Tibor";
            // document.getElementById("inputPassword").value = "Random_Password";
        },
        clearInputfields() {
            this.username = ""
            this.password = ""
        }
    },
    computed: {
        //computed getter
        username_hint_message(){
            let chars_SET = 2; 
            return this.username.length > chars_SET ? "correct" : "too few characters";
            // return this.username.length > chars_SET ? this.validateNameLength(true) : "too few characters";
        },
        password_hint_message(){
            return "TODO"
        },
        //computed setter - nefunguje zatial reaktivity!!
        validateNameLength(){
            let char_SET = 2;
            if(this.username.length > char_SET){
                
                this.hasError = false; 
                console.log(this.hasError)
            }else{
                this.hasError == true;
                console.log(this.hasError)
            }
        },
        //computed property that returns an object, without this, the bound data won't appear in classes
        classInputPasswordObject(){
            return {
                passwordValidated : false,      //true == class passwordValidated appears
                'border-danger' : this.password.length > 2 ? false : true,
                'border-ok' : this.password.length > 2 ? true : false

            }
        },
        classInputNameObject(){ 
                let char_SET = 2
                if(this.username.length > char_SET){
                    return {
                        CharLenError : false,
                        'border-danger' : false,
                        'border-ok': true
                    }
                }else{
                    return {
                        CharLenError : true,
                        'border-danger' : true,
                        'border-ok': false
                    }
                }
                // CharLenError : this.username.length > 2 ? false : true,
        }
    }
}
</script>
<style>
.login-container{
    margin: auto;
    width: 35%;
}
h1{
    text-align: center;
}
.form{
    display: flex;
    flex-direction: column;
    /* max-width: 25%; */
    font-size: larger;
    /* text-align: center; */
    /* margin: auto; */
    align-content: center;
}
.input{
    width: 100%;
    /* height: 2rem; */
    margin-top: 2%;
    margin-bottom: 2%;
    position: relative;
    text-align: center;
    font-size: 1.2em;
    letter-spacing: 2px;
    border: 2px solid var(--vt-c-indigo);
    outline:none;
}
.loginSubmitBtn{
    margin-top: 2rem;
    max-width: 10rem;
    font-size: large;
    /* text-align: center; */
    margin: 2rem auto;
    padding: 1rem;
    border-style: dashed;
}
.input:focus {
    background-color: var(--vt-c-text-dark-2);
    /* border: 2px solid red; */
}
.text-danger{
    /* color: red; */
}
.border-danger{
    border-color: var(--vt-c-redborder-1);
}
.border-ok{
    border-color: var(--vt-c-greenborder-1);
}
/* HINT MODALS */
.usernameModal{
    /* visibility: hidden; */
}
.input[name="username"]:focus ~ .usernameModal{
    visibility:visible;
}
.passwordModal{
    visibility: hidden;
}
.input[name="password"]:focus ~ .passwordModal{
    visibility:visible;
}
</style>


