
var cFormSkin = Class(cBaseObject,
{
	ObjectType: ObjectTypes.cFormSkin
	, FormBackGroundImage: ""
	, FormLeftImage: ""
	, FormRightImage: ""
	, FormBottom: ""
	, FormLeftBottomCorner: ""
	, FormRightBottomCorner: ""
	, FormLeftUpperCorner: ""
	, FormRightUpperCorner: ""
	, FormTitleBarImage: ""
	, FormCloseButtonFreeImage: ""
	, FormCloseButtonOnMouseImage: ""
	, FormCloseButtonClickedImage: ""
	, FormCloseButtonFocused: ""
	,
	constructor: function (_FormBackGroundImage, _FormLeftImage, _FormRightImage, _FormBottom, _FormLeftUpperCorner, _FormRightUpperCorner, _FormLeftBottomCorner, _FormRightBottomCorner, _FormTitleBarImage, _FormCloseButtonFreeImage, _FormCloseButtonOnMouseImage, _FormCloseButtonClickedImage, _FormCloseButtonFocused)
	{
		cFormSkin.BaseObject.constructor.call(this);
		this.FormBackGroundImage = _FormBackGroundImage;
		this.FormLeftImage = _FormLeftImage;
		this.FormRightImage = _FormRightImage;
		this.FormBottom = _FormBottom;
		this.FormLeftUpperCorner = _FormLeftUpperCorner;
		this.FormRightUpperCorner = _FormRightUpperCorner;
		this.FormLeftBottomCorner = _FormLeftBottomCorner;
		this.FormRightBottomCorner = _FormRightBottomCorner;
		this.FormTitleBarImage = _FormTitleBarImage;
		this.FormCloseButtonFreeImage = _FormCloseButtonFreeImage;
		this.FormCloseButtonOnMouseImage = _FormCloseButtonOnMouseImage;
		this.FormCloseButtonClickedImage = _FormCloseButtonClickedImage;
		this.FormCloseButtonFocused = _FormCloseButtonFocused;

	}
	,
	BaseObject: function ()
	{
		return cBaseObject.prototype;
	}
	,
	Destroy: function ()
	{
		delete this.FormBackGroundImage;
		delete this.FormLeftImage;
		delete this.FormRightImage;
		delete this.FormBottom;
		delete this.FormLeftBottomCorner;
		delete this.FormRightBottomCorner;
		delete this.FormLeftUpperCorner;
		delete this.FormRightUpperCorner;
		delete this.FormTitleBarImage;
		delete this.FormCloseButtonFreeImage;
		delete this.FormCloseButtonOnMouseImage;
		delete this.FormCloseButtonClickedImage;
		delete this.FormCloseButtonFocused;
		cBaseObject.prototype.Destroy.call(this);
	}
}, {});
