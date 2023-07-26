<template>
  <div id="info-modal">
    <div id="close-modal" class="close">&times;</div>
    <div class="modal-body">
      Zeus is the sky and thunder god in ancient Greek religion, who rules as
      king of the gods on Mount Olympus.
    </div>
  </div>
</template>
<script></script>
<style scoped>
#info-modal {
  z-index: 999;
  background-color: #000000;
  position: absolute;
  width: 100%;
  top: 90%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0% 5%;
  border-radius: 5px;
  pointer-events: auto;
}

.modal-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5vh 5vw;
  user-select: none;
  font-family: 'Plain';
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  text-align: center;
  color: #ffffff;
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
  margin-top: 10%;
  margin-bottom: 10%;
}
.close {
  position: absolute;
  top: 8px;
  right: 7%;
  font-size: 34px;
  color: #ffffff;
}
</style>
