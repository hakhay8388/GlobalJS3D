
var cForm = Class(cBaseControl, {
	ObjectType: ObjectTypes.cForm
	, MouseDowned: false
	, LastX: 0
	, LastY: 0
	, OnActivate: null
	, Deactivate: null
	, Text: ""
	, TitleBar: null
	, Resizable: null
	, Close: false
	,
	constructor: function (_ComponentController, _OwnerComponent, _ComponentName, _Left, _Top, _Width, _Height, _TopOrder, _FormGraphic)
	{
		cForm.BaseObject.constructor.call(this, _ComponentController, _OwnerComponent, _ComponentName, _Left, _Top, _Width, _Height, _TopOrder);
		this.OnActivate = new cDelegate(false);
		this.OnDeactivate = new cDelegate(false);
		this.Focused = true;
		this.Text = "Form1";
		this.TitleBar = this.ComponentController.ComponentFactory.CreateFormTitleBar(this);

		if (_FormGraphic)
		{
			this.ComponentGraphic = _FormGraphic
		}
		else
		{
			this.ComponentGraphic = new cFormGraphic(this);
		}

		this.Resizable = this.ComponentController.ComponentFactory.CreatecResizable(this);
		this.Opacity = 100;
	}
	,
	BaseObject: function ()
	{
		return cBaseControl.prototype;
	},
	Destroy: function ()
	{
		this.OnDisposed.Run(null);
		cBaseControl.prototype.Destroy.call(this);
	}
	,
	Draw: function ()
	{
		if (this.Close)
		{
			this.Destroy();
		}
		else
		{
			return cBaseControl.prototype.Draw.call(this);
		}
	}
	,
	MouseMove: function (_Event)
	{
		return cBaseControl.prototype.MouseMove.call(this, _Event);
	}
	,
	MouseDown: function (_Event)
	{
		return cBaseControl.prototype.MouseDown.call(this, _Event);
	}
	,
	MouseUp: function (_Event)
	{
		return cBaseControl.prototype.MouseUp.call(this, _Event);
	}
}, {});




