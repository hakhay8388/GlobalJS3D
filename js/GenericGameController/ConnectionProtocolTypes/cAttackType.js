function cAttackType(_CommandID, _CharID, _TargetCharID, _SkillID)
{
	this.CommandID = _CommandID;
	this.Data = {
		CharID: _CharID,
		TargetCharID: _TargetCharID,
		SkillID: _SkillID,
	}
}