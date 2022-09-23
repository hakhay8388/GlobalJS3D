
var cMyChar = Class(cBaseChar, IMyCharMovedReciver, IMyCharSkillUsedReciver, IMyCharHealtyReciver,
{
	ObjectType: ObjectTypes.cMyChar
	, OtherPlayerList: null
	, OtherPlayerListOperator: null

	, CharUnit: null
	, MyCharGraphic: null
	, UnitID: null
	, CameraCharFallower: null
	, CoordinateX: null
	, CoordinateY: null
	, CoordinateZ: null

	, TargetCoordinateX: 0
	, TargetCoordinateY: 0
	, TargetCoordinateZ: 0

	, TempCoordinateX: 0
	, TempCoordinateY: 0
	, TempCoordinateZ: 0

	, SurroundSpace: null

	, VelocityX: null
	, VelocityY: null
	, VelocityZ: null

	, VectorX: null
	, VectorY: null
	, VectorZ: null
	, AimLine: null
	, Tail: null
	//, Tail2: null
	, NickName: ""
	, MaxSpeed: 0
	, CurrentSpeed: 0
	, MaxHealty: 0
	, CurrentHealty: 0
	, MaxEnergy: 0
	, CurrentEnergy: 0
	, AttackPower: 0
	, Defence: 0
	, EnergyPower: 0
	, SpeedAccelerationPower: 0
	, AttackAccelerationPower: 0
	, Level: 0
	, MaxMaterial: 0
	, CurrentMaterial: 0
	, BoomEmiter: null
	, ExplosionFactory: null
	, ExplosionEmiter: null
	, Died: false
	,
	constructor: function (_OnlineGameGraph, _Nick, _CharID, _UnitID, _Coordinate, _Velocity, _Healty, _Energy, _Speed, _Powers, _Level)
	{
		cMyChar.BaseObject.constructor.call(this, _OnlineGameGraph, _CharID);

		var __ModelParticalFactory = _OnlineGameGraph.GameUnitGraph.GameScene.CreateLightStreakFactory(true, 10);
		var __ColorList = new cList(ObjectTypes.cColor);
		this.UnitID = _UnitID;


		__ColorList.Add(Colors.White);
		__ColorList.Add(Colors.Yellow);
		__ColorList.Add(Colors.Grey);
		__ColorList.Add(Colors.Black);


		this.BoomEmiter = _OnlineGameGraph.GameUnitGraph.GameScene.CreateEmiter(0, 0, 0, 0, 1, 0, cMath.DegToRad(360), __ModelParticalFactory, 20, true, 1, 50, new cVector3d(0, 0, 0), true, new cVector3d(0, 0, 0), true, new cVector3d(0, 0, 0), true, 500, __ColorList, 1, 0, 0.4, 0.3, 2, 0, 0, 0, 3000, true);


		this.OnlineGameGraph.CommandInterpreter.MyCharMovedCommand.Connect(this);
		this.OnlineGameGraph.CommandInterpreter.MyCharSkillUsedCommand.Connect(this);
		this.OnlineGameGraph.CommandInterpreter.MyCharHealtyCommand.Connect(this);


		this.CoordinateX = new Double(_Coordinate.X);
		this.CoordinateY = new Double(_Coordinate.Y);
		this.CoordinateZ = new Double(_Coordinate.Z);
		//this.Tail = this.OnlineGameGraph.GameUnitGraph.GameScene.CreateTail(_Coordinate.X - 10, _Coordinate.Y, _Coordinate.Z, Colors.Yellow, 3, 20, true);
		//this.Tail2 = this.OnlineGameGraph.GameUnitGraph.GameScene.CreateTail(_Coordinate.X + 10, _Coordinate.Y, _Coordinate.Z, Colors.Green, 3, 20, true);

		this.VelocityX = new Double(_Velocity.X);
		this.VelocityY = new Double(_Velocity.Y);
		this.VelocityZ = new Double(_Velocity.Z);

		this.VectorX = new Double(0);
		this.VectorY = new Double(0);
		this.VectorZ = new Double(0);

		this.NickName = _Nick;
		this.MaxSpeed = _Speed.MaxSpeed;
		this.CurrentSpeed = _Speed.CurrentSpeed;
		this.MaxHealty = _Healty.MaxHealty;
		this.CurrentHealty = _Healty.CurrentHealty;
		this.MaxEnergy = _Energy.MaxEnergy;
		this.CurrentEnergy = _Energy.CurrentEnergy;
		this.AttackPower = _Powers.AttackPower;
		this.Defence = _Powers.Defence;
		this.EnergyPower = _Powers.EnergyPower;
		this.SpeedAccelerationPower = _Powers.SpeedAccelerationPower;
		this.AttackAccelerationPower = _Powers.AttackAccelerationPower;
		this.Level = _Level.Level;
		this.MaxMaterial = _Level.MaxMaterial;
		this.CurrentMaterial = _Level.CurrentMaterial;

		this.CreateMyUnit(_UnitID, _Coordinate);
		this.MyCharGraphic = new cMyCharGraphic(this.OnlineGameGraph, this);

		this.ExplosionFactory = this.OnlineGameGraph.GameUnitGraph.GameScene.CreateModelExplosionParticalFactory(this.CharUnit.UnitModelCollection.SpaceShip, true, false, false);
		this.ExplosionEmiter = this.OnlineGameGraph.GameUnitGraph.GameScene.CreateEmiter(0, 0, 0, 0, 1, 0, cMath.DegToRad(360), this.ExplosionFactory, 3000, true, 1, 5, new cVector3d(0, 0, 0), true, new cVector3d(0, 0, 0), true, new cVector3d(0, 0, 0), true, 5000, null, 1, 0, 0.1, 0.3, 1, 0, 0, 0, 100, true);

		this.AimLine = _OnlineGameGraph.GameUnitGraph.GameScene.CreateLine(0, 0, 0, 1, 1, 1, Colors.Green, 1, false);
		//this.OnlineGameGraph.GameUnitGraph.CameraController.OnMouseMove.Add(this, this.MouseMoveFunction);

		//this.StartSender(GameSettings.MyCharInfoSendInterval);
	}
	,
	StartSender: function (_Interval)
	{
		if (this.CurrentSpeed != 0 && this.CurrentSpeed > 0 && !this.Died)
		{
			var __Data = new cCharMoveType(ActionIDs.MouseMoveAction.ActionID, this.CharID, this.CoordinateX.Value(), this.CoordinateY.Value(), this.CoordinateZ.Value(), this.VelocityX.Value(), this.VelocityY.Value(), this.VelocityZ.Value(), this.CurrentSpeed);
			var __Data2 = __Data.toJSONString();
			this.OnlineGameGraph.Send(__Data2);
			delete __Data;
		}
		var _this = this;
		setTimeout(function () { _this.StartSender(_Interval); }, _Interval);
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


			/*this.CoordinateX.Value((this.CurrentSpeed * this.VelocityX.Value()) + this.CoordinateX.Value());
			this.CoordinateY.Value((this.CurrentSpeed * this.VelocityY.Value()) + this.CoordinateY.Value());
			this.CoordinateZ.Value((this.CurrentSpeed * this.VelocityZ.Value()) + this.CoordinateZ.Value());*/

			this.CoordinateX.Value(((this.CurrentSpeed * __Ratio) * this.VelocityX.Value()) + (((this.TargetCoordinateX - this.TempCoordinateX) / (__FrameRate / 2)) + this.CoordinateX.Value()));
			this.CoordinateY.Value(((this.CurrentSpeed * __Ratio) * this.VelocityY.Value()) + (((this.TargetCoordinateY - this.TempCoordinateY) / (__FrameRate / 2)) + this.CoordinateY.Value()));
			this.CoordinateZ.Value(((this.CurrentSpeed * __Ratio) * this.VelocityZ.Value()) + (((this.TargetCoordinateZ - this.TempCoordinateZ) / (__FrameRate / 2)) + this.CoordinateZ.Value()));




			this.AimLine.UpdateCoordinate(this.CoordinateX.Value(), this.CoordinateY.Value(), this.CoordinateZ.Value(), this.CoordinateX.Value() + (this.VelocityX.Value() * GameSettings.GameSpaceShipAimTolerance), this.CoordinateY.Value() + (this.VelocityY.Value() * GameSettings.GameSpaceShipAimTolerance), this.CoordinateZ.Value() + (this.VelocityZ.Value() * GameSettings.GameSpaceShipAimTolerance));

			this.CharUnit.MoveToVelocityDirection();

			var __Rotate = cMath.GetRotate(0, 0, 0, this.VelocityX.Value(), this.VelocityY.Value(), this.VelocityZ.Value());

			var __Coordinate = cMath.GetRotatedCoordinate(__Rotate.RotateX, __Rotate.RotateY + (Math.PI / 1.5), this.CoordinateX.Value(), this.CoordinateY.Value(), this.CoordinateZ.Value(), this.CoordinateX.Value() + 6, this.CoordinateY.Value(), this.CoordinateZ.Value());

			//this.Tail.Update(__Coordinate.X, __Coordinate.Y, __Coordinate.Z);

			__Coordinate = cMath.GetRotatedCoordinate(__Rotate.RotateX, __Rotate.RotateY - (Math.PI / 1.5), this.CoordinateX.Value(), this.CoordinateY.Value(), this.CoordinateZ.Value(), this.CoordinateX.Value() + 6, this.CoordinateY.Value(), this.CoordinateZ.Value());

			//this.Tail2.Update(__Coordinate.X, __Coordinate.Y, __Coordinate.Z);

			this.BoomEmiter.TranslateX.Value(this.CoordinateX.Value());
			this.BoomEmiter.TranslateY.Value(this.CoordinateY.Value());
			this.BoomEmiter.TranslateZ.Value(this.CoordinateZ.Value());

			this.MyCharGraphic.Update();
		}
	}
	,
	CreateMyUnit: function (_UnitID, _Coordinate)
	{
		if (_UnitID == UnitIDs.SpaceShip1.UnitID)
		{
			this.UnitID = UnitIDs.SpaceShip1.UnitID;
			this.CharUnit = this.OnlineGameGraph.GameUnitGraph.CreatecSpaceShip1Unit(this, _Coordinate.X, _Coordinate.Y, _Coordinate.Z, 0, 0, 0);
			//this.CameraCharFallower = new cCameraCharFallower(this.OnlineGameGraph.GameUnitGraph.ActiveCamera, this);
			//this.SurroundSpace = new cSurroundSpace(this.OnlineGameGraph.GameUnitGraph, this.CharUnit.UnitModelCollection.RootModel, 1000000);
		}
		else if (_UnitID == UnitIDs.SpaceShip2.UnitID)
		{
			this.UnitID = UnitIDs.SpaceShip2.UnitID;
			this.CharUnit = this.OnlineGameGraph.GameUnitGraph.CreatecSpaceShip2Unit(this, _Coordinate.X, _Coordinate.Y, _Coordinate.Z, 0, 0, 0);
			//this.CameraCharFallower = new cCameraCharFallower(this.OnlineGameGraph.GameUnitGraph.ActiveCamera, this);
			//this.SurroundSpace = new cSurroundSpace(this.OnlineGameGraph.GameUnitGraph, this.CharUnit.UnitModelCollection.RootModel, 1000000);
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
		this.OnlineGameGraph.CommandInterpreter.MyCharMovedCommand.Disconnect(this);
		this.OnlineGameGraph.CommandInterpreter.MyCharSkillUsedCommand.Disconnect(this);
		this.OnlineGameGraph.CommandInterpreter.MyCharHealtyCommand.Disconnect(this);

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

		delete this.NickName;
		delete this.MaxSpeed;
		delete this.CurrentSpeed;
		delete this.MaxHealty;
		delete this.CurrentHealty;
		delete this.MaxEnergy;
		delete this.CurrentEnergy;
		delete this.AttackPower;
		delete this.Defence;
		delete this.EnergyPower;
		delete this.SpeedAccelerationPower;
		delete this.AttackAccelerationPower;
		delete this.Level;
		delete this.MaxMaterial;
		delete this.CurrentMaterial;

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

		this.Tail.Destroy();
		delete this.Tail;
		this.Tail2.Destroy();
		delete this.Tail;
		this.CharUnit.Destroy();
		delete this.CharUnit;
		delete this.UnitID;

		if (this.CameraCharFallower)
		{
			this.CameraCharFallower.Destroy();
		}
		delete this.CameraCharFallower;

		if (this.CameraCharFallower)
		{
			this.SurroundSpace.Destroy();
		}
		delete this.SurroundSpace;

		cBaseChar.prototype.Destroy.call(this);
	}
	,
	Recive_MyCharMovedCommand: function (_CharID, _Coordinate, _Velocity, _Vector, _CurrentSpeed, _Remote)
	{
		if (this.CharID == _CharID && !this.Died)
		{
			this.TempCoordinateX = this.CoordinateX.Value();
			this.TempCoordinateY = this.CoordinateY.Value();
			this.TempCoordinateZ = this.CoordinateZ.Value();

			this.TargetCoordinateX = _Coordinate.X;
			this.TargetCoordinateY = _Coordinate.Y;
			this.TargetCoordinateZ = _Coordinate.Z;

			this.VectorX.Value(_Vector.X);
			this.VectorY.Value(_Vector.Y);
			this.VectorZ.Value(_Vector.Z);


			this.CurrentSpeed = _CurrentSpeed;
		}
	}
	,
	Recive_MyCharSkillUsedCommand: function (_CharID, _SkillID, _Coordinate, _Velocity, _AttackAccelerationPower)
	{
		if (!this.Died)
		{
			for (var i = 0; i < this.OnlineGameGraph.SkillListOperator.UsableSkillList.Count(); i++)
			{
				var __Item = this.OnlineGameGraph.SkillListOperator.UsableSkillList.GetItem(i);
				if (__Item.SkillID.SkillID == _SkillID)
				{
					__Item.Create(_Coordinate.X, _Coordinate.Y, _Coordinate.Z, _Velocity.X, _Velocity.Y, _Velocity.Z, _AttackAccelerationPower, true);
				}
			}
		}
	}
	,
	Recive_MyCharHealtyCommand: function (_CharID, _MaxHealty, _CurrentHealty)
	{
		if (_CharID == this.CharID)
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

		__ExplosionEmiter.Start();
		this.CharUnit.UnitModelCollection.RootModel.RemoveChildModel(this.CharUnit.UnitModelCollection.SpaceShip);
		this.CharUnit.Destroy();
		this.Tail.Destroy();
		this.Tail2.Destroy();
		this.MyCharGraphic.Destroy();
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
		this.CreateMyUnit(this.UnitID, __Coordinate);
		this.MyCharGraphic = new cMyCharGraphic(this.OnlineGameGraph, this);

		this.Tail = this.OnlineGameGraph.GameUnitGraph.GameScene.CreateTail(this.CoordinateX.Value() - 5, this.CoordinateY.Value(), this.CoordinateZ.Value(), Colors.Yellow, 3, 20, true);
		this.Tail2 = this.OnlineGameGraph.GameUnitGraph.GameScene.CreateTail(this.CoordinateX.Value() + 5, this.CoordinateY.Value(), this.CoordinateZ.Value(), Colors.Green, 3, 20, true);

		this.ExplosionFactory = this.OnlineGameGraph.GameUnitGraph.GameScene.CreateModelExplosionParticalFactory(this.CharUnit.UnitModelCollection.SpaceShip, true, false, false);
		this.ExplosionEmiter = this.OnlineGameGraph.GameUnitGraph.GameScene.CreateEmiter(0, 0, 0, 0, 1, 0, cMath.DegToRad(360), this.ExplosionFactory, 3000, true, 1, 5, new cVector3d(0, 0, 0), true, new cVector3d(0, 0, 0), true, new cVector3d(0, 0, 0), true, 5000, null, 1, 0, 0.1, 0.3, 1, 0, 0, 0, 100, true);

		this.Died = false;
	}

}, {});







