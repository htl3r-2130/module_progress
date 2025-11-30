<script setup>
const route = useRoute()
</script>

<template>
  <main>
    <nav>
      <h1>Module Tracker</h1>

      <div class="links">
        <NuxtLink
          to="/"
          :class="{ active: route.path === '/' }"
        >List</NuxtLink>

        <NuxtLink
          to="/chart"
          :class="{ active: route.path === '/chart' }"
        >Chart</NuxtLink>
      </div>
    </nav>

    <NuxtPage />
  </main>
</template>
