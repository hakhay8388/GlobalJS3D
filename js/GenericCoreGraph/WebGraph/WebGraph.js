

WebGraph = function()
{
}

if (WebGraph.LastObjectID == undefined)
{
   WebGraph.LastObjectID = 0;
   WebGraph.ObjectList = new cListForWebGraph();
}


WebGraph.GetNewCreateID = function()
{
    WebGraph.LastObjectID++;
    return WebGraph.LastObjectID;
}

WebGraph.ControlBaseClass = function(Object_DerivedClass, ObjectType)
{
    try
    {
        if (Object_DerivedClass.GetTypeID() == ObjectType.ObjectTypeID)
        {
            return true;
        }
        else if (Object_DerivedClass.GetTypeID() == ObjectTypes.cBaseObject.ObjectTypeID)
        {
            return false;
        }
        else
        {
            return WebGraph.ControlBaseClass(Object_DerivedClass.BaseObject(), ObjectType);
        }
    }
    catch (ex)
    {
        return false;
    }
}


WebGraph.GetMyBaseClass = function(Object_DerivedClass)
{
    if (Object_DerivedClass.GetTypeID() == ObjectTypes.cBaseObject.ObjectTypeID)
    {
        return Object_DerivedClass;
    }
    else
    {
        return WebGraph.GetMyBaseClass(Object_DerivedClass.BaseObject);
    }
}

WebGraph.Add = function(Object)
{
    WebGraph.ObjectList.Add(Object);
    if (WebGraph.ObjectList.Count() > 1000000)
    {
        DebugAlert.Show("Web Obje Sayısı 1.000.000'nu Aştı..!\nSorun Çıkmıyorsa Hata Obje Sayısını Arttırın veya Obje Azaltın...");
    }
}

WebGraph.Remove = function(Object)
{
    WebGraph.ObjectList.Remove(Object);
}

WebGraph.GetItemIndexByCreateID = function(Number_CreateID)
{
    for (var i = 0; i < WebGraph.ObjectList.Count(); i++)
    {
        var __Item = WebGraph.ObjectList.GetItem(i);
        if (__Item.CreateID == Number_CreateID)
        {
            return i;
        }
    }
    return -1;
}

WebGraph.GetItemByCreateID = function(Number_CreateID)
{
    var __Index = WebGraph.GetItemIndexByCreateID(Number_CreateID);
    if (__Index == -1)
    {
        return null;        
    }
    else
    {
        return WebGraph.ObjectList.GetItem(__Index);
    }
}

WebGraph.ShowObjectList = function()
{
    var __String = "";
    for (var i = 0; i < WebGraph.ObjectList.Count(); i++)
    {
        var __TempObject = WebGraph.ObjectList.GetItem(i);
        __String += __TempObject.ToString() + "\n";
    }
    DebugAlert.Show(__String);
}

WebGraph.SetItemByCreateID = function(Number_CreateID, Object_Item)
{
    var __Index = WebGraph.GetItemIndexByCreateID(Number_CreateID);
    if (__Index == -1)
    {
        DebugAlert.Show("WebGraph.SetItem Fonsiyonunda Gönderderilen CreateID Bulunamadı..!");
    }
    else
    {
        WebGraph.ObjectList.SetItem(__Index, Object_Item);                                    
    }
}

WebGraph.DeleteItemByCreateID = function(Number_CreateID)
{
    var __Index = WebGraph.GetItemIndexByCreateID(Number_CreateID);
    delete WebGraph.ObjectList.InnerList[__Index];
    WebGraph.ObjectList.RemoveAt(__Index);
}