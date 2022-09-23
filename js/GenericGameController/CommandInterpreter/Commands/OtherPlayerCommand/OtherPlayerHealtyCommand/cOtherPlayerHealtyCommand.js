
var cOtherPlayerHealtyCommand = Class(cBaseCommand, 
{
	ObjectType: ObjectTypes.cOtherPlayerHealtyCommand
	, Command: OtherPlayerSubCommandIDs.OtherPlayerHealtyCommand
	,
	constructor: function (_CommandInterpreter)
	{
		cOtherPlayerHealtyCommand.BaseObject.constructor.call(this, _CommandInterpreter);
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
			__Item.Recive_OtherPlayerHealtyCommand(_MsgObject.CharID, _MsgObject.MaxHealty, _MsgObject.CurrentHealty);
		}
	}
	,
	Connect: function (_Reciver)
	{
		if (_Reciver.Recive_OtherPlayerHealtyCommand != undefined)
		{
			if (JSTypeOperator.IsFunction(_Reciver.Recive_OtherPlayerHealtyCommand))
			{
				if (_Reciver.Recive_OtherPlayerHealtyCommand.length == IOtherPlayerHealtyReciver.Recive_OtherPlayerHealtyCommand.length)
				{
					this.ReciverList.Add(_Reciver);
				}
				else
				{
					DebugAlert.Show("cOtherPlayerHealtyCommand Komutuna Bağlanmak İsteniyor Fakat 'Recive_OtherPlayerHealtyCommand'  Parametre Sayısı Farklı..!");
				}
			}
			else
			{
				DebugAlert.Show("cOtherPlayerHealtyCommand Komutuna Bağlanmak İsteniyor Fakat 'Recive_OtherPlayerHealtyCommand'  Bir Fonksiyon Değil..!");
			}
		}
		else
		{
			DebugAlert.Show("cOtherPlayerHealtyCommand Komutuna Bağlanmak İsteniyor Fakat 'Recive_OtherPlayerHealtyCommand' Fonksiyonu Bulunamadı..!");
		}
	}
	,
	Disconnect: function (_Reciver)
	{
		this.ReciverList.Remove(_Reciver);
	}


}, {});







