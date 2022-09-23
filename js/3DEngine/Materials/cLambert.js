

var cLambert = Class(cBaseMaterial,
{
	ObjectType: ObjectTypes.cLambert
    ,
	constructor: function (_OwnerScene, _MaterialCore, _Diffuse, _AmbientIntensity, _AmbientColor, _Specularity, _SpecularPower, _SpecularColor, _Transparency, _KeyColorIntensity, _KeyColor)
	{
	    cLambert.BaseObject.constructor.call(this, _OwnerScene, _MaterialCore, _Diffuse, _AmbientIntensity, _AmbientColor, _Specularity, _SpecularPower, _SpecularColor, _Transparency, _KeyColorIntensity, _KeyColor);
	}
    ,
	BaseObject: function ()
	{
		return cBaseMaterial.prototype;
	}
    ,
	Destroy: function ()
	{
		cBaseMaterial.prototype.Destroy.call(this);
	}

}, {});




