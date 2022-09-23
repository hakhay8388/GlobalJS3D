
var cGravityEffect = Class(cBaseEffect, {
	ObjectType: ObjectTypes.cGravityEffect
	,
	constructor: function (_GravityDirection, _GravitiyMagnetude, _Enabled)
	{
		cGravityEffect.BaseObject.constructor.call(this, 0, 0, 0, _GravityDirection, _GravitiyMagnetude, 0, 0, _Enabled);
	}
	,
	BaseObject: function ()
	{
		return cBaseEffect.prototype;
	}
	,
	Destroy: function ()
	{
		cBaseEffect.prototype.Destroy.call(this);
	}
	,
	Calculate: function(_Camera, _Model)
	{
	    var __FPS = _Camera.FrameRate;
	    
	    if (_Camera.FrameRate == 0)
	    {
	        return;
	    }
	    
	    var __Count = (DefaultSceneSettings.GameFPS / _Camera.FrameRate);
	    
	    this.FPSLeftoverCount += __Count - Math.floor(__Count);
	    __Count = Math.floor(__Count);
	    var __LeftoverCount = Math.floor(this.FPSLeftoverCount);
	    this.FPSLeftoverCount -= __LeftoverCount;
	    __Count += __LeftoverCount;
	    
	    
	    for ( var i = 0; i < __Count ; i++)
	    {
	        var __Vector = this.DirectionVector.ScalarMulCreateNew(this.Magnetude);
	        var __IncX = (cMath.Sqr(1 / DefaultSceneSettings.GameFPS) * __Vector.X) * 0.5;
	        var __IncY = (cMath.Sqr(1 / DefaultSceneSettings.GameFPS) * __Vector.Y) * 0.5;
	        var __IncZ = (cMath.Sqr(1 / DefaultSceneSettings.GameFPS) * __Vector.Z) * 0.5;
    	    _Model.VelocityVector.Add(new cVector3d(__IncX, __IncY, __IncZ));
    	}
	}
	
}, {});






