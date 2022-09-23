
var cMyCharHealtyCommand = Class(cBaseCommand, {
	ObjectType: ObjectTypes.cMyCharHealtyCommand
	, Command: CommandIDs.MyCharHealtyCommand
	,
	constructor: function (_CommandInterpreter)
	{
		cMyCharHealtyCommand.BaseObject.constructor.call(this, _CommandInterpreter);
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
	        __Item.Recive_MyCharHealtyCommand(_MsgObject.CharID, _MsgObject.MaxHealty, _MsgObject.CurrentHealty);
	    }
	}
	,
	Connect : function(_Reciver)
	{
		if (_Reciver.Recive_MyCharHealtyCommand != undefined)
	    {
	    	if (JSTypeOperator.IsFunction(_Reciver.Recive_MyCharHealtyCommand))
            {
            	if (_Reciver.Recive_MyCharHealtyCommand.length == IMyCharHealtyReciver.Recive_MyCharHealtyCommand.length)
               {
                    this.ReciverList.Add(_Reciver);   
               }
	           else
	           {
	           	DebugAlert.Show("cMyCharHealtyCommand Komutuna Bağlanmak İsteniyor Fakat 'Recive_MyCharHealtyCommand'  Parametre Sayısı Farklı..!");
	           }               
            }
	        else
	        {
	        	DebugAlert.Show("cMyCharHealtyCommand Komutuna Bağlanmak İsteniyor Fakat 'Recive_MyCharHealtyCommand'  Bir Fonksiyon Değil..!");
	        }
	    }
	    else
	    {
	    	DebugAlert.Show("cMyCharHealtyCommand Komutuna Bağlanmak İsteniyor Fakat 'Recive_MyCharHealtyCommand' Fonksiyonu Bulunamadı..!");
	    }
	}
	,
	Disconnect : function(_Reciver)
	{
	    this.ReciverList.Remove(_Reciver);   
	}
	
	
}, {});







