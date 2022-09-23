
var cRotateFixedPanelModel = Class(cBaseModel, {
	ObjectType: ObjectTypes.cRotateFixedPanelModel
	, FixedRotateX : 0
    , FixedRotateY : 0
	, FixedRotateZ : 0		
	, RotateToCamera : false
	,
	constructor: function (_OwnerScene, _X, _Y, _Z, _FixedRotateX, _FixedRotateY, _FixedRotateZ, _ScaleX, _ScaleY, _ScaleZ, _Material, _RotateToCamera, _LighterModel)
	{
		cRotateFixedPanelModel.BaseObject.constructor.call(this, _OwnerScene, _X, _Y, _Z, _FixedRotateX, _FixedRotateY, _FixedRotateZ, _ScaleX, _ScaleY, _ScaleZ, new cPlainLowResMesh(), _Material, 0, true, false, false, _LighterModel);
        this.FixedRotateX = _FixedRotateX;
        this.FixedRotateY = _FixedRotateY;
        this.FixedRotateZ = _FixedRotateZ;
		this.RotateToCamera = _RotateToCamera;
	}
	,
	BaseObject: function ()
	{
		return cBaseModel.prototype;
	}
	,
	Destroy: function ()
	{
		cBaseModel.prototype.Destroy.call(this);
	}
	,
	Initalize: function (_Camera)
    {
        var __Translated = false
        if (!this.NoUseEffectWhenChildObject || this.MyDadModel == null)
        {
            if (this.EffectController.EffectCount() > 0)
            {
                this.EffectController.CalculateEffects(_Camera);
            }
        	if (this.VelocityVector.X != 0 || this.VelocityVector.Y != 0 || this.VelocityVector.Z != 0 || this.RotateVelocityVector.X != 0 || this.RotateVelocityVector.Y != 0 || this.RotateVelocityVector.Z != 0)
        	{
        	    if (_Camera.FrameRate != 0)
        	    {
        	        var __IncX = (DefaultSceneSettings.GameFPS / _Camera.FrameRate) * this.VelocityVector.X;
        	        var __IncY = (DefaultSceneSettings.GameFPS / _Camera.FrameRate) * this.VelocityVector.Y;
        	        var __IncZ = (DefaultSceneSettings.GameFPS / _Camera.FrameRate) * this.VelocityVector.Z;
            	    
        	        this.Translate(this.TranslateX.Value() + __IncX, this.TranslateY.Value() + __IncY, this.TranslateZ.Value() + __IncZ);
            	    __Translated = true;
    	        }
            }    	        

        }
        
        if (!__Translated)
        {
            if (this.PrivateTranslateX != this.TranslateX.Value() || this.PrivateTranslateY != this.TranslateY.Value() || this.PrivateTranslateZ != this.TranslateZ.Value())
            {
                this.Translate(this.TranslateX.Value(), this.TranslateY.Value(), this.TranslateZ.Value());
            }
        }
        
        var __Rotate = cMath.GetRotate(_Camera.CoordinateX.Value(), _Camera.CoordinateY.Value(), _Camera.CoordinateZ.Value(), this.TranslateX.Value(), this.TranslateY.Value(), this.TranslateZ.Value());
                    	   
        var __CamRotate = _Camera.GetRotate();
        var __RootRotate = this.GetRootRotate();
        
        if (this.RotateToCamera)
        {
            this.Rotate((__Rotate.RotateX * -1) + (Math.PI / 2) + this.FixedRotateX, __Rotate.RotateY + this.FixedRotateY, __Rotate.RotateZ + this.FixedRotateZ);
        }
        else
        {
            this.Rotate(((__CamRotate.RotateX - (__RootRotate.RotateX - this.RotateX.Value())) * -1) + (Math.PI / 2) + this.FixedRotateX, (__CamRotate.RotateY - (__RootRotate.RotateY - this.RotateY.Value())) + this.FixedRotateY, (__Rotate.RotateZ - (__RootRotate.RotateZ - this.RotateZ.Value())) + this.FixedRotateZ);
        }

        
        this.RotateForRender(_Camera, this.RotateX.Value(), this.RotateY.Value(), this.RotateZ.Value());
        _Camera.TransformVertexes(this.Mesh, this);
        
        var __WorldMat = new cMatrix4x4();
        __WorldMat.CopyFrom(this.OwnerScene.WorldMat);
        
        this.Visited = true;
        var __ChildModelCount = this.ChildModel.Count();
        for (var i = 0; i < __ChildModelCount; i++)
        {
        	var __Item = this.ChildModel.GetItem(i);
			__Item.Initalize(_Camera);
			this.OwnerScene.WorldMat.CopyFrom(__WorldMat);
        }

        this.OwnerScene.WorldMat.Ident();
        _Camera.CalcAllTransforms();

        if (this.CalculateVertexNormalAndFaceNormal)
        {
            this.CalculateFacesNormal();
            this.CalculateVertexNormal();
            this.CalculateVertexNormalAndFaceNormal = false;
        }

        this.RenderSuccess = true;
        if (this.Material.GetTypeID() == ObjectTypes.cNoLightableVideo.ObjectTypeID)
        {
            this.Material.Initalize();
        }        
    }
}, {});




