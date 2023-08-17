<template>
  <a-entity
    :id="`pedestal-${this.id}`"
    geometry="primitive: box; width: 3; height: 8; depth: 3"
    :position="`${this.position}`"
  >
    <a-entity
      class="bustMarker"
      position="0 4 0"
      rotation="0 90 0"
      scale="5 10 1"
      geometry="primitive: plane"
      material="transparent: true; opacity: 0"
    >
    </a-entity>
    <a-entity
      :id="`${this.id}`"
      class="cantap"
      :gltf-model="`${this.src}`"
      :rotation="`${this.rotation}`"
      :scale="`${this.scale}`"
      position="0 4 0"
      :move-to-marker="`defaultRotation: ${this.rotation}`"
      spotlight
    >
    </a-entity>
  </a-entity>
</template>
<script>
export default {
  props: {
    id: String,
    src: String,
    info: String,
    rotation: String,
    scale: String,
    zoomScale: String,
    position: String,
  },
  data() {
    return {}
  },
  methods: {},
}
</script>
<style></style>
