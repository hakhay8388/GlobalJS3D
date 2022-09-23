
var cFormGraphic = Class(cBaseComponentGraphic,
{
	ObjectType: ObjectTypes.cFormGraphic
	,
	constructor: function (_OwnerComponent)
	{
		cFormGraphic.BaseObject.constructor.call(this, _OwnerComponent);
		if (!cFormGraphic.FormImage)
		{
			cFormGraphic.FormTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(DefaultSceneSettings.ComponentSkin.FormSkin.FormBackGroundImage, null, null, null, true, 80, 0, Colors.White);


		/*	cFormGraphic.FormLeftTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(DefaultSceneSettings.ComponentSkin.FormLeftImage, null, null, null, true, 80, 0, Colors.White);


			cFormGraphic.FormRightTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(DefaultSceneSettings.ComponentSkin.FormRightImage, null, null, null, true, 80, 0, Colors.White);

			cFormGraphic.FormBottomTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(DefaultSceneSettings.ComponentSkin.FormBottom, null, null, null, true, 80, 0, Colors.White);

			cFormGraphic.RightCornerTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(DefaultSceneSettings.ComponentSkin.RightBottomCorner, null, null, null, true, 80, 0, Colors.White);

			cFormGraphic.LeftCornerTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(DefaultSceneSettings.ComponentSkin.LeftBottomCorner, null, null, null, true, 80, 0, Colors.White);*/

		}
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

			cFormGraphic.FormTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);

			cFormGraphic.FormTexture.Draw(__Camera, __RealCoordinate.X + 7, __RealCoordinate.Y, this.OwnerComponent.Width - 14, this.OwnerComponent.Height - 7);

		/*	cFormGraphic.FormLeftTexture.Draw(__Camera, __RealCoordinate.X, __RealCoordinate.Y, 7, this.OwnerComponent.Height - 7);

			cFormGraphic.FormRightTexture.Draw(__RealCoordinate.X + this.OwnerComponent.Width - 7, __RealCoordinate.Y, 7, this.OwnerComponent.Height - 7);

			cFormGraphic.FormBottomTexture.Draw(__RealCoordinate.X + 7, __RealCoordinate.Y + this.OwnerComponent.Height - 7, this.OwnerComponent.Width - 7, 7);

			cFormGraphic.RightCornerTexture.Draw(__RealCoordinate.X, __RealCoordinate.Y + this.OwnerComponent.Height - 7, 7, 7);

			cFormGraphic.LeftCornerTexture.Draw(cFormGraphic.RightCorner, __RealCoordinate.X + this.OwnerComponent.Width - 7, __RealCoordinate.Y + this.OwnerComponent.Height - 7, 7, 7);
			*/
			
		}
	}
	,
	DrawText: function ()
	{
	}
	,
	Destroy: function ()
	{
		cBaseComponentGraphic.prototype.Destroy.call(this);
	}
}, {});




