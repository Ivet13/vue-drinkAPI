<template>
    <div class="login-container">
        <h1>{{ header || 'Login' }}</h1>
        <form class="form" @submit.prevent="login" autocomplete="on">
            <label for="inputName">Username <span class="askerisk">*</span></label>
            <input v-model="username" name="username" type="text" class="input"
                :class="{ validated: isValidated, 'text-danger': hasError }, classInputNameObject"
                placeholder="Enter your name" id="inputName" required autofocus
                oninvalid="this.setCustomValidity('Enter your name, this field is required.')">
            <span class="usernameModal" v-if="classInputNameObject.charLenError" :style="styleObject">{{
                username_hint_message
            }}</span>
            <span class="usernameModal" v-else>filled correctly</span>

            <label for="inputPassword">Password <span class="askerisk">*</span></label>
            <div class="inputWrapper">
                <input v-model="password" name="password" :type="togglePasswordType" class="input"
                    :class="classInputPasswordObject" placeholder="Enter password" id="inputPassword" required
                    autocomplete="off" oninvalid="this.setCustomValidity('Enter password, this field is required.')">
                <i class="inputEyeIcon" :class="inputIconToggle" @click="togglePasswordText"></i>
                <span class="passwordModal modalBlock">{{ password_hint_message1 }}</span>
                <span class="passwordModal modalBlock">{{ password_hint_message2 }}</span>
                <span class="passwordModal modalBlock">{{ password_hint_message3 }}</span>
            </div>

            <!-- submit button cant have type="button" but it should have type="submit" ?!! -->
            <button class="btn loginSubmitBtn" :class="[isValidated ? 'loginSubmitBtnOk' : 'loginSubmitBtnDanger']"
                @click="warn('Form is being submitted!', $event)">Submit
            </button>
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
            header: 'LOGIN',
            username: '',
            password: '',
            isValidated: false,     //modifies the style of the submit button
            hasError: true,         //true == there is a class 'text-danger' defined in element rendered
            togglePasswordType: 'password',
            pwdToggle: 'show',
            classInputNameObject: {
                charLenError: true,
                'border-danger': true,         //default:true == red colored border
                'border-ok': false,              //default false
                
            },
            //these values can be put together into 1 class and that class bound to the element >
            classInputPasswordObject: {
                passwordValidated: false,
                'border-danger': true,         //default:true == red colored border
                'border-ok': false,             //default false
                passwordCondition1: false,      //length of the password input 
                passwordCondition2: false,      //contains capital letter
                passwordCondition3: false,      //contains digit
            },
            styleObject: {
                color: 'red'
            },
            inputIconToggle: 'inputEyeNoShow',
            errors: [],                       //errors storage?
        }
    },
    methods: {
        togglePasswordText() {
            //Toggles the appearance of the Password input field icon and displays the text to be readable
            this.togglePasswordType == 'text' ? this.inputIconToggle = 'inputEyeNoShow' : this.inputIconToggle = 'inputEyeShow'
            this.togglePasswordType == 'text' ? this.togglePasswordType = 'password' : this.togglePasswordType = 'text'
        },
        login(event) {
            //TEST OF EVENT ON SUBMIT - reads the data from submit event to the console log
            console.log(event)
            //username != this.username, but captured username from event
            const { username, password } = Object.fromEntries(new FormData(event.target))
            console.log('username captured: ' + username + ' password captured : ' + password)
            //END TEST 

            //PREVENT DEFAULT
            event.preventDefault()


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

            //PRE-SUBMIT VALIDATION
            if (this.formValidation()) {
                //dummy authorization with window.user
                window.user = this.username;

                const redirectPath = this.$route.query.redirect || '/protected';
                this.$router.push(redirectPath);
            } else {
                alert('Form validation failed, you shouldnt see this!')

            }

            //   })
            //  .catch(error => {
            //       this.errorMessage = error;
            //     console.error('There was an error!', error);
            //   });


        },
        formValidation() {
            //clear previous error messages
            // this.errors = []

            if (this.username.length > 2 && this.passwordValidated) {
                console.info("Correct - Username and password are not empty.")

                //SUBMIT BUTTON STYLE CHANGE
                this.isValidated = true;

                //all is good -> true
                return true
            } else {
                console.info("Incorrectly filled form!")
                // if(!this.username){
                //     this.errors.push("name is required")
                // }
                // if(!this.password){
                //     this.errors.push("password is required")
                // }
                return false
            }
        },
        fillInputfields() {
            this.username = "tibor"
            this.password = "Random_password1"
            // document.getElementById("inputName").value = "Tibor";
            // document.getElementById("inputPassword").value = "Random_Password";
        },
        clearInputfields() {
            this.username = ""
            this.password = ""
        },
        //EVENT HANDER TEST -- delete later
        warn(message, event) {
            //now we have access to the native event
            if (event) {
                // event.preventDefault()

                console.warn(message)
            }
            //alert(message)
        },
        setPassCondition1(value) {
            return this.classInputPasswordObject.passwordCondition1 = value
        },
        setPassCondition2(value) {
            return this.classInputPasswordObject.passwordCondition2 = value
        },
        setPassCondition3(value) {
            return this.classInputPasswordObject.passwordCondition3 = value
        }
    },
    computed: {
        //computed getters
        username_hint_message() {
            let chars_SET = 2;
            return this.username.length > chars_SET ? "correct" : "too few characters";
            // return this.username.length > chars_SET ? this.validateNameLength(true) : "too few characters";
        },
        passwordRulesFullfilled(){
        //RESOLVED IF ALL THE RULES FOR THE PASSWORD FIELDS ARE FULLFILED OR NOT
            if(this.classInputPasswordObject.passwordCondition1 && this.classInputPasswordObject.passwordCondition2 && this.classInputPasswordObject.passwordCondition3){
                this.passwordValidated = true
                //console.info("password validated:" + this.passwordValidated)
            }else{
                this.passwordValidated = false
                //console.info("password validated:" + this.passwordValidated)
            } 
        },
        //REAL-TIME BROWSER FIELD VALIDATION
        password_hint_message1() {
            //CHECKS FOR PASSWORD LENGTH
            let char_SET = 3;
            if (this.password.length > char_SET) {
                this.setPassCondition1(true)
                //console.log("password condition 1 (enough chars):" + this.classInputPasswordObject.passwordCondition1)
                return "Password has enough characters"
            } else {
                this.setPassCondition1(false)
                //console.log("password condition 1 (enough chars):" + this.classInputPasswordObject.passwordCondition1)
                return "Password is too short-needs to be at least 4 characters long"
            }
        },
        password_hint_message2() {
            //CHECKS IF PASSWORD CONTAINS CAPITAL LETTER
            const regexCapital = /[A-Z]/g;
            if (regexCapital.test(this.password)) {
                this.setPassCondition2(true)
                //console.log("password condition 2 (Capital letter):" + this.classInputPasswordObject.passwordCondition2)
                return "Password has a Capital letter"
            } else {
                this.setPassCondition2(false)
                //console.log("password condition 2 (Capital letter)" + this.classInputPasswordObject.passwordCondition2)
                return "Password hasnt a Capital letter"
            }
        },
        password_hint_message3() {
            //CHECKS IF PASSWORD CONTAINS DIGIT
            const regexCapital = /\d/g;
            if (regexCapital.test(this.password)) {
                this.setPassCondition3(true)
                //console.log("password condition 3 (digit):" + this.classInputPasswordObject.passwordCondition3)
                return "Password has a digit"
            } else {
                this.setPassCondition3(false)
                //console.log("password condition 3 (digit)" + this.classInputPasswordObject.passwordCondition3)
                return "Password hasnt a digit"
            }
        },
        //computed setter - nefunguje zatial reaktivity!!
        validateNameLength() {
            let char_SET = 2;
            if (this.username.length > char_SET) {

                this.hasError = false;
                console.log(this.hasError)
            } else {
                this.hasError == true;
                console.log(this.hasError)
            }
        },
        //computed property that returns an object, without this, the bound data won't appear in classes
        classInputPasswordObject() {
            return {
                passwordValidated: this.passwordRulesFullfilled,    
                'border-danger': this.passwordValidated ? false : true,
                'border-ok': this.passwordValidated ? true : false

            }
        },
        classInputNameObject() {
            let char_SET = 2
            if (this.username.length > char_SET) {
                return {
                    CharLenError: false,
                    'border-danger': false,
                    'border-ok': true
                }
            } else {
                return {
                    CharLenError: true,
                    'border-danger': true,
                    'border-ok': false
                }
            }
            // CharLenError : this.username.length > 2 ? false : true,
        }
    }
}
</script>
<style>
body {
    min-width: 370px;
}

.login-container {
    margin: auto;
    max-width: 70%;
}

h1 {
    text-align: center;
}

.form {
    display: flex;
    flex-direction: column;
    /* max-width: 25%; */
    font-size: larger;
    /* text-align: center; */
    /* margin: auto; */
    align-content: center;
}

.inputWrapper {
    margin-top: 2%;
    margin-bottom: 2%;
}

.input {
    width: 100%;
    /* height: 2rem; */
    position: relative;
    text-align: center;
    font-size: 1.2em;
    letter-spacing: 2px;
    border: 2px solid var(--vt-c-indigo);
    outline: none;
}

.inputEyeIcon {
    position: absolute;
    margin-top: 5px;
    background-repeat: no-repeat;
    width: 24px;
    height: 24px;
    right: 5px;
}

.inputEyeShow {
    background-image: url(../assets/visibility_FILL1_wght300_GRAD0_opsz24.svg);
}

.inputEyeNoShow {
    background-image: url(../assets/visibility_off_FILL1_wght300_GRAD0_opsz24.svg);
}

.loginSubmitBtn {
    margin-top: 2rem;
    max-width: 10rem;
    font-size: large;
    /* text-align: center; */
    margin: 0rem auto;
    padding: 1rem;
}

.loginSubmitBtnDanger {
    border-style: dashed;
    cursor: not-allowed;
}

.loginSubmitBtnOk {
    border-style: solid;
    cursor: pointer;
}

.input:focus {
    background-color: var(--vt-c-text-dark-2);
    /* border: 2px solid red; */
}

.text-danger {
    /* color: red; */
}

.border-danger {
    border-color: var(--vt-c-redborder-1);
}

.border-ok {
    border-color: var(--vt-c-greenborder-1);
}

/* HINT MODALS */
.modalBlock {
    display: block
}

.usernameModal {
    /* position: absolute;
    top: 1rem;
    right: 1rem; */

    visibility: hidden;
    /* font-size: small; */
}

.input[name="username"]:focus~.usernameModal {
    visibility: visible;
}

.passwordModal {
    visibility: hidden;
    /* font-size: small; */
}

.input[name="password"]:focus~.passwordModal {
    visibility: visible;
}

.btnPass {
    width: 8rem;
    margin-left: auto;
}
</style>


