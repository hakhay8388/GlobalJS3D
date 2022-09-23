
var cEffectController = Class(cBaseObject, {
	ObjectType: ObjectTypes.cEffectController
	, EffectList : null
	, OwnModel : null
	, Enabled : true
	,
	constructor: function (_OwnModel, _Enabled)
	{
		cEffectController.BaseObject.constructor.call(this);
		this.EffectList = new cList(ObjectTypes.cBaseEffect);
		this.OwnModel = _OwnModel;
		this.Enabled = _Enabled | true;
	}
	,
	BaseObject: function ()
	{
		return cBaseObject.prototype;
	}
	,
	Destroy: function ()
	{
		this.EffectList.Destroy();
		delete this.EffectList;
	    delete this.OwnModel;
	    delete this.Enabled;
	    
		cBaseObject.prototype.Destroy.call(this);
	}
	,
	AddEffect : function(_Effect)
	{
	    this.EffectList.Add(_Effect);	    
	}
	,
	RemoveEffect : function(_Effect)
	{
	    this.EffectList.Remove(_Effect);	    
	}	
	,
	CalculateEffects : function(_Camera)
	{
	    if (this.Enabled)
	    {
	        var __Count = this.EffectList.Count();
	        for(var i = 0; i< __Count; i++)
	        {
	            var __Item = this.EffectList.GetItem(i);
	            if (__Item.Enabled)
	            {
	                __Item.Calculate(_Camera, this.OwnModel);
	            }	        
	        }
	    }
	}
	,
	EffectCount : function()
	{
	    return this.EffectList.Count();
	}
	,
	EffectsDisabled : function()
	{
	    this.Enabled = false;
	}
    ,
	EffectsEnabled : function()
	{  
        this.Enabled = true;
	}
	
}, {});






