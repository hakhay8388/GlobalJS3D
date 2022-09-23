
var cOnlineGameGraph = Class(cBaseObject, ICreatedMyCharReciver, ISocketReciver,
{
	ObjectType: ObjectTypes.cOnlineGameGraph
	, CommandInterpreter: null
	, GameSocketConnection: null
	, MobList: null

	, OtherPlayerList: null
	, OtherPlayerListOperator: null

	, UsableSkillList: null
	, SkillListOperator: null
	, SkillOperator: null

	, PartyList: null
	, MyChar: null
	, GameUnitGraph: null
	, Interval: null
	, ActionGraph: null
	, Logined: false
	, LoginCounter: 0
	, MouseLeftButtonSkill: null
	, MouseRightButtonSkill: null
	,
	constructor: function (_Host, _Port, _FlashSocketContent, _GameCanvasDomID, _TempCanvasDomID, _GameMenuCanvasDomID, _Interval, _Width, _Height)
	{
		cOnlineGameGraph.BaseObject.constructor.call(this);
		this.GameSocketConnection = cSocketManager.CreateSocket(_Host, _Port, _FlashSocketContent);
		this.GameSocketConnection.ReciverConnect(this);
		this.MobList = new cList(ObjectTypes.cMob);


		this.PartyList = new cList(ObjectTypes.cOtherPlayer);
		this.GameUnitGraph = new cGameUnitGraph(this, _GameCanvasDomID, _TempCanvasDomID, _GameMenuCanvasDomID, _Interval, _Width, _Height);
		this.CommandInterpreter = new cCommandInterpreter(this);
		this.CommandInterpreter.CreatedMyCharCommand.Connect(this);
		this.Interval = _Interval;

		this.OtherPlayerList = new cList(ObjectTypes.cOtherPlayer);
		this.OtherPlayerListOperator = new cOtherPlayerListOperator(this);

		this.SkillListOperator = new cSkillListOperator(this);
		this.UsableSkillList = this.SkillListOperator.UsableSkillList;
		this.SkillOperator = new cSkillOperator(this);

	}
	,
	GetGameFPSRatio: function ()
	{
		var __FrameRate = this.GameUnitGraph.ActiveCamera.FrameRate;
		var __Ratio = DefaultSceneSettings.GameFPS / __FrameRate;
	}
	,
	Login: function (_UserName, _Password)
	{
		this.LoginRetrier(_UserName, _Password);
	}
	,
	LoginRetrier: function (_UserName, _Password)
	{
		if (!this.Logined && this.LoginCounter < 30)
		{
			this.LoginCounter++;
			var __Login = new cLoginType(_UserName, _Password);
			var __LoginString = __Login.toJSONString();
			this.GameSocketConnection.Send(__LoginString);
			delete __Login;
			var _this = this;
			setTimeout(function () { _this.LoginRetrier(_UserName, _Password); }, 2000);
		}
		else
		{
			this.LoginCounter = 0;
		}
	}
	,
	Connect: function ()
	{
		this.GameSocketConnection.InitializeAndConnect();
	}
	,
	Recive_CreatedMyCharCommand: function (_Nick, _CharID, _UnitID, _Coordinate, _Velocity, _Healty, _Energy, _Speed, _Powers, _Level)
	{
		this.MyChar = new cMyChar(this, _Nick, _CharID, _UnitID, _Coordinate, _Velocity, _Healty, _Energy, _Speed, _Powers, _Level);
		this.ActionGraph = new cActionGraph(this, 1);
		// burası değişecek sol tuşa atanan skill creater
		this.MouseLeftButtonSkill = this.SkillListOperator.BasicSkillCreater;
		this.StartUpdater(this.Interval);
	}
	,
	BaseObject: function ()
	{
		return cBaseObject.prototype;
	}
	,
	Destroy: function ()
	{
		this.CommandInterpreter.Destroy();
		this.GameSocketConnection.Destroy();
		this.MobList.Destroy();
		this.OtherPlayerList.Destroy();
		this.OtherPlayerListOperator.Destroy();
		this.PartyList.Destroy();
		this.MyChar.Destroy();
		this.GameUnitGraph.Destroy();
		this.Interval.Destroy();
		this.ActionGraph.Destroy();

		delete this.CommandInterpreter;
		delete this.GameSocketConnection;
		delete this.MobList;
		delete this.OtherPlayerList;
		delete this.OtherPlayerListOperator;
		delete this.PartyList;
		delete this.MyChar;
		delete this.GameUnitGraph;
		delete this.Interval;
		delete this.ActionGraph;

		delete this.Logined;
		delete this.LoginCounter;

		cBaseObject.prototype.Destroy.call(this);
	}
	,
	StartUpdater: function (_Interval)
	{
		this.MyChar.Update();
		this.SkillOperator.Update();
		var _this = this;
		setTimeout(function () { _this.StartUpdater(_Interval); }, _Interval);
	}
	,
	Send: function (_Value)
	{
		if (this.Logined)
		{
			this.GameSocketConnection.Send(_Value);
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
		if (!this.Logined)
		{
			eval("var __Data = " + _Event.data);
			if (__Data.Logined)
			{
				this.Logined = true;
				var __CreateMyCharAction = new cCreateMyCharAction(this);
				__CreateMyCharAction.Action();
				__CreateMyCharAction.Destroy();
				this.GameSocketConnection.ReciverDisconnect(this);
			}
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







