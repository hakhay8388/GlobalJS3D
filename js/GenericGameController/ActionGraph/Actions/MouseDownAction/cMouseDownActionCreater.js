
var cMouseDownActionCreater = Class(cBaseActionCreater,
{
	ObjectType: ObjectTypes.cMouseDownActionCreater
	, SkillUsageTimer: null
	,
	constructor: function (_ActionGraph)
	{
		cMouseDownActionCreater.BaseObject.constructor.call(this, _ActionGraph);
		_ActionGraph.OnlineGameGraph.GameUnitGraph.CameraController.OnClick.Add(this, this.MouseDownFunction);
		this.SkillUsageTimer = new Date();
	}
	,
	BaseObject: function ()
	{
		return cBaseActionCreater.prototype;
	}
	,
	Destroy: function ()
	{
		cBaseActionCreater.prototype.Destroy.call(this);
	}
	,
	MouseDownFunction: function (_Event)
	{
		// Mouse tuşlarının townda başka iş savaşırken başka iş yapacakları buradan ayarlanacak.
		var __MyChar = this.ActionGraph.OnlineGameGraph.MyChar;
		if (!__MyChar.Died)
		{
			if (_Event.button == 0)
			{
				__Now = new Date();

				if ((__Now - this.SkillUsageTimer) > 200)
				{
					this.SkillUsageTimer = __Now;

					if (this.ActionGraph.OnlineGameGraph.MouseLeftButtonSkill != null)
					{
						var __Action = new cUseSkillAction(this.ActionGraph, __MyChar.CharID, this.ActionGraph.OnlineGameGraph.MouseLeftButtonSkill.SkillID.SkillID, __MyChar.CoordinateX.Value(), __MyChar.CoordinateY.Value(), __MyChar.CoordinateZ.Value(), __MyChar.VelocityX.Value(), __MyChar.VelocityY.Value(), __MyChar.VelocityZ.Value());
					}
				}
			}
		}
	}

}, {});







