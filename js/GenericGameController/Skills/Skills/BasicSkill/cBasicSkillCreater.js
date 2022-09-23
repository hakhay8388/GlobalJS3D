
var cBasicSkillCreater = Class(cBaseSkillCreater,
{
	ObjectType: ObjectTypes.cBasicSkillCreater
	,
	constructor: function (_OnlineGameGraph)
	{
		cBasicSkillCreater.BaseObject.constructor.call(this, _OnlineGameGraph, SkillIDs.BasicSkill);
	}
	,
	BaseObject: function ()
	{
		return cBaseSkillCreater.prototype;
	}
	,
	Create: function (_CoordinateX, _CoordinateY, _CoordinateZ, _VelocityX, _VelocityY, _VelocityZ, _AttackAccelerationPower, _MySkill)
	{
		var __Skill = new cBasicSkill(this.OnlineGameGraph, _CoordinateX, _CoordinateY, _CoordinateZ, _VelocityX, _VelocityY, _VelocityZ, _AttackAccelerationPower, _MySkill);
	}
	,
	Destroy: function ()
	{
		cBaseSkillCreater.prototype.Destroy.call(this);
	}

}, {});







