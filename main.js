var roadRoutes = generateRoadRoutes(svg, ns)
var activeCars = []
var requestAnimationFrameID

function startAnimation()
{
  // GPSS variables
  var carsNumber = 10
  var carGenerationDelay = 100

  requestAnimationFrameID = requestAnimationFrame(step)

  for (var i = 0; i < carsNumber; i++) {
    setTimeout(generateCar(svg, ns, i), carGenerationDelay)
  }
}