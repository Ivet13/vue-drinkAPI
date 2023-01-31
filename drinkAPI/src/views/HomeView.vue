<template>
  <main class="home">
    <h1>Welcome to our madness!</h1>
    <p>Enjoy browsing for drinks, search for a specific drink or just get a random. It's all connected ... to the API, so drinks are being generated.</p>
  </main>
</template>


<script>
export default {
  data() {
    
  }
}
</script>


<style scoped>
main {
  display:flex;
  justify-content: center;
  flex-wrap: wrap;
  
}

@media (min-width: 1024px) {
  .home {
    /* min-height: 100vh; */
    /* display: flex; */
    /* align-items: center; */
  }
}
</style>