
var cSkillListOperator = Class(cBaseObject,
{
	ObjectType: ObjectTypes.cSkillListOperator
	, OnlineGameGraph: null
	, SkillList: null
	, UsableSkillList: null
	, BasicSkillCreater: null
	,
	constructor: function (_OnlineGameGraph)
	{
		cSkillListOperator.BaseObject.constructor.call(this);
		this.OnlineGameGraph = _OnlineGameGraph;
		this.SkillList = new cList(ObjectTypes.cBaseSkillCreater);
		this.UsableSkillList = new cList(ObjectTypes.cBaseSkillCreater);
		this.LoadSkills();
		this.LoadUsableSkillList();
	}
	,
	LoadSkills: function ()
	{
		this.BasicSkillCreater = new cBasicSkillCreater(this.OnlineGameGraph);
		this.SkillList.Add(this.BasicSkillCreater);
	}
	,
	LoadUsableSkillList: function ()
	{
		//Point ve lvl kontrollü yapılarak char tarafından kullanılabilecek skill'ler Listeye eklenecek
		for (var i = 0; i < this.SkillList.Count(); i++)
		{
			this.UsableSkillList.Add(this.SkillList.GetItem(i));
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
		this.BasicSkill.Destroy();
		delete this.BasicSkill;
		cBaseObject.prototype.Destroy.call(this);
	}

}, {});







