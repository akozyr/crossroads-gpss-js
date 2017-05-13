var roadRoutes = generateRoadRoutes(svg, ns)
var trafficLight = null
var activeCars = []
var requestAnimationFrameID = null

function startAnimation()
{
  // GPSS variables
  var carsNumber = 20
  var carGenerationDelay = 300
  var trafficLightColorChangingTime = 2000

  requestAnimationFrameID = requestAnimationFrame(step)

  var currentCarId = 0
  var timerCarId = setInterval(() => {
    generateCar(svg, ns, currentCarId++)
  }, carGenerationDelay)

  trafficLight = new TrafficLight()
  trafficLight.changeLight()

  var timertTrafficLight = setInterval(() => {
    trafficLight.changeLight()
  }, trafficLightColorChangingTime)

  setTimeout(() => {
    clearInterval(timerCarId)
    clearInterval(timertTrafficLight)
  }, carsNumber * carGenerationDelay)
}