
var cTextBoxGraphic = Class(cBaseComponentGraphic,
{
	ObjectType: ObjectTypes.cTextBoxGraphic
	, Text: null
	, SpecialGraphic: false

	, SpecialTextBox_LeftTexture: null
	, SpecialTextBox_RightTexture: null
	, SpecialTextBox_UpperTexture: null
	, SpecialTextBox_BottomTexture: null
	, SpecialTextBox_LeftBottomCornerTexture: null
	, SpecialTextBox_RightBottomCornerTexture: null
	, SpecialTextBox_LeftUpperCornerTexture: null
	, SpecialTextBox_RightUpperCornerTexture: null
	, SpecialTextBox_CenterTexture: null
	, CursorTimer: null
	, CursorDrawed: false
	, LastCursorCoordinateX: 0
	, LastText: ""
	,
	constructor: function (_OwnerComponent
		, _TextBox_Left
		, _TextBox_Right
		, _TextBox_Upper
		, _TextBox_Bottom
		, _TextBox_LeftBottomCorner
		, _TextBox_RightBottomCorner
		, _TextBox_LeftUpperCorner
		, _TextBox_RightUpperCorner
		, _TextBox_Center)
	{
		cTextBoxGraphic.BaseObject.constructor.call(this, _OwnerComponent);
		this.CursorTimer = new Date();

		if (_TextBox_Left && _TextBox_Right && _TextBox_Upper && _TextBox_Bottom && _TextBox_LeftBottomCorner && _TextBox_RightBottomCorner && _TextBox_LeftUpperCorner && _TextBox_RightUpperCorner && _TextBox_Center)
		{
			this.SpecialGraphic = true;

			this.SpecialTextBox_LeftTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(_TextBox_Left, null, null, null, true, 80, 0, Colors.White);
			this.SpecialTextBox_RightTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(_TextBox_Right, null, null, null, true, 80, 0, Colors.White);
			this.SpecialTextBox_UpperTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(_TextBox_Upper, null, null, null, true, 80, 0, Colors.White);
			this.SpecialTextBox_BottomTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(_TextBox_Bottom, null, null, null, true, 80, 0, Colors.White);
			this.SpecialTextBox_LeftBottomCornerTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(_TextBox_LeftBottomCorner, null, null, null, true, 80, 0, Colors.White);
			this.SpecialTextBox_RightBottomCornerTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(_TextBox_RightBottomCorner, null, null, null, true, 80, 0, Colors.White);
			this.SpecialTextBox_LeftUpperCornerTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(_TextBox_LeftUpperCorner, null, null, null, true, 80, 0, Colors.White);
			this.SpecialTextBox_RightUpperCornerTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(_TextBox_RightUpperCorner, null, null, null, true, 80, 0, Colors.White);
			this.SpecialTextBox_CenterTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(_TextBox_Center, null, null, null, true, 80, 0, Colors.White);


		}
		else if (!cTextBoxGraphic.ButtonFreeImage)
		{
			cTextBoxGraphic.TextBox_LeftTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(DefaultSceneSettings.ComponentSkin.TextBoxSkin.TextBox_LeftImage, null, null, null, true, 80, 0, Colors.White);
			cTextBoxGraphic.TextBox_RightTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(DefaultSceneSettings.ComponentSkin.TextBoxSkin.TextBox_RightImage, null, null, null, true, 80, 0, Colors.White);
			cTextBoxGraphic.TextBox_UpperTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(DefaultSceneSettings.ComponentSkin.TextBoxSkin.TextBox_UpperImage, null, null, null, true, 80, 0, Colors.White);
			cTextBoxGraphic.TextBox_BottomTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(DefaultSceneSettings.ComponentSkin.TextBoxSkin.TextBox_BottomImage, null, null, null, true, 80, 0, Colors.White);
			cTextBoxGraphic.TextBox_LeftBottomCornerTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(DefaultSceneSettings.ComponentSkin.TextBoxSkin.TextBox_LeftBottomCornerImage, null, null, null, true, 80, 0, Colors.White);
			cTextBoxGraphic.TextBox_RightBottomCornerTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(DefaultSceneSettings.ComponentSkin.TextBoxSkin.TextBox_RightBottomCornerImage, null, null, null, true, 80, 0, Colors.White);
			cTextBoxGraphic.TextBox_LeftUpperCornerTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(DefaultSceneSettings.ComponentSkin.TextBoxSkin.TextBox_LeftUpperCornerImage, null, null, null, true, 80, 0, Colors.White);
			cTextBoxGraphic.TextBox_RightUpperCornerTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(DefaultSceneSettings.ComponentSkin.TextBoxSkin.TextBox_RightUpperCornerImage, null, null, null, true, 80, 0, Colors.White);
			cTextBoxGraphic.TextBox_CenterTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(DefaultSceneSettings.ComponentSkin.TextBoxSkin.TextBox_CenterImage, null, null, null, true, 80, 0, Colors.White);
		}
		this.Text = new cText2D(0, 0, 0, this.OwnerComponent.TextColor, this.OwnerComponent.TextStyle, this.OwnerComponent.TextPunto, true, true, false, false);
	}
	,
	BaseObject: function ()
	{
		return cBaseComponentGraphic.prototype;
	}
	,
	Draw: function ()
	{
		var __Count = this.CameraList.Count();
		var __RealCoordinate = this.GetRealCoordinate();
		for (var i = 0; i < __Count; i++)
		{
			var __Camera = this.CameraList.GetItem(i);

			if (this.SpecialGraphic)
			{
				this.SpecialTextBox_LeftTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				this.SpecialTextBox_RightTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				this.SpecialTextBox_UpperTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				this.SpecialTextBox_BottomTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				this.SpecialTextBox_LeftBottomCornerTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				this.SpecialTextBox_RightBottomCornerTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				this.SpecialTextBox_LeftUpperCornerTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				this.SpecialTextBox_RightUpperCornerTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				this.SpecialTextBox_CenterTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);



				/*if (this.OwnerComponent.MouseDowned)
				{
				}
				else if (this.OwnerComponent.MouseOnMe)
				{
				}
				else if (this.OwnerComponent.Focused)
				{
				}
				else
				{*/
				this.SpecialTextBox_LeftTexture.Draw(__Camera, __RealCoordinate.X, __RealCoordinate.Y + 7, 7, this.OwnerComponent.Height - 14);
				this.SpecialTextBox_RightTexture.Draw(__Camera, __RealCoordinate.X + this.OwnerComponent.Width - 7, __RealCoordinate.Y + 7, 7, this.OwnerComponent.Height - 14);
				this.SpecialTextBox_UpperTexture.Draw(__Camera, __RealCoordinate.X + 7, __RealCoordinate.Y, this.OwnerComponent.Width - 14, 7);
				this.SpecialTextBox_BottomTexture.Draw(__Camera, __RealCoordinate.X + 7, __RealCoordinate.Y + this.OwnerComponent.Height - 7, this.OwnerComponent.Width - 14, 7);
				this.SpecialTextBox_LeftBottomCornerTexture.Draw(__Camera, __RealCoordinate.X, __RealCoordinate.Y + this.OwnerComponent.Height - 7, 7, 7);
				this.SpecialTextBox_RightBottomCornerTexture.Draw(__Camera, __RealCoordinate.X + this.OwnerComponent.Width - 7, __RealCoordinate.Y + this.OwnerComponent.Height - 7, 7, 7);
				this.SpecialTextBox_LeftUpperCornerTexture.Draw(__Camera, __RealCoordinate.X, __RealCoordinate.Y, 7, 7);
				this.SpecialTextBox_RightUpperCornerTexture.Draw(__Camera, __RealCoordinate.X + this.OwnerComponent.Width - 7, __RealCoordinate.Y, 7, 7);
				this.SpecialTextBox_CenterTexture.Draw(__Camera, __RealCoordinate.X + 7, __RealCoordinate.Y + 7, this.OwnerComponent.Width - 14, this.OwnerComponent.Height - 14);
				//}
			}
			else
			{
				cTextBoxGraphic.TextBox_LeftTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				cTextBoxGraphic.TextBox_RightTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				cTextBoxGraphic.TextBox_UpperTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				cTextBoxGraphic.TextBox_BottomTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				cTextBoxGraphic.TextBox_LeftBottomCornerTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				cTextBoxGraphic.TextBox_RightBottomCornerTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				cTextBoxGraphic.TextBox_LeftUpperCornerTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				cTextBoxGraphic.TextBox_RightUpperCornerTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				cTextBoxGraphic.TextBox_CenterTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);




				/*if (this.OwnerComponent.MouseDowned)
				{
				}
				else if (this.OwnerComponent.MouseOnMe)
				{
				}
				else if (this.OwnerComponent.Focused)
				{
				}
				else
				{*/
				cTextBoxGraphic.TextBox_LeftTexture.Draw(__Camera, __RealCoordinate.X, __RealCoordinate.Y + 7, 7, this.OwnerComponent.Height - 14);
				cTextBoxGraphic.TextBox_RightTexture.Draw(__Camera, __RealCoordinate.X + this.OwnerComponent.Width - 7, __RealCoordinate.Y + 7, 7, this.OwnerComponent.Height - 14);
				cTextBoxGraphic.TextBox_UpperTexture.Draw(__Camera, __RealCoordinate.X + 7, __RealCoordinate.Y, this.OwnerComponent.Width - 14, 7);
				cTextBoxGraphic.TextBox_BottomTexture.Draw(__Camera, __RealCoordinate.X + 7, __RealCoordinate.Y + this.OwnerComponent.Height - 7, this.OwnerComponent.Width - 14, 7);
				cTextBoxGraphic.TextBox_LeftBottomCornerTexture.Draw(__Camera, __RealCoordinate.X, __RealCoordinate.Y + this.OwnerComponent.Height - 7, 7, 7);
				cTextBoxGraphic.TextBox_RightBottomCornerTexture.Draw(__Camera, __RealCoordinate.X + this.OwnerComponent.Width - 7, __RealCoordinate.Y + this.OwnerComponent.Height - 7, 7, 7);
				cTextBoxGraphic.TextBox_LeftUpperCornerTexture.Draw(__Camera, __RealCoordinate.X, __RealCoordinate.Y, 7, 7);
				cTextBoxGraphic.TextBox_RightUpperCornerTexture.Draw(__Camera, __RealCoordinate.X + this.OwnerComponent.Width - 7, __RealCoordinate.Y, 7, 7);
				cTextBoxGraphic.TextBox_CenterTexture.Draw(__Camera, __RealCoordinate.X + 7, __RealCoordinate.Y + 7, this.OwnerComponent.Width - 14, this.OwnerComponent.Height - 14);
				//}
			}
		}
	}
	,
	DrawCursor: function (_Camera, _X, _Y, _TextStyle, _Punto)
	{
		if (this.OwnerComponent.Text != this.LastText)
		{
			this.CursorTimer = new Date();
			this.CursorDrawed = true;
			var __Width = StringUtils.GetWidth(this.OwnerComponent.Text, this.OwnerComponent.CursorPosisionIndex, _Punto);
			this.LastCursorCoordinateX = _X + __Width;
		}
		this.LastText = this.OwnerComponent.Text;
		var __Now = new Date();
		if ((__Now - this.CursorTimer) > 300)
		{
			if (!this.CursorDrawed)
			{
				this.CursorDrawed = true;
			}
			else
			{
				this.CursorDrawed = false;
			}
			this.CursorTimer = __Now;
			var __Width = StringUtils.GetWidth(this.OwnerComponent.Text, this.OwnerComponent.CursorPosisionIndex, _Punto);
			this.LastCursorCoordinateX = _X + __Width;
		}

		if (this.CursorDrawed)
		{
			_Camera.Canvas2dContent.strokeStyle = Colors.Black.toString();
			_Camera.Canvas2dContent.lineWidth = 1;
			_Camera.Canvas2dContent.beginPath();
			_Camera.Canvas2dContent.moveTo(this.LastCursorCoordinateX, _Y - (_Punto / 2) - 3);
			_Camera.Canvas2dContent.lineTo(this.LastCursorCoordinateX, _Y + (_Punto / 2) + 3);
			_Camera.Canvas2dContent.stroke();
		}
	}
	,
	DrawText: function ()
	{
		var __Count = this.CameraList.Count();
		var __RealCoordinate = this.GetRealCoordinate();
		for (var i = 0; i < __Count; i++)
		{
			var __Camera = this.CameraList.GetItem(i);

			if (this.OwnerComponent.Focused)
			{
				this.DrawCursor(__Camera, __RealCoordinate.X + 7, __RealCoordinate.Y + (this.OwnerComponent.Height / 2), this.OwnerComponent.TextStyle, this.OwnerComponent.TextPunto);
			}
			this.Text.Update(this.OwnerComponent.Text, __RealCoordinate.X + 7, __RealCoordinate.Y + (this.OwnerComponent.Height / 2), this.OwnerComponent.TextStyle, this.OwnerComponent.TextPunto, true);
			this.Text.Draw(__Camera);
		}
	}
	,
	Destroy: function ()
	{
		cBaseComponentGraphic.prototype.Destroy.call(this);
	}
}, {});




