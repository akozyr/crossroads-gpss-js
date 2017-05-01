function generateRoadRoutes(svg, ns)
{
  var roadRoutesData = [
    // from left to top
    'M' + 0 + ',' + 0 + 'H' + (grassWidth + roadWidth / 2) + 'q' + roadWidth / 4 + ',' + 0 + ',' + roadWidth / 4 + ',' + (-roadWidth / 4) + 'v' + (-(grassHeight + roadWidth / 2)),
    // form left to right
    'M' + 0 + ',' + 0 + 'H' + svgWidth,
    // from left to bottom
    'M' + 0 + ',' + 0 + 'H' + grassWidth + 'q' + roadWidth / 4 + ',' + 0 + ',' + roadWidth / 4 + ',' + roadWidth / 4 + 'v' + grassHeight
  ]

  var roadRoutes = []
  var pathElement = null
  for (var i = 0; i < roadRoutesData.length; i++) {
    pathElement = document.createElementNS(ns, 'path')

    pathElement.setAttribute('d', roadRoutesData[i])
    pathElement.setAttribute('fill', 'none')
    // pathElement.setAttribute('stroke', 'red')
    // pathElement.setAttribute('stroke-width', 3)

    svg.append(pathElement)
    roadRoutes.push(pathElement)
  }

  return roadRoutes
}

function Car()
{
  const radius = 15
  const carColor = 'blue'
  const duration = 100

  this.startX = 0
  this.startY = 0
  this.currentTime = 0
  this.deltaTime = 1 / duration
  this.route = null
  this.svgElement = null

  this.init = (partOfCrossroads) => {
    var typeRoad = null
    switch (partOfCrossroads) {
      case 'top':
        this.startX = 0
        this.startY = 0
        typeRoad = 0
        break
      case 'right':
        this.startX = 0
        this.startY = 0
        typeRoad = 1
        break
      case 'bottom':
        this.startX = 0
        this.startY = 0
        typeRoad = 2
        break
      case 'left':
        this.startX = 0
        this.startY = grassHeight + roadWidth * 0.75
        typeRoad = 4
        break
    }

    this.route = 2
  }

  this.draw = (svg, ns) => {
    var car = document.createElementNS(ns, 'circle')

    car.setAttribute('cx', this.startX)
    car.setAttribute('cy', this.startY)
    car.setAttribute('r', radius)
    car.setAttribute('fill', carColor)

    car.transform.baseVal.appendItem(svg.createSVGTransform())

    svg.append(car)
    this.svgElement = car
  }
}
