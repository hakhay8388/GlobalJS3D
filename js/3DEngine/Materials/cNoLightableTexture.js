

var cNoLightableTexture = Class(cBaseMaterial,
{
	ObjectType: ObjectTypes.cNoLightableTexture
	, TransparentedTexture : null
	, UseTextureDirect : false
    ,
	constructor: function (_OwnerScene, _MaterialCore, _Transparency, _KeyColorIntensity, _KeyColor, _UseTextureDirect)
	{
	    cNoLightableTexture.BaseObject.constructor.call(this, _OwnerScene, _MaterialCore, null, null, null, null, null, null, _Transparency, _KeyColorIntensity, _KeyColor);
	    this.UseTextureDirect = _UseTextureDirect;
	}
    ,
	BaseObject: function ()
	{
		return cBaseMaterial.prototype;
	}
    ,
	Destroy: function ()
	{
		cBaseMaterial.prototype.Destroy.call(this);        
	}
	,
    FindCameraController: function ()
    {
        if (this.OwnerScene.CameraControllerList.Count() > 0)
        {
            this.CameraController = this.OwnerScene.CameraControllerList.GetItem(0);
        }
    }
    ,
    Initalize : function()
    {
    }
    ,
    DoTransparency : function()
    {
        var __Count = this.MaterialCore.TextureData.width * this.MaterialCore.TextureData.height;
        for (var i = 0; i < __Count; i++)
        {
            this.MaterialCore.TextureData.data[(i * 4) + 3] = Math.round(this.Clamp(this.Transparency * 255, 0, 255));
            if (this.KeyColorIntensity != 1)
            {
                if (this.MaterialCore.TextureData.data[(i * 4)] == Math.round(this.KeyColor.Red * 255) && this.MaterialCore.TextureData.data[(i * 4) + 1] == Math.round(this.KeyColor.Green * 255) && this.MaterialCore.TextureData.data[(i * 4) + 2] == Math.round(this.KeyColor.Blue * 255))
                {
                    this.MaterialCore.TextureData.data[(i * 4) + 3] = this.KeyColorIntensity;
                }
            }
        }
    }    
    ,
    Render: function (_Camera, _Model)
    {
        if (!this.UseTextureDirect)
        {
            if (this.MaterialCore.TextureData == null) 
	        {
	            this.MaterialCore.CreateDataFromImage();
	            if (this.MaterialCore.TextureData != null)
	            {
	                this.DoTransparency();
	            }
	        }

	        if (this.TransparentedTexture == null && this.MaterialCore.TextureData != null)
	        {
	            this.TransparentedTexture = this.MaterialCore.CameraController.GetImageFromImageData(this.MaterialCore.TextureData);
	        }
	        _Model.TextureImage = this.TransparentedTexture;	        
	    }
	    else
	    {
	        _Model.TextureImage = this.MaterialCore.Texture;
	    }
    }	

}, {});




