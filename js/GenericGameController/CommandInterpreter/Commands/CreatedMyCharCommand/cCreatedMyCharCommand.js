
var cCreatedMyCharCommand = Class(cBaseCommand, {
	ObjectType: ObjectTypes.cCreatedMyCharCommand
	, Command: CommandIDs.CreatedMyCharCommand
	,
	constructor: function (_CommandInterpreter)
	{
		cCreatedMyCharCommand.BaseObject.constructor.call(this, _CommandInterpreter);
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
			__Item.Recive_CreatedMyCharCommand(_MsgObject.Nick, _MsgObject.CharID, _MsgObject.UnitID, _MsgObject.Coordinate, _MsgObject.Velocity, _MsgObject.Healty, _MsgObject.Energy, _MsgObject.Speed, _MsgObject.Powers, _MsgObject.Level);
		}
	}
	,
	Connect: function (_Reciver)
	{
		if (_Reciver.Recive_CreatedMyCharCommand != undefined)
		{
			if (JSTypeOperator.IsFunction(_Reciver.Recive_CreatedMyCharCommand))
			{
				if (_Reciver.Recive_CreatedMyCharCommand.length == ICreatedMyCharReciver.Recive_CreatedMyCharCommand.length)
				{
					this.ReciverList.Add(_Reciver);
				}
				else
				{
					DebugAlert.Show("cCreatedMyCharCommand Komutuna Bağlanmak İsteniyor Fakat 'Recive_CreatedMyCharCommand'  Parametre Sayısı Farklı..!");
				}
			}
			else
			{
				DebugAlert.Show("cCreatedMyCharCommand Komutuna Bağlanmak İsteniyor Fakat 'Recive_CreatedMyCharCommand'  Bir Fonksiyon Değil..!");
			}
		}
		else
		{
			DebugAlert.Show("cCreatedMyCharCommand Komutuna Bağlanmak İsteniyor Fakat 'Recive_CreatedMyCharCommand' Fonksiyonu Bulunamadı..!");
		}
	}
	,
	Disconnect: function (_Reciver)
	{
		this.ReciverList.Remove(_Reciver);
	}


}, {});







