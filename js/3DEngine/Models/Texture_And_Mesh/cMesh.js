

cMesh = Class(cBaseObject,
{
	ObjectType: ObjectTypes.cMesh
	, Translated_Vertex: null
	, Vertex: null
	, UVTextureCoordinates: null
	, SurfaceVertexIndices: null
	, SurfaceTextureIndices: null
	, SurfaceNormal: null
	, VertexNormal: null
	,
	constructor: function (_Vertex, _UVTextureCoordinates, _SurfaceVertexIndices, _SurfaceTextureIndices)
	{
		cMesh.BaseObject.constructor.call(this);
		this.Vertex = _Posision;
		this.UVTextureCoordinates = _UVTextureCoordinates;
		this.SurfaceVertexIndices = _SurfaceVertexIndices;
		this.SurfaceTextureIndices = _SurfaceTextureIndices;
	}
    ,
	BaseObject: function ()
	{
		return cBaseObject.prototype;
	}
    ,
	Destroy: function ()
	{
		delete this.Translated_Vertex;
		delete this.Vertex;
		delete this.UVTextureCoordinates;
		delete this.SurfaceVertexIndices;
		delete this.SurfaceTextureIndices;
		delete this.SurfaceNormal;
		delete this.VertexNormal;
		cBaseObject.prototype.Destroy.call(this);
	}
}, {});

