var roadRoutes = generateRoadRoutes(svg, ns)
var trafficLight = null
var activeCars = []
var requestAnimationFrameID = null
var isAnimationStarted = false

// class for output system parameters processing
var inputParameters = new InputParameters()
inputParameters.init()
// class for output system parameters processing
var outputParameters = null

function startAnimation()
{
  event.preventDefault()

  // GPSS variables
  if (data = inputParameters.getFormData()) {
    requestAnimationFrameID = requestAnimationFrame(step)

    outputParameters = new OutputParameters()

    var currentCarId = 0
    var timerCarId = setInterval(() => {
      isAnimationStarted = true
      generateCar(svg, ns, currentCarId++)
    }, data.car_generation_delay)

    trafficLight = new TrafficLight()
    trafficLight.init(data.color_changing_time)
    trafficLight.run()

    setTimeout(() => {
      clearInterval(timerCarId)
    }, data.cars_number * data.car_generation_delay)
  }
}

function stopAnimation()
{
  cancelAnimationFrame(requestAnimationFrameID)
}
