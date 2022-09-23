
var cTextBoxSkin = Class(cBaseObject,
{
	ObjectType: ObjectTypes.cTextBoxSkin
	, TextBox_LeftImage: null
	, TextBox_RightImage: null
	, TextBox_UpperImage: null
	, TextBox_BottomImage: null
	, TextBox_LeftBottomCornerImage: null
	, TextBox_RightBottomCornerImage: null
	, TextBox_LeftUpperCornerImage: null
	, TextBox_RightUpperCornerImage: null
	, TextBox_CenterImage: null

	,
	constructor: function (
		  _TextBox_Left
		, _TextBox_Right
		, _TextBox_Upper
		, _TextBox_Bottom
		, _TextBox_LeftBottomCorner
		, _TextBox_RightBottomCorner
		, _TextBox_LeftUpperCorner
		, _TextBox_RightUpperCorner
		, _TextBox_Center)
	{
		cTextBoxSkin.BaseObject.constructor.call(this);
		this.TextBox_LeftImage = _TextBox_Left;
		this.TextBox_RightImage = _TextBox_Right;
		this.TextBox_UpperImage = _TextBox_Upper;
		this.TextBox_BottomImage = _TextBox_Bottom;
		this.TextBox_LeftBottomCornerImage = _TextBox_LeftBottomCorner;
		this.TextBox_RightBottomCornerImage = _TextBox_RightBottomCorner;
		this.TextBox_LeftUpperCornerImage = _TextBox_LeftUpperCorner;
		this.TextBox_RightUpperCornerImage = _TextBox_RightUpperCorner;
		this.TextBox_CenterImage = _TextBox_Center;		
	}
	,
	BaseObject: function ()
	{
		return cBaseObject.prototype;
	}
	,
	Destroy: function ()
	{
		delete this.TextBox_LeftImage;
		delete this.TextBox_RightImage;
		delete this.TextBox_UpperImage;
		delete this.TextBox_BottomImage;
		delete this.TextBox_LeftBottomCornerImage;
		delete this.TextBox_RightBottomCornerImage;
		delete this.TextBox_LeftUpperCornerImage;
		delete this.TextBox_RightUpperCornerImage;
		delete this.TextBox_CenterImage;
		
		
		cBaseObject.prototype.Destroy.call(this);
	}
}, {});
