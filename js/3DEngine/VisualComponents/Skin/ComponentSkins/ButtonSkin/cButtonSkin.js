
var cButtonSkin = Class(cBaseObject,
{
	ObjectType: ObjectTypes.cButtonSkin
	, FreeButton_LeftImage: null
	, FreeButton_RightImage: null
	, FreeButton_UpperImage: null
	, FreeButton_BottomImage: null
	, FreeButton_LeftBottomCornerImage: null
	, FreeButton_RightBottomCornerImage: null
	, FreeButton_LeftUpperCornerImage: null
	, FreeButton_RightUpperCornerImage: null
	, FreeButton_CenterImage: null

	, MouseOnButton_LeftImage: null
	, MouseOnButton_RightImage: null
	, MouseOnButton_UpperImage: null
	, MouseOnButton_BottomImage: null
	, MouseOnButton_LeftBottomCornerImage: null
	, MouseOnButton_RightBottomCornerImage: null
	, MouseOnButton_LeftUpperCornerImage: null
	, MouseOnButton_RightUpperCornerImage: null
	, MouseOnButton_CenterImage: null

	, FocusedButton_LeftImage: null
	, FocusedButton_RightImage: null
	, FocusedButton_UpperImage: null
	, FocusedButton_BottomImage: null
	, FocusedButton_LeftBottomCornerImage: null
	, FocusedButton_RightBottomCornerImage: null
	, FocusedButton_LeftUpperCornerImage: null
	, FocusedButton_RightUpperCornerImage: null
	, FocusedButton_CenterImage: null

	, ClickedButton_LeftImage: null
	, ClickedButton_RightImage: null
	, ClickedButton_UpperImage: null
	, ClickedButton_BottomImage: null
	, ClickedButton_LeftBottomCornerImage: null
	, ClickedButton_RightBottomCornerImage: null
	, ClickedButton_LeftUpperCornerImage: null
	, ClickedButton_RightUpperCornerImage: null
	, ClickedButton_CenterImage: null
	,
	constructor: function (
		_FreeButton_Left
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
		, _ClickedButton_Center)
	{
		cButtonSkin.BaseObject.constructor.call(this);
		this.FreeButton_LeftImage =_FreeButton_Left;
		this.FreeButton_RightImage = _FreeButton_Right;
		this.FreeButton_UpperImage = _FreeButton_Upper;
		this.FreeButton_BottomImage = _FreeButton_Bottom;
		this.FreeButton_LeftBottomCornerImage = _FreeButton_LeftBottomCorner;
		this.FreeButton_RightBottomCornerImage = _FreeButton_RightBottomCorner;
		this.FreeButton_LeftUpperCornerImage = _FreeButton_LeftUpperCorner;
		this.FreeButton_RightUpperCornerImage = _FreeButton_RightUpperCorner;
		this.FreeButton_CenterImage = _FreeButton_Center;

		this.MouseOnButton_LeftImage = _MouseOnButton_Left;
		this.MouseOnButton_RightImage = _MouseOnButton_Right;
		this.MouseOnButton_UpperImage = _MouseOnButton_Upper;
		this.MouseOnButton_BottomImage = _MouseOnButton_Bottom;
		this.MouseOnButton_LeftBottomCornerImage = _MouseOnButton_LeftBottomCorner;
		this.MouseOnButton_RightBottomCornerImage = _MouseOnButton_RightBottomCorner;
		this.MouseOnButton_LeftUpperCornerImage = _MouseOnButton_LeftUpperCorner;
		this.MouseOnButton_RightUpperCornerImage = _MouseOnButton_RightUpperCorner;
		this.MouseOnButton_CenterImage = _MouseOnButton_Center;

		this.FocusedButton_LeftImage = _FocusedButton_Left;
		this.FocusedButton_RightImage = _FocusedButton_Right;
		this.FocusedButton_UpperImage = _FocusedButton_Upper;
		this.FocusedButton_BottomImage = _FocusedButton_Bottom;
		this.FocusedButton_LeftBottomCornerImage = _FocusedButton_LeftBottomCorner;
		this.FocusedButton_RightBottomCornerImage = _FocusedButton_RightBottomCorner;
		this.FocusedButton_LeftUpperCornerImage = _FocusedButton_LeftUpperCorner;
		this.FocusedButton_RightUpperCornerImage = _FocusedButton_RightUpperCorner;
		this.FocusedButton_CenterImage = _FocusedButton_Center;

		this.ClickedButton_LeftImage = _ClickedButton_Left;
		this.ClickedButton_RightImage = _ClickedButton_Right;
		this.ClickedButton_UpperImage = _ClickedButton_Upper;
		this.ClickedButton_BottomImage = _ClickedButton_Bottom;
		this.ClickedButton_LeftBottomCornerImage = _ClickedButton_LeftBottomCorner;
		this.ClickedButton_RightBottomCornerImage = _ClickedButton_RightBottomCorner;
		this.ClickedButton_LeftUpperCornerImage = _ClickedButton_LeftUpperCorner;
		this.ClickedButton_RightUpperCornerImage = _ClickedButton_RightUpperCorner;
		this.ClickedButton_CenterImage = _ClickedButton_Center;
		
	}
	,
	BaseObject: function ()
	{
		return cBaseObject.prototype;
	}
	,
	Destroy: function ()
	{
		delete this.FreeButton_LeftImage;
		delete this.FreeButton_RightImage;
		delete this.FreeButton_UpperImage;
		delete this.FreeButton_BottomImage;
		delete this.FreeButton_LeftBottomCornerImage;
		delete this.FreeButton_RightBottomCornerImage;
		delete this.FreeButton_LeftUpperCornerImage;
		delete this.FreeButton_RightUpperCornerImage;
		delete this.FreeButton_CenterImage;
		
		delete this.MouseOnButton_LeftImage;
		delete this.MouseOnButton_RightImage;
		delete this.MouseOnButton_UpperImage;
		delete this.MouseOnButton_BottomImage;
		delete this.MouseOnButton_LeftBottomCornerImage;
		delete this.MouseOnButton_RightBottomCornerImage;
		delete this.MouseOnButton_LeftUpperCornerImage;
		delete this.MouseOnButton_RightUpperCornerImage;
		delete this.MouseOnButton_CenterImage;
		
		delete this.FocusedButton_LeftImage;
		delete this.FocusedButton_RightImage;
		delete this.FocusedButton_UpperImage;
		delete this.FocusedButton_BottomImage;
		delete this.FocusedButton_LeftBottomCornerImage;
		delete this.FocusedButton_RightBottomCornerImage;
		delete this.FocusedButton_LeftUpperCornerImage;
		delete this.FocusedButton_RightUpperCornerImage;
		delete this.FocusedButton_CenterImage;
		
		delete this.ClickedButton_LeftImage;
		delete this.ClickedButton_RightImage;
		delete this.ClickedButton_UpperImage;
		delete this.ClickedButton_BottomImage;
		delete this.ClickedButton_LeftBottomCornerImage;
		delete this.ClickedButton_RightBottomCornerImage;
		delete this.ClickedButton_LeftUpperCornerImage;
		delete this.ClickedButton_RightUpperCornerImage;
		delete this.ClickedButton_CenterImage;
		cBaseObject.prototype.Destroy.call(this);
	}
}, {});
