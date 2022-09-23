
var cFormTitleBarGraphic = Class(cBaseComponentGraphic,
{
	ObjectType: ObjectTypes.cFormTitleBarGraphic
	,
	constructor: function (_OwnerComponent)
	{
		cFormTitleBarGraphic.BaseObject.constructor.call(this, _OwnerComponent);
		if (!cFormTitleBarGraphic.FormTitleBarImage)
		{
			cFormTitleBarGraphic.FormTitleBarTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(DefaultSceneSettings.ComponentSkin.FormSkin.FormTitleBarImage, null, null, null, true, 80, 0, Colors.White);

			cFormTitleBarGraphic.FormRigtUpperCornerTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(DefaultSceneSettings.ComponentSkin.FormSkin.FormRightUpperCorner, null, null, null, true, 80, 0, Colors.White);

			cFormTitleBarGraphic.FormLeftUpperCornerTexture = cFormTitleBarGraphic.RigtUpperCornerImage = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(DefaultSceneSettings.ComponentSkin.FormSkin.FormLeftUpperCorner, null, null, null, true, 80, 0, Colors.White);


			cFormTitleBarGraphic.FormLeftTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(DefaultSceneSettings.ComponentSkin.FormSkin.FormLeftImage, null, null, null, true, 80, 0, Colors.White);


			cFormTitleBarGraphic.FormRightTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(DefaultSceneSettings.ComponentSkin.FormSkin.FormRightImage, null, null, null, true, 80, 0, Colors.White);

			cFormTitleBarGraphic.FormBottomTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(DefaultSceneSettings.ComponentSkin.FormSkin.FormBottom, null, null, null, true, 80, 0, Colors.White);

			cFormTitleBarGraphic.FormRightBottomCornerTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(DefaultSceneSettings.ComponentSkin.FormSkin.FormRightBottomCorner, null, null, null, true, 80, 0, Colors.White);

			cFormTitleBarGraphic.FormLeftBottomCornerTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(DefaultSceneSettings.ComponentSkin.FormSkin.FormLeftBottomCorner, null, null, null, true, 80, 0, Colors.White);

		}

		this.Text = new cText2D(this.OwnerComponent.OwnerComponent.Text, 0, 0, this.OwnerComponent.OwnerComponent.TextColor, this.OwnerComponent.OwnerComponent.TextStyle, this.OwnerComponent.OwnerComponent.TextPunto, true);
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
		var __FormRealCoordinate = this.OwnerComponent.OwnerComponent.ComponentGraphic.GetRealCoordinate();
		for (var i = 0; i < __Count; i++)
		{
			var __Camera = this.CameraList.GetItem(i);

			cFormTitleBarGraphic.FormTitleBarTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
			cFormTitleBarGraphic.FormLeftUpperCornerTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
			cFormTitleBarGraphic.FormRigtUpperCornerTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
			cFormTitleBarGraphic.FormLeftTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
			cFormTitleBarGraphic.FormRightTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
			cFormTitleBarGraphic.FormBottomTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
			cFormTitleBarGraphic.FormLeftBottomCornerTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
			cFormTitleBarGraphic.FormRightBottomCornerTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);


			cFormTitleBarGraphic.FormTitleBarTexture.Draw(__Camera, __RealCoordinate.X + 7, __RealCoordinate.Y, this.OwnerComponent.Width - 14, DefaultSceneSettings.FormTitleBarHeigth);
			cFormTitleBarGraphic.FormLeftUpperCornerTexture.Draw(__Camera, __RealCoordinate.X, __RealCoordinate.Y, 7, DefaultSceneSettings.FormTitleBarHeigth);
			cFormTitleBarGraphic.FormRigtUpperCornerTexture.Draw(__Camera, __RealCoordinate.X + this.OwnerComponent.Width - 7, __RealCoordinate.Y, 7, DefaultSceneSettings.FormTitleBarHeigth);
			cFormTitleBarGraphic.FormLeftTexture.Draw(__Camera, __FormRealCoordinate.X, __FormRealCoordinate.Y, 7, this.OwnerComponent.OwnerComponent.Height - 7);
			cFormTitleBarGraphic.FormRightTexture.Draw(__Camera, __FormRealCoordinate.X + this.OwnerComponent.OwnerComponent.Width - 7, __FormRealCoordinate.Y, 7, this.OwnerComponent.OwnerComponent.Height - 7);
			cFormTitleBarGraphic.FormBottomTexture.Draw(__Camera, __FormRealCoordinate.X + 7, __FormRealCoordinate.Y + this.OwnerComponent.OwnerComponent.Height - 7, this.OwnerComponent.OwnerComponent.Width - 14, 7);
			cFormTitleBarGraphic.FormLeftBottomCornerTexture.Draw(__Camera, __FormRealCoordinate.X, __FormRealCoordinate.Y + this.OwnerComponent.OwnerComponent.Height - 7, 7, 7);
			cFormTitleBarGraphic.FormRightBottomCornerTexture.Draw(__Camera, __FormRealCoordinate.X + this.OwnerComponent.OwnerComponent.Width - 7, __FormRealCoordinate.Y + this.OwnerComponent.OwnerComponent.Height - 7, 7, 7);

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

			this.Text.Update(this.OwnerComponent.OwnerComponent.Text, __RealCoordinate.X + 7, __RealCoordinate.Y + (this.OwnerComponent.Height / 2), this.OwnerComponent.TextStyle, this.OwnerComponent.TextPunto, true);
			this.Text.Draw(__Camera);

		}
	}
	,
	Destroy: function ()
	{
		cBaseComponentGraphic.prototype.Destroy.call(this);
	}
}, {});




