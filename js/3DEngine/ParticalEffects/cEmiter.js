
var cEmiter = Class(cBaseObject, {
	ObjectType: ObjectTypes.cEmiter
	, OwnerScene: null
	, TranslateX: 0
	, TranslateY: 0
	, TranslateZ: 0
    , VectorX: 0
    , VectorY: 0
    , VectorZ: 0
    , Angle: 0
	, ParticalFactory: null
	, ParticalList: null
	, EffectList: null
	, Enabled: false
	, Started: false
	, UseRandomParticalScale: false
	, MinRandomParticalScale: null
	, MaxRandomParticalScale: null
	, ParticalRotateVelocity: null
	, UseRandomParticalRotateVelocity: false
    , ParticalRotate: null
    , UseRandomParticalRotate: false
	, ParticalVelocity: null
	, UseRandomParticalVelocity: false
	, LifeSpan: 2
	, LifeColorList: null
	, LifeSpanStartScale: 1
	, LifeSpanFinishScale: 0
	, Rate: 50
	, Speed: 3
	, RandomSpeedSeed: 3
	, ThrowingSpeed: 3
	, MinDistance: 0
	, MaxDistance: 0
	, MaxEmiterDistance: 0
	, FrameRateTimer: null
	, FrameRate: 0
	, FrameRateCounter: 0
	, Killed: false
	, DestroyParticalOneByOne: false
	, MaxParticalCount: 0
    ,
	constructor: function (_OwnerScene, _X, _Y, _Z, _VectorX, _VectorY, _VectorZ, _Angle, _ParticalFactory, _Rate, _UseRandomParticalScale, _MinRandomParticalScale, _MaxRandomParticalScale, _ParticalRotateVelocity, _UseRandomParticalRotateVelocity, _ParticalRotate, _UseRandomParticalRotate, _ParticalVelocity, _UseRandomParticalVelocity, _LifeSpan, _LifeColorList, _LifeSpanStartScale, _LifeSpanFinishScale, _Speed, _RandomSpeedSeed, _ThrowingSpeed, _MinDistance, _MaxDistance, _MaxEmiterDistance, _MaxParticalCount, _Enabled)
	{
		cEmiter.BaseObject.constructor.call(this);
		this.OwnerScene = _OwnerScene;
		this.OwnerScene.EmiterList.Add(this);
		this.LifeColorList = _LifeColorList;

		this.TranslateX = new Double(_X);
		this.TranslateY = new Double(_Y);
		this.TranslateZ = new Double(_Z);

		this.VectorX = new Double(_VectorX);
		this.VectorY = new Double(_VectorY);
		this.VectorZ = new Double(_VectorZ);

		this.Angle = new Double(_Angle);

		this.MaxParticalCount = _MaxParticalCount;

		this.ParticalRotate = _ParticalRotate;
		this.UseRandomParticalRotate = _UseRandomParticalRotate;
		this.MaxEmiterDistance = _MaxEmiterDistance;

		this.ParticalFactory = _ParticalFactory;
		this.DestroyParticalOneByOne = this.ParticalFactory.DestroyParticalOneByOne;
		this.ParticalList = new cList(ObjectTypes.cBasePartical);
		this.EffectList = new cList(ObjectTypes.cBaseEffect);
		this.Enabled = _Enabled | true;
		this.UseRandomParticalScale = _UseRandomParticalScale;
		this.MinRandomParticalScale = _MinRandomParticalScale;
		this.MaxRandomParticalScale = _MaxRandomParticalScale;
		this.ParticalRotateVelocity = _ParticalRotateVelocity;
		this.UseRandomParticalRotateVelocity = _UseRandomParticalRotateVelocity;
		this.ParticalVelocity = _ParticalVelocity;
		this.UseRandomParticalVelocity = _UseRandomParticalVelocity;
		this.LifeSpan = _LifeSpan;
		this.LifeSpanStartScale = _LifeSpanStartScale;
		this.LifeSpanFinishScale = _LifeSpanFinishScale;
		this.Rate = _Rate;
		this.RandomSpeedSeed = _RandomSpeedSeed;
		this.Speed = _Speed;
		this.ThrowingSpeed = _ThrowingSpeed;

		this.MinDistance = _MinDistance;
		this.MaxDistance = _MaxDistance;
		this.FrameRateTimer = new Date();
	}
	,
	AddEffect: function (_Effect)
	{
		this.EffectList.Add(_Effect);
	}
	,
	RemoveEffect: function (_Effect)
	{
		this.EffectList.Remove(_Effect);
	}
	,
	Initalize: function ()
	{
		if (this.Started)
		{
			this.ParticalFactory.CreatePartical(this, this.Rate / this.FrameRate);
		}
	}
	,
	BaseObject: function ()
	{
		return cBaseObject.prototype;
	}
	,
	Destroy: function ()
	{
		this.Disable();

		delete this.MinDistance;
		delete this.MaxDistance;
		delete this.FrameRateTimer;


		this.ParticalList.DestroyWithItems();
		delete this.ParticalList;

		this.TranslateX.Destroy();
		this.TranslateY.Destroy();
		this.TranslateZ.Destroy();

		delete this.TranslateX;
		delete this.TranslateY;
		delete this.TranslateZ;

		this.VectorX.Destroy();
		this.VectorY.Destroy();
		this.VectorZ.Destroy();

		delete this.VectorX;
		delete this.VectorY;
		delete this.VectorZ;

		this.Angle.Destroy();
		delete this.Angle;


		delete this.MaxParticalCount;

		delete this.ParticalRotate;
		delete this.UseRandomParticalRotate;
		delete this.MaxEmiterDistance;

		delete this.ParticalFactory;
		delete this.DestroyParticalOneByOne;

		this.EffectList.Destroy();
		delete this.EffectList;

		delete this.Enabled;
		delete this.UseRandomParticalScale;
		delete this.MinRandomParticalScale;
		delete this.MaxRandomParticalScale;
		delete this.UseParticalRotateVelocity;
		delete this.ParticalRotateVelocity;
		delete this.UseRandomParticalRotateVelocity;
		delete this.UseParticalVelocity;
		delete this.ParticalVelocity;
		delete this.UseRandomParticalVelocity;
		delete this.LifeSpan;
		delete this.LifeSpanStartScale;
		delete this.LifeSpanFinishScale;
		if (this.LifeColorList != null)
		{
			this.LifeColorList.Destroy();
		}
		delete this.LifeColorList;


		this.OwnerScene.EmiterList.Remove(this);
		cBaseObject.prototype.Destroy.call(this);
	}
	,
	Kill: function ()
	{
		this.Stop();
		this.Killed = true;
	}
	,
	Run: function ()
	{
		this.CalculateFrameRate();
		if (this.FrameRate != 0)
		{
			this.Initalize();

			var __Count = this.ParticalList.Count();
			for (var i = __Count - 1; i > -1; i--)
			{
				var __Item = this.ParticalList.GetItem(i);
				__Item.Run(this.FrameRate);
				if (__Count != this.ParticalList.Count() && this.DestroyParticalOneByOne)
				{
					break;
				}
			}


		}
		if (this.Killed)
		{
			if (__Count == 0)
			{
				this.Destroy();
			}
		}
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
	Disable: function ()
	{
		if (this.Enabled)
		{
			if (this.FrameRate != 0)
			{
				var __Count = this.ParticalList.Count();
				for (var i = __Count - 1; i > -1; i--)
				{
					var __Item = this.ParticalList.GetItem(i);
					__Item.LastVelocityX = __Item.Model.VelocityVector.X;
					__Item.LastVelocityY = __Item.Model.VelocityVector.Y;
					__Item.LastVelocityZ = __Item.Model.VelocityVector.Z;
					__Item.Model.VelocityVector.X = 0;
					__Item.Model.VelocityVector.Y = 0;
					__Item.Model.VelocityVector.Z = 0;
					for (var j = 0; j < this.EffectList.Count(); j++)
					{
						var __Effect = this.EffectList.GetItem(j);
						__Item.Model.EffectController.RemoveEffect(__Effect);
					}
					__Item.DisabledTime = new Date();
				}
			}
		}
		this.Enabled = false;
	}
    ,
	Enable: function ()
	{
		if (!this.Enabled)
		{
			if (this.FrameRate != 0)
			{
				var __Count = this.ParticalList.Count();
				for (var i = __Count - 1; i > -1; i--)
				{
					var __Item = this.ParticalList.GetItem(i);
					__Item.Model.VelocityVector.X = __Item.LastVelocityX;
					__Item.Model.VelocityVector.Y = __Item.LastVelocityY;
					__Item.Model.VelocityVector.Z = __Item.LastVelocityZ;

					for (var j = 0; j < this.EffectList.Count(); j++)
					{
						var __Effect = this.EffectList.GetItem(j);
						__Item.Model.EffectController.AddEffect(__Effect);
					}
					var __Now = new Date();
					__Now.setMilliseconds(__Now.getMilliseconds() - (__Item.DisabledTime - __Item.CreateTime));
					__Item.CreateTime = __Now;
				}
			}
		}
		this.Enabled = true;
	}
	,
	Start: function ()
	{
		this.Started = true;
	}
    ,
	Stop: function ()
	{
		this.Started = false;
	}
}, {});






