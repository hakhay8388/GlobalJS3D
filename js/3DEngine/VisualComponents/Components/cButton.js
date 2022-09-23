
var cButton = Class(cBaseControl, {
	ObjectType: ObjectTypes.cButton
	,
	constructor: function (
		_ComponentController
		, _OwnerComponent
		, _ComponentName
		, _Left
		, _Top
		, _Width
		, _Height
		, _TopOrder

		, _FreeButton_Left
		, _FreeButton_Right
		, _FreeButton_Upper
		, _FreeButton_Bottom
		, _FreeButton_LeftBottomCorner
		, _FreeButton_RightBottomCorner
		, _FreeButton_LeftUpperCorner
		, _FreeButton_RightUpperCorner
		, _FreeButton_Center

		, _MouseOnButton_Left
		, _MouseOnButton_Right
		, _MouseOnButton_Upper
		, _MouseOnButton_Bottom
		, _MouseOnButton_LeftBottomCorner
		, _MouseOnButton_RightBottomCorner
		, _MouseOnButton_LeftUpperCorner
		, _MouseOnButton_RightUpperCorner
		, _MouseOnButton_Center

		, _FocusedButton_Left
		, _FocusedButton_Right
		, _FocusedButton_Upper
		, _FocusedButton_Bottom
		, _FocusedButton_LeftBottomCorner
		, _FocusedButton_RightBottomCorner
		, _FocusedButton_LeftUpperCorner
		, _FocusedButton_RightUpperCorner
		, _FocusedButton_Center

		, _ClickedButton_Left
		, _ClickedButton_Right
		, _ClickedButton_Upper
		, _ClickedButton_Bottom
		, _ClickedButton_LeftBottomCorner
		, _ClickedButton_RightBottomCorner
		, _ClickedButton_LeftUpperCorner
		, _ClickedButton_RightUpperCorner
		, _ClickedButton_Center
	)
	{
		cButton.BaseObject.constructor.call(this, _ComponentController, _OwnerComponent, _ComponentName, _Left, _Top, _Width, _Height, _TopOrder);
		this.ComponentGraphic = new cButtonGraphic(this
			, _FreeButton_Left
			, _FreeButton_Right
			, _FreeButton_Upper
			, _FreeButton_Bottom
			, _FreeButton_LeftBottomCorner
			, _FreeButton_RightBottomCorner
			, _FreeButton_LeftUpperCorner
			, _FreeButton_RightUpperCorner
			, _FreeButton_Center

			, _MouseOnButton_Left
			, _MouseOnButton_Right
			, _MouseOnButton_Upper
			, _MouseOnButton_Bottom
			, _MouseOnButton_LeftBottomCorner
			, _MouseOnButton_RightBottomCorner
			, _MouseOnButton_LeftUpperCorner
			, _MouseOnButton_RightUpperCorner
			, _MouseOnButton_Center

			, _FocusedButton_Left
			, _FocusedButton_Right
			, _FocusedButton_Upper
			, _FocusedButton_Bottom
			, _FocusedButton_LeftBottomCorner
			, _FocusedButton_RightBottomCorner
			, _FocusedButton_LeftUpperCorner
			, _FocusedButton_RightUpperCorner
			, _FocusedButton_Center

			, _ClickedButton_Left
			, _ClickedButton_Right
			, _ClickedButton_Upper
			, _ClickedButton_Bottom
			, _ClickedButton_LeftBottomCorner
			, _ClickedButton_RightBottomCorner
			, _ClickedButton_LeftUpperCorner
			, _ClickedButton_RightUpperCorner
			, _ClickedButton_Center);
		this.Text = "Button1";
		this.Resizable = this.ComponentController.ComponentFactory.CreatecResizable(this);
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
}, {});




