
var cCameraModel = Class(cBaseModel, {
	ObjectType: ObjectTypes.cCameraModel
	, Camera: null
	, AimLine: null
	,
	constructor: function (_OwnerScene, _Camera)
	{
	    var __MaterialCore = _OwnerScene.CreateMaterialCore_SolidColor(Colors.White, 200, 200);
		var __Material = _OwnerScene.CreateMaterial_Lambert(__MaterialCore, 0, 1, Colors.White, 0, 1, Colors.White, 1, 1, Colors.White);
		cCameraModel.BaseObject.constructor.call(this, _OwnerScene, _Camera.CoordinateX.Value(), _Camera.CoordinateY.Value(), _Camera.CoordinateZ.Value(), 0,0,0,1,1,1, new CameraMesh(), __Material, -1, true, false, false, false);
		this.Camera = _Camera;
	}
	,
	BaseObject: function ()
	{
		return cBaseModel.prototype;
	},
	Destroy: function ()
	{
		cBaseModel.prototype.Destroy.call(this);
	},
	RotateForRender: function (_Camera, _RotateX, _RotateY, _RotateZ)
	{
		this.OwnerScene.WorldMat.Ident();


		t = new cMatrix4x4();
		u = new cMatrix4x4();
		z = new cMatrix4x4();
		k = new cMatrix4x4();





		t.Translate(-this.TranslateX.Value(), -this.TranslateY.Value(), -this.TranslateZ.Value());

		k.GlRotate(_RotateX, 1, 0, 0);
		this.OwnerScene.WorldMat.Mul(t, k);
		k.CopyFrom(this.OwnerScene.WorldMat);
		t.Translate(0, 0, 0);
		this.OwnerScene.WorldMat.Mul(t, k);

		t.CopyFrom(this.OwnerScene.WorldMat);



		u.GlRotate(-_RotateY, 0, 1, 0);
		this.OwnerScene.WorldMat.Mul(k, u);
		t.CopyFrom(this.OwnerScene.WorldMat);
		z.Translate(this.TranslateX.Value(), this.TranslateY.Value(), this.TranslateZ.Value());
		this.OwnerScene.WorldMat.Mul(t, z);




		_Camera.CalcAllTransforms();



	}
	,
	Initalize: function (_Camera)
    {
        this.RotateForRender(_Camera, this.RotateX.Value(), this.RotateY.Value(), this.RotateZ.Value());
        _Camera.TransformVertexes(this.Mesh, this);
        
        var __WorldMat = new cMatrix4x4();
        __WorldMat.CopyFrom(this.OwnerScene.WorldMat);
        
        this.Visited = true;
        var __ChildModelCount = this.ChildModel.Count();
        for (var i = 0; i < __ChildModelCount; i++)
        {
        	var __Item = this.ChildModel.GetItem(i);
			__Item.Initalize(_Camera);
			this.OwnerScene.WorldMat.CopyFrom(__WorldMat);
        }

        this.OwnerScene.WorldMat.Ident();
        _Camera.CalcAllTransforms();

        if (this.CalculateVertexNormalAndFaceNormal)
        {
            this.CalculateFacesNormal();
            this.CalculateVertexNormal();
            this.CalculateVertexNormalAndFaceNormal = false;
        }

        this.RenderSuccess = true;
    }
	

}, {});




