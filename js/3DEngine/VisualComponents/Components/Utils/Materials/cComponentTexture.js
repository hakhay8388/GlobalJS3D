
cComponentTexture = Class(cBaseObject,
{
	ObjectType: ObjectTypes.cComponentTexture
	, OwnerScene: null
	, Texture: null
	, TransparentedTexture: null
	, TextureData: null
	, CameraController: null
	, Transparency: false
    , KeyColorIntensity: 1
    , KeyColor: null
	,
	constructor: function (_OwnerScene, _TexturePath, _Color, _TextureWidth, _TextureHeight, _UseTransparency, _Transparency, _KeyColorIntensity, _KeyColor)
	{
		cComponentTexture.BaseObject.constructor.call(this);
		this.OwnerScene = _OwnerScene;
		this.FindCameraController();
		this.Transparency = (_Transparency / 100);
		this.UseTransparency = _UseTransparency;
		this.KeyColorIntensity = (_KeyColorIntensity  / 100) * 255;
		this.KeyColor = _KeyColor;

		if (_TexturePath != "" && _TexturePath)
		{
			this.Texture = new Image();
			this.Texture.src = _TexturePath;
		}
		else
		{
			var __SolidColor = new cSolidColor(_OwnerScene, _Color, _TextureWidth, _TextureHeight);
			this.Texture = __SolidColor.Texture;
		}
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
			DebugAlert.Show("cComponentTexture, CameraController Bulamadı..!");
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
	HasTexture: function ()
	{
		return this.Texture != null;
	}
	,
	IsComplete: function ()
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
	CreateDataFromImage: function ()
	{
		if (this.CameraController != null && this.IsComplete())
		{
			this.TextureData = this.CameraController.GetDataFromImage(this.Texture);
			return true;
		}
		return false;
	}
	,
	DoTransparency: function ()
	{
		var __Count = this.TextureData.width * this.TextureData.height;
		for (var i = 0; i < __Count; i++)
		{
			this.TextureData.data[(i * 4) + 3] = Math.round(this.Clamp(this.Transparency * 255, 0, 255));
			if (this.KeyColorIntensity != 1)
			{
				if (this.TextureData.data[(i * 4)] == Math.round(this.KeyColor.Red * 255) && this.TextureData.data[(i * 4) + 1] == Math.round(this.KeyColor.Green * 255) && this.TextureData.data[(i * 4) + 2] == Math.round(this.KeyColor.Blue * 255))
				{
					this.TextureData.data[(i * 4) + 3] = Math.round(this.Clamp(this.KeyColorIntensity, 0, 255));
				}
			}
		}
	}
	,
	UpdateTransparency: function (_UseTransparency, _Transparency, _KeyColorIntensity, _KeyColor)
	{
		var __LastTransparency = this.Transparency;
		var __LastUseTransparency = this.UseTransparency;
		var __LastKeyColorIntensity = this.KeyColorIntensity;
		var __LastKeyColor = this.KeyColor;

		this.Transparency = (_Transparency / 100);
		this.UseTransparency = _UseTransparency;
		this.KeyColorIntensity = (_KeyColorIntensity / 100) * 255; ;
		this.KeyColor = _KeyColor;

		if (this.Transparency != __LastTransparency || this.UseTransparency != __LastUseTransparency || this.KeyColorIntensity != __LastKeyColorIntensity || (this.KeyColor.Red != _KeyColor.Red || this.KeyColor.Green != _KeyColor.Green || this.KeyColor.Blue != _KeyColor.Blue))
		{
			delete this.TransparentedTexture;
			delete this.TextureData;
		}
	}
	,
	Draw: function (_Camera, _Left, _Top, Width, _Height)
	{
		if (this.UseTransparency)
		{
			if (this.TransparentedTexture == null)
			{
				if (this.CreateDataFromImage())
				{
					this.DoTransparency();
					this.TransparentedTexture = this.CameraController.GetImageFromImageData(this.TextureData);
				}
			}
			if (_Camera && this.TransparentedTexture)
			{
				_Camera.Canvas2dContent.drawImage(this.TransparentedTexture, _Left, _Top, Width, _Height);
			}
		}
		else
		{
			if (_Camera)
			{
				_Camera.Canvas2dContent.drawImage(this.Texture, _Left, _Top, Width, _Height);
			}
		}
	}
	,
	DrawCrop: function (_Camera, _X1, _Y1)
	{
		if (this.UseTransparency)
		{
			if (this.TransparentedTexture == null)
			{
				if (this.CreateDataFromImage())
				{
					this.DoTransparency();
					this.TransparentedTexture = this.CameraController.GetImageFromImageData(this.TextureData);
				}
			}
			if (_Camera && this.TransparentedTexture)
			{
				_Camera.Canvas2dContent.drawImage(this.TransparentedTexture, _X1, _Y1);
			}
		}
		else
		{
			if (_Camera)
			{
				_Camera.Canvas2dContent.drawImage(this.Texture, _X1, _Y1);
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