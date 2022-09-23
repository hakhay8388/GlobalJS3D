
var cBaseAnimationController = Class(cBaseObject, {
	ObjectType: ObjectTypes.cBaseAnimationController
	, AnimationList : null
	, ActiveAnimation : null
	, FrameRateTimer : null
	, FrameRate : 0
	, FrameRateCounter : 0		
	,
	constructor: function ()
	{
		cBaseAnimationController.BaseObject.constructor.call(this);
		this.AnimationList = new cList(ObjectTypes.cBaseAnimation);	
	    this.FrameRateTimer = new Date(0);	
	}
	,
	BaseObject: function ()
	{
		return cBaseObject.prototype;
	}
	,
	Destroy: function ()
	{
		this.AnimationList.DestroyWithItems();
		cBaseObject.prototype.Destroy.call(this);
	}
	,
	DeleteAnimationByID : function(_ID)
	{
	    var __Count = this.AnimationList.Count();
	    for(var i = 0; i< __Count; i++)
	    {
	        var __Item = this.AnimationList.GetItem(i);
	        if (__Item.AnimationID == _ID)
	        {
	            this.AnimationList.RemoveAt(i);
	            return;
	        }	        
	    }
	}

	,
	CalculateFrameRate: function ()
    {
        this.FrameRate = DefaultSceneSettings.GameFPS;
        /*var __Now = new Date();
        var __Result = (__Now, - this.FrameRateTimer);
        //console.log(__Result);
        if (__Result > 999)
		{
			this.FrameRateTimer = __Now;
			this.FrameRate = this.FrameRateCounter
			this.FrameRateCounter = 0;
		}
		else
		{
			this.FrameRateCounter++;
		}*/
	}		
	,
	StartAnimationByID : function(_ID)
	{
	    var __Count = this.AnimationList.Count();
	    for(var i = 0; i< __Count; i++)
	    {
	        var __Item = this.AnimationList.GetItem(i);
	        if (__Item.AnimationID == _ID)
	        {
	            __Item.Start();
	            this.ActiveAnimation = __Item
	        }	        
	        else
	        {
	            __Item.Stop();
	        }
	    }
	}
	,
	StopAnimation : function()
	{
		var __Count = this.AnimationList.Count();
	    for(var i = 0; i< __Count; i++)
	    {
	        var __Item = this.AnimationList.GetItem(i);
            __Item.Stop();
	    }
        this.ActiveAnimation = null;
    }
	,
	AnimationStepForward : function()
	{
	    this.CalculateFrameRate();
	    if (this.ActiveAnimation != null)
	    {
            this.ActiveAnimation.StepForward(this.FrameRate, this.FrameRateTimer);
	    }
	}
    ,
	AnimationStepBack : function()
	{
	    if (this.ActiveAnimation != null)
	    {
            this.ActiveAnimation.StepBack(this.FrameRate);
	    }
	}
	,
	CreateAnimation : function(_AnimationID, _LoopFrame)
	{
	    DebugAlert.Show("cBaseAnimationController İçindeki CreateAnimation Fonksiyonu Override Edilmed..!");
	}
	
	
}, {});






