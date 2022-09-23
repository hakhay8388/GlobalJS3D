
var cImageButton = Class(cBaseControl, {
	ObjectType: ObjectTypes.cImageButton
	,
	constructor: function (_ComponentController, _OwnerComponent, _ComponentName, _Left, _Top, _Width, _Height, _TopOrder, _ButtonFreeImage, _ButtonOnMouseFreeImage, _ButtonClickedImage, _ButtonFocusedImage)
	{
		cImageButton.BaseObject.constructor.call(this, _ComponentController, _OwnerComponent, _ComponentName, _Left, _Top, _Width, _Height, _TopOrder);
		this.ComponentGraphic = new cImageButtonGraphic(this, _ButtonFreeImage, _ButtonOnMouseFreeImage, _ButtonClickedImage, _ButtonFocusedImage);
		this.Text = "Button1";
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




