
var cBaseSkill = Class(cBaseObject,
{
	ObjectType: ObjectTypes.cBaseSkill
	, OnlineGameGraph: null
	, SkillID: null
	, SkillGraphic: null
	, OrgCoordinateX: 0
	, OrgCoordinateY: 0
	, OrgCoordinateZ: 0
	, CoordinateX: 0
	, CoordinateY: 0
	, CoordinateZ: 0
	, Vector: null
	, AttackAccelerationPower: 0
	, MySkill: null
	,
	constructor: function (_OnlineGameGraph, _SkillID, _CoordinateX, _CoordinateY, _CoordinateZ, _VelocityX, _VelocityY, _VelocityZ, _AttackAccelerationPower, _MySkill)
	{
		cBaseSkill.BaseObject.constructor.call(this);
		this.OnlineGameGraph = _OnlineGameGraph;
		this.SkillID = _SkillID;
		this.MySkill = _MySkill;

		this.AttackAccelerationPower = _AttackAccelerationPower;
		this.OrgCoordinateX = _CoordinateX;
		this.OrgCoordinateY = _CoordinateY;
		this.OrgCoordinateZ = _CoordinateZ;

		this.CoordinateX = _CoordinateX;
		this.CoordinateY = _CoordinateY;
		this.CoordinateZ = _CoordinateZ;

		this.Vector = new cVector3d(_VelocityX, _VelocityY, _VelocityZ);
		this.Vector.Normalize();

		this.OnlineGameGraph.SkillOperator.SkillList.Add(this);
	}
	,
	BaseObject: function ()
	{
		return cBaseObject.prototype;
	}
	,
	CalculateFrameRate: function ()
	{
		__Now = new Date();

		if ((__Now - this.FrameRateTimer) > 999)
		{
			this.FrameRateTimer = __Now;
			this.FrameRate = this.FrameRateCounter
			this.FrameRateCounter = 0;
		}
		else
		{
			this.FrameRateCounter++;
		}
	}
	,
	EmiterStoper: function (_OtherPlayer)
	{
		_OtherPlayer.BoomEmiter.Stop();
	}
	,
	ControlCollision: function (_X1, _Y1, _Z1, _X2, _Y2, _Z2)
	{
		try
		{
			for (var i = 0; i < this.OnlineGameGraph.OtherPlayerList.Count(); i++)
			{
				var __Item = this.OnlineGameGraph.OtherPlayerList.GetItem(i);
				if (!__Item.Died)
				{
					var __Distance = cMath.PointAndLineDistance3d(__Item.CoordinateX.Value(), __Item.CoordinateY.Value(), __Item.CoordinateZ.Value(), _X1, _Y1, _Z1, _X2, _Y2, _Z2);

					if (__Distance < this.OnlineGameGraph.MyChar.CharUnit.ShipSphereRadius)
					{
						var __Action = new cAttackAction(this.OnlineGameGraph.ActionGraph, this.OnlineGameGraph.MyChar.CharID, __Item.CharID, this.SkillID.SkillID);

						__Item.BoomEmiter.Start();
						var _this = this;
						setTimeout(function () { _this.EmiterStoper(__Item); }, 200);
						return true;
					}
				}
			}
		}
		catch (_Ex)
		{
		}
		return false;
	}
	,
	ControlCollisionToMe: function (_X1, _Y1, _Z1, _X2, _Y2, _Z2)
	{
		try
		{
			var __MyChar = this.OnlineGameGraph.MyChar;
			if (!__MyChar.Died)
			{

				var __Distance = cMath.PointAndLineDistance3d(__MyChar.CoordinateX.Value(), __MyChar.CoordinateY.Value(), __MyChar.CoordinateZ.Value(), _X1, _Y1, _Z1, _X2, _Y2, _Z2);

				if (__Distance < 10)
				{
					__MyChar.BoomEmiter.Start();
					var _this = this;
					setTimeout(function () { _this.EmiterStoper(__MyChar); }, 200);
					return true;
				}
			}

		}
		catch (_Ex)
		{
		}
		return false;
	}
	,
	Update: function ()
	{
		var __LastX = this.CoordinateX;
		var __LastY = this.CoordinateY;
		var __LastZ = this.CoordinateZ;

		this.CoordinateX += (this.Vector.X * this.AttackAccelerationPower);
		this.CoordinateY += (this.Vector.Y * this.AttackAccelerationPower);
		this.CoordinateZ += (this.Vector.Z * this.AttackAccelerationPower);

		if (this.SkillGraphic != null)
		{
			this.SkillGraphic.Update();
		}

		if (this.MySkill)
		{
			if (this.ControlCollision(this.CoordinateX, this.CoordinateY, this.CoordinateZ, __LastX, __LastY, __LastZ))
			{
				return true;
			}
		}
		else
		{
			if (this.ControlCollisionToMe(this.CoordinateX, this.CoordinateY, this.CoordinateZ, __LastX, __LastY, __LastZ))
			{
				return true;
			}
		}

		if (cMath.Distance3d(this.OrgCoordinateX, this.OrgCoordinateY, this.OrgCoordinateZ, this.CoordinateX, this.CoordinateY, this.CoordinateZ) > 1000)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	,
	Destroy: function ()
	{
		delete this.OnlineGameGraph;
		delete this.SkillID;
		this.SkillGraphic.Destroy();
		delete this.SkillGraphic;
		delete this.OrgCoordinateX;
		delete this.OrgCoordinateY;
		delete this.OrgCoordinateZ;
		delete this.CoordinateX;
		delete this.CoordinateY;
		delete this.CoordinateZ;
		delete this.Vector;
		delete this.SkillID;
		cBaseObject.prototype.Destroy.call(this);
	}

}, {});







