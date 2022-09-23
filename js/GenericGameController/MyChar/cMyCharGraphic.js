
var cMyCharGraphic = Class(cBaseObject,
{
	ObjectType: ObjectTypes.cMyCharGraphic
	, OnlineGameGraph: null
	, MyChar: null
	, NickNameText: null
	, ProgressBar: null
	,
	constructor: function (_OnlineGameGraph, _MyChar)
	{
		cMyCharGraphic.BaseObject.constructor.call(this);
		this.OnlineGameGraph = _OnlineGameGraph;
		this.MyChar = _MyChar;
		this.NickNameText = this.OnlineGameGraph.GameUnitGraph.GameScene.CreateText(this.MyChar.NickName, this.MyChar.CoordinateX.Value(), this.MyChar.CoordinateY.Value() + 12, this.MyChar.CoordinateZ.Value(), Colors.Green, 10, true, false);

		this.ProgressBar = __OnlineGameGraph.GameUnitGraph.GameScene.CreateProgressBar3D(this.MyChar.CoordinateX.Value(), this.MyChar.CoordinateY.Value() + 10, this.MyChar.CoordinateZ.Value(), 2, (this.MyChar.CurrentHealty / this.MyChar.MaxHealty) * 100);
	}
	,
	Update: function ()
	{
		this.NickNameText.UpdateCoordinate(this.MyChar.CoordinateX.Value(), this.MyChar.CoordinateY.Value() + 12, this.MyChar.CoordinateZ.Value());
		this.ProgressBar.Percent = (this.MyChar.CurrentHealty / this.MyChar.MaxHealty) * 100;
		this.ProgressBar.Translate(this.MyChar.CoordinateX.Value(), this.MyChar.CoordinateY.Value() + 10, this.MyChar.CoordinateZ.Value());
	}
	,
	BaseObject: function ()
	{
		return cBaseObject.prototype;
	}
	,
	Destroy: function ()
	{
		delete this.OnlineGameGraph;
		delete this.MyChar;
		this.ProgressBar.Destroy();
		delete this.ProgressBar;
		this.NickNameText.Destroy();
		delete this.NickNameText;
		cBaseObject.prototype.Destroy.call(this);
	}

}, {});







