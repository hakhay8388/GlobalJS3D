
var cBaseParticalFactory = Class(cBaseObject, {
	ObjectType: ObjectTypes.cBaseParticalFactory
	, OwnerScene : null
	, LighterPartical : false
	, DestroyParticalOneByOne : false
	,
	constructor: function (_OwnerScene, _LighterPartical)
	{
		cBaseParticalFactory.BaseObject.constructor.call(this, _LighterPartical);
		this.OwnerScene = _OwnerScene;
		this.LighterPartical = _LighterPartical;
		this.OwnerScene.ModelParticalFactoryList.Add(this);
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
	,
	CreatePartical : function(_OwnerEmiter, _Count)
	{
	    DebugAlert.Show("cBaseParticalFactory İçindeki CreatePartical Override Edilmedi..!");
	}
}, {});






