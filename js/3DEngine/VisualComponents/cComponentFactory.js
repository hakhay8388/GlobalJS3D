
var cComponentFactory = Class(cBaseObject, {
	ObjectType: ObjectTypes.cComponentFactory
	, ComponentController: null
	,
	constructor: function (_ComponentController)
	{
		cComponentFactory.BaseObject.constructor.call(this);
		this.ComponentController = _ComponentController;
	}
	,
	CreateProgressBar: function (_OwnerComponent, _ComponentName, _Left, _Top, _Width, _Height, _TopOrder, _Percent, _ProgressBarGraphic)
	{
		var __ProgressBar = new cProgressBar(this.ComponentController, _OwnerComponent, _ComponentName, _Left, _Top, _Width, _Height, _TopOrder, _Percent, _ProgressBarGraphic);
		return __ProgressBar;
	}
	,
	CreateImageButton: function (_OwnerComponent, _ComponentName, _Left, _Top, _Width, _Height, _TopOrder, _ButtonFreeImage, _ButtonOnMouseFreeImage, _ButtonClickedImage, _ButtonFocusedImage)
	{
		var __Button = new cImageButton(this.ComponentController, _OwnerComponent, _ComponentName, _Left, _Top, _Width, _Height, _TopOrder, _ButtonFreeImage, _ButtonOnMouseFreeImage, _ButtonClickedImage, _ButtonFocusedImage);
		return __Button;
	}
	,
	CreateButton: function (_OwnerComponent, _ComponentName, _Left, _Top, _Width, _Height, _TopOrder, _FreeButton_Left, _FreeButton_Right, _FreeButton_Upper, _FreeButton_Bottom, _FreeButton_LeftBottomCorner, _FreeButton_RightBottomCorner, _FreeButton_LeftUpperCorner, _FreeButton_RightUpperCorner, _FreeButton_Center, _MouseOnButton_Left, _MouseOnButton_Right, _MouseOnButton_Upper, _MouseOnButton_Bottom, _MouseOnButton_LeftBottomCorner, _MouseOnButton_RightBottomCorner, _MouseOnButton_LeftUpperCorner, _MouseOnButton_RightUpperCorner, _MouseOnButton_Center
, _FocusedButton_Left, _FocusedButton_Right, _FocusedButton_Upper, _FocusedButton_Bottom, _FocusedButton_LeftBottomCorner, _FocusedButton_RightBottomCorner, _FocusedButton_LeftUpperCorner, _FocusedButton_RightUpperCorner, _FocusedButton_Center, _ClickedButton_Left, _ClickedButton_Right, _ClickedButton_Upper, _ClickedButton_Bottom, _ClickedButton_LeftBottomCorner, _ClickedButton_RightBottomCorner, _ClickedButton_LeftUpperCorner, _ClickedButton_RightUpperCorner
, _ClickedButton_Center)
	{
		var __Button = new cButton(this.ComponentController, _OwnerComponent, _ComponentName, _Left, _Top, _Width, _Height, _TopOrder, _FreeButton_Left, _FreeButton_Right, _FreeButton_Upper, _FreeButton_Bottom, _FreeButton_LeftBottomCorner, _FreeButton_RightBottomCorner, _FreeButton_LeftUpperCorner, _FreeButton_RightUpperCorner, _FreeButton_Center, _MouseOnButton_Left, _MouseOnButton_Right, _MouseOnButton_Upper, _MouseOnButton_Bottom, _MouseOnButton_LeftBottomCorner, _MouseOnButton_RightBottomCorner, _MouseOnButton_LeftUpperCorner, _MouseOnButton_RightUpperCorner, _MouseOnButton_Center
, _FocusedButton_Left, _FocusedButton_Right, _FocusedButton_Upper, _FocusedButton_Bottom, _FocusedButton_LeftBottomCorner, _FocusedButton_RightBottomCorner, _FocusedButton_LeftUpperCorner, _FocusedButton_RightUpperCorner, _FocusedButton_Center, _ClickedButton_Left, _ClickedButton_Right, _ClickedButton_Upper, _ClickedButton_Bottom, _ClickedButton_LeftBottomCorner, _ClickedButton_RightBottomCorner, _ClickedButton_LeftUpperCorner, _ClickedButton_RightUpperCorner
, _ClickedButton_Center)
		return __Button;
	}
	,
	CreateTextBox: function (_OwnerComponent, _ComponentName, _Left, _Top, _Width, _Height, _TopOrder, _TextBox_Left, _TextBox_Right, _TextBox_Upper
, _TextBox_Bottom, _TextBox_LeftBottomCorner, _TextBox_RightBottomCorner, _TextBox_LeftUpperCorner, _TextBox_RightUpperCorner, _TextBox_Center)
	{
		var __TextBox = new cTextBox(this.ComponentController, _OwnerComponent, _ComponentName, _Left, _Top, _Width, _Height, _TopOrder, _TextBox_Left, _TextBox_Right, _TextBox_Upper, _TextBox_Bottom, _TextBox_LeftBottomCorner, _TextBox_RightBottomCorner, _TextBox_LeftUpperCorner, _TextBox_RightUpperCorner, _TextBox_Center);
		return __TextBox;
	}
	,
	CreateForm: function (_OwnerComponent, _ComponentName, _Left, _Top, _Width, _Height, _TopOrder, _FormGraphic)
	{
		var __Form = new cForm(this.ComponentController, _OwnerComponent, _ComponentName, _Left, _Top, _Width, _Height, _TopOrder, _FormGraphic);
		return __Form;
	}
	,
	CreateFormTitleBar: function (_OwnerComponent, _FormTitleBarGraphic)
	{
		var __FormTitleBar = new cFormTitleBar(this.ComponentController, _OwnerComponent, _FormTitleBarGraphic);
		return __FormTitleBar;
	}
	,
	CreatecResizable: function (_OwnerComponent)
	{
		var __Resizable = new cResizable(this.ComponentController, _OwnerComponent);
		return __Resizable;
	}
	,
	BaseObject: function ()
	{
		return cBaseObject.prototype;
	},
	Destroy: function ()
	{
		delete this.ComponentController;
		cBaseObject.prototype.Destroy.call(this);
	}
}, {});




