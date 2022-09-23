
var cSkillOperator = Class(cBaseObject,
{
	ObjectType: ObjectTypes.cSkillOperator
	, OnlineGameGraph: null
	, SkillList: null
	,
	constructor: function (_OnlineGameGraph)
	{
		cSkillOperator.BaseObject.constructor.call(this);
		this.OnlineGameGraph = _OnlineGameGraph;
		this.SkillList = new cList(ObjectTypes.cBaseSkill);
	}
	,
	Update: function ()
	{
		for (var i = this.SkillList.Count() - 1; i > -1; i--)
		{
			var __Item = this.SkillList.GetItem(i);
			if (__Item.Update())
			{
				this.SkillList.Remove(__Item);
				__Item.Destroy();
			}
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
		delete this.OnlineGameGraph;
		this.SkillList.DestroyWithItems();
		delete this.SkillList;
		cBaseObject.prototype.Destroy.call(this);
	}

}, {});







