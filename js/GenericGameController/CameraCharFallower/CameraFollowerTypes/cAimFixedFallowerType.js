
var cAimFixedFallowerType = Class(cBaseObject,
{
	ObjectType: ObjectTypes.cAimFixedFallowerType
	, Camera: null
	, MyChar: null
	,
	constructor: function (_Camera, _MyChar)
	{
		cAimFixedFallowerType.BaseObject.constructor.call(this);
		this.Camera = _Camera;
		this.MyChar = _MyChar;
	}
	,
	FallowChar: function ()
	{
		var __MyCharVector = new cVector3d(this.MyChar.VelocityX.Value(), this.MyChar.VelocityY.Value(), this.MyChar.VelocityZ.Value());
		__MyCharVector.Normalize();

		var __AimX = this.MyChar.CoordinateX.Value() + (this.MyChar.VelocityX.Value() * (GameSettings.GameSpaceShipAimTolerance));
		var __AimY = this.MyChar.CoordinateY.Value() + (this.MyChar.VelocityY.Value() * (GameSettings.GameSpaceShipAimTolerance));
		var __AimZ = this.MyChar.CoordinateZ.Value() + (this.MyChar.VelocityZ.Value() * (GameSettings.GameSpaceShipAimTolerance));

		var __CamaraVector = new cVector3d(__AimX - this.Camera.CoordinateX.Value(), __AimY - this.Camera.CoordinateY.Value(), __AimZ - this.Camera.CoordinateZ.Value());

		/*var __CamaraVector = new cVector3d(this.MyChar.CoordinateX.Value() - this.Camera.CoordinateX.Value(), this.MyChar.CoordinateY.Value() - this.Camera.CoordinateY.Value(), this.MyChar.CoordinateZ.Value() - this.Camera.CoordinateZ.Value());*/
		__CamaraVector.Normalize();
		__CamaraVector.ScalarMul(20);

		__MyCharVector.Add(__CamaraVector);

		this.Camera.AimCoordinateX.Value(__AimX);
		this.Camera.AimCoordinateY.Value(__AimY);
		this.Camera.AimCoordinateZ.Value(__AimZ);


		/*		this.Camera.AimCoordinateX.Value(this.MyChar.CoordinateX.Value());
		this.Camera.AimCoordinateY.Value(this.MyChar.CoordinateY.Value());
		this.Camera.AimCoordinateZ.Value(this.MyChar.CoordinateZ.Value());*/

		this.Camera.CoordinateX.Value(this.Camera.AimCoordinateX.Value() - __MyCharVector.X);
		this.Camera.CoordinateY.Value(this.Camera.AimCoordinateY.Value() - __MyCharVector.Y);
		this.Camera.CoordinateZ.Value(this.Camera.AimCoordinateZ.Value() - __MyCharVector.Z);

		this.Camera.Zoom(GameSettings.GameCameraDistance);
	}
	,
	BaseObject: function ()
	{
		return cBaseObject.prototype;
	}
	,
	Destroy: function ()
	{
		delete this.Camera;
		delete this.MyChar;
		cBaseObject.prototype.Destroy.call(this);
	}
}, {});







