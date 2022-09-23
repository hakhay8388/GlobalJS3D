
var cAirEffect = Class(cBaseEffect, {
	ObjectType: ObjectTypes.cAirEffect
	,
	constructor: function (_X, _Y, _Z, _AirDirection, _AirMagnetude, _Attenuation, _EfectiveDistance, _Enabled)
	{
		cGravityEffect.BaseObject.constructor.call(this,_X, _Y, _Z, _AirDirection, _AirMagnetude, _Attenuation, _EfectiveDistance, _Enabled);
	}
	,
	BaseObject: function ()
	{
		return cBaseEffect.prototype;
	}
	,
	Destroy: function ()
	{
	    delete this.GravityVector;
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


        var __X = this.X.Value();
        var __Y = this.Y.Value();
        var __Z = this.Z.Value();
        
	    for ( var i = 0; i < __Count ; i++)
	    {	    
            var __Distance = _Model.DistanceTo(__X, __Y, __Z);
            /*if (__Distance < 1)
            {
                __Distance = 1;
            }*/
            
            var __Inc = ((1 - (__Distance / this.EfectiveDistance)) * this.Magnetude);
            if (__Inc < 0)
            {
                __Inc = 0;
            }
            
	        //var __Vector = this.DirectionVector.ScalarMulCreateNew((this.Magnetude - (Math.random() * this.Attenuation)) * (this.EfectiveDistance / __Distance));
	        var __Vector = this.DirectionVector.ScalarMulCreateNew( (this.Magnetude - (Math.random() * this.Attenuation)) + __Inc);
	        var __IncX = (cMath.Sqr(1 / DefaultSceneSettings.GameFPS) * __Vector.X) * 0.5;
	        var __IncY = (cMath.Sqr(1 / DefaultSceneSettings.GameFPS) * __Vector.Y) * 0.5;
	        var __IncZ = (cMath.Sqr(1 / DefaultSceneSettings.GameFPS) * __Vector.Z) * 0.5;
    	    
	        _Model.VelocityVector.Add(new cVector3d(__IncX, __IncY, __IncZ));
	        
	        __X -= __IncX;
	        __Y -= __IncY;
	        __Z -= __IncZ;	        
        }	        
	}
	
}, {});






