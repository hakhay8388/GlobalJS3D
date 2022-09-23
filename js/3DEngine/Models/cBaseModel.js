
var cBaseModel = Class(cBaseShape,
{
	ObjectType: ObjectTypes.cBaseModel
	, SurfaceNormal: 0
	, Z_clip: 0
	, RotateX: null
	, RotateY: null
	, RotateZ: null
	, RotateXOffset: 0
	, RotateYOffset: 0
	, RotateZOffset: 0
	, TranslateXOffset: 0
	, TranslateYOffset: 0
	, TranslateZOffset: 0
	, TranslateX: null
	, TranslateY: null
	, TranslateZ: null
	, PrivateTranslateX: 0
	, PrivateTranslateY: 0
	, PrivateTranslateZ: 0

	, ScaleX: null
	, ScaleY: null
	, ScaleZ: null

	, PrivateScaleX: 0
	, PrivateScaleY: 0
	, PrivateScaleZ: 0

	, CenterX: null
	, CenterY: null
	, CenterZ: null
	, VertexNormalFound: false
	, FaceNormalFound: false
	, CalculateVertexNormalAndFaceNormal: true
	, Material: null
	, TextureImage: null
	, TextureData: null
	, ReRenderTextureImage: true
    , RenderSuccess: true
    , TextureLoaded: false
	, Mesh: null
	, UseLight: false
	, EnabledRealTimeLightRender: false
	, ChildModel: null
	, Visited: false
	, MyDadModel: null
	, AnimationController: null
	, VelocityVector: null
	, RotateVelocityVector: null
	, EffectController: null
	, NoUseEffectWhenChildObject: true
	, LighterModel: false
	, ConstraintController: null
	, VertexOutLineControl: true
    ,
	constructor: function (_OwnerScene, _X, _Y, _Z, _RotateX, _RotateY, _RotateZ, _ScaleX, _ScaleY, _ScaleZ, _Mesh, _Material, _SurfaceNormal, _Z_clip, _UseLight, _EnabledRealTimeLightRender, _LighterModel)
	{
		cBaseModel.BaseObject.constructor.call(this, _OwnerScene);
		this.AnimationController = new cModelAnimationController(this);
		this.EffectController = new cEffectController(this);
		this.ConstraintController = new cConstraintController(this);
		this.LighterModel = _LighterModel;
		this.ChildModel = new cList(ObjectTypes.cBaseModel);
		this.Mesh = _Mesh;
		this.Material = _Material;

		this.SurfaceNormal = _SurfaceNormal;
		this.Z_clip = _Z_clip;
		__Center = this.GetMeshCenter();
		this.UseLight = _UseLight || false;
		this.EnabledRealTimeLightRender = _EnabledRealTimeLightRender || false;


		this.TranslateX = new Double(__Center.X);
		this.TranslateY = new Double(__Center.Y);
		this.TranslateZ = new Double(__Center.Z);

		this.CenterX = new Double(0);
		this.CenterY = new Double(0);
		this.CenterZ = new Double(0);

		this.ScaleX = new Double(1);
		this.ScaleY = new Double(1);
		this.ScaleZ = new Double(1);

		this.RotateX = new Double(0);
		this.RotateY = new Double(0);
		this.RotateZ = new Double(0);


		this.Translate(_X, _Y, _Z);
		this.Rotate(_RotateX, _RotateY, _RotateZ);
		this.Scale(_ScaleX, _ScaleY, _ScaleZ);

		this.VelocityVector = new cVector3d(0, 0, 0);
		this.RotateVelocityVector = new cVector3d(0, 0, 0);

		//this.PlotNormalVertexLines();
		//this.PlotNormalSurfaceLines();
	}
    ,
	DistanceTo: function (_X, _Y, _Z)
	{
		return cMath.Distance3d(_X, _Y, _Z, this.TranslateX.Value(), this.TranslateY.Value(), this.TranslateZ.Value());
	}
    ,
	AddChildModel: function (_ChildModel)
	{
		this.ChildModel.Add(_ChildModel);
		_ChildModel.MyDadModel = this;
	}
    ,
	RemoveChildModel: function (_ChildModel)
	{
		this.ChildModel.Remove(_ChildModel);
		_ChildModel.MyDadModel = null;
	}
    ,
	IsModel: function ()
	{
		return true;
	}
    ,
	IsChildOtherModel: function ()
	{
		return this.MyDadModel != null;
	}
	,
	PlotNormalVertexLines: function ()
	{
		var __Mesh = this.Mesh;
		var __VertexLength = __Mesh.Vertex.length / 3;
		for (var i = 0; i < __VertexLength; i++)
		{
			var __X = __Mesh.Vertex[(i * 3)];
			var __Y = __Mesh.Vertex[(i * 3) + 1];
			var __Z = __Mesh.Vertex[(i * 3) + 2];
			var __Line = this.OwnerScene.CreateLine(__X, __Y, __Z, __X + __Mesh.VertexNormal[i].X, __Y + __Mesh.VertexNormal[i].Y, __Z + __Mesh.VertexNormal[i].Z);
		}
	}
	,
	PlotNormalSurfaceLines: function ()
	{

		for (i = 0; i < this.Mesh.SurfaceVertexIndices.length; i += 3)
		{
			var __Point1 = new cPoint(this.Mesh.Vertex[this.Mesh.SurfaceVertexIndices[i] * 3], this.Mesh.Vertex[(this.Mesh.SurfaceVertexIndices[i] * 3) + 1], this.Mesh.Vertex[(this.Mesh.SurfaceVertexIndices[i] * 3) + 2]);
			var __Point2 = new cPoint(this.Mesh.Vertex[this.Mesh.SurfaceVertexIndices[i + 1] * 3], this.Mesh.Vertex[(this.Mesh.SurfaceVertexIndices[i + 1] * 3) + 1], this.Mesh.Vertex[(this.Mesh.SurfaceVertexIndices[i + 1] * 3) + 2]);
			var __Point3 = new cPoint(this.Mesh.Vertex[this.Mesh.SurfaceVertexIndices[i + 2] * 3], this.Mesh.Vertex[(this.Mesh.SurfaceVertexIndices[i + 2] * 3) + 1], this.Mesh.Vertex[(this.Mesh.SurfaceVertexIndices[i + 2] * 3) + 2]);

			var __CenterPoint = new cPoint((__Point1.X + __Point2.X + __Point3.X) / 3, (__Point1.Y + __Point2.Y + __Point3.Y) / 3, (__Point1.Z + __Point2.Z + __Point3.Z) / 3);

			var __Vector = this.Mesh.SurfaceNormal[i / 3].SurfaceNormalVector;

			var __MyLine = this.OwnerScene.CreateLine(__CenterPoint.X, __CenterPoint.Y, __CenterPoint.Z, __CenterPoint.X + __Vector.X, __CenterPoint.Y + __Vector.Y, __CenterPoint.Z + __Vector.Z);
		}
	}
	,
	CalculateFacesNormal: function ()
	{

		var __SurfaceVertexIndicesLength = this.Mesh.SurfaceVertexIndices.length / 3;
		var __Mesh = this.Mesh;

		if (!__Mesh.SurfaceNormal)
		{
			__Mesh.SurfaceNormal = Array(__SurfaceVertexIndicesLength);
		}

		for (var i = 0; i < __SurfaceVertexIndicesLength; i++)
		{

			var __Vertex1_Indices = __Mesh.SurfaceVertexIndices[(i * 3)];

			var __X1 = __Mesh.Vertex[__Vertex1_Indices * 3];
			var __Y1 = __Mesh.Vertex[(__Vertex1_Indices * 3) + 1];
			var __Z1 = __Mesh.Vertex[(__Vertex1_Indices * 3) + 2];

			var __Vertex2_Indices = __Mesh.SurfaceVertexIndices[(i * 3) + 1];

			var __X2 = __Mesh.Vertex[__Vertex2_Indices * 3];
			var __Y2 = __Mesh.Vertex[(__Vertex2_Indices * 3) + 1];
			var __Z2 = __Mesh.Vertex[(__Vertex2_Indices * 3) + 2];

			var __Vertex3_Indices = __Mesh.SurfaceVertexIndices[(i * 3) + 2];

			var __X3 = __Mesh.Vertex[__Vertex3_Indices * 3];
			var __Y3 = __Mesh.Vertex[(__Vertex3_Indices * 3) + 1];
			var __Z3 = __Mesh.Vertex[(__Vertex3_Indices * 3) + 2];

			var __Point1 = new cPoint(__X1, __Y1, __Z1);
			var __Point2 = new cPoint(__X2, __Y2, __Z2);
			var __Point3 = new cPoint(__X3, __Y3, __Z3);

			var __CenterPoint = new cPoint((__Point1.X + __Point2.X + __Point3.X) / 3, (__Point1.Y + __Point2.Y + __Point3.Y) / 3, (__Point1.Z + __Point2.Z + __Point3.Z) / 3);
			var __Vector = cMath.ComputeFaceNormal(__Point1, __Point2, __Point3);
			__Vector.Normalize();
			if (this.SurfaceNormal != 1)
			{
				__Vector.Invert();
			}

			__Mesh.SurfaceNormal[i] =
		    {
		    	SurfaceNormalVector: __Vector,
		    	Vertex1_Indices: __Vertex1_Indices,
		    	Vertex2_Indices: __Vertex2_Indices,
		    	Vertex3_Indices: __Vertex3_Indices,
		    	Orgin: new cPoint((__X1 + __X2 + __X3) / 3, (__Y1 + __Y2 + __Y3) / 3, (__Z1 + __Z2 + __Z3) / 3)
		    }
		}
	}
	,
	CalculateVertexNormal: function ()
	{
		var __Mesh = this.Mesh;
		var __SurfaceVertexIndicesLength = __Mesh.SurfaceVertexIndices.length / 3;

		if (!__Mesh.VertexNormal)
		{
			__Mesh.VertexNormal = [];
		}

		for (var i = 0; i < __Mesh.SurfaceVertexIndices.length; i++)
		{
			var __CurrentIndices = __Mesh.SurfaceVertexIndices[i];
			__Mesh.VertexNormal[__CurrentIndices] = new cVector3d();
			var __AddedVectorList = [];
			var __Counter = 0;
			for (var j = 0; j < __SurfaceVertexIndicesLength; j++)
			{
				var __P1_Indices = __Mesh.SurfaceVertexIndices[j * 3];
				var __P2_Indices = __Mesh.SurfaceVertexIndices[(j * 3) + 1];
				var __P3_Indices = __Mesh.SurfaceVertexIndices[(j * 3) + 2];
				if (__CurrentIndices == __P1_Indices || __CurrentIndices == __P2_Indices || __CurrentIndices == __P3_Indices)
				{
					var __Found = false;
					for (var k = 0; k < __AddedVectorList.length; k++)
					{
						if (__AddedVectorList[k].X == __Mesh.SurfaceNormal[j].SurfaceNormalVector.X && __AddedVectorList[k].Y == __Mesh.SurfaceNormal[j].SurfaceNormalVector.Y && __AddedVectorList[k].Z == __Mesh.SurfaceNormal[j].SurfaceNormalVector.Z)
						{
							__Found = true;
						}
					}
					if (!__Found)
					{
						__AddedVectorList[__Counter] = __Mesh.SurfaceNormal[j].SurfaceNormalVector;
						__Counter++;
						__Mesh.VertexNormal[__CurrentIndices].Add(__Mesh.SurfaceNormal[j].SurfaceNormalVector);
					}
				}
			}
			__Mesh.VertexNormal[__CurrentIndices].Normalize();
		}
	}

	,
	Rotate: function (_RotateX, _RotateY, _RotateZ)
	{
		this.RotateX.Value(_RotateX);
		this.RotateY.Value(_RotateY);
		this.RotateZ.Value(_RotateZ);
		this.ReRenderIfRealTimeLightRenderEnabled();
		//this.CalculateVertexNormalAndFaceNormal = true;
	}
	,
	RotateForRender: function (_Camera, _RotateX, _RotateY, _RotateZ)
	{

		var __TempTranslater = new cMatrix4x4();
		var __Translater = new cMatrix4x4();
		var __Rotater = new cMatrix4x4();

		var __WorldMat = new cMatrix4x4();

		__Translater.Translate((this.CenterX.Value() - this.TranslateX.Value()) - this.TranslateXOffset, (this.CenterY.Value() - this.TranslateY.Value()) - this.TranslateYOffset, (this.CenterZ.Value() - this.TranslateZ.Value()) - this.TranslateZOffset);


		__Rotater.GlRotate(_RotateX, -1, 0, 0);
		__WorldMat.Mul(__Translater, __Rotater);
		__Translater.CopyFrom(__WorldMat);


		__Rotater.Ident();
		__Rotater.GlRotate(_RotateY, 0, -1, 0);
		__WorldMat.Mul(__Translater, __Rotater);
		__Translater.CopyFrom(__WorldMat);

		__Rotater.Ident();
		__Rotater.GlRotate(_RotateZ, 0, 0, -1);
		__WorldMat.Mul(__Translater, __Rotater);
		__Translater.CopyFrom(__WorldMat);

		__TempTranslater.Ident();
		__TempTranslater.Translate((this.TranslateX.Value() - this.CenterX.Value()) + this.TranslateXOffset, (this.TranslateY.Value() - this.CenterY.Value()) + this.TranslateYOffset, (this.TranslateZ.Value() - this.CenterZ.Value()) + this.TranslateZOffset);

		__WorldMat.Mul(__Translater, __TempTranslater);
		__Translater.CopyFrom(this.OwnerScene.WorldMat);
		this.OwnerScene.WorldMat.Mul(__WorldMat, __Translater);

		_Camera.CalcAllTransforms();

	}
    ,
	NormalizeAngle: function (_Rad)
	{
		var __Result = _Rad;
		while (__Result >= 2 * Math.PI)
		{
			__Result -= 2 * Math.PI;
		}
		while (__Result <= -2 * Math.PI)
		{
			__Result += Math.PI * 2;
		}
		return __Result;
	}
    ,
	RotateForRender2: function (_Camera, _RotateX, _RotateY, _RotateZ)
	{
		var __TempTranslater = new cMatrix4x4();
		var __Translater = new cMatrix4x4();
		var __Rotater = new cMatrix4x4();

		var __WorldMat = new cMatrix4x4();

		__Translater.Translate((this.CenterX.Value() - this.TranslateX.Value()) - this.TranslateXOffset, (this.CenterY.Value() - this.TranslateY.Value()) - this.TranslateYOffset, (this.CenterZ.Value() - this.TranslateZ.Value()) - this.TranslateZOffset);

		_RotateX = this.NormalizeAngle(_RotateX);
		_RotateY = this.NormalizeAngle(_RotateY);
		_RotateZ = this.NormalizeAngle(_RotateZ);


		__Rotater.GlRotate(_RotateY, 0, -1, 0);
		__WorldMat.Mul(__Translater, __Rotater);
		__Translater.CopyFrom(__WorldMat);

		__Rotater.Ident();
		__Rotater.GlRotate(_RotateX, Math.cos(-_RotateY), 0, Math.sin(-_RotateY));
		__WorldMat.Mul(__Translater, __Rotater);
		__Translater.CopyFrom(__WorldMat);

		__Rotater.Ident();

		__Rotater.GlRotate(_RotateZ, Math.sin(_RotateY) * Math.cos(_RotateX), Math.sin(_RotateX), Math.cos(_RotateY) * Math.cos(_RotateX));
		__WorldMat.Mul(__Translater, __Rotater);
		__Translater.CopyFrom(__WorldMat);


		__TempTranslater.Ident();
		__TempTranslater.Translate((this.TranslateX.Value() - this.CenterX.Value()) + this.TranslateXOffset, (this.TranslateY.Value() - this.CenterY.Value()) + this.TranslateYOffset, (this.TranslateZ.Value() - this.CenterZ.Value()) + this.TranslateZOffset);

		__WorldMat.Mul(__Translater, __TempTranslater);
		__Translater.CopyFrom(this.OwnerScene.WorldMat);
		this.OwnerScene.WorldMat.Mul(__WorldMat, __Translater);

		_Camera.CalcAllTransforms();

	}
	,
	SetTranslateOffset: function (_X, _Y, _Z)
	{
		this.TranslateXOffset = _X;
		this.TranslateYOffset = _Y;
		this.TranslateZOffset = _Z;
		this.Translate(this.TranslateX.Value(), this.TranslateY.Value(), this.TranslateZ.Value());
	}
    ,
	Translate: function (_X, _Y, _Z)
	{
		var __Center = this.GetMeshCenter();
		var __IncX = _X - __Center.X;
		var __IncY = _Y - __Center.Y;
		var __IncZ = _Z - __Center.Z;

		for (var i = 0; i < this.Mesh.Vertex.length; i += 3)
		{
			this.Mesh.Vertex[i] += this.TranslateXOffset + __IncX;
			this.Mesh.Vertex[i + 1] += this.TranslateYOffset + __IncY;
			this.Mesh.Vertex[i + 2] += this.TranslateZOffset + __IncZ;
		}

		var __ChildModelCount = this.ChildModel.Count();
		for (i = 0; i < __ChildModelCount; i++)
		{
			var __Item = this.ChildModel.GetItem(i);
			__Item.SetTranslateOffset(this.TranslateXOffset + __IncX + __Item.TranslateXOffset, this.TranslateYOffset + __IncY + __Item.TranslateYOffset, this.TranslateZOffset + __IncZ + __Item.TranslateZOffset);
		}

		this.PrivateTranslateX = _X;
		this.PrivateTranslateY = _Y;
		this.PrivateTranslateZ = _Z;
		this.TranslateX.Value(_X);
		this.TranslateY.Value(_Y);
		this.TranslateZ.Value(_Z);
		this.ReRenderIfRealTimeLightRenderEnabled();
	}
    ,
	Scale: function (_X, _Y, _Z)
	{
		__Center = this.GetMeshCenter();
		this.ScaleForCenter(__Center, _X, _Y, _Z);
	}
    ,
	ScaleForCenter: function (_Center, _X, _Y, _Z)
	{
		if (_X == 0) _X = 0.0001;
		if (_Y == 0) _Y = 0.0001;
		if (_Z == 0) _Z = 0.0001;

		var __IncX = (_X - this.ScaleX.Value()) / this.ScaleX.Value();
		var __IncY = (_Y - this.ScaleY.Value()) / this.ScaleY.Value();
		var __IncZ = (_Z - this.ScaleZ.Value()) / this.ScaleZ.Value();


		for (var i = 0; i < this.Mesh.Vertex.length; i += 3)
		{
			this.Mesh.Vertex[i] = (((this.Mesh.Vertex[i] - _Center.X) * (_X / this.ScaleX.Value())) + __Center.X);
			this.Mesh.Vertex[i + 1] = (((this.Mesh.Vertex[i + 1] - _Center.Y) * (_Y / this.ScaleY.Value())) + __Center.Y);
			this.Mesh.Vertex[i + 2] = (((this.Mesh.Vertex[i + 2] - _Center.Z) * (_Z / this.ScaleZ.Value())) + __Center.Z);
		}

		var __ChildModelCount = this.ChildModel.Count();
		for (i = 0; i < __ChildModelCount; i++)
		{
			var __Item = this.ChildModel.GetItem(i);
			__Item.ScaleForCenter(_Center, __Item.ScaleX.Value() + (__Item.ScaleX.Value() * __IncX), __Item.ScaleY.Value() + (__Item.ScaleY.Value() * __IncY), __Item.ScaleZ.Value() + (__Item.ScaleZ.Value() * __IncZ));
		}

		this.PrivateScaleX = _X;
		this.PrivateScaleY = _Y;
		this.PrivateScaleZ = _Z;

		this.ScaleX.Value(_X);
		this.ScaleY.Value(_Y);
		this.ScaleZ.Value(_Z);
		this.ReRenderIfRealTimeLightRenderEnabled();

	}
	,
	GetMeshCenter: function ()
	{
		var __X = 0;
		var __Y = 0;
		var __Z = 0;
		for (var i = 0; i < this.Mesh.Vertex.length; i += 3)
		{
			__X += this.Mesh.Vertex[i];
			__Y += this.Mesh.Vertex[i + 1];
			__Z += this.Mesh.Vertex[i + 2];
		}
		var __Result =
		{
			X: __X / (this.Mesh.Vertex.length / 3),
			Y: __Y / (this.Mesh.Vertex.length / 3),
			Z: __Z / (this.Mesh.Vertex.length / 3)
		}

		return __Result;
	}
	,
	SetMeshLocalCenter: function (_X, _Y, _Z)
	{
		this.CenterX.Value(_X);
		this.CenterY.Value(_Y);
		this.CenterZ.Value(_Z);
	}
	,
	BaseObject: function ()
	{
		return cBaseShape.prototype;
	}
    ,
	Destroy: function ()
	{
		if (this.MyDadModel != null)
		{
			this.MyDadModel.RemoveChildModel(this);
		}


		this.OwnerScene.EntityList.Remove(this);
		this.ConstraintController.Destroy();
		delete this.SurfaceNormal;
		delete this.Z_clip;
		this.RotateX.Destroy();
		this.RotateY.Destroy();
		this.RotateZ.Destroy();
		delete this.RotateX;
		delete this.RotateY;
		delete this.RotateZ;

		this.TranslateX.Destroy();
		this.TranslateY.Destroy();
		this.TranslateZ.Destroy();
		delete this.TranslateX;
		delete this.TranslateY;
		delete this.TranslateZ;



		this.ScaleX.Destroy();
		this.ScaleY.Destroy();
		this.ScaleZ.Destroy();
		delete this.ScaleX;
		delete this.ScaleY;
		delete this.ScaleZ;

		this.CenterX.Destroy();
		this.CenterY.Destroy();
		this.CenterZ.Destroy();
		delete this.CenterX;
		delete this.CenterY;
		delete this.CenterZ;

		delete this.VertexNormalFound;
		delete this.FaceNormalFound;

		this.AnimationController.Destroy();
		this.AnimationController;


		delete this.RotateXOffset;
		delete this.RotateYOffset;
		delete this.RotateZOffset;
		delete this.TranslateXOffset;
		delete this.TranslateYOffset;
		delete this.TranslateZOffset;

		delete this.CalculateVertexNormalAndFaceNormal;

		if (this.Material != null)
		{
			if (this.Material.GetTypeID() != ObjectTypes.cNoLightableTexture.ObjectTypeID)
			{
				delete this.TextureImage;
			}
		}


		delete this.Material;
		delete this.TextureData;
		delete this.ReRenderTextureImage;
		delete this.RenderSuccess;
		delete this.TextureLoaded;
		this.Mesh.Destroy();
		delete this.Mesh;
		delete this.UseLight;
		delete this.EnabledRealTimeLightRender;

		for (var i = 0; i < this.ChildModel.Count(); i++)
		{
			this.ChildModel.GetItem(i).Destroy();
		}
		this.ChildModel.Destroy();
		delete this.ChildModel;

		delete this.Visited;
		delete this.MyDadModel;
		delete this.AnimationController;
		delete this.VelocityVector;
		delete this.RotateVelocityVector;
		this.EffectController.Destroy();
		delete this.EffectController;

		delete this.NoUseEffectWhenChildObject;

		cBaseShape.prototype.Destroy.call(this);
	}
	,
	GetVectorToSurfaceAngle: function (_Vector, _X1, _Y1, _Z1, _X2, _Y2, _Z2, _X3, _Y3, _Z3)
	{
		var __Mesh = this.Mesh;

		var __Point1 = new cPoint(_X1, _Y1, _Z1);
		var __Point2 = new cPoint(_X2, _Y2, _Z2);
		var __Point3 = new cPoint(_X3, _Y3, _Z3);

		var __CenterPoint = new cPoint((__Point1.X + __Point2.X + __Point3.X) / 3, (__Point1.Y + __Point2.Y + __Point3.Y) / 3, (__Point1.Z + __Point2.Z + __Point3.Z) / 3);
		var __Vector = cMath.ComputeFaceNormal(__Point1, __Point2, __Point3);

		var __Angle = cMath.AngleBetween(_Vector, __Vector); ;

		return __Angle;
	}
	,
	GetVectorToSurfaceAngleBySurfaceIndex: function (_Vector, _SurfaceIndex)
	{
		var __SurfaceFaceIndices = _SurfaceIndex * 3;
		var __Mesh = this.Mesh;
		var __OrgX1 = __Mesh.Vertex[__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices] * 3];
		var __OrgY1 = __Mesh.Vertex[(__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices] * 3) + 1];
		var __OrgZ1 = __Mesh.Vertex[(__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices] * 3) + 2];

		var __OrgX2 = __Mesh.Vertex[__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices + 1] * 3];
		var __OrgY2 = __Mesh.Vertex[(__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices + 1] * 3) + 1];
		var __OrgZ2 = __Mesh.Vertex[(__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices + 1] * 3) + 2];

		var __OrgX3 = __Mesh.Vertex[__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices + 2] * 3];
		var __OrgY3 = __Mesh.Vertex[(__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices + 2] * 3) + 1];
		var __OrgZ3 = __Mesh.Vertex[(__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices + 2] * 3) + 2];

		return this.GetVectorToSurfaceAngle(_Vector, __OrgX1, __OrgY1, __OrgZ1, __OrgX2, __OrgY2, __OrgZ2, __OrgX3, __OrgY3, __OrgZ3);

	}
	,
	GetVectorToSurfaceVertexNormalAngle: function (_Vector, __SurfaceVertexIndice)
	{
		var __Mesh = this.Mesh;
		var __Vertex_Indice = __Mesh.SurfaceVertexIndices[__SurfaceVertexIndice];
		var __Angle = cMath.AngleBetween(__Mesh.VertexNormal[__Vertex_Indice], _Vector);
		var __Result =
	    {
	    	VertexIndice: __Vertex_Indice,
	    	Angle: __Angle
	    }
		return __Result;
	}
	,
	GetVectorToSurfaceVertexNormalAnglesBySurfaceIndex: function (_Vector, _SurfaceIndex)
	{
		var __SurfaceFaceIndices = _SurfaceIndex * 3;
		var __Mesh = this.Mesh;

		var __Result =
		{
			Vertex1: this.GetVectorToSurfaceVertexNormalAngle(_Vector, __SurfaceFaceIndices),
			Vertex2: this.GetVectorToSurfaceVertexNormalAngle(_Vector, __SurfaceFaceIndices + 1),
			Vertex3: this.GetVectorToSurfaceVertexNormalAngle(_Vector, __SurfaceFaceIndices + 2)
		}

		return __Result;

	}
	,
	DoWireFrame: function (_Camera, _X1, _Y1, _X2, _Y2, _X3, _Y3)
	{
		_Camera.Canvas2dContent.strokeStyle = DefaultSceneSettings.WireFrameColor.toString();
		this.MovePenPath(_Camera, _X1, _Y1, _X2, _Y2, _X3, _Y3);
		_Camera.Canvas2dContent.stroke();
		return true;
	}
	,
	DoSmooth: function (_Camera, _X1, _Y1, _X2, _Y2, _X3, _Y3)
	{
		_Camera.Canvas2dContent.fillStyle = DefaultSceneSettings.SmoothColor.toString()
		this.MovePenPath(_Camera, _X1, _Y1, _X2, _Y2, _X3, _Y3);
		_Camera.Canvas2dContent.fill();
		return true;
	}
	,
	DoSmootWire: function (_Camera, _X1, _Y1, _X2, _Y2, _X3, _Y3)
	{
		_Camera.Canvas2dContent.fillStyle = DefaultSceneSettings.SmoothColor.toString()
		_Camera.Canvas2dContent.strokeStyle = DefaultSceneSettings.WireFrameColor.toString();
		this.MovePenPath(_Camera, _X1, _Y1, _X2, _Y2, _X3, _Y3);
		_Camera.Canvas2dContent.fill();
		_Camera.Canvas2dContent.stroke();
		return true;
	}
	,
	DoTexturedWire: function (_Camera, _X1, _Y1, _X2, _Y2, _X3, _Y3)
	{
		_Camera.Canvas2dContent.strokeStyle = DefaultSceneSettings.WireFrameColor.toString();
		this.MovePenPath(_Camera, _X1, _Y1, _X2, _Y2, _X3, _Y3);
		_Camera.Canvas2dContent.stroke();
		return false;
	}
	,
	DoSmooth3D: function (_Camera, _Color, _X1, _Y1, _X2, _Y2, _X3, _Y3, _Distance)
	{
		//_Camera.Canvas2dContent.globalCompositeOperation = "source-over";
		var __ChyanColor = new cColor(0, _Color.Green, _Color.Blue, 1);

		var __RedColor = new cColor(_Color.Red, 0, 0, 1);
		var __Distance = ((1 / (_Distance)) * 600) - 15;



		_Camera.Canvas2dContent.fillStyle = __RedColor.toString();
		this.MovePenPath(_Camera, _X1 + (__Distance / 2), _Y1, _X2 + (__Distance / 2), _Y2, _X3 + (__Distance / 2), _Y3);
		_Camera.Canvas2dContent.fill();
		_Camera.Canvas2dContent.globalCompositeOperation = "lighter";

		_Camera.Canvas2dContent.fillStyle = __ChyanColor.toString();
		this.MovePenPath(_Camera, _X1 - (__Distance / 2), _Y1, _X2 - (__Distance / 2), _Y2, _X3 - (__Distance / 2), _Y3);
		_Camera.Canvas2dContent.fill();
		//_Camera.Canvas2dContent.globalCompositeOperation = "source-over";
		__ChyanColor.Destroy();
		__RedColor.Destroy();

		return true;
	}
	,
	MovePenPath: function (_Camera, _X1, _Y1, _X2, _Y2, _X3, _Y3)
	{
		//_Camera.Canvas2dContent.globalAlpha = 2.1;
		_Camera.Canvas2dContent.beginPath();
		_Camera.Canvas2dContent.moveTo(_X1, _Y1);
		_Camera.Canvas2dContent.lineTo(_X2, _Y2);
		_Camera.Canvas2dContent.lineTo(_X3, _Y3);
		_Camera.Canvas2dContent.closePath();
	}
	,
	NumberCmpForSort: function (a, b)
	{
		return a - b;
	}
	,
	GetRootRotate: function ()
	{
		if (this.MyDadModel != null)
		{
			var __Rotate = this.MyDadModel.GetRootRotate();
			var __Result =
	        {
	        	RotateX: (__Rotate.RotateX + this.RotateX.Value()),
	        	RotateY: (__Rotate.RotateY + this.RotateY.Value()),
	        	RotateZ: (__Rotate.RotateZ + this.RotateZ.Value())
	        }
			return __Result
		}
		else
		{
			var __Result =
	        {
	        	RotateX: this.RotateX.Value(),
	        	RotateY: this.RotateY.Value(),
	        	RotateZ: this.RotateZ.Value()
	        }
			return __Result
		}
	}
    ,
	Initalize: function (_Camera)
	{
		var __Translated = false
		if (!this.NoUseEffectWhenChildObject || this.MyDadModel == null)
		{
			if (this.EffectController.EffectCount() > 0)
			{
				this.EffectController.CalculateEffects(_Camera);
			}
			if (this.VelocityVector.X != 0 || this.VelocityVector.Y != 0 || this.VelocityVector.Z != 0 || this.RotateVelocityVector.X != 0 || this.RotateVelocityVector.Y != 0 || this.RotateVelocityVector.Z != 0)
			{
				if (_Camera.FrameRate != 0)
				{
					var __IncX = (DefaultSceneSettings.GameFPS / _Camera.FrameRate) * this.VelocityVector.X;
					var __IncY = (DefaultSceneSettings.GameFPS / _Camera.FrameRate) * this.VelocityVector.Y;
					var __IncZ = (DefaultSceneSettings.GameFPS / _Camera.FrameRate) * this.VelocityVector.Z;

					this.Translate(this.TranslateX.Value() + __IncX, this.TranslateY.Value() + __IncY, this.TranslateZ.Value() + __IncZ);
					__Translated = true;

					__IncX = (DefaultSceneSettings.GameFPS / _Camera.FrameRate) * this.RotateVelocityVector.X;
					__IncY = (DefaultSceneSettings.GameFPS / _Camera.FrameRate) * this.RotateVelocityVector.Y;
					__IncZ = (DefaultSceneSettings.GameFPS / _Camera.FrameRate) * this.RotateVelocityVector.Z;

					this.Rotate(this.RotateX.Value() + __IncX, this.RotateY.Value() + __IncY, this.RotateZ.Value() + __IncZ);
				}
			}

		}

		if (!__Translated)
		{
			if (this.PrivateTranslateX != this.TranslateX.Value() || this.PrivateTranslateY != this.TranslateY.Value() || this.PrivateTranslateZ != this.TranslateZ.Value())
			{
				this.Translate(this.TranslateX.Value(), this.TranslateY.Value(), this.TranslateZ.Value());
			}
		}

		if (this.PrivateScaleX != this.ScaleX.Value() || this.PrivateScaleY != this.ScaleY.Value() || this.PrivateScaleZ != this.ScaleZ.Value())
		{
			this.Scale(this.ScaleX.Value(), this.ScaleY.Value(), this.ScaleZ.Value());
		}

		this.RotateForRender2(_Camera, this.RotateX.Value(), this.RotateY.Value(), this.RotateZ.Value());
		_Camera.TransformVertexes(this.Mesh, this);

		var __WorldMat = new cMatrix4x4();
		__WorldMat.CopyFrom(this.OwnerScene.WorldMat);

		this.Visited = true;
		var __ChildModelCount = this.ChildModel.Count();
		for (var i = 0; i < __ChildModelCount; i++)
		{
			var __Item = this.ChildModel.GetItem(i);
			__Item.Initalize(_Camera);
			this.OwnerScene.WorldMat.CopyFrom(__WorldMat);
		}

		this.OwnerScene.WorldMat.Ident();
		_Camera.CalcAllTransforms();

		if (this.CalculateVertexNormalAndFaceNormal)
		{
			this.CalculateFacesNormal();
			this.CalculateVertexNormal();
			this.CalculateVertexNormalAndFaceNormal = false;
		}

		this.RenderSuccess = true;
		if (this.Material.GetTypeID() == ObjectTypes.cNoLightableVideo.ObjectTypeID)
		{
			this.Material.Initalize();
		}
	}
    ,
	LoadTexture: function (_Camera)
	{
		if (this.TextureData != null)
		{
			this.TextureImage = _Camera.OwnCameraController.GetImageFromImageData(this.TextureData);
			return this.TextureImage != false;
		}
		return false;
	}
    ,
	ControlTextureLoaded: function ()
	{
		if (this.Material.GetTypeID() == ObjectTypes.cNoLightableVideo.ObjectTypeID)
		{
			return this.Material.Ready();
		}
		else
		{
			if (this.TextureImage)
			{
				if (this.TextureImage.complete)
				{
					if (this.TextureImage.width != 0 && this.TextureImage.height != 0)
					{
						return true;
					}
				}
			}
		}
		return false;
	}
    ,
	ReRenderOnceEnabled: function ()
	{
		this.ReRenderTextureImage = true;
		this.TextureLoaded = false;
	}
    ,
	ReRenderIfRealTimeLightRenderEnabled: function ()
	{
		if (this.EnabledRealTimeLightRender)
		{
			this.ReRenderOnceEnabled();
		}
	}
    ,
	RenderFaceTexture: function (_Camera, _Face)
	{
		var __Mesh = this.Mesh;

		if (this.ReRenderTextureImage && this.Material.IsRenderable())
		{
			var __SurfaceFaceIndices = _Face.FaceIndex * 3;

			var __OrgX1 = __Mesh.Vertex[__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices] * 3];
			var __OrgY1 = __Mesh.Vertex[(__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices] * 3) + 1];
			var __OrgZ1 = __Mesh.Vertex[(__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices] * 3) + 2];

			var __Vertex1 = new cPoint(__OrgX1, __OrgY1, __OrgZ1);

			var __OrgX2 = __Mesh.Vertex[__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices + 1] * 3];
			var __OrgY2 = __Mesh.Vertex[(__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices + 1] * 3) + 1];
			var __OrgZ2 = __Mesh.Vertex[(__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices + 1] * 3) + 2];

			var __Vertex2 = new cPoint(__OrgX2, __OrgY2, __OrgZ2);


			var __OrgX3 = __Mesh.Vertex[__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices + 2] * 3];
			var __OrgY3 = __Mesh.Vertex[(__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices + 2] * 3) + 1];
			var __OrgZ3 = __Mesh.Vertex[(__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices + 2] * 3) + 2];

			var __Vertex3 = new cPoint(__OrgX3, __OrgY3, __OrgZ3);

			var __FaceCenter = new cPoint((__OrgX1 + __OrgX2 + __OrgX3) / 3, (__OrgY1 + __OrgY2 + __OrgY3) / 3, (__OrgZ1 + __OrgZ2 + __OrgZ3) / 3);


			var uv_X1 = __Mesh.UVTextureCoordinates[(__Mesh.SurfaceTextureIndices[__SurfaceFaceIndices] * 2)];
			var uv_Y1 = __Mesh.UVTextureCoordinates[(__Mesh.SurfaceTextureIndices[__SurfaceFaceIndices] * 2) + 1];

			var uv_X2 = __Mesh.UVTextureCoordinates[(__Mesh.SurfaceTextureIndices[__SurfaceFaceIndices + 1] * 2)];
			var uv_Y2 = __Mesh.UVTextureCoordinates[(__Mesh.SurfaceTextureIndices[__SurfaceFaceIndices + 1] * 2) + 1];

			var uv_X3 = __Mesh.UVTextureCoordinates[(__Mesh.SurfaceTextureIndices[__SurfaceFaceIndices + 2] * 2)];
			var uv_Y3 = __Mesh.UVTextureCoordinates[(__Mesh.SurfaceTextureIndices[__SurfaceFaceIndices + 2] * 2) + 1];

			var __Result = 0;
			try
			{
				__Result = this.Material.Render(_Camera, this, __FaceCenter, __Vertex1, __Vertex2, __Vertex3, __Mesh.SurfaceNormal[_Face.FaceIndex].SurfaceNormalVector, uv_X1, uv_Y1, __Mesh.VertexNormal[__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices]], uv_X2, uv_Y2, __Mesh.VertexNormal[__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices + 1]], uv_X3, uv_Y3, __Mesh.VertexNormal[__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices + 2]]);
			}
			catch (e)
			{
				__Result = 0;
			}
			if (!__Result)
			{
				this.RenderSuccess = false;
			}
		}
		else
		{
			this.RenderSuccess = false;
		}

	}
    ,
	CompleteRender: function (_Camera)
	{
		if (this.GetTypeID() != ObjectTypes.cNoLightableTexture.ObjectTypeID && this.Material.GetTypeID() != ObjectTypes.cNoLightableVideo.ObjectTypeID)
		{
			if (this.RenderSuccess)
			{
				this.ReRenderTextureImage = false;
				this.RenderSuccess = false;
			}

			if (!this.TextureLoaded)
			{
				this.TextureLoaded = this.LoadTexture(_Camera);
			}
			/*if (this.TextureLoaded)
			{
			_Camera.Canvas2dContent.drawImage(this.TextureImage, 0, 0);
			}*/

			if (DefaultSceneSettings.RenderRealTimeEnabled && this.EnabledRealTimeLightRender)
			{
				if (!this.RerenderCounter)
				{
					this.RerenderCounter = 0;
				}
				this.RerenderCounter++;
				if (this.RerenderCounter > DefaultSceneSettings.FrameCountReRender)
				{
					this.RerenderCounter = 0;
					this.ReRenderOnceEnabled();
				}
			}
		}
	}
	,
	DrawFace: function (_Camera, _Face)
	{

		if (this.Material.GetTypeID() != ObjectTypes.cNoLightableTexture.ObjectTypeID && this.Material.GetTypeID() != ObjectTypes.cNoLightableVideo.ObjectTypeID)
		{
			this.RenderFaceTexture(_Camera, _Face);
		}
		else if (this.Material.GetTypeID() == ObjectTypes.cNoLightableTexture.ObjectTypeID)
		{
			if (this.TextureImage == null)
			{
				this.Material.Render(_Camera, this);
			}
		}

		if (this.ControlTextureLoaded())
		{

			var __Mesh = this.Mesh;
			var __SurfaceFaceIndices = _Face.FaceIndex * 3;

			var __Z1 = __Mesh.Translated_Vertex[(__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices] * 4) + 2];
			var __Z2 = __Mesh.Translated_Vertex[(__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices + 1] * 4) + 2];
			var __Z3 = __Mesh.Translated_Vertex[(__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices + 2] * 4) + 2];





			if (this.Z_clip && (__Z1 < 0 || __Z1 > 1 || __Z2 < 0 || __Z2 > 1 || __Z3 < 0 || __Z3 > 1))
			{
				return;
			}

			var __Width, __Height;

			if (this.Material.GetTypeID() == ObjectTypes.cNoLightableVideo.ObjectTypeID)
			{
				__Width = this.Material.Video.videoWidth;
				__Height = this.Material.Video.videoHeight;
			}
			else
			{
				__Width = this.TextureImage.width;
				__Height = this.TextureImage.height;
			}

			var __TempMatrix = new cMatrix2x2();

			if (!this.SurfaceNormal) this.SurfaceNormal = 0;


			var __X1 = __Mesh.Translated_Vertex[__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices] * 4];
			var __Y1 = __Mesh.Translated_Vertex[(__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices] * 4) + 1];

			var __X2 = __Mesh.Translated_Vertex[__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices + 1] * 4];
			var __Y2 = __Mesh.Translated_Vertex[(__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices + 1] * 4) + 1];

			var __X3 = __Mesh.Translated_Vertex[__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices + 2] * 4];
			var __Y3 = __Mesh.Translated_Vertex[(__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices + 2] * 4) + 1];

			/*
			Çok çizim varsa ve yavaşlarsa burayı aç*/

			if ((((__X1 < 0 || __X1 > _Camera.Width) || (__Y1 < 0 || __Y1 > _Camera.Height)) && ((__X2 < 0 || __X2 > _Camera.Width) || (__Y2 < 0 || __Y2 > _Camera.Height)) && ((__X3 < 0 || __X3 > _Camera.Width) || (__Y3 < 0 || __Y3 > _Camera.Height))) && this.VertexOutLineControl)
			{
				return;
			}


			var vAd = [__X2 - __X1, __Y2 - __Y1];
			var vBd = [__X3 - __X1, __Y3 - __Y1];
			var vCd = [__X3 - __X2, __Y3 - __Y2];

			// z component of cross product < 0 ?
			if ((((vAd[0] * vCd[1]) - (vAd[1] * vCd[0])) * this.SurfaceNormal) < 0 && _Camera.ShadingType != ShadingTypes.Wire)
			{
				return;
			}

			var __OrgX1 = __Mesh.Vertex[__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices] * 3];
			var __OrgY1 = __Mesh.Vertex[(__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices] * 3) + 1];
			var __OrgZ1 = __Mesh.Vertex[(__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices] * 3) + 2];


			var __OrgX2 = __Mesh.Vertex[__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices + 1] * 3];
			var __OrgY2 = __Mesh.Vertex[(__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices + 1] * 3) + 1];
			var __OrgZ2 = __Mesh.Vertex[(__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices + 1] * 3) + 2];


			var __OrgX3 = __Mesh.Vertex[__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices + 2] * 3];
			var __OrgY3 = __Mesh.Vertex[(__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices + 2] * 3) + 1];
			var __OrgZ3 = __Mesh.Vertex[(__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices + 2] * 3) + 2];


			var uv_X1 = __Mesh.UVTextureCoordinates[(__Mesh.SurfaceTextureIndices[__SurfaceFaceIndices] * 2)];
			var uv_Y1 = __Mesh.UVTextureCoordinates[(__Mesh.SurfaceTextureIndices[__SurfaceFaceIndices] * 2) + 1];

			var uv_X2 = __Mesh.UVTextureCoordinates[(__Mesh.SurfaceTextureIndices[__SurfaceFaceIndices + 1] * 2)];
			var uv_Y2 = __Mesh.UVTextureCoordinates[(__Mesh.SurfaceTextureIndices[__SurfaceFaceIndices + 1] * 2) + 1];

			var uv_X3 = __Mesh.UVTextureCoordinates[(__Mesh.SurfaceTextureIndices[__SurfaceFaceIndices + 2] * 2)];
			var uv_Y3 = __Mesh.UVTextureCoordinates[(__Mesh.SurfaceTextureIndices[__SurfaceFaceIndices + 2] * 2) + 1];

			var __Distance = cMath.Distance3d(_Camera.CoordinateX.Value(), _Camera.CoordinateY.Value(), _Camera.CoordinateZ.Value(), (__OrgX1 + __OrgX2 + __OrgX3) / 3, (__OrgY1 + __OrgY2 + __OrgY3) / 3, (__OrgZ1 + __OrgZ2 + __OrgZ3) / 3);


			if (_Camera.ShadingType == ShadingTypes.Smooth3D)
			{
				var __MyColor = new cColor((255 / 255), (255 / 255), (255 / 255), 1);
				if (this.DoSmooth3D(_Camera, __MyColor, __X1, __Y1, __X2, __Y2, __X3, __Y3, __Distance))
				{
					//console.log("Distance : " + __Distance);
					__MyColor.Destroy();
					return;
				}
				__MyColor.Destroy();
			}
			else if (_Camera.ShadingType == ShadingTypes.WireFrame || _Camera.ShadingType == ShadingTypes.Wire)
			{
				if (this.DoWireFrame(_Camera, __X1, __Y1, __X2, __Y2, __X3, __Y3))
				{
					return;
				}
			}
			else if (_Camera.ShadingType == ShadingTypes.Smooth)
			{
				if (this.DoSmooth(_Camera, __X1, __Y1, __X2, __Y2, __X3, __Y3))
				{
					return;
				}
			}
			else if (_Camera.ShadingType == ShadingTypes.SmootWire)
			{
				if (this.DoSmootWire(_Camera, __X1, __Y1, __X2, __Y2, __X3, __Y3))
				{
					return;
				}
			}
			else if (_Camera.ShadingType == ShadingTypes.TexturedWire)
			{
				this.DoTexturedWire(_Camera, __X1, __Y1, __X2, __Y2, __X3, __Y3)
			}


			var vA = [uv_X2 - uv_X1, uv_Y2 - uv_Y1];
			var vB = [uv_X3 - uv_X1, uv_Y3 - uv_Y1];

			vA[0] *= __Width;
			vA[1] *= __Height;

			vB[0] *= __Width;
			vB[1] *= __Height;

			__TempMatrix._11 = vA[0];
			__TempMatrix._12 = vA[1];
			__TempMatrix._21 = vB[0];
			__TempMatrix._22 = vB[1];

			var __InvertedTempMatrix = __TempMatrix.GetInvert();
			if (!__InvertedTempMatrix)
			{
				return;
			}

			var a = __InvertedTempMatrix._11 * vAd[0] + __InvertedTempMatrix._12 * vBd[0];
			var b = __InvertedTempMatrix._21 * vAd[0] + __InvertedTempMatrix._22 * vBd[0];

			var c = __InvertedTempMatrix._11 * vAd[1] + __InvertedTempMatrix._12 * vBd[1];
			var d = __InvertedTempMatrix._21 * vAd[1] + __InvertedTempMatrix._22 * vBd[1];

			var wu = uv_X1 * __Width;
			var hv = uv_Y1 * __Height;

			var du = wu * a + hv * b;
			var dv = wu * c + hv * d;



			_Camera.Canvas2dContent.save();
			_Camera.Canvas2dContent.beginPath();

			_Camera.Canvas2dContent.moveTo(__X1, __Y1);
			_Camera.Canvas2dContent.lineTo(__X2, __Y2);
			_Camera.Canvas2dContent.lineTo(__X3, __Y3);

			_Camera.Canvas2dContent.clip();
			_Camera.Canvas2dContent.transform(a, c, b, d, __X1 - du, __Y1 - dv);

			// bounds
			var bx = [wu, wu + vA[0], wu + vB[0]];
			var by = [hv, hv + vA[1], hv + vB[1]];

			bx.sort(this.NumberCmpForSort);
			by.sort(this.NumberCmpForSort);

			var bw = bx[2] - bx[0];
			var bh = by[2] - by[0];

			if ((bx[0] + bw) <= (__Width - 2)) bw++;
			if ((by[0] + bh) <= (__Height - 2)) bh++;
			if (bx[0] >= 1) { bx[0]--; bw++; }
			if (by[0] >= 1) { by[0]--; bh++; }


			if (this.LighterModel)
			{
				_Camera.Canvas2dContent.globalCompositeOperation = "lighter";
			}

			if (this.Material.GetTypeID() == ObjectTypes.cNoLightableVideo.ObjectTypeID)
			{
				_Camera.Canvas2dContent.drawImage(this.Material.Video, 0, 0, __Width, __Height, 0, 0, __Width, __Height);

				//_Camera.Canvas2dContent.drawImage(this.Material.Video, bx[0], by[0], bw, bh, bx[0], by[0], bw, bh);
			}
			else
			{
				_Camera.Canvas2dContent.drawImage(this.TextureImage, 0, 0, __Width, __Height, 0, 0, __Width, __Height);

				//_Camera.Canvas2dContent.drawImage(this.TextureImage, bx[0], by[0], bw, bh, bx[0], by[0], bw, bh);
			}

			if (this.LighterModel)
			{
				_Camera.Canvas2dContent.globalCompositeOperation = "source-over";
			}

			_Camera.Canvas2dContent.restore();
		}

	}



}, {});







