
var cSurroundSpace = Class(cBaseObject, {
	ObjectType: ObjectTypes.cSurroundSpace
	, SpaceStarList : null
	, GameUnitGraph : null
	, CenterModel : null
	, Distance : 0
	,
    constructor: function (_GameUnitGraph, _CenterModel, _Distance)
	{
		cSurroundSpace.BaseObject.constructor.call(this);
		this.SpaceStarList = new cList(ObjectTypes.cBaseModel);
		this.GameUnitGraph = _GameUnitGraph;
		this.CenterModel = _CenterModel;
		this.Distance = _Distance;
		this.CreateSpace(_GameUnitGraph, _CenterModel, _Distance);
	}
	,
	CreateSpace : function(_GameUnitGraph,_CenterModel, _Distance)
	{
        var __MaterialCore = _GameUnitGraph.GameScene.CreateMaterialCore_Texture("Game/Images/Nova.png");
        var __Material = _GameUnitGraph.GameScene.CreateMaterial_NoLightableTexture(__MaterialCore, 1, 1, Colors.White)

        var __MaterialCore2 = _GameUnitGraph.GameScene.CreateMaterialCore_Texture("Game/Images/Sun.png");
        var __Material2 = _GameUnitGraph.GameScene.CreateMaterial_NoLightableTexture_RadiusTransparency(__MaterialCore2, 256, 256, 25, 50, 90, 0.5);

        var __MaterialCore3 = _GameUnitGraph.GameScene.CreateMaterialCore_Texture("Game/Images/Nebula.png");
        var __Material3 = _GameUnitGraph.GameScene.CreateMaterial_NoLightableTexture(__MaterialCore3, 1, 1, Colors.White)

        var __MaterialCore4 = _GameUnitGraph.GameScene.CreateMaterialCore_Texture("Game/Images/RedSun.jpg");
        var __Material4 = _GameUnitGraph.GameScene.CreateMaterial_NoLightableTexture_RadiusTransparency(__MaterialCore4, 256, 256, 200, 230, 250, 0.5);

        var __MaterialCore5 = _GameUnitGraph.GameScene.CreateMaterialCore_Texture("Game/Images/Nova2.jpg");
        var __Material5 = _GameUnitGraph.GameScene.CreateMaterial_NoLightableTexture_RadiusTransparency(__MaterialCore5, 350, 350, 250, 300, 340, 0.5);


        var __MaterialCore6 = _GameUnitGraph.GameScene.CreateMaterialCore_Texture("Game/Images/Planet1.jpg");
        var __Material6 = _GameUnitGraph.GameScene.CreateMaterial_NoLightableTexture(__MaterialCore6, 1, 1, Colors.White)
        
        var __MaterialCore7 = _GameUnitGraph.GameScene.CreateMaterialCore_Texture("Game/Images/Planet2.jpg");
        var __Material7 = _GameUnitGraph.GameScene.CreateMaterial_NoLightableTexture(__MaterialCore7, 1, 1, Colors.White)

	    
/*	    var __Model = _GameUnitGraph.GameScene.CreateRotateFixedPanelModel(_Distance, 0, 0, 0, 0, 0, 100000, 50000, 50000, __Material3, false, false)
	    __Model.VertexOutLineControl = false;
	    __Model.DiffrentX = __Model.TranslateX.Value() - _CenterModel.TranslateX.Value();
	    __Model.DiffrentY = __Model.TranslateY.Value() - _CenterModel.TranslateY.Value();
	    __Model.DiffrentZ = __Model.TranslateZ.Value() - _CenterModel.TranslateZ.Value();
	    this.SpaceStarList.Add(__Model );
	    this.AddCenterModelEvent(_CenterModel, __Model, _Distance);	    */

   
	    
	    var __Model = _GameUnitGraph.GameScene.CreateRotateFixedPanelModel(_Distance * 2 , _Distance / 10, 0, 0, 0, 0, 50000, 50000, 50000, __Material, false, true)
	    __Model.VertexOutLineControl = false;
	    __Model.DiffrentX = __Model.TranslateX.Value() - _CenterModel.TranslateX.Value();
	    __Model.DiffrentY = __Model.TranslateY.Value() - _CenterModel.TranslateY.Value() ;
	    __Model.DiffrentZ = __Model.TranslateZ.Value() - _CenterModel.TranslateZ.Value();
        this.SpaceStarList.Add(__Model );	    
	    this.AddCenterModelEvent(_CenterModel, __Model, _Distance);

	    var __Model = _GameUnitGraph.GameScene.CreateRotateFixedPanelModel(_Distance / 2 , _Distance / 100, -(_Distance / 10), 0, 0, 0, 5000, 5000, 5000, __Material6, false, true)
	    __Model.VertexOutLineControl = false;
	    __Model.DiffrentX = __Model.TranslateX.Value() - _CenterModel.TranslateX.Value();
	    __Model.DiffrentY = __Model.TranslateY.Value() - _CenterModel.TranslateY.Value() ;
	    __Model.DiffrentZ = __Model.TranslateZ.Value() - _CenterModel.TranslateZ.Value();
        this.SpaceStarList.Add(__Model );	    
	    this.AddCenterModelEvent(_CenterModel, __Model, _Distance);



	    __Model = _GameUnitGraph.GameScene.CreateRotateFixedPanelModel(-_Distance, _Distance / 100, _Distance, 0, 0, 0, 5000, 5000, 5000, __Material, false, true)
	    __Model.DiffrentX = __Model.TranslateX.Value() - _CenterModel.TranslateX.Value();
	    __Model.DiffrentY = __Model.TranslateY.Value() - _CenterModel.TranslateY.Value() ;
	    __Model.DiffrentZ = __Model.TranslateZ.Value() - _CenterModel.TranslateZ.Value();
        this.SpaceStarList.Add(__Model );	    
	    this.AddCenterModelEvent(_CenterModel, __Model, _Distance);
	    
	    __Model = _GameUnitGraph.GameScene.CreateRotateFixedPanelModel(0, -(_Distance / 10) , _Distance, 0, 0, 0, 3000, 3000, 3000, __Material2, false, true)
	    __Model.DiffrentX = __Model.TranslateX.Value() - _CenterModel.TranslateX.Value();
	    __Model.DiffrentY = __Model.TranslateY.Value() - _CenterModel.TranslateY.Value() ;
	    __Model.DiffrentZ = __Model.TranslateZ.Value() - _CenterModel.TranslateZ.Value();
        this.SpaceStarList.Add(__Model );	    
	    this.AddCenterModelEvent(_CenterModel, __Model, _Distance);

	    __Model = _GameUnitGraph.GameScene.CreateRotateFixedPanelModel(_Distance, -(_Distance / 20)  , -_Distance, 0, 0, 0, 5000, 5000, 5000, __Material2, false, true)
	    __Model.DiffrentX = __Model.TranslateX.Value() - _CenterModel.TranslateX.Value();
	    __Model.DiffrentY = __Model.TranslateY.Value() - _CenterModel.TranslateY.Value() ;
	    __Model.DiffrentZ = __Model.TranslateZ.Value() - _CenterModel.TranslateZ.Value();
        this.SpaceStarList.Add(__Model );	    
	    this.AddCenterModelEvent(_CenterModel, __Model, _Distance);

	    __Model = _GameUnitGraph.GameScene.CreateRotateFixedPanelModel(_Distance, _Distance /100 , -_Distance / 100, 0, 0, 0, 5000, 5000, 5000, __Material4, false, true)
	    __Model.DiffrentX = __Model.TranslateX.Value() - _CenterModel.TranslateX.Value();
	    __Model.DiffrentY = __Model.TranslateY.Value() - _CenterModel.TranslateY.Value() ;
	    __Model.DiffrentZ = __Model.TranslateZ.Value() - _CenterModel.TranslateZ.Value();
        this.SpaceStarList.Add(__Model );	    
	    this.AddCenterModelEvent(_CenterModel, __Model, _Distance);

	    __Model = _GameUnitGraph.GameScene.CreateRotateFixedPanelModel(-(_Distance * 2), _Distance /2.4 , -_Distance * 2, 0, 0, 0, 20000, 20000, 20000, __Material7, false, true)
	    __Model.VertexOutLineControl = false;
	    __Model.DiffrentX = __Model.TranslateX.Value() - _CenterModel.TranslateX.Value();
	    __Model.DiffrentY = __Model.TranslateY.Value() - _CenterModel.TranslateY.Value() ;
	    __Model.DiffrentZ = __Model.TranslateZ.Value() - _CenterModel.TranslateZ.Value();
        this.SpaceStarList.Add(__Model );	    
	    this.AddCenterModelEvent(_CenterModel, __Model, _Distance);


	    __Model = _GameUnitGraph.GameScene.CreateRotateFixedPanelModel(-(_Distance * 2), _Distance /2 , -_Distance * 2, 0, 0, 0, 6000, 6000, 6000, __Material, false, true)
	    __Model.VertexOutLineControl = false;
	    __Model.DiffrentX = __Model.TranslateX.Value() - _CenterModel.TranslateX.Value();
	    __Model.DiffrentY = __Model.TranslateY.Value() - _CenterModel.TranslateY.Value() ;
	    __Model.DiffrentZ = __Model.TranslateZ.Value() - _CenterModel.TranslateZ.Value();
        this.SpaceStarList.Add(__Model );	    
	    this.AddCenterModelEvent(_CenterModel, __Model, _Distance);

	    __Model = _GameUnitGraph.GameScene.CreateRotateFixedPanelModel(-(_Distance * 2), _Distance / 2 , -_Distance * 2, 0, 0, 0, 30000, 2000, 2000, __Material, true, true)
        __Model.VertexOutLineControl = false;	    
	    __Model.DiffrentX = __Model.TranslateX.Value() - _CenterModel.TranslateX.Value();
	    __Model.DiffrentY = __Model.TranslateY.Value() - _CenterModel.TranslateY.Value() ;
	    __Model.DiffrentZ = __Model.TranslateZ.Value() - _CenterModel.TranslateZ.Value();
        this.SpaceStarList.Add(__Model );	    
	    this.AddCenterModelEvent(_CenterModel, __Model, _Distance);

/*	    __Model = _GameUnitGraph.GameScene.CreateRotateFixedPanelModel(-(_Distance * 2), _Distance / 2 , -_Distance * 2, 0, 0, 0, 2000, 2000, 20000, __Material, false, true)
        __Model.VertexOutLineControl = false;	    
	    __Model.DiffrentX = __Model.TranslateX.Value() - _CenterModel.TranslateX.Value();
	    __Model.DiffrentY = __Model.TranslateY.Value() - _CenterModel.TranslateY.Value() ;
	    __Model.DiffrentZ = __Model.TranslateZ.Value() - _CenterModel.TranslateZ.Value();
        this.SpaceStarList.Add(__Model );	    
	    this.AddCenterModelEvent(_CenterModel, __Model, _Distance);*/


	    __Model = _GameUnitGraph.GameScene.CreateRotateFixedPanelModel(-(_Distance * 2), -(_Distance / 2) , _Distance / 2, 0, 0, 0, 6000, 6000, 6000, __Material2, false, true)
	    __Model.VertexOutLineControl = false;
	    __Model.DiffrentX = __Model.TranslateX.Value() - _CenterModel.TranslateX.Value();
	    __Model.DiffrentY = __Model.TranslateY.Value() - _CenterModel.TranslateY.Value() ;
	    __Model.DiffrentZ = __Model.TranslateZ.Value() - _CenterModel.TranslateZ.Value();
        this.SpaceStarList.Add(__Model );	    
	    this.AddCenterModelEvent(_CenterModel, __Model, _Distance);

	    __Model = _GameUnitGraph.GameScene.CreateRotateFixedPanelModel(-(_Distance * 2), -(_Distance / 2) , _Distance / 2, 0, 0, 0, 30000, 2000, 2000, __Material2, true, true)
        __Model.VertexOutLineControl = false;	    
	    __Model.DiffrentX = __Model.TranslateX.Value() - _CenterModel.TranslateX.Value();
	    __Model.DiffrentY = __Model.TranslateY.Value() - _CenterModel.TranslateY.Value() ;
	    __Model.DiffrentZ = __Model.TranslateZ.Value() - _CenterModel.TranslateZ.Value();
        this.SpaceStarList.Add(__Model );	    
	    this.AddCenterModelEvent(_CenterModel, __Model, _Distance);

	    __Model = _GameUnitGraph.GameScene.CreateRotateFixedPanelModel(-(_Distance * 4), -(_Distance / 2) , _Distance / 2, 0, 0, 0, 50000, 50000, 50000, __Material5, false, true)
        __Model.VertexOutLineControl = false;	    
	    __Model.DiffrentX = __Model.TranslateX.Value() - _CenterModel.TranslateX.Value();
	    __Model.DiffrentY = __Model.TranslateY.Value() - _CenterModel.TranslateY.Value() ;
	    __Model.DiffrentZ = __Model.TranslateZ.Value() - _CenterModel.TranslateZ.Value();
        this.SpaceStarList.Add(__Model );	    
	    this.AddCenterModelEvent(_CenterModel, __Model, _Distance);



	}
	,
	AddCenterModelEvent : function(_CenterModel, _Model, _Distance)
	{
	    _Model.ConstraintController.CreateConstraint(_CenterModel.TranslateX, null, true, function(_Variable, _Model)
        {
            _Model.TranslateX.Value(_Variable.Value() + _Model.DiffrentX);
        });
	    _Model.ConstraintController.CreateConstraint(_CenterModel.TranslateY, null, true, function(_Variable, _Model)
        {
            _Model.TranslateY.Value(_Variable.Value() + _Model.DiffrentY);
        });
	    _Model.ConstraintController.CreateConstraint(_CenterModel.TranslateZ, null, true, function(_Variable, _Model)
        {
            _Model.TranslateZ.Value(_Variable.Value() + _Model.DiffrentZ);
        });
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









