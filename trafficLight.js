function TrafficLight()
{
  const yellowDuration = 300

  // possible values:
  // 0 - red, 1 - yellow, 2 - green
  this.horizontalColor = 0
  this.verticalColor = 2
  this.trafficLightColorChangingTime

  this.changeLight = () => {
    this.setVerticalGroupColor(1)
    this.setHorizontalGroupColor(1)

    setTimeout(() => {
      if (this.horizontalColor == 0) {
        this.verticalColor = 0
        this.horizontalColor = 2

        this.setVerticalGroupColor(0)
        this.setHorizontalGroupColor(2)
      } else {
        this.verticalColor = 2
        this.horizontalColor = 0

        this.setVerticalGroupColor(2)
        this.setHorizontalGroupColor(0)
      }
    }, yellowDuration)
  }

  this.setHorizontalGroupColor = (colorId) => {
    for (var i = 0; i < trafficLightHorizontalGroup.childNodes.length; i++) {
      trafficLightHorizontalGroup.childNodes[i].setAttribute('fill', this.getColorLabel(colorId))
    }
  }

  this.setVerticalGroupColor = (colorId) => {
    for (var i = 0; i < trafficLightVerticalGroup.childNodes.length; i++) {
      trafficLightVerticalGroup.childNodes[i].setAttribute('fill', this.getColorLabel(colorId))
    }
  }

  this.getColorLabel = (colorId) => {
    var colorLabels = ['red', 'yellow', 'green']

    return colorLabels[colorId]
  }
}