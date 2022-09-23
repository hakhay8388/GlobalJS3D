
var cBaseComponentGraphic = Class(cBaseObject,
{
	ObjectType: ObjectTypes.cBaseControl
	, OwnerComponent: null
	, CameraList: null
	,
	constructor: function (_OwnerComponent)
	{
		cBaseComponentGraphic.BaseObject.constructor.call(this);
		this.OwnerComponent = _OwnerComponent;
		this.CameraList = _OwnerComponent.CameraList;
	}
	,
	BaseObject: function ()
	{
		return cBaseObject.prototype;
	}
	,
	Draw: function ()
	{
		DebugAlert.Show("cBaseComponentGraphic Draw Fonksiyonu Override Edilmedi..!");
	}
	,
	DrawText: function ()
	{
		DebugAlert.Show("cBaseComponentGraphic DrawText Fonksiyonu Override Edilmedi..!");
	}
	,
	Destroy: function ()
	{
		delete this.OwnerComponent;
		cBaseObject.prototype.Destroy.call(this);
	}
	,
	GetRealCoordinate: function ()
	{
		return this.OwnerComponent.GetRealCoordinate();
	}
}, {});




