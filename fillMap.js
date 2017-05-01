var svgWidth = 500
var svgHeight = 500

// make an svg container
var svgContainer = d3.select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .attr('id', 'svgElement')

// draw the border
var border = svgContainer.append("rect")
  .attr("x", 0)
  .attr("y", 0)
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .attr("stroke", 'black')
  .attr("stroke-width", 1)
  .attr("fill", 'rgb(164, 164, 164)')

var roadWidth = 120

var grassRectanglesGroup = svgContainer.append('g');

var grassWidth = (svgWidth - roadWidth) / 2
var grassHeight = (svgHeight - roadWidth) / 2

var jsonGrassRectangles = [
  { 'x': 0, 'y': 0, 'width': grassWidth, 'height': grassHeight },
  { 'x': grassWidth + roadWidth + 1, 'y': 0, 'width': grassWidth, 'height': grassHeight },
  { 'x': 0, 'y': grassHeight + roadWidth + 1, 'width': grassWidth, 'height': grassHeight },
  { 'x': grassWidth + roadWidth + 1, 'y': grassHeight + roadWidth + 1, 'width': grassWidth, 'height': grassHeight }
]

var grassRectangles = grassRectanglesGroup.selectAll("rect")
  .data(jsonGrassRectangles)
  .enter()
  .append("rect")

var grassRectanglesAttributes = grassRectangles
  .attr("x",  d => d.x)
  .attr("y", d => d.y)
  .attr("width", d => d.width)
  .attr("height", d => d.height)
  .attr('fill', 'green')

var horizontalRoadMarkingGroup = svgContainer.append('g');

var jsonHorizontalLines = [
  { 'x1': 0, 'y1': grassHeight + roadWidth / 2, 'x2': grassWidth, 'y2': grassHeight + roadWidth / 2 },
  { 'x1': grassWidth + roadWidth + 1, 'y1': grassHeight + roadWidth / 2, 'x2': svgWidth, 'y2': grassHeight + roadWidth / 2 }
]

var horizontalLines = horizontalRoadMarkingGroup.selectAll("line")
  .data(jsonHorizontalLines)
  .enter()
  .append("line")

var horizontalLinesAttributes = horizontalLines
  .attr("x1",  d => d.x1)
  .attr("y1", d => d.y1)
  .attr("x2",  d => d.x2)
  .attr("y2", d => d.y2)
  .attr('stroke', 'white')

var verticalRoadMarkingGroup = svgContainer.append('g');

var jsonVerticalLines = [
  { 'x1': grassWidth + roadWidth / 2, 'y1': 0, 'x2': grassWidth + roadWidth / 2, 'y2': grassHeight },
  { 'x1': grassWidth + roadWidth / 2, 'y1': grassHeight + roadWidth + 1, 'x2': grassWidth + roadWidth / 2, 'y2': svgHeight }
]

var verticalLines = verticalRoadMarkingGroup.selectAll("line")
  .data(jsonVerticalLines)
  .enter()
  .append("line")

var verticalLinesAttributes = verticalLines
  .attr("x1",  d => d.x1)
  .attr("y1", d => d.y1)
  .attr("x2",  d => d.x2)
  .attr("y2", d => d.y2)
  .attr('stroke', 'white')

var trafficLightGroup = svgContainer.append('g');

var trafficLightWidth = 40
var trafficLightHeight = 40

var trafficLightFrame = trafficLightGroup
  .append('rect')
  .attr("x", svgWidth / 2 - trafficLightWidth / 2 + 1)
  .attr("y", svgHeight / 2 - trafficLightHeight / 2 + 1)
  .attr("transform", 'rotate(45 ' + svgWidth / 2 + ' ' + svgHeight / 2 + ')')
  .attr("width", trafficLightWidth)
  .attr("height", trafficLightHeight)
  .attr('fill', 'rgb(132, 132, 132)')

var trafficLightPartRadius = 5

var trafficLightHorizontalGroup = trafficLightGroup.append('g');
var trafficLightVerticalGroup = trafficLightGroup.append('g');

var jsonTrafficLightHorizontalParts = [
  { 'cx': svgWidth / 2 - trafficLightWidth / 3, 'cy': svgHeight / 2 + 1},
  { 'cx': svgWidth / 2 + trafficLightWidth / 3, 'cy': svgHeight / 2 + 1}
]

var trafficLightHorizontalParts = trafficLightHorizontalGroup.selectAll("circle")
  .data(jsonTrafficLightHorizontalParts)
  .enter()
  .append("circle")

var trafficLightHorizontalPartsAttributes = trafficLightHorizontalParts
  .attr("cx", d => d.cx)
  .attr("cy", d => d.cy)
  .attr("r", trafficLightPartRadius)
  .attr('fill', 'white')

var jsonTrafficLightVerticalParts = [
  { 'cx': svgWidth / 2, 'cy': svgHeight / 2 - trafficLightHeight / 3 },
  { 'cx': svgWidth / 2, 'cy': svgHeight / 2 + trafficLightHeight / 3 }
]

var trafficLightVerticalParts = trafficLightVerticalGroup.selectAll("circle")
  .data(jsonTrafficLightVerticalParts)
  .enter()
  .append("circle")

var trafficLightVerticalPartsAttributes = trafficLightVerticalParts
  .attr("cx", d => d.cx)
  .attr("cy", d => d.cy)
  .attr("r", trafficLightPartRadius)
  .attr('fill', 'white')

var car = svgContainer.append('circle')
  .attr('cx', 0)
  .attr('cy', grassHeight + roadWidth * 0.75)
  .attr('r', 15)
  .attr('fill', 'blue')
  .attr('id', 'car')

var path = 'M' + 0 + ',' + 0
  + 'H' + grassWidth + 'q' + roadWidth / 4 + ',' + 0 + ',' +
  + roadWidth / 4 + ',' + roadWidth / 4 + 'v' + grassHeight

var path1 = svgContainer.append('path')
  .attr('d', path)
  .attr('id', 'path1')
  .attr('fill', 'none')

/*var transition = car.transition()
  .duration(7000)
  .attrTween('transform', translateAlong(path1.node()))

function translateAlong(path) {
  var pathLength = path.getTotalLength()
  return (d, i, a) => {
    return (t) => {
      var p = path.getPointAtLength(t * pathLength)

      if (t < 0.9) {
        return "translate(" + p.x + "," + p.y + ")"
      } else {
        return "translate(0)"
      }
    }
  }
}*/

var pathElement = document.getElementById('path1')
var carElement = document.getElementById('car')

carElement.transform.baseVal.appendItem(svgElement.createSVGTransform())

var pathLength = pathElement.getTotalLength()
var duration = 100
var deltaTime = 1 / duration
var currentTime = 0

requestAnimationFrameID = requestAnimationFrame(doAnim);

function doAnim()
{
  var p = pathElement.getPointAtLength(currentTime * pathLength)
  carElement.transform.baseVal.getItem(0).setTranslate(p.x, p.y)
  currentTime += deltaTime

  requestAnimationFrameID = requestAnimationFrame(doAnim)
}

function onRun()
{
  requestAnimationFrameID = requestAnimationFrame(doAnim)
}

function onStop()
{
  cancelAnimationFrame(requestAnimationFrameID)
}


