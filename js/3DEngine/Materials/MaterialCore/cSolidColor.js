
cSolidColor = Class(cBaseMaterialCore,
{
	ObjectType: ObjectTypes.cSolidColor
	, CameraController : null
	,
	constructor: function (_OwnerScene, _Color, _TextureWidth, _TextureHeight)
	{
		cSolidColor.BaseObject.constructor.call(this, _OwnerScene);
        this.FindCameraController();
        var __Color = _Color || DefaultSceneSettings.MaterialSolidColorSettings.SolidColorTextureDefaultColor;
        var __TextureWidth = _TextureWidth || DefaultSceneSettings.MaterialSolidColorSettings.SolidColorTextureDefaultWidth;
        var __TextureHeight = _TextureHeight || DefaultSceneSettings.MaterialSolidColorSettings.SolidColorTextureDefaultHeight;
        this.Texture = this.CameraController.CreateNewImage(__Color, __TextureWidth, __TextureHeight);
	}
    ,
	BaseObject: function ()
	{
		return cBaseMaterialCore.prototype;
	}
    ,
	Destroy: function ()
	{
		delete this.Texture;
		cBaseMaterialCore.prototype.Destroy.call(this);		
	}
	,
	FindCameraController: function ()
    {
        if (this.OwnerScene.CameraControllerList.Count() > 0)
        {
            this.CameraController = this.OwnerScene.CameraControllerList.GetItem(0);
        }
    }
}, {});