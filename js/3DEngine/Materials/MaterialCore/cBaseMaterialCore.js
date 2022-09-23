
cBaseMaterialCore = Class(cBaseObject,
{
	ObjectType: ObjectTypes.cBaseMaterialCore
	, OwnerScene : null
	, Texture: null
	, TextureData : null
	, CameraController : null
	,
	constructor: function (_OwnerScene)
	{
		cBaseMaterialCore.BaseObject.constructor.call(this);
		this.OwnerScene = _OwnerScene;
		this.FindCameraController();
	}
	,
	FindCameraController: function ()
    {
        if (this.OwnerScene.CameraControllerList.Count() > 0)
        {
            this.CameraController = this.OwnerScene.CameraControllerList.GetItem(0);
        }
        else
        {
            DebugAlert.Show("cBaseMaterialCore, CameraController Bulamadı..!");   
        }
    }
    ,
	BaseObject: function ()
	{
		return cBaseObject.prototype;
	}
    ,
	Destroy: function ()
	{
		delete this.Texture;
		delete this.TextureData;
		cBaseObject.prototype.Destroy.call(this);		
	}
	,
	HasTexture : function()
	{
	    return this.Texture != null;
	}
	,
	IsComplete : function()
	{
	    if (this.HasTexture())
	    {
	        if (this.Texture.complete)
	        {
	            return true;
	        }
	    }
	    return false;
	}
	,
	RenderLight : function()
	{
	    DebugAlert.Show("cBaseMaterialCore içindeki RenderLight Override Edilmedi..!");
	}
	,
	CreateDataFromImage : function()
	{
	    if (this.CameraController != null && this.IsComplete())
	    {
	        this.TextureData = this.CameraController.GetDataFromImage(this.Texture);
	    }
	}
	,
	Render : function(_Camera , _Material, _Model, _FaceCenter, _Vertex1, _Vertex2, _Vertex3, _SurfaceNormalVector, _uv_X1, _uv_Y1, _Vertex1NormalVector, _uv_X2, _uv_Y2, _Vertex2NormalVector, _uv_X3, _uv_Y3, _Vertex3NormalVector)
	{
	    if (this.TextureData == null) 
	    {
	        this.CreateDataFromImage();
	    }
	 
	    if (_Model.UseLight)   
	    {
	        var __LightCount = this.OwnerScene.LightList.Count();
            for (var i = 0; i < __LightCount; i++)
            {
                var __Light = this.OwnerScene.LightList.GetItem(i);
                __Light.Render(_Camera, _Material, i, _Model, _Model.TextureData, this.TextureData, _FaceCenter, _Vertex1, _Vertex2, _Vertex3, _SurfaceNormalVector, _uv_X1, _uv_Y1, _Vertex1NormalVector, _uv_X2, _uv_Y2, _Vertex2NormalVector, _uv_X3, _uv_Y3, _Vertex3NormalVector);
            }
        }
	}
}, {});