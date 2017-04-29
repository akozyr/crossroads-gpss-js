var svgWidth = 500
var svgHeight = 500

// make an svg container
var svgContainer = d3.select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)

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

