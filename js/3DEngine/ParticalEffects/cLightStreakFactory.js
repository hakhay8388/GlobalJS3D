
var cLightStreakFactory = Class(cBaseParticalFactory, {
	ObjectType: ObjectTypes.cLightStreakFactory
	, OwnerScene : null
	, ParticalLeftoverCount : 0
    , DestroyParticalOneByOne : true		
    , StreakLength : 3    
	,
	constructor: function (_OwnerScene, _LighterPartical, _StreakLength)
	{
		cModelParticalFactory.BaseObject.constructor.call(this, _OwnerScene, _LighterPartical);
        this.OwnerScene = _OwnerScene;
        this.StreakLength =_StreakLength;
	}
	,
	BaseObject: function ()
	{
		return cBaseParticalFactory.prototype;
	}
	,
	Destroy: function ()
	{
		cBaseParticalFactory.prototype.Destroy.call(this);
	}
	,
	CreatePartical : function(_OwnerEmiter, _Count)
	{
	    this.ParticalLeftoverCount += _Count - Math.floor(_Count);
	    _Count = Math.floor(_Count);
	    var __LeftoverCount = Math.floor(this.ParticalLeftoverCount);
	    this.ParticalLeftoverCount -= __LeftoverCount;
	    _Count += __LeftoverCount;
	    
	    for (var i = 0; i< _Count; i++)
	    {
	        if (_OwnerEmiter.MaxParticalCount <= _OwnerEmiter.ParticalList.Count() && _OwnerEmiter.MaxParticalCount != 0)
	        {
	            break;
	        }
	           var __Model = this.OwnerScene.CreateLine(0, 0, 0, 0, 0, 0, Colors.White, 1, this.LighterPartical);
	           __Model.Translate(_OwnerEmiter.TranslateX.Value(), _OwnerEmiter.TranslateY.Value(), _OwnerEmiter.TranslateZ.Value());
	        var __Count2 = _OwnerEmiter.EffectList.Count();
	        for (var j = 0; j < __Count2; j++)
	        {
	            var __Item = _OwnerEmiter.EffectList.GetItem(j);
	            __Model.EffectController.AddEffect(__Item);
	        }
	        
            var __Partical = new cLigthStreak(_OwnerEmiter, __Model, this.StreakLength);
        }
	}
}, {});






