function InputParameters()
{
  this.defaultValues = {
    cars_number: 20,
    car_generation_delay: 500,
    color_changing_time: 2000
  }

  this.carsNumberElement = null
  this.carGenerationDelayElement = null
  this.trafficLightColorChangingTimeElement = null

  this.init = () => {
    this.carsNumberElement = $('#cars-number')
    this.carGenerationDelayElement = $('#car-generation-delay')
    this.trafficLightColorChangingTimeElement = $('#color-changing-time')

    this.fillForm()
  }

  this.fillForm = () => {
    this.carsNumberElement.val(this.defaultValues.cars_number)
    this.carGenerationDelayElement.val(this.defaultValues.car_generation_delay)
    this.trafficLightColorChangingTimeElement.val(this.defaultValues.color_changing_time)
  }

  this.getFormData = () => {
    var formData = {
      cars_number: parseInt(this.carsNumberElement.val()),
      car_generation_delay: parseInt(this.carGenerationDelayElement.val()),
      color_changing_time: parseInt(this.trafficLightColorChangingTimeElement.val())
    }

    if ((validationResult = this.isValidFormData(formData)) == true) {
      return formData
    } else {
      alert(validationResult)
      return false
    }
  }

  this.isValidFormData = (formData) => {
    if (!(Number.isInteger(formData.cars_number) && formData.cars_number > 0)) {
      return 'Cars Number must be Integer and greater than 0'
    }

    if (!(
      Number.isInteger(formData.car_generation_delay)
      &&
      formData.car_generation_delay >= 300
      &&
      formData.car_generation_delay <= 700
    )) {
      return 'Car Generation Delay must be Integer, greater or equal than 300 and less or equal than 700'
    }

    if (!(
      Number.isInteger(formData.color_changing_time)
      &&
      formData.color_changing_time >= 2000
      &&
      formData.color_changing_time <= 2500
    )) {
      return 'Trafficlight Color Changing Time must be Integer, greater or equal than 2000 and less or equal than 2500'
    }

    return true
  }
}