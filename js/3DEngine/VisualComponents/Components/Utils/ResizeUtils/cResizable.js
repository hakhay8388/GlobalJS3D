
var cResizable = Class(cBaseObject,
{
	ObjectType: ObjectTypes.cResizable
	, ComponentController: null
	, OwnerComponent: null
	, LeftResizeItem: null
	, RightResizeItem: null
	, TopResizeItem: null
	, BottomResizeItem: null
	,
	constructor: function (_ComponentController, _OwnerComponent)
	{
		cResizable.BaseObject.constructor.call(this);
		this.ComponentController = _ComponentController;
		this.OwnerComponent = _OwnerComponent;
		this.LeftResizeItem = new cResizeItem(_ComponentController, _OwnerComponent, true, false, false, false);
		this.LeftResizeItem.Cursor = "w-resize";
		this.RightResizeItem = new cResizeItem(_ComponentController, _OwnerComponent, false, true, false, false);
		this.RightResizeItem.Cursor = "w-resize";
		this.TopResizeItem = new cResizeItem(_ComponentController, _OwnerComponent, false, false, true, false);
		this.TopResizeItem.Cursor = "s-resize";
		this.BottomResizeItem = new cResizeItem(_ComponentController, _OwnerComponent, false, false, false, true);
		this.BottomResizeItem.Cursor = "s-resize";
	}
	,
	BaseObject: function ()
	{
		return cBaseObject.prototype;
	}
	,
	Destroy: function ()
	{

		this.LeftResizeItem.Destroy();
		this.RightResizeItem.Destroy();
		this.TopResizeItem.Destroy();
		this.BottomResizeItem.Destroy();

		delete this.ComponentController;
		delete this.OwnerComponent;
		delete this.LeftResizeItem;
		delete this.RightResizeItem;
		delete this.TopResizeItem;
		delete this.BottomResizeItem;

		cBaseObject.prototype.Destroy.call(this);
	}
	,
	Resizing: function ()
	{
		return this.LeftResizeItem.MouseDowned || this.RightResizeItem.MouseDowned || this.TopResizeItem.MouseDowned || this.BottomResizeItem.MouseDowned;
	}

}, {});




