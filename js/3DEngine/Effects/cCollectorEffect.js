
var cCollectorEffect = Class(cBaseEffect, {
	ObjectType: ObjectTypes.Get("cCollectorEffect")
	, UseX : true
	, UseY : true
	, UseZ : true
	, TractionDistance : 50
	, TractionMagnetude : 10
	,
	constructor: function (_UseX, _UseY, _UseZ, _X, _Y, _Z, _Magnetude, _TractionDistance, _TractionMagnetude, _Enabled)
	{
		cGravityEffect.BaseObject.constructor.call(this, _X, _Y, _Z, null, _Magnetude, 0, 0, _Enabled);
		this.UseX = _UseX;
		this.UseY = _UseY;
		this.UseZ = _UseZ;
		this.TractionDistance = _TractionDistance;
		this.TractionMagnetude  = _TractionMagnetude;
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
            if (_Model.DistanceTo(this.X.Value() , this.Y.Value(), this.Z.Value()) < this.TractionDistance)
   	        {
   	           var __X =  ((this.X.Value() - _Model.TranslateX.Value()) / 1000) * this.TractionMagnetude;
   	           var __Y =  ((this.Y.Value() - _Model.TranslateY.Value()) / 1000) * this.TractionMagnetude;
               var __Z =  ((this.Z.Value() - _Model.TranslateZ.Value()) / 1000) * this.TractionMagnetude;   	           
               
                if (this.UseX)
                {
                   _Model.VelocityVector.X += __X;
                   _Model.VelocityVector.X *= 0.7;
                }
                
                if (this.UseY) 
                {
                    _Model.VelocityVector.Y += __Y;
                    _Model.VelocityVector.Y *= 0.7;
                }
                
                if (this.UseZ) 
                {
                    _Model.VelocityVector.Z += __Z;
                    _Model.VelocityVector.Z *= 0.7;
                }

   	        }
            else
            {	    
   	            if (this.X.Value() - _Model.TranslateX.Value() > 0)
   	            {
   	                var __X = (0.0001 * this.Magnetude);
   	            }
   	            else
   	            {
   	                var __X = -(0.0001 * this.Magnetude);
   	            }
   	            
                if (this.Y.Value() - _Model.TranslateY.Value() > 0)
   	            {
   	                var __Y = (0.0001 * this.Magnetude);
   	            }
   	            else
   	            {
   	                var __Y = -(0.0001 * this.Magnetude);
   	            }

   	            if (this.Z.Value() - _Model.TranslateZ.Value() > 0)
   	            {
   	                var __Z = (0.0001 * this.Magnetude);
   	            }
   	            else
   	            {
   	                var __Z = -(0.0001 * this.Magnetude);
   	            }
    	        if (this.UseX) _Model.VelocityVector.X += __X;
                if (this.UseY) _Model.VelocityVector.Y += __Y;
                if (this.UseZ) _Model.VelocityVector.Z += __Z;
   	        }
            	    
            

    	}
	}
	
}, {});






