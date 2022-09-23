
var cResizeItem = Class(cBaseControl, {
	ObjectType: ObjectTypes.cResizeItem
	, LeftResize: false
	, RightResize: false
	, TopResize: false
	, BottomResize: false
	, Resizing: false
	, MouseLastX: 0
	, MouseLastY: 0
	, LastTop: 0
	, LastLeft: 0
	, LastHeight: 0
	, LastWidth: 0
	, LineWidth : 7
	,
	constructor: function (_ComponentController, _OwnerComponent, _LeftResize, _RightResize, _TopResize, _BottomResize)
	{
		cResizeItem.BaseObject.constructor.call(this, _ComponentController, _OwnerComponent, "", 0, 0, 0, 0, 0);
		this.LeftResize = _LeftResize;
		this.RightResize = _RightResize;
		this.TopResize = _TopResize;
		this.BottomResize = _BottomResize;
	}
	,
	BaseObject: function ()
	{
		return cBaseControl.prototype;
	}
	,
	Destroy: function ()
	{
		this.OnDisposed.Run(null);
		delete this.LeftResize;
		delete this.RightResize;
		delete this.TopResize;
		delete this.BottomResize;
		delete this.Resizing;
		delete this.MouseLastX;
		delete this.MouseLastY;
		cBaseControl.prototype.Destroy.call(this);
	}
	,
	InBound: function (_X, _Y)
	{
		var __Result = false;
		var __RealCoordinate = this.OwnerComponent.GetRealCoordinate();

		if (this.TopResize && (__RealCoordinate.Y) < _Y && _Y < (__RealCoordinate.Y + this.LineWidth) && __RealCoordinate.X < _X && _X < (__RealCoordinate.X + this.OwnerComponent.Width))
		{
			//document.body.style.cursor = 's-resize';
			__Result = true;
		}
		else if (this.BottomResize && ((__RealCoordinate.Y - this.LineWidth) + this.OwnerComponent.Height) < _Y && _Y < ((__RealCoordinate.Y) + this.OwnerComponent.Height) && __RealCoordinate.X < _X && _X < (__RealCoordinate.X + this.OwnerComponent.Width))
		{
			//document.body.style.cursor = 's-resize';
			__Result = true;
		}
		else if (this.LeftResize && __RealCoordinate.Y < _Y && _Y < (__RealCoordinate.Y + this.OwnerComponent.Height) && (__RealCoordinate.X) < _X && _X < (__RealCoordinate.X + this.LineWidth))
		{
			//document.body.style.cursor = 'w-resize';
			__Result = true;
		}
		else if (this.RightResize && __RealCoordinate.Y < _Y && _Y < (__RealCoordinate.Y + this.OwnerComponent.Height) && ((__RealCoordinate.X - this.LineWidth) + this.OwnerComponent.Width) < _X && _X < ((__RealCoordinate.X) + this.OwnerComponent.Width))
		{
			//document.body.style.cursor = 'w-resize';
			__Result = true;
		}	
		return __Result;
	}
	,
	MouseMove: function (_Event)
	{
		var __RealCoordinate = this.OwnerComponent.GetRealCoordinate();

		if (this.MouseDowned)
		{
			if (this.TopResize)
			{
				var __LastTop = this.OwnerComponent.Top + this.OwnerComponent.Height;
				if (this.OwnerComponent.Height > 19)
				{
					this.OwnerComponent.Top += _Event.offsetY - this.MouseLastY;
					this.OwnerComponent.Height -= _Event.offsetY - this.MouseLastY;
					this.MouseLastY = _Event.offsetY;
				}
				if (this.OwnerComponent.Height < 20)
				{
					this.OwnerComponent.Top = __LastTop - 20;
					this.OwnerComponent.Height = 20;
					this.MouseLastY = __RealCoordinate.Y;

				}
			}
			else if (this.BottomResize)
			{
				if (this.OwnerComponent.Height > 19)
				{
					this.OwnerComponent.Height += _Event.offsetY - this.MouseLastY;
					this.MouseLastY = _Event.offsetY;
				}
				if (this.OwnerComponent.Height < 20)
				{
					this.OwnerComponent.Height = 20;
					this.MouseLastY = this.OwnerComponent.Height + __RealCoordinate.Y;
				}
			}
			else if (this.LeftResize)
			{
				var __LastLeft = this.OwnerComponent.Left + this.OwnerComponent.Width;
				if (this.OwnerComponent.Width > 19)
				{
					this.OwnerComponent.Left += _Event.offsetX - this.MouseLastX;
					this.OwnerComponent.Width -= _Event.offsetX - this.MouseLastX;
					this.MouseLastX = _Event.offsetX;
				}
				if (this.OwnerComponent.Width < 20)
				{
					this.OwnerComponent.Left = __LastLeft - 20;
					this.OwnerComponent.Width = 20;
					this.MouseLastX = __RealCoordinate.X;
				}
			}
			else if (this.RightResize)
			{
				if (this.OwnerComponent.Width > 19)
				{
					this.OwnerComponent.Width += _Event.offsetX - this.MouseLastX;
					this.MouseLastX = _Event.offsetX;
				}
				if (this.OwnerComponent.Width < 20)
				{
					this.OwnerComponent.Width = 20;
					this.MouseLastX = this.OwnerComponent.Width + __RealCoordinate.X;
				}
			}
		}

		if (this.LastTop != this.OwnerComponent.Top ||  this.LastLeft != this.OwnerComponent.Left || this.LastHeight != this.OwnerComponent.Height || this.LastWidth != this.OwnerComponent.Width)
		{
			this.LastTop = this.OwnerComponent.Top;
			this.LastLeft = this.OwnerComponent.Left;
			this.LastHeight = this.OwnerComponent.Height;
			this.LastWidth = this.OwnerComponent.Width;
			this.OwnerComponent.OnResize.Run();
		}

		return cBaseControl.prototype.MouseMove.call(this, _Event);
	}
	,
	MouseDown: function (_Event)
	{
		this.LastTop = this.OwnerComponent.Top;
		this.LastLeft = this.OwnerComponent.Left;
		this.LastHeight = this.OwnerComponent.Height;
		this.LastWidth = this.OwnerComponent.Width;

		/*var __RealCoordinate = this.OwnerComponent.GetRealCoordinate();
		var __Result = false;

		if (this.TopResize && (__RealCoordinate.Y) < _Event.offsetY && _Event.offsetY < (__RealCoordinate.Y + 5) && __RealCoordinate.X < _Event.offsetX && _Event.offsetX < (__RealCoordinate.X + this.OwnerComponent.Width))
		{
			__Result = true;
		}
		else if (this.BottomResize && ((__RealCoordinate.Y - 5) + this.OwnerComponent.Height) < _Event.offsetY && _Event.offsetY < ((__RealCoordinate.Y) + this.OwnerComponent.Height) && __RealCoordinate.X < _Event.offsetX && _Event.offsetX < (__RealCoordinate.X + this.OwnerComponent.Width))
		{
			__Result = true;
		}
		else if (this.LeftResize && __RealCoordinate.Y < _Event.offsetY && _Event.offsetY < (__RealCoordinate.Y + this.OwnerComponent.Height) && (__RealCoordinate.X) < _Event.offsetX && _Event.offsetX < (__RealCoordinate.X + 5))
		{
			__Result = true;
		}
		else if (this.RightResize && __RealCoordinate.Y < _Event.offsetY && _Event.offsetY < (__RealCoordinate.Y + this.OwnerComponent.Height) && ((__RealCoordinate.X - 5) + this.OwnerComponent.Width) < _Event.offsetX && _Event.offsetX < ((__RealCoordinate.X) + this.OwnerComponent.Width))
		{
			__Result = true;
		}
		*/
		__Result = cBaseControl.prototype.MouseDown.call(this, _Event);
		if (__Result)
		{
			this.MouseLastX = _Event.offsetX;
			this.MouseLastY = _Event.offsetY;
		}
		return __Result;
	}
	,
	MouseUp: function (_Event)
	{
		return cBaseControl.prototype.MouseUp.call(this, _Event);
	}
	,
	Draw: function ()
	{
		this.OnPrerender.Run(null);
		var __Count = this.SubComponentList.Count();
		for (var i = 0; i < __Count; i++)
		{
			var __Item = this.SubComponentList.GetItem(i);
			__Item.Draw();
		}
	}
}, {});




