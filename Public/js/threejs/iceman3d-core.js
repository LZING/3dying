'use strict';
var ICEMAN3D = function () {
    this.mainVersion = 0;
};

ICEMAN3D.Eps = 0.00000001; //epsilon【极小值】 小(或近于零)的正数
ICEMAN3D.Inf = 9999999999; //infinite 无穷大
ICEMAN3D.RadDeg = 57.29577951308232; //radian degree 1弧度 = 57.29577951308232度
ICEMAN3D.DegRad = 0.017453292519943; //1度 = 0.017453292519943弧度

/**
* Function: IsZero
* Description: Determines if the given value is near zero. Uses epsilon for comparison.
* Parameters:
*	a {number} the value
* Returns:
*	{boolean} the result
*/
ICEMAN3D.IsZero = function (a)
{
	return Math.abs (a) < ICEMAN3D.Eps;
};

/**
* Function: IsPositive 是否正数
* Description: Determines if the given value is positive. Uses epsilon for comparison.
* Parameters:
*	a {number} the value
* Returns:
*	{boolean} the result
*/
ICEMAN3D.IsPositive = function (a)
{
	return a > ICEMAN3D.Eps;
};

/**
* Function: IsNegative 是否负数
* Description: Determines if the given value is negative. Uses epsilon for comparison.
* Parameters:
*	a {number} the value
* Returns:
*	{boolean} the result
*/
ICEMAN3D.IsNegative = function (a)
{
	return a < -ICEMAN3D.Eps;
};

/**
* Function: IsLower
* Description: Determines if a value is lower than an other. Uses epsilon for comparison.
* Parameters:
*	a {number} first value
*	b {number} second value
* Returns:
*	{boolean} the result
*/
ICEMAN3D.IsLower = function (a, b)
{
	return b - a > ICEMAN3D.Eps;
};

/**
* Function: IsGreater
* Description: Determines if a value is greater than an other. Uses epsilon for comparison.
* Parameters:
*	a {number} first value
*	b {number} second value
* Returns:
*	{boolean} the result
*/
ICEMAN3D.IsGreater = function (a, b)
{
	return a - b > ICEMAN3D.Eps;
};

/**
* Function: IsEqual
* Description: Determines if two values are equal. Uses epsilon for comparison.
* Parameters:
*	a {number} first value
*	b {number} second value
* Returns:
*	{boolean} the result
*/
ICEMAN3D.IsEqual = function (a, b)
{
	return Math.abs (b - a) < ICEMAN3D.Eps;
};

/**
* Function: IsEqualWithEps
* Description: Determines if two values are equal. Uses the given epsilon for comparison.
* Parameters:
*	a {number} first value
*	b {number} second value
*	eps {number} epsilon value
* Returns:
*	{boolean} the result
*/
ICEMAN3D.IsEqualWithEps = function (a, b, eps)
{
	return Math.abs (b - a) < eps;
};

/**
* Function: IsLowerOrEqual
* Description: Determines if a value is lower or equal to an other. Uses epsilon for comparison.
* Parameters:
*	a {number} first value
*	b {number} second value
* Returns:
*	{boolean} the result
*/
ICEMAN3D.IsLowerOrEqual = function (a, b)
{
	return ICEMAN3D.IsLower (a, b) || ICEMAN3D.IsEqual (a, b);
};

/**
* Function: IsGreaterOrEqual
* Description: Determines if a value is greater or equal to an other. Uses epsilon for comparison.
* Parameters:
*	a {number} first value
*	b {number} second value
* Returns:
*	{boolean} the result
*/
ICEMAN3D.IsGreaterOrEqual = function (a, b)
{
	return ICEMAN3D.IsGreater (a, b) || ICEMAN3D.IsEqual (a, b);
};

/**
* Function: Minimum
* Description: Returns the minimum of two values. Uses epsilon for comparison.
* Parameters:
*	a {number} first value
*	b {number} second value
* Returns:
*	{number} the result
*/
ICEMAN3D.Minimum = function (a, b)
{
	return ICEMAN3D.IsLower (a, b) ? a : b;
};

/**
* Function: Maximum
* Description: Returns the maximum of two values. Uses epsilon for comparison.
* Parameters:
*	a {number} first value
*	b {number} second value
* Returns:
*	{number} the result
*/
ICEMAN3D.Maximum = function (a, b)
{
	return ICEMAN3D.IsGreater (a, b) ? a : b;
};

/**
* Function: ArcSin //反正弦
* Description: Calculates the arcus sinus value.
* Parameters:
*	value {number} the value
* Returns:
*	{number} the result
*/
ICEMAN3D.ArcSin = function (value)
{
	if (ICEMAN3D.IsGreaterOrEqual (value, 1.0)) {
		return Math.PI / 2.0;
	} else if (ICEMAN3D.IsLowerOrEqual (value, -1.0)) {
		return - Math.PI / 2.0;
	}
	
	return Math.asin (value);
};

/**
* Function: ArcCos 反余弦
* Description: Calculates the arcus cosinus value.
* Parameters:
*	value {number} the value
* Returns:
*	{number} the result
*/
ICEMAN3D.ArcCos = function (value)
{
	if (ICEMAN3D.IsGreaterOrEqual (value, 1.0)) {
		return 0.0;
	} else if (ICEMAN3D.IsLowerOrEqual (value, -1.0)) {
		return Math.PI;
	}
	
	return Math.acos (value);
};

/**
* Function: RandomNumber
* Description: Generates a random number between two numbers.
* Parameters:
*	from {number} lowest random result
*	to {number} highest random result
* Returns:
*	{number} the result
*/
ICEMAN3D.RandomNumber = function (from, to)
{
	return Math.random () * (to - from) + from;
};

/**
* Function: RandomInt 随机整数
* Description: Generates a random integer between two integers.
* Parameters:
*	from {integer} lowest random result
*	to {integer} highest random result
* Returns:
*	{integer} the result
*/
ICEMAN3D.RandomInt = function (from, to)
{
	return Math.floor ((Math.random () * (to - from + 1)) + from);
};

/**
* Function: SeededRandomInt
* Description: Generates a random integer between two integers. A seed number can be specified.
* Parameters:
*	from {integer} lowest random result
*	to {integer} highest random result
*	seed {integer} seed value
* Returns:
*	{integer} the result
*/
ICEMAN3D.SeededRandomInt = function (from, to, seed)
{
    var random = ((seed * 9301 + 49297) % 233280) / 233280;
	return Math.floor ((random * (to - from + 1)) + from);
};

/**
* Function: ValueOrDefault
* Description: Returns the given value, or a default if it is undefined.
* Parameters:
*	val {anything} new value
*	def {anything} default value
* Returns:
*	{anything} the result
*/
ICEMAN3D.ValueOrDefault = function (val, def)
{
	if (val === undefined || val === null) {
		return def;
	}
	return val;
};

/**
* Function: CopyObjectProperties
* Description: Copies one object properties to another object.
* Parameters:
*	source {anything} source object
*	target {anything} target object
*	overwrite {boolean} overwrite existing properties
*/
ICEMAN3D.CopyObjectProperties = function (source, target, overwrite)
{
	if (source === undefined || source === null ||target === undefined || target === null)
	{
		return;
	}

	var property;
	for (property in source) {
		if (source.hasOwnProperty (property)) {
			if (overwrite || target[property] === undefined || target[property] === null) {
				target[property] = source[property];
			}
		}
	}
};

/**
* Function: Assert
* Description: Shows up an alert with the given message if the condition is false.
* Parameters:
*	condition {boolean} the condition to check
*	message {string} error message
*/
ICEMAN3D.Assert = function (condition, message)
{
	if (!condition) {
		var alertText = 'Assertion failed.';
		if (message !== undefined && message !== null) {
			alertText += ' ' + message;
		}
		alert (alertText);
	}
};

ICEMAN3D.IsWebGLEnabled = function() {
	if (!window.WebGLRenderingContext) {
		return false;
	}

	try {
		var canvas = document.createElement('canvas');
		if (!canvas.getContext('experimental-webgl') && !canvas.getContext('webgl')) { //experimental-webgl 实验阶段 标准未确定的时候
                        this.GetWebGLErrorMessage();
			return false;
		}
	} catch (exception) {
		return false;
	}

	return true;
};

ICEMAN3D.IsFileApiEnabled = function() {
	if (!window.File || !window.FileReader || !window.FileList || !window.Blob || !window.URL) {
		return false;
	}

	return true;
};

ICEMAN3D.GetWebGLErrorMessage = function () {
    
        var element = document.createElement( 'div' );
        element.id = 'webgl-error-message';
        element.style.fontFamily = 'monospace';
        element.style.fontSize = '14px';
        element.style.fontWeight = 'normal';
        element.style.textAlign = 'center';
        element.style.background = '#fff';
        element.style.color = '#ff0000';
        element.style.padding = '1.5em 0';
        element.style.width = '660px';
        element.style.margin = '5em auto 0';
        element.style.position = 'absolute';
        element.style.top = '0';
        element.innerHTML = window.WebGLRenderingContext ? [
                'Your graphics card does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br />',
                'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.<br /><br />',
                '您的显卡不支持 <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br />',
                '如何解决请 <a href="http://get.webgl.org/" style="color:#000">查看</a>.'
        ].join( '\n' ) : [
                'Your browser does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br/>',
                'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.<br /><br />',
                '您的浏览器不支持 <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">3D渲染</a>.<br />',
                '请升级您的浏览器至 Chrome谷歌浏览器、360极速、火狐、Safari等其他浏览器.'
        ].join( '\n' );

        document.getElementById('container').appendChild( element );
};

/**
* Core End
*/

/**
* Class: Coord2D
* Description: Represents a 2D coordinate.
* Parameters:
*	x {number} the first component
*	y {number} the second component
*/
ICEMAN3D.Coord2D = function (x, y)
{
	this.x = x;
	this.y = y;
};

/**
* Function: Coord2D.Set
* Description: Sets the coordinate.
* Parameters:
*	x {number} the first component
*	y {number} the second component
*/
ICEMAN3D.Coord2D.prototype.Set = function (x, y)
{
	this.x = x;
	this.y = y;
};

/**
* Function: Coord2D.ToString
* Description: Converts the coordinate values to string.
* Returns:
*	{string} the string representation of the coordinate
*/
ICEMAN3D.Coord2D.prototype.ToString = function ()
{
	return ('(' + this.x + ', ' + this.y + ')');
};

/**
* Function: Coord2D.Clone
* Description: Clones the coordinate.
* Returns:
*	{Coord2D} a cloned instance
*/
ICEMAN3D.Coord2D.prototype.Clone = function ()
{
	return new ICEMAN3D.Coord2D (this.x, this.y);
};

/**
* Class: PolarCoord
* Description: Represents a 2D polar coordinate.
* Parameters:
*	radius {number} the first component
*	angle {number} the second component
*/
ICEMAN3D.PolarCoord = function (radius, angle)
{
	this.radius = radius;
	this.angle = angle;
};

/**
* Function: PolarCoord.Set
* Description: Sets the coordinate.
* Parameters:
*	radius {number} the first component
*	angle {number} the second component
*/
ICEMAN3D.PolarCoord.prototype.Set = function (radius, angle)
{
	this.radius = radius;
	this.angle = angle;
};

/**
* Function: PolarCoord.ToString
* Description: Converts the coordinate values to string.
* Returns:
*	{string} the string representation of the coordinate
*/
ICEMAN3D.PolarCoord.prototype.ToString = function ()
{
	return ('(' + this.radius + ', ' + this.angle + ')');
};

/**
* Function: PolarCoord.Clone
* Description: Clones the coordinate.
* Returns:
*	{PolarCoord} a cloned instance
*/
ICEMAN3D.PolarCoord.prototype.Clone = function ()
{
	return new ICEMAN3D.PolarCoord (this.radius, this.angle);
};

/**
* Class: Coord
* Description: Represents a 3D coordinate.
* Parameters:
*	x {number} the first component
*	y {number} the second component
*	z {number} the third component
*/
ICEMAN3D.Coord = function (x, y, z)
{
	this.x = x;
	this.y = y;
	this.z = z;
};

/**
* Function: Coord.Set
* Description: Sets the coordinate.
* Parameters:
*	x {number} the first component
*	y {number} the second component
*	z {number} the third component
*/
ICEMAN3D.Coord.prototype.Set = function (x, y, z)
{
	this.x = x;
	this.y = y;
	this.z = z;
};

/**
* Function: Coord.ToString
* Description: Converts the coordinate values to string.
* Returns:
*	{string} the string representation of the coordinate
*/
ICEMAN3D.Coord.prototype.ToString = function ()
{
	return ('(' + this.x + ', ' + this.y + ', ' + this.z + ')');
};

/**
* Function: Coord.Clone
* Description: Clones the coordinate.
* Returns:
*	{Coord} a cloned instance
*/
ICEMAN3D.Coord.prototype.Clone = function ()
{
	return new ICEMAN3D.Coord (this.x, this.y, this.z);
};

/**
* Class: SphericalCoord
* Description: Represents a 3D spherical coordinate.
* Parameters:
*	radius {number} the first component
*	theta {number} the second component
*	phi {number} the third component
*/
ICEMAN3D.SphericalCoord = function (radius, theta, phi)
{
	this.radius = radius;
	this.theta = theta;
	this.phi = phi;
};

/**
* Function: SphericalCoord.Set
* Description: Sets the coordinate.
* Parameters:
*	radius {number} the first component
*	theta {number} the second component
*	phi {number} the third component
*/
ICEMAN3D.SphericalCoord.prototype.Set = function (radius, theta, phi)
{
	this.radius = radius;
	this.theta = theta;
	this.phi = phi;
};

/**
* Function: SphericalCoord.ToString
* Description: Converts the coordinate values to string.
* Returns:
*	{string} the string representation of the coordinate
*/
ICEMAN3D.SphericalCoord.prototype.ToString = function ()
{
	return ('(' + this.radius + ', ' + this.theta + ', ' + this.phi + ')');
};

/**
* Function: SphericalCoord.Clone
* Description: Clones the coordinate.
* Returns:
*	{SphericalCoord} a cloned instance
*/
ICEMAN3D.SphericalCoord.prototype.Clone = function ()
{
	return new ICEMAN3D.SphericalCoord (this.radius, this.theta, this.phi);
};

/**
* Class: Vector2D
* Description: Same as Coord2D.
*/
ICEMAN3D.Vector2D = ICEMAN3D.Coord2D;

/**
* Class: Vector
* Description: Same as Coord.
*/
ICEMAN3D.Vector = ICEMAN3D.Coord;

/**
* Coord End
*/

/**
* Function: CoordFromArray
* Description: Returns a coordinate from an array of components.
* Parameters:
*	array {number[3]} the array of components
* Returns:
*	{Coord} the result
*/
ICEMAN3D.CoordFromArray = function (array)
{
	return new ICEMAN3D.Coord (array[0], array[1], array[2]);
};

/**
* Function: CoordToArray
* Description: Returns array of components from a coordinate.
* Parameters:
*	coord {Coord} the coordinate
* Returns:
*	array {number[3]} the result
*/
ICEMAN3D.CoordToArray = function (coord)
{
	return [coord.x, coord.y, coord.z];
};

/**
* Function: CoordIsEqual
* Description: Determines if the given coordinates are equal.
* Parameters:
*	a {Coord} first coordinate
*	b {Coord} second coordinate
* Returns:
*	{boolean} the result
*/
ICEMAN3D.CoordIsEqual = function (a, b)
{
	return ICEMAN3D.IsEqual (a.x, b.x) && ICEMAN3D.IsEqual (a.y, b.y) && ICEMAN3D.IsEqual (a.z, b.z);
};

/**
* Function: CoordIsEqualWithEps
* Description: Determines if the given coordinates are equal. Uses the given epsilon for comparison.
* Parameters:
*	a {Coord} first coordinate
*	b {Coord} second coordinate
*	eps {number} epsilon value
* Returns:
*	{boolean} the result
*/
ICEMAN3D.CoordIsEqualWithEps = function (a, b, eps)
{
	return ICEMAN3D.IsEqualWithEps (a.x, b.x, eps) && ICEMAN3D.IsEqualWithEps (a.y, b.y, eps) && ICEMAN3D.IsEqualWithEps (a.z, b.z, eps);
};


/**
* Function: CoordAdd
* Description: Adds two coordinates.
* Parameters:
*	a {Coord} the first coordinate
*	b {Coord} the second coordinate
* Returns:
*	{Coord} the result
*/
ICEMAN3D.CoordAdd = function (a, b)
{
	return new ICEMAN3D.Coord (a.x + b.x, a.y + b.y, a.z + b.z);
};

/**
* Function: CoordSub
* Description: Subs two coordinates.
* Parameters:
*	a {Coord} the first coordinate
*	b {Coord} the second coordinate
* Returns:
*	{Coord} the result
*/
ICEMAN3D.CoordSub = function (a, b)
{
	return new ICEMAN3D.Coord (a.x - b.x, a.y - b.y, a.z - b.z);
};

/**
* Function: SphericalCoordIsEqual
* Description: Determines if the given coordinates are equal.
* Parameters:
*	a {SpericalCoord} first coordinate
*	b {SpericalCoord} second coordinate
* Returns:
*	{boolean} the result
*/
ICEMAN3D.SphericalCoordIsEqual = function (a, b)
{
	return ICEMAN3D.IsEqual (a.radius, b.radius) && ICEMAN3D.IsEqual (a.phi, b.phi) && ICEMAN3D.IsEqual (a.theta, b.theta);
};

/**
* Function: CoordDistance
* Description: Calculates the distance of two coordinates.
* Parameters:
*	a {Coord} first coordinate
*	b {Coord} second coordinate
* Returns:
*	{number} the result
*/
ICEMAN3D.CoordDistance = function (a, b)
{
	var x1 = a.x;
	var y1 = a.y;
	var z1 = a.z;
	var x2 = b.x;
	var y2 = b.y;
	var z2 = b.z;

	return Math.sqrt ((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1) + (z2 - z1) * (z2 - z1));
};

/**
* Function: CoordSignedDistance
* Description: Calculates the distance of two coordinates along a direction vector.
* Parameters:
*	a {Coord} first coordinate
*	b {Coord} second coordinate
*	direction {Vector} direction vector
* Returns:
*	{number} the result
*/
ICEMAN3D.CoordSignedDistance = function (a, b, direction)
{
	var abDirection = ICEMAN3D.CoordSub (b, a);
	var distance = ICEMAN3D.CoordDistance (a, b);
	
	var angle = ICEMAN3D.GetVectorsAngle (abDirection, direction);
	if (ICEMAN3D.IsPositive (angle)) {
		distance = -distance;
	}

	return distance;
};

/**
* Function: MidCoord
* Description: Calculates the coordinate in the middle of two coordinates.
* Parameters:
*	a {Coord} first coordinate
*	b {Coord} second coordinate
* Returns:
*	{Coord} the result
*/
ICEMAN3D.MidCoord = function (a, b)
{
	return new ICEMAN3D.Coord ((a.x + b.x) / 2.0, (a.y + b.y) / 2.0, (a.z + b.z) / 2.0);
};

/**
* Function: VectorMultiply
* Description: Multiplies a vector with a scalar.
* Parameters:
*	vector {Vector} the vector
*	scalar {number} the scalar
* Returns:
*	{Vector} the result
*/
ICEMAN3D.VectorMultiply = function (vector, scalar)
{
	var result = new ICEMAN3D.Vector (0.0, 0.0, 0.0);
	result.x = vector.x * scalar;
	result.y = vector.y * scalar;
	result.z = vector.z * scalar;
	return result;
};

/**
* Function: VectorDot
* Description: Calculates the dot product of two vectors.
* Parameters:
*	a {Vector} the first vector
*	b {Vector} the second vector
* Returns:
*	{number} the result
*/
ICEMAN3D.VectorDot = function (a, b)
{
	return a.x * b.x + a.y * b.y + a.z * b.z;
};

/**
* Function: VectorCross
* Description: Calculates the cross product of two vectors.
* Parameters:
*	a {Vector} the first vector
*	b {Vector} the second vector
* Returns:
*	{Vector} the result
*/
ICEMAN3D.VectorCross = function (a, b)
{
	var result = new ICEMAN3D.Vector (0.0, 0.0, 0.0);
	result.x = a.y * b.z - a.z * b.y;
	result.y = a.z * b.x - a.x * b.z;
	result.z = a.x * b.y - a.y * b.x;
	return result;
};

/**
* Function: VectorLength
* Description: Calculates length of a vector.
* Parameters:
*	vector {Vector} the vector
* Returns:
*	{number} the result
*/
ICEMAN3D.VectorLength = function (vector)
{
	var x = vector.x;
	var y = vector.y;
	var z = vector.z;

	return Math.sqrt (x * x + y * y + z * z);
};

/**
* Function: VectorNormalize
* Description: Normalize a vector.
* Parameters:
*	vector {Vector} the vector
* Returns:
*	{Vector} the result
*/
ICEMAN3D.VectorNormalize = function (vector)
{
	var length = ICEMAN3D.VectorLength (vector);
	var result = new ICEMAN3D.Vector (0.0, 0.0, 0.0);
	if (ICEMAN3D.IsGreater (length, 0.0)) {
		result = ICEMAN3D.VectorMultiply (vector, 1.0 / length);
	}
	return result;
};

/**
* Function: VectorSetLength
* Description: Sets the length of a vector.
* Parameters:
*	vector {Vector} the vector
*	length {number} the length
* Returns:
*	{Vector} the result
*/
ICEMAN3D.VectorSetLength = function (vector, length)
{
	var ratio = length / ICEMAN3D.VectorLength (vector);
	var result = ICEMAN3D.VectorMultiply (vector, ratio);
	return result;
};


/**
* Function: CoordOffset
* Description: Offsets a coordinate.
* Parameters:
*	coord {Coord} the coordinate
*	direction {Vector} the direction of the offset
*	distance {number} the distance of the offset
* Returns:
*	{Coord} the result
*/
ICEMAN3D.CoordOffset = function (coord, direction, distance)
{
	var normal = ICEMAN3D.VectorNormalize (direction);
	var result = new ICEMAN3D.Coord (0.0, 0.0, 0.0);
	result.x = coord.x + normal.x * distance;
	result.y = coord.y + normal.y * distance;
	result.z = coord.z + normal.z * distance;
	return result;
};

/**
* Function: CoordRotate
* Description: Rotates a coordinate.
* Parameters:
*	coord {Coord} the coordinate
*	axis {Vector} the axis of the rotation
*	angle {number} the angle of the rotation
*	origo {Coord} the origo of the rotation
* Returns:
*	{Coord} the result
*/
ICEMAN3D.CoordRotate = function (coord, axis, angle, origo)
{
	var offseted = ICEMAN3D.CoordSub (coord, origo);
	var normal = ICEMAN3D.VectorNormalize (axis);

	var u = normal.x;
	var v = normal.y;
	var w = normal.z;

	var x = offseted.x;
	var y = offseted.y;
	var z = offseted.z;

	var si = Math.sin (angle);
	var co = Math.cos (angle);
	var result = new ICEMAN3D.Coord (0.0, 0.0, 0.0);
	result.x = - u * (- u * x - v * y - w * z) * (1.0 - co) + x * co + (- w * y + v * z) * si;
	result.y = - v * (- u * x - v * y - w * z) * (1.0 - co) + y * co + (w * x - u * z) * si;
	result.z = - w * (- u * x - v * y - w * z) * (1.0 - co) + z * co + (- v * x + u * y) * si;
	
	result = ICEMAN3D.CoordAdd (result, origo);
	return result;
};

/**
* Function: GetVectorsAngle
* Description: Calculates the angle of two vectors.
* Parameters:
*	a {Vector} the first vector
*	b {Vector} the second vector
* Returns:
*	{number} the result
*/
ICEMAN3D.GetVectorsAngle = function (a, b)
{
	var aDirection = ICEMAN3D.VectorNormalize (a);
	var bDirection = ICEMAN3D.VectorNormalize (b);
	if (ICEMAN3D.CoordIsEqual (aDirection, bDirection)) {
		return 0.0;
	}
	
	var product = ICEMAN3D.VectorDot (aDirection, bDirection);
	return ICEMAN3D.ArcCos (product);
};

/**
* Function: GetVectorsFullAngle
* Description: Calculates the full angle (0 to pi) of two vectors with the given normal vector.
* Parameters:
*	a {Vector} the first vector
*	b {Vector} the second vector
*	normal {Vector} the normal vector
* Returns:
*	{number} the result
*/
ICEMAN3D.GetVectorsFullAngle = function (a, b, normal)
{
	var angle = ICEMAN3D.GetVectorsAngle (a, b);
	var origo = new ICEMAN3D.Coord (0.0, 0.0, 0.0);
	
	if (ICEMAN3D.CoordTurnType (a, origo, b, normal) == 'Clockwise') {
		angle = 2.0 * Math.PI - angle;
	}
	
	return angle;
};

/**
* Function: VectorsAreCollinear
* Description: Determines if two vectors are collinear.
* Parameters:
*	a {Vector} the first vector
*	b {Vector} the second vector
* Returns:
*	{boolean} the result
*/
ICEMAN3D.VectorsAreCollinear = function (a, b)
{
	var angle = ICEMAN3D.GetVectorsAngle (a, b);
	return ICEMAN3D.IsEqual (angle, 0.0) || ICEMAN3D.IsEqual (angle, Math.PI);
};

/**
* Function: GetCoord2DFromCoord
* Description: Transforms a 3D coordinate to a 2D coordinate.
* Parameters:
*	coord {Coord} the coordinate
*	origo {Coord} the origo of transformation
*	normal {Vector} the normal vector of transformation
* Returns:
*	{Coord2D} the result
*/
ICEMAN3D.GetCoord2DFromCoord = function (coord, origo, normal)
{
	var zNormal = new ICEMAN3D.Vector (0.0, 0.0, 1.0);
	var axis = ICEMAN3D.VectorCross (normal, zNormal);
	var angle = ICEMAN3D.GetVectorsAngle (normal, zNormal);

	var rotated = ICEMAN3D.CoordRotate (coord, axis, angle, origo);
	return new ICEMAN3D.Coord2D (rotated.x, rotated.y);
};

/**
* Function: CoordTurnType
* Description: Calculates the turn type of three coordinates.
* Parameters:
*	a {Coord} the first coordinate
*	b {Coord} the second coordinate
*	c {Coord} the third coordinate
*	normal {Vector} normal vector for calculation
* Returns:
*	{string} 'CounterClockwise', 'Clockwise', or 'Collinear'
*/
ICEMAN3D.CoordTurnType = function (a, b, c, normal)
{
	var origo = new ICEMAN3D.Coord (0.0, 0.0, 0.0);
	var a2 = ICEMAN3D.GetCoord2DFromCoord (a, origo, normal);
	var b2 = ICEMAN3D.GetCoord2DFromCoord (b, origo, normal);
	var c2 = ICEMAN3D.GetCoord2DFromCoord (c, origo, normal);
	var turnType = ICEMAN3D.CoordTurnType2D (a2, b2, c2);

	var zNormal = new ICEMAN3D.Vector (0.0, 0.0, 1.0);
	var angle = ICEMAN3D.GetVectorsAngle (normal, zNormal);
	if (ICEMAN3D.IsEqual (angle, Math.PI)) {
		if (turnType === 'CounterClockwise') {
			turnType = 'Clockwise';
		} else if (turnType === 'Clockwise') {
			turnType = 'CounterClockwise';
		}
	}
	
	return turnType;
};

/**
* Function: CalculateCentroid
* Description: Calculates center points of the given coordinates.
* Parameters:
*	coords {Coord[*]} the array of coordinates
* Returns:
*	{Coord} the result
*/
ICEMAN3D.CalculateCentroid = function (coords)
{
	var count = coords.length;
	var centroid = new ICEMAN3D.Coord (0.0, 0.0, 0.0);
	if (count >= 1) {
		var i;
		for (i = 0; i < count; i++) {
			centroid = ICEMAN3D.CoordAdd (centroid, coords[i]);
		}
		centroid = ICEMAN3D.VectorMultiply (centroid, 1.0 / count);
	}

	return centroid;
};

/**
* Function: CalculateTriangleNormal
* Description: Calculates normal vector for the given triangle vertices.
* Parameters:
*	v0 {Coord} the first vertex of the triangle
*	v1 {Coord} the second vertex of the triangle
*	v2 {Coord} the third vertex of the triangle
* Returns:
*	{Vector} the result
*/
ICEMAN3D.CalculateTriangleNormal = function (v0, v1, v2)
{
	var v = ICEMAN3D.CoordSub (v1, v0);
	var w = ICEMAN3D.CoordSub (v2, v0);
	
	var normal = new ICEMAN3D.Vector (0.0, 0.0, 0.0);
	normal.x = (v.y * w.z - v.z * w.y);
	normal.y = (v.z * w.x - v.x * w.z);
	normal.z = (v.x * w.y - v.y * w.x);

	var normalized = ICEMAN3D.VectorNormalize (normal);
	return normalized;
};

/**
* Function: CalculateNormal
* Description: Calculates normal vector for the given coordinates.
* Parameters:
*	coords {Coord[*]} the array of coordinates
* Returns:
*	{Vector} the result
*/
ICEMAN3D.CalculateNormal = function (coords)
{
	var count = coords.length;
	var normal = new ICEMAN3D.Vector (0.0, 0.0, 0.0);
	if (count >= 3) {
		var i, currentIndex, nextIndex;
		var current, next;
		for (i = 0; i < count; i++) {
			currentIndex = i % count;
			nextIndex = (i + 1) % count;
	
			current = coords[currentIndex];
			next = coords[nextIndex];
	
			normal.x += (current.y - next.y) * (current.z + next.z);
			normal.y += (current.z - next.z) * (current.x + next.x);
			normal.z += (current.x - next.x) * (current.y + next.y);
		}
	}

	var normalized = ICEMAN3D.VectorNormalize (normal);
	return normalized;
};

/**
* Function: BarycentricInterpolation
* Description: Calculates barycentric interpolation for the given values.
* Parameters:
*	vertex0, vertex1, vertex2 {Coord} the vertices of interpolation
*	value0, value1, value2 {Coord} the values to interpolate
*	position {Coord} the position of interpolation
* Returns:
*	{Coord} the result
*/
ICEMAN3D.BarycentricInterpolation = function (vertex0, vertex1, vertex2, value0, value1, value2, position)
{
	function GetTriangleArea (a, b, c)
	{
		var s = (a + b + c) / 2.0;
		var areaSquare = s * (s - a) * (s - b) * (s - c);
		if (areaSquare < 0.0) {
			return 0.0;
		}
		return Math.sqrt (areaSquare);
	}
	
	var edge0 = ICEMAN3D.CoordDistance (vertex0, vertex1);
	var edge1 = ICEMAN3D.CoordDistance (vertex1, vertex2);
	var edge2 = ICEMAN3D.CoordDistance (vertex2, vertex0);
	
	var distance0 = ICEMAN3D.CoordDistance (vertex0, position);
	var distance1 = ICEMAN3D.CoordDistance (vertex1, position);
	var distance2 = ICEMAN3D.CoordDistance (vertex2, position);
	
	var area = GetTriangleArea (edge0, edge1, edge2);
	if (ICEMAN3D.IsZero (area)) {
		return value0;
	}
	
	var area0 = GetTriangleArea (edge0, distance0, distance1);
	var area1 = GetTriangleArea (edge1, distance1, distance2);
	var area2 = GetTriangleArea (edge2, distance0, distance2);
	
	var interpolated0 = ICEMAN3D.VectorMultiply (value0, area1);
	var interpolated1 = ICEMAN3D.VectorMultiply (value1, area2);
	var interpolated2 = ICEMAN3D.VectorMultiply (value2, area0);
	var interpolated = ICEMAN3D.CoordAdd (ICEMAN3D.CoordAdd (interpolated0, interpolated1), interpolated2);
	return ICEMAN3D.VectorMultiply (interpolated, 1.0 / area);
};

/**
* Function: SphericalToCartesian
* Description: Converts a spherical coordinate to a cartesian coordinate.
* Parameters:
*	radius {number} the radius component
*	theta {number} the angle component
*	phi {number} the phi component
* Returns:
*	{Coord} the result
*/
ICEMAN3D.SphericalToCartesian = function (radius, theta, phi)
{
	var result = new ICEMAN3D.Coord (0.0, 0.0, 0.0);
	result.x = radius * Math.sin (theta) * Math.cos (phi);
	result.y = radius * Math.sin (theta) * Math.sin (phi);
	result.z = radius * Math.cos (theta);
	return result;
};

/**
* Function: CartesianToSpherical
* Description: Converts a cartesian coordinate to a spherical coordinate.
* Parameters:
*	x {number} the x component
*	y {number} the y component
*	z {number} the z component
* Returns:
*	{SphericalCoord} the result
*/
ICEMAN3D.CartesianToSpherical = function (x, y, z)
{
	var result = new ICEMAN3D.SphericalCoord (0.0, 0.0, 0.0);
	result.radius = Math.sqrt (x * x + y * y + z * z);
	if (ICEMAN3D.IsZero (result.radius)) {
		return result;
	}
	result.theta = Math.acos (z / result.radius);
	result.phi = Math.atan2 (y, x);
	return result;
};

/**
* Function: SphericalToCartesianWithOrigo
* Description: Converts a spherical coordinate to a cartesian coordinate with the given origo.
* Parameters:
*	spherical {SphericalCoord} the coordinate
*	origo {Coord} the origo
* Returns:
*	{Coord} the result
*/
ICEMAN3D.SphericalToCartesianWithOrigo = function (spherical, origo)
{
	var cartesian = ICEMAN3D.SphericalToCartesian (spherical.radius, spherical.theta, spherical.phi);
	var offseted = ICEMAN3D.CoordAdd (cartesian, origo);
	return offseted;
};

/**
* Function: CartesianToSphericalWithOrigo
* Description: Converts a cartesian coordinate to a spherical coordinate with the given origo.
* Parameters:
*	cartesian {Coord} the coordinate
*	origo {Coord} the origo
* Returns:
*	{SphericalCoord} the result
*/
ICEMAN3D.CartesianToSphericalWithOrigo = function (cartesian, origo)
{
	var offseted = ICEMAN3D.CoordSub (cartesian, origo);
	var spherical = ICEMAN3D.CartesianToSpherical (offseted.x, offseted.y, offseted.z);
	return spherical;
};

/**
* Function: MoveCoordOnSphere
* Description: Moves a coordinate on a surface of a sphere with the given angles.
* Parameters:
*	coord {Coord} the coordinate
*	origo {Coord} the origo
*	thetaAngle {number} the theta angle
*	phiAngle {number} the phi angle
* Returns:
*	{Coord} the result
*/
ICEMAN3D.MoveCoordOnSphere = function (coord, origo, thetaAngle, phiAngle)
{
	var spherical = ICEMAN3D.CartesianToSphericalWithOrigo (coord, origo);
	spherical.theta += thetaAngle;
	spherical.phi += phiAngle;
	var cartesian = ICEMAN3D.SphericalToCartesianWithOrigo (spherical, origo);
	return cartesian;
};

/**
* Function: CylindricalToCartesian
* Description: Converts a cylindrical coordinate to a cartesian coordinate.
* Parameters:
*	radius {number} the radius component
*	height {number} the height component
*	theta {number} the theta component
* Returns:
*	{Coord} the result
*/
ICEMAN3D.CylindricalToCartesian = function (radius, height, theta)
{
	var result = new ICEMAN3D.Coord (0.0, 0.0, 0.0);
	result.x = radius * Math.cos (theta);
	result.y = radius * Math.sin (theta);
	result.z = height;
	return result;
};

/**
* Function: GetArcLength
* Description: Calculates arc length between two vectors.
* Parameters:
*	a {Vector} the first vector
*	b {Vector} the second vector
*	radius {number} the radius component
* Returns:
*	{number} the result
*/
ICEMAN3D.GetArcLength = function (a, b, radius)
{
	var angle = ICEMAN3D.GetVectorsAngle (a, b);
	return angle * radius;
};

/**
* Function: GetFullArcLength
* Description: Calculates arc length between two vectors with the given normal vector.
* Parameters:
*	a {Vector} the first vector
*	b {Vector} the second vector
*	radius {number} the radius component
*	normal {Vector} the normal vector
* Returns:
*	{number} the result
*/
ICEMAN3D.GetFullArcLength = function (a, b, radius, normal)
{
	var angle = ICEMAN3D.GetVectorsFullAngle (a, b, normal);
	return angle * radius;
};

/**
* Coordutils End
*/

/**
* Class: Camera
* Description: Represents a camera.
* Parameters:
*	eye {Coord} the eye position
*	center {Coord} the center position
*	up {Vector} the up vector
*	fieldOfView {number} field of view in degree
*	nearClippingPlane {number} near clipping plane distance
*	farClippingPlane {number} far clipping plane distance
*/
ICEMAN3D.Camera = function (eye, center, up, fieldOfView, nearClippingPlane, farClippingPlane)
{
	this.eye = ICEMAN3D.ValueOrDefault (eye, new ICEMAN3D.Coord (1.0, 1.0, 1.0));
	this.center = ICEMAN3D.ValueOrDefault (center, new ICEMAN3D.Coord (0.0, 0.0, 0.0));
	this.up = ICEMAN3D.ValueOrDefault (up, new ICEMAN3D.Vector (0.0, 0.0, 1.0));
	this.fieldOfView = ICEMAN3D.ValueOrDefault (fieldOfView, 45.0);
	this.nearClippingPlane = ICEMAN3D.ValueOrDefault (nearClippingPlane, 0.1);
	this.farClippingPlane = ICEMAN3D.ValueOrDefault (farClippingPlane, 1000.0);
};

/**
* Function: Camera.Set
* Description: Sets the camera.
* Parameters:
*	eye {Coord} the eye position
*	center {Coord} the center position
*	up {Vector} the up vector
*	fieldOfView {number} field of view in degree
*	nearClippingPlane {number} near clipping plane distance
*	farClippingPlane {number} far clipping plane distance
*/
ICEMAN3D.Camera.prototype.Set = function (eye, center, up, fieldOfView, nearClippingPlane, farClippingPlane)
{
	this.eye = eye;
	this.center = center;
	this.up = up;
	this.fieldOfView = ICEMAN3D.ValueOrDefault (fieldOfView, 45.0);
	this.nearClippingPlane = ICEMAN3D.ValueOrDefault (nearClippingPlane, 0.1);
	this.farClippingPlane = ICEMAN3D.ValueOrDefault (farClippingPlane, 1000.0);
};

/**
* Function: Camera.Clone
* Description: Clones the camera.
* Returns:
*	{Camera} a cloned instance
*/
ICEMAN3D.Camera.prototype.Clone = function ()
{
	var result = new ICEMAN3D.Camera ();
	result.eye = this.eye;
	result.center = this.center;
	result.up = this.up;
	result.fieldOfView = this.fieldOfView;
	result.nearClippingPlane = this.nearClippingPlane;
	result.farClippingPlane = this.farClippingPlane;
	return result;
};

/**
* Camera End
*/

ICEMAN3D.Navigation = function ()
{
	this.canvas = null;
	this.camera = null;
	this.drawCallback = null;
	this.resizeCallback = null;
	
	this.mouse = null;
	this.touch = null;
	
	this.cameraFixUp = null;
	this.cameraEnableOrbit = null;
	this.cameraEnablePan = null;
	this.cameraEnableZoom = null;
	this.cameraNearDistanceLimit = null;
	this.cameraFarDistanceLimit = null;
	
	this.orbitCenter = null;
};

ICEMAN3D.Navigation.prototype.Init = function (canvas, camera, drawCallback, resizeCallback)
{
	this.canvas = canvas;
	this.camera = camera;
	this.drawCallback = drawCallback;
	this.resizeCallback = resizeCallback;

	this.mouse = new ICEMAN3D.Mouse ();
	this.touch = new ICEMAN3D.Touch ();
	
	this.cameraFixUp = true;
	this.cameraEnableOrbit = true;
	this.cameraEnablePan = true;
	this.cameraEnableZoom = true;
	this.cameraNearDistanceLimit = 0.1;
	this.cameraFarDistanceLimit = 1000.0;
	
	this.orbitCenter = this.camera.center.Clone ();

	var myThis = this;
	if (document.addEventListener) {
		document.addEventListener ('mousemove', function (event) {myThis.OnMouseMove (event);});
		document.addEventListener ('mouseup', function (event) {myThis.OnMouseUp (event);});
	}
	if (this.canvas.addEventListener) {
		this.canvas.addEventListener ('mousedown', function (event) {myThis.OnMouseDown (event);}, false);
		this.canvas.addEventListener ('DOMMouseScroll', function (event) {myThis.OnMouseWheel (event);}, false);
		this.canvas.addEventListener ('mousewheel', function (event) {myThis.OnMouseWheel (event);}, false);
		this.canvas.addEventListener ('touchstart', function (event) {myThis.OnTouchStart (event);}, false);
		this.canvas.addEventListener ('touchmove', function (event) {myThis.OnTouchMove (event);}, false);
		this.canvas.addEventListener ('touchend', function (event) {myThis.OnTouchEnd (event);}, false);
		this.canvas.addEventListener ('contextmenu', function (event) {myThis.OnContextMenu (event);}, false);
	}
	if (window.addEventListener) {
		window.addEventListener ('resize', function (event) {myThis.OnResize (event);}, false);
	}
	
	return true;
};

ICEMAN3D.Navigation.prototype.SetCamera = function (eye, center, up)
{
	this.camera.Set (eye, center, up);
	this.orbitCenter = this.camera.center.Clone ();
};

ICEMAN3D.Navigation.prototype.EnableFixUp = function (enable)
{
	this.cameraFixUp = enable;
};

ICEMAN3D.Navigation.prototype.EnableOrbit = function (enable)
{
	this.cameraEnableOrbit = enable;
};

ICEMAN3D.Navigation.prototype.EnablePan = function (enable)
{
	this.cameraEnablePan = enable;
};

ICEMAN3D.Navigation.prototype.EnableZoom = function (enable)
{
	this.cameraEnableZoom = enable;
};

ICEMAN3D.Navigation.prototype.SetNearDistanceLimit = function (limit)
{
	this.cameraNearDistanceLimit = limit;
};

ICEMAN3D.Navigation.prototype.SetFarDistanceLimit = function (limit)
{
	this.cameraFarDistanceLimit = limit;
};

ICEMAN3D.Navigation.prototype.SetOrbitCenter = function (orbitCenter)
{
	this.orbitCenter = orbitCenter;
};

ICEMAN3D.Navigation.prototype.FitInWindow = function (center, radius)
{
	var offsetToOrigo = ICEMAN3D.CoordSub (this.camera.center, center);
	this.camera.center = center;
	this.camera.eye = ICEMAN3D.CoordSub (this.camera.eye, offsetToOrigo);
	
	var centerEyeDirection = ICEMAN3D.VectorNormalize (ICEMAN3D.CoordSub (this.camera.eye, this.camera.center));
	var fieldOfView = this.camera.fieldOfView / 2.0;
	if (this.canvas.width < this.canvas.height) {
		fieldOfView = fieldOfView * this.canvas.width / this.canvas.height;
	}
	var distance = radius / Math.sin (fieldOfView * ICEMAN3D.DegRad);
	
	this.camera.eye = ICEMAN3D.CoordOffset (this.camera.center, centerEyeDirection, distance);
	this.orbitCenter = this.camera.center.Clone ();
};

ICEMAN3D.Navigation.prototype.Orbit = function (angleX, angleY)
{
	var radAngleX = angleX * ICEMAN3D.DegRad;
	var radAngleY = angleY * ICEMAN3D.DegRad;
	
	var viewDirection = ICEMAN3D.VectorNormalize (ICEMAN3D.CoordSub (this.camera.center, this.camera.eye));
	var horizontalDirection = ICEMAN3D.VectorNormalize (ICEMAN3D.VectorCross (viewDirection, this.camera.up));
	var differentCenter = !ICEMAN3D.CoordIsEqual (this.orbitCenter, this.camera.center);
	
	if (this.cameraFixUp) {
		var originalAngle = ICEMAN3D.GetVectorsAngle (viewDirection, this.camera.up);
		var newAngle = originalAngle + radAngleY;
		if (ICEMAN3D.IsGreater (newAngle, 0.0) && ICEMAN3D.IsLower (newAngle, Math.PI)) {
			this.camera.eye = ICEMAN3D.CoordRotate (this.camera.eye, horizontalDirection, -radAngleY, this.orbitCenter);
			if (differentCenter) {
				this.camera.center = ICEMAN3D.CoordRotate (this.camera.center, horizontalDirection, -radAngleY, this.orbitCenter);
			}
		}
		this.camera.eye = ICEMAN3D.CoordRotate (this.camera.eye, this.camera.up, -radAngleX, this.orbitCenter);
		if (differentCenter) {
			this.camera.center = ICEMAN3D.CoordRotate (this.camera.center, this.camera.up, -radAngleX, this.orbitCenter);
		}
	} else {
		var verticalDirection = ICEMAN3D.VectorNormalize (ICEMAN3D.VectorCross (horizontalDirection, viewDirection));
		this.camera.eye = ICEMAN3D.CoordRotate (this.camera.eye, horizontalDirection, -radAngleY, this.orbitCenter);
		this.camera.eye = ICEMAN3D.CoordRotate (this.camera.eye, verticalDirection, -radAngleX, this.orbitCenter);
		if (differentCenter) {
			this.camera.center = ICEMAN3D.CoordRotate (this.camera.center, horizontalDirection, -radAngleY, this.orbitCenter);
			this.camera.center = ICEMAN3D.CoordRotate (this.camera.center, verticalDirection, -radAngleX, this.orbitCenter);
		}
		this.camera.up = verticalDirection;
	}
};

ICEMAN3D.Navigation.prototype.Pan = function (moveX, moveY)
{
	var viewDirection = ICEMAN3D.VectorNormalize (ICEMAN3D.CoordSub (this.camera.center, this.camera.eye));
	var horizontalDirection = ICEMAN3D.VectorNormalize (ICEMAN3D.VectorCross (viewDirection, this.camera.up));
	var verticalDirection = ICEMAN3D.VectorNormalize (ICEMAN3D.VectorCross (horizontalDirection, viewDirection));
	
	this.camera.eye = ICEMAN3D.CoordOffset (this.camera.eye, horizontalDirection, -moveX);
	this.camera.center = ICEMAN3D.CoordOffset (this.camera.center, horizontalDirection, -moveX);

	this.camera.eye = ICEMAN3D.CoordOffset (this.camera.eye, verticalDirection, moveY);
	this.camera.center = ICEMAN3D.CoordOffset (this.camera.center, verticalDirection, moveY);
};

ICEMAN3D.Navigation.prototype.Zoom = function (zoomIn)
{
	var direction = ICEMAN3D.CoordSub (this.camera.center, this.camera.eye);
	var distance = ICEMAN3D.VectorLength (direction);
	if (zoomIn && distance < this.cameraNearDistanceLimit) {
		return 0;
	} else if (!zoomIn && distance > this.cameraFarDistanceLimit) {
		return 0;
	}

	var move = distance * 0.1;
	if (!zoomIn) {
		move = move * -1.0;
	}

	this.camera.eye = ICEMAN3D.CoordOffset (this.camera.eye, direction, move);
};

ICEMAN3D.Navigation.prototype.DrawCallback = function ()
{
	if (this.drawCallback !== undefined && this.drawCallback !== null) {
		this.drawCallback ();
	}
};

ICEMAN3D.Navigation.prototype.ResizeCallback = function ()
{
	if (this.resizeCallback !== undefined && this.resizeCallback !== null) {
		this.resizeCallback ();
	}
};

ICEMAN3D.Navigation.prototype.OnMouseDown = function (event)
{
	event.preventDefault ();
	this.mouse.Down (event, this.canvas);
};

ICEMAN3D.Navigation.prototype.OnMouseMove = function (event)
{
	event.preventDefault ();
	this.mouse.Move (event, this.canvas);
	if (!this.mouse.down) {
		return;
	}

	var ratio = 0.0;
	if (this.mouse.button == 1) {
		if (!this.cameraEnableOrbit) {
			return;
		}
		
		ratio = 0.5;
		this.Orbit (this.mouse.diffX * ratio, this.mouse.diffY * ratio);
		this.DrawCallback ();
	} else if (this.mouse.button == 3) {
		if (!this.cameraEnablePan) {
			return;
		}
		
		var eyeCenterDistance = ICEMAN3D.CoordDistance (this.camera.eye, this.camera.center);
		ratio = 0.001 * eyeCenterDistance;
		this.Pan (this.mouse.diffX * ratio, this.mouse.diffY * ratio);
		this.DrawCallback ();
	}
};

ICEMAN3D.Navigation.prototype.OnMouseUp = function (event)
{
	event.preventDefault ();
	this.mouse.Up (event, this.canvas);
};

ICEMAN3D.Navigation.prototype.OnMouseOut = function (event)
{
	event.preventDefault ();
	this.mouse.Out (event, this.canvas);
};

ICEMAN3D.Navigation.prototype.OnMouseWheel = function (event)
{
	event.preventDefault ();
	if (!this.cameraEnableZoom) {
		return;
	}

	var eventParameters = event;
	if (eventParameters === null) {
		eventParameters = window.event;
	}
	
	var delta = 0;
	if (eventParameters.detail) {
		delta = -eventParameters.detail;
	} else if (eventParameters.wheelDelta) {
		delta = eventParameters.wheelDelta / 40;
	}

	var zoomIn = delta > 0;
	this.Zoom (zoomIn);
	this.DrawCallback ();
};

ICEMAN3D.Navigation.prototype.OnTouchStart = function (event)
{
	event.preventDefault ();
	this.touch.Start (event, this.canvas);
};

ICEMAN3D.Navigation.prototype.OnTouchMove = function (event)
{
	event.preventDefault ();
	this.touch.Move (event, this.canvas);
	if (!this.touch.down) {
		return;
	}

	if (!this.cameraEnableOrbit) {
		return;
	}
	
	var ratio = 0.5;
	this.Orbit (this.touch.diffX * ratio, this.touch.diffY * ratio);
	this.DrawCallback ();
};

ICEMAN3D.Navigation.prototype.OnTouchEnd = function (event)
{
	event.preventDefault ();
	this.touch.End (event, this.canvas);
};

ICEMAN3D.Navigation.prototype.OnContextMenu = function (event)
{
	event.preventDefault ();
};

ICEMAN3D.Navigation.prototype.OnResize = function (event)
{
	event.preventDefault ();
	this.ResizeCallback ();
};

/**
* Navigation End
*/

ICEMAN3D.Mouse = function ()
{
	this.down = false;
	this.button = 0;
	this.shift = false;
	this.ctrl = false;
	this.alt = false;
	this.prevX = 0;
	this.prevY = 0;
	this.currX = 0;
	this.currY = 0;
	this.diffX = 0;
	this.diffY = 0;
};

ICEMAN3D.Mouse.prototype.Down = function (event, div)
{
	var eventParameters = event;
	if (eventParameters === undefined) {
		eventParameters = window.event;
	}
	
	this.down = true;
	this.button = event.which;
	this.shift = event.shiftKey;
	this.ctrl = event.ctrlKey;
	this.alt = event.altKey;
	
	this.SetCurrent (eventParameters, div);
	this.prevX = this.currX;
	this.prevY = this.currY;
};

ICEMAN3D.Mouse.prototype.Move = function (event, div)
{
	var eventParameters = event;
	if (eventParameters === undefined) {
		eventParameters = window.event;
	}
	
	this.shift = event.shiftKey;
	this.ctrl = event.ctrlKey;
	this.alt = event.altKey;
	
	this.SetCurrent (eventParameters, div);
	this.diffX = this.currX - this.prevX;
	this.diffY = this.currY - this.prevY;
	this.prevX = this.currX;
	this.prevY = this.currY;
};

ICEMAN3D.Mouse.prototype.Up = function (event, div)
{
	var eventParameters = event;
	if (eventParameters === undefined) {
		eventParameters = window.event;
	}
	
	this.down = false;
	this.SetCurrent (eventParameters, div);
};

ICEMAN3D.Mouse.prototype.Out = function (event, div)
{
	var eventParameters = event;
	if (eventParameters === undefined) {
		eventParameters = window.event;
	}
	
	this.down = false;
	this.SetCurrent (eventParameters, div);
};

ICEMAN3D.Mouse.prototype.SetCurrent = function (eventParameters, div)
{
	this.currX = eventParameters.clientX;
	this.currY = eventParameters.clientY;
	if (div !== undefined && div.offsetLeft !== undefined && div.offsetTop !== undefined) {
		this.currX = this.currX - div.offsetLeft;
		this.currY = this.currY - div.offsetTop;
	}
};

/**
* Mouse End
*/

ICEMAN3D.Touch = function ()
{
	this.down = false;
	this.prevX = 0;
	this.prevY = 0;
	this.currX = 0;
	this.currY = 0;
	this.diffX = 0;
	this.diffY = 0;
};

ICEMAN3D.Touch.prototype.Start = function (event, div)
{
	if (event.touches.length === 0) {
		return;
	}
	var touch = event.touches[0];

	this.down = true;
	this.SetCurrent (touch, div);
	this.prevX = this.currX;
	this.prevY = this.currY;
};

ICEMAN3D.Touch.prototype.Move = function (event, div)
{
	if (event.touches.length === 0) {
		return;
	}
	var touch = event.touches[0];

	this.SetCurrent (touch, div);
	this.diffX = this.currX - this.prevX;
	this.diffY = this.currY - this.prevY;
	this.prevX = this.currX;
	this.prevY = this.currY;
};

ICEMAN3D.Touch.prototype.End = function (event, div)
{
	if (event.touches.length === 0) {
		return;
	}
	var touch = event.touches[0];

	this.down = false;
	this.SetCurrent (touch, div);
};

ICEMAN3D.Touch.prototype.SetCurrent = function (touch, div)
{
	this.currX = touch.pageX;
	this.currY = touch.pageY;
	if (div !== undefined && div.offsetLeft !== undefined && div.offsetTop !== undefined) {
		this.currX = touch.pageX - div.offsetLeft;
		this.currY = touch.pageY - div.offsetTop;
	}
};

/**
* Touch End
*/

/**
* Class: Box2D
* Description: Represents a 2D box.
* Parameters:
*	min {Coord2D} the minimum position of the box
*	max {Coord2D} the maximum position of the box
*/
ICEMAN3D.Box2D = function (min, max)
{
	this.min = min;
	this.max = max;
};

/**
* Function: Box2D.Set
* Description: Sets the box.
* Parameters:
*	min {Coord2D} the minimum position of the box
*	max {Coord2D} the maximum position of the box
*/
ICEMAN3D.Box2D.prototype.Set = function (min, max)
{
	this.min = min;
	this.max = max;
};

/**
* Function: Box2D.GetCenter
* Description: Returns the center point of the box.
* Returns:
*	{Coord2D} the result
*/
ICEMAN3D.Box2D.prototype.GetCenter = function ()
{
	return ICEMAN3D.MidCoord2D (this.min, this.max);
};

/**
* Function: Box2D.Clone
* Description: Clones the box.
* Returns:
*	{Box2D} a cloned instance
*/
ICEMAN3D.Box2D.prototype.Clone = function ()
{
	return new ICEMAN3D.Box2D (this.min.Clone (), this.max.Clone ());
};

/**
* Class: Box
* Description: Represents a 3D box.
* Parameters:
*	min {Coord} the minimum position of the box
*	min {Coord} the maximum position of the box
*/
ICEMAN3D.Box = function (min, max)
{
	this.min = min;
	this.max = max;
};

/**
* Function: Box.Set
* Description: Sets the box.
* Parameters:
*	min {Coord} the minimum position of the box
*	min {Coord} the maximum position of the box
*/
ICEMAN3D.Box.prototype.Set = function (min, max)
{
	this.min = min;
	this.max = max;
};

/**
* Function: Box.GetCenter
* Description: Returns the center point of the box.
* Returns:
*	{Coord} the result
*/
ICEMAN3D.Box.prototype.GetCenter = function ()
{
	return ICEMAN3D.MidCoord (this.min, this.max);
};

/**
* Function: Box.GetSize
* Description: Returns the size of the box.
* Returns:
*	{Coord} the result
*/
ICEMAN3D.Box.prototype.GetSize = function ()
{
	return ICEMAN3D.CoordSub (this.max, this.min);
};

/**
* Function: Box.Clone
* Description: Clones the box.
* Returns:
*	{Box} a cloned instance
*/
ICEMAN3D.Box.prototype.Clone = function ()
{
	return new ICEMAN3D.Box (this.min.Clone (), this.max.Clone ());
};

/**
* Box End
*/

/**
* Class: Sphere
* Description: Represents a sphere.
* Parameters:
*	center {Coord} the center of the sphere
*	radius {number} the radius of the sphere
*/
ICEMAN3D.Sphere = function (center, radius)
{
	this.center = center;
	this.radius = radius;
};

/**
* Function: Sphere.Set
* Description: Sets the sphere.
* Parameters:
*	center {Coord} the center of the sphere
*	radius {number} the radius of the sphere
*/
ICEMAN3D.Sphere.prototype.Set = function (center, radius)
{
	this.center = center;
	this.radius = radius;
};

/**
* Function: Sphere.GetCenter
* Description: Returns the center of the sphere.
* Returns:
*	{Coord} the result
*/
ICEMAN3D.Sphere.prototype.GetCenter = function ()
{
	return this.center;
};

/**
* Function: Sphere.GetRadius
* Description: Returns the radius of the sphere.
* Returns:
*	{number} the result
*/
ICEMAN3D.Sphere.prototype.GetRadius = function ()
{
	return this.radius;
};

/**
* Function: Sphere.Clone
* Description: Clones the sphere.
* Returns:
*	{Sphere} a cloned instance
*/
ICEMAN3D.Sphere.prototype.Clone = function ()
{
	return new ICEMAN3D.Sphere (this.center.Clone (), this.radius);
};

/**
* Sphere End
*/

/**
* Class: Line2D
* Description: Represents a 2D infinite line.
* Parameters:
*	start {Coord2D} the start point of the line
*	direction {Vector2D} the direction of the line
*/
ICEMAN3D.Line2D = function (start, direction)
{
	this.start = start;
	this.direction = direction;
};

/**
* Function: Line2D.Set
* Description: Sets the line.
* Parameters:
*	start {Coord2D} the start point of the line
*	direction {Vector2D} the direction of the line
*/
ICEMAN3D.Line2D.prototype.Set = function (start, direction)
{
	this.start = start;
	this.direction = direction;
};

/**
* Function: Line2D.Clone
* Description: Clones the line.
* Returns:
*	{Line2D} a cloned instance
*/
ICEMAN3D.Line2D.prototype.Clone = function ()
{
	return new ICEMAN3D.Line2D (this.start.Clone (), this.direction.Clone ());
};

/**
* Class: Line
* Description: Represents a 3D infinite line.
* Parameters:
*	start {Coord} the start point of the line
*	direction {Vector} the direction of the line
*/
ICEMAN3D.Line = function (start, direction)
{
	this.start = start;
	this.direction = direction;
};

/**
* Function: Line.Set
* Description: Sets the line.
* Parameters:
*	start {Coord} the start point of the line
*	direction {Vector} the direction of the line
*/
ICEMAN3D.Line.prototype.Set = function (start, direction)
{
	this.start = start;
	this.direction = direction;
};

/**
* Function: Line.Clone
* Description: Clones the line.
* Returns:
*	{Line} a cloned instance
*/
ICEMAN3D.Line.prototype.Clone = function ()
{
	return new ICEMAN3D.Line (this.start.Clone (), this.direction.Clone ());
};

/**
* Line End
*/

/**
* Class: Plane
* Description: Represents a plane.
* Parameters:
*	a {number} the a component of plane equation
*	b {number} the b component of plane equation
*	c {number} the c component of plane equation
*	d {number} the d component of plane equation
*/
ICEMAN3D.Plane = function (a, b, c, d)
{
	this.a = a;
	this.b = b;
	this.c = c;
	this.d = d;
};

/**
* Function: Plane.Set
* Description: Sets the plane.
* Parameters:
*	a {number} the a component of plane equation
*	b {number} the b component of plane equation
*	c {number} the c component of plane equation
*	d {number} the d component of plane equation
*/
ICEMAN3D.Plane.prototype.Set = function (a, b, c, d)
{
	this.a = a;
	this.b = b;
	this.c = c;
	this.d = d;
};

/**
* Function: Plane.GetNormal
* Description: Calculates the normal vector of the plane.
* Returns:
*	{Vector} the result
*/
ICEMAN3D.Plane.prototype.GetNormal = function ()
{
	return new ICEMAN3D.Vector (this.a, this.b, this.c);
};

/**
* Function: Plane.Clone
* Description: Clones the plane.
* Returns:
*	{Plane} a cloned instance
*/
ICEMAN3D.Plane.prototype.Clone = function ()
{
	return new ICEMAN3D.Plane (this.a, this.b, this.c, this.d);
};

/**
* Plane End
*/

/**
* Class: Material
* Description:
*	Defines a material. The parameter structure can contain the following values:
*	ambient, diffuse, specular, shininess, opacity, texture, textureWidth, textureHeight.
* Parameters:
*	parameters {object} parameters of the material
*/
ICEMAN3D.Material = function (parameters)
{
	var defaultParameters = {
		ambient : 0x00cc00,
		diffuse : 0x00cc00,
		specular : 0x000000,
		shininess : 0.0,
		opacity : 1.0,
		reflection : 0.0,
		texture : null,
		textureWidth : 1.0,
		textureHeight : 1.0
	};

	ICEMAN3D.CopyObjectProperties (parameters, this, true);
	ICEMAN3D.CopyObjectProperties (defaultParameters, this, false);
};

/**
* Class: Materials
* Description: Defines a material container.
*/
ICEMAN3D.Materials = function ()
{
	this.materials = [];
	this.defaultMaterial = new ICEMAN3D.Material ();
};

/**
* Function: Materials.GetMaterial
* Description: Returns a material from the container.
* Parameters:
*	index {integer} the index
* Returns:
*	{Material} the result
*/
ICEMAN3D.Materials.prototype.GetMaterial = function (index)
{
	if (index < 0 || index >= this.materials.length) {
		return this.defaultMaterial;
	}
	return this.materials[index];
};

/**
* Function: Materials.AddMaterial
* Description: Adds a material to the container.
* Parameters:
*	material {Material} the material
* Returns:
*	{integer} the index of the newly added material
*/
ICEMAN3D.Materials.prototype.AddMaterial = function (material)
{
	this.materials.push (material);
	return this.materials.length - 1;
};

/**
* Function: Materials.GetDefaultMaterial
* Description: Returns the default material from the container. It is always exists.
* Returns:
*	{Material} the result
*/
ICEMAN3D.Materials.prototype.GetDefaultMaterial = function ()
{
	return this.defaultMaterial;
};

/**
* Function: Materials.Count
* Description: Returns the material count of the container.
* Returns:
*	{integer} the result
*/
ICEMAN3D.Materials.prototype.Count = function ()
{
	return this.materials.length;
};

ICEMAN3D.StlData = function (cube, meshName) {
    var vector = new THREE.Vector3();
    var normalMatrixWorld = new THREE.Matrix3();

    var output = '';

    output += 'solid exported\n';

    cube.scene.traverse(function (object) {
        if (object instanceof THREE.Mesh && object.name == meshName) {

            var geometry = object.geometry;
            var matrixWorld = object.matrixWorld;
            
            if (geometry instanceof THREE.BufferGeometry)
        		geometry = new THREE.Geometry().fromBufferGeometry(geometry);

            if (geometry instanceof THREE.Geometry) {


                var vertices = geometry.vertices;
                var faces = geometry.faces;

                normalMatrixWorld.getNormalMatrix(matrixWorld);

                for (var i = 0, l = faces.length; i < l; i++) {

                    var face = faces[i];

                    vector.copy(face.normal).applyMatrix3(normalMatrixWorld).normalize();

                    output += '\tfacet normal ' + vector.x + ' ' + vector.y + ' ' + vector.z + '\n';
                    output += '\t\touter loop\n';

                    var indices = [face.a, face.b, face.c];

                    for (var j = 0; j < 3; j++) {

                        vector.copy(vertices[indices[j]]).applyMatrix4(matrixWorld);

                        output += '\t\t\tvertex ' + vector.x + ' ' + vector.y + ' ' + vector.z + '\n';

                    }
                    output += '\t\tendloop\n';
                    output += '\tendfacet\n';
                }
            }
        }
    });

    output += 'endsolid exported\n';
    return output;
}

ICEMAN3D.StlBinaryData = function (cube, meshName) {
    var vector = new THREE.Vector3();
    var normalMatrixWorld = new THREE.Matrix3();
    var triangles = 0;
    cube.scene.traverse(function (object) {
        if (object instanceof THREE.Mesh && object.name == meshName) {
        	if (object.geometry instanceof THREE.BufferGeometry)
        		object.geometry = new THREE.Geometry().fromBufferGeometry(object.geometry);
            if (object.geometry instanceof THREE.Geometry) {
                triangles += object.geometry.faces.length;
            }
        }
    });

    var offset = 80; // skip header
    var bufferLength = triangles * 2 + triangles * 3 * 4 * 4 + 80 + 4;
    var arrayBuffer = new ArrayBuffer(bufferLength);
    var output = new DataView(arrayBuffer);
    output.setUint32(offset, triangles, true);
    offset += 4;

    cube.scene.traverse(function (object) {

        if (!(object instanceof THREE.Mesh) || object.name != meshName)
            return;
        if (object.geometry instanceof THREE.BufferGeometry)
    		object.geometry = new THREE.Geometry().fromBufferGeometry(object.geometry);
        if (!(object.geometry instanceof THREE.Geometry))
            return;
        //console.log(object, object.parent, object.name)
        //if ( object.name === "" )	return;	//add

        var geometry = object.geometry;
        var matrixWorld = object.matrixWorld;

        var vertices = geometry.vertices;
        var faces = geometry.faces;

        normalMatrixWorld.getNormalMatrix(matrixWorld);

        for (var i = 0, l = faces.length; i < l; i++) {

            var face = faces[i];

            vector.copy(face.normal).applyMatrix3(normalMatrixWorld).normalize();

            output.setFloat32(offset, vector.x, true);
            offset += 4; // normal
            output.setFloat32(offset, vector.y, true);
            offset += 4;
            output.setFloat32(offset, vector.z, true);
            offset += 4;

            var indices = [face.a, face.b, face.c];

            for (var j = 0; j < 3; j++) {

                vector.copy(vertices[indices[j]]).applyMatrix4(matrixWorld);

                output.setFloat32(offset, vector.x, true);
                offset += 4; // vertices
                output.setFloat32(offset, vector.y, true);
                offset += 4;
                output.setFloat32(offset, vector.z, true);
                offset += 4;

            }

            output.setUint16(offset, 0, true);
            offset += 2; // attribute byte count					

        }

    });
    return output;
}

ICEMAN3D.SaveStl = function (cube,meshName,isBinary) {
    var output = isBinary && false ? ICEMAN3D.StlBinaryData(cube,meshName) : ICEMAN3D.StlData(cube,meshName);
    var blob;
    try {
        blob = new Blob([output], { type: 'text/plain' });
    }
    catch (e) {
        // Old browser, need to use blob builder
        window.BlobBuilder = window.BlobBuilder ||
                             window.WebKitBlobBuilder ||
                             window.MozBlobBuilder ||
                             window.MSBlobBuilder;
        if (window.BlobBuilder) {
            var bb = new BlobBuilder();
            bb.append(output);
            blob = bb.getBlob("text/plain");
        }
    }
    saveAs(blob, meshName + '.stl');
//    if (blob) {
//    	if(window.navigator.msSaveOrOpenBlob) {
//    		window.navigator.msSaveOrOpenBlob(blob, 'modal.stl');
//    	} else {
//            var objectURL = URL.createObjectURL(blob);
//            var link = document.createElement('a');
//            link.href = objectURL;
//            link.download = 'modal.stl';
//            link.target = '_blank';
//            document.body.appendChild(link);
//            link.click();
//            setTimeout(function(){
//                document.body.removeChild(link);
//                window.URL.revokeObjectURL(objectURL);  
//            }, 100);
//    	}
//    	
//    } else {
//    	alert('浏览器版本过低，请升级浏览器');
//    }
}

/* FileSaver.js
 * A saveAs() FileSaver implementation.
 * 1.1.20151003
 *
 * By Eli Grey, http://eligrey.com
 * License: MIT
 *   See https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md
 */

/*global self */
/*jslint bitwise: true, indent: 4, laxbreak: true, laxcomma: true, smarttabs: true, plusplus: true */

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */

var saveAs = saveAs || (function(view) {
	"use strict";
	// IE <10 is explicitly unsupported
	if (typeof navigator !== "undefined" && /MSIE [1-9]\./.test(navigator.userAgent)) {
		return;
	}
	var
		  doc = view.document
		  // only get URL when necessary in case Blob.js hasn't overridden it yet
		, get_URL = function() {
			return view.URL || view.webkitURL || view;
		}
		, save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a")
		, can_use_save_link = "download" in save_link
		, click = function(node) {
			var event = new MouseEvent("click");
			node.dispatchEvent(event);
		}
		, is_safari = /Version\/[\d\.]+.*Safari/.test(navigator.userAgent)
		, webkit_req_fs = view.webkitRequestFileSystem
		, req_fs = view.requestFileSystem || webkit_req_fs || view.mozRequestFileSystem
		, throw_outside = function(ex) {
			(view.setImmediate || view.setTimeout)(function() {
				throw ex;
			}, 0);
		}
		, force_saveable_type = "application/octet-stream"
		, fs_min_size = 0
		// See https://code.google.com/p/chromium/issues/detail?id=375297#c7 and
		// https://github.com/eligrey/FileSaver.js/commit/485930a#commitcomment-8768047
		// for the reasoning behind the timeout and revocation flow
		, arbitrary_revoke_timeout = 500 // in ms
		, revoke = function(file) {
			var revoker = function() {
				if (typeof file === "string") { // file is an object URL
					get_URL().revokeObjectURL(file);
				} else { // file is a File
					file.remove();
				}
			};
			if (view.chrome) {
				revoker();
			} else {
				setTimeout(revoker, arbitrary_revoke_timeout);
			}
		}
		, dispatch = function(filesaver, event_types, event) {
			event_types = [].concat(event_types);
			var i = event_types.length;
			while (i--) {
				var listener = filesaver["on" + event_types[i]];
				if (typeof listener === "function") {
					try {
						listener.call(filesaver, event || filesaver);
					} catch (ex) {
						throw_outside(ex);
					}
				}
			}
		}
		, auto_bom = function(blob) {
			// prepend BOM for UTF-8 XML and text/* types (including HTML)
			if (/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
				return new Blob(["\ufeff", blob], {type: blob.type});
			}
			return blob;
		}
		, FileSaver = function(blob, name, no_auto_bom) {
			if (!no_auto_bom) {
				blob = auto_bom(blob);
			}
			// First try a.download, then web filesystem, then object URLs
			var
				  filesaver = this
				, type = blob.type
				, blob_changed = false
				, object_url
				, target_view
				, dispatch_all = function() {
					dispatch(filesaver, "writestart progress write writeend".split(" "));
				}
				// on any filesys errors revert to saving with object URLs
				, fs_error = function() {
					if (target_view && is_safari && typeof FileReader !== "undefined") {
						// Safari doesn't allow downloading of blob urls
						var reader = new FileReader();
						reader.onloadend = function() {
							var base64Data = reader.result;
							target_view.location.href = "data:attachment/file" + base64Data.slice(base64Data.search(/[,;]/));
							filesaver.readyState = filesaver.DONE;
							dispatch_all();
						};
						reader.readAsDataURL(blob);
						filesaver.readyState = filesaver.INIT;
						return;
					}
					// don't create more object URLs than needed
					if (blob_changed || !object_url) {
						object_url = get_URL().createObjectURL(blob);
					}
					if (target_view) {
						target_view.location.href = object_url;
					} else {
						var new_tab = view.open(object_url, "_blank");
						if (new_tab == undefined && is_safari) {
							//Apple do not allow window.open, see http://bit.ly/1kZffRI
							view.location.href = object_url
						}
					}
					filesaver.readyState = filesaver.DONE;
					dispatch_all();
					revoke(object_url);
				}
				, abortable = function(func) {
					return function() {
						if (filesaver.readyState !== filesaver.DONE) {
							return func.apply(this, arguments);
						}
					};
				}
				, create_if_not_found = {create: true, exclusive: false}
				, slice
			;
			filesaver.readyState = filesaver.INIT;
			if (!name) {
				name = "download";
			}
			if (can_use_save_link) {
				object_url = get_URL().createObjectURL(blob);
				save_link.href = object_url;
				save_link.download = name;
				setTimeout(function() {
					click(save_link);
					dispatch_all();
					revoke(object_url);
					filesaver.readyState = filesaver.DONE;
				});
				return;
			}
			// Object and web filesystem URLs have a problem saving in Google Chrome when
			// viewed in a tab, so I force save with application/octet-stream
			// http://code.google.com/p/chromium/issues/detail?id=91158
			// Update: Google errantly closed 91158, I submitted it again:
			// https://code.google.com/p/chromium/issues/detail?id=389642
			if (view.chrome && type && type !== force_saveable_type) {
				slice = blob.slice || blob.webkitSlice;
				blob = slice.call(blob, 0, blob.size, force_saveable_type);
				blob_changed = true;
			}
			// Since I can't be sure that the guessed media type will trigger a download
			// in WebKit, I append .download to the filename.
			// https://bugs.webkit.org/show_bug.cgi?id=65440
			if (webkit_req_fs && name !== "download") {
				name += ".download";
			}
			if (type === force_saveable_type || webkit_req_fs) {
				target_view = view;
			}
			if (!req_fs) {
				fs_error();
				return;
			}
			fs_min_size += blob.size;
			req_fs(view.TEMPORARY, fs_min_size, abortable(function(fs) {
				fs.root.getDirectory("saved", create_if_not_found, abortable(function(dir) {
					var save = function() {
						dir.getFile(name, create_if_not_found, abortable(function(file) {
							file.createWriter(abortable(function(writer) {
								writer.onwriteend = function(event) {
									target_view.location.href = file.toURL();
									filesaver.readyState = filesaver.DONE;
									dispatch(filesaver, "writeend", event);
									revoke(file);
								};
								writer.onerror = function() {
									var error = writer.error;
									if (error.code !== error.ABORT_ERR) {
										fs_error();
									}
								};
								"writestart progress write abort".split(" ").forEach(function(event) {
									writer["on" + event] = filesaver["on" + event];
								});
								writer.write(blob);
								filesaver.abort = function() {
									writer.abort();
									filesaver.readyState = filesaver.DONE;
								};
								filesaver.readyState = filesaver.WRITING;
							}), fs_error);
						}), fs_error);
					};
					dir.getFile(name, {create: false}, abortable(function(file) {
						// delete file if it already exists
						file.remove();
						save();
					}), abortable(function(ex) {
						if (ex.code === ex.NOT_FOUND_ERR) {
							save();
						} else {
							fs_error();
						}
					}));
				}), fs_error);
			}), fs_error);
		}
		, FS_proto = FileSaver.prototype
		, saveAs = function(blob, name, no_auto_bom) {
			return new FileSaver(blob, name, no_auto_bom);
		}
	;
	// IE 10+ (native saveAs)
	if (typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob) {
		return function(blob, name, no_auto_bom) {
			if (!no_auto_bom) {
				blob = auto_bom(blob);
			}
			return navigator.msSaveOrOpenBlob(blob, name || "download");
		};
	}

	FS_proto.abort = function() {
		var filesaver = this;
		filesaver.readyState = filesaver.DONE;
		dispatch(filesaver, "abort");
	};
	FS_proto.readyState = FS_proto.INIT = 0;
	FS_proto.WRITING = 1;
	FS_proto.DONE = 2;

	FS_proto.error =
	FS_proto.onwritestart =
	FS_proto.onprogress =
	FS_proto.onwrite =
	FS_proto.onabort =
	FS_proto.onerror =
	FS_proto.onwriteend =
		null;

	return saveAs;
}(
	   typeof self !== "undefined" && self
	|| typeof window !== "undefined" && window
	|| this.content
));
// `self` is undefined in Firefox for Android content script context
// while `this` is nsIContentFrameMessageManager
// with an attribute `content` that corresponds to the window

if (typeof module !== "undefined" && module.exports) {
  module.exports.saveAs = saveAs;
} else if ((typeof define !== "undefined" && define !== null) && (define.amd != null)) {
  define([], function() {
    return saveAs;
  });
}
