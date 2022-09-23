
var cProgressBar3D = Class(cRotateFixedPanelModel,
{
	ObjectType: ObjectTypes.cProgressBar3D
	, OwnerScene: null
	, Drawed: false
	, FreeBarImage: null
	, Percent: null
	, BarScale: 0
	,
	constructor: function (_OwnerScene, _X, _Y, _Z, _Scale, _Percent)
	{

		this.FreeBarImage = new Image();
		this.FreeBarImage.src = "3DEngine/VisualComponentsIn3D/ProgressBar3D/Images/FreeBar.png";

		var __MaterialCore = _OwnerScene.CreateMaterialCore_Texture("3DEngine/VisualComponentsIn3D/ProgressBar3D/Images/FullBar_Red.png");
		var __Material = _OwnerScene.CreateMaterial_NoLightableTexture(__MaterialCore, 1, 1, Colors.White, Colors.White, true);

		cProgressBar3D.BaseObject.constructor.call(this, _OwnerScene, _X, _Y, _Z, 0, 0, 0, 3 * _Scale, 1, 0.2 * _Scale, __Material, false, false);
		this.OwnerScene = _OwnerScene;
		this.Percent = _Percent;
		this.BarScale = _Scale;
	}
	,
	Initalize: function (_Camera)
	{
		var __Scale = this.DistanceTo(_Camera.CoordinateX.Value(), _Camera.CoordinateY.Value(), _Camera.CoordinateZ.Value()) / 500;
		this.Scale(3 * __Scale * this.BarScale, 1, 0.2 * __Scale * this.BarScale);

		this.Drawed = false;
		var __Translated = false
		if (!this.NoUseEffectWhenChildObject || this.MyDadModel == null)
		{
			if (this.EffectController.EffectCount() > 0)
			{
				this.EffectController.CalculateEffects(_Camera);
			}
			if (this.VelocityVector.X != 0 || this.VelocityVector.Y != 0 || this.VelocityVector.Z != 0 || this.RotateVelocityVector.X != 0 || this.RotateVelocityVector.Y != 0 || this.RotateVelocityVector.Z != 0)
			{
				if (_Camera.FrameRate != 0)
				{
					var __IncX = (DefaultSceneSettings.GameFPS / _Camera.FrameRate) * this.VelocityVector.X;
					var __IncY = (DefaultSceneSettings.GameFPS / _Camera.FrameRate) * this.VelocityVector.Y;
					var __IncZ = (DefaultSceneSettings.GameFPS / _Camera.FrameRate) * this.VelocityVector.Z;

					this.Translate(this.TranslateX.Value() + __IncX, this.TranslateY.Value() + __IncY, this.TranslateZ.Value() + __IncZ);
					__Translated = true;
				}
			}

		}

		if (!__Translated)
		{
			if (this.PrivateTranslateX != this.TranslateX.Value() || this.PrivateTranslateY != this.TranslateY.Value() || this.PrivateTranslateZ != this.TranslateZ.Value())
			{
				this.Translate(this.TranslateX.Value(), this.TranslateY.Value(), this.TranslateZ.Value());
			}
		}

		var __Rotate = cMath.GetRotate(_Camera.CoordinateX.Value(), _Camera.CoordinateY.Value(), _Camera.CoordinateZ.Value(), this.TranslateX.Value(), this.TranslateY.Value(), this.TranslateZ.Value());

		var __CamRotate = _Camera.GetRotate();
		var __RootRotate = this.GetRootRotate();

		if (this.RotateToCamera)
		{
			this.Rotate((__Rotate.RotateX * -1) + (Math.PI / 2) + this.FixedRotateX, __Rotate.RotateY + this.FixedRotateY, __Rotate.RotateZ + this.FixedRotateZ);
		}
		else
		{
			this.Rotate(((__CamRotate.RotateX - (__RootRotate.RotateX - this.RotateX.Value())) * -1) + (Math.PI / 2) + this.FixedRotateX, (__CamRotate.RotateY - (__RootRotate.RotateY - this.RotateY.Value())) + this.FixedRotateY, (__Rotate.RotateZ - (__RootRotate.RotateZ - this.RotateZ.Value())) + this.FixedRotateZ);
		}


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
		if (this.Material.GetTypeID() == ObjectTypes.cNoLightableVideo.ObjectTypeID)
		{
			this.Material.Initalize();
		}
	}
	,
	DrawFace: function (_Camera, _Face)
	{

		if (this.Material.GetTypeID() != ObjectTypes.cNoLightableTexture.ObjectTypeID && this.Material.GetTypeID() != ObjectTypes.cNoLightableVideo.ObjectTypeID)
		{
			this.RenderFaceTexture(_Camera, _Face);
		}
		else if (this.Material.GetTypeID() == ObjectTypes.cNoLightableTexture.ObjectTypeID)
		{
			if (this.TextureImage == null)
			{
				this.Material.Render(_Camera, this);
			}
		}

		if (this.ControlTextureLoaded())
		{

			var __Mesh = this.Mesh;
			var __SurfaceFaceIndices = _Face.FaceIndex * 3;

			var __Z1 = __Mesh.Translated_Vertex[(__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices] * 4) + 2];
			var __Z2 = __Mesh.Translated_Vertex[(__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices + 1] * 4) + 2];
			var __Z3 = __Mesh.Translated_Vertex[(__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices + 2] * 4) + 2];





			if (this.Z_clip && (__Z1 < 0 || __Z1 > 1 || __Z2 < 0 || __Z2 > 1 || __Z3 < 0 || __Z3 > 1))
			{
				return;
			}

			var __Width, __Height;

			if (this.Material.GetTypeID() == ObjectTypes.cNoLightableVideo.ObjectTypeID)
			{
				__Width = this.Material.Video.videoWidth;
				__Height = this.Material.Video.videoHeight;
			}
			else
			{
				__Width = this.TextureImage.width;
				__Height = this.TextureImage.height;
			}

			var __TempMatrix = new cMatrix2x2();

			if (!this.SurfaceNormal) this.SurfaceNormal = 0;


			var __X1 = __Mesh.Translated_Vertex[__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices] * 4];
			var __Y1 = __Mesh.Translated_Vertex[(__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices] * 4) + 1];

			var __X2 = __Mesh.Translated_Vertex[__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices + 1] * 4];
			var __Y2 = __Mesh.Translated_Vertex[(__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices + 1] * 4) + 1];

			var __X3 = __Mesh.Translated_Vertex[__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices + 2] * 4];
			var __Y3 = __Mesh.Translated_Vertex[(__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices + 2] * 4) + 1];

			/*
			Çok çizim varsa ve yavaşlarsa burayı aç*/

			if ((((__X1 < 0 || __X1 > _Camera.Width) || (__Y1 < 0 || __Y1 > _Camera.Height)) && ((__X2 < 0 || __X2 > _Camera.Width) || (__Y2 < 0 || __Y2 > _Camera.Height)) && ((__X3 < 0 || __X3 > _Camera.Width) || (__Y3 < 0 || __Y3 > _Camera.Height))) && this.VertexOutLineControl)
			{
				return;
			}


			var vAd = [__X2 - __X1, __Y2 - __Y1];
			var vBd = [__X3 - __X1, __Y3 - __Y1];
			var vCd = [__X3 - __X2, __Y3 - __Y2];

			// z component of cross product < 0 ?
			if ((((vAd[0] * vCd[1]) - (vAd[1] * vCd[0])) * this.SurfaceNormal) < 0 && _Camera.ShadingType != ShadingTypes.Wire)
			{
				return;
			}

			var __OrgX1 = __Mesh.Vertex[__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices] * 3];
			var __OrgY1 = __Mesh.Vertex[(__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices] * 3) + 1];
			var __OrgZ1 = __Mesh.Vertex[(__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices] * 3) + 2];


			var __OrgX2 = __Mesh.Vertex[__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices + 1] * 3];
			var __OrgY2 = __Mesh.Vertex[(__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices + 1] * 3) + 1];
			var __OrgZ2 = __Mesh.Vertex[(__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices + 1] * 3) + 2];


			var __OrgX3 = __Mesh.Vertex[__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices + 2] * 3];
			var __OrgY3 = __Mesh.Vertex[(__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices + 2] * 3) + 1];
			var __OrgZ3 = __Mesh.Vertex[(__Mesh.SurfaceVertexIndices[__SurfaceFaceIndices + 2] * 3) + 2];


			var uv_X1 = __Mesh.UVTextureCoordinates[(__Mesh.SurfaceTextureIndices[__SurfaceFaceIndices] * 2)];
			var uv_Y1 = __Mesh.UVTextureCoordinates[(__Mesh.SurfaceTextureIndices[__SurfaceFaceIndices] * 2) + 1];

			var uv_X2 = __Mesh.UVTextureCoordinates[(__Mesh.SurfaceTextureIndices[__SurfaceFaceIndices + 1] * 2)];
			var uv_Y2 = __Mesh.UVTextureCoordinates[(__Mesh.SurfaceTextureIndices[__SurfaceFaceIndices + 1] * 2) + 1];

			var uv_X3 = __Mesh.UVTextureCoordinates[(__Mesh.SurfaceTextureIndices[__SurfaceFaceIndices + 2] * 2)];
			var uv_Y3 = __Mesh.UVTextureCoordinates[(__Mesh.SurfaceTextureIndices[__SurfaceFaceIndices + 2] * 2) + 1];

			var __Distance = cMath.Distance3d(_Camera.CoordinateX.Value(), _Camera.CoordinateY.Value(), _Camera.CoordinateZ.Value(), (__OrgX1 + __OrgX2 + __OrgX3) / 3, (__OrgY1 + __OrgY2 + __OrgY3) / 3, (__OrgZ1 + __OrgZ2 + __OrgZ3) / 3);


			if (_Camera.ShadingType == ShadingTypes.Smooth3D)
			{
				var __MyColor = new cColor((255 / 255), (255 / 255), (255 / 255), 1);
				if (this.DoSmooth3D(_Camera, __MyColor, __X1, __Y1, __X2, __Y2, __X3, __Y3, __Distance))
				{
					//console.log("Distance : " + __Distance);
					__MyColor.Destroy();
					return;
				}
				__MyColor.Destroy();
			}
			else if (_Camera.ShadingType == ShadingTypes.WireFrame || _Camera.ShadingType == ShadingTypes.Wire)
			{
				if (this.DoWireFrame(_Camera, __X1, __Y1, __X2, __Y2, __X3, __Y3))
				{
					return;
				}
			}
			else if (_Camera.ShadingType == ShadingTypes.Smooth)
			{
				if (this.DoSmooth(_Camera, __X1, __Y1, __X2, __Y2, __X3, __Y3))
				{
					return;
				}
			}
			else if (_Camera.ShadingType == ShadingTypes.SmootWire)
			{
				if (this.DoSmootWire(_Camera, __X1, __Y1, __X2, __Y2, __X3, __Y3))
				{
					return;
				}
			}
			else if (_Camera.ShadingType == ShadingTypes.TexturedWire)
			{
				this.DoTexturedWire(_Camera, __X1, __Y1, __X2, __Y2, __X3, __Y3)
			}


			var vA = [uv_X2 - uv_X1, uv_Y2 - uv_Y1];
			var vB = [uv_X3 - uv_X1, uv_Y3 - uv_Y1];

			vA[0] *= __Width;
			vA[1] *= __Height;

			vB[0] *= __Width;
			vB[1] *= __Height;

			__TempMatrix._11 = vA[0];
			__TempMatrix._12 = vA[1];
			__TempMatrix._21 = vB[0];
			__TempMatrix._22 = vB[1];

			var __InvertedTempMatrix = __TempMatrix.GetInvert();
			if (!__InvertedTempMatrix)
			{
				return;
			}

			var a = __InvertedTempMatrix._11 * vAd[0] + __InvertedTempMatrix._12 * vBd[0];
			var b = __InvertedTempMatrix._21 * vAd[0] + __InvertedTempMatrix._22 * vBd[0];

			var c = __InvertedTempMatrix._11 * vAd[1] + __InvertedTempMatrix._12 * vBd[1];
			var d = __InvertedTempMatrix._21 * vAd[1] + __InvertedTempMatrix._22 * vBd[1];

			var wu = uv_X1 * __Width;
			var hv = uv_Y1 * __Height;

			var du = wu * a + hv * b;
			var dv = wu * c + hv * d;


			// bounds
			var bx = [wu, wu + vA[0], wu + vB[0]];
			var by = [hv, hv + vA[1], hv + vB[1]];

			bx.sort(this.NumberCmpForSort);
			by.sort(this.NumberCmpForSort);

			var bw = bx[2] - bx[0];
			var bh = by[2] - by[0];

			if ((bx[0] + bw) <= (__Width - 2)) bw++;
			if ((by[0] + bh) <= (__Height - 2)) bh++;
			if (bx[0] >= 1) { bx[0]--; bw++; }
			if (by[0] >= 1) { by[0]--; bh++; }


			if (!this.Drawed)
			{

				_Camera.Canvas2dContent.save();
				_Camera.Canvas2dContent.transform(a, c, b, d, __X1 - du, __Y1 - dv);

				_Camera.Canvas2dContent.drawImage(this.FreeBarImage, 0, 0, __Width, __Height);
				_Camera.Canvas2dContent.restore();

			}

			this.Drawed = true;



			_Camera.Canvas2dContent.save();
			_Camera.Canvas2dContent.beginPath();

			_Camera.Canvas2dContent.moveTo(__X1, __Y1);
			_Camera.Canvas2dContent.lineTo(__X2, __Y2);
			_Camera.Canvas2dContent.lineTo(__X3, __Y3);

			_Camera.Canvas2dContent.clip();
			_Camera.Canvas2dContent.transform(a, c, b, d, __X1 - du, __Y1 - dv);


			if (this.LighterModel)
			{
				_Camera.Canvas2dContent.globalCompositeOperation = "lighter";
			}

			if (this.Material.GetTypeID() == ObjectTypes.cNoLightableVideo.ObjectTypeID)
			{
				_Camera.Canvas2dContent.drawImage(this.Material.Video, 0, 0, __Width, __Height, 0, 0, __Width, __Height);

				//_Camera.Canvas2dContent.drawImage(this.Material.Video, bx[0], by[0], bw, bh, bx[0], by[0], bw, bh);
			}
			else
			{
				var __Distance = this.DistanceTo(_Camera.CoordinateX.Value(), _Camera.CoordinateY.Value(), _Camera.CoordinateZ.Value());

				_Camera.Canvas2dContent.drawImage(this.TextureImage, 0, 0, (__Width * (this.Percent / 100)), __Height);

				//_Camera.Canvas2dContent.drawImage(this.TextureImage, bx[0], by[0], bw, bh, bx[0], by[0], bw, bh);
			}

			if (this.LighterModel)
			{
				_Camera.Canvas2dContent.globalCompositeOperation = "source-over";
			}

			_Camera.Canvas2dContent.restore();
		}

	}
	,
	SetPercent: function (_Percent)
	{
		this.Percent = _Percent;
	}
	,
	BaseObject: function ()
	{
		return cRotateFixedPanelModel.prototype;
	}
	,
	Destroy: function ()
	{
		delete this.Drawed;
		delete this.FreeBarImage;
		delete this.Percent;
		cRotateFixedPanelModel.prototype.Destroy.call(this);
	}

}, {});







