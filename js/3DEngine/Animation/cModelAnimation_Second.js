

var cModelAnimation_Second = Class(cBaseAnimation, {
    ObjectType: ObjectTypes.cModelAnimation_Second
    , IsSmooth: false
    , CollectorEffect: null
    , Length : 0
    ,
    constructor: function (_OwnerModel, _OwnerAnimationController, _AnimationID, _IsSmooth, _CollectorEffect)
	{
        cModelAnimation_Second.BaseObject.constructor.call(this, _OwnerModel, _OwnerAnimationController, _AnimationID, 1);
        this.IsSmooth = _IsSmooth;
        this.CollectorEffect = _CollectorEffect;
        this.Length = this.CollectorEffect.X.Value();
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

        var __Date = DateTimeUtils.GetDate();
        var __Second = __Date.getSeconds();
        var __Millisecond = this.IsSmooth ? __Date.getMilliseconds() : 0;

        var __RotateY = cMath.DegToRad(((__Second + (__Millisecond / 1000)) / 60) * (-360));
	    
	    if (__RotateY != __Y)
	    {
            this.OwnerModel.Rotate(__X, __RotateY, __Z);

            //console.log((Math.cos(__RotateY) * this.Length));
            //console.log();

            this.CollectorEffect.X.Value((Math.sin(__RotateY) * this.Length));
            this.CollectorEffect.Z.Value((Math.cos(__RotateY) * this.Length));
            //this.CollectorEffect.Y.Value(this.CollectorEffect.X.Value() + 0.1);
	    }
	}
	

}, {});




