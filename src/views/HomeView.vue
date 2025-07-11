<script setup>
import TheWelcome from '../components/TheWelcome.vue'

</script>

<template>
  <main>
    <TheWelcome />
    <router-link to="/create" class="text-blue-600 underline">Add New User</router-link>

  </main>
</template>
