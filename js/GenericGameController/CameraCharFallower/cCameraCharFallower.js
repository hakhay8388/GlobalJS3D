
var cCameraCharFallower = Class(cBaseObject,
{
	ObjectType: ObjectTypes.cCameraCharFallower
	, Camera: null
	, MyChar: null
	, Fallower: null
	,
	constructor: function (_Camera, _MyChar)
	{
		cCameraCharFallower.BaseObject.constructor.call(this);
		this.Camera = _Camera;
		this.MyChar = _MyChar;
		if (GameCameraTypes.AimFixedCamera == GameSettings.GameCameraType)
		{
			this.Fallower = new cAimFixedFallowerType(_Camera, _MyChar);
		}
		this.FallowChar(1);
	}
	,
	FallowChar: function (_Interval)
	{
		this.Fallower.FallowChar();
		var _this = this;
		setTimeout(function () { _this.FallowChar(_Interval); }, _Interval);
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
		this.Fallower.Destroy();
		delete this.Fallower;
		cBaseObject.prototype.Destroy.call(this);
	}
    ,
	ReCalculateCameraPosision: function ()
	{
		if (GameCameraTypes.AimFixedCamera == GameSettings.GameCameraType)
		{
			this.Camera.AimCoordinateX.Value(this.MyChar.CoordinateX.Value() + (this.MyChar.VelocityX.Value() * (GameSettings.GameSpaceShipAimTolerance)));
			this.Camera.AimCoordinateY.Value(this.MyChar.CoordinateY.Value() + (this.MyChar.VelocityY.Value() * (GameSettings.GameSpaceShipAimTolerance)));
			this.Camera.AimCoordinateZ.Value(this.MyChar.CoordinateZ.Value() + (this.MyChar.VelocityZ.Value() * (GameSettings.GameSpaceShipAimTolerance)));

		}
		else
		{
			this.Camera.AimCoordinateX.Value(this.MyChar.CoordinateX.Value());
			this.Camera.AimCoordinateY.Value(this.MyChar.CoordinateY.Value());
			this.Camera.AimCoordinateZ.Value(this.MyChar.CoordinateZ.Value());
		}

		if (GameCameraTypes.BackFixedCamera == GameSettings.GameCameraType)
		{
			var __MouseRotate = cMath.GetRotate(0, 0, 0, this.MyChar.VelocityX.Value(), this.MyChar.VelocityY.Value(), this.MyChar.VelocityZ.Value());
			this.Camera.SetAimFixedRotate(__MouseRotate.RotateX + Math.PI, __MouseRotate.RotateY, __MouseRotate.RotateZ);
		}

		if (GameCameraTypes.FreeCamera != GameSettings.GameCameraType)
		{
			var __Distance = this.Camera.GetCameraAimDistance();
			this.Camera.Zoom(((GameSettings.GameCameraDistance - __Distance) * 0.8) + __Distance);
		}
	}
}, {});







