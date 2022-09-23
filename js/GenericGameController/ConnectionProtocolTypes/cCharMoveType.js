function cCharMoveType(_CommandID, _CharID, _CoordinateX, _CoordinateY, _CoordinateZ, _VelocityX, _VelocityY, _VelocityZ, _VectorX, _VectorY, _VectorZ, _Speed, _Remote)
{
	this.CommandID = _CommandID;
	this.Data = {
		CharID :  _CharID,
		Speed: _Speed,
		Remote: _Remote,
		Velocity : {
			X: _VelocityX,
			Y: _VelocityY,
			Z: _VelocityZ
		},
		Vector: {
			X: _VectorX,
			Y: _VectorY,
			Z: _VectorZ
		},
		Coordinate: {
			X :_CoordinateX,
			Y :_CoordinateY,
			Z :_CoordinateZ
		}
	}
}