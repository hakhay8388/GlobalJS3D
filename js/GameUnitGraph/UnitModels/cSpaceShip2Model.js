
var cSpaceShip2Model = Class(cBaseUnitModel, {
	ObjectType: ObjectTypes.cSpaceShip2Model
	, SpaceShip : null
	,
	constructor: function (_OwnGameGraph, _X , _Y, _Z, _RoateX, _RotateY, _Rotate, _ScaleX, _ScaleY, _ScaleZ, _LightEnabled, _RenderRealTimeLight)
	{
		cSpaceShip2Model.BaseObject.constructor.call(this, _OwnGameGraph, ModelIDs.SpaceShip2, 0, 0, 0, 0, 0, 0, 1, 1, 1);
		
		if (cSpaceShip1Model.MaterialCore == null)
		{
			cSpaceShip2Model.MaterialCore = this.GameScene.CreateMaterialCore_Texture("SpaceShip2_Texture.jpg");
			cSpaceShip2Model.Material = this.GameScene.CreateMaterial_NoLightableTexture(cSpaceShip2Model.MaterialCore, 1, 1, Colors.White);
		}

		var __Mesh = new cSpaceShip2_Mesh();
		this.SpaceShip = this.GameScene.CreateModel(0, 0, 0, 0, 0, 0, 1, 1, 1, __Mesh, cSpaceShip2Model.Material, -1 , true, _LightEnabled, _RenderRealTimeLight);

        this.RootModel.AddChildModel(this.SpaceShip);
        
        this.RootModel.Translate(_X , _Y, _Z);
        this.RootModel.Rotate(_RoateX, _RotateY, _Rotate);
        this.RootModel.Scale(_ScaleX, _ScaleY, _ScaleZ);
	}
	,
	StartMovementAnimation :function()
	{
	}
	,
	StartWaitAnimation :function()
	{
	}
	,
	StartAttackAnimation:function()
	{
	}
	,
	BaseObject: function ()
	{
		return cBaseUnitModel.prototype;
	}
	,
	Destroy: function ()
	{
        delete this.SpaceShip;
		cBaseUnitModel.prototype.Destroy.call(this);	    
	}

}, {});









