import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import axios from "axios";

interface Berry {
  name: string;
  url: string;
}

interface FlavorDetail {
  name: string;
  potency: number;
}

interface BerryDetail {
  name: string;
  id: number;
  size: number;
  firmness: { name: string; url: string };
  flavors: { flavor: { name: string; url: string }; potency: number }[];
  growth_time: number;
  max_harvest: number;
  natural_gift_power: number;
  natural_gift_type: { name: string; url: string };
  smoothness: number;
  soil_dryness: number;
  item: { name: string; url: string };
}

export const useBerryStore = defineStore("berry", () => {
  const berries = ref<Berry[]>([]);
  const allBerries = ref<Berry[]>([]);
  const berryDetail = ref<BerryDetail | null>(null);
  const flavorDetail = ref<FlavorDetail | null>(null);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const count = ref<number>(0);
  const next = ref<string | null>(null);
  const previous = ref<string | null>(null);
  const limit = ref<number>(10);
  const offset = ref<number>(0);
  const searchQuery = ref<string>("");

  const fetchBerries = async (
    newOffset: number = 0,
    newLimit: number = limit.value
  ) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/berry/?offset=${newOffset}&limit=${newLimit}`
      );
      berries.value = response.data.results;
      count.value = response.data.count;
      next.value = response.data.next;
      previous.value = response.data.previous;
      offset.value = newOffset;
      limit.value = newLimit;

      if (allBerries.value.length === 0) {
        fetchAllBerries();
      }
    } catch (err) {
      error.value = "Failed to fetch berries";
    } finally {
      loading.value = false;
    }
  };

  const fetchAllBerries = async () => {
    try {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/berry?limit=1000"
      );
      allBerries.value = response.data.results;
    } catch (err) {
      console.error("Failed to fetch all berries");
    }
  };

  const fetchBerryDetail = async (id: number) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/berry/${id}`);
      berryDetail.value = response.data;
    } catch (err) {
      error.value = "Failed to fetch berry details";
    } finally {
      loading.value = false;
    }
  };

  const fetchFlavorDetail = async (url: string) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get(url);
      flavorDetail.value = response.data;
    } catch (err) {
      error.value = "Failed to fetch flavor details";
    } finally {
      loading.value = false;
    }
  };

  const sortedBerries = computed(() => {
    return [...berries.value].sort((a, b) => a.name.localeCompare(b.name));
  });

  const filteredBerries = computed(() => {
    let data = searchQuery.value
      ? allBerries.value.filter((berry) =>
          berry.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        )
      : berries.value;
    return [...data].sort((a, b) => a.name.localeCompare(b.name));
  });

  const nextPage = () => {
    if (next.value) {
      fetchBerries(offset.value + limit.value, limit.value);
    }
  };

  const prevPage = () => {
    if (previous.value) {
      fetchBerries(offset.value - limit.value, limit.value);
    }
  };

  const setLimit = (newLimit: number) => {
    fetchBerries(0, newLimit);
  };

  watch(searchQuery, (newQuery) => {
    if (newQuery && allBerries.value.length === 0) {
      fetchAllBerries();
    }
  });

  return {
    berries,
    berryDetail,
    flavorDetail,
    loading,
    error,
    fetchBerries,
    fetchBerryDetail,
    fetchFlavorDetail,
    sortedBerries,
    filteredBerries,
    searchQuery,
    nextPage,
    prevPage,
    setLimit,
    limit,
    hasNext: computed(() => !!next.value),
    hasPrev: computed(() => !!previous.value),
  };
});
