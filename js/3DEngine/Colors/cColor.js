

cColor = Class(cBaseObject,
{
    ObjectType: ObjectTypes.cColor
    , Red : 0.0
    , Green : 0.0
    , Blue : 0.0
    , Transparent : 1
    ,
   	constructor: function (_Red, _Green, _Blue, _Transparent)
	{
	    cColor.BaseObject.constructor.call(this);
	    if(!_Red) _Red = 0.0;
        if(!_Green) _Green = 0.0;
        if(!_Blue) _Blue = 0.0;
        if(!_Transparent) _Transparent = 1.0;
        
        this.Red = _Red;
        this.Green = _Green;
        this.Blue = _Blue;
        this.Transparent = _Transparent;
	}
	,
	CreateNewCopy : function()
	{
	    return new cColor(this.Red, this.Green, this.Blue, this.Transparent);
	}
    ,
	BaseObject: function ()
	{
		return cBaseObject.prototype;
	}
    ,
	Destroy: function ()
	{
		delete this.Red;
		delete this.Green;
		delete this.Blue;
		cBaseObject.prototype.Destroy.call(this);		
	}
	,
    Add : function(_Color)
    {
        
        this.Red = this.Red + _Color.Red;
        this.Green = this.Green + _Color.Green;
        this.Blue = this.Blue + _Color.Blue; 
        this.Limit();
        return this;
    }
    ,    
    AddScalar: function(_Scalar)
    {
        this.Red = this.Red + _Scalar;
        this.Green = this.Green + _Scalar;
        this.Blue = this.Blue + _Scalar; 
        
        this.Limit();
        
        return this;
    },
    
    Subtract: function(_Color)
    {
        this.Red = this.Red - _Color.Red;
        this.Green = this.Green - _Color.Green;
        this.Blue = this.Blue - _Color.Blue; 
        
        this.Limit();
        
        return this;
    },
    
    Multiply : function(_Color) 
    {
        
        this.Red = this.Red * _Color.Red;
        this.Green = this.Green * _Color.Green;
        this.Blue = this.Blue * _Color.Blue; 
        
        this.Limit();
        
        return this;
    },
    
    MultiplyScalar : function(_Scalar)
    {
        this.Red = this.Red * _Scalar;
        this.Green = this.Green * _Scalar;
        this.Blue = this.Blue * _Scalar; 
        
        this.Limit();
        
        return this;
    },
    
    DivideFactor : function(_Scalar) {
        
        this.Red = this.Red / _Scalar;
        this.Green = this.Green / _Scalar;
        this.Blue = this.Blue / _Scalar; 
        
        this.Limit();
        
        return this;
    },
    
    Limit: function(){
        this.Red = (this.Red > 0.0) ? ( (this.Red > 1.0) ? 1.0 : this.Red ) : 0.0;
        this.Green = (this.Green > 0.0) ? ( (this.Green > 1.0) ? 1.0 : this.Green ) : 0.0;
        this.Blue = (this.Blue > 0.0) ? ( (this.Blue > 1.0) ? 1.0 : this.Blue ) : 0.0;
    },
    
    Distance : function(_Color) {
        var __Result = Math.abs(this.Red - _Color.Red) + Math.abs(this.Green - _Color.Green) + Math.abs(this.Blue - _Color.Blue);
        return __Result;
    },

    Blend: function(_Color, _Ratio){
        var __Result = new cColor(0,0,0);
        this.MultiplyScalar(1 - _Ratio);
        this.Add(_Color.MultiplyScalar(_Ratio));
        this.Limit();
        return this;
    },
    
    toString : function () {
        var __Red = Math.floor(this.Red*255);
        var __Green = Math.floor(this.Green*255);
        var __Blue = Math.floor(this.Blue*255);
        
        return "rgba("+ __Red +","+ __Green +","+ __Blue + "," +  this.Transparent+  ")";
    }
}, {});