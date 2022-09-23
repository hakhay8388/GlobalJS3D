
var cBaseChar = Class(cBaseObject,
{
	ObjectType: ObjectTypes.cBaseChar
	, OnlineGameGraph : null
	, CharID : 0
	,
	constructor: function (_OnlineGameGraph, _CharID)
	{
		cBaseChar.BaseObject.constructor.call(this);
		this.OnlineGameGraph = _OnlineGameGraph;
		this.CharID = _CharID;
	}
	,
	BaseObject: function ()
	{
		return cBaseObject.prototype;
	}
	,
	Destroy: function ()
	{
	    delete this.OnlineGameGraph;
	    delete this.CharID;
		cBaseObject.prototype.Destroy.call(this);
	}
	
}, {});







