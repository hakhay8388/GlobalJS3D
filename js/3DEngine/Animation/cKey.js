
var cKey = Class(cBaseObject, {
	ObjectType: ObjectTypes.cKey
	, Frame : 0
	, Value : 0
	,
	constructor: function (_Frame, _Value)
	{
		cKey.BaseObject.constructor.call(this);
		this.Frame = _Frame;
		this.Value = _Value;
	}
	,
	BaseObject: function ()
	{
		return cBaseObject.prototype;
	}
	,
	Destroy: function ()
	{
		delete this.Frame;
		delete this.Value;
		cBaseObject.prototype.Destroy.call(this);		
	}

}, {});






