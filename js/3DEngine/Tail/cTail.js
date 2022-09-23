
var cTail = Class(cBaseObject, {
	ObjectType: ObjectTypes.cModel
	, X: null
	, Y: null
	, Z: null
	, OwnerScene: null
	, Color: null
	, LineWidth: 3
	, LineList: null
	, TailLineCount: 20
	, TransparentBeforeKill: true
	,
	constructor: function (_OwnerScene, _X, _Y, _Z, _Color, _LineWidth, _TailLineCount, _TransparentBeforeKill)
	{
		cTail.BaseObject.constructor.call(this);
		this.X = new Double(_X);
		this.Y = new Double(_Y);
		this.Z = new Double(_Z);
		this.OwnerScene = _OwnerScene;
		this.Color = _Color;
		this.LineWidth = _LineWidth;
		this.LineList = new cList(ObjectTypes.cLine);
		this.TailLineCount = _TailLineCount;
		this.TransparentBeforeKill = _TransparentBeforeKill;
	}
	,
	Update: function (_X, _Y, _Z)
	{
		var __Count = this.LineList.Count();

		if (__Count < this.TailLineCount)
		{
			var __Line = this.OwnerScene.CreateLine(_X, _Y, _Z, this.X.Value(), this.Y.Value(), this.Z.Value(), this.Color.CreateNewCopy(), this.LineWidth, false);
			__Line.UpdateCoordinate(_X, _Y, _Z, this.X.Value(), this.Y.Value(), this.Z.Value());
			this.LineList.Insert(0, __Line);
		}
		else
		{
			var __Item = this.LineList.GetItem(__Count - 1);
			var __FirstItem = this.LineList.GetItem(0);
			this.LineList.RemoveAt(__Count - 1);
			__Item.UpdateCoordinate(_X, _Y, _Z, this.X.Value(), this.Y.Value(), this.Z.Value());
			this.LineList.Insert(0, __Item);
		}
		this.X.Value(_X);
		this.Y.Value(_Y);
		this.Z.Value(_Z);

		if (this.TransparentBeforeKill)
		{
			for (var i = 0; i < __Count; i++)
			{
				var __Item = this.LineList.GetItem(i);
				__Item.SetTransparency(1 - ((1 / this.TailLineCount) * i));
			}
		}
	}
	,
	BaseObject: function ()
	{
		return cBaseObject.prototype;
	},
	Destroy: function ()
	{
		delete this.Color;
		delete this.Width;
		delete this.TailLineCount;
		delete this.TransparentBeforeKill;
		for (var i = 0; i < this.LineList.Count(); i++)
		{
			var __Item = this.LineList.GetItem(i);
			__Item.Destroy();
		}
		this.LineList.Destroy();
		delete this.LineList;
		delete this.OwnerScene;
		cBaseObject.prototype.Destroy.call(this);
	}
}, {});




