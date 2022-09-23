
var cCommandInterpreter = Class(cBaseObject, ISocketReciver,
{
	ObjectType: ObjectTypes.Get("cCommandInterpreter")
	, CommandList: null
	, MyCharMovedCommand: null
	, CreatedMyCharCommand: null
	, MyCharSkillUsedCommand: null
	, MyCharHealtyCommand: null

	, OtherPlayerCommandInterpreter: null
	, OnlineGameGraph: null
	,
	constructor: function (_OnlineGameGraph)
	{
		cCommandInterpreter.BaseObject.constructor.call(this);
		this.OnlineGameGraph = _OnlineGameGraph;
		this.CommandList = new cList(ObjectTypes.cBaseCommand);
		this.MyCharMovedCommand = new cMyCharMovedCommand(this);
		this.CreatedMyCharCommand = new cCreatedMyCharCommand(this);
		this.MyCharSkillUsedCommand = new cMyCharSkillUsedCommand(this);
		this.MyCharHealtyCommand = new cMyCharHealtyCommand(this);

		this.OtherPlayerCommandInterpreter = new cOtherPlayerCommandInterpreter(this, _OnlineGameGraph);

		this.OnlineGameGraph.GameSocketConnection.ReciverConnect(this);
	}
	,
	BaseObject: function ()
	{
		return cBaseObject.prototype;
	}
	,
	Destroy: function ()
	{
		this.CommandList.Destroy();
		this.MyCharMovedCommand.Destroy();
		this.CreatedMyCharCommand.Destroy();
		this.MyCharSkillUsedCommand.Destroy();
		this.MyCharHealtyCommand.Destroy();

		this.OtherPlayerCommandInterpret.Destroy();
		delete this.CommandList;
		delete this.MyCharMovedCommand;
		delete this.CreatedMyCharCommand;
		delete this.MyCharSkillUsedCommand;
		delete this.MyCharHealtyCommand;


		delete this.OtherPlayerCommandInterpret;
		delete this.OnlineGameGraph;
		cBaseObject.prototype.Destroy.call(this);
	}
	,
	AddCommand: function (_Command)
	{
		this.CommandList.Add(_Command);
	}
	,
	RemoveCommand: function (_Command)
	{
		this.CommandList.Remove(_Command);
	}
	,
	InterpretCommand: function (_MsgObject)
	{
		var __Count = this.CommandList.Count();
		for (var i = 0; i < __Count; i++)
		{
			var __Item = this.CommandList.GetItem(i);
			if (__Item.Command.CommandID == _MsgObject.CommandID)
			{
				if (__Item.Enabled)
				{
					var __LastNow = new Date();
					__Item.Run(_MsgObject.Data);
					var __Now = new Date();
					if ((__Now - __LastNow) > 1000)
					{
						alert("1 sn den fazla sürdü. Command Name : " + __Item.Command.CommandName);
					}
				}
			}
		}
	}
	,
	ReciveOnConnectEvent: function (_Event)
	{
	}
	,
	ReciveOnDisconnectEvent: function (_Event)
	{
	}
	,
	ReciveOnDataEvent: function (_Event)
	{
		if (this.OnlineGameGraph.Logined)
		{
			eval("var __Data = " + _Event.data);
			this.InterpretCommand(__Data);
		}
	}
	,
	ReciveOnProgressEvent: function (_Event)
	{
	}
	,

	ReciveOnIoErrorEvent: function (_Event)
	{
	}
	,

	ReciveOnSecurityEvent: function (_Event)
	{
	}


}, {});







