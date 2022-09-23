

var FunctionCaller = function(Timer_Object)
{
    var __Timer = Timer_Object;

    return function()
    {
        if (__Timer.Started)
        {
            __Timer.TimerEvent.Run(__Timer);
        }
    }
}



cTimer = Class(cBaseObject,
{
    ObjectType: ObjectTypes.cTimer,
    TimerEvent: null,
    JavascriptTimerID: null,
    Interval: 1000,
    Started: false,

    constructor: function()
    {
        cTimer.BaseObject.constructor.call(this);
        this.TimerEvent = new cDelegate(ObjectTypes.cTimer, true);
    }
    ,
    Destroy: function()
    {
        this.TimerEvent.Destroy();
        delete this.TimerEvent;
        delete this.Started;
        delete this.Interval;
        delete this.JavascriptTimer;
        cBaseObject.prototype.Destroy.call(this);        
    }
    ,
    AddFunctionToEvent: function(_Function)
    {
        this.TimerEvent.Add(this, _Function);
    }
    ,
    RemoveFunctionToEvent: function(_Function)
    {
        this.TimerEvent.Remove(_Function);
    }
    ,
    Start: function()
    {
        this.JavascriptTimerID = setInterval(new FunctionCaller(this), this.Interval);
        this.Started = true;
    }
    ,
    SetInterval: function(Number_Value)
    {
        if (ValueController.ControlIntegerValue(Number_Value))
        {
            this.Interval = Number_Value;
            if (this.Started)
            {
                clearInterval(this.JavascriptTimer);
                this.JavascriptTimerID = setInterval(new FunctionCaller(this), this.Interval);
            }
        }
        else
        {
            DebugAlert.Show("Timer Interval Değeri Olarak Tamsayı Değeri Göndermelisiniz..!");
        }
    }
    ,
    GetInterval: function()
    {
        return this.Interval;
    }
    ,
    Stop: function()
    {
        this.Started = false;
        clearInterval(this.JavascriptTimerID);
    }
        ,
    BaseObject: function()
    {
        return cBaseObject.prototype;
    }  
}, {});