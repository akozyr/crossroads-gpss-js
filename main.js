const roadRoutes = generateRoadRoutes(svg, ns)
let trafficLight = null
const activeCars = []
let requestAnimationFrameID = null
let isAnimationStarted = false

// class for input system parameters processing
let inputParameters = new InputParameters()
inputParameters.init()
// class for output system parameters processing
let outputParameters = null

function startAnimation()
{
  event.preventDefault()

  // GPSS variables
  if (data = inputParameters.getFormData()) {
    requestAnimationFrameID = requestAnimationFrame(step)

    outputParameters = new OutputParameters()

    let currentCarId = 0
    const timerCarId = setInterval(() => {
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
