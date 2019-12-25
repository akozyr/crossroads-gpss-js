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
  const coordsOfActiveCars = []

  activeCars = activeCars.filter((car) => {
    if (car.currentTime <= 1) {
      return true
    }

    car.destroy()
    metrics.setCarTime(car.movingTime)
    metrics.setRouteTime(car.route, car.movingTime)

    return false
  })

  activeCars.forEach((car) => {
    const carClientRect = car.svgElement.getBoundingClientRect()

    const absoluleCoordX = carClientRect.left + carClientRect.width / 2 - SVG_LEFT
    const absoluleCoordY = carClientRect.top + carClientRect.height / 2 - SVG_TOP

    const carInfo = {
      x: absoluleCoordX,
      y: absoluleCoordY,
      route: car.route,
      road_dir: car.roadDirection
    }

    coordsOfActiveCars.push(carInfo)
  })

  activeCars.forEach((car, activeCarIndex) => {
    // for output parameters
    car.movingTime++
    // remove a certain car from coordsOfActiveCars
    const bufCoordsOfActiveCars = coordsOfActiveCars.filter((car, i) => i !== activeCarIndex)

    const roadRoute = roadRoutes[car.route]
    const point = roadRoute.path.getPointAtLength(car.currentTime * roadRoute.length)

    const xDirectionSign = Math.sign(Math.round(point.x))
    const yDirectionSign = Math.sign(Math.round(point.y))

    const carClientRect = car.svgElement.getBoundingClientRect()

    const absoluleCoordX = carClientRect.left + carClientRect.width / 2 - SVG_LEFT
    const absoluleCoordY = carClientRect.top + carClientRect.height / 2 - SVG_TOP

    const isMovingAllowed = checkIfMovingAllowed(car, bufCoordsOfActiveCars, {
      absoluleCoordX,
      absoluleCoordY,
      xDirectionSign,
      yDirectionSign,
      point
    })

    if (isMovingAllowed) {
      car.move(point)
    }
  })

  requestAnimationFrameID = requestAnimationFrame(step)
}

function checkIfMovingAllowed(car, neighborCars, options) {
  const {
    absoluleCoordX,
    absoluleCoordY,
    xDirectionSign,
    yDirectionSign,
    point
  } = options

  const isHorizontal = isMovingHorizontal(car.roadDirection)
  const type = isHorizontal ? 'h' : 'v'

  let isMovingAllowed = isMovingAllowedByTrafficLight(type, point)

  if (!isMovingAllowed) {
    return isMovingAllowed
  }

  const possibleObstacles = neighborCars.filter((neighbor) => {
    const distance = Math.sqrt(Math.pow(absoluleCoordX - neighbor.x, 2)
      + Math.pow(absoluleCoordY - neighbor.y, 2))

    return distance < 40
  })

  possibleObstacles.forEach((neighbor) => {
    const checkXNeighbor = xDirectionSign > 0 ? (absoluleCoordX < neighbor.x) : (absoluleCoordX > neighbor.x)
    const checkYNeighbor = yDirectionSign > 0 ? (absoluleCoordY < neighbor.y) : (absoluleCoordY > neighbor.y)

    if (xDirectionSign != 0 && yDirectionSign != 0 && (checkXNeighbor || checkYNeighbor)) {
      isMovingAllowed = false
      return
    }

    if (xDirectionSign != 0 && checkXNeighbor) {
      isMovingAllowed = false
      return
    }

    if (yDirectionSign != 0 && checkYNeighbor) {
      isMovingAllowed = false
      return
    }

    let condition1 = (
      ROAD_DIRECTIONS.TOP == neighbor.road_dir
      &&
      8 == car.route
      &&
      car.absoluleCoordX >= SVG_WIDTH / 2
    )

    let condition2 = (
      ROAD_DIRECTIONS.BOTTOM == neighbor.road_dir
      &&
      2 == car.route
      &&
      car.absoluleCoordX <= SVG_WIDTH / 2
    )
    if (isHorizontal) {
      condition1 = (
        ROAD_DIRECTIONS.LEFT === neighbor.road_dir
        &&
        5 == car.route
        &&
        car.absoluleCoordY < SVG_HEIGHT / 2
      )

      condition2 = (
        ROAD_DIRECTIONS.RIGHT == neighbor.road_dir
        &&
        9 == car.route
        &&
        car.absoluleCoordY > SVG_HEIGHT / 2
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
