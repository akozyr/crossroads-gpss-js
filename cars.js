const CAR_RADIUS = 15
const CAR_COLORS = ['blue', 'fuchsia', 'gold', 'greenyellow']
const CAR_DURATION = 100
const ROAD_DIRECTIONS = {
  TOP: 0,
  RIGHT: 1,
  BOTTOM: 2,
  LEFT: 3,
}
const CAR_SETTINGS = {
  [ROAD_DIRECTIONS.TOP]: {
    startX: grassWidth + ROAD_WIDTH / 4,
    startY: 0
  },
  [ROAD_DIRECTIONS.RIGHT]: {
    startX: SVG_WIDTH,
    startY: grassHeight + ROAD_WIDTH / 4
  },
  [ROAD_DIRECTIONS.BOTTOM]: {
    startX: grassWidth + ROAD_WIDTH * 0.75,
    startY: SVG_HEIGHT
  },
  [ROAD_DIRECTIONS.LEFT]: {
    startX: 0,
    startY: grassHeight + ROAD_WIDTH * 0.75
  }
}

function generateRoadRoutes(svg, ns)
{
  const quarterOfRoadWidth = ROAD_WIDTH / 4;

  const roadRoutesData = [
    // from top to left
    `M0,0V${grassHeight}q0,${quarterOfRoadWidth},${-quarterOfRoadWidth},${quarterOfRoadWidth}h${-grassWidth}`,
    // from top to bottom
    `M0,0V${SVG_HEIGHT}`,
    // from top to right
    `M0,0V${grassHeight + ROAD_WIDTH / 2}q0,${quarterOfRoadWidth},${quarterOfRoadWidth},${quarterOfRoadWidth}h${ROAD_WIDTH / 2 + grassWidth}`,
    // from right to top
    `M0,0h${-grassWidth}q${-quarterOfRoadWidth},0,${-quarterOfRoadWidth},${-quarterOfRoadWidth}v${-grassHeight}`,
    // from right to
    `M0,0H${-SVG_WIDTH}`,
    // from right to bottom
    `M0,0h${-grassWidth - ROAD_WIDTH / 2}q${-quarterOfRoadWidth},0,${-quarterOfRoadWidth},${quarterOfRoadWidth}v${ROAD_WIDTH / 2 + grassHeight}`,
    // from bottom to right
    `M0,0v${-grassHeight}q0,${-quarterOfRoadWidth},${quarterOfRoadWidth},${-quarterOfRoadWidth}h${grassWidth}`,
    // from bottom to top
    `M0,0v${-SVG_HEIGHT}`,
    // from bottom to left
    `M0,0v${-grassHeight - ROAD_WIDTH / 2}q0,${-quarterOfRoadWidth},${-quarterOfRoadWidth},${-quarterOfRoadWidth}h${-ROAD_WIDTH / 2 - grassWidth}`,
    // from left to top
    `M0,0H${grassWidth + ROAD_WIDTH / 2}q${quarterOfRoadWidth},0,${quarterOfRoadWidth},${-quarterOfRoadWidth}v${-(grassHeight + ROAD_WIDTH / 2)}`,
    // form left to right
    `M0,0H${SVG_WIDTH}`,
    // from left to bottom
    `M0,0H${grassWidth}q${quarterOfRoadWidth},0,${quarterOfRoadWidth},${quarterOfRoadWidth}v${grassHeight}`
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

class Car {
  constructor(roadDirection, route, carId) {
    const { startX, startY } = CAR_SETTINGS[roadDirection]

    this.startX = startX
    this.startY = startY
    this.roadDirection = roadDirection

    this.route = route
    this.carId = carId

    this.currentTime = 0
    this.deltaTime = 1 / CAR_DURATION
    this.svgElement = null

    // it's used for processing of output parameters
    this.movingTime = 0
  }

  draw(svg, ns) {
    const car = document.createElementNS(ns, 'circle')

    car.setAttribute('cx', this.startX)
    car.setAttribute('cy', this.startY)
    car.setAttribute('r', CAR_RADIUS)
    car.setAttribute('fill', CAR_COLORS[this.roadDirection])
    car.setAttribute('id', 'car_' + this.carId)

    car.transform.baseVal.appendItem(svg.createSVGTransform())

    svg.append(car)

    this.svgElement = car
  }

  move(point) {
    this.svgElement.transform.baseVal.getItem(0).setTranslate(point.x, point.y)
    this.currentTime += this.deltaTime
  }

  destroy() {
    document.getElementById('car_' + this.carId).remove()
  }
}

function generateCar(svg, ns, carId)
{
  const roadDirection = /*[0, 2][_getRandomInt(0, 2)]*/_getRandomInt(0, 4)
  const route = roadDirection * 3 + _getRandomInt(0, 3)

  const car = new Car(roadDirection, route, carId)

  car.draw(svg, ns)

  metrics.addElementToRoute(route)

  activeCars.push(car)
}

function _getRandomInt(min, max)
{
  return Math.floor(Math.random() * (max - min)) + min
}
