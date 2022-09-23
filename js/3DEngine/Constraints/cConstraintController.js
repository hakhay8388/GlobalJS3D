
var cConstraintController = Class(cBaseObject, {
	ObjectType: ObjectTypes.cConstraintController
	, OwnObject : null
	, ConstraintList : null
	,
	constructor: function (_OwnObject)
	{
		cConstraintController.BaseObject.constructor.call(this);
		this.ConstraintList = new cList(ObjectTypes.cConstraint);	
		this.OwnObject = _OwnObject;
	}
	,
	BaseObject: function ()
	{
		return cBaseObject.prototype;
	}
	,
	Destroy: function ()
	{
		this.ConstraintList.DestroyWithItems();
		delete this.OwnObject;
		delete this.ConstraintList
		cBaseObject.prototype.Destroy.call(this);
	}
	,
	CreateConstraint : function(_SourceObject, _SourceVariable, _TargetVariable, _UseFunction, _Function)
	{
	    var __Constraint = new cConstraint(this, _SourceObject, _SourceVariable, _TargetVariable, _UseFunction, _Function);
	}
	
	
}, {});






