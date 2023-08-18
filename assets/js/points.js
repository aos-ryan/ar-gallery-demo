const points = {
  // this component is added to the "points group" entity
  schema: {},
  init() {
    this.sizes = { width: window.innerWidth, height: window.innerHeight }
    this.children = this.el.childNodes
    this.perspectiveCamera =
      document.getElementById('camera').object3D.children[2]
    // console.log(this.perspectiveCamera)
  },
  tick() {
    // children is a list of a-entities, one for each point of interest for each model
    // each a-entity has a child div which is the html point element, which in turn has a two children (label and text)
    // use a raycaster to make sure each html point element is updated to reflect the position of its parent a-entity
    for (const entity of this.children) {
      const htmlPoint = entity.querySelector('.point')

      // get the world position of the point
      let screenPosition = new THREE.Vector3()
      entity.object3D.getWorldPosition(screenPosition)

      // get the 2D screen position of the 3D scene position of the point
      screenPosition.project(this.perspectiveCamera)

      // ensure point is tied correctly to its 3D position
      const translateX = screenPosition.x * this.sizes.width * 0.5
      const translateY = -screenPosition.y * this.sizes.height * 0.5
      htmlPoint.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`
    }
  },
}
export { points }
