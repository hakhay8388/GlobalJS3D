
var cOtherPlayer = Class(cBaseChar, IOtherPlayerMovedReciver, IOtherPlayerSkillUsedReciver, IOtherPlayerHealtyReciver,
{
	ObjectType: ObjectTypes.cOtherPlayer

	, Speed: 0.3
	, CharUnit: null
	, UnitID: null

	, NickName: ""
	, CharID: 0
	, MaxHealty: 0
	, CurrentHealty: 0
	, Level: 0

	, CoordinateX: null
	, CoordinateY: null
	, CoordinateZ: null

	, TargetCoordinateX: 0
	, TargetCoordinateY: 0
	, TargetCoordinateZ: 0

	, TempCoordinateX: 0
	, TempCoordinateY: 0
	, TempCoordinateZ: 0

	, LastVectorX: 0
	, LastVectorY: 0
	, LastVectorZ: 0

	, VelocityX: null
	, VelocityY: null
	, VelocityZ: null

	, TargetVelocityX: 0
	, TargetVelocityY: 0
	, TargetVelocityZ: 0

	, VectorX: null
	, VectorY: null
	, VectorZ: null
	, AimLine: null
	, Tail: null
	, Tail2: null
	, UpdateCount: 0
	, OtherPlayerGraphic: null
	, BoomEmiter: null
	, BoomFactory: null
	, Died: false
	,
	constructor: function (_OnlineGameGraph, _NickName, _CharID, _UnitID, _Coordinate, _Velocity, _Speed, _MaxHealty, _CurrentHealty, _Level)
	{
		cOtherPlayer.BaseObject.constructor.call(this, _OnlineGameGraph, _CharID);

		this.UnitID = _UnitID;
		this.BoomFactory = __OnlineGameGraph.GameUnitGraph.GameScene.CreateLightStreakFactory(true, 10);
		var __ColorList = new cList(ObjectTypes.cColor);

		__ColorList.Add(Colors.White);
		__ColorList.Add(Colors.Yellow);
		__ColorList.Add(Colors.Grey);
		__ColorList.Add(Colors.Black);


		this.BoomEmiter = _OnlineGameGraph.GameUnitGraph.GameScene.CreateEmiter(0, 0, 0, 0, 1, 0, cMath.DegToRad(360), this.BoomFactory, 20, true, 1, 50, new cVector3d(0, 0, 0), true, new cVector3d(0, 0, 0), true, new cVector3d(0, 0, 0), true, 500, __ColorList, 1, 0, 0.4, 0.3, 2, 0, 0, 0, 3000, true);

		/*_OwnerScene, _X, _Y, _Z, _VectorX, _VectorY, _VectorZ, _Angle, _ParticalFactory, _Rate, _UseRandomParticalScale, _MinRandomParticalScale, _MaxRandomParticalScale, _ParticalRotateVelocity, _UseRandomParticalRotateVelocity, _ParticalRotate, _UseRandomParticalRotate, _ParticalVelocity, _UseRandomParticalVelocity, _LifeSpan, _LifeColorList, _LifeSpanStartScale, _LifeSpanFinishScale, _Speed, _RandomSpeedSeed, _ThrowingSpeed, _MinDistance, _MaxDistance, _MaxEmiterDistance, _MaxParticalCount, _Enabled*/


		this.OnlineGameGraph.CommandInterpreter.OtherPlayerCommandInterpreter.OtherPlayerMovedCommand.Connect(this);
		this.OnlineGameGraph.CommandInterpreter.OtherPlayerCommandInterpreter.OtherPlayerSkillUsedCommand.Connect(this);
		this.OnlineGameGraph.CommandInterpreter.OtherPlayerCommandInterpreter.OtherPlayerHealtyCommand.Connect(this);


		this.NickName = _NickName;
		this.CharID = _CharID;
		this.MaxHealty = _MaxHealty;
		this.CurrentHealty = _CurrentHealty;
		this.Level = _Level;

		this.CoordinateX = new Double(_Coordinate.X);
		this.CoordinateY = new Double(_Coordinate.Y);
		this.CoordinateZ = new Double(_Coordinate.Z);
		this.Tail = this.OnlineGameGraph.GameUnitGraph.GameScene.CreateTail(_Coordinate.X - 5, _Coordinate.Y, _Coordinate.Z, Colors.Yellow, 3, 20, true);
		this.Tail2 = this.OnlineGameGraph.GameUnitGraph.GameScene.CreateTail(_Coordinate.X + 5, _Coordinate.Y, _Coordinate.Z, Colors.Green, 3, 20, true);

		this.VelocityX = new Double(_Velocity.X);
		this.VelocityY = new Double(_Velocity.Y);
		this.VelocityZ = new Double(_Velocity.Z);
		this.Speed = _Speed;

		this.VectorX = new Double(0);
		this.VectorY = new Double(0);
		this.VectorZ = new Double(0);


		this.CreateCharUnit(_UnitID, _Coordinate);
		this.OtherPlayerGraphic = new cOtherPlayerGraphic(this.OnlineGameGraph, this);

		this.ExplosionFactory = this.OnlineGameGraph.GameUnitGraph.GameScene.CreateModelExplosionParticalFactory(this.CharUnit.UnitModelCollection.SpaceShip, true, false, false);
		this.ExplosionEmiter = this.OnlineGameGraph.GameUnitGraph.GameScene.CreateEmiter(0, 0, 0, 0, 1, 0, cMath.DegToRad(360), this.ExplosionFactory, 3000, true, 1, 5, new cVector3d(0, 0, 0), true, new cVector3d(0, 0, 0), true, new cVector3d(0, 0, 0), true, 5000, null, 1, 0, 0.1, 0.3, 1, 0, 0, 0, 100, true);


		//this.AimLine = _OnlineGameGraph.GameUnitGraph.GameScene.CreateLine(0, 0, 0, 1, 1, 1, Colors.Green, 1, false);
		//this.AimLine2 = _OnlineGameGraph.GameUnitGraph.GameScene.CreateLine(0, 0, 0, 1, 1, 1, Colors.Red, 1, false);
		//this.OnlineGameGraph.GameUnitGraph.CameraController.OnMouseMove.Add(this, this.MouseMoveFunction);

	}
	,
	Update: function ()
	{
		if (!this.Died)
		{
			var __Rotate = cMath.GetRotate(0, 0, 0, this.VelocityX.Value(), this.VelocityY.Value(), this.VelocityZ.Value());
			var __FrameRate = this.OnlineGameGraph.GameUnitGraph.ActiveCamera.FrameRate;

			if (__FrameRate < 1)
			{
				__FrameRate = 1;
			}

			var __Ratio = DefaultSceneSettings.GameFPS / __FrameRate;

			var __Velocity = new cVector3d(this.VelocityX.Value(), this.VelocityY.Value(), this.VelocityZ.Value());
			__Velocity.Normalize();
			var __Vector = new cVector3d(this.VectorX.Value(), this.VectorY.Value(), this.VectorZ.Value());
			__Velocity.Add(__Vector);
			__Velocity.Normalize();

			this.VelocityX.Value(__Velocity.X);
			this.VelocityY.Value(__Velocity.Y);
			this.VelocityZ.Value(__Velocity.Z);

			/*this.CoordinateX.Value((this.Speed * this.VelocityX.Value()) + this.CoordinateX.Value());
			this.CoordinateY.Value((this.Speed * this.VelocityY.Value()) + this.CoordinateY.Value());
			this.CoordinateZ.Value((this.Speed * this.VelocityZ.Value()) + this.CoordinateZ.Value());*/

			this.CoordinateX.Value(((this.Speed * __Ratio) * this.VelocityX.Value()) + (((this.TargetCoordinateX - this.TempCoordinateX) / (__FrameRate / 2)) + this.CoordinateX.Value()));
			this.CoordinateY.Value(((this.Speed * __Ratio) * this.VelocityY.Value()) + (((this.TargetCoordinateY - this.TempCoordinateY) / (__FrameRate / 2)) + this.CoordinateY.Value()));
			this.CoordinateZ.Value(((this.Speed * __Ratio) * this.VelocityZ.Value()) + (((this.TargetCoordinateZ - this.TempCoordinateZ) / (__FrameRate / 2)) + this.CoordinateZ.Value()));


			//this.AimLine.UpdateCoordinate(this.CoordinateX.Value(), this.CoordinateY.Value(), this.CoordinateZ.Value(), this.CoordinateX.Value() + (this.VelocityX.Value() * GameSettings.GameSpaceShipAimTolerance), this.CoordinateY.Value() + (this.VelocityY.Value() * GameSettings.GameSpaceShipAimTolerance), this.CoordinateZ.Value() + (this.VelocityZ.Value() * GameSettings.GameSpaceShipAimTolerance));

			this.CharUnit.MoveToVelocityDirection();

			this.Tail.Update(this.CoordinateX.Value() - 5, this.CoordinateY.Value(), this.CoordinateZ.Value());
			this.Tail2.Update(this.CoordinateX.Value() + 5, this.CoordinateY.Value(), this.CoordinateZ.Value());

			this.BoomEmiter.TranslateX.Value(this.CoordinateX.Value());
			this.BoomEmiter.TranslateY.Value(this.CoordinateY.Value());
			this.BoomEmiter.TranslateZ.Value(this.CoordinateZ.Value());

			this.OtherPlayerGraphic.Update();
		}
	}
	,
	CreateCharUnit: function (_UnitID, _Coordinate)
	{
		if (_UnitID == UnitIDs.SpaceShip1.UnitID)
		{
			this.UnitID = UnitIDs.SpaceShip1.UnitID;
			this.CharUnit = this.OnlineGameGraph.GameUnitGraph.CreatecSpaceShip1Unit(this, _Coordinate.X, _Coordinate.Y, _Coordinate.Z, 0, 0, 0);
		}
		else if (_UnitID == UnitIDs.SpaceShip2.UnitID)
		{
			this.UnitID = UnitIDs.SpaceShip1.UnitID;
			this.CharUnit = this.OnlineGameGraph.GameUnitGraph.CreatecSpaceShip2Unit(this, _Coordinate.X, _Coordinate.Y, _Coordinate.Z, 0, 0, 0);
		}
	}
	,
	BaseObject: function ()
	{
		return cBaseChar.prototype;
	}
	,
	Destroy: function ()
	{
		this.OnlineGameGraph.CommandInterpreter.OtherPlayerCommandInterpreter.OtherPlayerMovedCommand.Disconnect(this);
		this.OnlineGameGraph.CommandInterpreter.OtherPlayerCommandInterpreter.OtherPlayerSkillUsedCommand.Disconnect(this);
		this.OnlineGameGraph.CommandInterpreter.OtherPlayerCommandInterpreter.OtherPlayerHealtyCommand.Disconnect(this);

		delete this.Speed;
		if (this.OtherPlayerGraphic != null)
		{
			this.OtherPlayerGraphic.Destroy();
		}
		delete this.OtherPlayerGraphic;

		delete this.TempCoordinateX;
		delete this.TempCoordinateY;
		delete this.TempCoordinateZ;

		this.CoordinateX.Destroy();
		delete this.CoordinateX;
		this.CoordinateY.Destroy();
		delete this.CoordinateY;
		this.CoordinateZ.Destroy();
		delete this.CoordinateZ;

		delete this.TargetCoordinateX;
		delete this.TargetCoordinateY;
		delete this.TargetCoordinateZ;

		delete this.LastVectorX;
		delete this.LastVectorY;
		delete this.LastVectorZ;


		delete this.TargetVelocityX;
		delete this.TargetVelocityY;
		delete this.TargetVelocityZ;

		this.VelocityX.Destroy();
		delete this.VelocityX;
		this.VelocityY.Destroy();
		delete this.VelocityY;
		this.VelocityZ.Destroy();
		delete this.VelocityZ;

		this.VectorX.Destroy();
		delete this.VectorX;
		this.VectorY.Destroy();
		delete this.VectorY;
		this.VectorZ.Destroy();
		delete this.VectorZ;
		//this.AimLine.Destroy();
		//delete this.AimLine;
		if (this.Tail != null)
		{
			this.Tail.Destroy();
		}
		delete this.Tail;
		if (this.Tail2 != null)
		{
			this.Tail2.Destroy();
		}
		delete this.Tail;
		if (this.CharUnit != null)
		{
			this.CharUnit.Destroy();
		}

		if (this.ExplosionFactory != null)
		{
			this.ExplosionFactory.Destroy();
		}

		if (this.ExplosionEmiter != null)
		{
			this.ExplosionEmiter.Destroy();
		}


		if (this.ExplosionEmiter != null)
		{
			this.ExplosionEmiter.Destroy();
		}

		this.BoomEmiter.Destroy();
		this.BoomFactory.Destroy();

		delete this.CharUnit;
		delete this.Speed;
		delete this.UnitID;
		cBaseChar.prototype.Destroy.call(this);
	}
	,
	Recive_OtherPlayerMovedCommand: function (_CharID, _Coordinate, _Velocity, _Vector, _Speed)
	{
		if (this.CharID == _CharID)
		{


			this.VelocityX.Value(_Velocity.X);
			this.VelocityY.Value(_Velocity.Y);
			this.VelocityZ.Value(_Velocity.Z);

			this.TempCoordinateX = this.CoordinateX.Value();
			this.TempCoordinateY = this.CoordinateY.Value();
			this.TempCoordinateZ = this.CoordinateZ.Value();

			this.TargetCoordinateX = _Coordinate.X;
			this.TargetCoordinateY = _Coordinate.Y;
			this.TargetCoordinateZ = _Coordinate.Z;

			this.VectorX.Value(_Vector.X);
			this.VectorY.Value(_Vector.Y);
			this.VectorZ.Value(_Vector.Z);

			this.Speed = _Speed;
		}
	}
	,
	Recive_OtherPlayerSkillUsedCommand: function (_CharID, _SkillID, _Coordinate, _Velocity, _AttackAccelerationPower)
	{
		if (this.CharID == _CharID)
		{
			for (var i = 0; i < this.OnlineGameGraph.SkillListOperator.SkillList.Count(); i++)
			{
				var __Item = this.OnlineGameGraph.SkillListOperator.SkillList.GetItem(i);
				if (__Item.SkillID.SkillID == _SkillID)
				{
					__Item.Create(_Coordinate.X, _Coordinate.Y, _Coordinate.Z, _Velocity.X, _Velocity.Y, _Velocity.Z, _AttackAccelerationPower, false);
				}
			}
		}
	}
	,
	Recive_OtherPlayerHealtyCommand: function (_CharID, _MaxHealty, _CurrentHealty)
	{
		if (this.CharID == _CharID)
		{
			this.MaxHealty = _MaxHealty;
			this.CurrentHealty = _CurrentHealty;
			if (_CurrentHealty < 1 && !this.Died)
			{
				this.KillMyChar();
			}
			else if (this.Died && _CurrentHealty > 0)
			{
				this.LiveMyChar();
			}
		}
	}
	,
	EmiterStoper: function (_ExplosionEmiter, _ExplosionFactory)
	{
		_ExplosionEmiter.Stop();
		_ExplosionEmiter.Destroy();
		_ExplosionFactory.Destroy();
	}
	,
	KillMyChar: function ()
	{
		this.Died = true;

		var __ExplosionFactory = this.ExplosionFactory;
		var __ExplosionEmiter = this.ExplosionEmiter;

		this.ExplosionFactory = null;
		this.ExplosionEmiter = null;

		__ExplosionEmiter.Start();
		this.CharUnit.UnitModelCollection.RootModel.RemoveChildModel(this.CharUnit.UnitModelCollection.SpaceShip);
		this.CharUnit.Destroy();
		this.CharUnit = null;
		this.Tail.Destroy();
		this.Tail = null;
		this.Tail2.Destroy();
		this.Tail2 = null;
		this.OtherPlayerGraphic.Destroy();
		this.OtherPlayerGraphic = null;
		var __this = this;
		setTimeout(function () { __this.EmiterStoper(__ExplosionEmiter, __ExplosionFactory); }, 10000);
	}
	,
	LiveMyChar: function ()
	{
		var __Coordinate =
		{
			X: 0,
			Y: 0,
			Z: 0
		}

		this.CreateCharUnit(this.UnitID, __Coordinate);
		this.OtherPlayerGraphic = new cOtherPlayerGraphic(this.OnlineGameGraph, this);

		this.Tail = this.OnlineGameGraph.GameUnitGraph.GameScene.CreateTail(this.CoordinateX.Value() - 5, this.CoordinateY.Value(), this.CoordinateZ.Value(), Colors.Yellow, 3, 20, true);
		this.Tail2 = this.OnlineGameGraph.GameUnitGraph.GameScene.CreateTail(this.CoordinateX.Value() + 5, this.CoordinateY.Value(), this.CoordinateZ.Value(), Colors.Green, 3, 20, true);


		this.ExplosionFactory = this.OnlineGameGraph.GameUnitGraph.GameScene.CreateModelExplosionParticalFactory(this.CharUnit.UnitModelCollection.SpaceShip, true, false, false);
		this.ExplosionEmiter = this.OnlineGameGraph.GameUnitGraph.GameScene.CreateEmiter(0, 0, 0, 0, 1, 0, cMath.DegToRad(360), this.ExplosionFactory, 3000, true, 1, 5, new cVector3d(0, 0, 0), true, new cVector3d(0, 0, 0), true, new cVector3d(0, 0, 0), true, 5000, null, 1, 0, 0.1, 0.3, 1, 0, 0, 0, 100, true);

		this.Died = false;
	}



}, {});







