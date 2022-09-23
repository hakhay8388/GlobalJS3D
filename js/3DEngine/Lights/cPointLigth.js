

var cPointLigth = Class(cBaseLight,
{
    ObjectType: ObjectTypes.cPointLigth
    , PointLightModel: null
    ,
    constructor: function (_OwnerScene, _X, _Y, _Z, _LightColor, _Intensity)
    {
        cPointLigth.BaseObject.constructor.call(this, _OwnerScene, _X, _Y, _Z, 0, 0, 0, _LightColor, _Intensity);
        
        var __MaterialCore = _OwnerScene.GameScene.CreateMaterialCore_Texture("nova.png");        
       	var __Material = _OwnerScene.CreateMaterial_Lambert(__MaterialCore, 0, 1, Colors.White, 0, 1, Colors.White, 0, 1, Colors.White);
        this.PointLightModel = _OwnerScene.CreateRotateFixedPanelModel(_X, _Y, _Z, 0, 0, 0, 1, 1, 1, __Material, false , true);
    }
    ,
    BaseObject: function ()
    {
        return cBaseLight.prototype;
    }
    ,
    Destroy: function ()
    {
        cBaseLight.prototype.Destroy.call(this);
    }
    ,
    Render: function (_Camera, _Material, _LightNo, _Model, _TextureData, _OrgTextureData, _FaceCenter, _Vertex1, _Vertex2, _Vertex3, _SurfaceNormalVector, _uv_X1, _uv_Y1, _Vertex1NormalVector, _uv_X2, _uv_Y2, _Vertex2NormalVector, _uv_X3, _uv_Y3, _Vertex3NormalVector)
    {
        var __MinX = 10000000;
        var __MinY = 10000000;

        var __ImageWidth = _TextureData.width;
        var __ImageHeight = _TextureData.height;

        if (_uv_X1 < _uv_X2) __MinX = _uv_X1
        else __MinX = _uv_X2;
        if (_uv_X3 < __MinX) __MinX = _uv_X3;

        if (_uv_Y1 < _uv_Y2) __MinY = _uv_Y1
        else __MinY = _uv_Y2;
        if (_uv_Y3 < __MinY) __MinY = _uv_Y3;

        if (_uv_X1 > _uv_X2) __MaxX = _uv_X1
        else __MaxX = _uv_X2;
        if (_uv_X3 > __MaxX) __MaxX = _uv_X3;

        if (_uv_Y1 > _uv_Y2) __MaxY = _uv_Y1
        else __MaxY = _uv_Y2;
        if (_uv_Y3 > __MaxY) __MaxY = _uv_Y3;


        var __MinForX = Math.round(__ImageWidth * __MinX) - 1;
        var __MinForY = Math.round(__ImageHeight * __MinY) - 1;

        var __MaxForX = Math.round(__ImageWidth * __MaxX) + 1;
        var __MaxForY = Math.round(__ImageHeight * __MaxY) + 1;


        var __CoordinateX1 = __ImageWidth * _uv_X1;
        var __CoordinateY1 = __ImageHeight * _uv_Y1;

        var __CoordinateX2 = __ImageWidth * _uv_X2;
        var __CoordinateY2 = __ImageHeight * _uv_Y2;

        var __CoordinateX3 = __ImageWidth * _uv_X3;
        var __CoordinateY3 = __ImageHeight * _uv_Y3;

        var __CenterTextureX = (__CoordinateX1 + __CoordinateX2 + __CoordinateX3) / 3;
        var __CenterTextureY = (__CoordinateY1 + __CoordinateY2 + __CoordinateY3) / 3;

        var __CenterDistance1 = cMath.Distance2d(__CoordinateX1, __CoordinateY1, __CenterTextureX, __CenterTextureY);
        var __CenterDistance2 = cMath.Distance2d(__CoordinateX2, __CoordinateY2, __CenterTextureX, __CenterTextureY);
        var __CenterDistance3 = cMath.Distance2d(__CoordinateX3, __CoordinateY3, __CenterTextureX, __CenterTextureY);

        var __CenterDistance = (__CenterDistance1 + __CenterDistance2 + __CenterDistance3) / 3;


        for (var x = __MinForX; x < __MaxForX; x++)
        {
            for (var y = __MinForY; y < __MaxForY; y++)
            {



                var __Point = new cPoint(x / __ImageWidth, y / __ImageHeight);
                 if (!cMath.IsPointInTriangle(__Point, new cPoint(_uv_X1, _uv_Y1), new cPoint(_uv_X2, _uv_Y2), new cPoint(_uv_X3, _uv_Y3)))
                {
                continue;
                }

                var i = ((y * __ImageHeight) + x) * 4;
                
                
                
                _TextureData.data[i + 3] = Math.round(this.Clamp(_Material.Transparency * 255, 0, 255));
                if (_Material.KeyColorIntensity)
                {
                    if (_OrgTextureData.data[i] == Math.round(_Material.KeyColor.Red * 255) && _OrgTextureData.data[i + 1] == Math.round(_Material.KeyColor.Green * 255) && _OrgTextureData.data[i + 2] == Math.round(_Material.KeyColor.Blue * 255))
                    {
                        _TextureData.data[i + 3] = _Material.KeyColorIntensity;
                        continue;
                    }
                }


                var __PointDistance1 = cMath.Distance2d(__Point.X * __ImageWidth, __Point.Y * __ImageHeight, __CoordinateX1, __CoordinateY1);
                var __PointDistance2 = cMath.Distance2d(__Point.X * __ImageWidth, __Point.Y * __ImageHeight, __CoordinateX2, __CoordinateY2);
                var __PointDistance3 = cMath.Distance2d(__Point.X * __ImageWidth, __Point.Y * __ImageHeight, __CoordinateX3, __CoordinateY3);

                var __Ratio1 = 0;
                var __Ratio2 = 0;
                var __Ratio3 = 0;
                    
                if (__PointDistance1 == 0)
                {
                    __Ratio1 = 1;
                    __Ratio2 = 0;
                    __Ratio3 = 0;
                }
                else if (__PointDistance2 == 0)
                {
                    __Ratio1 = 0;
                    __Ratio2 = 1;
                    __Ratio3 = 0;
                }
                else if (__PointDistance3 == 0)
                {
                    __Ratio1 = 0;
                    __Ratio2 = 0;
                    __Ratio3 = 1;
                }
                else
                {

                    var __IntersectResult1 = cMath.LinesIntersectionControl(__CoordinateX1, __CoordinateY1, x, y, __CoordinateX2, __CoordinateY2, __CoordinateX3, __CoordinateY3);
                    var __IntersectResult2 = cMath.LinesIntersectionControl(__CoordinateX2, __CoordinateY2, x, y, __CoordinateX1, __CoordinateY1, __CoordinateX3, __CoordinateY3);
                    var __IntersectResult3 = cMath.LinesIntersectionControl(__CoordinateX3, __CoordinateY3, x, y, __CoordinateX1, __CoordinateY1, __CoordinateX2, __CoordinateY2);

                    var __Point1MaxDistance = cMath.Distance2d(__IntersectResult1.X, __IntersectResult1.Y, __CoordinateX1, __CoordinateY1);
                    var __Point2MaxDistance = cMath.Distance2d(__IntersectResult2.X, __IntersectResult2.Y, __CoordinateX2, __CoordinateY2);
                    var __Point3MaxDistance = cMath.Distance2d(__IntersectResult3.X, __IntersectResult3.Y, __CoordinateX3, __CoordinateY3);


                    __Ratio1 = 1 - (__PointDistance1 / __Point1MaxDistance);
                    __Ratio2 = 1 - (__PointDistance2 / __Point2MaxDistance);
                    __Ratio3 = 1 - (__PointDistance3 / __Point3MaxDistance);
                }

                if (isNaN(__Ratio1))
                {
                    __Ratio1 = 0;
                }

                if (isNaN(__Ratio2))
                {
                    __Ratio2 = 0;
                }

                if (isNaN(__Ratio3))
                {
                    __Ratio3 = 0;
                }


                var __Vector1 = _Vertex1NormalVector.ScalarMulCreateNew(__Ratio1);
                var __Vector2 = _Vertex2NormalVector.ScalarMulCreateNew(__Ratio2);
                var __Vector3 = _Vertex3NormalVector.ScalarMulCreateNew(__Ratio3);

                var __SurfaceVector = new cVector3d();

                __SurfaceVector.Add(__Vector1);
                __SurfaceVector.Add(__Vector2);
                __SurfaceVector.Add(__Vector3);

                __SurfaceVector.Normalize();

                var __V1 = _Vertex1.ScalerMulCreateNew(__Ratio1);
                var __V2 = _Vertex2.ScalerMulCreateNew(__Ratio2);
                var __V3 = _Vertex3.ScalerMulCreateNew(__Ratio3);

                var __Center = new cPoint((__V1.X + __V2.X + __V3.X), (__V1.Y + __V2.Y + __V3.Y), (__V1.Z + __V2.Z + __V3.Z));

                var __LightVector = new cVector3d(this.X.Value() - __Center.X, this.Y.Value() - __Center.Y, this.Z.Value() - __Center.Z);
                __LightVector.Normalize();


                var __Dot = this.Saturate(__LightVector.Dot(__SurfaceVector));



                var __R = __SurfaceVector.ScalarMulCreateNew((2 * __Dot));
                __R.Sub(__LightVector);

                var __ViewVector = new cVector3d(_Camera.CoordinateX.Value() - __Center.X, _Camera.CoordinateY.Value() - __Center.Y, _Camera.CoordinateZ.Value() - __Center.Z);
                __ViewVector.Normalize();
                var __ViewDot = this.Saturate(__R.Dot(__ViewVector));


                var __Red = this.CalcBlinnPhongLighting(_Material.Diffuse, _Material.Specularity, _Material.SpecularPower, _Material.SpecularColor.Red, _Material.AmbientIntensity, _Material.AmbientColor.Red, _OrgTextureData.data[i], __ViewDot, __Dot, this.Intensity, this.LightColor.Red);
                var __Green = this.CalcBlinnPhongLighting(_Material.Diffuse, _Material.Specularity, _Material.SpecularPower, _Material.SpecularColor.Green, _Material.AmbientIntensity, _Material.AmbientColor.Green, _OrgTextureData.data[i + 1], __ViewDot, __Dot, this.Intensity, this.LightColor.Green);
                var __Blue = this.CalcBlinnPhongLighting(_Material.Diffuse, _Material.Specularity, _Material.SpecularPower, _Material.SpecularColor.Blue, _Material.AmbientIntensity, _Material.AmbientColor.Blue, _OrgTextureData.data[i + 2], __ViewDot, __Dot, this.Intensity, this.LightColor.Blue);


                if (_LightNo == 0)
                {
                    _TextureData.data[i] = 0;
                    _TextureData.data[i + 1] = 0;
                    _TextureData.data[i + 2] = 0;
                }

            }
        }
    }
    ,
    RenderNormalMap: function (_Camera, _Material, _LightNo, _Model, _TextureData, _OrgTextureData, _NormalData, _FaceCenter, _Vertex1, _Vertex2, _Vertex3, _SurfaceNormalVector, _uv_X1, _uv_Y1, _Vertex1NormalVector, _uv_X2, _uv_Y2, _Vertex2NormalVector, _uv_X3, _uv_Y3, _Vertex3NormalVector)
    {
        var __MinX = 10000000;
        var __MinY = 10000000;

        var __ImageWidth = _TextureData.width;
        var __ImageHeight = _TextureData.height;

        if (_uv_X1 < _uv_X2) __MinX = _uv_X1
        else __MinX = _uv_X2;
        if (_uv_X3 < __MinX) __MinX = _uv_X3;

        if (_uv_Y1 < _uv_Y2) __MinY = _uv_Y1
        else __MinY = _uv_Y2;
        if (_uv_Y3 < __MinY) __MinY = _uv_Y3;

        if (_uv_X1 > _uv_X2) __MaxX = _uv_X1
        else __MaxX = _uv_X2;
        if (_uv_X3 > __MaxX) __MaxX = _uv_X3;

        if (_uv_Y1 > _uv_Y2) __MaxY = _uv_Y1
        else __MaxY = _uv_Y2;
        if (_uv_Y3 > __MaxY) __MaxY = _uv_Y3;


        var __MinForX = Math.round(__ImageWidth * __MinX) - 1;
        var __MinForY = Math.round(__ImageHeight * __MinY) - 1;

        var __MaxForX = Math.round(__ImageWidth * __MaxX) + 1;
        var __MaxForY = Math.round(__ImageHeight * __MaxY) + 1;


        var __CoordinateX1 = __ImageWidth * _uv_X1;
        var __CoordinateY1 = __ImageHeight * _uv_Y1;

        var __CoordinateX2 = __ImageWidth * _uv_X2;
        var __CoordinateY2 = __ImageHeight * _uv_Y2;

        var __CoordinateX3 = __ImageWidth * _uv_X3;
        var __CoordinateY3 = __ImageHeight * _uv_Y3;

        var __CenterTextureX = (__CoordinateX1 + __CoordinateX2 + __CoordinateX3) / 3;
        var __CenterTextureY = (__CoordinateY1 + __CoordinateY2 + __CoordinateY3) / 3;

        var __CenterDistance1 = cMath.Distance2d(__CoordinateX1, __CoordinateY1, __CenterTextureX, __CenterTextureY);
        var __CenterDistance2 = cMath.Distance2d(__CoordinateX2, __CoordinateY2, __CenterTextureX, __CenterTextureY);
        var __CenterDistance3 = cMath.Distance2d(__CoordinateX3, __CoordinateY3, __CenterTextureX, __CenterTextureY);

        var __CenterDistance = (__CenterDistance1 + __CenterDistance2 + __CenterDistance3) / 3;


        for (var x = __MinForX; x < __MaxForX; x++)
        {
            for (var y = __MinForY; y < __MaxForY; y++)
            {



                var __Point = new cPoint(x / __ImageWidth, y / __ImageHeight);
                if (!cMath.IsPointInTriangle(__Point, new cPoint(_uv_X1, _uv_Y1), new cPoint(_uv_X2, _uv_Y2), new cPoint(_uv_X3, _uv_Y3)))
                {
                    continue;
                }

                var i = ((y * __ImageHeight) + x) * 4;

                _TextureData.data[i + 3] = Math.round(this.Clamp(_Material.Transparency * 255, 0, 255));
                if (_Material.KeyColorIntensity)
                {
                    if (_OrgTextureData.data[i] == Math.round(_Material.KeyColor.Red * 255) && _OrgTextureData.data[i + 1] == Math.round(_Material.KeyColor.Green * 255) && _OrgTextureData.data[i + 2] == Math.round(_Material.KeyColor.Blue * 255))
                    {
                        _TextureData.data[i + 3] = _Material.KeyColorIntensity;
                        continue;
                    }
                }

                var __PointDistance1 = cMath.Distance2d(__Point.X * __ImageWidth, __Point.Y * __ImageHeight, __CoordinateX1, __CoordinateY1);
                var __PointDistance2 = cMath.Distance2d(__Point.X * __ImageWidth, __Point.Y * __ImageHeight, __CoordinateX2, __CoordinateY2);
                var __PointDistance3 = cMath.Distance2d(__Point.X * __ImageWidth, __Point.Y * __ImageHeight, __CoordinateX3, __CoordinateY3);



                var __IntersectResult1 = cMath.LinesIntersectionControl(__CoordinateX1, __CoordinateY1, x, y, __CoordinateX2, __CoordinateY2, __CoordinateX3, __CoordinateY3);
                var __IntersectResult2 = cMath.LinesIntersectionControl(__CoordinateX2, __CoordinateY2, x, y, __CoordinateX1, __CoordinateY1, __CoordinateX3, __CoordinateY3);
                var __IntersectResult3 = cMath.LinesIntersectionControl(__CoordinateX3, __CoordinateY3, x, y, __CoordinateX1, __CoordinateY1, __CoordinateX2, __CoordinateY2);

                var __Point1MaxDistance = cMath.Distance2d(__IntersectResult1.X, __IntersectResult1.Y, __CoordinateX1, __CoordinateY1);
                var __Point2MaxDistance = cMath.Distance2d(__IntersectResult2.X, __IntersectResult2.Y, __CoordinateX2, __CoordinateY2);
                var __Point3MaxDistance = cMath.Distance2d(__IntersectResult3.X, __IntersectResult3.Y, __CoordinateX3, __CoordinateY3);


                var __Ratio1 = 1 - (__PointDistance1 / __Point1MaxDistance);
                var __Ratio2 = 1 - (__PointDistance2 / __Point2MaxDistance);
                var __Ratio3 = 1 - (__PointDistance3 / __Point3MaxDistance);


                if (isNaN(__Ratio1))
                {
                    __Ratio1 = 0;
                }

                if (isNaN(__Ratio2))
                {
                    __Ratio2 = 0;
                }

                if (isNaN(__Ratio3))
                {
                    __Ratio3 = 0;
                }


                var __Vector1 = _Vertex1NormalVector.ScalarMulCreateNew(__Ratio1);
                var __Vector2 = _Vertex2NormalVector.ScalarMulCreateNew(__Ratio2);
                var __Vector3 = _Vertex3NormalVector.ScalarMulCreateNew(__Ratio3);

                var __SurfaceVector = new cVector3d();

                __SurfaceVector.Add(__Vector1);
                __SurfaceVector.Add(__Vector2);
                __SurfaceVector.Add(__Vector3);

                __SurfaceVector.Normalize();


                /*                __SurfaceVector.X = __NormalVector.X;
                __SurfaceVector.Y = __NormalVector.Y;
                __SurfaceVector.Z = __NormalVector.Z;*/

                var __V1 = _Vertex1.ScalerMulCreateNew(__Ratio1);
                var __V2 = _Vertex2.ScalerMulCreateNew(__Ratio2);
                var __V3 = _Vertex3.ScalerMulCreateNew(__Ratio3);

                var __Center = new cPoint((__V1.X + __V2.X + __V3.X), (__V1.Y + __V2.Y + __V3.Y), (__V1.Z + __V2.Z + __V3.Z));

                /*if ((i % 100) == 0)
                {
                this.OwnerScene.CreateLine(__Center.X, __Center.Y, __Center.Z, __Center.X + __SurfaceVector.X, __Center.Y + __SurfaceVector.Y, __Center.Z + __SurfaceVector.Z);
                }*/


                var __LightVector = new cVector3d(this.X.Value() - __Center.X, this.Y.Value() - __Center.Y, this.Z.Value() - __Center.Z);
                __LightVector.Normalize();


                var __Dot = this.Saturate(__LightVector.Dot(__SurfaceVector));



                nx = ((_NormalData.data[i] / 255) * 2) - 1;
                nz = ((_NormalData.data[i + 1] / 255) * 2) - 1;
                ny = ((_NormalData.data[i + 2] / 255) * 2) - 1;

                var __NormalVector = new cVector3d(nx, ny, nz);
                __NormalVector.Normalize();


                __SurfaceVector.Add(__NormalVector);

                __SurfaceVector.Normalize();


                var __R = __SurfaceVector.ScalarMulCreateNew((2 * __Dot));
                __R.Sub(__LightVector);

                var __ViewVector = new cVector3d(_Camera.CoordinateX.Value() - __Center.X, _Camera.CoordinateY.Value() - __Center.Y, _Camera.CoordinateZ.Value() - __Center.Z);
                __ViewVector.Normalize();

                var __ViewDot = this.Saturate(__R.Dot(__ViewVector));


                var __Red = this.CalcBlinnPhongLighting(_Material.Diffuse, _Material.Specularity, _Material.SpecularPower, _Material.SpecularColor.Red, _Material.AmbientIntensity, _Material.AmbientColor.Red, _OrgTextureData.data[i], __ViewDot, __Dot, this.Intensity, this.LightColor.Red);
                var __Green = this.CalcBlinnPhongLighting(_Material.Diffuse, _Material.Specularity, _Material.SpecularPower, _Material.SpecularColor.Green, _Material.AmbientIntensity, _Material.AmbientColor.Green, _OrgTextureData.data[i + 1], __ViewDot, __Dot, this.Intensity, this.LightColor.Green);
                var __Blue = this.CalcBlinnPhongLighting(_Material.Diffuse, _Material.Specularity, _Material.SpecularPower, _Material.SpecularColor.Blue, _Material.AmbientIntensity, _Material.AmbientColor.Blue, _OrgTextureData.data[i + 2], __ViewDot, __Dot, this.Intensity, this.LightColor.Blue);


                if (_LightNo == 0)
                {
                    _TextureData.data[i] = 0;
                    _TextureData.data[i + 1] = 0;
                    _TextureData.data[i + 2] = 0;
                }

                _TextureData.data[i] += Math.round(this.Clamp(__Red, 0, 255));
                _TextureData.data[i + 1] += Math.round(this.Clamp(__Green, 0, 255));
                _TextureData.data[i + 2] += Math.round(this.Clamp(__Blue, 0, 255));

            }
        }
    }

}, {});




