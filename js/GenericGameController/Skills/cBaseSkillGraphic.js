
var cBaseSkillGraphic = Class(cBaseObject,
{
	ObjectType: ObjectTypes.cBaseSkillGraphic
	, OnlineGameGraph: null
	, BaseSkill: null
	,
	constructor: function (_OnlineGameGraph, _BaseSkill)
	{
		cBaseSkillGraphic.BaseObject.constructor.call(this);
		this.OnlineGameGraph = _OnlineGameGraph;
		this.BaseSkill = _BaseSkill;
	}
	,
	Update: function ()
	{
		DebugAlert.Show("cBaseSkillGraphic Update() fonksiyonu override edlimedi..!");
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

}, {});







