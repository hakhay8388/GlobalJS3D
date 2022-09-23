
var cButtonGraphic = Class(cBaseComponentGraphic,
{
	ObjectType: ObjectTypes.cButtonGraphic
	, Text: null
	, SpecialGraphic: false

	, SpecialFreeButton_LeftTexture: null
	, SpecialFreeButton_RightTexture: null
	, SpecialFreeButton_UpperTexture: null
	, SpecialFreeButton_BottomTexture: null
	, SpecialFreeButton_LeftBottomCornerTexture: null
	, SpecialFreeButton_RightBottomCornerTexture: null
	, SpecialFreeButton_LeftUpperCornerTexture: null
	, SpecialFreeButton_RightUpperCornerTexture: null
	, SpecialFreeButton_CenterTexture: null

	, SpecialMouseOnButton_LeftTexture: null
	, SpecialMouseOnButton_RightTexture: null
	, SpecialMouseOnButton_UpperTexture: null
	, SpecialMouseOnButton_BottomTexture: null
	, SpecialMouseOnButton_LeftBottomCornerTexture: null
	, SpecialMouseOnButton_RightBottomCornerTexture: null
	, SpecialMouseOnButton_LeftUpperCornerTexture: null
	, SpecialMouseOnButton_RightUpperCornerTexture: null
	, SpecialMouseOnButton_CenterTexture: null

	, SpecialFocusedButton_LeftTexture: null
	, SpecialFocusedButton_RightTexture: null
	, SpecialFocusedButton_UpperTexture: null
	, SpecialFocusedButton_BottomTexture: null
	, SpecialFocusedButton_LeftBottomCornerTexture: null
	, SpecialFocusedButton_RightBottomCornerTexture: null
	, SpecialFocusedButton_LeftUpperCornerTexture: null
	, SpecialFocusedButton_RightUpperCornerTexture: null
	, SpecialFocusedButton_CenterTexture: null

	, SpecialClickedButton_LeftTexture: null
	, SpecialClickedButton_RightTexture: null
	, SpecialClickedButton_UpperTexture: null
	, SpecialClickedButton_BottomTexture: null
	, SpecialClickedButton_LeftBottomCornerTexture: null
	, SpecialClickedButton_RightBottomCornerTexture: null
	, SpecialClickedButton_LeftUpperCornerTexture: null
	, SpecialClickedButton_RightUpperCornerTexture: null
	, SpecialClickedButton_CenterTexture: null
	,
	constructor: function (_OwnerComponent
		, _FreeButton_Left
		, _FreeButton_Right
		, _FreeButton_Upper
		, _FreeButton_Bottom
		, _FreeButton_LeftBottomCorner
		, _FreeButton_RightBottomCorner
		, _FreeButton_LeftUpperCorner
		, _FreeButton_RightUpperCorner
		, _FreeButton_Center

		, _MouseOnButton_Left
		, _MouseOnButton_Right
		, _MouseOnButton_Upper
		, _MouseOnButton_Bottom
		, _MouseOnButton_LeftBottomCorner
		, _MouseOnButton_RightBottomCorner
		, _MouseOnButton_LeftUpperCorner
		, _MouseOnButton_RightUpperCorner
		, _MouseOnButton_Center

		, _FocusedButton_Left
		, _FocusedButton_Right
		, _FocusedButton_Upper
		, _FocusedButton_Bottom
		, _FocusedButton_LeftBottomCorner
		, _FocusedButton_RightBottomCorner
		, _FocusedButton_LeftUpperCorner
		, _FocusedButton_RightUpperCorner
		, _FocusedButton_Center

		, _ClickedButton_Left
		, _ClickedButton_Right
		, _ClickedButton_Upper
		, _ClickedButton_Bottom
		, _ClickedButton_LeftBottomCorner
		, _ClickedButton_RightBottomCorner
		, _ClickedButton_LeftUpperCorner
		, _ClickedButton_RightUpperCorner
		, _ClickedButton_Center)
	{
		cButtonGraphic.BaseObject.constructor.call(this, _OwnerComponent);

		if (_FreeButton_Left && _FreeButton_Right && _FreeButton_Upper && _FreeButton_Bottom && _FreeButton_LeftBottomCorner && _FreeButton_RightBottomCorner && _FreeButton_LeftUpperCorner && _FreeButton_RightUpperCorner && _FreeButton_Center && _MouseOnButton_Left && _MouseOnButton_Right && _MouseOnButton_Upper && _MouseOnButton_Bottom && _MouseOnButton_LeftBottomCorner && _MouseOnButton_RightBottomCorner && _MouseOnButton_LeftUpperCorner && _MouseOnButton_RightUpperCorner && _MouseOnButton_Center && _FocusedButton_Left && _FocusedButton_Right && _FocusedButton_Upper && _FocusedButton_Bottom && _FocusedButton_LeftBottomCorner && _FocusedButton_RightBottomCorner && _FocusedButton_LeftUpperCorner && _FocusedButton_RightUpperCorner && _FocusedButton_Center && _ClickedButton_Left && _ClickedButton_Right
&& _ClickedButton_Upper && _ClickedButton_Bottom && _ClickedButton_LeftBottomCorner && _ClickedButton_RightBottomCorner && _ClickedButton_LeftUpperCorner && _ClickedButton_RightUpperCorner && _ClickedButton_Center)
		{
			this.SpecialGraphic = true;

			this.SpecialFreeButton_LeftTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(_FreeButton_Left, null, null, null, true, 80, 0, Colors.White);
			this.SpecialFreeButton_RightTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(_FreeButton_Right, null, null, null, true, 80, 0, Colors.White);
			this.SpecialFreeButton_UpperTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(_FreeButton_Upper, null, null, null, true, 80, 0, Colors.White);
			this.SpecialFreeButton_BottomTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(_FreeButton_Bottom, null, null, null, true, 80, 0, Colors.White);
			this.SpecialFreeButton_LeftBottomCornerTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(_FreeButton_LeftBottomCorner, null, null, null, true, 80, 0, Colors.White);
			this.SpecialFreeButton_RightBottomCornerTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(_FreeButton_RightBottomCorner, null, null, null, true, 80, 0, Colors.White);
			this.SpecialFreeButton_LeftUpperCornerTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(_FreeButton_LeftUpperCorner, null, null, null, true, 80, 0, Colors.White);
			this.SpecialFreeButton_RightUpperCornerTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(_FreeButton_RightUpperCorner, null, null, null, true, 80, 0, Colors.White);
			this.SpecialFreeButton_CenterTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(_FreeButton_Center, null, null, null, true, 80, 0, Colors.White);


			this.SpecialMouseOnButton_LeftTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(_MouseOnButton_Left, null, null, null, true, 80, 0, Colors.White);
			this.SpecialMouseOnButton_RightTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(_MouseOnButton_Right, null, null, null, true, 80, 0, Colors.White);
			this.SpecialMouseOnButton_UpperTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(_MouseOnButton_Upper, null, null, null, true, 80, 0, Colors.White);
			this.SpecialMouseOnButton_BottomTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(_MouseOnButton_Bottom, null, null, null, true, 80, 0, Colors.White);
			this.SpecialMouseOnButton_LeftBottomCornerTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(_MouseOnButton_LeftBottomCorner, null, null, null, true, 80, 0, Colors.White);
			this.SpecialMouseOnButton_RightBottomCornerTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(_MouseOnButton_RightBottomCorner, null, null, null, true, 80, 0, Colors.White);
			this.SpecialMouseOnButton_LeftUpperCornerTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(_MouseOnButton_LeftUpperCorner, null, null, null, true, 80, 0, Colors.White);
			this.SpecialMouseOnButton_RightUpperCornerTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(_MouseOnButton_RightUpperCorner, null, null, null, true, 80, 0, Colors.White);
			this.SpecialMouseOnButton_CenterTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(_MouseOnButton_Center, null, null, null, true, 80, 0, Colors.White);


			this.SpecialFocusedButton_LeftTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(_FocusedButton_Left, null, null, null, true, 80, 0, Colors.White);
			this.SpecialFocusedButton_RightTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(_FocusedButton_Right, null, null, null, true, 80, 0, Colors.White);
			this.SpecialFocusedButton_UpperTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(_FocusedButton_Upper, null, null, null, true, 80, 0, Colors.White);
			this.SpecialFocusedButton_BottomTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(_FocusedButton_Bottom, null, null, null, true, 80, 0, Colors.White);
			this.SpecialFocusedButton_LeftBottomCornerTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(_FocusedButton_LeftBottomCorner, null, null, null, true, 80, 0, Colors.White);
			this.SpecialFocusedButton_RightBottomCornerTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(_FocusedButton_RightBottomCorner, null, null, null, true, 80, 0, Colors.White);
			this.SpecialFocusedButton_LeftUpperCornerTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(_FocusedButton_LeftUpperCorner, null, null, null, true, 80, 0, Colors.White);
			this.SpecialFocusedButton_RightUpperCornerTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(_FocusedButton_RightUpperCorner, null, null, null, true, 80, 0, Colors.White);
			this.SpecialFocusedButton_CenterTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(_FocusedButton_Center, null, null, null, true, 80, 0, Colors.White);


			this.SpecialClickedButton_LeftTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(_ClickedButton_Left, null, null, null, true, 80, 0, Colors.White);
			this.SpecialClickedButton_RightTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(_ClickedButton_Right, null, null, null, true, 80, 0, Colors.White);
			this.SpecialClickedButton_UpperTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(_ClickedButton_Upper, null, null, null, true, 80, 0, Colors.White);
			this.SpecialClickedButton_BottomTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(_ClickedButton_Bottom, null, null, null, true, 80, 0, Colors.White);
			this.SpecialClickedButton_LeftBottomCornerTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(_ClickedButton_LeftBottomCorner, null, null, null, true, 80, 0, Colors.White);
			this.SpecialClickedButton_RightBottomCornerTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(_ClickedButton_RightBottomCorner, null, null, null, true, 80, 0, Colors.White);
			this.SpecialClickedButton_LeftUpperCornerTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(_ClickedButton_LeftUpperCorner, null, null, null, true, 80, 0, Colors.White);
			this.SpecialClickedButton_RightUpperCornerTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(_ClickedButton_RightUpperCorner, null, null, null, true, 80, 0, Colors.White);
			this.SpecialClickedButton_CenterTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(_ClickedButton_Center, null, null, null, true, 80, 0, Colors.White);
		}
		else if (!cButtonGraphic.ButtonFreeImage)
		{
			cButtonGraphic.FreeButton_LeftTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(DefaultSceneSettings.ComponentSkin.ButtonSkin.FreeButton_LeftImage, null, null, null, true, 80, 0, Colors.White);
			cButtonGraphic.FreeButton_RightTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(DefaultSceneSettings.ComponentSkin.ButtonSkin.FreeButton_RightImage, null, null, null, true, 80, 0, Colors.White);
			cButtonGraphic.FreeButton_UpperTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(DefaultSceneSettings.ComponentSkin.ButtonSkin.FreeButton_UpperImage, null, null, null, true, 80, 0, Colors.White);
			cButtonGraphic.FreeButton_BottomTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(DefaultSceneSettings.ComponentSkin.ButtonSkin.FreeButton_BottomImage, null, null, null, true, 80, 0, Colors.White);
			cButtonGraphic.FreeButton_LeftBottomCornerTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(DefaultSceneSettings.ComponentSkin.ButtonSkin.FreeButton_LeftBottomCornerImage, null, null, null, true, 80, 0, Colors.White);
			cButtonGraphic.FreeButton_RightBottomCornerTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(DefaultSceneSettings.ComponentSkin.ButtonSkin.FreeButton_RightBottomCornerImage, null, null, null, true, 80, 0, Colors.White);
			cButtonGraphic.FreeButton_LeftUpperCornerTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(DefaultSceneSettings.ComponentSkin.ButtonSkin.FreeButton_LeftUpperCornerImage, null, null, null, true, 80, 0, Colors.White);
			cButtonGraphic.FreeButton_RightUpperCornerTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(DefaultSceneSettings.ComponentSkin.ButtonSkin.FreeButton_RightUpperCornerImage, null, null, null, true, 80, 0, Colors.White);
			cButtonGraphic.FreeButton_CenterTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(DefaultSceneSettings.ComponentSkin.ButtonSkin.FreeButton_CenterImage, null, null, null, true, 80, 0, Colors.White);

			cButtonGraphic.MouseOnButton_LeftTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(DefaultSceneSettings.ComponentSkin.ButtonSkin.MouseOnButton_LeftImage, null, null, null, true, 80, 0, Colors.White);
			cButtonGraphic.MouseOnButton_RightTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(DefaultSceneSettings.ComponentSkin.ButtonSkin.MouseOnButton_RightImage, null, null, null, true, 80, 0, Colors.White);
			cButtonGraphic.MouseOnButton_UpperTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(DefaultSceneSettings.ComponentSkin.ButtonSkin.MouseOnButton_UpperImage, null, null, null, true, 80, 0, Colors.White);
			cButtonGraphic.MouseOnButton_BottomTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(DefaultSceneSettings.ComponentSkin.ButtonSkin.MouseOnButton_BottomImage, null, null, null, true, 80, 0, Colors.White);
			cButtonGraphic.MouseOnButton_LeftBottomCornerTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(DefaultSceneSettings.ComponentSkin.ButtonSkin.MouseOnButton_LeftBottomCornerImage, null, null, null, true, 80, 0, Colors.White);
			cButtonGraphic.MouseOnButton_RightBottomCornerTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(DefaultSceneSettings.ComponentSkin.ButtonSkin.MouseOnButton_RightBottomCornerImage, null, null, null, true, 80, 0, Colors.White);
			cButtonGraphic.MouseOnButton_LeftUpperCornerTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(DefaultSceneSettings.ComponentSkin.ButtonSkin.MouseOnButton_LeftUpperCornerImage, null, null, null, true, 80, 0, Colors.White);
			cButtonGraphic.MouseOnButton_RightUpperCornerTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(DefaultSceneSettings.ComponentSkin.ButtonSkin.MouseOnButton_RightUpperCornerImage, null, null, null, true, 80, 0, Colors.White);
			cButtonGraphic.MouseOnButton_CenterTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(DefaultSceneSettings.ComponentSkin.ButtonSkin.MouseOnButton_CenterImage, null, null, null, true, 80, 0, Colors.White);


			cButtonGraphic.FocusedButton_LeftTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(DefaultSceneSettings.ComponentSkin.ButtonSkin.FocusedButton_LeftImage, null, null, null, true, 80, 0, Colors.White);
			cButtonGraphic.FocusedButton_RightTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(DefaultSceneSettings.ComponentSkin.ButtonSkin.FocusedButton_RightImage, null, null, null, true, 80, 0, Colors.White);
			cButtonGraphic.FocusedButton_UpperTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(DefaultSceneSettings.ComponentSkin.ButtonSkin.FocusedButton_UpperImage, null, null, null, true, 80, 0, Colors.White);
			cButtonGraphic.FocusedButton_BottomTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(DefaultSceneSettings.ComponentSkin.ButtonSkin.FocusedButton_BottomImage, null, null, null, true, 80, 0, Colors.White);
			cButtonGraphic.FocusedButton_LeftBottomCornerTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(DefaultSceneSettings.ComponentSkin.ButtonSkin.FocusedButton_LeftBottomCornerImage, null, null, null, true, 80, 0, Colors.White);
			cButtonGraphic.FocusedButton_RightBottomCornerTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(DefaultSceneSettings.ComponentSkin.ButtonSkin.FocusedButton_RightBottomCornerImage, null, null, null, true, 80, 0, Colors.White);
			cButtonGraphic.FocusedButton_LeftUpperCornerTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(DefaultSceneSettings.ComponentSkin.ButtonSkin.FocusedButton_LeftUpperCornerImage, null, null, null, true, 80, 0, Colors.White);
			cButtonGraphic.FocusedButton_RightUpperCornerTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(DefaultSceneSettings.ComponentSkin.ButtonSkin.FocusedButton_RightUpperCornerImage, null, null, null, true, 80, 0, Colors.White);
			cButtonGraphic.FocusedButton_CenterTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(DefaultSceneSettings.ComponentSkin.ButtonSkin.FocusedButton_CenterImage, null, null, null, true, 80, 0, Colors.White);


			cButtonGraphic.ClickedButton_LeftTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(DefaultSceneSettings.ComponentSkin.ButtonSkin.ClickedButton_LeftImage, null, null, null, true, 80, 0, Colors.White);
			cButtonGraphic.ClickedButton_RightTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(DefaultSceneSettings.ComponentSkin.ButtonSkin.ClickedButton_RightImage, null, null, null, true, 80, 0, Colors.White);
			cButtonGraphic.ClickedButton_UpperTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(DefaultSceneSettings.ComponentSkin.ButtonSkin.ClickedButton_UpperImage, null, null, null, true, 80, 0, Colors.White);
			cButtonGraphic.ClickedButton_BottomTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(DefaultSceneSettings.ComponentSkin.ButtonSkin.ClickedButton_BottomImage, null, null, null, true, 80, 0, Colors.White);
			cButtonGraphic.ClickedButton_LeftBottomCornerTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(DefaultSceneSettings.ComponentSkin.ButtonSkin.ClickedButton_LeftBottomCornerImage, null, null, null, true, 80, 0, Colors.White);
			cButtonGraphic.ClickedButton_RightBottomCornerTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(DefaultSceneSettings.ComponentSkin.ButtonSkin.ClickedButton_RightBottomCornerImage, null, null, null, true, 80, 0, Colors.White);
			cButtonGraphic.ClickedButton_LeftUpperCornerTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(DefaultSceneSettings.ComponentSkin.ButtonSkin.ClickedButton_LeftUpperCornerImage, null, null, null, true, 80, 0, Colors.White);
			cButtonGraphic.ClickedButton_RightUpperCornerTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(DefaultSceneSettings.ComponentSkin.ButtonSkin.ClickedButton_RightUpperCornerImage, null, null, null, true, 80, 0, Colors.White);
			cButtonGraphic.ClickedButton_CenterTexture = this.OwnerComponent.ComponentController.OwnerScene.CreateComponentTexture(DefaultSceneSettings.ComponentSkin.ButtonSkin.ClickedButton_CenterImage, null, null, null, true, 80, 0, Colors.White);

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
				this.SpecialFreeButton_LeftTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				this.SpecialFreeButton_RightTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				this.SpecialFreeButton_UpperTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				this.SpecialFreeButton_BottomTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				this.SpecialFreeButton_LeftBottomCornerTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				this.SpecialFreeButton_RightBottomCornerTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				this.SpecialFreeButton_LeftUpperCornerTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				this.SpecialFreeButton_RightUpperCornerTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				this.SpecialFreeButton_CenterTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
					 
				this.SpecialMouseOnButton_LeftTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				this.SpecialMouseOnButton_RightTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				this.SpecialMouseOnButton_UpperTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				this.SpecialMouseOnButton_BottomTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				this.SpecialMouseOnButton_LeftBottomCornerTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				this.SpecialMouseOnButton_RightBottomCornerTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				this.SpecialMouseOnButton_LeftUpperCornerTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				this.SpecialMouseOnButton_RightUpperCornerTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				this.SpecialMouseOnButton_CenterTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
					 
				this.SpecialFocusedButton_LeftTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				this.SpecialFocusedButton_RightTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				this.SpecialFocusedButton_UpperTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				this.SpecialFocusedButton_BottomTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				this.SpecialFocusedButton_LeftBottomCornerTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				this.SpecialFocusedButton_RightBottomCornerTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				this.SpecialFocusedButton_LeftUpperCornerTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				this.SpecialFocusedButton_RightUpperCornerTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				this.SpecialFocusedButton_CenterTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
					 
				this.SpecialClickedButton_LeftTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				this.SpecialClickedButton_RightTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				this.SpecialClickedButton_UpperTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				this.SpecialClickedButton_BottomTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				this.SpecialClickedButton_LeftBottomCornerTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				this.SpecialClickedButton_RightBottomCornerTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				this.SpecialClickedButton_LeftUpperCornerTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				this.SpecialClickedButton_RightUpperCornerTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				this.SpecialClickedButton_CenterTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);


				if (this.OwnerComponent.MouseDowned)
				{
					this.SpecialClickedButton_LeftTexture.Draw(__Camera, __RealCoordinate.X, __RealCoordinate.Y + 7, 7, this.OwnerComponent.Height - 14);
					this.SpecialClickedButton_RightTexture.Draw(__Camera, __RealCoordinate.X + this.OwnerComponent.Width - 7, __RealCoordinate.Y + 7, 7, this.OwnerComponent.Height - 14);
					this.SpecialClickedButton_UpperTexture.Draw(__Camera, __RealCoordinate.X + 7, __RealCoordinate.Y, this.OwnerComponent.Width - 14, 7);
					this.SpecialClickedButton_BottomTexture.Draw(__Camera, __RealCoordinate.X + 7, __RealCoordinate.Y + this.OwnerComponent.Height - 7, this.OwnerComponent.Width - 14, 7);
					this.SpecialClickedButton_LeftBottomCornerTexture.Draw(__Camera, __RealCoordinate.X, __RealCoordinate.Y + this.OwnerComponent.Height - 7, 7, 7);
					this.SpecialClickedButton_RightBottomCornerTexture.Draw(__Camera, __RealCoordinate.X + this.OwnerComponent.Width - 7, __RealCoordinate.Y + this.OwnerComponent.Height - 7, 7, 7);
					this.SpecialClickedButton_LeftUpperCornerTexture.Draw(__Camera, __RealCoordinate.X, __RealCoordinate.Y, 7, 7);
					this.SpecialClickedButton_RightUpperCornerTexture.Draw(__Camera, __RealCoordinate.X + this.OwnerComponent.Width - 7, __RealCoordinate.Y, 7, 7);
					this.SpecialClickedButton_CenterTexture.Draw(__Camera, __RealCoordinate.X + 7, __RealCoordinate.Y + 7, this.OwnerComponent.Width - 14, this.OwnerComponent.Height - 14);
				}
				else if (this.OwnerComponent.MouseOnMe)
				{
					this.SpecialMouseOnButton_LeftTexture.Draw(__Camera, __RealCoordinate.X, __RealCoordinate.Y + 7, 7, this.OwnerComponent.Height - 14);
					this.SpecialMouseOnButton_RightTexture.Draw(__Camera, __RealCoordinate.X + this.OwnerComponent.Width - 7, __RealCoordinate.Y + 7, 7, this.OwnerComponent.Height - 14);
					this.SpecialMouseOnButton_UpperTexture.Draw(__Camera, __RealCoordinate.X + 7, __RealCoordinate.Y, this.OwnerComponent.Width - 14, 7);
					this.SpecialMouseOnButton_BottomTexture.Draw(__Camera, __RealCoordinate.X + 7, __RealCoordinate.Y + this.OwnerComponent.Height - 7, this.OwnerComponent.Width - 14, 7);
					this.SpecialMouseOnButton_LeftBottomCornerTexture.Draw(__Camera, __RealCoordinate.X, __RealCoordinate.Y + this.OwnerComponent.Height - 7, 7, 7);
					this.SpecialMouseOnButton_RightBottomCornerTexture.Draw(__Camera, __RealCoordinate.X + this.OwnerComponent.Width - 7, __RealCoordinate.Y + this.OwnerComponent.Height - 7, 7, 7);
					this.SpecialMouseOnButton_LeftUpperCornerTexture.Draw(__Camera, __RealCoordinate.X, __RealCoordinate.Y, 7, 7);
					this.SpecialMouseOnButton_RightUpperCornerTexture.Draw(__Camera, __RealCoordinate.X + this.OwnerComponent.Width - 7, __RealCoordinate.Y, 7, 7);
					this.SpecialMouseOnButton_CenterTexture.Draw(__Camera, __RealCoordinate.X + 7, __RealCoordinate.Y + 7, this.OwnerComponent.Width - 14, this.OwnerComponent.Height - 14);
				}
				else if (this.OwnerComponent.Focused)
				{
					this.SpecialFocusedButton_LeftTexture.Draw(__Camera, __RealCoordinate.X, __RealCoordinate.Y + 7, 7, this.OwnerComponent.Height - 14);
					this.SpecialFocusedButton_RightTexture.Draw(__Camera, __RealCoordinate.X + this.OwnerComponent.Width - 7, __RealCoordinate.Y + 7, 7, this.OwnerComponent.Height - 14);
					this.SpecialFocusedButton_UpperTexture.Draw(__Camera, __RealCoordinate.X + 7, __RealCoordinate.Y, this.OwnerComponent.Width - 14, 7);
					this.SpecialFocusedButton_BottomTexture.Draw(__Camera, __RealCoordinate.X + 7, __RealCoordinate.Y + this.OwnerComponent.Height - 7, this.OwnerComponent.Width - 14, 7);
					this.SpecialFocusedButton_LeftBottomCornerTexture.Draw(__Camera, __RealCoordinate.X, __RealCoordinate.Y + this.OwnerComponent.Height - 7, 7, 7);
					this.SpecialFocusedButton_RightBottomCornerTexture.Draw(__Camera, __RealCoordinate.X + this.OwnerComponent.Width - 7, __RealCoordinate.Y + this.OwnerComponent.Height - 7, 7, 7);
					this.SpecialFocusedButton_LeftUpperCornerTexture.Draw(__Camera, __RealCoordinate.X, __RealCoordinate.Y, 7, 7);
					this.SpecialFocusedButton_RightUpperCornerTexture.Draw(__Camera, __RealCoordinate.X + this.OwnerComponent.Width - 7, __RealCoordinate.Y, 7, 7);
					this.SpecialFocusedButton_CenterTexture.Draw(__Camera, __RealCoordinate.X + 7, __RealCoordinate.Y + 7, this.OwnerComponent.Width - 14, this.OwnerComponent.Height - 14);
				}
				else
				{
					this.SpecialFreeButton_LeftTexture.Draw(__Camera, __RealCoordinate.X, __RealCoordinate.Y + 7, 7, this.OwnerComponent.Height - 14);
					this.SpecialFreeButton_RightTexture.Draw(__Camera, __RealCoordinate.X + this.OwnerComponent.Width - 7, __RealCoordinate.Y + 7, 7, this.OwnerComponent.Height - 14);
					this.SpecialFreeButton_UpperTexture.Draw(__Camera, __RealCoordinate.X + 7, __RealCoordinate.Y, this.OwnerComponent.Width - 14, 7);
					this.SpecialFreeButton_BottomTexture.Draw(__Camera, __RealCoordinate.X + 7, __RealCoordinate.Y + this.OwnerComponent.Height - 7, this.OwnerComponent.Width - 14, 7);
					this.SpecialFreeButton_LeftBottomCornerTexture.Draw(__Camera, __RealCoordinate.X, __RealCoordinate.Y + this.OwnerComponent.Height - 7, 7, 7);
					this.SpecialFreeButton_RightBottomCornerTexture.Draw(__Camera, __RealCoordinate.X + this.OwnerComponent.Width - 7, __RealCoordinate.Y + this.OwnerComponent.Height - 7, 7, 7);
					this.SpecialFreeButton_LeftUpperCornerTexture.Draw(__Camera, __RealCoordinate.X, __RealCoordinate.Y, 7, 7);
					this.SpecialFreeButton_RightUpperCornerTexture.Draw(__Camera, __RealCoordinate.X + this.OwnerComponent.Width - 7, __RealCoordinate.Y, 7, 7);
					this.SpecialFreeButton_CenterTexture.Draw(__Camera, __RealCoordinate.X + 7, __RealCoordinate.Y + 7, this.OwnerComponent.Width - 14, this.OwnerComponent.Height - 14);
				}
			}
			else
			{
				cButtonGraphic.FreeButton_LeftTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				cButtonGraphic.FreeButton_RightTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				cButtonGraphic.FreeButton_UpperTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				cButtonGraphic.FreeButton_BottomTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				cButtonGraphic.FreeButton_LeftBottomCornerTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				cButtonGraphic.FreeButton_RightBottomCornerTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				cButtonGraphic.FreeButton_LeftUpperCornerTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				cButtonGraphic.FreeButton_RightUpperCornerTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				cButtonGraphic.FreeButton_CenterTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);



				cButtonGraphic.MouseOnButton_LeftTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				cButtonGraphic.MouseOnButton_RightTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				cButtonGraphic.MouseOnButton_UpperTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				cButtonGraphic.MouseOnButton_BottomTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				cButtonGraphic.MouseOnButton_LeftBottomCornerTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				cButtonGraphic.MouseOnButton_RightBottomCornerTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				cButtonGraphic.MouseOnButton_LeftUpperCornerTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				cButtonGraphic.MouseOnButton_RightUpperCornerTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				cButtonGraphic.MouseOnButton_CenterTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);


				cButtonGraphic.FocusedButton_LeftTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				cButtonGraphic.FocusedButton_RightTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				cButtonGraphic.FocusedButton_UpperTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				cButtonGraphic.FocusedButton_BottomTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				cButtonGraphic.FocusedButton_LeftBottomCornerTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				cButtonGraphic.FocusedButton_RightBottomCornerTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				cButtonGraphic.FocusedButton_LeftUpperCornerTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				cButtonGraphic.FocusedButton_RightUpperCornerTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				cButtonGraphic.FocusedButton_CenterTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);


				cButtonGraphic.ClickedButton_LeftTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				cButtonGraphic.ClickedButton_RightTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				cButtonGraphic.ClickedButton_UpperTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				cButtonGraphic.ClickedButton_BottomTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				cButtonGraphic.ClickedButton_LeftBottomCornerTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				cButtonGraphic.ClickedButton_RightBottomCornerTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				cButtonGraphic.ClickedButton_LeftUpperCornerTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				cButtonGraphic.ClickedButton_RightUpperCornerTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);
				cButtonGraphic.ClickedButton_CenterTexture.UpdateTransparency(this.OwnerComponent.UseTransparency, this.OwnerComponent.Opacity, this.OwnerComponent.KeyColorOpacity, this.OwnerComponent.KeyColor);


				if (this.OwnerComponent.MouseDowned)
				{
					cButtonGraphic.ClickedButton_LeftTexture.Draw(__Camera, __RealCoordinate.X, __RealCoordinate.Y + 7, 7, this.OwnerComponent.Height - 14);
					cButtonGraphic.ClickedButton_RightTexture.Draw(__Camera, __RealCoordinate.X + this.OwnerComponent.Width - 7, __RealCoordinate.Y + 7, 7, this.OwnerComponent.Height - 14);
					cButtonGraphic.ClickedButton_UpperTexture.Draw(__Camera, __RealCoordinate.X + 7, __RealCoordinate.Y, this.OwnerComponent.Width - 14, 7);
					cButtonGraphic.ClickedButton_BottomTexture.Draw(__Camera, __RealCoordinate.X + 7, __RealCoordinate.Y + this.OwnerComponent.Height - 7, this.OwnerComponent.Width - 14, 7);
					cButtonGraphic.ClickedButton_LeftBottomCornerTexture.Draw(__Camera, __RealCoordinate.X, __RealCoordinate.Y + this.OwnerComponent.Height - 7, 7, 7);
					cButtonGraphic.ClickedButton_RightBottomCornerTexture.Draw(__Camera, __RealCoordinate.X + this.OwnerComponent.Width - 7, __RealCoordinate.Y + this.OwnerComponent.Height - 7, 7, 7);
					cButtonGraphic.ClickedButton_LeftUpperCornerTexture.Draw(__Camera, __RealCoordinate.X, __RealCoordinate.Y, 7, 7);
					cButtonGraphic.ClickedButton_RightUpperCornerTexture.Draw(__Camera, __RealCoordinate.X + this.OwnerComponent.Width - 7, __RealCoordinate.Y, 7, 7);
					cButtonGraphic.ClickedButton_CenterTexture.Draw(__Camera, __RealCoordinate.X + 7, __RealCoordinate.Y + 7, this.OwnerComponent.Width - 14, this.OwnerComponent.Height - 14);
				}
				else if (this.OwnerComponent.MouseOnMe)
				{
					cButtonGraphic.MouseOnButton_LeftTexture.Draw(__Camera, __RealCoordinate.X, __RealCoordinate.Y + 7, 7, this.OwnerComponent.Height - 14);
					cButtonGraphic.MouseOnButton_RightTexture.Draw(__Camera, __RealCoordinate.X + this.OwnerComponent.Width - 7, __RealCoordinate.Y + 7, 7, this.OwnerComponent.Height - 14);
					cButtonGraphic.MouseOnButton_UpperTexture.Draw(__Camera, __RealCoordinate.X + 7, __RealCoordinate.Y, this.OwnerComponent.Width - 14, 7);
					cButtonGraphic.MouseOnButton_BottomTexture.Draw(__Camera, __RealCoordinate.X + 7, __RealCoordinate.Y + this.OwnerComponent.Height - 7, this.OwnerComponent.Width - 14, 7);
					cButtonGraphic.MouseOnButton_LeftBottomCornerTexture.Draw(__Camera, __RealCoordinate.X, __RealCoordinate.Y + this.OwnerComponent.Height - 7, 7, 7);
					cButtonGraphic.MouseOnButton_RightBottomCornerTexture.Draw(__Camera, __RealCoordinate.X + this.OwnerComponent.Width - 7, __RealCoordinate.Y + this.OwnerComponent.Height - 7, 7, 7);
					cButtonGraphic.MouseOnButton_LeftUpperCornerTexture.Draw(__Camera, __RealCoordinate.X, __RealCoordinate.Y, 7, 7);
					cButtonGraphic.MouseOnButton_RightUpperCornerTexture.Draw(__Camera, __RealCoordinate.X + this.OwnerComponent.Width - 7, __RealCoordinate.Y, 7, 7);
					cButtonGraphic.MouseOnButton_CenterTexture.Draw(__Camera, __RealCoordinate.X + 7, __RealCoordinate.Y + 7, this.OwnerComponent.Width - 14, this.OwnerComponent.Height - 14);
				}
				else if (this.OwnerComponent.Focused)
				{
					cButtonGraphic.FocusedButton_LeftTexture.Draw(__Camera, __RealCoordinate.X, __RealCoordinate.Y + 7, 7, this.OwnerComponent.Height - 14);
					cButtonGraphic.FocusedButton_RightTexture.Draw(__Camera, __RealCoordinate.X + this.OwnerComponent.Width - 7, __RealCoordinate.Y + 7, 7, this.OwnerComponent.Height - 14);
					cButtonGraphic.FocusedButton_UpperTexture.Draw(__Camera, __RealCoordinate.X + 7, __RealCoordinate.Y, this.OwnerComponent.Width - 14, 7);
					cButtonGraphic.FocusedButton_BottomTexture.Draw(__Camera, __RealCoordinate.X + 7, __RealCoordinate.Y + this.OwnerComponent.Height - 7, this.OwnerComponent.Width - 14, 7);
					cButtonGraphic.FocusedButton_LeftBottomCornerTexture.Draw(__Camera, __RealCoordinate.X, __RealCoordinate.Y + this.OwnerComponent.Height - 7, 7, 7);
					cButtonGraphic.FocusedButton_RightBottomCornerTexture.Draw(__Camera, __RealCoordinate.X + this.OwnerComponent.Width - 7, __RealCoordinate.Y + this.OwnerComponent.Height - 7, 7, 7);
					cButtonGraphic.FocusedButton_LeftUpperCornerTexture.Draw(__Camera, __RealCoordinate.X, __RealCoordinate.Y, 7, 7);
					cButtonGraphic.FocusedButton_RightUpperCornerTexture.Draw(__Camera, __RealCoordinate.X + this.OwnerComponent.Width - 7, __RealCoordinate.Y, 7, 7);
					cButtonGraphic.FocusedButton_CenterTexture.Draw(__Camera, __RealCoordinate.X + 7, __RealCoordinate.Y + 7, this.OwnerComponent.Width - 14, this.OwnerComponent.Height - 14);
				}
				else
				{
					cButtonGraphic.FreeButton_LeftTexture.Draw(__Camera, __RealCoordinate.X, __RealCoordinate.Y + 7, 7, this.OwnerComponent.Height - 14);
					cButtonGraphic.FreeButton_RightTexture.Draw(__Camera, __RealCoordinate.X + this.OwnerComponent.Width - 7, __RealCoordinate.Y + 7, 7, this.OwnerComponent.Height - 14);
					cButtonGraphic.FreeButton_UpperTexture.Draw(__Camera, __RealCoordinate.X + 7, __RealCoordinate.Y, this.OwnerComponent.Width - 14, 7);
					cButtonGraphic.FreeButton_BottomTexture.Draw(__Camera, __RealCoordinate.X + 7, __RealCoordinate.Y + this.OwnerComponent.Height - 7, this.OwnerComponent.Width - 14, 7);
					cButtonGraphic.FreeButton_LeftBottomCornerTexture.Draw(__Camera, __RealCoordinate.X, __RealCoordinate.Y + this.OwnerComponent.Height - 7, 7, 7);
					cButtonGraphic.FreeButton_RightBottomCornerTexture.Draw(__Camera, __RealCoordinate.X + this.OwnerComponent.Width - 7, __RealCoordinate.Y + this.OwnerComponent.Height - 7, 7, 7);
					cButtonGraphic.FreeButton_LeftUpperCornerTexture.Draw(__Camera, __RealCoordinate.X, __RealCoordinate.Y, 7, 7);
					cButtonGraphic.FreeButton_RightUpperCornerTexture.Draw(__Camera, __RealCoordinate.X + this.OwnerComponent.Width - 7, __RealCoordinate.Y, 7, 7);
					cButtonGraphic.FreeButton_CenterTexture.Draw(__Camera, __RealCoordinate.X + 7, __RealCoordinate.Y + 7, this.OwnerComponent.Width - 14, this.OwnerComponent.Height - 14);
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




