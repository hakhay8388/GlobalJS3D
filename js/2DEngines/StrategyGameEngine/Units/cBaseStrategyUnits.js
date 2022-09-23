
var cBaseStrategyUnits = Class(cObserverable,
{
	ObjectType: ObjectTypes.cBaseStrategyUnits
	, StrategyGameGraph: null
	, CameraList: null
	, UnitGraphic: null
	,
	constructor: function (_StrategyGameGraph)
	{
		cBaseStrategyUnits.BaseObject.constructor.call(this);
		this.StrategyGameGraph = _StrategyGameGraph;
	}
    ,
	BaseObject: function ()
	{
		return cBaseObject.prototype;
	}
	,
	Destroy: function ()
	{
		cBaseObject.prototype.Destroy.call(this);
	}
}, {});









