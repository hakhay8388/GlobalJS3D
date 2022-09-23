
var cBasePartical = Class(cBaseObject, {
	ObjectType: ObjectTypes.cBasePartical
	, OwnerEmiter : null
	, Model : null
	, LastVelocityX : 0
	, LastVelocityY : 0
	, LastVelocityZ : 0		
	, CreateTime : null
	, DisabledTime : null
	, FPSLeftoverCount : 0	
	,
	constructor: function (_OwnerEmiter, _Model)
	{
		cBasePartical.BaseObject.constructor.call(this);
		this.OwnerEmiter = _OwnerEmiter;
		this.Model = _Model;
	    this.CreateTime = new Date();
		this.OwnerEmiter.ParticalList.Add(this);
	}
	,
	BaseObject: function ()
	{
		return cBaseObject.prototype;
	}
	,
	Destroy: function ()
	{
	    this.OwnerEmiter.ParticalList.Remove(this);
	    this.Model.Destroy();
	    delete this.OwnerEmiter;
	    delete this.Model;
	    delete this.LastVelocityX;
	    delete this.LastVelocityY;
	    delete this.LastVelocityZ;		
	    delete this.DisabledTime;
	    delete this.CreateTime;
		cBaseObject.prototype.Destroy.call(this);
	}
	,
	Run: function(_FPS)
	{
	    DebugAlert.Show("cBasePartical İçindeki Run Override Edilmedi..!");
	}
}, {});






