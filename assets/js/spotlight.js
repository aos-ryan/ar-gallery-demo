const spotlight = {
  init: function () {
    const model = this.el
    const parent = this.el.parentNode
    const raycastMarker = parent.querySelector('.bustMarker')
    console.log(raycastMarker)

    // create the spotlight and point it at the entity
    const spotlight = document.createElement('a-light')
    spotlight.setAttribute('type', 'spot')
    spotlight.setAttribute('target', `#${model.id}`)
    spotlight.setAttribute('angle', '30')
    spotlight.setAttribute('intensity', '0')
    spotlight.setAttribute('position', '5 10 0')
    spotlight.setAttribute(`animation__${model.id}lightup`, {
      property: 'intensity',
      to: '1',
      dur: 500,
      startEvents: 'raycasterIntersectingTarget',
    })
    spotlight.setAttribute(`animation__${model.id}lightoff`, {
      property: 'intensity',
      to: '0',
      dur: 500,
      startEvents: 'raycasterLeftIntersectingTarget',
    })
    // add spotlight to the scene
    parent.appendChild(spotlight)

    // add an event listener to the bust element that looks for a raycaster intersection and turns on spotlight
    raycastMarker.addEventListener('raycaster-intersected', () => {
      spotlight.emit('raycasterIntersectingTarget', null, false)
    })
    // add an event listener to the bust element that looks for a raycaster intersection and turns off spotlight
    raycastMarker.addEventListener('raycaster-intersected-cleared', () => {
      spotlight.emit('raycasterLeftIntersectingTarget', null, false)
    })
  },
}
export { spotlight }
