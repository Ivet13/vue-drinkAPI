<template>
  <div>

    <main class="about-container">
      <GoBack class="aboutViewGoBack"/>
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
.about-container{
  margin:auto;
  text-align: center;
  text-align: center;
    width: 50%;
  padding: 2rem;
  margin-top: 17px;
  margin-bottom: 5%;
  box-shadow: 3px 3px 15px grey;
}
.aboutViewGoBack{
    position: absolute;
    top:0;
    left: 0;
}
</style>