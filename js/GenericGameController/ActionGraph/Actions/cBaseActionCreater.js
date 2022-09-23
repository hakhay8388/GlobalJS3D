
var cBaseActionCreater = Class(cBaseObject,
{
	ObjectType: ObjectTypes.cBaseActionCreater
	, ActionGraph : null
	,
	constructor: function (_ActionGraph)
	{
	    cBaseActionCreater.BaseObject.constructor.call(this);
	    this.ActionGraph = _ActionGraph;
	}
	,
	BaseObject: function ()
	{
		return cBaseObject.prototype;
	}
	,
	Destroy: function ()
	{
	    delete  this.ActionGraph;
	    cBaseObject.prototype.Destroy.call(this);
	}

}, {});







