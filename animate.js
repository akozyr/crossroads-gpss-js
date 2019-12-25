function step()
{
  if (isAnimationStarted && activeCars.length === 0) {
    trafficLight.stop()
    stopAnimation()
    isAnimationStarted = false

    metrics.fillOutForm()

    return
  }

  metrics.increaseTotalTime()

  runOnStep()
}

function runOnStep()
{
  const carsInfo = []

  activeCars = activeCars.filter((car) => {
    if (car.currentTime <= 1) {
      return true
    }

    car.destroy()
    metrics.setCarTime(car.movingTime)
    metrics.setRouteTime(car.route, car.movingTime)

    return false
  })

  // count all cars parameters
  activeCars.forEach((car) => {
    const carClientRect = car.svgElement.getBoundingClientRect()

    const x = carClientRect.left + carClientRect.width / 2 - SVG_LEFT
    const y = carClientRect.top + carClientRect.height / 2 - SVG_TOP

    const roadRoute = roadRoutes[car.route]
    const currentPoint = roadRoute.path.getPointAtLength(car.currentTime * roadRoute.length)

    const signX = Math.sign(Math.round(currentPoint.x))
    const signY = Math.sign(Math.round(currentPoint.y))

    const carInfo = {
      x,
      y,
      signX,
      signY,
      route: car.route,
      roadDirection: car.roadDirection,
      point: currentPoint
    }

    carsInfo.push(carInfo)
  })

  // check is we can move
  activeCars.forEach((car, currentIndex) => {
    car.movingTime++

    const { x, y, point } = carsInfo[currentIndex]

    const possibleObstacles = carsInfo.filter((carInfo, i) => {
      const distance = Math.sqrt(Math.pow(x - carInfo.x, 2)
        + Math.pow(y - carInfo.y, 2))

      return distance < 40 && i !== currentIndex
    })

    const isMovingAllowed = checkIfMovingAllowed(car, possibleObstacles, carsInfo[currentIndex])

    if (isMovingAllowed) {
      car.move(point)
    }
  })

  requestAnimationFrameID = requestAnimationFrame(step)
}

function checkIfMovingAllowed(car, neighborCars, carInfo) {
  const {
    x,
    y,
    signX,
    signY,
    point
  } = carInfo

  const isHorizontal = isMovingHorizontal(car.roadDirection)
  const type = isHorizontal ? 'h' : 'v'

  let isMovingAllowed = isMovingAllowedByTrafficLight(type, point)

  if (!isMovingAllowed) {
    return isMovingAllowed
  }

  neighborCars.forEach((neighbor) => {
    const checkXNeighbor = signX > 0 ? (x < neighbor.x) : (x > neighbor.x)
    const checkYNeighbor = signY > 0 ? (y < neighbor.y) : (y > neighbor.y)

    if (signX != 0 && signY != 0 && (checkXNeighbor || checkYNeighbor)) {
      isMovingAllowed = false
      return
    }

    if (signX != 0 && checkXNeighbor) {
      isMovingAllowed = false
      return
    }

    if (signY != 0 && checkYNeighbor) {
      isMovingAllowed = false
      return
    }

    let condition1 = (
      ROAD_DIRECTIONS.TOP == neighbor.roadDirection
      &&
      8 == car.route
      &&
      x >= SVG_WIDTH / 2
    )

    let condition2 = (
      ROAD_DIRECTIONS.BOTTOM == neighbor.roadDirection
      &&
      2 == car.route
      &&
      x <= SVG_WIDTH / 2
    )
    if (isHorizontal) {
      condition1 = (
        ROAD_DIRECTIONS.LEFT === neighbor.roadDirection
        &&
        5 == car.route
        &&
        y < SVG_HEIGHT / 2
      )

      condition2 = (
        ROAD_DIRECTIONS.RIGHT == neighbor.roadDirection
        &&
        9 == car.route
        &&
        y > SVG_HEIGHT / 2
      )
    }

    if (condition1 || condition2) {
      isMovingAllowed = false
      return
    }
  })

  return isMovingAllowed;
}

function isMovingHorizontal(roadDirection) {
  return roadDirection === ROAD_DIRECTIONS.RIGHT || roadDirection === ROAD_DIRECTIONS.LEFT
}

function isMovingAllowedByTrafficLight(type, point) {
  let colorType = 'verticalColor'
  let referenceCoord = 'y'
  let crossroadEdge = grassHeight
  if (type === 'h') {
    colorType = 'horizontalColor'
    referenceCoord = 'x'
    crossroadEdge = grassWidth
  }

  const isRed = trafficLight[colorType] === TRAFFIC_LIGHT_COLORS.RED
  const isNearTrafficLight = (Math.abs(point[referenceCoord]) > crossroadEdge * 0.9) && Math.abs(point[referenceCoord]) < crossroadEdge

  return !(isRed && isNearTrafficLight)
}
