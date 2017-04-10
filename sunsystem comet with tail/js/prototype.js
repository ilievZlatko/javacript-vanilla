function SpaceObject() {
  this.rotationSpeed = 0
  this.revolutionSpeed = 0
}

function Comet(x, y) {
  this.trajectoryPath = [this.x, this.y];
}

Comet.prototype.startingPoint = [0, 0];

var HaleBopp = Object.create(Comet.prototype);

HaleBopp.trajectoryPath = [1, 6];
console.log(HaleBopp.trajectoryPath);

SpaceObject.prototype.baseSpeed = 1;

function Planet() {
  SpaceObject.call(this);
  this.rotatesAround = null;
}

Planet.prototype = Object.create(SpaceObject.prototype);
Planet.prototype.constructor = Planet;

var Sun = new SpaceObject();
sun.rotationSpeed = 12;

var Earth = new Planet();
Earth.rotatesAround = sun;
Earth.rotationSpeed = Earth.baseSpeed * 365;
Earth.revolutionSpeed = Earth.baseSpeed * 1;

var Moon = new Planet();
Moon.rotatesAround = Earth;
Moon.rotationSpeed = Earth.revolutionSpeed * 28;
Moon.revolutionSpeed = Earth.revolutionSpeed * 28;
