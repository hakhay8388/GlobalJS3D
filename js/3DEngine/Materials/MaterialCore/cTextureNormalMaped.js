
cTextureNormalMaped = Class(cBaseMaterialCore,
{
    ObjectType: ObjectTypes.cTextureNormalMap
	,
    constructor: function (_OwnerScene, _TexturePath, _NormalMapTexturePath)
    {
        cTextureNormalMaped.BaseObject.constructor.call(this, _OwnerScene);

        if ((_TexturePath != "" && _TexturePath) && (_NormalMapTexturePath != "" && _NormalMapTexturePath))
        {
            this.Texture = new Image();
            this.Texture.src = _TexturePath;

            this.NormalMapTexture = new Image();
            this.NormalMapTexture.src = _NormalMapTexturePath;

        }
        else
        {
            var __SolidColor = new cSolidColor();
            this.Texture = __SolidColor.Texture;
            this.NormalMapTexture = __SolidColor.Texture;
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
        delete this.Texture;
        cBaseMaterialCore.prototype.Destroy.call(this);        
    }
	,
    RenderLight: function ()
    {
        DebugAlert.Show("cBaseMaterialCore içindeki RenderLight Override Edilmedi..!");
    }
	,
    HasTexture: function ()
    {
        return (this.Texture != null && this.NormalMapTexture != null);
    }
	,
    IsComplete: function ()
    {
        if (this.HasTexture())
        {
            if (this.Texture.complete && this.NormalMapTexture.complete)
            {
                return true;
            }
        }
        return false;
    }
	,
    CreateDataFromImage: function ()
    {
        if (this.CameraController != null && this.IsComplete() && this.TextureData == null)
        {
            this.TextureData = this.CameraController.GetDataFromImage(this.Texture);
            this.NormalMapTextureData = this.CameraController.GetDataFromImage(this.NormalMapTexture);
        }
    }
	,
    Render: function (_Camera, _Material, _Model, _FaceCenter, _Vertex1, _Vertex2, _Vertex3, _SurfaceNormalVector, _uv_X1, _uv_Y1, _Vertex1NormalVector, _uv_X2, _uv_Y2, _Vertex2NormalVector, _uv_X3, _uv_Y3, _Vertex3NormalVector)
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
                __Light.RenderNormalMap(_Camera, _Material, i, _Model, _Model.TextureData, this.TextureData, this.NormalMapTextureData, _FaceCenter, _Vertex1, _Vertex2, _Vertex3, _SurfaceNormalVector, _uv_X1, _uv_Y1, _Vertex1NormalVector, _uv_X2, _uv_Y2, _Vertex2NormalVector, _uv_X3, _uv_Y3, _Vertex3NormalVector);
            }
        }
    }

}, {});