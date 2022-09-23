
var cFormTitleBar = Class(cBaseControl,
{
	ObjectType: ObjectTypes.cFormTitleBar
	, Move: false
	, LastX: 0
	, LastY: 0
	, CloseButton: null
	,
	constructor: function (_ComponentController, _OwnerComponent)
	{
		cFormTitleBar.BaseObject.constructor.call(this, _ComponentController, _OwnerComponent, _OwnerComponent.ComponentName + "TitleBar", 0, -DefaultSceneSettings.FormTitleBarHeigth, _OwnerComponent.Width, DefaultSceneSettings.FormTitleBarHeigth, 0);
		this.ComponentGraphic = new cFormTitleBarGraphic(this);


		this.CloseButton = this.ComponentController.ComponentFactory.CreateImageButton(this, "", _OwnerComponent.Width - 58, 1, 48, 18, 0, DefaultSceneSettings.ComponentSkin.FormSkin.FormCloseButtonFreeImage, DefaultSceneSettings.ComponentSkin.FormSkin.FormCloseButtonOnMouseImage, DefaultSceneSettings.ComponentSkin.FormSkin.FormCloseButtonClickedImage, DefaultSceneSettings.ComponentSkin.FormSkin.FormCloseButtonFocused);
		this.CloseButton.Text = "";
		this.CloseButton.OnClick.Add(this, this.OnCloseClick);
		this.OwnerComponent.OnResize.Add(this, this.OnResizeFunction);

	}
	,
	OnCloseClick: function (_Event)
	{
		this.OwnerComponent.Close = true;
	}
	,
	OnResizeFunction: function ()
	{
		this.CloseButton.Left = this.OwnerComponent.Width - 58;
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
	MouseMove: function (_Event)
	{
		if (this.MouseDowned)
		{
			this.OwnerComponent.Left += _Event.offsetX - this.LastX;
			this.OwnerComponent.Top += _Event.offsetY - this.LastY;
			this.LastX = _Event.offsetX;
			this.LastY = _Event.offsetY;
		}

		return cBaseControl.prototype.MouseMove.call(this, _Event);
	}
	,
	MouseDown: function (_Event)
	{
		this.LastX = _Event.offsetX;
		this.LastY = _Event.offsetY;
		return cBaseControl.prototype.MouseDown.call(this, _Event);
	}
	,
	MouseUp: function (_Event)
	{
		return cBaseControl.prototype.MouseUp.call(this, _Event);
	}
	,
	Draw: function ()
	{
		this.Width = this.OwnerComponent.Width;
		cBaseControl.prototype.Draw.call(this);
	}
}, {});




