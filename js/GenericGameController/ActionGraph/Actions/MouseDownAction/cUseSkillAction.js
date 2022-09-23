
var cUseSkillAction = Class(cBaseAction,
{
	ActionID: ActionIDs.UseSkillAction
    , CharID: 0
	, SkillID: 0
	, CoordinateX: 0
	, CoordinateY: 0
	, CoordinateZ: 0
    , VelocityX: 0
    , VelocityY: 0
    , VelocityZ: 0
	,
	constructor: function (_ActionGraph, _CharID, _SkillID, _CoordinateX, _CoordinateY, _CoordinateZ, _VelocityX, _VelocityY, _VelocityZ)
	{
		cUseSkillAction.BaseObject.constructor.call(this, _ActionGraph);
		this.CharID = _CharID;
		this.SkillID = _SkillID
		this.CoordinateX = _CoordinateX;
		this.CoordinateY = _CoordinateY;
		this.CoordinateZ = _CoordinateZ;
		this.VelocityX = _VelocityX;
		this.VelocityY = _VelocityY;
		this.VelocityZ = _VelocityZ;
	}
	,
	BaseObject: function ()
	{
		return cBaseAction.prototype;
	}
	,
	Destroy: function ()
	{
		delete this.Skill;
		cBaseAction.prototype.Destroy.call(this);
	}
	,
	Action: function ()
	{

		var __Data = new cUseSkillType(this.ActionID.ActionID, this.CharID, this.SkillID, this.CoordinateX.toFixed(3), this.CoordinateY.toFixed(3), this.CoordinateZ.toFixed(3), this.VelocityX.toFixed(3), this.VelocityY.toFixed(3), this.VelocityZ.toFixed(3));

		var __Data2 = __Data.toJSONString();
		this.ActionGraph.OnlineGameGraph.Send(__Data2);
		delete __Data;
		delete __Data2;
	}
}, {});







