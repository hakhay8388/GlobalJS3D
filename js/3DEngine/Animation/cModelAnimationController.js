
var cModelAnimationController = Class(cBaseAnimationController, {
	ObjectType: ObjectTypes.cModelAnimationController
	, OwnModel : null
	,
	constructor: function (_OwnModel)
	{
		cModelAnimationController.BaseObject.constructor.call(this);
		this.OwnModel = _OwnModel;
	}
	,
	BaseObject: function ()
	{
		return cBaseAnimationController.prototype;
	}
	,
	Destroy: function ()
	{
		delete this.OwnModel;
		cBaseAnimationController.prototype.Destroy.call(this);
	}
	,
	CreateAnimation : function(_AnimationID, _LoopFrame)
	{
	    var __Animation = new cModelAnimation(this.OwnModel, this, _AnimationID ,_LoopFrame);
	    this.AnimationList.Add(__Animation);
	    return __Animation;
    }
    ,
    CreateAnimation_Second: function (_AnimationID, _IsSmooth, _CollectorEffect) 
    {
        var __Animation = new cModelAnimation_Second(this.OwnModel, this, _AnimationID, _IsSmooth, _CollectorEffect);
        this.AnimationList.Add(__Animation);
        return __Animation;
    }
    ,
    CreateAnimation_Minute: function (_AnimationID, _IsSmooth) {
        var __Animation = new cModelAnimation_Minute(this.OwnModel, this, _AnimationID, _IsSmooth);
        this.AnimationList.Add(__Animation);
        return __Animation;
    }
    ,
    CreateAnimation_Hour: function (_AnimationID, _IsSmooth) {
        var __Animation = new cModelAnimation_Hour(this.OwnModel, this, _AnimationID, _IsSmooth);
        this.AnimationList.Add(__Animation);
        return __Animation;
    }
    
    
	
}, {});






