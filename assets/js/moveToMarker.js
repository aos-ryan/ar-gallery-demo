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

    const secondClickEvent = (e) => {
      // turn off the info modal
      document.dispatchEvent(new Event('bg-fade'))
      // let the logic know the bust is not zoomed
      this.bustZoomed = !this.bustZoomed
      // return bust to the pedestal
      this.bust.setAttribute('position', '-0.177 6.006 -14.681')
      // remove rotate ability
      this.bust.removeAttribute('rotate')
      // re add the first click event so it can be run again
      this.bust.addEventListener('click', firstClickEvent)
      // remove event listener
      this.bust.removeEventListener('click', secondClickEvent)
    }

    const firstClickEvent = (e) => {
      document.dispatchEvent(new Event('bg-fade'))
      this.bustZoomed = !this.bustZoomed

      // get world position of marker
      const realWorldPosition = new THREE.Vector3()
      this.marker.object3D.getWorldPosition(realWorldPosition)
      //
      this.bust.setAttribute(
        'animation',
        `property: position; to: ${realWorldPosition.x}, ${realWorldPosition.y}, ${realWorldPosition.z}; dur:1000; easing: easeInQuad `
      )
      this.bust.setAttribute('rotate', '')

      // remove the event after the first time the model is clicked
      this.bust.removeEventListener('click', firstClickEvent)
      // add the second click event which handles placing the modal back on the pedestal
      this.bust.addEventListener('click', secondClickEvent)
    }

    // when the bust is clicked, run the first place event
    this.bust.addEventListener('click', firstClickEvent)
  },
  tick() {
    // if (this.bustZoomed) {
    //   // get world position of marker
    //   const realWorldPosition = new THREE.Vector3()
    //   this.marker.object3D.getWorldPosition(realWorldPosition)
    //   // lerp bust to marker
    //   this.bust.object3D.position.lerp(realWorldPosition, 0.1)
    // }
  },
}
export { moveToMarker }
