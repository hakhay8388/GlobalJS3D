
var cMouseMoveActionCreater = Class(cBaseActionCreater,
{
	ObjectType: ObjectTypes.cMouseMoveActionCreater
	, MouseX: 0
	, MouseY: 0
	, MouseMoveTime: null
	,
	constructor: function (_ActionGraph, _MouseMoveSenderInterval)
	{
		cMouseMoveActionCreater.BaseObject.constructor.call(this, _ActionGraph);
		_ActionGraph.OnlineGameGraph.GameUnitGraph.CameraController.OnMouseMove.Add(this, this.MouseMoveFunction);
		this.MouseX = _ActionGraph.OnlineGameGraph.GameUnitGraph.ActiveCamera.Width / 2;
		this.MouseY = _ActionGraph.OnlineGameGraph.GameUnitGraph.ActiveCamera.Height / 2;
		this.MouseMoveTime = new Date();

		this.StartUpdater(_MouseMoveSenderInterval);
	}
	,
	BaseObject: function ()
	{
		return cBaseActionCreater.prototype;
	}
	,
	Destroy: function ()
	{
		delete this.MouseX;
		delete this.MouseY;
		cBaseActionCreater.prototype.Destroy.call(this);
	}
	,
	MouseMoveFunction: function (_Event)
	{
		this.MouseX = _Event.offsetX;
		this.MouseY = _Event.offsetY;
	}
    ,
	StartUpdater: function (_Interval)
	{
		var __MyChar = this.ActionGraph.OnlineGameGraph.MyChar;
		if (!__MyChar.Died)
		{

			var __Rotate = this.ActionGraph.OnlineGameGraph.GameUnitGraph.ActiveCamera.GetRotate();
			var __VectorX = (-(this.MouseX - (this.ActionGraph.OnlineGameGraph.GameUnitGraph.ActiveCamera.Width / 2))) / 10000;
			var __VectorY = (-(this.MouseY - (this.ActionGraph.OnlineGameGraph.GameUnitGraph.ActiveCamera.Height / 2))) / 10000;

			var __MouseRotate = cMath.GetRotate(0, 0, 0, this.ActionGraph.OnlineGameGraph.MyChar.VelocityX.Value(), this.ActionGraph.OnlineGameGraph.MyChar.VelocityY.Value(), this.ActionGraph.OnlineGameGraph.MyChar.VelocityZ.Value());

			if (cMath.RadToDeg(__MouseRotate.RotateX) > 88 && __VectorY > 0)
			{
				__VectorY = 0;
			}
			else if (cMath.RadToDeg(__MouseRotate.RotateX) < -88 && __VectorY < 0)
			{
				__VectorY = 0;
			}

			//__VectorY = (__VectorY * Math.cos(__MouseRotate.RotateX));    
			//__VectorX = (__VectorX * Math.cos(__MouseRotate.RotateX));    


			var __RVectorY = __VectorY * Math.cos(__MouseRotate.RotateX);
			var __RVectorX = -((__VectorY * Math.sin(__MouseRotate.RotateX)) * Math.sin(__MouseRotate.RotateY));
			var __RVectorZ = -((__VectorY * Math.sin(__MouseRotate.RotateX)) * Math.cos(__MouseRotate.RotateY));



			var __CosY = Math.cos(__MouseRotate.RotateY);
			var __SinY = Math.sin(__MouseRotate.RotateY);

			__RVectorX += __VectorX * __CosY;
			__RVectorZ += -(__VectorX * __SinY);

			if (this.CanSend())
			{
				var __Action = new cMouseMoveAction(this.ActionGraph, this.ActionGraph.OnlineGameGraph.MyChar.CharID, this.ActionGraph.OnlineGameGraph.MyChar.CoordinateX.Value(), this.ActionGraph.OnlineGameGraph.MyChar.CoordinateY.Value(), this.ActionGraph.OnlineGameGraph.MyChar.CoordinateZ.Value(), this.ActionGraph.OnlineGameGraph.MyChar.VelocityX.Value(), this.ActionGraph.OnlineGameGraph.MyChar.VelocityY.Value(), this.ActionGraph.OnlineGameGraph.MyChar.VelocityZ.Value(), __RVectorX, __RVectorY, __RVectorZ, this.ActionGraph.OnlineGameGraph.MyChar.CurrentSpeed, true);
			}
		}
		var _this = this;
		setTimeout(function () { _this.StartUpdater(_Interval); }, _Interval);
	}
	,
	CanSend: function ()
	{
		__Now = new Date();

		if ((__Now - this.MouseMoveTime) > GameSettings.MyCharMouseMoveSendInterval)
		{
			this.MouseMoveTime = __Now;
			return true;
		}
		else
		{
			return false;
		}
	}
}, {});







