
var cRotateFixedModelParticalFactory = Class(cBaseParticalFactory, {
	ObjectType: ObjectTypes.cRotateFixedModelParticalFactory
	, OwnerScene : null
	, ScaleX : null
	, ScaleY : null
	, ScaleZ : null
	, RotateX : null
	, RotateY : null
	, RotateZ : null
	, ModelMesh : null
	, ModelMaterial : null
	, SurfaceNormal : null
	, ParticalLeftoverCount : 0
	, RotateToCamera : false
	,
	constructor: function (_OwnerScene, _RotateX, _RotateY, _RotateZ, _ScaleX, _ScaleY, _ScaleZ, _ModelMaterial, _RotateToCamera, _LighterPartical)
	{
		cRotateFixedModelParticalFactory.BaseObject.constructor.call(this, _OwnerScene, _LighterPartical);
        this.OwnerScene = _OwnerScene;
        this.RotateX = _RotateX;
        this.RotateY = _RotateY;
        this.RotateZ = _RotateZ;
        this.ScaleX  = _ScaleX;
        this.ScaleY  = _ScaleY;
        this.ScaleZ  = _ScaleZ;
        this.RotateToCamera = _RotateToCamera;
        this.ModelMaterial = _ModelMaterial;        
	}
	,
	BaseObject: function ()
	{
		return cBaseParticalFactory.prototype;
	}
	,
	Destroy: function ()
	{
		cBaseParticalFactory.prototype.Destroy.call(this);
	}
	,
	CreatePartical : function(_OwnerEmiter, _Count)
	{
	    this.ParticalLeftoverCount += _Count - Math.floor(_Count);
	    _Count = Math.floor(_Count);
	    var __LeftoverCount = Math.floor(this.ParticalLeftoverCount);
	    this.ParticalLeftoverCount -= __LeftoverCount;
	    _Count += __LeftoverCount;
	    
	    for (var i = 0; i< _Count; i++)
	    {
	        if (_OwnerEmiter.MaxParticalCount <= _OwnerEmiter.ParticalList.Count() && _OwnerEmiter.MaxParticalCount != 0)
	        {
	            break;
	        }	    
	        var __Model = this.OwnerScene.CreateRotateFixedPanelModel(_OwnerEmiter.TranslateX.Value(), _OwnerEmiter.TranslateY.Value(), _OwnerEmiter.TranslateZ.Value(), this.RotateX, this.RotateY, this.RotateZ, this.ScaleX, this.ScaleY, this.ScaleY, this.ModelMaterial, this.RotateToCamera, this.LighterPartical)
	        __Model.LighterModel = true;
	        var __Count2 = _OwnerEmiter.EffectList.Count();
	        for (var j = 0; j < __Count2; j++)
	        {
	            var __Item = _OwnerEmiter.EffectList.GetItem(j);
	            __Model.EffectController.AddEffect(__Item);
	        }
	        
            var __Partical = new cPartical(_OwnerEmiter, __Model);
        }
	}
}, {});






