<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import MapModal from './components/map/MapModal.vue';

  import { useMainStore } from '@/stores/main';
  const mainStore = useMainStore();

  const router = useRouter();
  const dismissMap = (): void => {
    mainStore.setIsMapOpen(false);
  };

  onMounted(() => {
    setTimeout(
      () =>
        router.push({
          name: 'Map',
        }),
      1000
    );
  });
</script>

<template>
  <div id="App">
    <MapModal
      v-if="mainStore.mapToken"
      :accessToken="mainStore.mapToken"
      :marker="mainStore.mapMarkers"
      :show="mainStore.isMapOpen"
      @dismissClick="dismissMap"
    />
    <router-view />
  </div>
</template>

<style>
  #App {
    height: 100vh;
    background: linear-gradient(135deg, #8ec6eb, #ebf8e1, #f9e19c);
    overflow: auto;
    justify-content: center;
  }
</style>
