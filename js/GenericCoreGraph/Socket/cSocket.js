/// <reference path="ObjectTypes\ObjectTypes.js" />

cSocket = Class(cBaseObject,
{
	ObjectType: ObjectTypes.cSocket
	, Host:""
	, Port: ""
	, SocketID: 0
	, SocketFlash: null
	, Initialized: false
	, ReciverList : null
	, SendQueue: null
	, ReciveQueue: null
	,
    constructor: function(_Host, _Port, _SocketID, _ContentDivId)
    {
    	cSocket.BaseObject.constructor.call(this);
		this.Host = _Host;
		this.Port = _Port;
		this.SocketID = "Socket_" + _SocketID;
		this.BuildSocket(_Host, _Port, _ContentDivId);
		this.ReciverList = new cListForBase();
		cSocketManager.SocketList.Add(this);
		this.SendQueue = new cListForBase();
		this.ReciveQueue = new cListForBase();
    }
	,
	GetFlashMovie: function (_MovieName)
	{
		var isIE = navigator.appName.indexOf("Microsoft") != -1;
		return (isIE) ? window[_MovieName] : document[_MovieName];
	}
	,
	BuildSocket: function(_Host, _Port, _ContentDivId)
	{
		var swfVersionStr = "10.0.0";
		var xiSwfUrlStr = "playerProductInstall.swf";
		var flashvars = {};
		var params = {};
		params.quality = "high";
		params.bgcolor = "#ffffff";
		params.allowscriptaccess = "sameDomain";
		params.allowfullscreen = "true";
		var attributes = {};
		attributes.id = this.SocketID;
		attributes.name = this.SocketID;
		attributes.align = "middle";
		var __Div = document.getElementById("flashContent");
		swfobject.embedSWF("SocketBridge.swf", _ContentDivId, "100%", "100%", swfVersionStr, xiSwfUrlStr, flashvars, params, attributes);
		swfobject.createCSS("#" + _ContentDivId, "display:block;text-align:left;");   
		this.SocketFlash = this.GetFlashMovie(this.SocketID);
	}
	,
	InitializeAndConnect: function()
	{
		this.ForceInitializeAndConnect(100);
		this.StartSenderUpdater(1);
		this.StartReciverUpdater(1);
	}
	,
	ForceInitializeAndConnect: function(_Interval)
    {
		if (this.Initialized)
		{
			return;
		}
		
		try
		{
			this.SocketFlash.Initialize(this.Host, this.Port, this.SocketID, cSocketManager.ClassName());
			this.Initialized = true;
			this.Connect();
		}
		catch(_Ex)
		{
  			var _this = this;
			setTimeout(function () 
			{ 
				_this.ForceInitializeAndConnect (_Interval); 
			}, 
			_Interval);
		}
	}
	,
	ReciverConnect : function(_Reciver)
	{
		if (_Reciver.ReciveOnConnectEvent != undefined && _Reciver.ReciveOnDisconnectEvent != undefined && _Reciver.ReciveOnDataEvent != undefined && _Reciver.ReciveOnProgressEvent != undefined && _Reciver.ReciveOnIoErrorEvent != undefined && _Reciver.ReciveOnSecurityEvent != undefined)
	    {
            if (JSTypeOperator.IsFunction(_Reciver.ReciveOnConnectEvent) && JSTypeOperator.IsFunction(_Reciver.ReciveOnDisconnectEvent) && JSTypeOperator.IsFunction(_Reciver.ReciveOnDataEvent) && JSTypeOperator.IsFunction(_Reciver.ReciveOnProgressEvent) && JSTypeOperator.IsFunction(_Reciver.ReciveOnIoErrorEvent) && JSTypeOperator.IsFunction(_Reciver.ReciveOnSecurityEvent) )
            {
               if (_Reciver.ReciveOnConnectEvent.length == 1 && _Reciver.ReciveOnDisconnectEvent.length == 1 && _Reciver.ReciveOnDataEvent.length == 1 && _Reciver.ReciveOnProgressEvent.length == 1 && _Reciver.ReciveOnIoErrorEvent.length == 1 && _Reciver.ReciveOnSecurityEvent.length == 1)
               {
                    this.ReciverList.Add(_Reciver);   
               }
	           else
	           {
	               DebugAlert.Show("cSocket Objesine Bağlanmak İsteniyor Fakat Metod(lar) daki Parametre Sayısı Farklı..!");
	           }               
            }
	        else
	        {
	            DebugAlert.Show("cSocket Objesine Bağlanmak İsteniyor Fakat Fonksiyon Olmayan Implamentlere rastlandi..!");
	        }
	    }
	    else
	    {
	        DebugAlert.Show("cSocket Objesine Bağlanmak İsteniyor Fakat Metod(lar) Bulunamadı..!");
	    }
	}
	,
	ReciverDisconnect : function(_Reciver)
	{
		this.ReciverList.Remove(_Reciver);   
	}
	,
	Connect: function ()
	{
		if (this.Initialized)
		{
			if (this.SocketFlash != null && this.SocketFlash != undefined)
			{
				this.SocketFlash.Connect();
				return true;
			}
		}
		return false;
	}
	,
	IsConnected: function()
	{
		if (this.Initialized)
		{
			if (this.SocketFlash != null && this.SocketFlash != undefined)
			{
				return this.SocketFlash.IsConnected();
			}
		}
		return false;
	}
	,
	Disconnect: function ()
	{
		if (this.Initialized)
		{
			if (this.SocketFlash != null && this.SocketFlash != undefined)
			{
				this.SocketFlash.Disconnect();
				return true;
			}
		}
		return false;
	}
	,
	Send: function (_Value)
	{
		if (this.Initialized)
		{
			if (this.SocketFlash != null && this.SocketFlash != undefined)
			{
				this.SendQueue.Add(_Value);
				return true;
			}
		}
		return false;
	}
	,
	StartSenderUpdater: function (_Interval)
	{
		while (this.SendQueue.Count() > 0)
		{
			try
			{
				var __Item = this.SendQueue.GetItem(0);
				this.SocketFlash.Send(__Item);
				this.SendQueue.RemoveAt(0);
			}
			catch(_Ex)
			{
				DebugAlert.Show("Disconnected To Server..!");
				this.SendQueue.Clear();
				return;
			}
		}
		var _this = this;
		setTimeout(function () { _this.StartSenderUpdater(_Interval); }, _Interval);
	}
	,
	StartReciverUpdater: function (_Interval)
	{
		while (this.ReciveQueue.Count() > 0)
		{
			var __Data = this.ReciveQueue.GetItem(0);
			var __Count = this.ReciverList.Count();
			for (var i = __Count - 1; i >  - 1; i--)
			{
				var __Item = this.ReciverList.GetItem(i);
				__Item.ReciveOnDataEvent(__Data);
			}	
			delete __Data;
			this.ReciveQueue.RemoveAt(0);
		}
		var _this = this;
		setTimeout(function () { _this.StartReciverUpdater(_Interval); }, _Interval);
	}
    ,
    BaseObject: function()
    {
        return cBaseObject.prototype;
    }
    ,
    Destroy: function()
    {
		delete this.Host;
		delete this.Port;
		delete this.SocketID;
	    this.ReciverList.Destroy();
	    delete this.ReciverList;
		delete this.SocketFlash;
		delete this.Initialized;
		cSocketManager.SocketList.Remove(this);
        cBaseObject.prototype.Destroy.call(this);        
    }
	,
	OnConnectEvent: function (_Event)
	{
	    var __Count = this.ReciverList.Count();
	    for (var i = __Count - 1; i >  - 1; i--)
	    {
	        var __Item = this.ReciverList.GetItem(i);
	        __Item.ReciveOnConnectEvent(_Event);
	    }
	}
	,
	OnDisconnectEvent: function(_Event)
	{
	    var __Count = this.ReciverList.Count();
	    for (var i = __Count - 1; i >  - 1; i--)
	    {
	        var __Item = this.ReciverList.GetItem(i);
	        __Item.ReciveOnDisconnectEvent(_Event);
	    }
	}
	,
	OnDataEvent: function(_Event)
	{
	    this.ReciveQueue.Add(_Event);
	}
	,
	OnProgressEvent: function(_Event)
	{
	    var __Count = this.ReciverList.Count();
	    for (var i = __Count - 1; i >  - 1; i--)
	    {
	        var __Item = this.ReciverList.GetItem(i);
	        __Item.ReciveOnProgressEvent(_Event);
	    }
	}
	,
	OnIoErrorEvent: function(_Event)
	{
	    var __Count = this.ReciverList.Count();
	    for (var i = __Count - 1; i >  - 1; i--)
	    {
	        var __Item = this.ReciverList.GetItem(i);
	        __Item.ReciveOnIoErrorEvent(_Event);
	    }
	}
	,
	OnSecurityEvent: function(_Event)
	{
	    var __Count = this.ReciverList.Count();
	    for (var i = __Count - 1; i >  - 1; i--)
	    {
	        var __Item = this.ReciverList.GetItem(i);
	        __Item.ReciveOnSecurityEvent(_Event);
	    }
	}
},{});



