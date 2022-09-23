
function ObjectNames()
{
}

ObjectNames.List = new Array(
    "cObjType",
    "cBaseObject",
    "cList",
    "cDelegate",
    "cTimer",
    "cObserverable",
    "cFreeObject",

    "cBaseValueType",
    "Integer",
    "Double",
    "Bool",
    "cString",

    //******************** REACT COMPONENET ****************************************
    "Login"
    //*************************************************************************

);



ObjectTypes = function()
{
}

ObjectTypes.TypeList = new cListForBase();


ObjectTypes.Get = function (_Name)
{
  for (var i = 0; i < ObjectTypes.TypeList.Count(); i++)
  {
    if (ObjectTypes.TypeList.GetItem(i).ObjectName === _Name)
    {
      return ObjectTypes.TypeList.GetItem(i);
    }
  }

  var __EvalString = "ObjectTypes." + _Name + " = new cObjType(\"" + _Name + "\");";
  eval(__EvalString);
  var __Result = null;
  __EvalString = "__Result = ObjectTypes." + _Name;
  eval(__EvalString);
  return __Result;
}



ObjectTypes.ValidateObjectInObjectList = function (_ObjectType)
{
  for (var i = 0; i < ObjectTypes.TypeList.Count(); i++)
  {
    if (_ObjectType.ObjectTypeID == ObjectTypes.TypeList.GetItem(i).ObjectTypeID)
    {
      return true;
    }
  }
  return false;
}


for (var i = 0; i < ObjectNames.List.length; i++)
{
  var __EvalString = "ObjectTypes." + ObjectNames.List[i] + " = new cObjType(\"" + ObjectNames.List[i] + "\");";
  eval(__EvalString);
}
























//************************	Utils	*************************

ObjectTypes.cArial = new cObjType("cArial");

//***********************************************************

//********************* Javascript Value Types **************
ObjectTypes.Javascript_Number = new cObjType("number");
ObjectTypes.Javascript_String = new cObjType("string");
ObjectTypes.Javascript_Bool = new cObjType("boolean");
ObjectTypes.Javascript_Undefined = new cObjType("undefined");
ObjectTypes.Javascript_Function = new cObjType("function");
ObjectTypes.Javascript_Object = new cObjType("object");
//***********************************************************

//********************* Genereal Object *******************
//ObjectTypes.cObjType = new cObjType("cObjType");
//ObjectTypes.cBaseObject = new cObjType("cBaseObject");
//ObjectTypes.cList = new cObjType("cList");
//ObjectTypes.cDelegate = new cObjType("cDelegate");
//ObjectTypes.cTimer = new cObjType("cTimer");
//ObjectTypes.cObserverable = new cObjType("cObserverable");
//ObjectTypes.cFreeObject = new cObjType("cFreeObject");
ObjectTypes.cSocket = new cObjType("cSocket");
//***********************************************************

//********************* Web Graph Value Types *******************
//ObjectTypes.cBaseValueType = new cObjType("cBaseValueType");
//ObjectTypes.Integer = new cObjType("Integer");
//ObjectTypes.Double = new cObjType("Double");
//ObjectTypes.cString = new cObjType("cString");
//ObjectTypes.Bool = new cObjType("Bool");
//***********************************************************


//********************** Scene ******************************

ObjectTypes.cScene = new cObjType("cScene");


ObjectTypes.cBaseShape = new cObjType("cBaseShape");
ObjectTypes.cLine = new cObjType("cLine");
ObjectTypes.cCircle = new cObjType("cCircle");
ObjectTypes.cText = new cObjType("cText");
ObjectTypes.cCamera = new cObjType("cCamera");
ObjectTypes.cCameraController = new cObjType("cCameraController");


ObjectTypes.cBaseModel = new cObjType("cBaseModel");
ObjectTypes.cModel = new cObjType("cModel");
ObjectTypes.cRotateFixedPanelModel = new cObjType("cRotateFixedPanelModel");


ObjectTypes.cCameraModel = new cObjType("cCameraModel");
ObjectTypes.cCoordinateModel = new cObjType("cCoordinateModel");
ObjectTypes.cColor = new cObjType("cColor");

//********************** Materials **************************

ObjectTypes.cBaseMaterialCore = new cObjType("cBaseMaterialCore");
ObjectTypes.cTexture = new cObjType("cTexture");
ObjectTypes.cSolidColor = new cObjType("cSolidColor");
ObjectTypes.cTextureNormalMaped = new cObjType("cTextureNormalMaped");


ObjectTypes.cBaseMaterial = new cObjType("cBaseMaterial");
ObjectTypes.cLambert = new cObjType("cLambert");
ObjectTypes.cNoLightableTexture = new cObjType("cNoLightableTexture");
ObjectTypes.cNoLightableTexture_SpecialTransparency = new cObjType("cNoLightableTexture_SpecialTransparency");
ObjectTypes.cNoLightableTexture_RadiusTransparency = new cObjType("cNoLightableTexture_RadiusTransparency");

ObjectTypes.cNoLightableVideo = new cObjType("cNoLightableVideo");

//***********************************************************

//********************** 2D Engine***************************
//--//*************** Strategy Game Engine ******************

ObjectTypes.cStrategyGameGraph = new cObjType("cStrategyGameGraph");
ObjectTypes.cMapFactory = new cObjType("cMapFactory");
ObjectTypes.cBaseMap = new cObjType("cBaseMap");
ObjectTypes.cMapImages = new cObjType("cMapImages");
ObjectTypes.cGrassMap1 = new cObjType("cGrassMap1");

//--//*******************************************************
//***********************************************************

//********************** Lights *****************************
ObjectTypes.cBaseLight = new cObjType("cBaseLight");
ObjectTypes.cPointLigth = new cObjType("cPointLigth");
ObjectTypes.cDirectLigth = new cObjType("cDirectLigth");
ObjectTypes.cSpotLigth = new cObjType("cSpotLigth");
//***********************************************************


//********************** Animation **************************

ObjectTypes.cKey = new cObjType("cKey");
ObjectTypes.cBaseAnimation = new cObjType("cBaseAnimation");
ObjectTypes.cModelAnimation = new cObjType("cModelAnimation");
ObjectTypes.cAnimation = new cObjType("cAnimation");
ObjectTypes.cBaseAnimationController = new cObjType("cBaseAnimationController");
ObjectTypes.cModelAnimationController = new cObjType("cModelAnimationController");
ObjectTypes.cModelAnimation_Second = new cObjType("cModelAnimation_Second");
ObjectTypes.cModelAnimation_Hour = new cObjType("cModelAnimation_Hour");
ObjectTypes.cModelAnimation_Minute = new cObjType("cModelAnimation_Minute");




//***********************************************************

//*********************** Constraint ************************

ObjectTypes.cConstraint = new cObjType("cConstraint");
ObjectTypes.cConstraintController = new cObjType("cConstraintController");

//***********************************************************


//********************** Effects **************************

ObjectTypes.cEffectController = new cObjType("cEffectController");
ObjectTypes.cBaseEffect = new cObjType("cBaseEffect");
ObjectTypes.cGravityEffect = new cObjType("cGravityEffect");
ObjectTypes.cAirEffect = new cObjType("cAirEffect");
ObjectTypes.cCollectorEffect = new cObjType("cCollectorEffect");

//***********************************************************

//********************** Partical Effect ********************

ObjectTypes.cEmiter = new cObjType("cEmiter");
ObjectTypes.cBasePartical = new cObjType("cBasePartical");
ObjectTypes.cBaseParticalFactory = new cObjType("cBaseParticalFactory");
ObjectTypes.cModelParticalFactory = new cObjType("cModelParticalFactory");
ObjectTypes.cModelExplosionParticalFactory = new cObjType("cModelExplosionParticalFactory ");
ObjectTypes.cRotateFixedModelParticalFactory = new cObjType("cRotateFixedModelParticalFactory");
ObjectTypes.cLightStreakFactory = new cObjType("cLightStreakFactory");
ObjectTypes.cPartical = new cObjType("cPartical");
ObjectTypes.cLigthStreak = new cObjType("cLigthStreak");

//***********************************************************

//********************** Componenets 3d *************************

ObjectTypes.cProgressBar3D = new cObjType("cProgressBar3D");

//***********************************************************

//********************** Componenets*************************

ObjectTypes.cText2D = new cObjType("cText2D");
ObjectTypes.cDefaultSkin = new cObjType("cDefaultSkin");
ObjectTypes.cButtonSkin = new cObjType("cButtonSkin");
ObjectTypes.cFormSkin = new cObjType("cFormSkin");
ObjectTypes.cImageButtonSkin = new cObjType("cImageButtonSkin");
ObjectTypes.cProgressBarSkin = new cObjType("cProgressBarSkin");
ObjectTypes.cTextBoxSkin = new cObjType("cTextBoxSkin");

ObjectTypes.cComponentController = new cObjType("cComponentController");
ObjectTypes.cComponentFactory = new cObjType("cComponentFactory");
ObjectTypes.cBaseControl = new cObjType("cBaseControl");
ObjectTypes.cBaseComponentGraphic = new cObjType("cBaseComponentGraphic");

ObjectTypes.cFormGraphic = new cObjType("cFormGraphic");
ObjectTypes.cForm = new cObjType("cForm");

ObjectTypes.cProgressBarGraphic = new cObjType("cProgressBarGraphic");
ObjectTypes.cProgressBar = new cObjType("cProgressBar");

ObjectTypes.cFormTitleBarGraphic = new cObjType("cFormTitleBarGraphic");
ObjectTypes.cFormTitleBar = new cObjType("cFormTitleBar");

ObjectTypes.cImageButton = new cObjType("cImageButton");
ObjectTypes.cImageButtonGraphic = new cObjType("cImageButtonGraphic");

ObjectTypes.cResizeItem = new cObjType("cResizeItem");
ObjectTypes.cResizable = new cObjType("cResizable");
ObjectTypes.cComponentTexture = new cObjType("cComponentTexture");


ObjectTypes.cButton = new cObjType("cButton");
ObjectTypes.cButtonGraphic = new cObjType("cButtonGraphic");

ObjectTypes.cTextBoxGraphic = new cObjType("cTextBoxGraphic");
ObjectTypes.cTextBox = new cObjType("cTextBox");


//***********************************************************

//********************** Game *******************************

ObjectTypes.cGameUnitGraph = new cObjType("cGameUnitGraph");
ObjectTypes.cSurroundSpace = new cObjType("cSurroundSpace");

ObjectTypes.cBaseUnitModel = new cObjType("cBaseUnitModel");
ObjectTypes.cSpaceShip1Model = new cObjType("cSpaceShip1Model");
ObjectTypes.cSpaceShip2Model = new cObjType("cSpaceShip2Model");


ObjectTypes.cBaseUnit = new cObjType("cBaseUnit");
ObjectTypes.cSpaceShip1Unit = new cObjType("cSpaceShip1Unit");
ObjectTypes.cSpaceShip2Unit = new cObjType("cSpaceShip2Unit");

//***********************************************************


//**********************Online Game *************************

ObjectTypes.cOnlineGameGraph = new cObjType("cOnlineGameGraph");
ObjectTypes.cCameraCharFallower = new cObjType("cCameraCharFallower");

ObjectTypes.cBaseCommand = new cObjType("cBaseCommand");

ObjectTypes.cCommandInterpreter = new cObjType("cCommandInterpreter");
ObjectTypes.cBaseChar = new cObjType("cBaseChar");
ObjectTypes.cMob = new cObjType("cMob");

ObjectTypes.cMyChar = new cObjType("cMyChar");
ObjectTypes.cMyCharGraphic = new cObjType("cMyCharGraphic");

ObjectTypes.cOtherPlayer = new cObjType("cOtherPlayer");
ObjectTypes.cOtherPlayerGraphic = new cObjType("cOtherPlayerGraphic");


ObjectTypes.cOtherPlayerListOperator = new cObjType("cOtherPlayerListOperator");
ObjectTypes.cSkillListOperator = new cObjType("cSkillListOperator");


ObjectTypes.cCreatedMyCharCommand = new cObjType("cCreatedMyCharCommand");
ObjectTypes.ICreatedMyCharReciver = new cObjType("ICreatedMyCharReciver");

ObjectTypes.cMyCharMovedCommand = new cObjType("cMyCharMovedCommand");
ObjectTypes.IMyCharMovedReciver = new cObjType("IMyCharMovedReciver");

ObjectTypes.cMyCharMovedCommand = new cObjType("cMyCharMovedCommand");
ObjectTypes.IMyCharMovedReciver = new cObjType("IMyCharMovedReciver");

ObjectTypes.cMyCharHealtyCommand = new cObjType("cMyCharHealtyCommand");
ObjectTypes.IMyCharHealtyReciver = new cObjType("IMyCharHealtyReciver");



ObjectTypes.cOtherPlayerCommandInterpreter = new cObjType("cOtherPlayerCommandInterpreter");

ObjectTypes.cOtherPlayerShowedCommand = new cObjType("cOtherPlayerShowedCommand");
ObjectTypes.cOtherPlayerHideCommand = new cObjType("cOtherPlayerHideCommand");
ObjectTypes.cOtherPlayerMovedCommand = new cObjType("cOtherPlayerMovedCommand");
ObjectTypes.cOtherPlayerSkillUsedCommand = new cObjType("cOtherPlayerSkillUsedCommand");
ObjectTypes.cOtherPlayerHealtyCommand = new cObjType("cOtherPlayerHealtyCommand");



ObjectTypes.cMyCharSkillUsedCommand = new cObjType("cMyCharSkillUsedCommand");


//***********************************************************

//************************ Skills *************************

ObjectTypes.cSkillOperator = new cObjType("ObjectTypes.cSkillOperator");

ObjectTypes.cBaseSkill = new cObjType("cBaseSkill");
ObjectTypes.cBaseSkillGraphic = new cObjType("cBaseSkillGraphic");
ObjectTypes.cBaseSkillCreater = new cObjType("cBaseSkillCreater");

ObjectTypes.cBasicSkill = new cObjType("cBasicSkill");
ObjectTypes.cBasicSkillGraphic = new cObjType("cBasicSkillGraphic");
ObjectTypes.cBasicSkillCreater = new cObjType("cBasicSkillCreater");


//***********************************************************

//********************** Action Interpreter *****************


ObjectTypes.cActionGraph = new cObjType("cActionGraph");

ObjectTypes.cBaseActionCreater = new cObjType("cBaseActionCreater");
ObjectTypes.cCreateMyCharActionCreater = new cObjType("cCreateMyCharActionCreater");
ObjectTypes.cMouseMoveActionCreater = new cObjType("cMouseMoveActionCreater");
ObjectTypes.cMouseDownActionCreater = new cObjType("cMouseDownActionCreater");




//***********************************************************


ObjectTypes.ValidateObjectInObjectList = function(_ObjectType)
{
    for (var i = 0; i < ObjectTypes.TypeList.Count(); i++)
    {
        if (_ObjectType.ObjectTypeID == ObjectTypes.TypeList.GetItem(i).ObjectTypeID)
        {
            return true;
        }
    }
    return false;
}
