

var cNoLightableTexture_RadiusTransparency = Class(cBaseMaterial,
{
	ObjectType: ObjectTypes.cNoLightableTexture_RadiusTransparency
	, TransparentedTexture : null
	, CenterX : 0
	, CenterY : 0
	, NoTransparentRadius : 0
	, TransparentSmoothRadius : 0
    , TransparentFinishRadius : 0
	, TransparentIntensity : 0
    ,
	constructor: function (_OwnerScene, _MaterialCore, _CenterX, _CenterY, _NoTransparentRadius, _TransparentSmoothRadius, _TransparentFinishRadius, _TransparentIntensity)
	{
	    cNoLightableTexture_RadiusTransparency.BaseObject.constructor.call(this, _OwnerScene, _MaterialCore, null, null, null, null, null, null, 1, 1, Colors.White);
	    this.CenterX = _CenterX;
	    this.CenterY = _CenterY;
	    this.NoTransparentRadius = _NoTransparentRadius;
	    this.TransparentSmoothRadius = _TransparentSmoothRadius;
	    this.TransparentFinishRadius = _TransparentFinishRadius;
	    this.TransparentIntensity = _TransparentIntensity;
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
            
            var __Height = (i % this.MaterialCore.TextureData.height);
            var __Width = ((i - __Height)  / this.MaterialCore.TextureData.height) + 1;
            var __Distance = cMath.Distance2d(__Width, __Height, this.CenterX, this.CenterY);
                        
            if (__Distance > this.NoTransparentRadius)
            {
                if (__Distance > this.TransparentSmoothRadius)
                {
                    var __Ratio = (1 - ((__Distance - this.TransparentSmoothRadius) / (this.TransparentFinishRadius - this.TransparentSmoothRadius)));
                    var __Transparent =  __Ratio * this.TransparentIntensity;
                    this.MaterialCore.TextureData.data[(i * 4) + 3] = __Transparent * 255;
                }
                else if (__Distance < this.TransparentSmoothRadius)
                {
                    var __Ratio = (1 - ((__Distance - this.NoTransparentRadius) / (this.TransparentSmoothRadius - this.NoTransparentRadius)));
                    var __Transparent =  (__Ratio * (1 - this.TransparentIntensity)) + this.TransparentIntensity;
                    this.MaterialCore.TextureData.data[(i * 4) + 3] = __Transparent * 255;
                }
                else
                {
                    this.MaterialCore.TextureData.data[(i * 4) + 3] = this.TransparentIntensity * 255;
                }
            }
            else
            {
//                this.MaterialCore.TextureData.data[(i * 4) + 3] = this.TransparentIntensity * 255;
            }
            
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




