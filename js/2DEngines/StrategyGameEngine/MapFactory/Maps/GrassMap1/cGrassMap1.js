
var cGrassMap1 = Class(cBaseMap,
{
	ObjectType: ObjectTypes.cGrassMap1
	,
	constructor: function (_StrategyGameGraph)
	{
		cGrassMap1.BaseObject.constructor.call(this, _StrategyGameGraph, MapImages.GrassMap1Image);
	}
    ,
	BaseObject: function ()
	{
		return cBaseMap.prototype;
	}
	,
	Destroy: function ()
	{
		cBaseMap.prototype.Destroy.call(this);
	}
	,
	Draw: function (_Camera)
	{
		if (this.IsComplete())
		{
			this.MapTexture.DrawCrop(_Camera, (-this.StrategyGameGraph.VisibleWindowCenterX + (this.StrategyGameGraph.VisibleWindowWidth / 2)) - (this.MapTexture.Texture.width / 2), (this.StrategyGameGraph.VisibleWindowCenterY + (this.StrategyGameGraph.VisibleWindowHeight / 2)) - (this.MapTexture.Texture.height / 2));
		}
	}

}, {});









