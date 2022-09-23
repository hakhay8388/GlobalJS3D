

var cObserverable = Class(cBaseObject,
{
    ObjectType: ObjectTypes.cObserverable
    ,
    constructor: function()
    {
        cObserverable.BaseObject.constructor.call(this);
        this.OnDisposed = new cDelegate(ObjectTypes.cFreeObject, false);
        this.OnPrerender = new cDelegate(ObjectTypes.cFreeObject, false);
        this.OnClick = new cDelegate(ObjectTypes.cFreeObject, false);
        this.OnDblClick = new cDelegate(ObjectTypes.cFreeObject, false);
        this.OnKeyDown = new cDelegate(ObjectTypes.cFreeObject, false);
        this.OnKeyPress = new cDelegate(ObjectTypes.cFreeObject, false);
        this.OnKeyUp = new cDelegate(ObjectTypes.cFreeObject, false);
        this.OnMouseDown = new cDelegate(ObjectTypes.cFreeObject, false);
        this.OnMouseMove = new cDelegate(ObjectTypes.cFreeObject, false);
        this.OnMouseOut = new cDelegate(ObjectTypes.cFreeObject, false);
        this.OnMouseOver = new cDelegate(ObjectTypes.cFreeObject, false);
        this.OnMouseUp = new cDelegate(ObjectTypes.cFreeObject, false);
    }
    ,
    BaseObject: function()
    {
        return cBaseObject.prototype;
    }
    ,
    Destroy: function()
    {
        this.OnDisposed.Destroy();
        delete this.OnDisposed;
        this.OnPrerender.Destroy();
        delete this.OnPrerender;
        this.OnClick.Destroy();
        delete this.OnClick;
        this.OnDblClick.Destroy();
        delete this.OnDblClick;
        this.OnKeyDown.Destroy();
        delete this.OnKeyDown;
        this.OnKeyPress.Destroy();
        delete this.OnKeyPress;
        this.OnKeyUp.Destroy();
        delete this.OnKeyUp;
        this.OnMouseDown.Destroy();
        delete this.OnMouseDown;
        this.OnMouseMove.Destroy();
        delete this.OnMouseMove;
        this.OnMouseOut.Destroy();
        delete this.OnMouseOut;
        this.OnMouseOver.Destroy();
        delete this.OnMouseOver;
        this.OnMouseUp.Destroy();
        delete this.OnMouseUp;
        cBaseObject.prototype.Destroy.call(this);        
    }


}, {});