

var cCicleMesh = function (_CenterX, _CenterY, _CenterZ, _Radius, _StartAngle, _SweetAngle, _PolygonCount)
{
	this.Vertex = [
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


	if (_PolygonCount < 3)
	{
	    _PolygonCount = 3;
	}
	
	var __Angle = (_SweetAngle - _StartAngle) / _PolygonCount;
	var __VertexIndex = 0;
	for (var i = 0; i < _PolygonCount; i++)
	{
	   
	   var __Vertex1X = _CenterX + (Math.sin((__Angle * i) + _StartAngle) * _Radius);
	   var __Vertex1Z = _CenterZ + (Math.cos((__Angle * i) + _StartAngle)* _Radius);
	   this.Vertex[__VertexIndex * 3] = __Vertex1X;
	   this.Vertex[(__VertexIndex * 3) + 1] = _CenterY;
	   this.Vertex[(__VertexIndex * 3) + 2] = __Vertex1Z;
	   this.SurfaceVertexIndices[__VertexIndex] = __VertexIndex;
	   this.SurfaceTextureIndices[__VertexIndex] = 0;
	   
	   __VertexIndex++;
	   
	   var __Vertex2X = _CenterX + (Math.sin((__Angle * (i + 1)) + _StartAngle) * _Radius);
	   var __Vertex2Z = _CenterZ + (Math.cos((__Angle * (i + 1)) + _StartAngle) * _Radius);
	   this.Vertex[__VertexIndex * 3] = __Vertex2X;
	   this.Vertex[(__VertexIndex * 3) + 1] = _CenterY;
	   this.Vertex[(__VertexIndex * 3) + 2] = __Vertex2Z;
	   this.SurfaceVertexIndices[__VertexIndex] = __VertexIndex;
	   this.SurfaceTextureIndices[__VertexIndex] = 0;
	   __VertexIndex++;
	   
	   this.Vertex[__VertexIndex * 3] = (__Vertex1X + __Vertex2X) / 2;
	   this.Vertex[(__VertexIndex * 3) + 1] = _CenterY;
	   this.Vertex[(__VertexIndex * 3) + 2] = (__Vertex1Z + __Vertex2Z) / 2;
	   this.SurfaceVertexIndices[__VertexIndex] = __VertexIndex;
	   this.SurfaceTextureIndices[__VertexIndex] = 0;	   
	   __VertexIndex++;
	}
	
};

var cCircle = Class(cBaseModel,
{
	ObjectType: ObjectTypes.cCircle
    ,
	constructor: function (_OwnerScene, _X, _Y, _Z, _Radius, _StartAngle, _SweetAngle, _PolygonCount, _Color, _LineWidth, _LighterModel)
	{
		var __Mesh = new cCicleMesh(0, 0, 0, _Radius, _StartAngle, _SweetAngle, _PolygonCount);
		cCircle.BaseObject.constructor.call(this, _OwnerScene, _X, _Y, _Z, 0, 0, 0, 1, 1, 1, __Mesh, null, 0, true, false, false, _LighterModel);
		this.m_Color = _Color;
		this.m_LineWidth = _LineWidth;
	}
	,
	SetTransparency : function(_Transparency)
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
        var __SurfaceFaceIndices = _Face.FaceIndex * 3;
            
        var __Z1 = __Mesh.Translated_Vertex[(__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices] * 4) + 2];
        var __Z2 = __Mesh.Translated_Vertex[(__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices + 1] * 4) + 2];
        var __Z3 = __Mesh.Translated_Vertex[(__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices + 2] * 4) + 2];

        if (this.Z_clip && (__Z1 < 0 || __Z1 > 1 || __Z2 < 0 || __Z2 > 1 || __Z3 < 0 || __Z3 > 1))
        {
            return;
        }

        var __X1 = __Mesh.Translated_Vertex[__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices] * 4];
        var __Y1 = __Mesh.Translated_Vertex[(__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices] * 4) + 1];

        var __X2 = __Mesh.Translated_Vertex[__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices + 1] * 4];
        var __Y2 = __Mesh.Translated_Vertex[(__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices + 1] * 4) + 1];

        var __X3 = __Mesh.Translated_Vertex[__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices + 2] * 4];
        var __Y3 = __Mesh.Translated_Vertex[(__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices + 2] * 4) + 1];
        
        _Camera.Canvas2dContent.strokeStyle = this.m_Color.toString();
		_Camera.Canvas2dContent.lineWidth = this.m_LineWidth;
		_Camera.Canvas2dContent.beginPath();
		_Camera.Canvas2dContent.moveTo(__X1, __Y1);
		_Camera.Canvas2dContent.lineTo(__X2, __Y2);
		_Camera.Canvas2dContent.stroke();
    }
	,
	IsModel : function()
	{
	    return false;
	}
    ,
    IsCirle: function()
    {
        return true;
    }

}, {});








