<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useBerryStore } from '@/stores/useBerryStore';

const route = useRoute();
const berryStore = useBerryStore();
const berryId = Number(route.params.id);

onMounted(() => {
  berryStore.fetchBerryDetail(berryId);
});

const handleFlavorClick = (url: string) => {
  berryStore.fetchFlavorDetail(url);
};

// Jika user berpindah detail berry lain
watch(() => route.params.id, (newId) => {
  berryStore.fetchBerryDetail(Number(newId));
});

const { t } = useI18n();
</script>

<template>
  <div class="box box--stacked">
    <!-- Skeleton Loading -->
    <div class="animate-pulse" v-if="berryStore.loading">
      <div class="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
      
      <div class="space-y-3 mt-4">
        <div class="h-4 bg-gray-200 rounded w-1/2"></div>
        <div class="h-4 bg-gray-200 rounded w-2/3"></div>
        <div class="h-4 bg-gray-200 rounded w-1/2"></div>
        <div class="h-4 bg-gray-200 rounded w-3/4"></div>
        <div class="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>

      <div class="mt-6">
        <div class="h-6 bg-gray-200 rounded w-1/4 mb-3"></div>
        <div class="space-y-2">
          <div class="h-4 bg-gray-200 rounded w-1/3"></div>
          <div class="h-4 bg-gray-200 rounded w-1/3"></div>
          <div class="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>

      <div class="space-y-3 mt-6">
        <div class="h-4 bg-gray-200 rounded w-2/3"></div>
        <div class="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>

      <div class="mt-6">
        <div class="h-4 bg-gray-200 rounded w-1/3"></div>
      </div>
    </div>

    <!-- Skeleton Loading remains unchanged -->
    <div v-else-if="berryStore.error" class="text-red-500">{{ berryStore.error }}</div>
    <div v-else-if="berryStore.berryDetail" class="p-4 border rounded shadow-md">
      <h1 class="text-2xl font-bold">
        {{ berryStore.berryDetail.name.replace(/^\w/, (c) => c.toUpperCase()) }} 
        ({{ t('detail.id') }}: {{ berryStore.berryDetail.id }})
      </h1>

      <div class="mt-4">
        <p><strong>{{ t('detail.attributes.size') }}:</strong> {{ berryStore.berryDetail.size }}</p>
        <p><strong>{{ t('detail.attributes.firmness') }}:</strong> {{ berryStore.berryDetail.firmness.name }}</p>
        <p><strong>{{ t('detail.attributes.growthTime') }}:</strong> {{ berryStore.berryDetail.growth_time }}</p>
        <p><strong>{{ t('detail.attributes.maxHarvest') }}:</strong> {{ berryStore.berryDetail.max_harvest }}</p>
        <p><strong>{{ t('detail.attributes.smoothness') }}:</strong> {{ berryStore.berryDetail.smoothness }}</p>
        <p><strong>{{ t('detail.attributes.soilDryness') }}:</strong> {{ berryStore.berryDetail.soil_dryness }}</p>
      </div>

      <div class="mt-4">
        <h2 class="text-xl font-semibold">{{ t('detail.flavors.title') }}</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div
            v-for="flavor in berryStore.berryDetail.flavors"
            :key="flavor.flavor.name"
            @click="handleFlavorClick(flavor.flavor.url)"
            class="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer bg-white"
          >
            <div class="flex flex-col">
              <span class="text-lg font-medium text-gray-800">
                {{ flavor.flavor.name.replace(/^\w/, (c) => c.toUpperCase()) }}
              </span>
              <span class="text-sm text-gray-600 mt-2">
                {{ t('detail.flavors.potency') }}: {{ flavor.potency }}
              </span>
            </div>
          </div>
        </div>
        <div v-if="berryStore.flavorDetail" class="mt-6 p-4 border rounded bg-gray-100">
          <h2 class="text-lg font-bold">{{ t('detail.flavors.detail') }}:</h2>
          <p>{{ t('detail.flavors.name') }}: {{ berryStore.flavorDetail?.name?.replace(/^\w/, (c) => c.toUpperCase()) }}</p>
          <p>{{ t('detail.flavors.contestType') }}: {{ berryStore.flavorDetail?.contest_type?.name }}</p>
        </div>
      </div>

      <div class="mt-4">
        <p><strong>{{ t('detail.attributes.naturalGiftPower') }}:</strong> {{ berryStore.berryDetail.natural_gift_power }}</p>
        <p><strong>{{ t('detail.attributes.naturalGiftType') }}:</strong> {{ berryStore.berryDetail.natural_gift_type.name }}</p>
      </div>

      <div class="mt-4">
        <p><strong>{{ t('detail.attributes.item') }}:</strong> {{ berryStore.berryDetail.item.name }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
p {
  margin-bottom: 4px;
}
</style>
