
var cMyCharMovedCommand = Class(cBaseCommand, {
	ObjectType: ObjectTypes.cMyCharMovedCommand
	, Command: CommandIDs.MyCharMovedCommand
	,
	constructor: function (_CommandInterpreter)
	{
		cMyCharMovedCommand.BaseObject.constructor.call(this, _CommandInterpreter);
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

		cBaseCommand.prototype.Destroy.call(this);
	}
	,
	Run : function(_MsgObject)
	{
	    var __Count = this.ReciverList.Count();
	    for (var i = 0; i < __Count; i++)
	    {
	        var __Item = this.ReciverList.GetItem(i);
	        __Item.Recive_MyCharMovedCommand(_MsgObject.CharID, _MsgObject.Coordinate, _MsgObject.Velocity, _MsgObject.Vector, _MsgObject.CurrentSpeed, _MsgObject.Remote);
	    }
	}
	,
	Connect : function(_Reciver)
	{
		if (_Reciver.Recive_MyCharMovedCommand != undefined)
	    {
	    	if (JSTypeOperator.IsFunction(_Reciver.Recive_MyCharMovedCommand))
            {
            	if (_Reciver.Recive_MyCharMovedCommand.length == IMyCharMovedReciver.Recive_MyCharMovedCommand.length)
               {
                    this.ReciverList.Add(_Reciver);   
               }
	           else
	           {
	           	DebugAlert.Show("cMyCharMovedCommand Komutuna Bağlanmak İsteniyor Fakat 'Recive_MyCharMovedCommand'  Parametre Sayısı Farklı..!");
	           }               
            }
	        else
	        {
	        	DebugAlert.Show("cMyCharMovedCommand Komutuna Bağlanmak İsteniyor Fakat 'Recive_MyCharMovedCommand'  Bir Fonksiyon Değil..!");
	        }
	    }
	    else
	    {
	    	DebugAlert.Show("cMyCharMovedCommand Komutuna Bağlanmak İsteniyor Fakat 'Recive_MyCharMovedCommand' Fonksiyonu Bulunamadı..!");
	    }
	}
	,
	Disconnect : function(_Reciver)
	{
	    this.ReciverList.Remove(_Reciver);   
	}
	
	
}, {});







