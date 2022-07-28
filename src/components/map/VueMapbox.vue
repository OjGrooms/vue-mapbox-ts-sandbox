<script setup lang="ts">
  import { MapMarkerObj } from '@/types/map.interfaces';
  import { LngLatLike } from 'mapbox-gl';
  import { ref, watch } from 'vue';

  interface MapProps {
    accessToken: string;
    markers?: MapMarkerObj[];
  }

  const props = defineProps<MapProps>();

  const emit = defineEmits<{
    (e: 'goToEntity', marker: MapMarkerObj): void;
  }>();

  const focusCenter = ref<LngLatLike>([169.1445, -52.5450]);
  const focusZoom = ref<number>(12);
  const goToEntity = (event: Event): void => {
    if (event.target) {
      const { target } = event;
      const targetParent = (target as HTMLButtonElement)
        .parentNode as HTMLDivElement;
      const parentId = targetParent.id;
      if (parentId && props.markers) {
        const marker = props.markers.find((m) => m.id === parentId);
        if (marker) {
          emit('goToEntity', marker);
        }
      }
    }
  };
  watch(
    () => props.markers,
    () => {
      if (props.markers && props.markers.length === 1) {
        // only one marker sent in, focus on that
        focusCenter.value = props.markers[0].lngLat;
      } else if (props.markers && props.markers.length > 1) {
        focusZoom.value = 7;
      } else {
        // no markers, reset
        focusCenter.value = [169.1445, -52.5450];
        focusZoom.value = 12;
      }
    }
  );
</script>

<template>
  <MapboxMap
    :accessToken="accessToken"
    :center="focusCenter"
    :zoom="focusZoom"
    :maxPitch="85"
    :height="'100%'"
    :autoResize="false"
    :autoResizeDelay="10"
  >
    <div v-if="markers">
      <MapboxMarker
        v-for="(marker, index) in markers"
        :key="index"
        :lngLat="marker.lngLat"
      >
        <!-- <template #icon>
          <img :src="markers[index].icon" class="marker-icon" />
        </template> -->
        <MapboxPopup
          :id="markers[index].id"
          :closeButton="true"
          :offset="50"
          @click="goToEntity"
          v-html="markers[index].popup"
        ></MapboxPopup>
      </MapboxMarker>
    </div>
  </MapboxMap>
</template>

<style lang="scss">
  .marker-icon {
    height: 45px;
    width: 30px;
  }
</style>
