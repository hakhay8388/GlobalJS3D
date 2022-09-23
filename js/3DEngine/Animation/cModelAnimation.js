

var cModelAnimation = Class(cBaseAnimation, {
	ObjectType: ObjectTypes.cModelAnimation
	
	, TranslateXKeyList : null
	, TranslateYKeyList : null
	, TranslateZKeyList : null

	, TranslateXCurrentKey : 0
    , TranslateXCurrentKeyID : 11	
    
    , TranslateYCurrentKey : 0	
    , TranslateYCurrentKeyID : 12	
        
    , TranslateZCurrentKey : 0	    
    , TranslateZCurrentKeyID : 13	    

	, RotateXKeyList : null
	, RotateYKeyList : null
	, RotateZKeyList : null

	, RotateXCurrentKey : 0
	, RotateXCurrentKeyID : 21	    
	
    , RotateYCurrentKey : 0	
    , RotateYCurrentKeyID : 22	    
    
    , RotateZCurrentKey : 0	    
    , RotateZCurrentKeyID : 23	        
    
    , ScaleXKeyList : null
	, ScaleYKeyList : null
	, ScaleZKeyList : null

	, ScaleXCurrentKey : 0
	, ScaleXCurrentKeyID : 31	    
	
    , ScaleYCurrentKey : 0	
    , ScaleYCurrentKeyID : 32	    
    
    , ScaleZCurrentKey : 0	    
    , ScaleZCurrentKeyID : 33	  
	,
	constructor: function (_OwnerModel, _OwnerAnimationController, _AnimationID, _LoopFrame)
	{
		cModelAnimation.BaseObject.constructor.call(this, _OwnerModel, _OwnerAnimationController, _AnimationID, _LoopFrame);

		this.TranslateXKeyList = new cList(ObjectTypes.cKey);
		this.TranslateYKeyList = new cList(ObjectTypes.cKey);
		this.TranslateZKeyList = new cList(ObjectTypes.cKey);
		
		this.RotateXKeyList = new cList(ObjectTypes.cKey);
		this.RotateYKeyList = new cList(ObjectTypes.cKey);
		this.RotateZKeyList = new cList(ObjectTypes.cKey);

		this.ScaleXKeyList = new cList(ObjectTypes.cKey);
		this.ScaleYKeyList = new cList(ObjectTypes.cKey);
		this.ScaleZKeyList = new cList(ObjectTypes.cKey);
	}
	,
	BaseObject: function ()
	{
		return cBaseAnimation.prototype;
	}
	,
	Destroy: function ()
	{

	    delete this.TranslateXCurrentKey;
        delete this.TranslateXCurrentKeyID;    
        
        delete this.TranslateYCurrentKey;
        delete this.TranslateYCurrentKeyID;
            
        delete this.TranslateZCurrentKey;
        delete this.TranslateZCurrentKeyID;

        this.TranslateXKeyList.DestroyWithItems();
	    this.TranslateYKeyList.DestroyWithItems();
	    this.TranslateZKeyList.DestroyWithItems();

	    this.RotateXKeyList.DestroyWithItems();
	    this.RotateYKeyList.DestroyWithItems();
	    this.RotateZKeyList.DestroyWithItems();

	    delete this.RotateXCurrentKey;
	    delete this.RotateXCurrentKeyID;
    	
        delete this.RotateYCurrentKey;    
        delete this.RotateYCurrentKeyID;
        
        delete this.RotateZCurrentKey;
        delete this.RotateZCurrentKeyID;
        
        this.ScaleXKeyList.DestroyWithItems();
	    this.ScaleYKeyList.DestroyWithItems();
	    this.ScaleZKeyList.DestroyWithItems();

	    delete this.ScaleXCurrentKey;
	    delete this.ScaleXCurrentKeyID;
    	
        delete this.ScaleYCurrentKey;
        delete this.ScaleYCurrentKeyID;
        
        delete this.ScaleZCurrentKey;
        delete this.ScaleZCurrentKeyID;
		
		cBaseAnimation.prototype.Destroy.call(this);        
	}
	,
	AddTranslateKey : function(_Frame, _TranslateX, _TranslateY, _TranslateZ)
	{
	    this.AddKeyTo(_Frame, _TranslateX, this.TranslateXKeyList);
	    this.AddKeyTo(_Frame, _TranslateY, this.TranslateYKeyList);
	    this.AddKeyTo(_Frame, _TranslateZ, this.TranslateZKeyList);	    	    
	}	
	,
	AddTranslateXKey : function(_Frame, _TranslateX)
	{
	    this.AddKeyTo(_Frame, _TranslateX, this.TranslateXKeyList);
	}
	,
	AddTranslateYKey : function(_Frame, _TranslateY)
	{
	    this.AddKeyTo(_Frame, _TranslateY, this.TranslateYKeyList);
	}
    ,
	AddTranslateZKey : function(_Frame, _TranslateZ)
	{
	    this.AddKeyTo(_Frame, _TranslateZ, this.TranslateZKeyList);
	}
    ,
    AddRotateKey : function(_Frame, _RotateX, _RotateY, _RotateZ)
	{
	    this.AddKeyTo(_Frame, _RotateX, this.RotateXKeyList);
	    this.AddKeyTo(_Frame, _RotateY, this.RotateYKeyList);
	    this.AddKeyTo(_Frame, _RotateZ, this.RotateZKeyList);	    	    
	}	
	,
	AddRotateXKey : function(_Frame, _RotateX)
	{
	    this.AddKeyTo(_Frame, _RotateX, this.RotateXKeyList);
	}
	,
	AddRotateYKey : function(_Frame, _RotateY)
	{
	    this.AddKeyTo(_Frame, _RotateY, this.RotateYKeyList);
	}
    ,
	AddRotateZKey : function(_Frame, _RotateZ)
	{
	    this.AddKeyTo(_Frame, _RotateZ, this.RotateZKeyList);
	}
	,
	AddScaleKey : function(_Frame, _ScaleX, _ScaleY, _ScaleZ)
	{
	    this.AddKeyTo(_Frame, _ScaleX, this.ScaleXKeyList);
	    this.AddKeyTo(_Frame, _ScaleY, this.ScaleYKeyList);
	    this.AddKeyTo(_Frame, _ScaleZ, this.ScaleZKeyList);	    	    
	}	
	,
	AddScaleXKey : function(_Frame, _ScaleX)
	{
	    this.AddKeyTo(_Frame, _ScaleX, this.ScaleXKeyList);
	}
	,
	AddScaleYKey : function(_Frame, _ScaleY)
	{
	    this.AddKeyTo(_Frame, _ScaleY, this.ScaleYKeyList);
	}
    ,
	AddScaleZKey : function(_Frame, _ScaleZ)
	{
	    this.AddKeyTo(_Frame, _ScaleZ, this.ScaleZKeyList);
	}
	,
	StepForward : function(_FrameRate)
	{
	    if (this.Enabled)
	    {
            this.CurrentFrame+=  Math.round(DefaultSceneSettings.GameFPS / _FrameRate);
            if (this.CurrentFrame > this.LoopFrame)
            {
                this.CurrentFrame = 0;
                this.TranslateXCurrentKey = 0;
                this.TranslateYCurrentKey = 0;                
                this.TranslateZCurrentKey = 0;   
                
                this.RotateXCurrentKey = 0;
                this.RotateYCurrentKey = 0;	
                this.RotateZCurrentKey = 0;	                                
                
                this.ScaleXCurrentKey = 0;
                this.ScaleYCurrentKey = 0;	
                this.ScaleZCurrentKey = 0;	 
                
            }    
            this.MakeTranslateKey();
            this.MakeRotateKey();
            this.MakeScaleKey();
	    }
	}
	,
	StepBack : function(_FrameRate)
	{
		if (this.Enabled)
	    {
            this.CurrentFrame-= Math.round(DefaultSceneSettings.GameFPS / _FrameRate);
            if (this.CurrentFrame > this.LoopFrame)
            {
                this.CurrentFrame = 0;
                this.TranslateXCurrentKey = 0;
                this.TranslateYCurrentKey = 0;                
                this.TranslateZCurrentKey = 0;   
                
                this.RotateXCurrentKey = 0;
                this.RotateYCurrentKey = 0;	
                this.RotateZCurrentKey = 0;	                                
                
                this.ScaleXCurrentKey = 0;
                this.ScaleYCurrentKey = 0;	
                this.ScaleZCurrentKey = 0;	 
                
            }    
            this.MakeTranslateKey();
            this.MakeRotateKey();
            this.MakeScaleKey();
	    }
	}
	,
	MakeTranslateKey : function()
	{
	   var __X = this.OwnerModel.TranslateX.Value();
	   var __Y = this.OwnerModel.TranslateY.Value();
	   var __Z = this.OwnerModel.TranslateZ.Value();
	   
	    var __TranslateX = this.MakeKey(this.OwnerModel.TranslateX.Value(), this.TranslateXCurrentKey, this.TranslateXKeyList, this.TranslateXCurrentKeyID);
	    var __TranslateY = this.MakeKey(this.OwnerModel.TranslateY.Value(), this.TranslateYCurrentKey, this.TranslateYKeyList, this.TranslateYCurrentKeyID);
	    var __TranslateZ = this.MakeKey(this.OwnerModel.TranslateZ.Value(), this.TranslateZCurrentKey, this.TranslateZKeyList, this.TranslateZCurrentKeyID);
	    
	    if (__TranslateX != __X || __TranslateY != __Y || __TranslateZ != __Z)
	    {
	        this.OwnerModel.Translate(__TranslateX, __TranslateY, __TranslateZ);
	    }
	}
	,
	MakeRotateKey : function()
	{
		var __X = this.OwnerModel.RotateX.Value();
 	    var __Y = this.OwnerModel.RotateY.Value();
	    var __Z = this.OwnerModel.RotateZ.Value();

	    var __RotateX = this.MakeKey(this.OwnerModel.RotateX.Value(), this.RotateXCurrentKey, this.RotateXKeyList, this.RotateXCurrentKeyID);
	    var __RotateY = this.MakeKey(this.OwnerModel.RotateY.Value(), this.RotateYCurrentKey, this.RotateYKeyList, this.RotateYCurrentKeyID);
	    var __RotateZ = this.MakeKey(this.OwnerModel.RotateZ.Value(), this.RotateZCurrentKey, this.RotateZKeyList, this.RotateZCurrentKeyID);
	    
	    if (__RotateX != __X || __RotateY != __Y || __RotateZ != __Z)
	    {
	        this.OwnerModel.Rotate(__RotateX, __RotateY, __RotateZ);
	    }
	}
	,
	MakeScaleKey : function()
	{
		var __X = this.OwnerModel.ScaleX.Value();
 	    var __Y = this.OwnerModel.ScaleY.Value();
	    var __Z = this.OwnerModel.ScaleZ.Value();

	    var __ScaleX = this.MakeKey(this.OwnerModel.ScaleX.Value(), this.ScaleXCurrentKey, this.ScaleXKeyList, this.ScaleXCurrentKeyID);
	    var __ScaleY = this.MakeKey(this.OwnerModel.ScaleY.Value(), this.ScaleYCurrentKey, this.ScaleYKeyList, this.ScaleYCurrentKeyID);
	    var __ScaleZ = this.MakeKey(this.OwnerModel.ScaleZ.Value(), this.ScaleZCurrentKey, this.ScaleZKeyList, this.ScaleZCurrentKeyID);
	    
	    if (__ScaleX != __X || __ScaleY != __Y || __ScaleZ != __Z)
	    {
	        this.OwnerModel.Scale(__ScaleX, __ScaleY, __ScaleZ);
	    }
	}	
	,
	MakeKey: function(_CurrentValue, _CurrentKey, _List, _CurrentKeyID)
	{
        var __FirstKey = 0;
        var __SecondKey = 0;
        var __Result = _CurrentValue;
        if (_List.Count() > (_CurrentKey + 1))
        {     
            __FirstKey = _List.GetItem(_CurrentKey);
            __SecondKey = _List.GetItem(_CurrentKey + 1);
            if (__FirstKey.Frame <= this.CurrentFrame && this.CurrentFrame <= __SecondKey.Frame)       
            {
                var __Result  = this.CalcValue(__FirstKey.Frame, __SecondKey.Frame, __FirstKey.Value, __SecondKey.Value);                
            }

            if (this.CurrentFrame >= __SecondKey.Frame)
            {
                 if (_CurrentKeyID == this.TranslateXCurrentKeyID) this.TranslateXCurrentKey++;
                 if (_CurrentKeyID == this.TranslateYCurrentKeyID) this.TranslateYCurrentKey++;
                 if (_CurrentKeyID == this.TranslateZCurrentKeyID) this.TranslateZCurrentKey++;

                 if (_CurrentKeyID == this.RotateXCurrentKeyID) this.RotateXCurrentKey++;
                 if (_CurrentKeyID == this.RotateYCurrentKeyID) this.RotateYCurrentKey++;
                 if (_CurrentKeyID == this.RotateZCurrentKeyID) this.RotateZCurrentKey++;                 
                 
                 if (_CurrentKeyID == this.ScaleXCurrentKeyID) this.ScaleXCurrentKey++;
                 if (_CurrentKeyID == this.ScaleYCurrentKeyID) this.ScaleYCurrentKey++;
                 if (_CurrentKeyID == this.ScaleZCurrentKeyID) this.ScaleZCurrentKey++;
            }
        }
        return __Result;
	}

}, {});




