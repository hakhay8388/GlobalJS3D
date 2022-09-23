

var cAnimation = Class(cBaseAnimation, {
	ObjectType: ObjectTypes.cAnimation
	, KeyVariableNameList : null
	,
	constructor: function (_OwnerModel, _OwnerAnimationController, _AnimationID, _LoopFrame)
	{
		cAnimation.BaseObject.constructor.call(this, _OwnerModel, _OwnerAnimationController, _AnimationID, _LoopFrame);
		this.KeyVariableNameList = new cListForBase();
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
	AddKey : function(_Frame, _VariableName, _Value)
	{
	    if (this.OwnerModel[_VariableName] != undefined)
	    {
	        if (!JSTypeOperator.IsFunction(this.OwnerModel[_VariableName]))
	        {
	            if (this[_VariableName + "List"] == undefined)
	            {
	                this[_VariableName + "List"] = new cList(ObjectTypes.cKey);
	                this[_VariableName + "CurrentKey"] = 0;
	                this.KeyVariableNameList.Add(_VariableName);	                
	            }
    	        
	            this.AddKeyTo(_Frame, _Value, this[_VariableName + "List"]);
	        }
	    }
	}	
	,
	StepForward : function(_FrameRate)
	{
	    if (this.Enabled)
	    {
            this.CurrentFrame+=  Math.round(DefaultSceneSettings.GameFPS / _FrameRate);
            if (this.CurrentFrame > this.LoopFrame)
            {
                this.CurrentFrame = 0;
                var __Count = this.KeyVariableNameList.Count();
                for (var i = 0; i < __Count;i++)
                {
                    var __Item = this.KeyVariableNameList.GetItem(i);
                    this[__Item + "CurrentKey"] = 0;    
                }
            }    
            var __Count = this.KeyVariableNameList.Count();
            for (var i = 0; i < __Count;i++)
            {
                var __Item = this.KeyVariableNameList.GetItem(i);
                this.MakeKey(__Item);
            }            
	    }
	}
	,
	MakeKey : function(_VariableName)
	{
	   var __Value = this.OwnerModel[_VariableName].Value();
	   
	    var __CalculatedValue = this.CalculateKey(this.OwnerModel[_VariableName].Value(), _VariableName);
	    
	    if (__CalculatedValue != __Value)
	    {
	        this.OwnerModel[_VariableName].Value(__CalculatedValue);
	    }
	}	
	,
	CalculateKey: function(_CurrentValue, _VariableName, _List)
	{
        var __FirstKey = 0;
        var __SecondKey = 0;
        var __Result = _CurrentValue;
        var __CurrentKey = this[_VariableName + "CurrentKey"];
        var __List = this[_VariableName + "List"];
        
        if (__List.Count() > (__CurrentKey + 1))
        {     
            __FirstKey = __List.GetItem(__CurrentKey);
            __SecondKey = __List.GetItem(__CurrentKey + 1);
            if (__FirstKey.Frame <= this.CurrentFrame && this.CurrentFrame <= __SecondKey.Frame)       
            {
                var __Result  = this.CalcValue(__FirstKey.Frame, __SecondKey.Frame, __FirstKey.Value, __SecondKey.Value);                
            }

            if (this.CurrentFrame >= __SecondKey.Frame)
            {
                 this[_VariableName + "CurrentKey"]++;

            }
        }
        return __Result;
	}	
	
}, {});




