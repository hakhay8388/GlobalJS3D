



cBaseValueType = Class(cBaseObject,
{
    m_Value: null,
    ObjectType: ObjectTypes.cBaseValueType,
    EventBeforeValueSet: null,
    EventAfterValueSet: null,
    EventValueGet: null,

    constructor: function(_Value)
    {
        cBaseValueType.BaseObject.constructor.call(this);
        this.m_Value = _Value;                         
    }
    ,
    AddEventBeforeValueSet: function() { },
    RemoveEventBeforeValueSet: function() { },
    AddEventAferValueSet: function() { },
    RemoveEventAferValueSet: function() { },
    AddEventValueGet: function() { },
    RemoveEventValueGet: function() { }

    ,
    BaseObject: function()
    {
        return cBaseObject.prototype;
    }
    ,
    Destroy: function()
    {
        delete this.m_Value;
        this.EventBeforeValueSet.Destroy();
        delete this.EventBeforeValueSet;
        this.EventAfterValueSet.Destroy();
        delete this.EventAfterValueSet;
        this.EventValueGet.Destroy();
        delete this.EventValueGet;
        cBaseObject.prototype.Destroy.call(this);        
    }

}, {});