
var cOtherPlayerShowedCommand = Class(cBaseCommand, 
{
	ObjectType: ObjectTypes.cOtherPlayerShowedCommand
	, Command: OtherPlayerSubCommandIDs.OtherPlayerShowedCommand
	,
	constructor: function (_CommandInterpreter)
	{
		cOtherPlayerShowedCommand.BaseObject.constructor.call(this, _CommandInterpreter);
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
			__Item.Recive_OtherPlayerShowedCommand(_MsgObject.NickName, _MsgObject.CharID, _MsgObject.UnitID, _MsgObject.Coordinate, _MsgObject.Velocity, _MsgObject.Speed, _MsgObject.MaxHealty, _MsgObject.CurrentHealty, _MsgObject.Level);
		}
	}
	,
	Connect: function (_Reciver)
	{
		if (_Reciver.Recive_OtherPlayerShowedCommand != undefined)
		{
			if (JSTypeOperator.IsFunction(_Reciver.Recive_OtherPlayerShowedCommand))
			{
				if (_Reciver.Recive_OtherPlayerShowedCommand.length == IOtherPlayerShowedReciver.Recive_OtherPlayerShowedCommand.length)
				{
					this.ReciverList.Add(_Reciver);
				}
				else
				{
					DebugAlert.Show("cOtherPlayerShowedCommand Komutuna Bağlanmak İsteniyor Fakat 'Recive_OtherPlayerShowedCommand'  Parametre Sayısı Farklı..!");
				}
			}
			else
			{
				DebugAlert.Show("cOtherPlayerShowedCommand Komutuna Bağlanmak İsteniyor Fakat 'Recive_OtherPlayerShowedCommand'  Bir Fonksiyon Değil..!");
			}
		}
		else
		{
			DebugAlert.Show("cOtherPlayerShowedCommand Komutuna Bağlanmak İsteniyor Fakat 'Recive_OtherPlayerShowedCommand' Fonksiyonu Bulunamadı..!");
		}
	}
	,
	Disconnect: function (_Reciver)
	{
		this.ReciverList.Remove(_Reciver);
	}


}, {});







