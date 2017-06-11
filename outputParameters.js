function OutputParameters()
{
  this.totalTime = 0
  this.carTime = []
  this.routeMaxElements = [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0
  ]
  this.routeAverageTime = [
    [], [], [], [], [], [],
    [], [], [], [], [], []
  ]

  this.increaseTotalTime = () => {
    this.totalTime++
  }

  this.getAverageTimeOfCarMoving = () => {
    return this.carTime.reduce((s, c) => {
      return s + c
    }, 0) / this.carTime.length
  }

  this.getAverageTimeOfRoute = (routeId) => {
    if (this.routeAverageTime[routeId].length > 0) {
      return this.routeAverageTime[routeId].reduce((s, c) => {
        return s + c
      }, 0) / this.routeAverageTime[routeId].length
    } else {
      return 0
    }
  }

  this.setRouteTime = (routeId, time) => {
    this.routeAverageTime[routeId].push(time)
  }

  this.setCarTime = (time) => {
    this.carTime.push(time)
  }

  this.addElementToRoute = (routeId) => {
    this.routeMaxElements[routeId]++
  }

  this.fillOutForm = () => {
    $('#total-time').text(parseFloat(this.totalTime).toFixed(2))
    $('#average-time-of-car-moving').text(parseFloat(this.getAverageTimeOfCarMoving()).toFixed(2))

    var routeNames = [
      'Top-Left', 'Top-Bottom', 'Top-Right', 'Right-Top',
      'Right-Left', 'Right-Bottom', 'Bottom-Right', 'Bottom-Top',
      'Bottom-Left', 'Left-Top', 'Left-Right', 'Left-Bottom'
    ]

    routeNames.forEach((el, i) => {
      $('#route-parameters').append(
        '<tr><td>' + el + '</td>' +
        '<td>' + this.routeMaxElements[i] + '</td>' +
        '<td>' + parseFloat(this.getAverageTimeOfRoute(i)).toFixed(2) + '</td></tr>'
      )
    })

    $('#output-parameters').fadeIn('slow')
  }
}
