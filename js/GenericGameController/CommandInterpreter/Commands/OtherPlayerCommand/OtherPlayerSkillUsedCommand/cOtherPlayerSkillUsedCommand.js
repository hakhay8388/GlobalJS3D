
var cOtherPlayerSkillUsedCommand = Class(cBaseCommand, 
{
	ObjectType: ObjectTypes.cOtherPlayerSkillUsedCommand
	, Command: OtherPlayerSubCommandIDs.OtherPlayerSkillUsedCommand
	,
	constructor: function (_CommandInterpreter)
	{
		cOtherPlayerSkillUsedCommand.BaseObject.constructor.call(this, _CommandInterpreter);
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
	Run: function (_MsgObject)
	{
		var __Count = this.ReciverList.Count();
		for (var i = 0; i < __Count; i++)
		{
			var __Item = this.ReciverList.GetItem(i);
			__Item.Recive_OtherPlayerSkillUsedCommand(_MsgObject.CharID, _MsgObject.SkillID, _MsgObject.Coordinate, _MsgObject.Velocity, _MsgObject.AttackAccelerationPower);
		}
	}
	,
	Connect: function (_Reciver)
	{
		if (_Reciver.Recive_OtherPlayerSkillUsedCommand != undefined)
		{
			if (JSTypeOperator.IsFunction(_Reciver.Recive_OtherPlayerSkillUsedCommand))
			{
				if (_Reciver.Recive_OtherPlayerSkillUsedCommand.length == IOtherPlayerSkillUsedReciver.Recive_OtherPlayerSkillUsedCommand.length)
				{
					this.ReciverList.Add(_Reciver);
				}
				else
				{
					DebugAlert.Show("cOtherPlayerShowedCommand Komutuna Bağlanmak İsteniyor Fakat 'Recive_OtherPlayerSkillUsedCommand'  Parametre Sayısı Farklı..!");
				}
			}
			else
			{
				DebugAlert.Show("cOtherPlayerShowedCommand Komutuna Bağlanmak İsteniyor Fakat 'Recive_OtherPlayerSkillUsedCommand'  Bir Fonksiyon Değil..!");
			}
		}
		else
		{
			DebugAlert.Show("cOtherPlayerShowedCommand Komutuna Bağlanmak İsteniyor Fakat 'Recive_OtherPlayerSkillUsedCommand' Fonksiyonu Bulunamadı..!");
		}
	}
	,
	Disconnect: function (_Reciver)
	{
		this.ReciverList.Remove(_Reciver);
	}


}, {});







