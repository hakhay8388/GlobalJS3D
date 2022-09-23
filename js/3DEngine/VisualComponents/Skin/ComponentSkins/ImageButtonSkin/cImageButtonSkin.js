
var cImageButtonSkin = Class(cBaseObject,
{
	ObjectType: ObjectTypes.cImageButtonSkin
	, ImageButtonFreeImage: ""
	, ImageButtonOnMouseFreeImage: ""
	, ImageButtonClickedImage: ""
	, ImageButtonFocusedImage: ""
	,
	constructor: function (_ImageButtonFreeImage, _ImageButtonOnMouseFreeImage, _ImageButtonClickedImage, _ImageButtonFocusedImage)
	{
		cImageButtonSkin.BaseObject.constructor.call(this);
		this.ImageButtonFreeImage = _ImageButtonFreeImage;
		this.ImageButtonOnMouseFreeImage = _ImageButtonOnMouseFreeImage;
		this.ImageButtonClickedImage = _ImageButtonClickedImage;
		this.ImageButtonFocusedImage = _ImageButtonFocusedImage;
	}
	,
	BaseObject: function ()
	{
		return cBaseObject.prototype;
	}
	,
	Destroy: function ()
	{
		delete this.ImageButtonFreeImage;
		delete this.ImageButtonOnMouseFreeImage;
		delete this.ImageButtonClickedImage;
		delete this.ImageButtonFocusedImage;
		cBaseObject.prototype.Destroy.call(this);
	}
}, {});
