
var cComponentController = Class(cBaseObject,
{
	ObjectType: ObjectTypes.cComponentController
	, OwnerScene: null
	, ComponenetList: null
	, ComponentFactory: null
	,
	constructor: function (_OwnerScene)
	{
		cComponentController.BaseObject.constructor.call(this);
		this.OwnerScene = _OwnerScene;
		this.ComponenetList = new cList(ObjectTypes.cBaseControl);
		this.ComponentFactory = new cComponentFactory(this);
	}
	,
	KillSubComponentFocus: function (_Component)
	{
		for (var i = 0; i < _Component.SubComponentList.Count(); i++)
		{
			this.KillSubComponentFocus(_Component.SubComponentList.GetItem(i));
		}
		_Component.Focused = false;
	}

	,
	SetMeToTop: function (_BaseControl)
	{
		_BaseControl.TopOrder = 0;

		_BaseControl.OnActivate.Run();

		var __Counter = 1;
		var __Count = this.ComponenetList.Count();
		for (var i = 0; i < __Count; i++)
		{
			var __Item = this.ComponenetList.GetItem(i);
			if (__Item != _BaseControl)
			{
				__Item.TopOrder = __Counter;
				_BaseControl.OnDeactivate.Run();
				__Counter++;
			}
		}
		this.SortComponenetList();
	}
	,
	SortComponenetList: function ()
	{
		var __Count = this.ComponenetList.Count();
		for (var i = 0; i < __Count - 1; i++)
		{
			for (var j = i + 1; j < __Count; j++)
			{
				var __Item = this.ComponenetList.GetItem(i);
				var __Item2 = this.ComponenetList.GetItem(j);
				if (__Item.TopOrder > __Item2.TopOrder)
				{
					this.ComponenetList.SetItem(j, __Item);
					this.ComponenetList.SetItem(i, __Item2);
				}
			}
		}
	}
	,
	Draw: function ()
	{
		var __Count = this.ComponenetList.Count();
		for (var i = __Count - 1; i > -1; i--)
		{
			var __Item = this.ComponenetList.GetItem(i);
			__Item.Draw();
		}
	}
	,
	MouseOnControl: function (_Component, _Event)
	{
		var __Count = _Component.SubComponentList.Count();
		for (var i = 0; i < __Count; i++)
		{
			var __Item = _Component.SubComponentList.GetItem(i);
			this.MouseOnControl(__Item, _Event);
		}
		if (_Component.MouseOnMe && !_Component.InBound(_Event.offsetX, _Event.offsetY))
		{
			_Component.MouseMove(_Event);
		}
	}
	,
	MouseMove: function (_Event)
	{
		var __Found = false;
		var __Count = this.ComponenetList.Count();
		for (var i = 0; i < __Count; i++)
		{
			var __Item = this.ComponenetList.GetItem(i);
			if (__Item.SubComponentList.Count() > 0)
			{
				this.MouseOnControl(__Item, _Event);
			}

			if (__Item.MouseMove(_Event))
			{
				__Found = true;
				break;
			}
		}
		if (!__Found)
		{
			document.body.style.cursor = DefaultSceneSettings.DefaultCursor;
		}
	}
	,
	MouseDown: function (_Event)
	{
		var __Count = this.ComponenetList.Count();
		for (var i = 0; i < __Count; i++)
		{
			var __Item = this.ComponenetList.GetItem(i);
			if (__Item.MouseDown(_Event))
			{
				if (__Item.TopOrder != 0)
				{
					this.SetMeToTop(__Item);
				}
				break;
			}
		}
	}
	,
	MouseUp: function (_Event)
	{
		var __Count = this.ComponenetList.Count();
		for (var i = 0; i < __Count; i++)
		{
			var __Item = this.ComponenetList.GetItem(i);
			if (__Item.MouseUp(_Event))
			{
				break;
			}
		}
	}
	,
	KeyPress: function (_Event)
	{
		if (this.ComponenetList.Count() > 0)
		{
			var __Item = this.ComponenetList.GetItem(0);
			__Item.KeyPress(_Event);
		}
	}
	,
	KeyDown: function (_Event)
	{
		if (this.ComponenetList.Count() > 0)
		{
			var __Item = this.ComponenetList.GetItem(0);
			__Item.KeyDown(_Event);
		}
	}
	,
	KeyUp: function (_Event)
	{
		if (this.ComponenetList.Count() > 0)
		{
			var __Item = this.ComponenetList.GetItem(0);
			__Item.KeyUp(_Event);
		}
	}
	,
	BaseObject: function ()
	{
		return cBaseObject.prototype;
	}
	,
	Destroy: function ()
	{
		delete this.OwnerScene;
		this.ComponenetList.DestroyWithItems();
		this.ComponentFactory.Destroy();
		delete this.ComponenetList;
		delete this.ComponentFactory;
		cBaseObject.prototype.Destroy.call(this);
	}
}, {});




