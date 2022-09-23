
var cCreateMyCharAction = Class(Object,
{
	ActionID: ActionIDs.CreateMyCharAction
    , OnlineGameGraph: null
	,
	constructor: function (_OnlineGameGraph)
	{
		this.OnlineGameGraph = _OnlineGameGraph;
	}
	,
	BaseObject: function ()
	{
		return cBaseAction.prototype;
	}
	,
	Destroy: function ()
	{
		delete this.OnlineGameGraph;
	}
	,
	Action: function ()
	{
		var __Data = new cCreateMyCharType(this.ActionID.ActionID);
		var __Data2 = __Data.toJSONString();
		this.OnlineGameGraph.Send(__Data2);
	}
}, {});







