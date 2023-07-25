<template>
  <div id="ar-div" class="cantap">
    <!-- UI -->
    <div id="overlay" class="absolute-fill">
      <span id="promptText"></span>
    </div>

    <!-- Scene -->
    <a-scene
      xrweb="allowedDevices: any; disableDefaultEnvironment: false; disableWorldTracking:false"
      xrextras-runtime-error
      renderer="colorManagement: true;"
      tap-to-place-portal
      prompt-flow
    >
      <!-- Assets -->
      <a-assets>
        <!-- Textures -->
        <img id="sky" src="/textures/sky.png" />
        <img id="blob" src="/textures/blob.png" />
        <audio
          id="intro"
          src="/sounds/positive-correct.wav"
          preload="auto"
        ></audio>
        <audio id="hum" src="/sounds/scifi-hum.wav" preload="auto"></audio>
      </a-assets>

      <!-- Camera -->
      <a-camera id="camera" position="0 9 9" portal-camera fov="90">
        <a-entity
          raycaster="objects: .collidable; showLine: true; far: 5"
          collider-check
        >
        </a-entity>
        <a-entity
          light="type: point; intensity: 0.75; distance: 50; decay: 4"
        ></a-entity>
      </a-camera>
      <!-- Hider walls -->
      <xrextras-opaque-background remove="false">
        <a-entity id="hider-walls">
          <a-box
            scale="100 1 100"
            position="0 -1 49"
            xrextras-hider-material
          ></a-box>
          <a-box
            scale="100 100 1"
            position="0 50 75"
            xrextras-hider-material
          ></a-box>
          <a-box
            scale="100 1 100"
            position="0 100 49"
            xrextras-hider-material
          ></a-box>
          <a-box
            scale="1 100 100"
            position="-30 50 50"
            xrextras-hider-material
          ></a-box>
          <a-box
            scale="1 100 100"
            position="30 50 50"
            xrextras-hider-material
          ></a-box>
          <a-ring
            id="portalHiderRing"
            radius-inner="0.001"
            radius-outer="100"
            position="0 7.5 -0.2"
            xrextras-hider-material
          ></a-ring>

          <a-entity id="hider-spinner" position="0 7.5 -0.2">
            <a-box
              id="newPortalHiderOne"
              scale="30 5 0"
              position="0 -6.320 0"
              xrextras-hider-material
            >
            </a-box>
            <a-box
              id="newPortalHiderTwo"
              scale="30 5 0"
              position="5.379 1.729 0"
              rotation="0 0 -60"
              xrextras-hider-material
            >
            </a-box>
            <a-box
              id="newPortalHiderThree"
              scale="30 5 0"
              position="-5.529 1.381 0"
              rotation="0 0 60"
              xrextras-hider-material
            >
            </a-box>
          </a-entity>
        </a-entity>

        <a-entity id="portal-wall">
          <a-entity
            geometry="primitive: triangle"
            rotation="0 180 0"
            position="0 8.517 0"
            scale="11.44 9.69 0"
            xrextras-hider-material
          ></a-entity>
          <a-entity
            geometry="primitive: triangle"
            rotation="0 180 0"
            position="0 8.517 0.25"
            scale="11.44 9.69 0"
            xrextras-hider-material
          ></a-entity>
        </a-entity>
      </xrextras-opaque-background>

      <!-- Portal Contents -->
      <a-entity id="portal-contents">
        <a-entity
          id="galleryModel"
          gltf-model="/models/vr_gallery.glb"
          position="0 3.561 -15.377"
          scale="3 3 3"
          rotation="0 180 0"
        >
        </a-entity>
        <a-entity
          id="bust"
          gltf-model="/models/zeus_bust.glb"
          position="-0.177 6.006 -15.377"
          rotation="0 90 0"
        >
        </a-entity>
      </a-entity>

      <!-- Portal -->
      <a-entity
        id="portalRim"
        gltf-model="/models/portal.glb"
        position="0 7 11.65"
        rotation="0 0 0"
        scale="0.001 0.001 0.001"
        shadow="receive: false"
      >
      </a-entity>
    </a-scene>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.hidden {
  display: none !important;
}
#ar-div {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.absolute-fill {
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  pointer-events: none;
}

#promptText {
  font-family: 'Plain';
  font-size: 14px;
  text-align: center;
  color: white;

  position: absolute;
  width: 100%;
  bottom: 12vh;
  left: 50%;
  transform: translate(-50%, 0);
}

/* Animations */
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.fly-in {
  animation: fly-in 1.5s ease-out both;
}
@keyframes fly-in {
  0% {
    transform: translate(-100%, 0%);
    opacity: 0;
  }
  70% {
    opacity: 1;
  }
  100% {
    transform: translate(-50%, 0%);
    opacity: 1;
  }
}
.fly-out {
  animation: fly-out 1.5s ease-out both;
}
@keyframes fly-out {
  0% {
    transform: translate(-50%, 0%);
    opacity: 1;
  }
  70% {
    opacity: 0;
  }
  100% {
    transform: translate(0%, 0%);
    opacity: 0;
  }
}
</style>
