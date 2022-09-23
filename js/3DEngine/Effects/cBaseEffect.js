
var cBaseEffect = Class(cBaseObject, {
	ObjectType: ObjectTypes.Get("cBaseEffect")
	, Enabled : true
	, X : null
	, Y : null	
	, Z : null	
	, DirectionVector : null
	, Magnetude : 0
	, Attenuation : 0
	, EfectiveDistance : 0
	, FPSLeftoverCount : 0	
	,
	constructor: function (_X, _Y, _Z, _DirectionVector, _Magnetude, _Attenuation, _EfectiveDistance, _Enabled)
	{
		cBaseEffect.BaseObject.constructor.call(this);
		this.X = new Double(_X);
		this.Y = new Double(_Y);
		this.Z = new Double(_Z);
		if (_DirectionVector)
		{
		    this.DirectionVector = _DirectionVector.Normalize();
        }
        else
        {
            this.DirectionVector = new cVector3d(0, 0, 0);
        }		    
		this.Magnetude = _Magnetude;
		this.Attenuation = _Attenuation;
		this.EfectiveDistance = _EfectiveDistance;		

		this.Enabled = JSTypeOperator.IsDefined(_Enabled) ? _Enabled : true;
	}
	,
	BaseObject: function ()
	{
		return cBaseObject.prototype;
	}
	,
	Destroy: function ()
	{
	    delete this.Enabled;
		cBaseObject.prototype.Destroy.call(this);
	}
	,
	SetCoordinate : function(_X, _Y, _Z)
	{
        this.X.Value(_X);
		this.Y.Value(_Y);
		this.Z.Value(_Z);
	}
	,
	Calculate: function(_Camera)
	{
	    DebugAlert.Show("cBaseEffect İçindeki Calculate Override Edilmedi..!");
	}
	,
	DisabledEffect : function()
	{
	    this.Enabled = false;
	}
    ,
	EnabledEffect : function()
	{  
        this.Enabled = true;
	}
	
}, {});






