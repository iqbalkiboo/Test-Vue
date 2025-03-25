<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useBerryStore } from '@/stores/useBerryStore';

const route = useRoute();
const berryStore = useBerryStore();
const berryId = Number(route.params.id);

onMounted(() => {
  berryStore.fetchBerryDetail(berryId);
});
</script>

<template>
  <div class="box box--stacked">
    <div v-if="berryStore.loading" class="text-center">Loading...</div>
    <div v-else-if="berryStore.error" class="text-red-500">{{ berryStore.error }}</div>
    <div v-else-if="berryStore.berryDetail" class="p-4 border rounded shadow-md">
      <h1 class="text-2xl font-bold">{{ berryStore.berryDetail.name }} (ID: {{ berryStore.berryDetail.id }})</h1>

      <div class="mt-4">
        <p><strong>Size:</strong> {{ berryStore.berryDetail.size }}</p>
        <p><strong>Firmness:</strong> {{ berryStore.berryDetail.firmness.name }}</p>
        <p><strong>Growth Time:</strong> {{ berryStore.berryDetail.growth_time }}</p>
        <p><strong>Max Harvest:</strong> {{ berryStore.berryDetail.max_harvest }}</p>
        <p><strong>Smoothness:</strong> {{ berryStore.berryDetail.smoothness }}</p>
        <p><strong>Soil Dryness:</strong> {{ berryStore.berryDetail.soil_dryness }}</p>
      </div>

      <div class="mt-4">
        <h2 class="text-xl font-semibold">Flavors</h2>
        <ul class="list-disc ml-4">
          <li v-for="flavor in berryStore.berryDetail.flavors" :key="flavor.flavor.name">
            {{ flavor.flavor.name }} (Potency: {{ flavor.potency }})
          </li>
        </ul>
      </div>

      <div class="mt-4">
        <p><strong>Natural Gift Power:</strong> {{ berryStore.berryDetail.natural_gift_power }}</p>
        <p><strong>Natural Gift Type:</strong> {{ berryStore.berryDetail.natural_gift_type.name }}</p>
      </div>

      <div class="mt-4">
        <p><strong>Item:</strong> {{ berryStore.berryDetail.item.name }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
p {
  margin-bottom: 4px;
}
</style>
