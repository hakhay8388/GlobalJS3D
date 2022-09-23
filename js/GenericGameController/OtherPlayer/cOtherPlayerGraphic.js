
var cOtherPlayerGraphic = Class(cBaseObject,
{
	ObjectType: ObjectTypes.cOtherPlayerGraphic
	, OnlineGameGraph: null
	, OtherPlayer: null
	, NickNameText: null
	, ProgressBar: null
	,
	constructor: function (_OnlineGameGraph, _OtherPlayer)
	{
		cOtherPlayerGraphic.BaseObject.constructor.call(this);
		this.OnlineGameGraph = _OnlineGameGraph;
		this.OtherPlayer = _OtherPlayer;
		this.NickNameText = this.OnlineGameGraph.GameUnitGraph.GameScene.CreateText(this.OtherPlayer.NickName + " - Lv" + this.OtherPlayer.Level, this.OtherPlayer.CoordinateX.Value(), this.OtherPlayer.CoordinateY.Value() + 12, this.OtherPlayer.CoordinateZ.Value(), Colors.Green, 10, true, false);

		this.ProgressBar = __OnlineGameGraph.GameUnitGraph.GameScene.CreateProgressBar3D(this.OtherPlayer.CoordinateX.Value(), this.OtherPlayer.CoordinateY.Value() + 10, this.OtherPlayer.CoordinateZ.Value(), 2, (this.OtherPlayer.CurrentHealty / this.OtherPlayer.MaxHealty) * 100);
	}
	,
	Update: function ()
	{
		this.NickNameText.UpdateCoordinate(this.OtherPlayer.CoordinateX.Value(), this.OtherPlayer.CoordinateY.Value() + 12, this.OtherPlayer.CoordinateZ.Value());
		this.ProgressBar.Percent = (this.OtherPlayer.CurrentHealty / this.OtherPlayer.MaxHealty) * 100;
		this.ProgressBar.Translate(this.OtherPlayer.CoordinateX.Value(), this.OtherPlayer.CoordinateY.Value() + 10, this.OtherPlayer.CoordinateZ.Value());
	}
	,
	BaseObject: function ()
	{
		return cBaseObject.prototype;
	}
	,
	Destroy: function ()
	{
		this.NickNameText.Destroy();
		this.ProgressBar.Destroy();
		delete this.NickNameText;
		delete this.ProgressBar;
		delete this.OnlineGameGraph;
		delete this.OtherPlayer;
		cBaseObject.prototype.Destroy.call(this);
	}

}, {});







