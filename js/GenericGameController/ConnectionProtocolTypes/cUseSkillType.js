function cUseSkillType(_CommandID, _CharID, _SkillID, _CoordinateX, _CoordinateY, _CoordinateZ, _VelocityX, _VelocityY, _VelocityZ)
{
	this.CommandID = _CommandID;
	this.Data = {
		CharID: _CharID,
		SkillID: _SkillID,
		Velocity: {
			X: _VelocityX,
			Y: _VelocityY,
			Z: _VelocityZ
		},
		Coordinate: {
			X: _CoordinateX,
			Y: _CoordinateY,
			Z: _CoordinateZ
		}
	}
}