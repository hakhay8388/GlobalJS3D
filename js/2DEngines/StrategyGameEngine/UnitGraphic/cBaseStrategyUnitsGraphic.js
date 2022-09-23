
var cBaseStrategyUnitsGraphic = Class(cBaseObject,
{
	ObjectType: ObjectTypes.cBaseStrategyUnitsGraphic
	, StrategyGameGraph: null
	, OwnerUnit: null
	, CameraList: null
	,
	constructor: function (_OwnerUnit)
	{
		cBaseStrategyUnitsGraphic.BaseObject.constructor.call(this);
		this.OwnerUnit = _OwnerUnit;
		this.StrategyGameGraph = _OwnerUnit.StrategyGameGraph;
		this.CameraList = _OwnerUnit.CameraList;
	}
	,
	Draw: function ()
	{
		DebugAlert.Show("cBaseStrategyUnitsGraphic Draw Fonksiyonu Override Edilmedi..!");
	}
    ,
	BaseObject: function ()
	{
		return cBaseObject.prototype;
	}
	,
	Destroy: function ()
	{
		delete this.StrategyGameGraph;
		delete this.OwnerUnit;
		delete this.CameraList;
		cBaseObject.prototype.Destroy.call(this);
	}
	,
	GetRealCoordinate: function ()
	{
		return this.OwnerUnit.GetRealCoordinate();
	}
}, {});









