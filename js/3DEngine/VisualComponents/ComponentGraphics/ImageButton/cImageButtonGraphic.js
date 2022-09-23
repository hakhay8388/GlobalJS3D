
var cImageButtonGraphic = Class(cBaseComponentGraphic,
{
	ObjectType: ObjectTypes.cImageButtonGraphic
	, Text: null
	, SpecialGraphic: false
	, SpecialButtonFreeTexture: null
	, SpecialButtonFreeMouseOnMoveTexture: null
	, SpecialButtonClickedTexture: null
	, SpecialButtonFocusedTexture: null
	,
	constructor: function (_OwnerComponent, _ButtonFreeImage, _ButtonOnMouseFreeImage, _ButtonClickedImage, _ButtonFocusedImage)
	{
		cImageButtonGraphic.BaseObject.constructor.call(this, _OwnerComponent);
		if (_ButtonFreeImage && _ButtonOnMouseFreeImage && _ButtonClickedImage && _ButtonFocusedImage)
		{
			this.SpecialGraphic = true
			this.SpecialButtonFreeTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(_ButtonFreeImage, null, null, null, true, 80, 0, Colors.White);

			this.SpecialButtonFreeMouseOnMoveTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(_ButtonOnMouseFreeImage, null, null, null, true, 80, 0, Colors.White);

			this.SpecialButtonClickedTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(_ButtonClickedImage, null, null, null, true, 80, 0, Colors.White);

			this.SpecialButtonFocusedTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(_ButtonFocusedImage, null, null, null, true, 80, 0, Colors.White);
		}
		else if (!cImageButtonGraphic.ButtonFreeImage)
		{
			cImageButtonGraphic.ButtonFreeTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(DefaultSceneSettings.ComponentSkin.ImageButtonSkin.ImageButtonFreeImage, null, null, null, true, 80, 0, Colors.White);

			cImageButtonGraphic.ButtonFreeMouseOnMoveTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(DefaultSceneSettings.ComponentSkin.ImageButtonSkin.ImageButtonOnMouseFreeImage, null, null, null, true, 80, 0, Colors.White);

			cImageButtonGraphic.ButtonClickedTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(DefaultSceneSettings.ComponentSkin.ImageButtonSkin.ImageButtonClickedImage, null, null, null, true, 80, 0, Colors.White);

			cImageButtonGraphic.ButtonFocusedTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(DefaultSceneSettings.ComponentSkin.ImageButtonSkin.ImageButtonFocusedImage, null, null, null, true, 80, 0, Colors.White);

		}
		this.Text = new cText2D(0, 0, 0, this.OwnerComponent.TextColor, this.OwnerComponent.TextStyle, this.OwnerComponent.TextPunto, true, false, false, true);
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
				this.SpecialButtonFreeTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				this.SpecialButtonFreeMouseOnMoveTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				this.SpecialButtonClickedTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				this.SpecialButtonFocusedTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);

				if (this.OwnerComponent.MouseDowned)
				{
					this.SpecialButtonClickedTexture.Draw(__Camera, __RealCoordinate.X, __RealCoordinate.Y, this.OwnerComponent.Width, this.OwnerComponent.Height);
				}
				else if (this.OwnerComponent.MouseOnMe)
				{
					this.SpecialButtonFreeMouseOnMoveTexture.Draw(__Camera, __RealCoordinate.X, __RealCoordinate.Y, this.OwnerComponent.Width, this.OwnerComponent.Height);
				}
				else if (this.OwnerComponent.Focused)
				{
					this.SpecialButtonFocusedTexture.Draw(__Camera, __RealCoordinate.X, __RealCoordinate.Y, this.OwnerComponent.Width, this.OwnerComponent.Height);
				}
				else
				{
					this.SpecialButtonFreeTexture.Draw(__Camera, __RealCoordinate.X, __RealCoordinate.Y, this.OwnerComponent.Width, this.OwnerComponent.Height);
				}
			}
			else
			{
				cImageButtonGraphic.ButtonFreeTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				cImageButtonGraphic.ButtonFreeMouseOnMoveTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				cImageButtonGraphic.ButtonClickedTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				cImageButtonGraphic.ButtonFocusedTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);

				if (this.OwnerComponent.MouseDowned)
				{
					cImageButtonGraphic.ButtonClickedTexture.Draw(__Camera, __RealCoordinate.X, __RealCoordinate.Y, this.OwnerComponent.Width, this.OwnerComponent.Height);
				}
				else if (this.OwnerComponent.MouseOnMe)
				{
					cImageButtonGraphic.ButtonFreeMouseOnMoveTexture.Draw(__Camera, __RealCoordinate.X, __RealCoordinate.Y, this.OwnerComponent.Width, this.OwnerComponent.Height);
				}
				else if (this.OwnerComponent.Focused)
				{
					cImageButtonGraphic.ButtonFocusedTexture.Draw(__Camera, __RealCoordinate.X, __RealCoordinate.Y, this.OwnerComponent.Width, this.OwnerComponent.Height);
				}
				else
				{
					cImageButtonGraphic.ButtonFreeTexture.Draw(__Camera, __RealCoordinate.X, __RealCoordinate.Y, this.OwnerComponent.Width, this.OwnerComponent.Height);
				}
			}
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

			this.Text.Update(this.OwnerComponent.Text, __RealCoordinate.X + (this.OwnerComponent.Width / 2), __RealCoordinate.Y + (this.OwnerComponent.Height / 2), this.OwnerComponent.TextStyle, this.OwnerComponent.TextPunto, true);
			this.Text.Draw(__Camera);
		}
	}
	,
	Destroy: function ()
	{
		cBaseComponentGraphic.prototype.Destroy.call(this);
	}
}, {});




