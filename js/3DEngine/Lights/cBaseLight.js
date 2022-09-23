

var cBaseLight = Class(cBaseObject,
{
	ObjectType: ObjectTypes.cBaseLight

    , X : null
    , Y : null
    , Z : null
    , AimX : null
    , AimY : null
    , AimZ : null
    , OwnerScene : null
    , EfectiveLenght : 50
    , Intensity : 1
    , LightColor: Colors.White    
    ,
	constructor: function (_OwnerScene, _X, _Y, _Z, _AimX, _AimY, _AimZ, _LightColor, _Intensity)
	{
		cBaseLight.BaseObject.constructor.call(this);
		this.X = new Double(_X);
		this.Y = new Double(_Y);
		this.Z = new Double(_Z);
		this.AimX = new Double(_AimX);
		this.AimY = new Double(_AimY);
		this.AimZ = new Double(_AimZ);
        this.LightColor = _LightColor;
	    this.Intensity = _Intensity;
		this.OwnerScene = _OwnerScene;
		this.OwnerScene.LightList.Add(this);
	}
    ,
	GetLightVectorNormalized : function()
	{
	    var __Vector = new cVector3d(this.AimX.Value()  - this.X.Value(), this.AimY.Value()  - this.Y.Value(), this.AimZ.Value()  - this.Z.Value());
	    __Vector.Normalize();
	    return __Vector;
	}	
    ,
	BaseObject: function ()
	{
		return cBaseObject.prototype;
	}
    ,
	Destroy: function ()
	{
		delete LightColor;
        this.X.Destroy();
        this.Y.Destroy();
        this.Z.Destroy();
        this.AimX.Destroy(); 
        this.AimY.Destroy(); 
        this.AimZ.Destroy(); 
        this.AimZ.Destroy(); 	
        delete this.Intensity;	
		cBaseObject.prototype.Destroy.call(this);        
	}
	,
    CalcBlinnPhongLighting: function (_MaterialDiffuse, _MaterialSpecularity, _MaterialSpecularPower, _MaterialSpecularColor, _MaterialAmbientIntensity, _MaterialAmbientColor, _MaterialColor, _ViewDot, _LightDot, _LightIntensity, _LColor)
    {
        var Ia = _MaterialAmbientColor * _MaterialAmbientIntensity;
        var Id = _MaterialDiffuse * _LightDot * _LColor * _LightIntensity;
        var Is = 0;
        if (_LightDot > 0)
        {
            Is = (_MaterialSpecularity * Math.pow(_ViewDot, _MaterialSpecularPower) * _MaterialSpecularColor) *  _LightDot;
        }
        return (Ia + (Id + Is)) * _MaterialColor;
    }


	,
    Clamp: function (_X, _Min, _Max)
    {
        if (_X < _Min) return _Min;
        if (_X > _Max) return _Max - 1;
        return _X;
    }
    ,
    Saturate: function (_Value)
    {
        if (_Value < 0) return 0;
        if (_Value > 1) return 1;
        return _Value;
    }
}, {});




