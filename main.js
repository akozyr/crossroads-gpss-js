var roadRoutes = generateRoadRoutes(svg, ns)

// GPSS variables
var carsNumber = 10
var carGenerationDelay = 100


var activeCars = []
for (var i = 0; i < carsNumber; i++) {
  setTimeout(generateCar(svg, ns), carGenerationDelay)
}
