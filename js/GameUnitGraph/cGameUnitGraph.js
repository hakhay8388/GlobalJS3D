
var cGameUnitGraph = Class(cBaseObject, {
	ObjectType: ObjectTypes.cGameUnitGraph
	, OnlineGameGraph : null
	, GameScene : null
	, CameraController : null
	, ActiveCamera : null
	, UnitList : null
	,
	constructor: function (_OnlineGameGraph, _GameCanvasDomID, _TempCanvasDomID, _GameMenuCanvasDomID, _Interval, _Width, _Height)
	{
		cGameUnitGraph.BaseObject.constructor.call(this);
		this.OnlineGameGraph = _OnlineGameGraph;
		this.GameScene = new cScene();
		this.CameraController = this.GameScene.CreateCameraController(_GameCanvasDomID, _TempCanvasDomID, _Width, _Height, Colors.Black, _Interval);
		this.ActiveCamera = this.GameScene.CreateCamera(350, 340, 350, 0, 0, 0, Colors.Black, null, false);
		this.CameraController.SetCamera(this.ActiveCamera);
		this.UnitList = new cList(ObjectTypes.cBaseUnit);
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
	CreatecSpaceShip1Unit : function(_Char, _X , _Y, _Z, _RoateX, _RotateY, _RotateZ)
	{
	    var __SpaceShip1Unit = new cSpaceShip1Unit(this.OnlineGameGraph, this, _Char, _X , _Y, _Z, _RoateX, _RotateY, _RotateZ, 100, 100, 10, 10, 5, 5, 0.1);
	    return __SpaceShip1Unit;
	}
	,
	CreatecSpaceShip2Unit : function(_Char, _X , _Y, _Z, _RoateX, _RotateY, _RotateZ)
	{
	    var __SpaceShip2Unit = new cSpaceShip2Unit(this.OnlineGameGraph, this, _Char, _X , _Y, _Z, _RoateX, _RotateY, _RotateZ, 100, 100, 10, 10, 5, 5, 0.1);
	    return __SpaceShip2Unit;
	}
	,
	CreateNewCamera : function(_X, _Y, _Z, _AimX, _AimY, _AimZ)
	{
	    this.ActiveCamera = this.GameScene.CreateCamera(250 , 250 , 250 ,0, 0, 0);
	    return this.ActiveCamera;
	}
	,
	ChangeCameraTo : function(_Camera)
	{
	    this.CameraController.SetCamera(_Camera);
	    this.ActiveCamera = _Camera;
	}
	,
	ChangeCamera : function()
	{
	    var __Count = this.GameScene.CameraList.Count();
	    if (__Count > 1)
	    {
    	    for (var i = 0; i < __Count; i++)
    	    {
    	         var __Item = this.GameScene.CameraList.GetItem(i);
    	         if (__Item == this.ActiveCamera)
    	         {
    	            if (i < __Count - 1)
    	            {
    	                this.ChangeCameraTo(this.GameScene.CameraList.GetItem(i + 1));
    	            }
    	            else
    	            {
    	                this.ChangeCameraTo(this.GameScene.CameraList.GetItem(0));
    	            }
    	         }
    	    }    	    
    	}
	}

	
}, {});







