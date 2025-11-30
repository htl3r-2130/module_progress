<script setup>
const route = useRoute()
</script>

<template>
  <main>
    <nav>
      <h1>Module Tracker</h1>

      <div class="links">
        <NuxtLink to="/">List</NuxtLink>
        <NuxtLink to="/chart">Chart</NuxtLink>
      </div>
    </nav>

    <NuxtPage />
  </main>
</template>