
var cOtherPlayerMovedCommand = Class(cBaseCommand, 
{
	ObjectType: ObjectTypes.cOtherPlayerMovedCommand
	, Command: OtherPlayerSubCommandIDs.OtherPlayerMovedCommand
	,
	constructor: function (_CommandInterpreter)
	{
		cOtherPlayerMovedCommand.BaseObject.constructor.call(this, _CommandInterpreter);
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
			__Item.Recive_OtherPlayerMovedCommand(_MsgObject.CharID, _MsgObject.Coordinate, _MsgObject.Velocity, _MsgObject.Vector, _MsgObject.Speed);
		}
	}
	,
	Connect: function (_Reciver)
	{
		if (_Reciver.Recive_OtherPlayerMovedCommand != undefined)
		{
			if (JSTypeOperator.IsFunction(_Reciver.Recive_OtherPlayerMovedCommand))
			{
				if (_Reciver.Recive_OtherPlayerMovedCommand.length == IOtherPlayerMovedReciver.Recive_OtherPlayerMovedCommand.length)
				{
					this.ReciverList.Add(_Reciver);
				}
				else
				{
					DebugAlert.Show("cOtherPlayerMovedCommand Komutuna Bağlanmak İsteniyor Fakat 'Recive_OtherPlayerMovedCommand'  Parametre Sayısı Farklı..!");
				}
			}
			else
			{
				DebugAlert.Show("cOtherPlayerMovedCommand Komutuna Bağlanmak İsteniyor Fakat 'Recive_OtherPlayerMovedCommand'  Bir Fonksiyon Değil..!");
			}
		}
		else
		{
			DebugAlert.Show("cOtherPlayerMovedCommand Komutuna Bağlanmak İsteniyor Fakat 'Recive_OtherPlayerMovedCommand' Fonksiyonu Bulunamadı..!");
		}
	}
	,
	Disconnect: function (_Reciver)
	{
		this.ReciverList.Remove(_Reciver);
	}


}, {});







