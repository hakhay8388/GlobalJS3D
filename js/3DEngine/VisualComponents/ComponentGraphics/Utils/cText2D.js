

var cText2D = Class(cBaseObject,
{
	ObjectType: ObjectTypes.cText2D
    , TextString: ""
    , FontPunto: 12
    , FontStyle: "Arial"
	, LighterModel: false
	, X: 0
	, Y: 0
	, LeftAlign: false
	, RightAlign: false
	, Center: true
	,
	constructor: function (_Text, _X, _Y, _Color, _FontStyle, _FontPunto, _LighterModel, _LeftAlign, _RightAlign, _Center)
	{
		cBaseControl.BaseObject.constructor.call(this);
		this.TextString = _Text;
		this.FontPunto = _FontPunto;
		this.LighterModel = _LighterModel;
		this.X = _X;
		this.Y = _Y;
		this.FontStyle = _FontStyle;

		this.LeftAlign = _LeftAlign;
		this.RightAlign = _RightAlign;
		this.Center = _Center;

		if (_Color)
		{
			this.m_Color = _Color.CreateNewCopy();
		}
		else
		{
			this.m_Color = DefaultSceneSettings.DefultCurveColor.CreateNewCopy();
		}
	}
	,
	SetColor: function (_Color)
	{
		if (_Color)
		{
			this.m_Color = _Color.CreateNewCopy();
		}
		else
		{
			this.m_Color = DefaultSceneSettings.DefultCurveColor.CreateNewCopy();
		}
	}
	,
	SetTransparency: function (_Transparency)
	{
		this.m_Color.Transparent = _Transparency;
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
	Update: function (_Text, _X, _Y, _FontStyle, _FontPunto, _LighterModel)
	{
		this.TextString = _Text;
		this.FontStyle = _FontStyle;
		this.FontPunto = _FontPunto;
		this.LighterModel = _LighterModel;
		this.X = _X;
		this.Y = _Y;
	}
	,
	Draw: function (_Camera)
	{
		if (this.LighterModel)
		{
			_Camera.Canvas2dContent.globalCompositeOperation = "lighter";
		}

		var __Align = _Camera.Canvas2dContent.textAlign;

		if (this.Center)
		{
			_Camera.Canvas2dContent.textAlign = "center";
		}
		else if (this.RightAlign)
		{
			_Camera.Canvas2dContent.textAlign = "right";
		}

		else
		{
			_Camera.Canvas2dContent.textAlign = "left";
		}

		_Camera.Canvas2dContent.textBaseline = "middle";
		_Camera.Canvas2dContent.font = this.FontPunto + "pt " + this.FontStyle;
		_Camera.Canvas2dContent.fillStyle = this.m_Color.toString();
		_Camera.Canvas2dContent.fillText(this.TextString, this.X, this.Y);

		_Camera.Canvas2dContent.textAlign = __Align;

		if (this.LighterModel)
		{
			_Camera.Canvas2dContent.globalCompositeOperation = "source-over";
		}
	}
}, {});




