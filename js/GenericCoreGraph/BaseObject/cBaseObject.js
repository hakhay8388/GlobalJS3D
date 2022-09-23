


cBaseObject = Class(Object, {

    CreateID: 0
    , ObjectType: ObjectTypes.Get("cBaseObject") //ObjectTypes.cBaseObject
    ,    
    constructor: function()
    {
        this.CreateID = WebGraph.GetNewCreateID();
        WebGraph.Add(this);
    },
    GetObjectType: function()
    {
        return this.ObjectType;
    }
    ,
    GetTypeID: function()
    {
        return this.ObjectType.ObjectTypeID;
    },
    GetCreateID: function()
    {
        return this.CreateID;
    },
    ToString: function()
    {
        return this.ObjectType.ObjectName;
    }
    ,
    BaseObject: function()
    {
        return Object;
    }
    ,
    Destroy: function()
    {
        WebGraph.Remove(this);
        delete this.CreateID;
        delete this.ObjectType;
    }
}, {});




