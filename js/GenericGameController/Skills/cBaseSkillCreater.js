
var cBaseSkillCreater = Class(cBaseObject,
{
	ObjectType: ObjectTypes.cBaseSkillCreater
	, OnlineGameGraph: null
	, SkillID: null
	,
	constructor: function (_OnlineGameGraph, _SkillID)
	{
		cBaseSkillCreater.BaseObject.constructor.call(this);
		this.OnlineGameGraph = _OnlineGameGraph;
		this.SkillID = _SkillID;
	}
	,
	BaseObject: function ()
	{
		return cBaseObject.prototype;
	}
	,
	Create: function ()
	{
		DebugAlert.Show("cBaseSkillCreater içindeki Create() fonksiyonu override edilmedi..!");
	}
	,
	Destroy: function ()
	{
		delete this.OnlineGameGraph;
		cBaseObject.prototype.Destroy.call(this);
	}

}, {});







