<template>
  <main class="home container">
    <h1>Welcome to our madness!</h1>
    <p>Enjoy browsing for drinks, search for a specific drink or just get a random. It's all connected ... to the API,
      so drinks are being generated.</p>
  </main>
</template>


<script>
export default {
  data() {

  }
}
</script>


<style scoped>
.home{
  padding: 3%;
  width: 80%;
}

main {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

}

h1 {
  min-width: 100%;
  text-align: center;
}

@media (min-width: 1024px) {
  .home {
    /* min-height: 100vh; */
    /* display: flex; */
    /* align-items: center; */
  }
}
</style>