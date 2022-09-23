
var cBaseUnitModel = Class(cBaseObject,
{
	ObjectType: ObjectTypes.cBaseUnitModel
	, RootModel : null
	, Scene : null
	, ModelID : null
	, OwnGameGraph : null
    , ModelList : null
	,
	constructor: function (_OwnGameGraph, _ModelID, _X , _Y, _Z, _RoateX, _RotateY, _Rotate, _ScaleX, _ScaleY, _ScaleZ)
	{
		cBaseUnitModel.BaseObject.constructor.call(this);
		this.OwnGameGraph = _OwnGameGraph;
		this.GameScene = this.OwnGameGraph.GameScene;
		this.ModelID = _ModelID;

		var __MaterialCore = this.GameScene.CreateMaterialCore_SolidColor(Colors.White, 10, 10);
		var __Material = this.GameScene.CreateMaterial_Lambert(__MaterialCore, 0, 1, Colors.White, 0, 1, Colors.White, 0, 1, Colors.White);
		var __Mesh = new cRootModelMesh();
		this.RootModel = this.GameScene.CreateModel(0 , 0, 0, 0, 0, 0, 1, 1, 1, __Mesh, __Material, -1 , true, false, false);
		
		this.ModelList = this.RootModel.ChildModel;

	}
	,
	GetCoordinate : function()
	{
	    return new cPoint(this.RootModel.TranslateX.Value(), this.RootModel.TranslateY.Value(), this.RootModel.TranslateZ.Value());
	}
	,
	GetRotate : function()
	{
	    return new cPoint(this.RootModel.RotateX.Value(), this.RootModel.RotateY.Value(), this.RootModel.RotateZ.Value());
	}
	,
	GetScale : function()
	{
	    return new cPoint(this.RootModel.ScaleX.Value(), this.RootModel.ScaleY.Value(), this.RootModel.ScaleZ.Value());
	}
	,
	SetCoordinate : function(_X, _Y, _Z)
	{
	    this.RootModel.Translate(_X, _Y, _Z);
	}
	,
	SetRotate : function(_X, _Y, _Z)
	{
	    this.RootModel.Rotate(_X, _Y, _Z);
	}
	,
	SetScale : function(_X, _Y, _Z)
	{
	    this.RootModel.Scale(_X, _Y, _Z);
	}
	,
	BaseObject: function ()
	{
		return cBaseObject.prototype;
	}
	,
	Destroy: function ()
	{
	    this.RootModel.Destroy();
	    delete this.Scene;
	    delete this.ModelID;
        delete this.ModelList;
        delete this.RootModel
		cBaseObject.prototype.Destroy.call(this);        
	}

}, {});








