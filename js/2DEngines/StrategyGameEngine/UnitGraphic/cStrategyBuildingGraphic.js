
var cStrategyBuildingGraphic = Class(cBaseStrategyUnitsGraphic,
{
	ObjectType: ObjectTypes.cStrategyBuildingGraphic
	,
	constructor: function (_StrategyGameGraph)
	{
		cStrategyBuildingGraphic.BaseObject.constructor.call(this, _StrategyGameGraph);
	}
    ,
	BaseObject: function ()
	{
		return cBaseStrategyUnitsGraphic.prototype;
	}
	,
	Destroy: function ()
	{
		cBaseStrategyUnitsGraphic.prototype.Destroy.call(this);
	}
}, {});









