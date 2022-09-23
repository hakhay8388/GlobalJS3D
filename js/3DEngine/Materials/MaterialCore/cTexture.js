
cTexture = Class(cBaseMaterialCore,
{
	ObjectType: ObjectTypes.cTexture
	,
	constructor: function (_OwnerScene, _TexturePath)
	{
		cTexture.BaseObject.constructor.call(this, _OwnerScene);

		if (_TexturePath != "" && _TexturePath)
		{
			this.Texture = new Image();
			this.Texture.src = _TexturePath;
		}
		else
		{
		    var __SolidColor = new cSolidColor();
		    this.Texture = __SolidColor.Texture;
		}
	}
    ,
	BaseObject: function ()
	{
		return cBaseMaterialCore.prototype;
	}
    ,
	Destroy: function ()
	{
		cBaseMaterialCore.prototype.Destroy.call(this);
	}

}, {});