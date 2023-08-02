const moveToMarker = {
  schema: {
    modelSrc: { type: 'string', default: '/models/zeus_bust.glb' },
    zoomScale: { type: 'string' },
    rotation: { type: 'string', default: '0 0 0' },
  },
  init() {
    this.bust = this.el
    this.marker = document.querySelector('#zoomMarker')
    this.camera = document.querySelector('#camera')
    this.bustZoomed = false

    // setup animation complete event listener on the model
    this.bust.addEventListener('animationcomplete', () => {
      this.bustZoomed = true
    })

    const secondClickEvent = (e) => {
      // turn off the info modal
      document.dispatchEvent(new Event('bg-fade'))
      // let the logic know the bust is not zoomed
      this.bustZoomed = false
      // return bust to the pedestal
      this.bust.setAttribute('position', '-0.177 6.006 -14.681')

      // re add the first click event so it can be run again
      this.bust.addEventListener('click', firstClickEvent)
      // remove event listener
      this.bust.removeEventListener('click', secondClickEvent)
    }

    const firstClickEvent = (e) => {
      document.dispatchEvent(new Event('bg-fade'))

      // get world position of marker
      const realWorldPosition = new THREE.Vector3()
      this.marker.object3D.getWorldPosition(realWorldPosition)
      //
      this.bust.setAttribute(
        'animation',
        `property: position; to: ${realWorldPosition.x}, ${realWorldPosition.y}, ${realWorldPosition.z}; dur:300; easing: linear `
      )

      // remove the event after the first time the model is clicked
      this.bust.removeEventListener('click', firstClickEvent)
      // add the second click event which handles placing the modal back on the pedestal
      this.bust.addEventListener('click', secondClickEvent)
    }

    // when the bust is clicked, run the first place event
    this.bust.addEventListener('click', firstClickEvent)
  },
  tick() {
    if (this.bustZoomed) {
      // get world position of marker
      const realWorldPosition = new THREE.Vector3()
      this.marker.object3D.getWorldPosition(realWorldPosition)
      // track bust to marker
      this.bust.setAttribute(
        'position',
        `${realWorldPosition.x}, ${realWorldPosition.y}, ${realWorldPosition.z} `
      )
    }
  },
}
export { moveToMarker }
