
var cAttackAction = Class(cBaseAction,
{
	ActionID: ActionIDs.AttackAction
    , CharID: 0
    , TargetCharID: 0
    , SkillID: 0
	,
	constructor: function (_ActionGraph, _CharID, _TargetCharID, _SkillID)
	{
		cAttackAction.BaseObject.constructor.call(this, _ActionGraph);
		this.CharID = _CharID;
		this.TargetCharID = _TargetCharID;
		this.SkillID = _SkillID;
	}
	,
	BaseObject: function ()
	{
		return cBaseAction.prototype;
	}
	,
	Destroy: function ()
	{
		delete this.CharID;
		delete this.TargetCharID;
		delete this.SkillID;
		cBaseAction.prototype.Destroy.call(this);
	}
	,
	Action: function ()
	{
		var __Data = new cAttackType(this.ActionID.ActionID, this.CharID, this.TargetCharID, this.SkillID);

		var __Data2 = __Data.toJSONString();
		this.ActionGraph.OnlineGameGraph.Send(__Data2);
		delete __Data;
	}
}, {});







