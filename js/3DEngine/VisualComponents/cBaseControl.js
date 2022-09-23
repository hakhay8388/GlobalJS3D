
var cBaseControl = Class(cObserverable,
{
	ObjectType: ObjectTypes.cBaseControl
	, OnResize: null
	, CameraList: null
	, ComponentController: null
	, ComponentGraphic: null
	, SubComponentList: null
	, OwnerComponent: null
	, Left: 0
	, Top: 0
	, Width: 0
	, Height: 0
	, TopOrder: 0
	, Focused: false
	, ComponentName: ""
	, Cursor: "default"
	, Text: ""
	, TextPunto: 11
	, TextStyle: "Arial"
	, TextColor: Colors.Black
	, MouseOnMe: false
	, MouseDowned: false
	, LastClickTime: null
	, LineWidth: 7
	, UseTransparency: true
	, KeyColor: Colors.White
	, KeyColorOpacity: 0
	, Opacity: 80
	,
	constructor: function (_ComponentController, _OwnerComponent, _ComponentName, _Left, _Top, _Width, _Height, _TopOrder)
	{
		cBaseControl.BaseObject.constructor.call(this);
		this.OwnerComponent = _OwnerComponent;
		this.ComponentController = _ComponentController;
		this.ComponentName = _ComponentName;
		this.CameraList = this.ComponentController.OwnerScene.CameraList;
		this.Left = _Left;
		this.Top = _Top;
		this.Width = _Width;
		this.Height = _Height;
		this.TopOrder = _TopOrder;
		this.SubComponentList = new cList(ObjectTypes.cBaseControl);
		this.LastClickTime = new Date();
		this.OnResize = new cDelegate(false);

		if (_OwnerComponent == null)
		{
			if (ObjectTypes.cForm.ObjectTypeID == this.ObjectType.ObjectTypeID)
			{
				this.ComponentController.ComponenetList.Add(this);
			}
			else
			{
				DebugAlert.Show("Kök Obje Olarak Sadece Form Tanımlayabilirsiniz..!\nTaşıyıcı Container Component Girmelisiz..!");
			}
		}
		else
		{
			if (ObjectTypes.cForm.ObjectTypeID != this.ObjectType.ObjectTypeID)
			{
				this.AddMeToOwnerComponent();
			}
			else
			{
				DebugAlert.Show("Form Componenti Bir Başka Componente Alt Obje Olamaz..!");
			}
		}
	}
	,
	GetRealCoordinate: function ()
	{
		if (this.OwnerComponent != null)
		{
			var __Result = this.OwnerComponent.GetRealCoordinate();
			__Result.X += this.Left;
			__Result.Y += this.Top;
			return __Result;
		}
		else
		{
			__Result = {
				X: this.Left,
				Y: this.Top
			}
			return __Result;
		}
	}
	,
	SortSubComponenetList: function ()
	{
		var __Count = this.SubComponentList.Count();
		for (var i = 0; i < __Count - 1; i++)
		{
			for (var j = i + 1; j < __Count; j++)
			{
				var __Item = this.SubComponentList.GetItem(i);
				var __Item2 = this.SubComponentList.GetItem(j);
				if (__Item.TopOrder < __Item2.TopOrder)
				{
					this.SubComponentList.SetItem(j, __Item);
					this.SubComponentList.SetItem(i, __Item2);
				}
			}
		}
	}
	,
	AddMeToOwnerComponent: function ()
	{
		try
		{
			var __Count = this.OwnerComponent.SubComponentList.Count();
		}
		catch (_Ex)
		{
			var aa = 5;
			var bb = aa + 5;
		}

		var __Inserted = false;
		for (var i = 0; i < __Count; i++)
		{
			var __Item = this.OwnerComponent.SubComponentList.GetItem(i);
			if (__Item.TopOrder > this.TopOrder)
			{
				this.OwnerComponent.SubComponentList.Insert(i, this);
				__Inserted = true;
				break;
			}
		}
		if (!__Inserted)
		{
			this.OwnerComponent.SubComponentList.Add(this);
		}
	}
	,
	GetBound: function ()
	{
		if (this.OwnerComponent == null)
		{
			var __Result =
			{
				Left: this.Left,
				Top: this.Top,
				Width: this.Width,
				Height: this.Height
			}
			return __Result;
		}
		else
		{
			var __Bound = this.OwnerComponent.GetBound();
			var __Result =
			{
				Left: this.Left + __Bound.Left,
				Top: this.Top + __Bound.Top,
				Width: this.Width,
				Height: this.Height
			}
			return __Result;
		}
	}
	,
	InBound: function (_X, _Y)
	{
		var __Bound = this.GetBound();
		if (this.OwnerComponent == null && (__Bound.Left <= _X && __Bound.Top - DefaultSceneSettings.FormTitleBarHeigth <= _Y && _X <= (__Bound.Left + __Bound.Width) && _Y <= (__Bound.Top + __Bound.Height)))
		{
			return true
		}
		else if (__Bound.Left <= _X && __Bound.Top <= _Y && _X <= (__Bound.Left + __Bound.Width) && _Y <= (__Bound.Top + __Bound.Height))
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	,
	KillAllFocus: function ()
	{
		if (this.OwnerComponent != null)
		{
			this.OwnerComponent.KillAllFocus();
		}
		else
		{
			this.ComponentController.KillSubComponentFocus(this);
		}
	}
	,
	Focus: function ()
	{
		this.KillAllFocus();
		this.Focused = true;
	}
	,
	MouseMove: function (_Event)
	{
		var __Result = false;
		if (this.InBound(_Event.offsetX, _Event.offsetY))
		{
			var __Count = this.SubComponentList.Count();
			for (var i = 0; i < __Count; i++)
			{
				var __Item = this.SubComponentList.GetItem(i);
				if (__Item.MouseMove(_Event))
				{
					__Result = true;
				}
			}
			if (!__Result)
			{
				document.body.style.cursor = this.Cursor;
				this.OnMouseMove.Run(_Event);
				if (!this.MouseOnMe)
				{
					this.OnMouseOver.Run(_Event);
				}
				__Result = true;
				this.MouseOnMe = __Result
			}
		}
		else if (this.MouseDowned)
		{
			this.OnMouseMove.Run(_Event);
			if (!this.MouseOnMe)
			{
				this.OnMouseOver.Run(_Event);
			}
			this.MouseOnMe = true;
			__Result = true;
		}
		else
		{
			if (this.MouseOnMe)
			{
				this.OnMouseOut.Run(_Event);
			}
			this.MouseOnMe = false;
		}
		return __Result;
	}
	,
	KillAllMouseDown: function ()
	{
		for (var i = 0; i < this.SubComponentList.Count(); i++)
		{
			var __Item = this.SubComponentList.GetItem(i);
			__Item.KillAllMouseDown();
		}
		this.MouseDowned = false;
	}
	,
	MouseDown: function (_Event)
	{
		this.KillAllMouseDown();
		if (this.InBound(_Event.offsetX, _Event.offsetY))
		{
			var __Count = this.SubComponentList.Count();
			for (var i = 0; i < __Count; i++)
			{
				var __Item = this.SubComponentList.GetItem(i);
				if (__Item.MouseDown(_Event))
				{
					return true;
				}
			}
			this.OnMouseDown.Run(_Event);
			if (!this.Focused)
			{
				this.Focus();
			}
			this.MouseDowned = true;
			return true;
		}
		this.MouseDowned = false;
		return false;
	}
	,
	MouseUp: function (_Event)
	{
		var __Result = false;
		if (this.InBound(_Event.offsetX, _Event.offsetY))
		{
			var __Count = this.SubComponentList.Count();
			for (var i = 0; i < __Count; i++)
			{
				var __Item = this.SubComponentList.GetItem(i);
				if (__Item.MouseUp(_Event))
				{
					__Result = true;
				}
			}
			if (!__Result)
			{
				this.OnMouseUp.Run(_Event);
				__Result = true;

				if (this.MouseDowned)
				{
					var __Now = new Date();
					if ((__Now - this.LastClickTime) < 200)
					{
						this.OnDblClick.Run(_Event);
					}
					else
					{
						this.OnClick.Run(_Event);
					}
					this.LastClickTime = __Now;
				}
				this.MouseDowned = false;
			}
		}

		if (!__Result)
		{
			this.MouseDowned = false;
		}


		return __Result;
	}
	,
	KeyPress: function (_Event)
	{
		if (this.Focused)
		{
			this.OnKeyPress.Run(_Event);
		}
		var __Count = this.SubComponentList.Count();
		for (var i = 0; i < __Count; i++)
		{
			var __Item = this.SubComponentList.GetItem(i);
			if (__Item.Focused)
			{
				__Item.OnKeyPress.Run(_Event);
				return;
			}
		}
	}
	,
	KeyDown: function (_Event)
	{
		if (this.Focused)
		{
			this.OnKeyDown.Run(_Event);
		}
		var __Count = this.SubComponentList.Count();
		for (var i = 0; i < __Count; i++)
		{
			var __Item = this.SubComponentList.GetItem(i);
			if (__Item.Focused)
			{
				__Item.OnKeyDown.Run(_Event);
				return;
			}
		}
	}
	,
	KeyUp: function (_Event)
	{
		if (this.Focused)
		{
			this.OnKeyUp.Run(_Event);
		}
		var __Count = this.SubComponentList.Count();
		for (var i = 0; i < __Count; i++)
		{
			var __Item = this.SubComponentList.GetItem(i);
			if (__Item.Focused)
			{
				__Item.OnKeyUp.Run(_Event);
				return;
			}
		}
	}
	,
	Draw: function ()
	{
		this.OnPrerender.Run(null);
		this.SortSubComponenetList();
		var __Count = 0;
		if (this.ObjectType.ObjectTypeID == ObjectTypes.cFormTitleBar.ObjectTypeID)
		{
			var __OwnerComponentRealCoordinate = this.OwnerComponent.GetRealCoordinate();

			__Count = this.CameraList.Count();
			for (var i = 0; i < __Count; i++)
			{
				var __Camera = this.CameraList.GetItem(i);

				__Camera.Canvas2dContent.restore();

			}

			this.ComponentGraphic.Draw();

			__Count = this.CameraList.Count();

			for (var i = 0; i < __Count; i++)
			{
				var __Camera = this.CameraList.GetItem(i);

				__Camera.Canvas2dContent.save();
				__Camera.Canvas2dContent.beginPath();

				__Camera.Canvas2dContent.moveTo(__OwnerComponentRealCoordinate.X + this.LineWidth, __OwnerComponentRealCoordinate.Y - DefaultSceneSettings.FormTitleBarHeigth);
				__Camera.Canvas2dContent.lineTo(__OwnerComponentRealCoordinate.X + this.OwnerComponent.Width - this.LineWidth, __OwnerComponentRealCoordinate.Y - DefaultSceneSettings.FormTitleBarHeigth);
				__Camera.Canvas2dContent.lineTo(__OwnerComponentRealCoordinate.X + this.OwnerComponent.Width - this.LineWidth, __OwnerComponentRealCoordinate.Y + this.OwnerComponent.Height - this.LineWidth);
				__Camera.Canvas2dContent.lineTo(__OwnerComponentRealCoordinate.X + this.LineWidth, __OwnerComponentRealCoordinate.Y + this.OwnerComponent.Height - this.LineWidth);

				__Camera.Canvas2dContent.clip();

			}
		}
		else
		{
			this.ComponentGraphic.Draw();
		}

		var __RealCoordinate = this.GetRealCoordinate();

		var __Count = this.CameraList.Count();

		for (var i = 0; i < __Count; i++)
		{
			var __Camera = this.CameraList.GetItem(i);

			__Camera.Canvas2dContent.save();
			__Camera.Canvas2dContent.beginPath();
			if (this.ObjectType.ObjectTypeID == ObjectTypes.cForm.ObjectTypeID)
			{
				__Camera.Canvas2dContent.moveTo(__RealCoordinate.X + this.LineWidth, __RealCoordinate.Y - DefaultSceneSettings.FormTitleBarHeigth);
				__Camera.Canvas2dContent.lineTo(__RealCoordinate.X + this.Width - this.LineWidth, __RealCoordinate.Y - DefaultSceneSettings.FormTitleBarHeigth);
				__Camera.Canvas2dContent.lineTo(__RealCoordinate.X + this.Width - this.LineWidth, __RealCoordinate.Y + this.Height - this.LineWidth);
				__Camera.Canvas2dContent.lineTo(__RealCoordinate.X + this.LineWidth, __RealCoordinate.Y + this.Height - this.LineWidth);
			}
			else
			{
				__Camera.Canvas2dContent.moveTo(__RealCoordinate.X + 3, __RealCoordinate.Y);
				__Camera.Canvas2dContent.lineTo(__RealCoordinate.X + this.Width - 3, __RealCoordinate.Y);
				__Camera.Canvas2dContent.lineTo(__RealCoordinate.X + this.Width - 3, __RealCoordinate.Y + this.Height - 3);
				__Camera.Canvas2dContent.lineTo(__RealCoordinate.X + 3, __RealCoordinate.Y + this.Height - 3);

			}
			__Camera.Canvas2dContent.clip();

		}

		this.ComponentGraphic.DrawText();

		__Count = this.SubComponentList.Count();
		for (var i = 0; i < __Count; i++)
		{
			var __Item = this.SubComponentList.GetItem(i);
			__Item.Draw();
		}

		__Count = this.CameraList.Count();
		for (var i = 0; i < __Count; i++)
		{
			var __Camera = this.CameraList.GetItem(i);

			__Camera.Canvas2dContent.restore();

		}

	}
	,
	BaseObject: function ()
	{
		return cObserverable.prototype;
	},
	Destroy: function ()
	{

		if (this.OwnerComponent == null)
		{
			this.ComponentController.ComponenetList.Remove(this);
		}
		else
		{
			this.OwnerComponent.SubComponentList.Remove(this);
		}

		if (this.ComponentGraphic != null)
		{
			this.ComponentGraphic.Destroy();
		}

		this.SubComponentList.DestroyWithItems();
		delete this.SubComponentList;
		delete this.OwnerComponent;

		delete this.Width;
		delete this.Height;
		delete this.TopOrder;
		delete this.OwnerScene;
		delete this.Left;
		delete this.Top;
		delete this.Focused;
		delete this.ComponentName;
		delete this.Text;
		delete this.TextPunto;
		delete this.TextStyle;
		delete this.TextColor;
		delete this.MouseOnMe;
		delete this.MouseDowned;
		delete this.LastClickTime;

		cObserverable.prototype.Destroy.call(this);
	}
}, {});




