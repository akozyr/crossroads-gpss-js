var roadRoutes = generateRoadRoutes(svg, ns)
var trafficLight = null
var activeCars = []
var requestAnimationFrameID = null

// queues
var leftOutputQueue = []

function startAnimation()
{
  // GPSS variables
  var carsNumber = 10
  var carGenerationDelay = 300
  var trafficLightColorChangingTime = 2000

  requestAnimationFrameID = requestAnimationFrame(step)

  var currentCarId = 0
  var timerCarId = setInterval(() => {
    generateCar(svg, ns, currentCarId++)
  }, carGenerationDelay)

  trafficLight = new TrafficLight()
  trafficLight.init(trafficLightColorChangingTime)
  trafficLight.run()

  setTimeout(() => {
    clearInterval(timerCarId)
  }, carsNumber * carGenerationDelay)
}
