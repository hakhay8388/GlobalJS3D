
var EventHandlerFunctionForRequestRedraw = function (_Owner, _Timer, _Function)
{
	var Owner = _Owner;
	var Function = _Function;
	var Timer = _Timer;

	return function (event)
	{
		Function(Owner, Timer);
	}
}




SceneIDCreater = function ()
{
}

SceneIDCreater.ID = 0;
SceneIDCreater.GetID = function()
{
	SceneIDCreater.ID++;
	return SceneIDCreater.ID;
}


var cScene = Class(cBaseObject,
{
	ObjectType: ObjectTypes.cScene
	, RenderReciverList: null
    , EntityList: null
    , EmiterList: null
    , ModelParticalFactoryList: null
	, CameraList: null
	, CameraControllerList: null
	, MaterialList: null
	, LightList: null
    , SceneID: 0
    , LastGivedEntityID: 0
	, WorldMat: null
	, ComponentController: null
	,
	constructor: function ()
	{
		cScene.BaseObject.constructor.call(this);
		this.ComponentController = new cComponentController(this);
		this.EntityList = new cList(ObjectTypes.cBaseShape);
		this.EmiterList = new cList(ObjectTypes.cEmiter);
		this.ModelParticalFactoryList = new cList(ObjectTypes.cBaseParticalFactory);
		this.CameraList = new cList(ObjectTypes.cCamera);
		this.CameraControllerList = new cList(ObjectTypes.cCameraController);
		this.MaterialList = new cList(ObjectTypes.cBaseMaterial);
		this.LightList = new cList(ObjectTypes.cBaseLight);
		this.RenderReciverList = new cListForBase();

		this.SceneID = SceneIDCreater.GetID();

		this.WorldMat = new cMatrix4x4();
		this.WorldMat.Ident();
		this.RunAnimations();
	}
	,
	ConnectRender: function (_Reciver)
	{
		if (_Reciver.Draw != undefined)
		{
			if (JSTypeOperator.IsFunction(_Reciver.Draw))
			{
				if (_Reciver.Draw.length == IRenderReciver.Draw.length)
				{
					this.RenderReciverList.Add(_Reciver);
				}
				else
				{
					DebugAlert.Show("cScene Komutuna Bağlanmak İsteniyor Fakat 'IRenderReciver.Draw'  Parametre Sayısı Farklı..!");
				}
			}
			else
			{
				DebugAlert.Show("cScene Komutuna Bağlanmak İsteniyor Fakat 'IRenderReciver.Draw'  Bir Fonksiyon Değil..!");
			}
		}
		else
		{
			DebugAlert.Show("cScene Komutuna Bağlanmak İsteniyor Fakat 'IRenderReciver.Draw' Fonksiyonu Bulunamadı..!");
		}
	}
	,
	DisconnectRender: function (_Reciver)
	{
		this.RenderReciverList.Remove(_Reciver);
	}
	,
	Purge: function ()
	{
		var __Count = this.EntityList.Count();
		for (var i = 0; i < __Count; i++)
		{
			var __Item = this.EntityList.GetItem(i);
			if (__Item.Deleted())
			{
				__Item.Destroy();
			}
		}
	}
	,
	BaseObject: function ()
	{
		return cBaseObject.prototype;
    }
    ,
    GetDate: function() {
        'use strict';

        var date;

        try {
            date = tizen.time.getCurrentDateTime();
        } catch (err) {
            date = new Date();
        }

        return date;
    }
	,
	RunAnimations: function ()
	{
		var __Count = this.EntityList.Count();
		for (var i = __Count - 1; i > -1; i--)
		{
			var __Item = this.EntityList.GetItem(i);
			if (__Item.IsModel())
			{
				__Item.AnimationController.AnimationStepForward();
			}
		}

		__Count = this.EmiterList.Count();
		for (i = __Count - 1; i > -1; i--)
		{
			__Item = this.EmiterList.GetItem(i);
			if (__Item.Enabled)
			{
				__Item.Run();
			}
		}

        var _this = this;
        var __Now = this.GetDate();
        setTimeout(function () { _this.RunAnimations(); }, (1000 / DefaultSceneSettings.GameFPS) - (__Now.getMilliseconds() % (1000 / DefaultSceneSettings.GameFPS)));
	}
    ,
	Destroy: function ()
	{
		this.EntityList.Destroy();
		this.CameraList.Destroy();
		delete this.SceneID;
		delete this.LastGivedEntityID;
		cBaseObject.prototype.Destroy.call(this);
	}
    ,
	GetFreeEntityID: function ()
	{
		this.LastGivedEntityID++;
		return this.LastGivedEntityID;
	}
	,
	CreateTail: function (_X, _Y, _Z, _Color, _LineWidth, _TailLineCount, _TransparentBeforeKill)
	{
		var __Tail = new cTail(this, _X, _Y, _Z, _Color, _LineWidth, _TailLineCount, _TransparentBeforeKill);
		return __Tail;
	}
	,
	CreateEmiter: function (_X, _Y, _Z, _VectorX, _VectorY, _VectorZ, _Angle, _ParticalFactory, _Rate, _UseRandomParticalScale, _MinRandomParticalScale, _MaxRandomParticalScale, _ParticalRotateVelocity, _UseRandomParticalRotateVelocity, _ParticalRotate, _UseRandomParticalRotate, _ParticalVelocity, _UseRandomParticalVelocity, _LifeSpan, _LifeColorList, _LifeSpanStartScale, _LifeSpanFinishScale, _Speed, _RandomSpeedSeed, _ThrowingSpeed, _MinDistance, _MaxDistance, _MaxEmiterDistance, _MaxParticalCount, _Enabled)
	{
		var __Emiter = new cEmiter(this, _X, _Y, _Z, _VectorX, _VectorY, _VectorZ, _Angle, _ParticalFactory, _Rate, _UseRandomParticalScale, _MinRandomParticalScale, _MaxRandomParticalScale, _ParticalRotateVelocity, _UseRandomParticalRotateVelocity, _ParticalRotate, _UseRandomParticalRotate, _ParticalVelocity, _UseRandomParticalVelocity, _LifeSpan, _LifeColorList, _LifeSpanStartScale, _LifeSpanFinishScale, _Speed, _RandomSpeedSeed, _ThrowingSpeed, _MinDistance, _MaxDistance, _MaxEmiterDistance, _MaxParticalCount, _Enabled);
		return __Emiter;
	}
	,
	CreateModelExplosionParticalFactory: function (_Model, _DestroyRealModel, LightPartical, _Solid)
	{
		var __Factory = new cModelExplosionParticalFactory(this, _Model, _DestroyRealModel, LightPartical, _Solid);
		return __Factory;
	}
	,
	CreateRotateFixedParticalModelFactory: function (_RotateX, _RotateY, _RotateZ, _ScaleX, _ScaleY, _ScaleZ, _ModelMaterial, _RotateToCamera, LightPartical)
	{
		var __Factory = new cRotateFixedModelParticalFactory(this, _RotateX, _RotateY, _RotateZ, _ScaleX, _ScaleY, _ScaleZ, _ModelMaterial, _RotateToCamera, LightPartical);
		return __Factory;
	}
    ,
	CreateLightStreakFactory: function (_LightPartical, _StreakLength)
	{
		var __Factory = new cLightStreakFactory(this, _LightPartical, _StreakLength);
		return __Factory;
	}
    ,
	CreateModelParticalFactory: function (_RotateX, _RotateY, _RotateZ, _ScaleX, _ScaleY, _ScaleZ, _ModelMesh, _ModelMaterial, _SurfaceNormal, LightPartical)
	{
		var __Factory = new cModelParticalFactory(this, _RotateX, _RotateY, _RotateZ, _ScaleX, _ScaleY, _ScaleZ, _ModelMesh, _ModelMaterial, _SurfaceNormal, LightPartical);
		return __Factory;
	}
    ,
	CreateSpotLight: function (_X, _Y, _Z, _AimX, _AimY, _AimZ, _LightColor, _Intensity, _LightSpotAngle)
	{
		var __Light = new cSpotLigth(this, _X, _Y, _Z, _AimX, _AimY, _AimZ, _LightColor, _Intensity, _LightSpotAngle);
		return __Light;
	}
    ,
	CreatePointLight: function (_X, _Y, _Z, _LightColor, _Intensity)
	{
		var __Light = new cPointLigth(this, _X, _Y, _Z, _LightColor, _Intensity);
		return __Light;
	}
    ,
	CreateDirectLight: function (_X, _Y, _Z, _AimX, _AimY, _AimZ, _LightColor, _Intensity)
	{
		var __Light = new cDirectLigth(this, _X, _Y, _Z, _AimX, _AimY, _AimZ, _LightColor, _Intensity);
		return __Light;
	}
    ,
	CreateModel: function (_X, _Y, _Z, _RotateX, _RotateY, _RotateZ, _ScaleX, _ScaleY, _ScaleZ, _Mesh, _Material, _SurfaceNormal, _Z_clip, _UseLight, _EnabledRealTimeLightRender, _LighterModel)
	{
		var __Model = new cModel(this, _X, _Y, _Z, _RotateX, _RotateY, _RotateZ, _ScaleX, _ScaleY, _ScaleZ, _Mesh, _Material, _SurfaceNormal, _Z_clip, _UseLight, _EnabledRealTimeLightRender, _LighterModel);
		return __Model;
	}
	,
	CreateRotateFixedPanelModel: function (_X, _Y, _Z, _RotateX, _RotateY, _RotateZ, _ScaleX, _ScaleY, _ScaleZ, _Material, _RotateToCamera, _LighterModel)
	{
		var __Model = new cRotateFixedPanelModel(this, _X, _Y, _Z, _RotateX, _RotateY, _RotateZ, _ScaleX, _ScaleY, _ScaleZ, _Material, _RotateToCamera, _LighterModel);
		return __Model;
	}
	,
	CreateMaterial_Lambert: function (_MaterialCore, _Diffuse, _AmbientIntensity, _AmbientColor, _Specularity, _SpecularPower, _SpecularColor, _Transparency, _KeyColorIntensity, _KeyColor)
	{
		var __Material = new cLambert(this, _MaterialCore, _Diffuse, _AmbientIntensity, _AmbientColor, _Specularity, _SpecularPower, _SpecularColor, _Transparency, _KeyColorIntensity, _KeyColor);
		return __Material;
	}
	,
	CreateMaterial_NoLightableTexture: function (_MaterialCore, _Transparency, _KeyColorIntensity, _KeyColor, _UseTextureDirect)
	{
		var __Material = new cNoLightableTexture(this, _MaterialCore, _Transparency, _KeyColorIntensity, _KeyColor, _UseTextureDirect);
		return __Material;
	}
	,
	CreateMaterial_NoLightableTexture_RadiusTransparency: function (_MaterialCore, _CenterX, _CenterY, _NoTransparentRadius, _TransparentSmoothRadius, _TransparentFinishRadius, _TransparentIntensity)
	{
		var __Material = new cNoLightableTexture_RadiusTransparency(this, _MaterialCore, _CenterX, _CenterY, _NoTransparentRadius, _TransparentSmoothRadius, _TransparentFinishRadius, _TransparentIntensity);
		return __Material;
	}
	,
	CreateMaterial_NoLightableTexture_SpecialTransparency: function (_MaterialCore, _SpecialTransparencyKeyColor)
	{
		var __Material = new cNoLightableTexture_SpecialTransparency(this, _MaterialCore, _SpecialTransparencyKeyColor);
		return __Material;
    }
    
    ,
    CreateMaterial_NoLightableVideo: function (_VideoPath, _Loop)
    {
        var __Material = new cNoLightableVideo(this, _VideoPath, _Loop);
        return __Material;
    }
	,
	CreateMaterialCore_SolidColor: function (_Color, _TextureWidth, _TextureHeight)
	{
		var __MaterialCore = new cSolidColor(this, _Color, _TextureWidth, _TextureHeight);
		return __MaterialCore;
	}
	,
	CreateMaterialCore_Texture: function (_TexturePath)
	{
		var __MaterialCore = new cTexture(this, _TexturePath);
		return __MaterialCore;
	}
	,
	CreateMaterialCore_TextureNormalMaped: function (_TexturePath, _NormalMapTexturePath)
	{
		var __MaterialCore = new cTextureNormalMaped(this, _TexturePath, _NormalMapTexturePath);
		return __MaterialCore;
	}

	,
	CreateLine: function (_X1, _Y1, _Z1, _X2, _Y2, _Z2, _Color, _LineWidth, _LighterModel)
	{
		var __Line = new cLine(this, _X1, _Y1, _Z1, _X2, _Y2, _Z2, _Color, _LineWidth, _LighterModel);
		return __Line;
	}
	,
	CreateText: function (_Text, _X, _Y, _Z, _Color, _FontPunto, _FixedFont, _LighterModel)
	{
		var __Text = new cText(this, _Text, _X, _Y, _Z, _Color, _FontPunto, _FixedFont, _LighterModel);
		return __Text;
	}
	,
	CreateCamera: function (_X, _Y, _Z, _AimX, _AimY, _AimZ, _BackColor, _BackGroundImagePath, _MotionBlur)
	{
		var __Camera = new cCamera(this, _X, _Y, _Z, _AimX, _AimY, _AimZ, _BackColor, _BackGroundImagePath, _MotionBlur);
		this.CameraList.Add(__Camera);
		return __Camera;
	}
	,
	CreateCameraController: function (_OwnerDomID, _TempCanvasDomID, _Width, _Height, _BackColor, _RefreshInterval)
	{
		var __CameraController = new cCameraController(this, _OwnerDomID, _TempCanvasDomID, _Width, _Height, _BackColor, _RefreshInterval);
		this.CameraControllerList.Add(__CameraController);
		return __CameraController;
	}
	,
	CreateProgressBar3D: function (_X, _Y, _Z, _Scale, _Percent)
	{
		var __ProgressBar3D = new cProgressBar3D(this, _X, _Y, _Z, _Scale, _Percent);
		return __ProgressBar3D;
	}
	,
	CreateComponentTexture: function (_TexturePath, _Color, _TextureWidth, _TextureHeight, _UseTransparency, _Transparency, _KeyColorIntensity, _KeyColor)
	{
		var __ComponentTexture = new cComponentTexture(this, _TexturePath, _Color, _TextureWidth, _TextureHeight, _UseTransparency, _Transparency, _KeyColorIntensity, _KeyColor);
		return __ComponentTexture;
	}

}, {});



