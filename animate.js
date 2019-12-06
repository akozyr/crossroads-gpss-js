function step()
{
  if (isAnimationStarted && activeCars.length == 0) {
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
  var coordsOfActiveCars = []

  for (var i = 0; i < activeCars.length; i++) {
    var currentCar = activeCars[i]
    var currentCarClientRect = currentCar.svgElement.getBoundingClientRect()

    var absoluleCoordX = currentCarClientRect.left + currentCarClientRect.width / 2 - SVG_LEFT
    var absoluleCoordY = currentCarClientRect.top + currentCarClientRect.height / 2 - SVG_TOP

    var point = roadRoutes[currentCar.route]
        .path.getPointAtLength(currentCar.currentTime * roadRoutes[currentCar.route].length)

    var xDirectionSign = Math.sign(Math.round(point.x))
    var yDirectionSign = Math.sign(Math.round(point.y))

    coordsOfActiveCars.push({
      x: absoluleCoordX,
      y: absoluleCoordY,
      route: activeCars[i].route,
      road_dir: activeCars[i].roadDirection
    })
  }

  for (var i = 0; i < activeCars.length; i++) {
    var currentCar = activeCars[i]

    if (currentCar.currentTime <= 1) {
      // for output parameters
      currentCar.movingTime++
      // remove a certain car from coordsOfActiveCars
      var bufCoordsOfActiveCars = coordsOfActiveCars.slice()
      bufCoordsOfActiveCars.splice(i, 1)

      var point = roadRoutes[currentCar.route]
        .path.getPointAtLength(currentCar.currentTime * roadRoutes[currentCar.route].length)

      var xDirectionSign = Math.sign(Math.round(point.x))
      var yDirectionSign = Math.sign(Math.round(point.y))

      var currentCarClientRect = currentCar.svgElement.getBoundingClientRect()

      var absoluleCoordX = currentCarClientRect.left + currentCarClientRect.width / 2 - SVG_LEFT
      var absoluleCoordY = currentCarClientRect.top + currentCarClientRect.height / 2 - SVG_TOP

      if (currentCar.roadDirection == 1 || currentCar.roadDirection == 3) {
        var isTrafficAllowed = true

        if (trafficLight.horizontalColor == 0 && (Math.abs(point.x) > grassWidth * 0.9) && Math.abs(point.x) < grassWidth) {
          isTrafficAllowed = false
        }

        for (var j = 0; j < bufCoordsOfActiveCars.length; j++) {
          var distance = Math.sqrt(Math.pow(absoluleCoordX - bufCoordsOfActiveCars[j].x, 2)
            + Math.pow(absoluleCoordY - bufCoordsOfActiveCars[j].y, 2))

          var checkXNeighbor = xDirectionSign > 0 ? (absoluleCoordX < bufCoordsOfActiveCars[j].x) : (absoluleCoordX > bufCoordsOfActiveCars[j].x)
          var checkYNeighbor = yDirectionSign > 0 ? (absoluleCoordY < bufCoordsOfActiveCars[j].y) : (absoluleCoordY > bufCoordsOfActiveCars[j].y)

          if (distance < 40) {
            if (
              (
                3 == bufCoordsOfActiveCars[j].road_dir
                &&
                5 == currentCar.route
                &&
                currentCar.absoluleCoordY < SVG_HEIGHT / 2
              )
              ||
              (
                1 == bufCoordsOfActiveCars[j].road_dir
                &&
                9 == currentCar.route
                &&
                currentCar.absoluleCoordY > SVG_HEIGHT / 2
              )
            ) {
              isTrafficAllowed = false
              break
            } else if (
              (
                3 == currentCar.roadDirection
                &&
                5 == bufCoordsOfActiveCars[j].route
              )
              ||
              (
                1 == currentCar.roadDirection
                &&
                9 == bufCoordsOfActiveCars[j].route
              )
            ) {
              // move car
            } else if (xDirectionSign != 0 && yDirectionSign != 0) {
              if (checkXNeighbor || checkYNeighbor) {
                isTrafficAllowed = false
                break
              }
            } else if (xDirectionSign != 0) {
              if (checkXNeighbor) {
                isTrafficAllowed = false
                break
              }
            } else if (yDirectionSign != 0) {
              if (checkYNeighbor) {
                isTrafficAllowed = false
                break
              }
            }
          }
        }

        if (isTrafficAllowed) {
          currentCar.move(point)
        }
      }

      if (currentCar.roadDirection == 0 || currentCar.roadDirection == 2) {
        var isTrafficAllowed = true

        if (trafficLight.verticalColor == 0 && (Math.abs(point.y) > grassHeight * 0.9) && Math.abs(point.y) < grassHeight) {
          isTrafficAllowed = false
        }

        for (var j = 0; j < bufCoordsOfActiveCars.length; j++) {
          var distance = Math.sqrt(Math.pow(absoluleCoordX - bufCoordsOfActiveCars[j].x, 2)
            + Math.pow(absoluleCoordY - bufCoordsOfActiveCars[j].y, 2))

          var checkXNeighbor = xDirectionSign > 0 ? (absoluleCoordX < bufCoordsOfActiveCars[j].x) : (absoluleCoordX > bufCoordsOfActiveCars[j].x)
          var checkYNeighbor = yDirectionSign > 0 ? (absoluleCoordY < bufCoordsOfActiveCars[j].y) : (absoluleCoordY > bufCoordsOfActiveCars[j].y)

          if (distance < 40) {
            if (
              (
                0 == bufCoordsOfActiveCars[j].road_dir
                &&
                8 == currentCar.route
                &&
                currentCar.absoluleCoordX >= SVG_WIDTH / 2
              )
              ||
              (
                2 == bufCoordsOfActiveCars[j].road_dir
                &&
                2 == currentCar.route
                &&
                currentCar.absoluleCoordX <= SVG_WIDTH / 2
              )
            ) {
              isTrafficAllowed = false
              break
            } else if (
              (
                0 == currentCar.roadDirection
                &&
                8 == bufCoordsOfActiveCars[j].route
              )
              ||
              (
                2 == currentCar.roadDirection
                &&
                2 == bufCoordsOfActiveCars[j].route
              )
            ) {
              // move car
            } else if (xDirectionSign != 0 && yDirectionSign != 0) {
              if (checkXNeighbor || checkYNeighbor) {
                isTrafficAllowed = false
                break
              }
            } else if (xDirectionSign != 0) {
              if (checkXNeighbor) {
                isTrafficAllowed = false
                break
              }
            } else if (yDirectionSign != 0) {
              if (checkYNeighbor) {
                isTrafficAllowed = false
                break
              }
            }
          }
        }

        if (isTrafficAllowed) {
          currentCar.move(point)
        }
      }
    } else {
      currentCar.destroy()
      metrics.setCarTime(currentCar.movingTime)
      metrics.setRouteTime(currentCar.route, currentCar.movingTime)
      activeCars.splice(i, 1)
    }
  }

  requestAnimationFrameID = requestAnimationFrame(step)
}
