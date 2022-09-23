

var cBaseMaterial = Class(cBaseObject,
{
    ObjectType: ObjectTypes.cBaseMaterial
    , OwnerScene: null
    , MaterialCore: null
    , CameraController: null
    , Diffuse: 1
    , Ambient: 1
    , Specularity: 10
    , SpecularPower: 100
    , SpecularColor: Colors.White
    , AmbientIntensity: 1
    , AmbientColor: Colors.White
    , Transparency: 1
    , KeyColorIntensity: 0
    , KeyColor: Colors.Green
    , TrasparentApplied : false
    ,
    constructor: function (_OwnerScene, _MaterialCore, _Diffuse, _AmbientIntensity, _AmbientColor, _Specularity, _SpecularPower, _SpecularColor, _Transparency, _KeyColorIntensity, _KeyColor)
    {
        cBaseMaterial.BaseObject.constructor.call(this);
        this.OwnerScene = _OwnerScene;
        this.FindCameraController();
        this.OwnerScene.MaterialList.Add(this);
        this.MaterialCore = _MaterialCore;
        this.Diffuse = _Diffuse;
        this.Specularity = _Specularity;
        this.SpecularPower = _SpecularPower;
        this.SpecularColor = _SpecularColor;
        this.AmbientIntensity = _AmbientIntensity;
        this.AmbientColor = _AmbientColor;
        this.Transparency = _Transparency;
        this.KeyColorIntensity = _KeyColorIntensity;
        this.KeyColor = _KeyColor;
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
    SetMaterialCore: function (_MaterialCore)
    {
        this.MaterialCore = _MaterialCore;
    }
	,
    BaseObject: function ()
    {
        return cBaseObject.prototype;
    }
    ,
    Destroy: function ()
    {
        this.MaterialCore.Destroy();
        cBaseObject.prototype.Destroy.call(this);        
    }
    ,
    IsRenderable: function ()
    {
        return this.MaterialCore.IsComplete();
    }
    ,
    Render: function (_Camera, _Model, _FaceCenter, _Vertex1, _Vertex2, _Vertex3, _SurfaceNormalVector, _uv_X1, _uv_Y1, _Vertex1NormalVector, _uv_X2, _uv_Y2, _Vertex2NormalVector, _uv_X3, _uv_Y3, _Vertex3NormalVector)
    {

        if (_Model.TextureData == null)
        {
            _Model.TextureData = this.CameraController.GetDataFromImage(this.MaterialCore.Texture);
        }

        this.MaterialCore.Render(_Camera, this, _Model, _FaceCenter, _Vertex1, _Vertex2, _Vertex3, _SurfaceNormalVector, _uv_X1, _uv_Y1, _Vertex1NormalVector, _uv_X2, _uv_Y2, _Vertex2NormalVector, _uv_X3, _uv_Y3, _Vertex3NormalVector);
        if (!this.TrasparentApplied && this.MaterialCore.CameraController != null && this.MaterialCore.IsComplete())
        {
            this.DoTransparency(_Model);
            this.TrasparentApplied = true;
        }
        return true;
    }
    ,
    DoTransparency : function(_Model)
    {
        var __Count = this.MaterialCore.TextureData.width * this.MaterialCore.TextureData.height;
        for (var i = 0; i < __Count; i++)
        {
            _Model.TextureData.data[(i * 4) + 3] = Math.round(this.Clamp(this.Transparency * 255, 0, 255));
            if (this.KeyColorIntensity != 1)
            {
                if (this.MaterialCore.TextureData.data[(i * 4)] == Math.round(this.KeyColor.Red * 255) && this.MaterialCore.TextureData.data[(i * 4) + 1] == Math.round(this.KeyColor.Green * 255) && this.MaterialCore.TextureData.data[(i * 4) + 2] == Math.round(this.KeyColor.Blue * 255))
                {
                    _Model.TextureData.data[(i * 4) + 3] = this.KeyColorIntensity;
                }
            }
        }
    }
    ,
    Clamp: function (_X, _Min, _Max)
    {
        if (_X < _Min) return _Min;
        if (_X > _Max) return _Max - 1;
        return _X;
    }    

}, {});



