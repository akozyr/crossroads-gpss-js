const roadRoutes = generateRoadRoutes(svg, ns)
let trafficLight = null
const activeCars = []
let requestAnimationFrameID = null
let isAnimationStarted = false

let inputParameters = new InputParameters()
let metrics = null

function startAnimation()
{
  event.preventDefault()

  const formData = inputParameters.getFormData()

  if (!formData) {
    return
  }

  requestAnimationFrameID = requestAnimationFrame(step)

  metrics = new Metrics()

  let currentCarId = 0
  const timerCarId = setInterval(() => {
    isAnimationStarted = true
    generateCar(svg, ns, currentCarId++)
  }, formData.car_generation_delay)

  trafficLight = new TrafficLight()
  trafficLight.init(formData.color_changing_time)
  trafficLight.run()

  setTimeout(() => {
    clearInterval(timerCarId)
  }, formData.cars_number * formData.car_generation_delay)
}

function stopAnimation()
{
  cancelAnimationFrame(requestAnimationFrameID)
}
