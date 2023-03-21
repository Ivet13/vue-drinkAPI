<template>
  <div>

    <main class="container">
      <GoBack/>
      <h1>Who did this?</h1>
      <p>KK-Soft@2023</p>
    </main>

  </div>
</template>

<script>
import GoBack from '../components/GoBack.vue';
export default {
  components: {GoBack},
}
</script>
<style>
.container{
  width: 80%;
}
</style>