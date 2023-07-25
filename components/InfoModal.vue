<template>
  <div id="info-modal">
    <div id="close-modal" class="close">&times;</div>
    <div class="modal-body">
      <img class="aos-logo" src="/textures/aos-logo.png" />
      Array of Stars creates enhanced experiences built for attention across
      virtual, digital, and physical realities.
      <a href="https://www.arrayofstars.com" class="cta"> Learn More </a>
    </div>
  </div>
</template>
<script></script>
<style scoped>
#info-modal {
  display: none;
  z-index: 999;
  background-color: #000000;
  position: relative;
  margin: 40% auto;
  width: 80%;
  opacity: 0;
  padding-left: 5%;
  padding-right: 5%;
  border-radius: 5px;
  pointer-events: auto;
  animation: fade-in 250ms linear 1 forwards;
}

.modal-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 15%;
  user-select: none;
  opacity: 0;
  font-family: 'Plain';
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  text-align: center;
  color: #ffffff;
  animation: fade-in 250ms linear 500ms 1 forwards;
}
.cta {
  background-color: #ffffff;
  color: #000000;
  font-family: 'Monument Extended';
  font-size: 14px;
  text-transform: uppercase;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 20px;
  opacity: 0;
  margin-top: 10%;
  margin-bottom: 10%;
  animation: fade-in 250ms linear 1000ms 1 forwards;
}
.close {
  position: absolute;
  top: 8px;
  right: 16px;
  font-size: 34px;
  color: #ffffff;
}

.aos-logo {
  width: 36px;
  height: 31px;
  margin-bottom: 5%;
  opacity: 0;
  animation: fade-in 250ms linear 250ms 1 forwards;
}
</style>
