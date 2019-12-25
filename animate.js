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

  activeCars.forEach((car) => {
    const currentCarClientRect = car.svgElement.getBoundingClientRect()

    const absoluleCoordX = currentCarClientRect.left + currentCarClientRect.width / 2 - SVG_LEFT
    const absoluleCoordY = currentCarClientRect.top + currentCarClientRect.height / 2 - SVG_TOP

    const carInfo = {
      x: absoluleCoordX,
      y: absoluleCoordY,
      route: car.route,
      road_dir: car.roadDirection
    }

    coordsOfActiveCars.push(carInfo)
  })

  activeCars.forEach((car, i) => {
    if (car.currentTime <= 1) {
      // for output parameters
      car.movingTime++
      // remove a certain car from coordsOfActiveCars
      const bufCoordsOfActiveCars = [...coordsOfActiveCars]
      bufCoordsOfActiveCars.splice(i, 1)

      const roadRoute = roadRoutes[car.route]
      const point = roadRoute.path.getPointAtLength(car.currentTime * roadRoute.length)

      const xDirectionSign = Math.sign(Math.round(point.x))
      const yDirectionSign = Math.sign(Math.round(point.y))

      const currentCarClientRect = car.svgElement.getBoundingClientRect()

      const absoluleCoordX = currentCarClientRect.left + currentCarClientRect.width / 2 - SVG_LEFT
      const absoluleCoordY = currentCarClientRect.top + currentCarClientRect.height / 2 - SVG_TOP

      if (car.roadDirection === ROAD_DIRECTIONS.RIGHT || car.roadDirection === ROAD_DIRECTIONS.LEFT) {
        let isTrafficAllowed = true

        if (trafficLight.horizontalColor === TRAFFIC_LIGHT_COLORS.RED && (Math.abs(point.x) > grassWidth * 0.9) && Math.abs(point.x) < grassWidth) {
          isTrafficAllowed = false
        }

        bufCoordsOfActiveCars.forEach((carInfo) => {
          const distance = Math.sqrt(Math.pow(absoluleCoordX - carInfo.x, 2)
            + Math.pow(absoluleCoordY - carInfo.y, 2))

          const checkXNeighbor = xDirectionSign > 0 ? (absoluleCoordX < carInfo.x) : (absoluleCoordX > carInfo.x)
          const checkYNeighbor = yDirectionSign > 0 ? (absoluleCoordY < carInfo.y) : (absoluleCoordY > carInfo.y)

          if (distance < 40) {
            if (
              (
                ROAD_DIRECTIONS.LEFT === carInfo.road_dir
                &&
                5 == car.route
                &&
                car.absoluleCoordY < SVG_HEIGHT / 2
              )
              ||
              (
                ROAD_DIRECTIONS.RIGHT == carInfo.road_dir
                &&
                9 == car.route
                &&
                car.absoluleCoordY > SVG_HEIGHT / 2
              )
            ) {
              isTrafficAllowed = false
              return
            } else if (
              (
                ROAD_DIRECTIONS.LEFT == car.roadDirection
                &&
                5 == carInfo.route
              )
              ||
              (
                ROAD_DIRECTIONS.RIGHT == car.roadDirection
                &&
                9 == carInfo.route
              )
            ) {
              // move car
            } else if (xDirectionSign != 0 && yDirectionSign != 0) {
              if (checkXNeighbor || checkYNeighbor) {
                isTrafficAllowed = false
                return
              }
            } else if (xDirectionSign != 0) {
              if (checkXNeighbor) {
                isTrafficAllowed = false
                return
              }
            } else if (yDirectionSign != 0) {
              if (checkYNeighbor) {
                isTrafficAllowed = false
                return
              }
            }
          }
        })

        if (isTrafficAllowed) {
          car.move(point)
        }
      }

      if (car.roadDirection === ROAD_DIRECTIONS.TOP || car.roadDirection === ROAD_DIRECTIONS.BOTTOM) {
        let isTrafficAllowed = true

        if (trafficLight.verticalColor === TRAFFIC_LIGHT_COLORS.RED && (Math.abs(point.y) > grassHeight * 0.9) && Math.abs(point.y) < grassHeight) {
          isTrafficAllowed = false
        }

        bufCoordsOfActiveCars.forEach((carInfo) => {
          const distance = Math.sqrt(Math.pow(absoluleCoordX - carInfo.x, 2)
            + Math.pow(absoluleCoordY - carInfo.y, 2))

          var checkXNeighbor = xDirectionSign > 0 ? (absoluleCoordX < carInfo.x) : (absoluleCoordX > carInfo.x)
          var checkYNeighbor = yDirectionSign > 0 ? (absoluleCoordY < carInfo.y) : (absoluleCoordY > carInfo.y)

          if (distance < 40) {
            if (
              (
                ROAD_DIRECTIONS.TOP == carInfo.road_dir
                &&
                8 == car.route
                &&
                car.absoluleCoordX >= SVG_WIDTH / 2
              )
              ||
              (
                ROAD_DIRECTIONS.BOTTOM == carInfo.road_dir
                &&
                2 == car.route
                &&
                car.absoluleCoordX <= SVG_WIDTH / 2
              )
            ) {
              isTrafficAllowed = false
              return
            } else if (
              (
                ROAD_DIRECTIONS.TOP == car.roadDirection
                &&
                8 == carInfo.route
              )
              ||
              (
                ROAD_DIRECTIONS.BOTTOM == car.roadDirection
                &&
                2 == carInfo.route
              )
            ) {
              // move car
            } else if (xDirectionSign != 0 && yDirectionSign != 0) {
              if (checkXNeighbor || checkYNeighbor) {
                isTrafficAllowed = false
                return
              }
            } else if (xDirectionSign != 0) {
              if (checkXNeighbor) {
                isTrafficAllowed = false
                return
              }
            } else if (yDirectionSign != 0) {
              if (checkYNeighbor) {
                isTrafficAllowed = false
                return
              }
            }
          }
        })

        if (isTrafficAllowed) {
          car.move(point)
        }
      }
    } else {
      car.destroy()
      metrics.setCarTime(car.movingTime)
      metrics.setRouteTime(car.route, car.movingTime)
      activeCars.splice(i, 1)
    }
  })

  requestAnimationFrameID = requestAnimationFrame(step)
}
