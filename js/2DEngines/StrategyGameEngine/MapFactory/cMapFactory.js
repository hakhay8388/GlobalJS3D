
var cMapFactory = Class(cBaseObject,
{
	ObjectType: ObjectTypes.cMapFactory
	, StrategyGameGraph: null
	,
	constructor: function (_StrategyGameGraph)
	{
		cMapFactory.BaseObject.constructor.call(this);
		this.StrategyGameGraph = _StrategyGameGraph;
	}
	,
	CreateGreenMap: function ()
	{
		if (this.StrategyGameGraph.Map == null)
		{
			this.StrategyGameGraph.Map = new cGrassMap1(this.StrategyGameGraph);
		}
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









