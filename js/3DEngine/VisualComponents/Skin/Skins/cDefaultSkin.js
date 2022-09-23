
var cDefaultSkin = Class(cBaseObject,
{
	ObjectType: ObjectTypes.cDefaultSkin
	, FormSkin: null
	, ImageButtonSkin: null
	, ButtonSkin: null
	, ProgressBarSkin: null
	, TextBoxSkin: null
	,
	constructor: function ()
	{
		cDefaultSkin.BaseObject.constructor.call(this);

		this.ButtonSkin = new cButtonSkin(
			"3DEngine/VisualComponents/ComponentGraphics/Button/Images/FreeButton_Left.png",
			"3DEngine/VisualComponents/ComponentGraphics/Button/Images/FreeButton_Right.png",
			"3DEngine/VisualComponents/ComponentGraphics/Button/Images/FreeButton_Upper.png",
			"3DEngine/VisualComponents/ComponentGraphics/Button/Images/FreeButton_Bottom.png",
			"3DEngine/VisualComponents/ComponentGraphics/Button/Images/FreeButton_LeftBottomCorner.png",
			"3DEngine/VisualComponents/ComponentGraphics/Button/Images/FreeButton_RightBottomCorner.png",
			"3DEngine/VisualComponents/ComponentGraphics/Button/Images/FreeButton_LeftUpperCorner.png",
			"3DEngine/VisualComponents/ComponentGraphics/Button/Images/FreeButton_RightUpperCorner.png",
			"3DEngine/VisualComponents/ComponentGraphics/Button/Images/FreeButton_Center.png",

			"3DEngine/VisualComponents/ComponentGraphics/Button/Images/ButtonOnMouse_Left.png",
			"3DEngine/VisualComponents/ComponentGraphics/Button/Images/ButtonOnMouse_Right.png",
			"3DEngine/VisualComponents/ComponentGraphics/Button/Images/ButtonOnMouse_Upper.png",
			"3DEngine/VisualComponents/ComponentGraphics/Button/Images/ButtonOnMouse_Bottom.png",
			"3DEngine/VisualComponents/ComponentGraphics/Button/Images/ButtonOnMouse_LeftBottomCorner.png",
			"3DEngine/VisualComponents/ComponentGraphics/Button/Images/ButtonOnMouse_RightBottomCorner.png",
			"3DEngine/VisualComponents/ComponentGraphics/Button/Images/ButtonOnMouse_LeftUpperCorner.png",
			"3DEngine/VisualComponents/ComponentGraphics/Button/Images/ButtonOnMouse_RightUpperCorner.png",
			"3DEngine/VisualComponents/ComponentGraphics/Button/Images/ButtonOnMouse_Center.png",

			"3DEngine/VisualComponents/ComponentGraphics/Button/Images/ButtonFoused_Left.png",
			"3DEngine/VisualComponents/ComponentGraphics/Button/Images/ButtonFoused_Right.png",
			"3DEngine/VisualComponents/ComponentGraphics/Button/Images/ButtonFoused_Upper.png",
			"3DEngine/VisualComponents/ComponentGraphics/Button/Images/ButtonFoused_Bottom.png",
			"3DEngine/VisualComponents/ComponentGraphics/Button/Images/ButtonFoused_LeftBottomCorner.png",
			"3DEngine/VisualComponents/ComponentGraphics/Button/Images/ButtonFoused_RightBottomCorner.png",
			"3DEngine/VisualComponents/ComponentGraphics/Button/Images/ButtonFoused_LeftUpperCorner.png",
			"3DEngine/VisualComponents/ComponentGraphics/Button/Images/ButtonFoused_RightUpperCorner.png",
			"3DEngine/VisualComponents/ComponentGraphics/Button/Images/ButtonFoused_Center.png",

			"3DEngine/VisualComponents/ComponentGraphics/Button/Images/ButtonClicked_Left.png",
			"3DEngine/VisualComponents/ComponentGraphics/Button/Images/ButtonClicked_Right.png",
			"3DEngine/VisualComponents/ComponentGraphics/Button/Images/ButtonClicked_Upper.png",
			"3DEngine/VisualComponents/ComponentGraphics/Button/Images/ButtonClicked_Bottom.png",
			"3DEngine/VisualComponents/ComponentGraphics/Button/Images/ButtonClicked_LeftBottomCorner.png",
			"3DEngine/VisualComponents/ComponentGraphics/Button/Images/ButtonClicked_RightBottomCorner.png",
			"3DEngine/VisualComponents/ComponentGraphics/Button/Images/ButtonClicked_LeftUpperCorner.png",
			"3DEngine/VisualComponents/ComponentGraphics/Button/Images/ButtonClicked_RightUpperCorner.png",
			"3DEngine/VisualComponents/ComponentGraphics/Button/Images/ButtonClicked_Center.png"


		);


		this.ImageButtonSkin = new cImageButtonSkin(
			"3DEngine/VisualComponents/ComponentGraphics/ImageButton/Images/ButtonFreeImage.png",
			"3DEngine/VisualComponents/ComponentGraphics/ImageButton/Images/ButtonOnMouseFreeImage.png",
			"3DEngine/VisualComponents/ComponentGraphics/ImageButton/Images/ButtonClickedImage.png",
			"3DEngine/VisualComponents/ComponentGraphics/ImageButton/Images/ButtonFousedImage.png"
		);

		this.ProgressBarSkin = new cProgressBarSkin(
			"3DEngine/VisualComponents/ComponentGraphics/ProgressBar/Images/FreeBar.png",
			"3DEngine/VisualComponents/ComponentGraphics/ProgressBar/Images/FullBarYellow.png"
		);



		this.FormSkin = new cFormSkin(
			"3DEngine/VisualComponents/ComponentGraphics/Form/Images/BackGround.png",
			"3DEngine/VisualComponents/ComponentGraphics/Form/Images/FormLeft.png",
			"3DEngine/VisualComponents/ComponentGraphics/Form/Images/FormRight.png",
			"3DEngine/VisualComponents/ComponentGraphics/Form/Images/FormBottom.png",
			"3DEngine/VisualComponents/ComponentGraphics/Form/Images/FormLeftUpperCorner.png",
			"3DEngine/VisualComponents/ComponentGraphics/Form/Images/FormRightUpperCorner.png",
			"3DEngine/VisualComponents/ComponentGraphics/Form/Images/FormLeftBottomCorner.png",
			"3DEngine/VisualComponents/ComponentGraphics/Form/Images/FormRightBottomCorner.png",
			"3DEngine/VisualComponents/ComponentGraphics/Form/Images/TitleBar.png",
			"3DEngine/VisualComponents/ComponentGraphics/ImageButton/Images/Special1/CloseFreeButton.png",
			"3DEngine/VisualComponents/ComponentGraphics/ImageButton/Images/Special1/CloseMouseOnButton.png",
			"3DEngine/VisualComponents/ComponentGraphics/ImageButton/Images/Special1/CloseClickedButton.png",
			"3DEngine/VisualComponents/ComponentGraphics/ImageButton/Images/Special1/CloseFocusedButton.png"
		);

		this.TextBoxSkin = new cTextBoxSkin(
			"3DEngine/VisualComponents/ComponentGraphics/TextBox/Images/TextBox_Left.png",
			"3DEngine/VisualComponents/ComponentGraphics/TextBox/Images/TextBox_Right.png",
			"3DEngine/VisualComponents/ComponentGraphics/TextBox/Images/TextBox_Upper.png",
			"3DEngine/VisualComponents/ComponentGraphics/TextBox/Images/TextBox_Bottom.png",
			"3DEngine/VisualComponents/ComponentGraphics/TextBox/Images/TextBox_LeftBottomCorner.png",
			"3DEngine/VisualComponents/ComponentGraphics/TextBox/Images/TextBox_RightBottomCorner.png",
			"3DEngine/VisualComponents/ComponentGraphics/TextBox/Images/TextBox_LeftUpperCorner.png",
			"3DEngine/VisualComponents/ComponentGraphics/TextBox/Images/TextBox_RightUpperCorner.png",
			"3DEngine/VisualComponents/ComponentGraphics/TextBox/Images/TextBox_Center.png"
		);

	}
	,
	BaseObject: function ()
	{
		return cBaseObject.prototype;
	}
	,
	Destroy: function ()
	{
		cBaseObject.prototype.Destroy.call(this);
	}
}, {});
