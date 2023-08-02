const moveToMarker = {
  schema: {
    modelSrc: { type: 'string', default: '/models/zeus_bust.glb' },
    zoomScale: { type: 'string' },
    defaultRotation: { type: 'string', default: '0 0 0' },
  },
  init() {
    this.bust = this.el
    this.marker = document.querySelector('#zoomMarker')
    this.camera = document.querySelector('#camera')
    this.portalContents = document.querySelector('#portal-contents')
    this.bustZoomed = false

    const secondClickEvent = (e) => {
      // turn off the info modal
      document.dispatchEvent(new Event('bg-fade'))
      // let the logic know the bust is not zoomed
      this.bustZoomed = false
      // remove rotate
      this.bust.removeAttribute('rotate')
      // reattach bust to portal contents
      this.portalContents.object3D.attach(this.bust.object3D)
      // return bust to the pedestal
      this.bust.setAttribute('position', '-0.177 6.006 -14.681')
      this.bust.setAttribute('rotation', this.data.defaultRotation)

      // re add the first click event so it can be run again
      this.bust.addEventListener('click', firstClickEvent)
      // remove event listener
      this.bust.removeEventListener('click', secondClickEvent)
    }

    const firstClickEvent = (e) => {
      document.dispatchEvent(new Event('bg-fade'))
      this.bustZoomed = true
      // add rotate
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
    const distanceFromCamera = 2
    const target = new THREE.Vector3(0, 0, -distanceFromCamera)
    target.applyMatrix4(this.camera.object3D.matrixWorld)

    const distance = Math.round(this.bust.object3D.position.distanceTo(target))
    // console.log(distance)
    if (this.bustZoomed && distance > 0) {
      // lerp bust to target
      this.bust.object3D.position.lerp(target, 0.1)
      // console.log(distance)
      if (distance == 1) {
        this.camera.object3D.attach(this.bust.object3D)
        this.bustZoomed = false
      }
    }
  },
}
export { moveToMarker }
