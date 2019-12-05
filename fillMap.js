const SVG_WIDTH = 500
const SVG_HEIGHT = 500

const svg = document.querySelector('svg')
svg.setAttribute('width', SVG_WIDTH)
svg.setAttribute('height', SVG_HEIGHT)

const { top: SVG_TOP, left: SVG_LEFT } = svg.getBoundingClientRect()

// draw the border
const ns = 'http://www.w3.org/2000/svg'

const setAttributesForObj = (obj, attrs) => {
  Object.entries(attrs).forEach(([key, value]) => {
    obj.setAttribute(key, value);
  })

  return obj;
}

svg.append(
  setAttributesForObj(
    document.createElementNS(ns, 'rect'),
    {
      x: 0,
      y: 0,
      width: SVG_WIDTH,
      height: SVG_HEIGHT,
      stroke: 'black',
      'stroke-width': 1,
      fill: 'rgb(164, 164, 164)'
    }
  )
)

const ROAD_WIDTH = 120

const grassRectanglesGroup = document.createElementNS(ns, 'g');
svg.append(grassRectanglesGroup)

const grassWidth = (SVG_WIDTH - ROAD_WIDTH) / 2
const grassHeight = (SVG_HEIGHT - ROAD_WIDTH) / 2

const jsonGrassRectangles = [
  { 'x': 0, 'y': 0, 'width': grassWidth, 'height': grassHeight, fill: 'green' },
  { 'x': grassWidth + ROAD_WIDTH + 1, 'y': 0, 'width': grassWidth, 'height': grassHeight, fill: 'green' },
  { 'x': 0, 'y': grassHeight + ROAD_WIDTH + 1, 'width': grassWidth, 'height': grassHeight, fill: 'green' },
  { 'x': grassWidth + ROAD_WIDTH + 1, 'y': grassHeight + ROAD_WIDTH + 1, 'width': grassWidth, 'height': grassHeight, fill: 'green' }
]

jsonGrassRectangles.forEach((grassRectangle) => {
  grassRectanglesGroup.append(
    setAttributesForObj(
      document.createElementNS(ns, 'rect'),
      grassRectangle
    )
  )
})

const horizontalRoadMarkingGroup = document.createElementNS(ns, 'g');
svg.append(horizontalRoadMarkingGroup)

const jsonHorizontalLines = [
  { 'x1': 0, 'y1': grassHeight + ROAD_WIDTH / 2, 'x2': grassWidth, 'y2': grassHeight + ROAD_WIDTH / 2, stroke: 'white' },
  { 'x1': grassWidth + ROAD_WIDTH + 1, 'y1': grassHeight + ROAD_WIDTH / 2, 'x2': SVG_WIDTH, 'y2': grassHeight + ROAD_WIDTH / 2, stroke: 'white' }
]

jsonHorizontalLines.forEach((horizontalLine) => {
  horizontalRoadMarkingGroup.append(
    setAttributesForObj(
      document.createElementNS(ns, 'line'),
      horizontalLine
    )
  )
})

const verticalRoadMarkingGroup = document.createElementNS(ns, 'g');
svg.append(verticalRoadMarkingGroup)

const jsonVerticalLines = [
  { 'x1': grassWidth + ROAD_WIDTH / 2, 'y1': 0, 'x2': grassWidth + ROAD_WIDTH / 2, 'y2': grassHeight, stroke: 'white' },
  { 'x1': grassWidth + ROAD_WIDTH / 2, 'y1': grassHeight + ROAD_WIDTH + 1, 'x2': grassWidth + ROAD_WIDTH / 2, 'y2': SVG_HEIGHT, stroke: 'white' }
]

jsonVerticalLines.forEach((verticalLine) => {
  horizontalRoadMarkingGroup.append(
    setAttributesForObj(
      document.createElementNS(ns, 'line'),
      verticalLine
    )
  )
})

const trafficLightGroup = document.createElementNS(ns, 'g');
svg.append(trafficLightGroup)

const trafficLightWidth = 40
const trafficLightHeight = 40

trafficLightGroup.append(
  setAttributesForObj(
    document.createElementNS(ns, 'rect'),
    {
      x: SVG_WIDTH / 2 - trafficLightWidth / 2 + 1,
      y: SVG_HEIGHT / 2 - trafficLightHeight / 2 + 1,
      transform: `rotate(45 ${SVG_WIDTH / 2} ${SVG_HEIGHT / 2})`,
      width: trafficLightWidth,
      height: trafficLightHeight,
      fill: 'rgb(132, 132, 132)'
    }
  )
)

const trafficLightPartRadius = 5

const trafficLightHorizontalGroup = document.createElementNS(ns, 'g');
const trafficLightVerticalGroup = document.createElementNS(ns, 'g');
svg.append(trafficLightHorizontalGroup)
svg.append(trafficLightVerticalGroup)

const jsonTrafficLightHorizontalParts = [
  { 'cx': SVG_WIDTH / 2 - trafficLightWidth / 3, 'cy': SVG_HEIGHT / 2 + 1, r: trafficLightPartRadius, fill: 'white' },
  { 'cx': SVG_WIDTH / 2 + trafficLightWidth / 3, 'cy': SVG_HEIGHT / 2 + 1, r: trafficLightPartRadius, fill: 'white' }
]

const jsonTrafficLightVerticalParts = [
  { 'cx': SVG_WIDTH / 2, 'cy': SVG_HEIGHT / 2 - trafficLightHeight / 3, r: trafficLightPartRadius, fill: 'white' },
  { 'cx': SVG_WIDTH / 2, 'cy': SVG_HEIGHT / 2 + trafficLightHeight / 3, r: trafficLightPartRadius, fill: 'white' }
]

jsonTrafficLightHorizontalParts.forEach((part) => {
  trafficLightHorizontalGroup.append(
    setAttributesForObj(
      document.createElementNS(ns, 'circle'),
      part
    )
  )
})

jsonTrafficLightVerticalParts.forEach((part) => {
  trafficLightVerticalGroup.append(
    setAttributesForObj(
      document.createElementNS(ns, 'circle'),
      part
    )
  )
})
