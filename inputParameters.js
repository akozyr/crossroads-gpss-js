const DEFAULT_INPUT_VALUES = {
  cars_number: 20,
  car_generation_delay: 500,
  color_changing_time: 2000
}

const MIN_CARS_NUMBER = 0
const MAX_CARS_NUMBER = 20

const MIN_CAR_GENERATION_DELAY = 499
const MAX_CAR_GENERATION_DELAY = 700

const MIN_COLOR_CHANGING_TIME = 1999
const MAX_COLOR_CHANGING_TIME = 2500

const CARS_NUMBER_WRONG_MESSAGE = `Cars Number must be greater than ${MIN_CARS_NUMBER} and less or equal than ${MAX_CARS_NUMBER}`
const CARS_GENERATION_DELAY_WRONG_MESSAGE = `Car Generation Delay must be greater than ${MIN_CAR_GENERATION_DELAY} and less or equal than ${MAX_CAR_GENERATION_DELAY}`
const COLOR_CHANGING_WRONG_MESSAGE = `Trafficlight Color Changing Time must be greater than ${MIN_COLOR_CHANGING_TIME} and less or equal than ${MAX_COLOR_CHANGING_TIME}`

class InputParameters
{
  constructor() {
    const {
      cars_number,
      car_generation_delay,
      color_changing_time
    } = DEFAULT_INPUT_VALUES

    this.carsNumberElement = $('#cars-number').val(cars_number)
    this.carGenerationDelayElement = $('#car-generation-delay').val(car_generation_delay)
    this.trafficLightColorChangingTimeElement = $('#color-changing-time').val(color_changing_time)
  }

  getFormData() {
    const formData = {
      cars_number: parseInt(this.carsNumberElement.val()),
      car_generation_delay: parseInt(this.carGenerationDelayElement.val()),
      color_changing_time: parseInt(this.trafficLightColorChangingTimeElement.val())
    }

    try {
      return this._validate(formData)
    } catch (error) {
      alert(error.message)

      return false
    }
  }

  _validate(formData) {
    const {
      cars_number,
      car_generation_delay,
      color_changing_time
    } = formData

    const isBetween = (value, min, max) => {
      return value > min && value <= max
    }

    if (!isBetween(cars_number, MIN_CARS_NUMBER, MAX_CARS_NUMBER)) {
      throw new Error(CARS_NUMBER_WRONG_MESSAGE)
    }

    if (!isBetween(car_generation_delay, MIN_CAR_GENERATION_DELAY, MAX_CAR_GENERATION_DELAY)) {
      throw new Error(CARS_GENERATION_DELAY_WRONG_MESSAGE)
    }

    if (!isBetween(color_changing_time, MIN_COLOR_CHANGING_TIME, MAX_COLOR_CHANGING_TIME)) {
      throw new Error(COLOR_CHANGING_WRONG_MESSAGE)
    }

    return formData
  }
}
