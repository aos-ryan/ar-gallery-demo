const modelClick = {
  dependencies: ['raycaster'],

  init: function () {
    const bust = this.el
    // when the bust is clicked, transition to zoom in view
    bust.addEventListener('click', () => {
      console.log('entity is clicked')
      // fade the bg
      document.dispatchEvent(new Event('bg-fade'))
      // remove model from the scene
      bust.parentNode.removeChild(bust)
      // add the model as a child of the camera w/ rotate ability
      const camera = this.el.sceneEl.querySelector('#camera')
      const zoomBust = document.createElement('a-entity')
      zoomBust.id = 'zoomBust'
      zoomBust.setAttribute('class', 'cantap')
      zoomBust.setAttribute('gltf-model', '/models/zeus_bust.glb')
      zoomBust.setAttribute('scale', '0.1 0.1 0.1')
      zoomBust.setAttribute('rotation', '0 90 0')
      zoomBust.setAttribute('position', '0 -0.1 -0.4')
      zoomBust.setAttribute(
        'animation',
        'property: rotation; to: 0 450 0; loop: true; dur: 10000; easing: linear'
      )

      camera.appendChild(zoomBust)
    })
  },
}
export { modelClick }
