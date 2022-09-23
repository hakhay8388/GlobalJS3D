

var cBaseShape = Class(cBaseObject,
{
	ObjectType: ObjectTypes.cBaseShape
    , EntityID: 0
    , OwnerScene: null
    , m_Color: 0
    , m_LineWidth: 0
    , m_Deleted: false
    , m_Visible: true
    ,
	constructor: function (_OwnerScene)
	{
		this.OwnerScene = _OwnerScene;
		cBaseShape.BaseObject.constructor.call(this);
		this.m_LineWidth = DefaultSceneSettings.LineWidth;
		this.m_Color = DefaultSceneSettings.DefultCurveColor;
		this.EntityID = _OwnerScene.GetFreeEntityID();
		this.OwnerScene.EntityList.Add(this);
	}
	,
	CompleteRender: function (_Camera)
    {
    }
    ,
	BaseObject: function ()
	{
		return cBaseObject.prototype;
	}
    ,
	Destroy: function ()
	{
		delete this.m_Color;
		delete this.m_LineWidth;
		delete this.m_Deleted;
		delete this.m_Visible;
        delete this.OwnerScene;
		cBaseObject.prototype.Destroy.call(this);        
	}
    ,
	Initalize: function (_Camera)
	{
		alert("cBaseShape Initalize'ı Override Edilmedi..!");
	}
    ,
	Render: function (_Camera)
	{
		alert("cBaseShape Draw'ı Override Edilmedi..!");
	}
    ,
	LineWidth: function (_Value)
	{
		if (_Value)
		{
			this.m_LineWidth = _Value;
		}
		else
		{
			return this.m_LineWidth;
		}
	}
    ,
	Color: function (_Value)
	{
		if (_Value)
		{
			this.m_Color = _Value;
		}
		else
		{
			return this.m_Color;
		}
	}
    ,
	Deleted: function (_Value)
	{
        if (_Value == true)
		{
			this.m_Deleted = true;
		}
		else if (_Value == false)
		{
		    this.m_Deleted = false;
		}
		else
		{
			return this.m_Deleted;
		}
	}
    ,
	Visible: function (_Value)
	{
		if (_Value == true)
		{
			this.m_Visible = true;
		}
		else if (_Value == false)
		{
		    this.m_Visible = false;
		}
		else
		{
			return this.m_Visible;
		}
	}
    ,
	IsRenderable: function ()
	{
		return this.Visible() && !this.Deleted();
	}
    ,
	IsLine: function ()
	{
		return false;
	}
    ,
	IsCirle: function ()
	{
		return false;
	}
    ,
	IsPolyLine: function ()
	{
		return false;
	}
    ,
	IsPolygon: function ()
	{
		return false;
	}
    ,
	IsPoint: function ()
	{
		return false;
	}
	,
	IsModel: function ()
	{
		return false;
	}


}, {});




