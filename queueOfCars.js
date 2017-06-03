function QueueOfCars
{
  this.queue = []
  this.type = null

  this.init = () => {

  }

  this.setIn = (carId) => {
    this.queue.push(carId)
  }

  this.setOut = () => {
    this.queue.shift()
  }

  this.length = () => {
    return this.queue.length
  }
}
