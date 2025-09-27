<script setup lang="ts">
defineProps<{
  organizer: { id: number; organizerName: string; address: string }
}>()
</script>

<template>
  <RouterLink class="organizer-link" :to="{ name: 'organizer-detail', params: { id: organizer.id } }">
    <div class="cursor-pointer border border-gray-600 p-[20px] w-[250px] mb-[18px] hover:scale-101 hover:shadow-sp">
      <h2>{{ organizer.organizerName }}</h2>
      <span>📍 {{ organizer.address }}</span>
    </div>
  </RouterLink>
</template>

<style scoped>
.organizer-link {
  text-decoration: none;
  color: #2c3e50;
}
</style>
