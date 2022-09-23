
var cTextBox = Class(cBaseControl, {
	ObjectType: ObjectTypes.cTextBox
	, MouseOnMe: false
	, MouseDowned: false
	, OnClick: null
	, CursorPosisionIndex: 0
	,
	constructor: function (_ComponentController, _OwnerComponent, _ComponentName, _Left, _Top, _Width, _Height, _TopOrder
		, _TextBox_Left
		, _TextBox_Right
		, _TextBox_Upper
		, _TextBox_Bottom
		, _TextBox_LeftBottomCorner
		, _TextBox_RightBottomCorner
		, _TextBox_LeftUpperCorner
		, _TextBox_RightUpperCorner
		, _TextBox_Center
	)
	{
		cImageButton.BaseObject.constructor.call(this, _ComponentController, _OwnerComponent, _ComponentName, _Left, _Top, _Width, _Height, _TopOrder);
		this.ComponentGraphic = new cTextBoxGraphic(this, _TextBox_Left, _TextBox_Right, _TextBox_Upper, _TextBox_Bottom, _TextBox_LeftBottomCorner, _TextBox_RightBottomCorner, _TextBox_LeftUpperCorner, _TextBox_RightUpperCorner, _TextBox_Center);
		this.Text = "";
		this.Cursor = "text";
		this.OnClick = new cDelegate(ObjectTypes.cFreeObject, false);
		this.OnKeyDown.Add(this, this.KeyDownFunction);
	}
	,
	Draw: function ()
	{
		this.CloseWindowKeys();
		cBaseControl.prototype.Draw.call(this);
	}
	,
	CloseWindowKeys: function ()
	{
		if (this.Focused)
		{
			window.onkeydown = this.CloseWindowEvents;
		}
		else
		{
			window.onkeydown = null;
		}
	}
	,
	CloseWindowEvents: function (_Event)
	{
		if (_Event.keyCode == 32 || _Event.keyCode == 8)
		{
			return false;
		}
	}
	,
	KeyDownFunction: function (_Event)
	{
		if (_Event.keyCode == 8)
		{
			if (this.CursorPosisionIndex > 0)
			{
				var __Left = StringUtils.SubString(this.Text, 0, this.CursorPosisionIndex - 1);
				var __Right = StringUtils.SubString(this.Text, this.CursorPosisionIndex, this.Text.length - this.CursorPosisionIndex);

				this.Text = __Left + __Right;
				this.CursorPosisionIndex--;
			}
		}
		else
		{

			var __Left = StringUtils.SubString(this.Text, 0, this.CursorPosisionIndex);
			var __Right = StringUtils.SubString(this.Text, this.CursorPosisionIndex, this.Text.length - this.CursorPosisionIndex);

			this.Text = __Left + String.fromCharCode(_Event.which) + __Right;
			this.CursorPosisionIndex++;
		}
	}
	,
	BaseObject: function ()
	{
		return cBaseControl.prototype;
	},
	Destroy: function ()
	{
		this.OnDisposed.Run(null);
		cBaseControl.prototype.Destroy.call(this);
	}
}, {});




