

cSocketManager = function()
{
}

cSocketManager.SocketID = 0;
cSocketManager.SocketList = new cListForBase();


cSocketManager.OnConnectEvent = function (_SocketID, _Event)
{
	setTimeout(function () { cSocketManager.OnConnectEventTimer(_SocketID, _Event); }, 1);
}

cSocketManager.OnConnectEventTimer = function (_SocketID, _Event)
{
	var __Count = cSocketManager.SocketList.Count();
	for (var i = 0; i < __Count; i++)
	{
		var __Item = cSocketManager.SocketList.GetItem(i);
		if (__Item.SocketID == _SocketID)
		{
			__Item.OnConnectEvent(_Event);
		}
	}
}



cSocketManager.OnDisconnectEvent = function(_SocketID, _Event)
{
	setTimeout(function () { cSocketManager.OnDisconnectEventTimer(_SocketID, _Event); }, 1);
}


cSocketManager.OnDisconnectEventTimer = function (_SocketID, _Event)
{
	var __Count = cSocketManager.SocketList.Count();
	for (var i = 0; i < __Count; i++)
	{
		var __Item = cSocketManager.SocketList.GetItem(i);
		if (__Item.SocketID == _SocketID)
		{
			__Item.OnDisconnectEvent(_Event);
		}
	}
}

cSocketManager.OnDataEvent = function (_SocketID, _Event)
{
	setTimeout(function () { cSocketManager.OnDataEventTimer(_SocketID, _Event); }, 1);
}

cSocketManager.OnDataEventTimer = function(_SocketID, _Event)
{
	var __Count = cSocketManager.SocketList.Count();
	for (var i = 0; i < __Count; i++)
	{
		var __Item = cSocketManager.SocketList.GetItem(i);
		if (__Item.SocketID == _SocketID)
		{
			__Item.OnDataEvent(_Event);
		}
	}
}

cSocketManager.OnProgressEvent = function (_SocketID, _Event)
{
	setTimeout(function () { cSocketManager.OnProgressEventTimer(_SocketID, _Event); }, 1);
}

cSocketManager.OnProgressEventTimer = function (_SocketID, _Event)
{
	var __Count = cSocketManager.SocketList.Count();
	for (var i = 0; i < __Count; i++)
	{
		var __Item = cSocketManager.SocketList.GetItem(i);
		if (__Item.SocketID == _SocketID)
		{
			__Item.OnProgressEvent(_Event);
		}
	}
}

cSocketManager.OnIoErrorEvent = function (_SocketID, _Event)
{
	setTimeout(function () { cSocketManager.OnIoErrorEventTimer(_SocketID, _Event); }, 1);
}

cSocketManager.OnIoErrorEventTimer = function (_SocketID, _Event)
{
	var __Count = cSocketManager.SocketList.Count();
	for (var i = 0; i < __Count; i++)
	{
		var __Item = cSocketManager.SocketList.GetItem(i);
		if (__Item.SocketID == _SocketID)
		{
			__Item.OnIoErrorEvent(_Event);
		}
	}
}

cSocketManager.OnSecurityEvent = function (_SocketID, _Event)
{
	setTimeout(function () { cSocketManager.OnSecurityEventTimer(_SocketID, _Event); }, 1);
}

cSocketManager.OnSecurityEventTimer = function (_SocketID, _Event)
{
	var __Count = cSocketManager.SocketList.Count();
	for (var i = 0; i < __Count; i++)
	{
		var __Item = cSocketManager.SocketList.GetItem(i);
		if (__Item.SocketID == _SocketID)
		{
			__Item.OnSecurityEvent(_Event);
		}
	}
}

cSocketManager.ClassName = function ()
{
	return "cSocketManager";
}

cSocketManager.CreateSocket = function (_Host, _Port, _ContentName)
{
	cSocketManager.SocketID++;
	return new cSocket(_Host, _Port, cSocketManager.SocketID, _ContentName);
}


