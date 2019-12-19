const TRAFFIC_LIGHT_COLORS = {
  RED: 0,
  YELLOW: 1,
  GREEN: 2,
  WHITE: 3
}

const TRAFFIC_LIGHT_COLOR_LABELS = ['red', 'yellow', 'green', 'white']

const YELLOW_DURATION = 500

class TrafficLight {
  constructor(colorChangingTime) {
    this.horizontalColor = TRAFFIC_LIGHT_COLORS.RED
    this.verticalColor = TRAFFIC_LIGHT_COLORS.GREEN
    this.colorChangingTime = colorChangingTime
    this.timertTrafficLight = null
  }

  run() {
    this._changeLight()
    this.timertTrafficLight = setInterval(() => {
      this._changeLight()
    }, this.colorChangingTime)
  }

  stop() {
    clearInterval(this.timertTrafficLight)

    this._setVerticalGroupColor(TRAFFIC_LIGHT_COLORS.WHITE)
    this._setHorizontalGroupColor(TRAFFIC_LIGHT_COLORS.WHITE)
  }

  _changeLight() {  
    this._setVerticalGroupColor(TRAFFIC_LIGHT_COLORS.YELLOW)
    this._setHorizontalGroupColor(TRAFFIC_LIGHT_COLORS.YELLOW)
    
    setTimeout(() => {
      if (this.horizontalColor === TRAFFIC_LIGHT_COLORS.RED) {
        this.verticalColor = TRAFFIC_LIGHT_COLORS.RED
        this.horizontalColor = TRAFFIC_LIGHT_COLORS.GREEN

        this._setVerticalGroupColor(TRAFFIC_LIGHT_COLORS.RED)
        this._setHorizontalGroupColor(TRAFFIC_LIGHT_COLORS.GREEN)

        return
      }

      this.verticalColor = TRAFFIC_LIGHT_COLORS.GREEN
      this.horizontalColor = TRAFFIC_LIGHT_COLORS.RED

      this._setVerticalGroupColor(TRAFFIC_LIGHT_COLORS.GREEN)
      this._setHorizontalGroupColor(TRAFFIC_LIGHT_COLORS.RED)
    }, YELLOW_DURATION)
  }

  _setHorizontalGroupColor(colorId) {
    trafficLightHorizontalGroup.childNodes.forEach((node) => {
      node.setAttribute('fill', this._getColorLabel(colorId))
    })
  }

  _setVerticalGroupColor(colorId) {
    trafficLightVerticalGroup.childNodes.forEach((node) => {
      node.setAttribute('fill', this._getColorLabel(colorId))
    })
  }

  _getColorLabel(colorId) {
    return TRAFFIC_LIGHT_COLOR_LABELS[colorId]
  }
}
