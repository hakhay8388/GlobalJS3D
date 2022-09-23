
var cBasicSkill = Class(cBaseSkill,
{
	ObjectType: ObjectTypes.cBasicSkill
	,
	constructor: function (_OnlineGameGraph, _CoordinateX, _CoordinateY, _CoordinateZ, _VelocityX, _VelocityY, _VelocityZ, _AttackAccelerationPower, _MySkill)
	{
		cBasicSkill.BaseObject.constructor.call(this, _OnlineGameGraph, SkillIDs.BasicSkill, _CoordinateX, _CoordinateY, _CoordinateZ, _VelocityX, _VelocityY, _VelocityZ, _AttackAccelerationPower, _MySkill);
		this.SkillGraphic = new cBasicSkillGraphic(_OnlineGameGraph, this);
	}
	,
	BaseObject: function ()
	{
		return cBaseSkill.prototype;
	}
	,
	Destroy: function ()
	{
		cBaseSkill.prototype.Destroy.call(this);
	}

}, {});







