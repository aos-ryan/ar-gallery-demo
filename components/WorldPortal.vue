<template>
  <div id="ar-div" class="cantap">
    <!-- UI -->
    <div id="overlay" class="absolute-fill">
      <span id="promptText"></span>
    </div>
    <!-- Info Modal -->
    <InfoModal
      v-if="bgFade"
      :modelData="modelData"
      :currentModelIndex="currentModelIndex"
      @modelChange="handleModelChange"
    />

    <!-- Scene -->
    <a-scene
      light="defaultLightsEnabled: false"
      xrweb="allowedDevices: any; disableDefaultEnvironment: false; disableWorldTracking:false"
      xrextras-runtime-error
      renderer="colorManagement: true;"
      tap-to-place-portal
      prompt-flow
      stats
    >
      <!-- stats -->
      <!-- Assets -->
      <a-assets>
        <img id="brick" src="/textures/brickwall.jpg" />
      </a-assets>

      <!-- Camera -->
      <a-camera id="camera" position="0 9 9" portal-camera>
        <a-entity raycaster="objects: .bustMarker; far: 25"> </a-entity>
        <a-entity
          cursor="fuse: false; rayOrigin: mouse;"
          raycaster="objects: .cantap"
        ></a-entity>

        <!-- Plane that blocks the scene -->
        <!-- <a-plane
          v-if="bgFade"
          height="1"
          width="1"
          position="0 0 -3"
          material="shader: flat; transparent: true; opacity: 1"
          fit
          ></a-plane> -->
      </a-camera>

      <!-- Hider walls -->
      <xrextras-opaque-background remove="true">
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
          id="room"
          geometry="primitive: box"
          material="src: #brick; side: back"
          scale="50 50 50"
          position="-0.177 25.25 -25.22"
        >
        </a-entity>
        <!-- entity bust example -->
        <!-- <a-entity
        id="zeus-bust"
        class="cantap"
        :gltf-model="`${this.modelData[currentModelIndex].src}`"
        :rotation="`${this.modelData[currentModelIndex].rotation}`"
        :scale="`${this.modelData[currentModelIndex].scale}`"
        position="0 4 0"
        >
      </a-entity> -->

        <a-entity
          id="pedestal-one"
          geometry="primitive: box; width: 3; height: 8; depth: 3"
          position="-22 1 -10"
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
            id="zeus"
            class="cantap"
            :gltf-model="`${this.modelData[1].src}`"
            :rotation="`${this.modelData[1].rotation}`"
            :scale="`${this.modelData[1].scale}`"
            position="0 4 0"
            :move-to-marker="`defaultRotation: ${this.modelData[1].rotation}`"
            spotlight
          >
          </a-entity>
        </a-entity>

        <a-entity
          id="pedestal-two"
          geometry="primitive: box; width: 3; height: 8; depth: 3"
          position="-22 1 -20"
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
            id="lady"
            class="cantap"
            :gltf-model="`${this.modelData[1].src}`"
            :rotation="`${this.modelData[1].rotation}`"
            :scale="`${this.modelData[1].scale}`"
            position="0 4 0"
            :move-to-marker="`defaultRotation: ${this.modelData[1].rotation}`"
            spotlight
          >
          </a-entity>
        </a-entity>
      </a-entity>

      <!-- Portal -->
      <a-entity
        id="portalRim"
        gltf-model="/models/portal.glb"
        position="0 7 11.65"
        rotation="0 0 0"
        scale="0.001 0.001 0.001"
      >
      </a-entity>
    </a-scene>
  </div>
</template>

<script>
import InfoModal from './InfoModal.vue'
export default {
  data() {
    return {
      bgFade: false,
      currentModelIndex: 0,
      modelData: [
        // {
        //   src: '/models/zeus_small.glb',
        //   info: 'Zeus is the sky and thunder god in ancient Greek religion, who rules asking of the gods on Mount Olympus.',
        //   rotation: '0 -90 0',
        //   scale: '0.05 0.05 0.05',
        //   zoomScale: '0.01 0.01 0.01',
        // },
        {
          src: '/models/zeus_bust.glb',
          info: 'Zeus is the sky and thunder god in ancient Greek religion, who rules asking of the gods on Mount Olympus.',
          rotation: '0 -180 0',
          scale: '1 1 1',
          zoomScale: '0.5 0.5 0.5',
        },
        {
          src: '/models/lady_bust.glb',
          info: 'The bust portrays a lady of the Spanish high society of 1909.',
          rotation: '0 90 0',
          scale: '5 5 5',
          zoomScale: '0.5 0.5 0.5',
        },
      ],
    }
  },
  methods: {
    doBgFade() {
      this.bgFade = !this.bgFade
    },
    handleModelChange() {
      // update the model index
      if (this.currentModelIndex < this.modelData.length - 1) {
        this.currentModelIndex += 1
      } else {
        this.currentModelIndex = 0
      }
      // force an update of the zoomBust model,
      const bust = document.querySelector('#bust')
      bust.setAttribute(
        'gltf-model',
        `${this.modelData[this.currentModelIndex].src}`
      )
      // include proper scale
      bust.setAttribute(
        'scale',
        `${this.modelData[this.currentModelIndex].zoomScale}`
      )
      // include proper rotation
      bust.setAttribute(
        'rotation',
        `${this.modelData[this.currentModelIndex].rotation}`
      )
    },
  },
  created() {
    document.addEventListener('bg-fade', this.doBgFade)
  },
}
</script>

<style scoped>
#ar-div {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
#bg-fade {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 6;
  background-color: white;
  opacity: 0.8;
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
