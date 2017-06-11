function step()
{
  if (isAnimationStarted && activeCars.length == 0) {
    trafficLight.stop()
    stopAnimation()
    isAnimationStarted = false

    outputParameters.fillOutForm()

    return
  }

  outputParameters.increaseTotalTime()

  runOnStep()
}

function runOnStep()
{
  var coordsOfActiveCars = []

  for (var i = 0; i < activeCars.length; i++) {
    var currentCar = activeCars[i]
    var currentCarClientRect = currentCar.svgElement.getBoundingClientRect()

    var absoluleCoordX = currentCarClientRect.left + currentCarClientRect.width / 2 - svgLeft
    var absoluleCoordY = currentCarClientRect.top + currentCarClientRect.height / 2 - svgTop

    var point = roadRoutes[currentCar.route]
        .path.getPointAtLength(currentCar.currentTime * roadRoutes[currentCar.route].length)

    var xDirectionSign = Math.sign(Math.round(point.x))
    var yDirectionSign = Math.sign(Math.round(point.y))

    coordsOfActiveCars.push({ x: absoluleCoordX, y: absoluleCoordY, id: activeCars[i].carId, x_sign: xDirectionSign, y_sign: yDirectionSign })
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

      var absoluleCoordX = currentCarClientRect.left + currentCarClientRect.width / 2 - svgLeft
      var absoluleCoordY = currentCarClientRect.top + currentCarClientRect.height / 2 - svgTop

      if (currentCar.roadDirection == 1 || currentCar.roadDirection == 3) {
        var isTrafficAllowed = true

        if (trafficLight.horizontalColor == 0) {
          if ((Math.abs(point.x) > grassWidth * 0.9) && Math.abs(point.x) < grassWidth) {
            isTrafficAllowed = false
          }
        }

        for (var j = 0; j < bufCoordsOfActiveCars.length; j++) {
          // var distance = Math.abs(absoluleCoordX - bufCoordsOfActiveCars[j].x)
          //   + Math.abs(absoluleCoordY - bufCoordsOfActiveCars[j].y)

          var distance = Math.sqrt(Math.pow(absoluleCoordX - bufCoordsOfActiveCars[j].x, 2)
            + Math.pow(absoluleCoordY - bufCoordsOfActiveCars[j].y, 2))

          var checkXNeighbor = xDirectionSign > 0 ? (absoluleCoordX < bufCoordsOfActiveCars[j].x) : (absoluleCoordX > bufCoordsOfActiveCars[j].x)
          var checkYNeighbor = yDirectionSign > 0 ? (absoluleCoordY < bufCoordsOfActiveCars[j].y) : (absoluleCoordY > bufCoordsOfActiveCars[j].y)

          // console.log(
          //   'id = ', bufCoordsOfActiveCars[j].id, ': ',
          //   'distance = ', distance,
          //   ' x cond = ', checkXNeighbor,
          //   ' y cond = ', checkYNeighbor
          // )

          // if (distance < 50) {
          //   if (xDirectionSign != 0 && yDirectionSign != 0 && bufCoordsOfActiveCars[j].y_sign == 0) {
          //     isTrafficAllowed = false
          //     break
          //   }
          // }

          if (distance < 45) {
            if (
              (xDirectionSign + bufCoordsOfActiveCars[j].x_sign) == 0 &&
              Math.abs(yDirectionSign + bufCoordsOfActiveCars[j].y_sign) == 1
            ) {
              if (
                yDirectionSign == 0 && Math.abs(absoluleCoordY - bufCoordsOfActiveCars[j].y) < 25
              ) {
                isTrafficAllowed = false
                break
              } else if (
                (yDirectionSign == 1 || yDirectionSign == -1) && Math.abs(absoluleCoordX - bufCoordsOfActiveCars[j].x) < 25
              ) {
                isTrafficAllowed = false
                break
              }

              // console.log('left turning: ', absoluleCoordX - bufCoordsOfActiveCars[j].x, absoluleCoordY - bufCoordsOfActiveCars[j].y)
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

        // console.log(currentCar.carId, isTrafficAllowed, xDirectionSign, yDirectionSign)

        if (isTrafficAllowed) {
          currentCar.move(point)
        }
      }
    } else {
      currentCar.destroy()
      outputParameters.setCarTime(currentCar.movingTime)
      outputParameters.setRouteTime(currentCar.route, currentCar.movingTime)
      activeCars.splice(i, 1)
    }
  }

  // alert('step')

  // setTimeout(() => {
    requestAnimationFrameID = requestAnimationFrame(step)
  // }, 50)
}
