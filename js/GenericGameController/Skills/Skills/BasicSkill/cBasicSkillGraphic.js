
var cBasicSkillGraphic = Class(cBaseSkillGraphic,
{
	ObjectType: ObjectTypes.cBasicSkillGraphic
	, Fire: null
	,
	constructor: function (_OnlineGameGraph, _BaseSkill)
	{
		cBasicSkillGraphic.BaseObject.constructor.call(this, _OnlineGameGraph, _BaseSkill);
		this.Fire = _OnlineGameGraph.GameUnitGraph.GameScene.CreateTail(_BaseSkill.CoordinateX, _BaseSkill.CoordinateY, _BaseSkill.CoordinateZ, Colors.Green, 3, 5, true);
	}
	,
	BaseObject: function ()
	{
		return cBaseSkillGraphic.prototype;
	}
	,
	Update: function ()
	{
		this.Fire.Update(this.BaseSkill.CoordinateX, this.BaseSkill.CoordinateY, this.BaseSkill.CoordinateZ);
	}
	,
	Destroy: function ()
	{
		this.Fire.Destroy();
		delete this.Fire;
		cBaseSkillGraphic.prototype.Destroy.call(this);
	}

}, {});







