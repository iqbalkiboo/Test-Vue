<script setup lang="ts">
import { computed } from "vue";
import { type ChartData, type ChartOptions } from "chart.js/auto";
import { useColorSchemeStore } from "@/stores/color-scheme";
import { useDarkModeStore } from "@/stores/dark-mode";
import Chart from "@/components/Base/Chart";
import { getColor } from "@/utils/colors";

const props = defineProps<{
  width?: number;
  height?: number;
}>();

const colorScheme = computed(() => useColorSchemeStore().colorScheme);
const darkMode = computed(() => useDarkModeStore().darkMode);

const chartData = [75, 25];
const data = computed<ChartData>(() => {
  return {
    labels: ["31 - 50 Years old", ">= 50 Years old"],
    datasets: [
      {
        data: chartData,
        backgroundColor: colorScheme.value
          ? [getColor("primary", 0.5), getColor("slate.300")]
          : "",
        hoverBackgroundColor: colorScheme.value
          ? [getColor("primary", 0.5), getColor("slate.300")]
          : "",
        borderWidth: 1,
        borderColor: colorScheme.value
          ? [getColor("primary", 0.5), getColor("slate.400", 0.4)]
          : "",
      },
    ],
  };
});

const options = computed<ChartOptions>(() => {
  return {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    cutout: "78%",
  };
});
</script>

<template>
  <Chart
    type="doughnut"
    :width="props.width"
    :height="props.height"
    :data="data"
    :options="options"
  />
</template>
