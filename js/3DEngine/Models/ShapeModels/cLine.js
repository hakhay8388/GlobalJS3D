
var cLineMesh = function (_X1, _Y1, _Z1, _X2, _Y2, _Z2)
{
	this.Vertex = [
		_X1, _Y1, _Z1,
		_X2, _Y2, _Z2,
		(_X1 + _X2) / 2, (_Y1 + _Y2) / 2, (_Z1 + _Z2) / 2
	];

	this.SurfaceVertexIndices = [
        0, 1, 2
	];

	this.SurfaceTextureIndices = [
	    0, 0, 0
	];
	
	this.UVTextureCoordinates = [
		0, 0 
    ];
	this.Destroy = function ()
	{
		delete this.Posision;
	}
	
	this.Translated_Vertex = [];
	this.SurfaceNormal = [];
	this.VertexNormal = [];

	this.Destroy = function ()
	{
		delete this.Translated_Vertex;
		delete this.Vertex;
		delete this.UVTextureCoordinates;
		delete this.SurfaceVertexIndices;
		delete this.SurfaceTextureIndices;
		delete this.SurfaceNormal;
		delete this.VertexNormal;
	}	
};

var cLine = Class(cBaseModel,
{
	ObjectType: ObjectTypes.cLine
    ,
	constructor: function (_OwnerScene, _X1, _Y1, _Z1, _X2, _Y2, _Z2, _Color, _LineWidth, _LighterModel)
	{
		var __Mesh = new cLineMesh(_X1, _Y1, _Z1, _X2, _Y2, _Z2);
		cLine.BaseObject.constructor.call(this, _OwnerScene, 0, 0, 0, 0, 0, 0, 1, 1, 1, __Mesh, null, 0, true, false, false, _LighterModel);

		if (_LineWidth)
		{
			this.m_LineWidth = _LineWidth;
		}
		else
		{
			this.m_LineWidth = DefaultSceneSettings.LineWidth;
		}

		if (_Color)
		{
			this.m_Color = _Color.CreateNewCopy();
		}
		else
		{
			this.m_Color = DefaultSceneSettings.DefultCurveColor.CreateNewCopy();
		}
	}
	,
	SetTransparency: function (_Transparency)
	{
		this.m_Color.Transparent = _Transparency;
	}
    ,
	BaseObject: function ()
	{
		return cBaseModel.prototype;
	}
    ,
	Destroy: function ()
	{
		cBaseModel.prototype.Destroy.call(this);
	}
	,
	Initalize: function (_Camera)
	{
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

					__IncX = (DefaultSceneSettings.GameFPS / _Camera.FrameRate) * this.RotateVelocityVector.X;
					__IncY = (DefaultSceneSettings.GameFPS / _Camera.FrameRate) * this.RotateVelocityVector.Y;
					__IncZ = (DefaultSceneSettings.GameFPS / _Camera.FrameRate) * this.RotateVelocityVector.Z;

					this.Rotate(this.RotateX.Value() + __IncX, this.RotateY.Value() + __IncY, this.RotateZ.Value() + __IncZ);
				}
			}

		}

		this.RotateForRender(_Camera, this.RotateX.Value(), this.RotateY.Value(), this.RotateZ.Value());
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
	}
    ,
	CompleteRender: function (_Camera)
	{
	}
    ,
	DrawFace: function (_Camera, _Face)
	{
		var __Mesh = this.Mesh;
		var __Z1 = __Mesh.Translated_Vertex[2];
		var __Z2 = __Mesh.Translated_Vertex[6];

		if (this.Z_clip && (__Z1 < 0 || __Z1 > 1 || __Z2 < 0 || __Z2 > 1))
		{
			return;
		}

		_Camera.Canvas2dContent.strokeStyle = this.m_Color.toString();
		_Camera.Canvas2dContent.lineWidth = this.m_LineWidth;
		_Camera.Canvas2dContent.beginPath();
		_Camera.Canvas2dContent.moveTo(this.Mesh.Translated_Vertex[0], this.Mesh.Translated_Vertex[1]);
		_Camera.Canvas2dContent.lineTo(this.Mesh.Translated_Vertex[4], this.Mesh.Translated_Vertex[5]);
		_Camera.Canvas2dContent.stroke();
	}
    ,
	UpdateCoordinate: function (_X1, _Y1, _Z1, _X2, _Y2, _Z2)
	{
		this.Mesh.Vertex[0] = _X1;
		this.Mesh.Vertex[1] = _Y1;
		this.Mesh.Vertex[2] = _Z1;
		this.Mesh.Vertex[3] = _X2;
		this.Mesh.Vertex[4] = _Y2;
		this.Mesh.Vertex[5] = _Z2;
		this.Mesh.Vertex[6] = (_X1 + _X2) / 2;
		this.Mesh.Vertex[7] = (_Y1 + _Y2) / 2;
		this.Mesh.Vertex[8] = (_Z1 + _Z2) / 2;
	}
	,
	IsModel: function ()
	{
		return false;
	}
    ,
	IsLine: function ()
	{
		return true;
	}

}, {});




