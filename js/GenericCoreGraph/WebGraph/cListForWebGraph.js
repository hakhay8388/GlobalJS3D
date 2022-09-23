/// <reference path="ObjectTypes\ObjectTypes.js" />



var cListForWebGraph = Class(Object,
{
	InnerList: null,
	ListItemObject: ObjectTypes.Get("cBaseObject"),
	constructor: function ()
	{
		this.InnerList = new Array();
		this.ListItemObject = ObjectTypes.Get("cBaseObject");
	}
    ,
	Add: function (Object_Item)
	{
		if (WebGraph.ControlBaseClass(Object_Item, this.ListItemObject))
		{
			this.InnerList.push(Object_Item);
		}
		else
		{
			try
			{
				DebugAlert.Show("cListForWebGraph.Add Fonksiyonunda Tür Uyuşmazlığı..\nListe Turu : " + this.ListItemObject.ObjectName + "\nEklenmek İstenen Tür : " + Object_Item.ToString());
			}
			catch (e)
			{
			}
		}
	}
    ,
	Insert: function (Insert_Index, Object_Item)
	{
		if (WebGraph.ControlBaseClass(Object_Item, this.ListItemObject))
		{
			var __NewList = new Array();
			var __Added = false;
			for (var i = 0; i < this.InnerList.length; i++)
			{
				if (Insert_Index == i)
				{
					__NewList.push(Object_Item);
					__Added = true;
				}
				else
				{
					__NewList.push(this.InnerList[i]);
				}
			}
			if (!__Added)
			{
				this.Add(Object_Item);
			}
			delete this.InnerList;
			this.InnerList = __NewList;
		}
		else
		{
			DebugAlert.Show("cListForWebGraph.Insert Fonksiyonunda Tür Uyuşmazlığı..\nListe Turu : " + this.ListItemObject.ObjectName + "\nEklenmek İstenen Tür : " + Object_Item.ToString());
		}
	}
    ,
	Count: function ()
	{
		return this.InnerList.length;
	}
    ,
	Remove: function (Object_Item)
	{
//		if (WebGraph.ControlBaseClass(Object_Item, this.ListItemObject))
//		{
			var __RemoveIndex = this.InnerList.indexOf(Object_Item);
			if (__RemoveIndex != -1)
			{
				this.InnerList.splice(__RemoveIndex, 1);
			}
/*		}
		else
		{
			DebugAlert.Show("cListForWebGraph.Remove Fonksiyonunda Tür Uyuşmazlığı..\nListe Turu : " + this.ListItemObject.ObjectName + "\Silinmek İstenen Tür : " + Object_Item.ToString());
		}*/
	},
	RemoveRange: function (Number_RemoveStartIndex, Number_Count)
	{
		if (JSTypeOperator.IsNumeric(Number_RemoveStartIndex) && JSTypeOperator.IsNumeric(Number_Count))
		{
			if (Number_RemoveStartIndex + Number_Count > this.Count())
			{
				DebugAlert.Show("cList.RemoveRange Fonksiyonunda liste Aşıma Uğradı..!");
			}
			else
			{
				this.InnerList.splice(Number_RemoveStartIndex, Number_Count)
			}
		}
		else
		{
			DebugAlert.Show("cListForWebGraph.RemoveRange Fonksiyonunda Numerik Aralık Verilmeli..!");
		}
	},
	RemoveAt: function (Number_RemoveIndex)
	{
		if (JSTypeOperator.IsNumeric(Number_RemoveIndex))
		{
			if (Number_RemoveIndex > (this.Count() - 1))
			{
				DebugAlert.Show("cListForWebGraph.RemoveAt Fonksiyonunda Liste Aşıma Uğradı..!");
			}
			else
			{
				this.InnerList.splice(Number_RemoveIndex, 1);
			}
		}
		else
		{
			DebugAlert.Show("cListForWebGraph.RemoveAt Fonksiyonuna Sayısal Bir Değer Gönderilmedi..!");
		}
	}
    ,
	Clear: function ()
	{
		this.InnerList.splice(0, this.Count());
	}
    ,
	IndexOf: function (_Object)
	{
		return this.InnerList.indexOf(_Item);
	}
     ,
	GetItem: function (Number_Index)
	{
		if (JSTypeOperator.IsNumeric(Number_Index))
		{
			if (Number_Index > (this.Count() - 1))
			{
				DebugAlert.Show("cListForWebGraph.GetItem Fonksiyonunda Liste Aşıma Uğradı..!");
			}
			else
			{
				return this.InnerList[Number_Index];
			}
		}
		else
		{
			DebugAlert.Show("cListForWebGraph.GetItem Fonksiyonuna Sayısal Bir Değer Gönderilmeli..!");
		}
		return null;

	}
    ,
	SetItem: function (Number_Index, Object_Item)
	{
		if (WebGraph.ControlBaseClass(Object_Item, this.ListItemObject))
		{
			if (JSTypeOperator.IsNumeric(Number_Index))
			{
				if (Number_Index > (this.Count() - 1))
				{
					DebugAlert.Show("cListForWebGraph.SetItem Fonksiyonunda Liste Aşıma Uğradı..!");
				}
				else
				{
					this.InnerList[Number_Index] = Object_Item;
				}
			}
			else
			{
				DebugAlert.Show("cListForWebGraph.SetItem Index Numerik Olmalı..!");
			}
		}
		else
		{
			DebugAlert.Show("cListForWebGraph.SetItem Fonksiyonunda Tür Uyuşmazlığı..\nListe Turu : " + this.ListItemObject.ObjectName + "\Setlenmek İstenen Tür : " + Object_Item.ToString());
		}
	}

       ,
	BaseObject: function ()
	{
		return Object;
	}
    ,
	Destroy: function ()
	{
		delete this.InnerList;
	}
},{});



