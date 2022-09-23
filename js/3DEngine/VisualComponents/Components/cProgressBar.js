
var cProgressBar = Class(cBaseControl, {
	ObjectType: ObjectTypes.cProgressBar
	, Percent: 0
	,
	constructor: function (_ComponentController, _OwnerComponent, _ComponentName, _Left, _Top, _Width, _Height, _TopOrder, _Percent)
	{
		cProgressBar.BaseObject.constructor.call(this, _ComponentController, _OwnerComponent, _ComponentName, _Left, _Top, _Width, _Height, _TopOrder);
		this.ComponentGraphic = new cProgressBarGraphic(this);
		this.Percent = _Percent;
	}
	,
	Draw: function ()
	{
		return cBaseControl.prototype.Draw.call(this);
	}
	,
	BaseObject: function ()
	{
		return cBaseControl.prototype;
	},
	Destroy: function ()
	{
		this.OnDisposed.Run(null);
		delete this.Percent;
		cBaseControl.prototype.Destroy.call(this);
	}
}, {});




