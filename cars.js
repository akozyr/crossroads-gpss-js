function generateRoadRoutes(svg, ns)
{
  var roadRoutesData = [
    // from top to left
    'M' + 0 + ',' + 0 + 'V' + grassHeight  + 'q' + 0 + ',' + roadWidth / 4 + ',' + (-roadWidth / 4) + ',' + roadWidth / 4 + 'h' + (-grassWidth),
    // from top to bottom
    'M' + 0 + ',' + 0 + 'V' + svgHeight,
    // from top to right
    'M' + 0 + ',' + 0 + 'V' + (grassHeight + roadWidth / 2) + 'q' + 0 + ',' + roadWidth / 4 + ',' + roadWidth / 4 + ',' + roadWidth / 4 + 'h' + (roadWidth / 2 + grassWidth),
    // from right to top
    'M' + 0 + ',' + 0 + 'h' + (-grassWidth) + 'q' + (-roadWidth / 4) + ',' + 0 + ',' + (-roadWidth / 4) + ',' + (-roadWidth / 4) + 'v' + (-grassHeight),
    // from right to
    'M' + 0 + ',' + 0 + 'H' + (-svgWidth),
    // from right to bottom
    'M' + 0 + ',' + 0 + 'h' + (-grassWidth - roadWidth / 2) + 'q' + (-roadWidth / 4) + ',' + 0 + ',' + (-roadWidth / 4) + ',' + roadWidth / 4  + 'v' + (roadWidth / 2 + grassHeight),
    // from bottom to right
    'M' + 0 + ',' + 0 + 'v' + (-grassHeight) + 'q' + 0 + ',' + (-roadWidth / 4) + ',' + roadWidth / 4 + ',' + (-roadWidth / 4)  + 'h' + grassWidth,
    // from bottom to top
    'M' + 0 + ',' + 0 + 'v' + (-svgHeight),
    // from bottom to left
    'M' + 0 + ',' + 0 + 'v' + (-grassHeight - roadWidth / 2) + 'q' + 0 + ',' + (-roadWidth / 4) + ',' + (-roadWidth / 4) + ',' + (-roadWidth / 4) + 'h' + (-roadWidth / 2 - grassWidth),
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
    roadRoutes.push({
      length: pathElement.getTotalLength(),
      path: pathElement
    })
  }

  return roadRoutes
}

function Car()
{
  const radius = 15
  const carColor = ['blue', 'fuchsia', 'gold', 'greenyellow']
  const duration = 100

  this.startX = 0
  this.startY = 0
  this.roadDirection = null
  this.currentTime = 0
  this.deltaTime = 1 / duration
  this.route = null
  this.svgElement = null
  this.carId = 0

  this.init = (partOfCrossroads, route, carId) => {
    switch (partOfCrossroads) {
      case 'top':
        this.startX = grassWidth + roadWidth / 4
        this.startY = 0
        this.roadDirection = 0
        break
      case 'right':
        this.startX = svgWidth
        this.startY = grassHeight + roadWidth / 4
        this.roadDirection = 1
        break
      case 'bottom':
        this.startX = grassWidth + roadWidth * 0.75
        this.startY = svgHeight
        this.roadDirection = 2
        break
      case 'left':
        this.startX = 0
        this.startY = grassHeight + roadWidth * 0.75
        this.roadDirection = 3
        break
    }

    this.route = route
    this.carId = carId
  }

  this.draw = (svg, ns) => {
    var car = document.createElementNS(ns, 'circle')

    car.setAttribute('cx', this.startX)
    car.setAttribute('cy', this.startY)
    car.setAttribute('r', radius)
    car.setAttribute('fill', carColor[this.roadDirection])
    car.setAttribute('id', 'car_' + this.carId)

    car.transform.baseVal.appendItem(svg.createSVGTransform())

    svg.append(car)
    this.svgElement = car
  }

  this.move = (point) => {
    this.svgElement.transform.baseVal.getItem(0).setTranslate(point.x, point.y)
    this.currentTime += this.deltaTime
  }

  this.destroy = () => {
    document.getElementById('car_' + this.carId).remove()
  }
}

function generateCar(svg, ns, carId)
{
  var car = new Car()
  var carTypeLabels = ['top', 'right', 'bottom', 'left']
  var carType = [1, 3][getRandomInt(0, 2)]// getRandomInt(0, 4)
  var carTypeLabel = carTypeLabels[carType]
  var route = carType * 3 + getRandomInt(0, 3)

  car.init(carTypeLabel, route, carId)
  car.draw(svg, ns)

  activeCars.push(car)
}

function getRandomInt(min, max)
{
  return Math.floor(Math.random() * (max - min)) + min
}
