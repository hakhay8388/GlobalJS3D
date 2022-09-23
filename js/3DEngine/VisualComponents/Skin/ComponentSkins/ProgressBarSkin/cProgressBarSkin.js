
var cProgressBarSkin = Class(cBaseObject,
{
	ObjectType: ObjectTypes.cProgressBarSkin
	, ProgressBarBackGroundImage: ""
	, ProgressBarPercentImage: ""
	,
	constructor: function (_ProgressBarBackGroundImage, _ProgressBarPercentImage)
	{
		cProgressBarSkin.BaseObject.constructor.call(this);
		this.ProgressBarBackGroundImage = _ProgressBarBackGroundImage;
		this.ProgressBarPercentImage = _ProgressBarPercentImage;
	}
	,
	BaseObject: function ()
	{
		return cBaseObject.prototype;
	}
	,
	Destroy: function ()
	{
		delete this.ProgressBarBackGroundImage;
		delete this.ProgressBarPercentImage;
		cBaseObject.prototype.Destroy.call(this);
	}
}, {});
