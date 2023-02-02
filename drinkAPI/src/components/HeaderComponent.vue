<template>
  <RouterLink to="/"><span class="icon"><i class="fas fa-martini-glass"></i></span></RouterLink>
  <div class="greetings">
    <div class="title">{{ msg }}</div>
    <p class="titleSubtext">Enjoy your poison!</p>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router'

export default{
  

props:{
  msg: {
    type: String,
    required: true
  }
}
}
</script>


<style scoped>
.icon{
  font-size: 4rem;
}

.logo {
  /* display: block; */
  /* margin: 0 auto 2rem; */
}

.title {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

.titleSubtext {
  font-size: 1.2rem;
  text-align: center;
  padding: 1rem;
  text-transform: capitalize;
}

.greetings {
  text-align: center;
}
.greetings{
  border-bottom:1px solid var(--vt-c-black-soft);
}

</style>
