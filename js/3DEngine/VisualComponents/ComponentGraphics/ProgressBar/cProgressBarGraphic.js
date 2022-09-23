
var cProgressBarGraphic = Class(cBaseComponentGraphic,
{
	ObjectType: ObjectTypes.cProgressBarGraphic
	, ProgressFreeBarImage: null
	, ProgressFullBarImage: null
	, Text: null
	,
	constructor: function (_OwnerComponent)
	{
		cProgressBarGraphic.BaseObject.constructor.call(this, _OwnerComponent);
		if (!cProgressBarGraphic.ProgressFreeBarImage && !cProgressBarGraphic.ProgressFullBarImage)
		{
			cProgressBarGraphic.ProgressFreeBarImage = new Image();
			cProgressBarGraphic.ProgressFreeBarImage.src = DefaultSceneSettings.ComponentSkin.ProgressBarSkin.ProgressBarBackGroundImage;
			cProgressBarGraphic.ProgressFullBarImage = new Image();
			cProgressBarGraphic.ProgressFullBarImage.src = DefaultSceneSettings.ComponentSkin.ProgressBarSkin.ProgressBarPercentImage;
		}
		this.Text = new cText2D(0, 0, 0, this.OwnerComponent.TextColor, this.OwnerComponent.TextStyle, this.OwnerComponent.TextPunto, true, false, false , true);
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

			__Camera.Canvas2dContent.drawImage(cProgressBarGraphic.ProgressFreeBarImage, __RealCoordinate.X, __RealCoordinate.Y, this.OwnerComponent.Width, this.OwnerComponent.Height);
			if (this.OwnerComponent.Percent > 100)
			{
				this.OwnerComponent.Percent = 100;
			}
			else if (this.OwnerComponent.Percent < 0)
			{
				this.OwnerComponent.Percent = 0;
			}
			__Camera.Canvas2dContent.drawImage(cProgressBarGraphic.ProgressFullBarImage, __RealCoordinate.X, __RealCoordinate.Y, ((this.OwnerComponent.Width / 100) * this.OwnerComponent.Percent), this.OwnerComponent.Height);
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

			this.Text.Update(this.OwnerComponent.Percent, __RealCoordinate.X + (this.OwnerComponent.Width / 2), __RealCoordinate.Y + (this.OwnerComponent.Height / 2), this.OwnerComponent.TextStyle, this.OwnerComponent.TextPunto, true);
			this.Text.Draw(__Camera);
		}
	}	
	,
	MovePenPath: function (_Camera, _X1, _Y1, _X2, _Y2, _X3, _Y3, _X4, _Y4)
	{
		//_Camera.Canvas2dContent.globalAlpha = 2.1;
		_Camera.Canvas2dContent.beginPath();
		_Camera.Canvas2dContent.moveTo(_X1, _Y1);
		_Camera.Canvas2dContent.lineTo(_X2, _Y2);
		_Camera.Canvas2dContent.lineTo(_X3, _Y3);
		_Camera.Canvas2dContent.lineTo(_X4, _Y4);
		_Camera.Canvas2dContent.closePath();
	}
	,
	Destroy: function ()
	{
		cBaseComponentGraphic.prototype.Destroy.call(this);
	}
}, {});




