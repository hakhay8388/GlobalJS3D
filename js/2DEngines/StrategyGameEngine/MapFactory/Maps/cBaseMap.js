
var cBaseMap = Class(cBaseObject,
{
	ObjectType: ObjectTypes.cBaseMap
	, StrategyGameGraph: null
	, MapTexture: null
	,
	constructor: function (_StrategyGameGraph, _ImagePath)
	{
		cBaseMap.BaseObject.constructor.call(this);
		this.StrategyGameGraph = _StrategyGameGraph;
		this.MapTexture = this.StrategyGameGraph.OwnerScene.CreateComponentTexture(_ImagePath, null, null, null, true, 100, 0, Colors.Pink);
	}
    ,
	BaseObject: function ()
	{
		return cBaseObject.prototype;
	}
	,
	IsComplete: function ()
	{
		return this.MapTexture.IsComplete();
	}
	,
	Destroy: function ()
	{
		cBaseObject.prototype.Destroy.call(this);
	}
	,
	Draw: function (_Camera)
	{
		DebugAlert.Show(this.ObjectType.ObjectName + " içindeki Draw() fonksiyonu override edilmemiş..!");
	}

}, {});









