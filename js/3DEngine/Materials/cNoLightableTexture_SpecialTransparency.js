

var cNoLightableTexture_SpecialTransparency = Class(cBaseMaterial,
{
	ObjectType: ObjectTypes.cNoLightableTexture_SpecialTransparency
	, TransparentedTexture : null
	, SpecialTransparencyKeyColor : null
    ,
	constructor: function (_OwnerScene, _MaterialCore, _SpecialTransparencyKeyColor)
	{
	    cNoLightableTexture_SpecialTransparency.BaseObject.constructor.call(this, _OwnerScene, _MaterialCore, null, null, null, null, null, null, 1, 1, Colors.White);
	    this.SpecialTransparencyKeyColor = _SpecialTransparencyKeyColor;
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
            var __Red = this.MaterialCore.TextureData.data[(i * 4) + 0];
            var __Green = this.MaterialCore.TextureData.data[(i * 4) + 1];
            var __Blue = this.MaterialCore.TextureData.data[(i * 4) + 2];
            
            if (__Count / 2 < i)
            {
                i = i;
            }
            
            var __RedTransparet = 0;
            var __GreenTransparet = 0;
            var __BlueTransparet = 0;

            if ((this.SpecialTransparencyKeyColor.Red * 255) > 0)
            {
                __RedTransparet = __Red / (this.SpecialTransparencyKeyColor.Red * 255);
            }
            else
            {
                __RedTransparet = 0;
            }
            
            if ((this.SpecialTransparencyKeyColor.Green * 255) > 0)
            {
                __GreenTransparet = __Green / (this.SpecialTransparencyKeyColor.Green * 255);
            }
            else
            {
                __GreenTransparet = 0;
            }
            
            if ((this.SpecialTransparencyKeyColor.Blue * 255) > 0)
            {
                __BlueTransparet = __Blue / (this.SpecialTransparencyKeyColor.Blue * 255);
            }
            else
            {
                __BlueTransparet = 0;
            }
            
            var __Transparency  = __RedTransparet + __GreenTransparet + __BlueTransparet;
            
            this.MaterialCore.TextureData.data[(i * 4) + 3] = Math.round(this.Clamp(__Transparency * 255, 0, 255));
        }
    }    
    ,
    Render: function (_Camera, _Model)
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

}, {});




