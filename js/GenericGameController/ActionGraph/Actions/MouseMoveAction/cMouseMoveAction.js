
var cMouseMoveAction = Class(cBaseAction,
{
	ActionID: ActionIDs.MouseMoveAction
	, CoordinateX: 0
	, CoordinateY: 0
	, CoordinateZ: 0
    , VelocityX: 0
    , VelocityY: 0
    , VelocityZ: 0
    , VectorX: 0
    , VectorY: 0
    , VectorZ: 0
    , CharID: 0
	, Speed: 0
    , SendData: false
	,
	constructor: function (_ActionGraph, _CharID, _CoordinateX, _CoordinateY, _CoordinateZ, _VelocityX, _VelocityY, _VelocityZ, _VectorX, _VectorY, _VectorZ, _Speed, _SendData)
	{
		cMouseMoveAction.BaseObject.constructor.call(this, _ActionGraph);
		this.CoordinateX = _CoordinateX;
		this.CoordinateY = _CoordinateY;
		this.CoordinateZ = _CoordinateZ;

		this.VelocityX = _VelocityX;
		this.VelocityY = _VelocityY;
		this.VelocityZ = _VelocityZ;

		this.VectorX = _VectorX;
		this.VectorY = _VectorY;
		this.VectorZ = _VectorZ;

		this.CharID = _CharID;

		this.Speed = _Speed;
		this.SendData = _SendData;

	}
	,
	BaseObject: function ()
	{
		return cBaseAction.prototype;
	}
	,
	Destroy: function ()
	{
		delete this.CoordinateX;
		delete this.CoordinateY;
		delete this.CoordinateZ;

		delete this.VelocityX;
		delete this.VelocityY;
		delete this.VelocityZ;


		delete this.VectorX;
		delete this.VectorY;
		delete this.VectorZ;
		delete this.CharID;
		delete this.Speed;
		delete this.SendData;
		cBaseAction.prototype.Destroy.call(this);
	}
	,
	Action: function ()
	{
		//var __Data = new cCharMoveType(ActionIDs.MouseMoveAction.ActionID, this.CharID, this.CoordinateX, this.CoordinateY, this.CoordinateZ, this.VectorX, this.VectorY, this.VectorZ, this.Speed, false);
		var __Data = new cCharMoveType(ActionIDs.MouseMoveAction.ActionID, this.CharID, this.CoordinateX.toFixed(3), this.CoordinateY.toFixed(3), this.CoordinateZ.toFixed(3), this.VelocityX.toFixed(3), this.VelocityY.toFixed(3), this.VelocityZ.toFixed(3), this.VectorX.toFixed(3), 0, this.VectorZ.toFixed(3), this.Speed.toFixed(3), false);

		if (this.SendData)
		{
			var __Data2 = __Data.toJSONString();
			this.ActionGraph.OnlineGameGraph.Send(__Data2);
			delete __Data;
		}

		//this.ActionGraph.OnlineGameGraph.CommandInterpreter.InterpretCommand(__Data);
	}
}, {});







