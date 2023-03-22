<template>
  <header>
    <div class="wrapper">
      <HeaderComponent msg="Drink API with Vue Project" />



      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/random">Random</RouterLink>
        <RouterLink to="/search">Search</RouterLink>
        <RouterLink to="/list">Drinks by alphabet!</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView v-slot="{Component}"></RouterView>
  <!-- Transition(global vue component) -->
  <transition name="slide" mode="out-in">
    <!-- the key atribute is now used here in anonymous component instead of in router-view -->
    <component :is="Component" :key="$route.path"></component>
  </transition>
</template>


<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HeaderComponent from './components/HeaderComponent.vue'
</script>


<style lang="css">
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /*TEST*/
  margin-bottom: 10%;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  width: 100%;
  font-size: 1rem;
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

.container{
  margin:auto;
  text-align: center;
  width: 50%;
  padding: 2rem;
  margin-top: 17px;
  margin-bottom: 5%;
  box-shadow: 3px 3px 15px grey;
}

@media (min-width: 1024px) {
  header {
    /* display: flex; */
    /* place-items: center; */
    /* padding-right: calc(var(--section-gap) / 2); */
  }

  .logo {
    /* margin: 0 2rem 0 0; */
  }

  header .wrapper {
    /* display: flex; */
    /* place-items: flex-start; */
    /* flex-wrap: wrap; */
  }

  nav {
    /* text-align: left; */
    /* margin-left: -1rem; */
    /* font-size: 1rem; */

    /* padding: 1rem 0; */
    /* margin-top: 1rem; */
  }
}

/* TRANSFORMATION TEST */
/* .slide-enter-active,
.slide-leave-active {
  transition: opacity 1s, transform 1s;

}

.slide-enter-from, .slide-leave-to {
  opacity: 0;
  transform: transalteX(-30%);
} */
</style>
