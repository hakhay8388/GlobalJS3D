
var cOtherPlayerHideCommand = Class(cBaseCommand, 
{
	ObjectType: ObjectTypes.cOtherPlayerHideCommand
	, Command: OtherPlayerSubCommandIDs.OtherPlayerHideCommand
	,
	constructor: function (_CommandInterpreter)
	{
		cOtherPlayerHideCommand.BaseObject.constructor.call(this, _CommandInterpreter);
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
			__Item.Recive_OtherPlayerHideCommand(_MsgObject.CharID);
		}
	}
	,
	Connect: function (_Reciver)
	{
		if (_Reciver.Recive_OtherPlayerHideCommand != undefined)
		{
			if (JSTypeOperator.IsFunction(_Reciver.Recive_OtherPlayerHideCommand))
			{
				if (_Reciver.Recive_OtherPlayerHideCommand.length == IOtherPlayerHideReciver.Recive_OtherPlayerHideCommand.length)
				{
					this.ReciverList.Add(_Reciver);
				}
				else
				{
					DebugAlert.Show("cOtherPlayerHideCommand Komutuna Bağlanmak İsteniyor Fakat 'Recive_OtherPlayerHideCommand'  Parametre Sayısı Farklı..!");
				}
			}
			else
			{
				DebugAlert.Show("cOtherPlayerHideCommand Komutuna Bağlanmak İsteniyor Fakat 'Recive_OtherPlayerHideCommand'  Bir Fonksiyon Değil..!");
			}
		}
		else
		{
			DebugAlert.Show("cOtherPlayerHideCommand Komutuna Bağlanmak İsteniyor Fakat 'Recive_OtherPlayerHideCommand' Fonksiyonu Bulunamadı..!");
		}
	}
	,
	Disconnect: function (_Reciver)
	{
		this.ReciverList.Remove(_Reciver);
	}


}, {});







