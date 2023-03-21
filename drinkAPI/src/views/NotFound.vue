<template>
  <div class="">
    <p class="titleSubtext"> Site not found!</p>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
  props: {
    msg: {
      type: String,
      required: true
    }
  }
}
</script>


<style scoped>
.titleSubtext {
  font-size: 1.2rem;
  text-align: center;
  padding: 1rem;
  text-transform: capitalize;
}
</style>
