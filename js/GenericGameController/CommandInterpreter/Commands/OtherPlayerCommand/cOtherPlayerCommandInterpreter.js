
var cOtherPlayerCommandInterpreter = Class(cBaseCommand,
{
	ObjectType: ObjectTypes.cOtherPlayerCommandInterpreter
	, Command: CommandIDs.OtherPlayerCommand
	, CommandList: null
	, OnlineGameGraph: null
	, OtherPlayerShowedCommand: null
	, OtherPlayerHideCommand: null
	, OtherPlayerMovedCommand: null
	, OtherPlayerSkillUsedCommand: null
	, OtherPlayerHealtyCommand: null
	,
	constructor: function (_CommandInterpreter, _OnlineGameGraph)
	{
		cOtherPlayerCommandInterpreter.BaseObject.constructor.call(this, _CommandInterpreter);
		this.OnlineGameGraph = _OnlineGameGraph;
		this.CommandList = new cList(ObjectTypes.cBaseCommand);

		this.OtherPlayerShowedCommand = new cOtherPlayerShowedCommand(this);
		this.OtherPlayerHideCommand = new cOtherPlayerHideCommand(this);
		this.OtherPlayerMovedCommand = new cOtherPlayerMovedCommand(this);
		this.OtherPlayerSkillUsedCommand = new cOtherPlayerSkillUsedCommand(this);
		this.OtherPlayerHealtyCommand = new cOtherPlayerHealtyCommand(this);
	}
	,
	BaseObject: function ()
	{
		return cBaseCommand.prototype;
	}
	,
	Destroy: function ()
	{
		this.Command.Destroy();
		delete this.Command;

		this.CommandList.Destroy();
		this.OnlineGameGraph.Destroy();
		this.OtherPlayerShowedCommand.Destroy();
		this.OtherPlayerHideCommand.Destroy();
		this.OtherPlayerMovedCommand.Destroy();
		this.OtherPlayerSkillUsedCommand.Destroy();
		this.OtherPlayerHealtyCommand.Destroy();



		delete this.CommandList;
		delete this.OnlineGameGraph;
		delete this.OtherPlayerShowedCommand;
		delete this.OtherPlayerHideCommand;
		delete this.OtherPlayerMovedCommand;

		delete this.OtherPlayerSkillUsedCommand;
		delete this.OtherPlayerHealtyCommand;

		cBaseCommand.prototype.Destroy.call(this);
	}
	,
	Run: function (_MsgObject)
	{
		var __Count = this.CommandList.Count();
		for (var i = 0; i < __Count; i++)
		{
			var __Item = this.CommandList.GetItem(i);
			if (__Item.Command.CommandID == _MsgObject.SubCommandID)
			{
				if (__Item.Enabled)
				{
					__Item.Run(_MsgObject.SubCommandData);
				}
			}
		}
	}

}, {});







