
var cLigthStreak = Class(cBasePartical, {
	ObjectType: ObjectTypes.cLigthStreak
	, OrgSpeedX: 0
	, OrgSpeedY: 0
	, OrgSpeedZ: 0
	, SpeedX: 0
	, SpeedY: 0
	, SpeedZ: 0
	, StreakLength: 3
	, OrgCoordinateX: 0
	, OrgCoordinateY: 0
	, OrgCoordinateZ: 0
	,
	constructor: function (_OwnerEmiter, _LineModel, _StreakLength)
	{
		cLigthStreak.BaseObject.constructor.call(this, _OwnerEmiter, _LineModel);
		this.StreakLength = _StreakLength;
		this.OrgCoordinateX = this.Model.TranslateX.Value();
		this.OrgCoordinateY = this.Model.TranslateY.Value();
		this.OrgCoordinateZ = this.Model.TranslateZ.Value();

		this.UseRandomParticalVelocity();

	}
	,
	ControlLifeSpanFinished: function ()
	{
		__Now = new Date();

		if (this.OwnerEmiter.LifeSpan != 0)
		{
			if ((__Now - this.CreateTime) > this.OwnerEmiter.LifeSpan)
			{
				this.Destroy();
				return true;
			}
			else
			{
				var __ColorCount = this.OwnerEmiter.LifeColorList.Count();

				var __Ratio = ((__Now - this.CreateTime) / this.OwnerEmiter.LifeSpan);
				var __RealCountRatio = (__Ratio * (__ColorCount - 1));
				var __CountRatio = Math.floor(__RealCountRatio);
				var __Item1 = this.OwnerEmiter.LifeColorList.GetItem(__CountRatio);
				if (__CountRatio + 2 > __ColorCount)
				{
					return false;
				}
				var __Item2 = this.OwnerEmiter.LifeColorList.GetItem(__CountRatio + 1);
				var __RedRatio = ((__Item2.Red - __Item1.Red) * (__RealCountRatio - __CountRatio)) + __Item1.Red;
				var __GreenRatio = ((__Item2.Green - __Item1.Green) * (__RealCountRatio - __CountRatio)) + __Item1.Green;
				var __BlueRatio = ((__Item2.Blue - __Item1.Blue) * (__RealCountRatio - __CountRatio)) + __Item1.Blue;
				this.Model.Color(new cColor(__RedRatio, __GreenRatio, __BlueRatio));
			}
		}
		return false;
	}
	,
	UseRandomParticalVelocity: function ()
	{
		var __ThrowingSpeed = this.OwnerEmiter.ThrowingSpeed;
		if (__ThrowingSpeed < this.OwnerEmiter.Speed)
		{
			__ThrowingSpeed = this.OwnerEmiter.Speed;
		}

		var __X = 0;
		var __Y = 0;
		var __Z = 0;

		if (this.OwnerEmiter.UseRandomParticalVelocity)
		{
			var __Vector = new cVector3d(this.OwnerEmiter.VectorX.Value(), this.OwnerEmiter.VectorY.Value(), this.OwnerEmiter.VectorZ.Value());
			__Vector.Normalize();
			var __Angle = this.OwnerEmiter.Angle.Value();

			var __FoundAngle = 100;
			var __Count = 0;
			while (__FoundAngle > __Angle)
			{
				var __RndX = (Math.random() * 2) - 1;
				var __RndY = (Math.random() * 2) - 1;
				var __RndZ = (Math.random() * 2) - 1;

				var nrm = Math.sqrt(__RndX * __RndX + __RndY * __RndY + __RndZ * __RndZ);
				if (nrm != 0)
				{
					__RndX /= nrm;
					__RndY /= nrm;
					__RndZ /= nrm;
				}

				__FoundAngle = Math.acos(__Vector.X * __RndX + __Vector.Y * __RndY + __Vector.Z * __RndZ);
				__Count++;
				if (__Count > 500)
				{
					var __RndX = __Vector.X + Math.random() * 0.01;
					var __RndY = __Vector.Y + Math.random() * 0.01; ;
					var __RndZ = __Vector.Z + Math.random() * 0.01; ;
					break;
				}
			}


			__RndSpeed = this.OwnerEmiter.RandomSpeedSeed * Math.random();

			this.OrgSpeedX = (__RndX * this.OwnerEmiter.Speed) + (__RndX * __RndSpeed);
			this.OrgSpeedY = (__RndY * this.OwnerEmiter.Speed) + (__RndY * __RndSpeed);
			this.OrgSpeedZ = (__RndZ * this.OwnerEmiter.Speed) + (__RndZ * __RndSpeed);

			this.SpeedX = this.OrgSpeedX + (__ThrowingSpeed * __RndX);
			this.SpeedY = this.OrgSpeedY + (__ThrowingSpeed * __RndY);
			this.SpeedZ = this.OrgSpeedZ + (__ThrowingSpeed * __RndZ);

			__X = ((__RndX * (this.OwnerEmiter.MaxDistance - this.OwnerEmiter.MinDistance)) + (this.OwnerEmiter.MinDistance * __RndX));
			__Y = ((__RndY * (this.OwnerEmiter.MaxDistance - this.OwnerEmiter.MinDistance)) + (this.OwnerEmiter.MinDistance * __RndY));
			__Z = ((__RndZ * (this.OwnerEmiter.MaxDistance - this.OwnerEmiter.MinDistance)) + (this.OwnerEmiter.MinDistance * __RndZ));

		}
		else
		{
			this.OwnerEmiter.ParticalVelocity.Normalize();
			__RndSpeed = this.OwnerEmiter.RandomSpeedSeed * Math.random();

			this.OrgSpeedX = this.OwnerEmiter.ParticalVelocity.X * (__RndSpeed * this.OwnerEmiter.ParticalVelocity.X);
			this.OrgSpeedY = this.OwnerEmiter.ParticalVelocity.Y * (__RndSpeed * this.OwnerEmiter.ParticalVelocity.Y);
			this.OrgSpeedZ = this.OwnerEmiter.ParticalVelocity.Z * (__RndSpeed * this.OwnerEmiter.ParticalVelocity.Z);

			this.SpeedX = this.OrgSpeedX + (__ThrowingSpeed * this.OwnerEmiter.ParticalVelocity.X);
			this.SpeedY = this.OrgSpeedY + (__ThrowingSpeed * this.OwnerEmiter.ParticalVelocity.Y);
			this.SpeedZ = this.OrgSpeedZ + (__ThrowingSpeed * this.OwnerEmiter.ParticalVelocity.Z);

			__X = ((this.OwnerEmiter.ParticalVelocity.X * (this.OwnerEmiter.MaxDistance - this.OwnerEmiter.MinDistance)) + (this.OwnerEmiter.MinDistance * this.OwnerEmiter.ParticalVelocity.X));
			__Y = ((this.OwnerEmiter.ParticalVelocity.Y * (this.OwnerEmiter.MaxDistance - this.OwnerEmiter.MinDistance)) + (this.OwnerEmiter.MinDistance * this.OwnerEmiter.ParticalVelocity.Y));
			__Z = ((this.OwnerEmiter.ParticalVelocity.Z * (this.OwnerEmiter.MaxDistance - this.OwnerEmiter.MinDistance)) + (this.OwnerEmiter.MinDistance * this.OwnerEmiter.ParticalVelocity.Z));

		}

		this.Model.VelocityVector.X = this.SpeedX;
		this.Model.VelocityVector.Y = this.SpeedY;
		this.Model.VelocityVector.Z = this.SpeedZ;

		this.Model.Translate(__X + this.OrgCoordinateX, __Y + this.OrgCoordinateY, __Z + this.OrgCoordinateZ);

	}
	,
	BaseObject: function ()
	{
		return cBasePartical.prototype;
	}
	,
	Destroy: function ()
	{
		delete this.OrgSpeedX;
		delete this.OrgSpeedY;
		delete this.OrgSpeedZ;
		delete this.SpeedX;
		delete this.SpeedY;
		delete this.SpeedZ;
		cBasePartical.prototype.Destroy.call(this);
	}
	,
	Run: function (_FPS)
	{
		if (this.ControlLifeSpanFinished())
		{
			return;
		}

		var __Count = (DefaultSceneSettings.GameFPS / _FPS);

		this.FPSLeftoverCount += __Count - Math.floor(__Count);
		__Count = Math.floor(__Count);
		var __LeftoverCount = Math.floor(this.FPSLeftoverCount);
		this.FPSLeftoverCount -= __LeftoverCount;
		__Count += __LeftoverCount;

		for (var i = 0; i < __Count; i++)
		{
			var __Distance = this.Model.DistanceTo(this.OwnerEmiter.TranslateX.Value(), this.OwnerEmiter.TranslateY.Value(), this.OwnerEmiter.TranslateZ.Value());
			if (__Distance > (this.OwnerEmiter.MaxEmiterDistance * 0.8) && this.OwnerEmiter.MaxEmiterDistance != 0)
			{
				this.Model.VelocityVector.X *= 0.9;
				this.Model.VelocityVector.Y *= 0.9;
				this.Model.VelocityVector.Z *= 0.9;
				return;
			}


			var __X = ((this.SpeedX - this.OrgSpeedX) * 0.08) * (DefaultSceneSettings.GameFPS / _FPS);
			var __Y = ((this.SpeedY - this.OrgSpeedY) * 0.08) * (DefaultSceneSettings.GameFPS / _FPS);
			var __Z = ((this.SpeedZ - this.OrgSpeedZ) * 0.08) * (DefaultSceneSettings.GameFPS / _FPS);


			if (Math.abs(this.SpeedX) < Math.abs(this.OrgSpeedX))
			{
				this.SpeedX = this.OrgSpeedX;
			}
			else
			{
				this.SpeedX -= __X;
			}

			if (Math.abs(this.SpeedY) < Math.abs(this.OrgSpeedY))
			{
				this.SpeedY = this.OrgSpeedY;
			}
			else
			{
				this.SpeedY -= __Y;
			}

			if (Math.abs(this.SpeedZ) < Math.abs(this.OrgSpeedZ))
			{
				this.SpeedZ = this.OrgSpeedZ;
			}
			else
			{
				this.SpeedZ -= __Z;
			}

			this.Model.VelocityVector.Sub(new cVector3d(__X, __Y, __Z));
			this.Model.UpdateCoordinate(this.Model.TranslateX.Value(), this.Model.TranslateY.Value(), this.Model.TranslateZ.Value(), this.Model.TranslateX.Value() + (this.Model.VelocityVector.X * this.StreakLength), this.Model.TranslateY.Value() + (this.Model.VelocityVector.Y * this.StreakLength), this.Model.TranslateZ.Value() + (this.Model.VelocityVector.Z * this.StreakLength));

		}
	}
}, {});






