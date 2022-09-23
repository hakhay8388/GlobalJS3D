
var cMyCharSkillUsedCommand = Class(cBaseCommand, 
{
	ObjectType: ObjectTypes.cMyCharSkillUsedCommand
	, Command: CommandIDs.MyCharSkillUsedCommand
	,
	constructor: function (_CommandInterpreter)
	{
		cMyCharSkillUsedCommand.BaseObject.constructor.call(this, _CommandInterpreter);
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
	        __Item.Recive_MyCharSkillUsedCommand(_MsgObject.CharID, _MsgObject.SkillID, _MsgObject.Coordinate, _MsgObject.Velocity, _MsgObject.AttackAccelerationPower);
	    }
	}
	,
	Connect : function(_Reciver)
	{
		if (_Reciver.Recive_MyCharSkillUsedCommand != undefined)
	    {
	    	if (JSTypeOperator.IsFunction(_Reciver.Recive_MyCharSkillUsedCommand))
            {
            	if (_Reciver.Recive_MyCharSkillUsedCommand.length == IMyCharSkillUsedReciver.Recive_MyCharSkillUsedCommand.length)
               {
                    this.ReciverList.Add(_Reciver);   
               }
	           else
	           {
	           	DebugAlert.Show("cMyCharSkillUsedCommand Komutuna Bağlanmak İsteniyor Fakat 'Recive_MyCharSkillUsedCommand'  Parametre Sayısı Farklı..!");
	           }               
            }
	        else
	        {
	        	DebugAlert.Show("cMyCharSkillUsedCommand Komutuna Bağlanmak İsteniyor Fakat 'Recive_MyCharSkillUsedCommand'  Bir Fonksiyon Değil..!");
	        }
	    }
	    else
	    {
	    	DebugAlert.Show("cMyCharSkillUsedCommand Komutuna Bağlanmak İsteniyor Fakat 'Recive_MyCharSkillUsedCommand' Fonksiyonu Bulunamadı..!");
	    }
	}
	,
	Disconnect : function(_Reciver)
	{
	    this.ReciverList.Remove(_Reciver);   
	}
	
	
}, {});







