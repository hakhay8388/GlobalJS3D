
var cStrategyGameGraph = Class(cBaseObject, IRenderReciver,
{
	ObjectType: ObjectTypes.cStrategyGameGraph
	, OwnerScene: null
	, CameraController: null
	, Game: null
	//	, FullMapMapWidth: 0
	//	, FullMapMapHeight: 0
	, VisibleWindowWidth: 0
	, VisibleWindowHeight: 0
	, VisibleWindowCenterX: 0
	, VisibleWindowCenterY: 0
	, MapFactory: null
	, Map: null
	, MapLoaded: false
	, LastX: 0
	, LastY: 0
	, MouseLeftDown: false
	,
	constructor: function (_CameraController)
	{
		cStrategyGameGraph.BaseObject.constructor.call(this);
		this.OwnerScene = _CameraController.OwnerScene;
		this.CameraController = _CameraController;
		this.VisibleWindowWidth = this.CameraController.Width;
		this.VisibleWindowHeight = this.CameraController.Height;
		this.OwnerScene.ConnectRender(this);
		this.MapFactory = new cMapFactory(this);

		this.CameraController.OnMouseDown.Add(this, this.MouseDownFunction);
		this.CameraController.OnMouseMove.Add(this, this.MouseMoveFunction);
		this.CameraController.OnMouseUp.Add(this, this.MouseUpFunction);
	}
    ,
	MouseDownFunction: function (_Event)
	{
		if (_Event.button == 0)
		{
			this.LastX = _Event.offsetX;
			this.LastY = _Event.offsetY;
			this.MouseLeftDown = true;
		}
	}
	,
	MouseUpFunction: function (_Event)
	{
		this.MouseLeftDown = false;
	}
	,
	MouseMoveFunction: function (_Event)
	{
		if (this.MouseLeftDown)
		{
			this.VisibleWindowCenterX -= _Event.offsetX - this.LastX;
			this.VisibleWindowCenterY += _Event.offsetY - this.LastY;
			this.LastX = _Event.offsetX;
			this.LastY = _Event.offsetY;
		}
	}
	,
	BaseObject: function ()
	{
		return cBaseObject.prototype;
	}
	,
	Destroy: function ()
	{
		cBaseObject.prototype.Destroy.call(this);
	}
	,
	Draw: function (_Camera)
	{
		if (this.Map != null)
		{
			this.Map.Draw(_Camera);
		}
	}

}, {});









