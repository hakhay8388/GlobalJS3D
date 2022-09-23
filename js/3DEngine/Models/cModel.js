
var cModel = Class(cBaseModel, {
	ObjectType: ObjectTypes.cModel
	,
	constructor: function (_OwnerScene, _X, _Y, _Z, _RotateX, _RotateY, _RotateZ, _ScaleX, _ScaleY, _ScaleZ, _Mesh, _Material, _SurfaceNormal, _Z_clip, _UseLight, _EnabledRealTimeLightRender, _LighterModel)
	{
		cModel.BaseObject.constructor.call(this, _OwnerScene, _X, _Y, _Z, _RotateX, _RotateY, _RotateZ, _ScaleX, _ScaleY, _ScaleZ, _Mesh, _Material, _SurfaceNormal, _Z_clip, _UseLight, _EnabledRealTimeLightRender, _LighterModel);
	}
	,
	BaseObject: function ()
	{
		return cBaseModel.prototype;
	},
	Destroy: function ()
	{
		cBaseModel.prototype.Destroy.call(this);
	}
}, {});




