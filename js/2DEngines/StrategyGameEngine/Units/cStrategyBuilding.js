
var cStrategyBuilding = Class(cBaseStrategyUnits,
{
	ObjectType: ObjectTypes.cStrategyBuilding
	,
	constructor: function (_StrategyGameGraph)
	{
		cStrategyBuilding.BaseObject.constructor.call(this, _StrategyGameGraph);
	}
    ,
	BaseObject: function ()
	{
		return cBaseStrategyUnits.prototype;
	}
	,
	Destroy: function ()
	{
		cBaseStrategyUnits.prototype.Destroy.call(this);
	}
}, {});









