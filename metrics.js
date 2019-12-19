const ROUTES_NUMBER = 12
const ROUTES_NAMES = [
  'Top-Left', 'Top-Bottom', 'Top-Right', 'Right-Top',
  'Right-Left', 'Right-Bottom', 'Bottom-Right', 'Bottom-Top',
  'Bottom-Left', 'Left-Top', 'Left-Right', 'Left-Bottom'
]

class Metrics {
  constructor() {
    this.totalTime = 0
    this.carTime = []
    this.routeMaxElements = new Array(ROUTES_NUMBER).fill(0)
    this.routeAverageTime = [...new Array(ROUTES_NUMBER)].map(el => [])
  }

  increaseTotalTime() {
    this.totalTime++
  }

  getAverageTimeOfCarMoving() {
    return this.carTime.reduce((buffer, time) => buffer + time, 0) / this.carTime.length
  }

  getAverageTimeOfRoute(routeId) {
    const routeTime = this.routeAverageTime[routeId]

    if (routeTime.length === 0) {
      return 0
    }

    return routeTime.reduce((buffer, time) => buffer + time, 0) / routeTime.length
  }

  setRouteTime(routeId, time) {
    this.routeAverageTime[routeId].push(time)
  }

  setCarTime(time) {
    this.carTime.push(time)
  }

  addElementToRoute(routeId) {
    this.routeMaxElements[routeId]++
  }

  fillOutForm = () => {
    $('#total-time').text(parseFloat(this.totalTime).toFixed(2))
    $('#average-time-of-car-moving').text(parseFloat(this.getAverageTimeOfCarMoving()).toFixed(2))

    ROUTES_NAMES.forEach((name, i) => {
      $('#route-parameters').append(
        '<tr><td>' + name + '</td>' +
        '<td>' + this.routeMaxElements[i] + '</td>' +
        '<td>' + parseFloat(this.getAverageTimeOfRoute(i)).toFixed(2) + '</td></tr>'
      )
    })

    $('#output-parameters').fadeIn('slow')
  }
}
