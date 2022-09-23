var cConstraintFunction = function(_Owner, _SourceObject, _SourceVariable, _Model, _UseFunction, _Function) 
{
    var Owner = _Owner;
    var SourceObject = _SourceObject;
    var UseFunction = _UseFunction;
    var Function = _Function;
    var Model = _Model;
    var SourceVariable = _SourceVariable;
    
    return function(_Variable)
    {
        if(UseFunction)
        {
            Function(SourceObject, SourceVariable, Model);
        }
        else
        {
            Owner.TargetVariable.Value(SourceVariable.Value());
        }
    }
}


var cConstraint = Class(cBaseObject, 
{
	ObjectType: ObjectTypes.cConstraint
	, ConstraintController : null
	, SourceObject : null
	, SourceVariable : null
	, TargetVariable : null
	, ConstraintFunction : null
	, UseFunction : false
	, Function : null
	,
	constructor: function (_ConstraintController, _SourceObject, _SourceVariable, _TargetVariable, _UseFunction, _Function)
	{
		cConstraint.BaseObject.constructor.call(this);
		this.ConstraintController = _ConstraintController;
		this.SourceObject = _SourceObject;
		this.SourceVariable = _SourceVariable;
		this.TargetVariable = _TargetVariable;
		this.UseFunction = _UseFunction;
		this.Function = _Function;
		this.Connect(this.SourceObject, this.SourceVariable);
		this.ConstraintController.ConstraintList.Add(this);
	}
	,
	BaseObject: function ()
	{
		return cBaseObject.prototype;
	}
	,
	Destroy: function ()
	{
	    this.Disconnect();
	    delete this.ConstraintController;
	    delete this.SourceVariable;
	    delete this.TargetVariable;
		cBaseObject.prototype.Destroy.call(this);        
	}
    ,
    Connect : function(_SourceObject, _SourceVariable)
    {
        this.ConstraintFunction = new cConstraintFunction(this, _SourceObject, this.SourceVariable, this.ConstraintController.OwnObject, this.UseFunction, this.Function);
        _SourceVariable.AddEventAferValueSet(this.ConstraintController.OwnObject, this.ConstraintFunction);
    }
    ,
    Disconnect : function()
    {
        this.SourceVariable.RemoveEventAferValueSet(this.ConstraintFunction);
    }

}, {});




