<script setup lang="ts">
  import { MapMarkerObj } from '@/types/map.interfaces';
  import VueMapbox from '@/components/map/VueMapbox.vue';
  import { watch } from 'vue';

  interface MapModalProps {
    accessToken: string;
    marker: MapMarkerObj[];
    show?: boolean;
  }

  const props = withDefaults(defineProps<MapModalProps>(), {
    show: false,
  });

  const emit = defineEmits<{
    (e: 'dismissClick'): void;
    (e: 'goToEntity', marker: MapMarkerObj): void;
  }>();

  const goToEntity = (marker: MapMarkerObj): void => {
    emit('goToEntity', marker);
  };

  const dismissClick = (): void => {
    emit('dismissClick');
  };
</script>
<template>
  <div class="modal" :class="{ 'is-active': show }">
    <div class="modal-background">
      <section class="section map-container">
        <VueMapbox
          :accessToken="accessToken"
          :markers="marker"
          @goToEntity="goToEntity"
        />
      </section>
      <button
        class="modal-close is-large"
        aria-label="close"
        @click="dismissClick"
      ></button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import '@/styles/app.scss';

  .map-container {
    height: 95%;
    width: 95%;
    margin: 1.5% 2.5% 1.5% 2.5%;
  }
</style>
