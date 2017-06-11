var roadRoutes = generateRoadRoutes(svg, ns)
var trafficLight = null
var activeCars = []
var requestAnimationFrameID = null
var isAnimationStarted = false

// class for output system parameters processing
var outputParameters = null

function startAnimation()
{
  // GPSS variables
  var carsNumber = 3
  var carGenerationDelay = 300
  var trafficLightColorChangingTime = 2000

  requestAnimationFrameID = requestAnimationFrame(step)

  outputParameters = new OutputParameters()

  var currentCarId = 0
  var timerCarId = setInterval(() => {
    isAnimationStarted = true
    generateCar(svg, ns, currentCarId++)
  }, carGenerationDelay)

  trafficLight = new TrafficLight()
  trafficLight.init(trafficLightColorChangingTime)
  trafficLight.run()

  setTimeout(() => {
    clearInterval(timerCarId)
  }, carsNumber * carGenerationDelay)
}

function stopAnimation()
{
  cancelAnimationFrame(requestAnimationFrameID)
}
