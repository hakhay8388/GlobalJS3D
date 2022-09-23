
var cActionGraph = Class(cBaseObject,
{
	ObjectType: ObjectTypes.cActionGraph
	, OnlineGameGraph: null
	, Interval: null
	, ActionQueue: null
	, MouseMoveAction: null
	, MouseMoveActionInterval: 0
	, MouseDownAction: null
	,
	constructor: function (_OnlineGameGraph, _Interval)
	{
		cActionGraph.BaseObject.constructor.call(this);

		this.MouseMoveActionInterval = 20;

		this.OnlineGameGraph = _OnlineGameGraph;
		this.ActionQueue = new cListForBase();
		this.Interval = _Interval;
		this.StartUpdater(1);
		this.CreateActionCreaters();
	}
	,
	CreateActionCreaters: function ()
	{
		this.MouseMoveAction = new cMouseMoveActionCreater(this, this.MouseMoveActionInterval);
		this.MouseDownAction = new cMouseDownActionCreater(this);
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
		delete this.Interval;
		this.ActionQueue.Destroy();
		delete this.ActionQueue;
		cBaseObject.prototype.Destroy.call(this);
	}
	,
	StartUpdater: function (_Interval)
	{
		while (this.ActionQueue.Count() > 0)
		{
			var __Item = this.ActionQueue.GetItem(0);
			__Item.Action();
			this.ActionQueue.RemoveAt(0);
			__Item.Destroy();
		}
		var _this = this;
		setTimeout(function () { _this.StartUpdater(_Interval); }, _Interval);
	}
}, {});







