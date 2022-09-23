﻿
var cSpaceShip2Unit = Class(cBaseUnit, 
{
	ObjectType: ObjectTypes.cSpaceShip2Unit
	,
	constructor: function (_OnlineGameGraph, _OwnGameUnitGraph, _Char, _X, _Y, _Z, _RoateX, _RotateY, _RotateZ)
	{
		cSpaceShip2Unit.BaseObject.constructor.call(this, _OnlineGameGraph, _OwnGameUnitGraph, _Char, UnitIDs.SpaceShip1, _X, _Y, _Z, _RoateX, _RotateY, _RotateZ);
		this.ShipSphereRadius = 10;
		this.UnitModelCollection = new cSpaceShip2Model(_OwnGameUnitGraph, _X, _Y, _Z, _RoateX, _RotateY, _RotateZ, 1, 1, 1, false, false);
	}
    ,
	BaseObject: function ()
	{
		return cBaseUnit.prototype;
	}
	,
	Destroy: function ()
	{
		this.UnitModelCollection.Destroy();
		cBaseUnit.prototype.Destroy.call(this);
	}

}, {});









