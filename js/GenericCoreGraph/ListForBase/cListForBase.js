
/// <reference path="ObjectTypes\ObjectTypes.js" />



var cListForBase = Class(Object,
{
    InnerList: null,

    constructor: function()
    {
        this.InnerList = new Array();
    }
    ,
    Add: function(Object_Item)
    {
        this.InnerList.push(Object_Item);
    }
    ,
    Count: function()
    {
        return this.InnerList.length;
    }
    ,
    Remove: function(Object_Item)
    {
        var __RemoveIndex = this.InnerList.indexOf(Object_Item);
        if (__RemoveIndex != -1)
        {
            this.InnerList.splice(__RemoveIndex, 1);
        }
    }
    ,
    RemoveAt: function(Number_RemoveIndex)
    {
        this.InnerList.splice(Number_RemoveIndex, 1);
    }
    ,
    Clear: function()
    {
        this.InnerList.splice(0, this.Count());
    }
    ,
    IndexOf: function(_Object)
    {
        return this.InnerList.indexOf(_Object);
    }
     ,
    GetItem: function(Number_Index)
    {
        if (JSTypeOperator.IsNumeric(Number_Index))
        {
            if (Number_Index > (this.Count() - 1))
            {
                DebugAlert.Show("cListItemForBase.GetItem Fonksiyonunda Liste Aşıma Uğradı..!");
            }
            else
            {
                return this.InnerList[Number_Index];
            }
        }
        else
        {
            DebugAlert.Show("cListItemForBase.GetItem Fonksiyonuna Sayısal Bir Değer Gönderilmeli..!");
        }
        return null;

    }
    ,
    SetItem: function(Number_Index, Object_Item)
    {
        if (JSTypeOperator.IsNumeric(Number_Index))
        {
            if (Number_Index > (this.Count() - 1))
            {
                DebugAlert.Show("cListItemForBase.SetItem Fonksiyonunda Liste Aşıma Uğradı..!");
            }
            else
            {
                this.InnerList[Number_Index] = Object_Item; ;
            }
        }
        else
        {
            DebugAlert.Show("cListItemForBase.SetItem Index Numerik Olmalı..!");
        }
    }
        ,
    BaseObject: function()
    {
        return Object;
    }
    ,
    Destroy: function()
    {
        delete this.InnerList;
    }
    ,
    DestroyWithItems: function()
    {
        var __Count = this.Count();
        for (var i = __Count - 1; i > -1; i--)
		{
		    var __Item = this.InnerList[i];
		    __Item.Destroy();
		}
		this.Clear();
        delete this.InnerList;
    }    

},{});



