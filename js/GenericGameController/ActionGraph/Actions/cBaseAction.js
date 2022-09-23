
var cBaseAction = Class(Object,
{
	ActionGraph: null
	, ActionID: null
	,
	constructor: function (_ActionGraph)
	{
		cBaseAction.BaseObject.constructor.call(this);
		this.ActionGraph = _ActionGraph;
		_ActionGraph.ActionQueue.Add(this);
	}
	,
	BaseObject: function ()
	{
		return Object;
	}
	,
	Destroy: function ()
	{
		delete this.ActionGraph;
		delete this.ActionID;
	}
	,
	Action: function ()
	{
		DebugAlert.Show("cBaseAction İçindeki Action Metodu Override Edilmemiş..!");
	}
}, {});







