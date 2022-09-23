
CameraIDCreater = function () {}

CameraIDCreater.ID = 0;
CameraIDCreater.GetID = function () {
	CameraIDCreater.ID++;
	return CameraIDCreater.ID;
}

cCamera = Class(cBaseObject,
{
	ObjectType: ObjectTypes.cCamera
	, OwnerScene: null
	, OwnCameraController: null
	, Canvas2dContent: null
    , Width: 0
    , Height: 0
	, WidthOrigin: 0
    , HeightOrigin: 0
    , BackColor: null
    , CameraID: 0
	, CameraName: "Adsız Kamera"

	, CoordinateX: null
	, CoordinateY: null
	, CoordinateZ: null

	, AimCoordinateX: null
	, AimCoordinateY: null
	, AimCoordinateZ: null

	/*	, AimFixedMotionRotateX : null
	, AimFixedMotionRotateY : null	
	, AimFixedMotionRotateZ : null	*/


	, Rotate_Side: null
	, AllMat: null
	, ProjMat: null
	, ViewMat: null
	, SlowMotionRotation: false
	, RotateZ: 0
	, Projection_Near: 0.1
	, Projection_Far: 10000000
	, FrameRateTimer: null
	, FrameRate: 0
	, FrameRateCounter: 0
	, ShadingType: null
	, CameraModel: null
	, CameraAimLine: null
	, FaceArray: null
	, FaceArrayForCalculateNearestModel: null
	, FindingNearestModel: false
	, BackGroundImage: null
	, MotionBlur: false
	, ConstraintController: null
	, UseMotionRotate: false
	, TestDistance: 0
	, TestDistance2: 0
    ,
	constructor: function (_OwnerScene, _X, _Y, _Z, _AimX, _AimY, _AimZ, _BackColor, _BackGroundImagePath, _MotionBlur)
	{
		cCamera.BaseObject.constructor.call(this);
		this.ConstraintController = new cConstraintController(this);
		this.FrameRateTimer = new Date();
		this.ShadingType = DefaultSceneSettings.CameraDefaultShadingType;
		this.FaceArray = [];
		this.FaceArrayForCalculateNearestModel = [];
		this.MotionBlur = _MotionBlur;

		/*	***ShadingTypes***
		Wire: 1,
		WireFrame: 2,
		Textured: 3,
		Smooth: 4,
		SmootWire: 5,
		TexturedWire : 6
		*/
		this.BackColor = _BackColor;
		this.MotionBlur = _MotionBlur;

		if (_BackGroundImagePath)
		{
			this.BackGroundImage = new Image();
			this.BackGroundImage.src = _BackGroundImagePath;

		}
		this.OwnerScene = _OwnerScene;

		this.CameraID = "Camera" + CameraIDCreater.GetID();

		this.ProjMat = new cMatrix4x4();
		this.ViewMat = new cMatrix4x4();
		this.AllMat = new cMatrix4x4();

		this.CoordinateX = new Double(_X);
		this.CoordinateY = new Double(_Y);
		this.CoordinateZ = new Double(_Z);

		this.AimCoordinateX = new Double(_AimX);
		this.AimCoordinateY = new Double(_AimY);
		this.AimCoordinateZ = new Double(_AimZ);

		var __Rotate = this.GetRotate();
		/*        this.AimFixedMotionRotateX = new Double(__Rotate.RotateX);
		this.AimFixedMotionRotateY = new Double(__Rotate.RotateY);
		this.AimFixedMotionRotateZ = new Double(__Rotate.RotateZ);*/

		this.Rotate_Side = new cVector3d(0, 1, 0);
		this.SetupTransform();
		this.CameraModel = new cCameraModel(this.OwnerScene, this);
		this.CameraAimLine = new cLine(_OwnerScene, _X, _Y, _Z, _AimX, _AimY, _AimZ, DefaultSceneSettings.CameraAimLineColor, DefaultSceneSettings.CameraAimLineWidth, false);

		this.CameraAimLine.Visible(DefaultSceneSettings.CameraAimLineDefaultVisible);
		this.CameraModel.Visible(DefaultSceneSettings.CameraModelDefaultVisible);

	}
    ,
	Clear: function (_FillStyle, _Width, _Height)
	{
		if (this.BackGroundImage == null)
		{
			if (this.MotionBlur)
			{
				this.Canvas2dContent.globalCompositeOperation = "darker";
				_FillStyle.Transparent = 0.2;
			}
			else
			{
				this.Canvas2dContent.globalCompositeOperation = "source-over";
				_FillStyle.Transparent = 1;

			}

			this.Canvas2dContent.fillStyle = _FillStyle.toString();
			this.Canvas2dContent.fillRect(0, 0, _Width, _Height);

			if (this.MotionBlur)
			{
				this.Canvas2dContent.globalCompositeOperation = "source-over";
				_FillStyle.Transparent = 1;
			}

		}
		else
		{
			if (this.BackGroundImage.complete)
			{
				this.Canvas2dContent.drawImage(this.BackGroundImage, 0, 0, this.BackGroundImage.width, this.BackGroundImage.height, 0, 0, this.Width, this.Height);
			}
			else
			{
				if (this.MotionBlur)
				{
					this.Canvas2dContent.globalCompositeOperation = "darker";
					_FillStyle.Transparent = 0.2;
				}
				else
				{
					this.Canvas2dContent.globalCompositeOperation = "source-over";
					_FillStyle.Transparent = 1;

				}

				this.Canvas2dContent.fillStyle = _FillStyle.toString();
				this.Canvas2dContent.fillRect(0, 0, _Width, _Height);

				if (this.MotionBlur)
				{
					this.Canvas2dContent.globalCompositeOperation = "source-over";
					_FillStyle.Transparent = 1;
				}
			}
		}
	}
	,
	GetCameraAimDistance: function ()
	{
		return cMath.Distance3d(this.CoordinateX.Value(), this.CoordinateY.Value(), this.CoordinateZ.Value(), this.AimCoordinateX.Value(), this.AimCoordinateY.Value(), this.AimCoordinateZ.Value());
	}
	,
	UpdateViewTrans: function ()
	{
		this.ViewMat.LookAtLH(this.Rotate_Side, new cVector3d(this.CoordinateX.Value(), this.CoordinateY.Value(), this.CoordinateZ.Value()), new cVector3d(this.AimCoordinateX.Value(), this.AimCoordinateY.Value(), this.AimCoordinateZ.Value()));
	}
	,
	CalculateFrameRate: function ()
	{
		__Now = new Date();

		if ((__Now - this.FrameRateTimer) > 999)
		{
			this.FrameRateTimer = __Now;
			this.FrameRate = this.FrameRateCounter
			this.FrameRateCounter = 0;
		}
		else
		{
			this.FrameRateCounter++;
		}
	}
	,
	Render: function ()
	{
		if (this.Canvas2dContent && !this.FindingNearestModel)
		{
			var __Rotate = this.GetRotate();

			/*if ((this.AimFixedMotionRotateX.Value() != __Rotate.RotateX || this.AimFixedMotionRotateY.Value() != __Rotate.RotateY || this.AimFixedMotionRotateZ.Value() != __Rotate.RotateZ) && this.UseMotionRotate)
			{
			if (Math.abs(this.AimFixedMotionRotateY.Value() - __Rotate.RotateY) > Math.PI && this.AimFixedMotionRotateY.Value() > __Rotate.RotateY)
			{
			var __TempRotateY = ((((Math.PI * 2) - this.AimFixedMotionRotateY.Value()) + __Rotate.RotateY) * 0.1) + __Rotate.RotateY;
			if (__TempRotateY > (Math.PI * 2))
			{
			__TempRotateY -= (Math.PI * 2);
			}
			}
			else if (Math.abs(this.AimFixedMotionRotateY.Value() - __Rotate.RotateY) > Math.PI && __Rotate.RotateY > this.AimFixedMotionRotateY.Value())
			{
			var __TempRotateY = ((((Math.PI * 2) - __Rotate.RotateY) + this.AimFixedMotionRotateY.Value()) * 0.1) + __Rotate.RotateY;
			if (__TempRotateY > (Math.PI * 2))
			{
			__TempRotateY -= (Math.PI * 2);
			}
			}
			else if (Math.abs(this.AimFixedMotionRotateY.Value() - __Rotate.RotateY) < Math.PI)
			{
			var __TempRotateY = ((this.AimFixedMotionRotateY.Value() - __Rotate.RotateY) * 0.1) + __Rotate.RotateY;
			}
                
			this.SetAimFixedRotateDirect(((this.AimFixedMotionRotateX.Value() - __Rotate.RotateX) * 0.1) + __Rotate.RotateX, __TempRotateY , ((this.AimFixedMotionRotateZ.Value() - __Rotate.RotateZ) * 0.1) + __Rotate.RotateZ);
                
			if (Math.abs(this.AimFixedMotionRotateX.Value() - __Rotate.RotateX) < 0.001 && Math.abs(this.AimFixedMotionRotateY.Value() - __Rotate.RotateY) < 0.001 && Math.abs(this.AimFixedMotionRotateZ.Value() - __Rotate.RotateZ) < 0.001)
			{
			this.SetAimFixedRotateDirect(this.AimFixedMotionRotateX.Value() , this.AimFixedMotionRotateY.Value() , this.AimFixedMotionRotateZ.Value());
			this.UseMotionRotate = false;                    
			}
			}*/

			this.FaceArray.splice(0, this.FaceArray.length);

			this.UpdateViewTrans();

			this.OwnerScene.WorldMat.Ident();

			this.CalcAllTransforms();
			this.SetModelsVisited(false);

			this.Clear(this.BackColor, this.Width, this.Height);

			for (var i = 0; i < this.OwnerScene.RenderReciverList.Count(); i++)
			{
				this.OwnerScene.RenderReciverList.GetItem(i).Draw(this);
			}

			if (this.CameraModel.TextureImage)
			{
				var __CameraVisible = this.CameraModel.Visible();
				var __CameraAimLineVisible = this.CameraAimLine.Visible();
				this.CameraModel.Visible(false);
				this.CameraAimLine.Visible(false);
			}

			var __Count = this.OwnerScene.EntityList.Count();
			for (var i = __Count - 1; i > -1; i--)
			{
				var __Item = this.OwnerScene.EntityList.GetItem(i);
				if (__Item.IsRenderable())
				{
					if (!__Item.Visited && !__Item.IsChildOtherModel())
					{
						__Item.Initalize(this);
					}
				}

			}

			if (this.CameraModel.TextureImage)
			{
				this.CameraModel.Visible(__CameraVisible);
				this.CameraAimLine.Visible(__CameraAimLineVisible);
			}


			this.quick_sort(this.FaceArray);
			this.PloteSortedFace(this.FaceArray);


			__Count = this.OwnerScene.EntityList.Count();
			for (i = __Count - 1; i > -1; i--)
			{
				if (this.OwnerScene.EntityList.GetItem(i).IsRenderable())
				{
					__Item = this.OwnerScene.EntityList.GetItem(i);
					__Item.CompleteRender(this);
				}
			}

			this.CalculateFrameRate();
			__Rotate = this.GetRotate();

			this.Canvas2dContent.font = "12pt Arial";
            this.Canvas2dContent.fillStyle = "Red";
            this.Canvas2dContent.fillText("Object Count : " + this.OwnerScene.EntityList.Count(), 10, 20);

			this.Canvas2dContent.fillText("R_X : " + cMath.RadToDeg(__Rotate.RotateX), 10, 40);
			this.Canvas2dContent.fillText("R_Y : " + cMath.RadToDeg(__Rotate.RotateY), 10, 60);
			this.Canvas2dContent.fillText("R_Z : " + cMath.RadToDeg(__Rotate.RotateZ), 10, 80);

			this.Canvas2dContent.fillText("X : " + this.CoordinateX.Value(), 10, 100);
			this.Canvas2dContent.fillText("Y : " + this.CoordinateY.Value(), 10, 120);
			this.Canvas2dContent.fillText("Z : " + this.CoordinateZ.Value(), 10, 140);

			this.Canvas2dContent.fillText("AimX : " + this.AimCoordinateX.Value(), 10, 160);
			this.Canvas2dContent.fillText("AimY : " + this.AimCoordinateY.Value(), 10, 180);
			this.Canvas2dContent.fillText("AimZ : " + this.AimCoordinateZ.Value(), 10, 200);

			this.Canvas2dContent.fillText("FPS : " + this.FrameRate, 10, 300);
			this.Canvas2dContent.fillText("Surface : " + this.FaceArray.length, 10, 320);

			//this.Canvas2dContent.fillText("TestDistance : " + this.TestDistance, 10, 380);
			//this.Canvas2dContent.fillText("TestDistance2 : " + this.TestDistance2, 10, 400);


			if (this.CameraModel.IsRenderable())
			{
				this.CameraModel.Translate(this.CoordinateX.Value(), this.CoordinateY.Value(), this.CoordinateZ.Value());
				this.CameraModel.RotateX.Value(__Rotate.RotateX);
				this.CameraModel.RotateY.Value(__Rotate.RotateY);
				this.CameraModel.RotateZ.Value(__Rotate.RotateZ);
			}

			if (this.CameraAimLine.IsRenderable())
			{
				this.CameraAimLine.UpdateCoordinate(this.CoordinateX.Value(), this.CoordinateY.Value(), this.CoordinateZ.Value(), this.AimCoordinateX.Value(), this.AimCoordinateY.Value(), this.AimCoordinateZ.Value());
			}
		}
	}
	,
	GetNearestModel: function (_WindowX, _WindowY, _Distance)
	{
		if (this.Canvas2dContent)
		{
			this.FindingNearestModel = true;

			this.FaceArrayForCalculateNearestModel.splice(0, this.FaceArrayForCalculateNearestModel.length);
			this.FaceArray.splice(0, this.FaceArray.length);

			this.UpdateViewTrans();

			this.OwnerScene.WorldMat.Ident();

			this.CalcAllTransforms();
			this.SetModelsVisited(false);


			var __Count = this.OwnerScene.EntityList.Count();
			for (var i = __Count - 1; i > -1; i--)
			{
				var __Item = this.OwnerScene.EntityList.GetItem(i);
				if (__Item.IsRenderable())
				{
					if (!__Item.Visited && !__Item.IsChildOtherModel())
					{
						__Item.Initalize(this);
					}
				}

			}

			for (var i = this.FaceArray.length - 1; i > -1; i--)
			{
				this.FaceArrayForCalculateNearestModel[i] = this.FaceArray[i];
			}

			this.quick_sort(this.FaceArrayForCalculateNearestModel);

			for (var i = 0; i < this.FaceArrayForCalculateNearestModel.length; i++)
			{

				var __Mesh = this.FaceArrayForCalculateNearestModel[i].Model.Mesh;
				var __SurfaceFaceIndices = this.FaceArrayForCalculateNearestModel[i].FaceIndex * 3;

				var __Z1 = __Mesh.Translated_Vertex[(__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices] * 4) + 2];
				var __Z2 = __Mesh.Translated_Vertex[(__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices + 1] * 4) + 2];
				var __Z3 = __Mesh.Translated_Vertex[(__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices + 2] * 4) + 2];

				if (this.FaceArrayForCalculateNearestModel[i].Model.Z_clip && (__Z1 < 0 || __Z1 > 1 || __Z2 < 0 || __Z2 > 1 || __Z3 < 0 || __Z3 > 1))
				{
					continue;
				}


				var __X1 = __Mesh.Translated_Vertex[__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices] * 4];
				var __Y1 = __Mesh.Translated_Vertex[(__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices] * 4) + 1];

				var __X2 = __Mesh.Translated_Vertex[__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices + 1] * 4];
				var __Y2 = __Mesh.Translated_Vertex[(__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices + 1] * 4) + 1];

				var __X3 = __Mesh.Translated_Vertex[__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices + 2] * 4];
				var __Y3 = __Mesh.Translated_Vertex[(__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices + 2] * 4) + 1];


				var vAd = [__X2 - __X1, __Y2 - __Y1];
				var vBd = [__X3 - __X1, __Y3 - __Y1];
				var vCd = [__X3 - __X2, __Y3 - __Y2];

				// z component of cross product < 0 ?
				if ((((vAd[0] * vCd[1]) - (vAd[1] * vCd[0])) * this.FaceArrayForCalculateNearestModel[i].Model.SurfaceNormal) < 0)
				{
					continue;
				}

				if (cMath.IsPointInTriangle(new cPoint(_WindowX, _WindowY, 0), new cPoint(__X1, __Y1, 0), new cPoint(__X2, __Y2, 0), new cPoint(__X3, __Y3, 0)))
				{
					var __Model = this.FaceArrayForCalculateNearestModel[i].Model;
					this.FindingNearestModel = false;
					return __Model;
				}

				/* var __Distance1 = cMath.Distance2d(_WindowX, _WindowY, __X1, __Y1);
				var __Distance2 = cMath.Distance2d(_WindowX, _WindowY, __X2, __Y2);
				var __Distance3 = cMath.Distance2d(_WindowX, _WindowY, __X3, __Y3);
                
				if(__Distance1 < _Distance || __Distance2 < _Distance || __Distance3 < _Distance )
				{
				var __Model = this.FaceArrayForCalculateNearestModel[i].Model;
				this.FindingNearestModel = false;
				return __Model;
				}     
				*/

			}
		}
		this.FindingNearestModel = false;
		return null;
	}
	,
	SetModelsVisited: function (_Visited)
	{
		var __Count = this.OwnerScene.EntityList.Count();
		for (var i = __Count - 1; i > -1; i--)
		{
			var __Item = this.OwnerScene.EntityList.GetItem(i);
			if (__Item.IsModel)
			{
				__Item.Visited = _Visited;
			}
		}
	}
	,
	PloteSortedFace: function (_FaceArray)
	{
		for (var i = _FaceArray.length - 1; i > -1; i--)
		{
			_FaceArray[i].Model.DrawFace(this, _FaceArray[i]);
		}
	}
	,
	SetCameraContent: function (_CameraController, _Width, _Height, _BackColor)
	{
		this.OwnCameraController = _CameraController;
		this.Canvas2dContent = _CameraController.Canvas2dContent;
		this.BackColor = _BackColor;
		this.Width = _Width;
		this.Height = _Height;
		this.WidthOrigin = _Width / 2;
		this.HeightOrigin = _Height / 2;
		this.SetupTransform();
	}
	,
	SetupTransform: function ()
	{
		this.OwnerScene.WorldMat.Ident();
		this.ProjMat.PerspectiveLH(this.Width, this.Height, this.Projection_Near, this.Projection_Far);
		this.ViewMat.Ident();
	}
	,
	CalcAllTransforms: function ()
	{
		if (!this._mTmpMat) this._mTmpMat = new cMatrix4x4();
		this._mTmpMat.Mul(this.OwnerScene.WorldMat, this.ViewMat);
		this.AllMat.Mul(this._mTmpMat, this.ProjMat);
	}
	,
	Zoom: function (_DistanceFromAim)
	{
		var __Distance = this.GetCameraAimDistance();
		var __Inc = (_DistanceFromAim / __Distance) - 1;

		this.CoordinateX.Value(((this.CoordinateX.Value() - this.AimCoordinateX.Value()) * __Inc) + this.CoordinateX.Value());
		this.CoordinateY.Value(((this.CoordinateY.Value() - this.AimCoordinateY.Value()) * __Inc) + this.CoordinateY.Value());
		this.CoordinateZ.Value(((this.CoordinateZ.Value() - this.AimCoordinateZ.Value()) * __Inc) + this.CoordinateZ.Value());
	}
	,
	GetRotate: function ()
	{
		var __RotateX = cMath.SlopeAngle3d(this.AimCoordinateX.Value(), this.AimCoordinateY.Value(), this.AimCoordinateZ.Value(), this.CoordinateX.Value(), this.CoordinateY.Value(), this.CoordinateZ.Value());
		var __RotateY = cMath.NormalizeAngle(cMath.DirectionedAngle(this.CoordinateX.Value(), this.CoordinateZ.Value(), this.AimCoordinateX.Value(), this.AimCoordinateZ.Value(), this.AimCoordinateX.Value(), this.AimCoordinateZ.Value() + 10));

		var __RotateZ = this.RotateZ;

		__Result =
		{
			RotateX: __RotateX,
			RotateY: __RotateY,
			RotateZ: __RotateZ
		}
		return __Result;
	}
	,

	NormalizeAngle: function (_Rad)
	{
		var __Result = _Rad;
		while (__Result >= 2.0 * Math.PI)
		{
			__Result -= 2.0 * Math.PI;
		}
		return __Result;
	}
	/*	,
	SetAimFixedRotate: function (_RotateX, _RotateY, _RotateZ)
	{
	this.UseMotionRotate = true;
	this.AimFixedMotionRotateX.Value(this.NormalizeAngle(_RotateX));
	this.AimFixedMotionRotateY.Value(this.NormalizeAngle(_RotateY));
	this.AimFixedMotionRotateZ.Value(this.NormalizeAngle(_RotateZ));
	}*/
	,
	SetAimFixedRotate: function (_RotateX, _RotateY, _RotateZ)
	{
		this.RotateZ = _RotateZ;

		this.Rotate_Side.X = ((Math.cos(_RotateY) * _RotateZ));
		this.Rotate_Side.Z = -((Math.sin(_RotateY) * _RotateZ));

		__Result = cMath.GetRotatedCoordinate(_RotateX, _RotateY, this.AimCoordinateX.Value(), this.AimCoordinateY.Value(), this.AimCoordinateZ.Value(), this.CoordinateX.Value(), this.CoordinateY.Value(), this.CoordinateZ.Value());

		this.CoordinateX.Value(__Result.X);
		this.CoordinateY.Value(__Result.Y);
		this.CoordinateZ.Value(__Result.Z);

	}
	,
	SetRotate: function (_RotateX, _RotateY, _RotateZ)
	{
		if (_RotateX >= (Math.PI / 2))
		{
			_RotateX = (Math.PI / 2) - 0.001
		}
		else if (_RotateX <= (-(Math.PI / 2)))
		{
			_RotateX = (-(Math.PI / 2)) + 0.001
		}
		this.RotateZ = _RotateZ;

		this.Rotate_Side.X = ((Math.cos(_RotateY) * _RotateZ));
		this.Rotate_Side.Z = -((Math.sin(_RotateY) * _RotateZ));

		__Result = cMath.GetRotatedCoordinate(_RotateX, _RotateY, this.AimCoordinateX.Value(), this.AimCoordinateY.Value(), this.AimCoordinateZ.Value(), this.CoordinateX.Value(), this.CoordinateY.Value(), this.CoordinateZ.Value());

		var __AimX = this.AimCoordinateX.Value() - (__Result.X - this.CoordinateX.Value());
		var __AimY = this.AimCoordinateY.Value() - (__Result.Y - this.CoordinateY.Value());
		var __AimZ = this.AimCoordinateZ.Value() - (__Result.Z - this.CoordinateZ.Value());

		this.SetAimPosision(__AimX, __AimY, __AimZ);

	}
	,
	TransformVertex: function (_X, _Y, _Z)
	{

		spos = new Array(4);

		this.AllMat.TransVector3d(spos, _X, _Y, _Z);

		var W = spos[3];

		spos[0] /= W;
		spos[1] /= W;
		spos[2] /= W;


		if (isNaN(spos[0])) spos[0] = 0;
		if (isNaN(spos[1])) spos[1] = 0;
		if (isNaN(spos[2])) spos[2] = 0;

		spos[0] *= this.Width
		spos[1] *= -this.Height;
		spos[0] += this.WidthOrigin;
		spos[1] += this.HeightOrigin;

		var __Result =
		{
			X: spos[0],
			Y: spos[1],
			Z: spos[2]
		}
		return __Result;
	}
	,
	SetAimPosision: function (_X, _Y, _Z)
	{
		this.AimCoordinateX.Value(_X);
		this.AimCoordinateY.Value(_Y);
		this.AimCoordinateZ.Value(_Z);
	}
	,
	SetCameraPosision: function (_X, _Y, _Z)
	{
		this.CoordinateX.Value(_X);
		this.CoordinateY.Value(_Y);
		this.CoordinateZ.Value(_Z);
	}
	,
	GetAimPosision: function ()
	{
		var __Result =
		{
			X: this.AimCoordinateX.Value(),
			Y: this.AimCoordinateY.Value(),
			Z: this.AimCoordinateZ.Value()
		}
		return __Result;
	}
	,
	GetCameraPosision: function ()
	{
		var __Result =
		{
			X: this.CoordinateX.Value(),
			Y: this.CoordinateY.Value(),
			Z: this.CoordinateZ.Value()
		}
		return __Result;
	}
	,
	BaseObject: function ()
	{
		return cBaseObject.prototype;
	}
    ,
	Destroy: function ()
	{
		delete this.Canvas2dContent;
		delete this.Width;
		delete this.Height;
		delete this.WidthOrigin;
		delete this.HeightOrigin;
		delete this.BackColor;
		delete this.CameraID;
		delete this.OwnerDomID;
		delete this.Coordinate;
		delete this.AimCoordinate;
		delete this.Rotate_Side;
		delete this.AllMat;
		delete this.ProjMat;
		delete this.ViewMat;
		delete this.SlowMotionRotation;
		this.CameraModel.Destroy();
		cBaseObject.prototype.Destroy.call(this);
	}
	,
	TransformVertexes: function (_Mesh, _Model)
	{

		if ((_Mesh.Vertex.length % 3) != 0 || (_Mesh.SurfaceVertexIndices.length % 3) != 0)
		{
			DebugAlert.Show("Mesh.Vertex veya Mesh.SurfaceVertexIndices Uzunluğu Doğru Değil..!");
		}

		var __VertexLength = _Mesh.Vertex.length / 3;
		var __SurfaceVertexIndicesLength = _Mesh.SurfaceVertexIndices.length / 3;


		if (!_Mesh.Translated_Vertex)
		{
			_Mesh.Translated_Vertex = new Array(__VertexLength * 4);
		}

		for (i = 0; i < __VertexLength; i++)
		{
			__X = _Mesh.Vertex[(i * 3)];
			__Y = _Mesh.Vertex[(i * 3) + 1];
			__Z = _Mesh.Vertex[(i * 3) + 2];

			var __TransformedVertex = this.TransformVertex(__X, __Y, __Z);

			_Mesh.Translated_Vertex[(i * 4)] = __TransformedVertex.X;
			_Mesh.Translated_Vertex[(i * 4) + 1] = __TransformedVertex.Y;
			_Mesh.Translated_Vertex[(i * 4) + 2] = __TransformedVertex.Z;

		}

		this.setupFaces(_Mesh, __SurfaceVertexIndicesLength, _Model);

	}
	,
	setupFaces: function (_Mesh, flen, _Model)
	{

		var i = 0;
		var zk = 0;
		__FaceOffset = this.FaceArray.length;

		for (i = 0; i < flen; i++)
		{
			zk = _Mesh.Translated_Vertex[(_Mesh.SurfaceVertexIndices[(i * 3)] * 4) + 2];
			zk += _Mesh.Translated_Vertex[(_Mesh.SurfaceVertexIndices[(i * 3) + 1] * 4) + 2];
			zk += _Mesh.Translated_Vertex[(_Mesh.SurfaceVertexIndices[(i * 3) + 2] * 4) + 2];

			this.FaceArray[i + __FaceOffset] =
            {
            	FaceIndex: i,
            	Z: (zk * 1000),
            	Model: _Model
            }
		}
	}
    ,
	partition: function (_Array, begin, end, pivot)
	{
		var piv = _Array[pivot].Z;
		this.swap(_Array, pivot, end - 1);
		var store = begin;
		var ix;
		for (ix = begin; ix < end - 1; ++ix)
		{
			if (_Array[ix].Z < piv)
			{
				this.swap(_Array, store, ix);
				++store;
			}
		}
		this.swap(_Array, end - 1, store);

		return store;
	}
    ,
	swap: function (_Array, a, b)
	{
		var tmp = _Array[a];
		_Array[a] = _Array[b];
		_Array[b] = tmp;
	}
    ,
	qsort: function (_Array, begin, end)
	{
		if (end - 1 > begin)
		{
			var pivot = begin + Math.floor(Math.random() * (end - begin));

			pivot = this.partition(_Array, begin, end, pivot);

			this.qsort(_Array, begin, pivot);
			this.qsort(_Array, pivot + 1, end);
		}
	}
    ,
	quick_sort: function (_Array)
	{
		this.qsort(_Array, 0, _Array.length);
	}

}, {});


