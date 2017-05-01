var svgWidth = 500
var svgHeight = 500

var svg = document.querySelector('svg')
svg.setAttribute('width', svgWidth)
svg.setAttribute('height', svgHeight)

// draw the border
var ns = 'http://www.w3.org/2000/svg'
var rect = document.createElementNS(ns, 'rect')

rect.setAttribute('x', 0)
rect.setAttribute('y', 0)
rect.setAttribute('width', svgWidth)
rect.setAttribute('height', svgHeight)
rect.setAttribute('stroke', 'black')
rect.setAttribute('stroke-width', 1)
rect.setAttribute('fill', 'rgb(164, 164, 164)')

svg.append(rect)

var roadWidth = 120

var grassRectanglesGroup = document.createElementNS(ns, 'g');
svg.append(grassRectanglesGroup)

var grassWidth = (svgWidth - roadWidth) / 2
var grassHeight = (svgHeight - roadWidth) / 2

var jsonGrassRectangles = [
  { 'x': 0, 'y': 0, 'width': grassWidth, 'height': grassHeight },
  { 'x': grassWidth + roadWidth + 1, 'y': 0, 'width': grassWidth, 'height': grassHeight },
  { 'x': 0, 'y': grassHeight + roadWidth + 1, 'width': grassWidth, 'height': grassHeight },
  { 'x': grassWidth + roadWidth + 1, 'y': grassHeight + roadWidth + 1, 'width': grassWidth, 'height': grassHeight }
]

for (var i = 0; i < jsonGrassRectangles.length; i++) {
  var currentSettings = jsonGrassRectangles[i]
  rect = document.createElementNS(ns, 'rect')

  rect.setAttribute('x', currentSettings.x)
  rect.setAttribute('y', currentSettings.y)
  rect.setAttribute('width', currentSettings.width)
  rect.setAttribute('height', currentSettings.height)
  rect.setAttribute('fill', 'green')

  grassRectanglesGroup.append(rect)
}

var horizontalRoadMarkingGroup = document.createElementNS(ns, 'g');
svg.append(horizontalRoadMarkingGroup)

var jsonHorizontalLines = [
  { 'x1': 0, 'y1': grassHeight + roadWidth / 2, 'x2': grassWidth, 'y2': grassHeight + roadWidth / 2 },
  { 'x1': grassWidth + roadWidth + 1, 'y1': grassHeight + roadWidth / 2, 'x2': svgWidth, 'y2': grassHeight + roadWidth / 2 }
]

for (var i = 0; i < jsonHorizontalLines.length; i++) {
  var currentSettings = jsonHorizontalLines[i]
  line = document.createElementNS(ns, 'line')

  line.setAttribute('x1', currentSettings.x1)
  line.setAttribute('y1', currentSettings.y1)
  line.setAttribute('x2', currentSettings.x2)
  line.setAttribute('y2', currentSettings.y2)
  line.setAttribute('stroke', 'white')

  horizontalRoadMarkingGroup.append(line)
}

var verticalRoadMarkingGroup = document.createElementNS(ns, 'g');
svg.append(verticalRoadMarkingGroup)

var jsonVerticalLines = [
  { 'x1': grassWidth + roadWidth / 2, 'y1': 0, 'x2': grassWidth + roadWidth / 2, 'y2': grassHeight },
  { 'x1': grassWidth + roadWidth / 2, 'y1': grassHeight + roadWidth + 1, 'x2': grassWidth + roadWidth / 2, 'y2': svgHeight }
]

for (var i = 0; i < jsonVerticalLines.length; i++) {
  var currentSettings = jsonVerticalLines[i]
  line = document.createElementNS(ns, 'line')

  line.setAttribute('x1', currentSettings.x1)
  line.setAttribute('y1', currentSettings.y1)
  line.setAttribute('x2', currentSettings.x2)
  line.setAttribute('y2', currentSettings.y2)
  line.setAttribute('stroke', 'white')

  horizontalRoadMarkingGroup.append(line)
}

var trafficLightGroup = document.createElementNS(ns, 'g');
svg.append(trafficLightGroup)

var trafficLightWidth = 40
var trafficLightHeight = 40

rect = document.createElementNS(ns, 'rect')

rect.setAttribute('x', svgWidth / 2 - trafficLightWidth / 2 + 1)
rect.setAttribute('y', svgHeight / 2 - trafficLightHeight / 2 + 1)
rect.setAttribute('transform', 'rotate(45 ' + svgWidth / 2 + ' ' + svgHeight / 2 + ')')
rect.setAttribute('width', trafficLightWidth)
rect.setAttribute('height', trafficLightHeight)
rect.setAttribute('fill', 'rgb(132, 132, 132)')
trafficLightGroup.append(rect)

var trafficLightPartRadius = 5

var trafficLightHorizontalGroup = document.createElementNS(ns, 'g');
var trafficLightVerticalGroup = document.createElementNS(ns, 'g');
svg.append(trafficLightHorizontalGroup)
svg.append(trafficLightVerticalGroup)

var jsonTrafficLightHorizontalParts = [
  { 'cx': svgWidth / 2 - trafficLightWidth / 3, 'cy': svgHeight / 2 + 1},
  { 'cx': svgWidth / 2 + trafficLightWidth / 3, 'cy': svgHeight / 2 + 1}
]

for (var i = 0; i < jsonTrafficLightHorizontalParts.length; i++) {
  var currentSettings = jsonTrafficLightHorizontalParts[i]
  var circle = document.createElementNS(ns, 'circle')

  circle.setAttribute('cx', currentSettings.cx)
  circle.setAttribute('cy', currentSettings.cy)
  circle.setAttribute('r', trafficLightPartRadius)
  circle.setAttribute('fill', 'white')
  trafficLightHorizontalGroup.append(circle)
}

var jsonTrafficLightVerticalParts = [
  { 'cx': svgWidth / 2, 'cy': svgHeight / 2 - trafficLightHeight / 3 },
  { 'cx': svgWidth / 2, 'cy': svgHeight / 2 + trafficLightHeight / 3 }
]

for (var i = 0; i < jsonTrafficLightVerticalParts.length; i++) {
  var currentSettings = jsonTrafficLightVerticalParts[i]
  circle = document.createElementNS(ns, 'circle')

  circle.setAttribute('cx', currentSettings.cx)
  circle.setAttribute('cy', currentSettings.cy)
  circle.setAttribute('r', trafficLightPartRadius)
  circle.setAttribute('fill', 'white')
  trafficLightVerticalGroup.append(circle)
}
