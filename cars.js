function generateRoadRoutes(svg, ns)
{
  const quarterOfROAD_WIDTH = ROAD_WIDTH / 4;

  const roadRoutesData = [
    // from top to left
    `M0,0V${grassHeight}q0,${quarterOfROAD_WIDTH},${-quarterOfROAD_WIDTH},${quarterOfROAD_WIDTH}h${-grassWidth}`,
    // from top to bottom
    `M0,0V${SVG_HEIGHT}`,
    // from top to right
    `M0,0V${grassHeight + ROAD_WIDTH / 2}q0,${quarterOfROAD_WIDTH},${quarterOfROAD_WIDTH},${quarterOfROAD_WIDTH}h${ROAD_WIDTH / 2 + grassWidth}`,
    // from right to top
    `M0,0h${-grassWidth}q${-quarterOfROAD_WIDTH},0,${-quarterOfROAD_WIDTH},${-quarterOfROAD_WIDTH}v${-grassHeight}`,
    // from right to
    `M0,0H${-SVG_WIDTH}`,
    // from right to bottom
    `M0,0h${-grassWidth - ROAD_WIDTH / 2}q${-quarterOfROAD_WIDTH},0,${-quarterOfROAD_WIDTH},${quarterOfROAD_WIDTH}v${ROAD_WIDTH / 2 + grassHeight}`,
    // from bottom to right
    `M0,0v${-grassHeight}q0,${-quarterOfROAD_WIDTH},${quarterOfROAD_WIDTH},${-quarterOfROAD_WIDTH}h${grassWidth}`,
    // from bottom to top
    `M0,0v${-SVG_HEIGHT}`,
    // from bottom to left
    `M0,0v${-grassHeight - ROAD_WIDTH / 2}q0,${-quarterOfROAD_WIDTH},${-quarterOfROAD_WIDTH},${-quarterOfROAD_WIDTH}h${-ROAD_WIDTH / 2 - grassWidth}`,
    // from left to top
    `M0,0H${grassWidth + ROAD_WIDTH / 2}q${quarterOfROAD_WIDTH},0,${quarterOfROAD_WIDTH},${-quarterOfROAD_WIDTH}v${-(grassHeight + ROAD_WIDTH / 2)}`,
    // form left to right
    `M0,0H${SVG_WIDTH}`,
    // from left to bottom
    `M0,0H${grassWidth}q${quarterOfROAD_WIDTH},0,${quarterOfROAD_WIDTH},${quarterOfROAD_WIDTH}v${grassHeight}`
  ]

  const roadRoutes = []
  roadRoutesData.forEach((route) => {
    const path = document.createElementNS(ns, 'path')

    path.setAttribute('d', route)
    path.setAttribute('fill', 'none')
    // path.setAttribute('stroke', 'red')
    // path.setAttribute('stroke-width', 3)

    svg.append(path)
    roadRoutes.push({
      length: path.getTotalLength(),
      path
    })
  })

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

  // it's used for processing of output parameters
  this.movingTime = 0

  this.init = (partOfCrossroads, route, carId) => {
    switch (partOfCrossroads) {
      case 'top':
        this.startX = grassWidth + ROAD_WIDTH / 4
        this.startY = 0
        this.roadDirection = 0
        break
      case 'right':
        this.startX = SVG_WIDTH
        this.startY = grassHeight + ROAD_WIDTH / 4
        this.roadDirection = 1
        break
      case 'bottom':
        this.startX = grassWidth + ROAD_WIDTH * 0.75
        this.startY = SVG_HEIGHT
        this.roadDirection = 2
        break
      case 'left':
        this.startX = 0
        this.startY = grassHeight + ROAD_WIDTH * 0.75
        this.roadDirection = 3
        break
    }

    this.route = route
    this.carId = carId
  }

  this.draw = (svg, ns) => {
    const car = document.createElementNS(ns, 'circle')

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
  const car = new Car()
  const carTypeLabels = ['top', 'right', 'bottom', 'left']
  const carType = /*[0, 2][getRandomInt(0, 2)]*/getRandomInt(0, 4)
  const carTypeLabel = carTypeLabels[carType]
  const route = carType * 3 + getRandomInt(0, 3)

  metrics.addElementToRoute(route)

  car.init(carTypeLabel, route, carId)
  car.draw(svg, ns)

  activeCars.push(car)
}

function getRandomInt(min, max)
{
  return Math.floor(Math.random() * (max - min)) + min
}
