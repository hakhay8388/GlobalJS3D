

var cBaseAnimation = Class(cBaseObject, 
{
	ObjectType: ObjectTypes.cBaseAnimation
	, OwnerModel : null
	, OwnerAnimationController : null
	, AnimationID : 0
	, CurrentFrame : 0
	, LoopFrame : 0
	, Enabled : false
	,
	constructor: function (_OwnerModel, _OwnerAnimationController, _AnimationID, _LoopFrame)
	{
		cBaseAnimation.BaseObject.constructor.call(this);
		this.OwnerModel = _OwnerModel;
		this.OwnerAnimationController = _OwnerAnimationController;
		this.AnimationID = _AnimationID;
		this.LoopFrame = _LoopFrame;		
	}
	,
	BaseObject: function ()
	{
		return cBaseObject.prototype;
    }
    ,
    GetCurrentFrame: function (_Date) {

        //Get 1 day in milliseconds
        var one_day = 1000 * 60 * 60 * 24;

        var __TotalDifferenceMilliSecond = (new Date()) - _Date;
        return Math.round(__TotalDifferenceMilliSecond / (1000 / DefaultSceneSettings.GameFPS));
    }
	,
	Destroy: function ()
	{
		delete this.AnimationID;
		delete this.LoopFrame;		
        delete this.Enabled;
        delete this.CurrentFrame;
        delete this.OwnerModel;
        delete this.OwnerAnimationController;		
		cBaseObject.prototype.Destroy.call(this);        
	}
    ,
	AddKeyTo : function(_Frame, _Value, _List)
	{
	    var __Key = new cKey(_Frame, _Value);
        var __Added = false;
	    for (var i = 0; i < _List.Count() - 1;i++)
	    {
	        if (_List.GetItem(i).Frame < _Frame && _List.GetItem(i + 1).Frame >= _Frame)
	        {
	            _List.Insert(i + 1, __Key);
	            __Added = true;
	            break;
	        }
	    }
	    if (!__Added)
	    {
	        _List.Add(__Key);	    
	    }   
	}
	,
	StepForward : function(_FrameRate)
	{
	    DebugAlert.Show("cBaseAnimation İçindeki StepForward Fonksiyonu Override Edilmedi..!");
	}
	,
	StepBack : function(_FrameRate)
	{
	    DebugAlert.Show("cBaseAnimation İçindeki StepBack Fonksiyonu Override Edilmedi..!");
	}
	,
	CalcValue : function(_StartFrame, _EndFrame, _StartValue, _EndValue)
	{
	    var __Current = (this.CurrentFrame - _StartFrame) / (_EndFrame - _StartFrame);
        var __Result = (((_EndValue - _StartValue) * __Current) + _StartValue);
        return __Result;
	}   
	,
	Start : function()
	{
	    this.CurrentFrame = 0;
	    this.Enabled = true;
	}
	,
	Stop : function()
	{
	    this.Enabled = false;
	}
	

}, {});




