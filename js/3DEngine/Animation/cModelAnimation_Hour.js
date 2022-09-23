
var cModelAnimation_Hour = Class(cBaseAnimation, {
    ObjectType: ObjectTypes.cModelAnimation_Hour
	
	,
	constructor: function (_OwnerModel, _OwnerAnimationController, _AnimationID, _LoopFrame)
	{
        cModelAnimation_Hour.BaseObject.constructor.call(this, _OwnerModel, _OwnerAnimationController, _AnimationID, _LoopFrame);

	}
	,
	BaseObject: function ()
	{
		return cBaseAnimation.prototype;
	}
	,
	Destroy: function ()
	{

	 
		cBaseAnimation.prototype.Destroy.call(this);        
	}
	,
	StepForward : function(_FrameRate)
	{
	    if (this.Enabled)
	    {
            this.MakeRotateKey();
	    }
    }
    ,
    GetDate : function () {
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
	StepBack : function(_FrameRate)
	{
		if (this.Enabled)
	    {
            this.MakeRotateKey();
	    }
	}
	,
	MakeRotateKey : function()
	{
		var __X = this.OwnerModel.RotateX.Value();
 	    var __Y = this.OwnerModel.RotateY.Value();
	    var __Z = this.OwnerModel.RotateZ.Value();

        var __Date = this.GetDate();
        var __Hour = __Date.getHours();
        var __Minute = __Date.getMinutes();

        var __RotateY = cMath.DegToRad((((__Hour + (__Minute / 60)) % 12) / 12) * (-360));
	    
	    if (__RotateY != __Y)
	    {
            this.OwnerModel.Rotate(__X, __RotateY, __Z);
	    }
	}
	

}, {});




