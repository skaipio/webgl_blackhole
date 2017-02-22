// in worker.js
/*
self.addEventListener('message', function() {
  // We received a message from the main thread!
  // do some computation that may normally cause the browser to hang

  //  now send back the results
  self.postMessage({
    type: 'results',
    data: {
      // ...
    }
  })
})*/

self.onmessage = function(e) {
  const gravitationalConstant = 100;
  const particleMass = 1;
  const blackHoleMass = 10;
  const blackHolePosition = e.data.blackHolePosition;
  var positions = e.data.positions;
  var velocities = e.data.velocities;
  var updatedVelocities = []
  for (var i = 0; i < velocities.length / 2; ++i) {
    var velocityIndexOffset = i * 2;
    var positionIndexOffset = i * 3;
    var pX = positions[positionIndexOffset], pY = positions[positionIndexOffset + 1];
    //console.log(pX, pY);
    var vX = blackHolePosition.x - pX, vY = blackHolePosition.y - pY;
    var magnitude = Math.hypot(vX, vY);
    var force = getForce(gravitationalConstant, particleMass, blackHoleMass, blackHolePosition, magnitude);
    var dX = vX / magnitude * force, dY = vY / magnitude * force;
    //console.log(pX, pY, vX / magnitude * force, vY / magnitude * force);
    updatedVelocities.push(velocities[velocityIndexOffset] + dX);
    updatedVelocities.push(velocities[velocityIndexOffset + 1] + dY);
  }
  postMessage({velocities: updatedVelocities});
}

function getForce(gravitationalConstant,
  particleMass,
  blackHoleMass,
  blackHolePosition,
  distance) {
  return gravitationalConstant * particleMass * blackHoleMass / (distance * distance)
}
