
var cBaseCommand = Class(cBaseObject, {
	ObjectType: ObjectTypes.cBaseCommand
	, CommandInterpreter : null
	, Command : null
	, Enabled : true	
	, ReciverList : null
	,
	constructor: function (_CommandInterpreter)
	{
		cBaseCommand.BaseObject.constructor.call(this);
		this.CommandInterpreter = _CommandInterpreter;
		this.CommandInterpreter.CommandList.Add(this);		
		this.ReciverList = new cListForBase();

	}
	,
	BaseObject: function ()
	{
		return cBaseObject.prototype;
	}
	,
	Destroy: function ()
	{
	    delete this.ObjectType;
	    delete this.CommandInterpreter;
	    this.Command.Destroy();
	    delete this.Command;
	    delete this.m_Enabled;
	    this.ReciverList.Destroy();
	    delete this.ReciverList;
		cBaseObject.prototype.Destroy.call(this);
	}
	,
	Run : function(_MsgObject)
	{
	    DebugAlert.Show("cBaseCommand İçindeki Run Komutu Override Edilmedi..!");
	}
	,
	Connect : function(_Reciver)
	{
	    DebugAlert.Show("cBaseCommand İçindeki Connect Komutu Override Edilmedi..!");
	}
	,
	Disconnect : function(_Reciver)
	{
	    DebugAlert.Show("cBaseCommand İçindeki Disconnect Komutu Override Edilmedi..!");
	}
	
}, {});







