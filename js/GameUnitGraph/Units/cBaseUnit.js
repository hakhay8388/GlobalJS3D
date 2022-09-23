
var cBaseUnit = Class(cBaseObject, {
	ObjectType: ObjectTypes.cBaseUnit
	, Char: null
	, OnlineGameGraph: null
	, OwnGameUnitGraph: null
	, UnitID: null
	, UnitModelCollection: null
	, LastDif: 0
	, DestDif: 0
	, ShipSphereRadius: 10
	,
	constructor: function (_OnlineGameGraph, _OwnGameUnitGraph, _Char, _UnitID)
	{
		cBaseUnit.BaseObject.constructor.call(this);
		this.OnlineGameGraph = _OnlineGameGraph;
		this.OwnGameUnitGraph = _OwnGameUnitGraph;
		this.Char = _Char;
		this.UnitID = _UnitID;
		this.OwnGameUnitGraph.UnitList.Add(this);
	}
	,
	RotateToVelocityDirection: function ()
	{
		var __Rotate = cMath.GetRotate(0, 0, 0, this.Char.VelocityX.Value(), this.Char.VelocityY.Value(), this.Char.VelocityZ.Value());
		var __LastRotate = this.UnitModelCollection.GetRotate();
		//var __Dif = ((__Rotate.RotateY - __LastRotate.Y) * 20) * Math.cos(__Rotate.RotateX);
		//var __Dif = ((__Rotate.RotateY - __LastRotate.Y) * 20);
		//var __Dif = 0;
		this.DestDif = cMath.NormalizeAngle(((cMath.NormalizeAngle(__Rotate.RotateY) - cMath.NormalizeAngle(__LastRotate.Y)) * 20) + Math.PI);
		if (this.DestDif == 0)
		{
			this.DestDif = 0, 000001;
		}

		this.LastDif = this.LastDif + ((this.DestDif - this.LastDif) * 0.05);


		//this.LastDif = cMath.NormalizeAngle(this.LastDif);
		//this.UnitModelCollection.SetRotate(__Rotate.RotateX + Math.PI, __Rotate.RotateY, -__Dif + Math.PI);
		this.UnitModelCollection.SetRotate(__Rotate.RotateX + Math.PI, __Rotate.RotateY, -this.LastDif);
		//this.UnitModelCollection.SetRotate(0, __Rotate.RotateY, 0);
	}
	,
	MoveToVelocityDirection: function ()
	{
		this.RotateToVelocityDirection();
		this.UnitModelCollection.SetCoordinate(this.Char.CoordinateX.Value(), this.Char.CoordinateY.Value(), this.Char.CoordinateZ.Value());
	}
    ,
	BaseObject: function ()
	{
		return cBaseObject.prototype;
	}
	,
	Destroy: function ()
	{
		this.OwnGameUnitGraph.UnitList.Remove(this);
		delete this.Char;
		delete this.OnlineGameGraph;
		delete this.OwnGameUnitGraph;
		delete this.UnitID;
		delete this.UnitModelCollection;

		cBaseObject.prototype.Destroy.call(this);
	}

}, {});









