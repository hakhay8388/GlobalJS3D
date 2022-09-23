
var cOtherPlayerListOperator = Class(cBaseObject, IOtherPlayerShowedReciver, IOtherPlayerHideReciver,
{
	ObjectType: ObjectTypes.cOtherPlayerListOperator
	, OtherPlayerList: null
	, OnlineGameGraph: null
	, Temp: 0
	,
	constructor: function (_OnlineGameGraph)
	{
		cOtherPlayerListOperator.BaseObject.constructor.call(this);
		this.OnlineGameGraph = _OnlineGameGraph;
		this.OtherPlayerList = this.OnlineGameGraph.OtherPlayerList;
		this.OnlineGameGraph.CommandInterpreter.OtherPlayerCommandInterpreter.OtherPlayerShowedCommand.Connect(this);
		this.OnlineGameGraph.CommandInterpreter.OtherPlayerCommandInterpreter.OtherPlayerHideCommand.Connect(this);
		this.Update();
	}
	,
	BaseObject: function ()
	{
		return cBaseChar.prototype;
	}
	,
	Destroy: function ()
	{
		delete this.OtherPlayerList;
		delete this.OnlineGameGraph;
		delete this.Temp;

		cBaseChar.prototype.Destroy.call(this);
	}
	,
	Update: function ()
	{
		try
		{
			for (var i = this.OtherPlayerList.Count() - 1; i > -1; i--)
			{
				var __Item = this.OtherPlayerList.GetItem(i);
				__Item.Update();
			}
		}
		catch (_Ex)
		{
			alert("hata...!");
		}
		var _this = this;
		setTimeout(function () { _this.Update(); }, 1);

	}
	,
	Recive_OtherPlayerShowedCommand: function (_NickName, _CharID, _UnitID, _Coordinate, _Velocity, _Speed, _MaxHealty, _CurrentHealty, _Level)
	{
		var __Found = false;
		for (var i = 0; i < this.OtherPlayerList.Count(); i++)
		{
			var __Item = this.OtherPlayerList.GetItem(i);
			if (__Item.CharID == _CharID)
			{
				__Found = true;
				break;
			}
		}
		if (!__Found)
		{
			var __OtherPlayer = new cOtherPlayer(this.OnlineGameGraph, _NickName, _CharID, _UnitID, _Coordinate, _Velocity, _Speed, _MaxHealty, _CurrentHealty, _Level);
			this.OtherPlayerList.Add(__OtherPlayer);
		}
	}
	,
	Recive_OtherPlayerHideCommand: function (_CharID)
	{
		var __Index = -1;
		var __Item = null;
		for (var i = 0; i < this.OtherPlayerList.Count(); i++)
		{
			var __Item = this.OtherPlayerList.GetItem(i);
			if (__Item.CharID == _CharID)
			{
				__Index = i;
				break;
			}
		}
		if (__Index > -1)
		{
			this.OtherPlayerList.Remove(__Item);
			__Item.Destroy();
		}
	}
}, {});







