import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import axios from "axios";

interface Berry {
  name: string;
  url: string;
}

export const useBerryStore = defineStore("berry", () => {
  const berries = ref<Berry[]>([]);
  const allBerries = ref<Berry[]>([]);
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
        fetchAllBerries(); // Fetch all data once when first fetching paginated data
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
      fetchAllBerries(); // Fetch all data only if it hasn't been fetched yet
    }
  });

  return {
    berries,
    loading,
    error,
    fetchBerries,
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
