
function cMath()
{
}

cMath.Distance2d = function (_X1, _Y1, _X2, _Y2)
{
	var __TempX = _X2 - _X1;
	var __TempY = _Y2 - _Y1;
	return Math.sqrt(__TempX * __TempX + __TempY * __TempY);
}

cMath.Distance3d = function (_X1, _Y1, _Z1, _X2, _Y2, _Z2)
{
	var __TempX = _X2 - _X1;
	var __TempY = _Y2 - _Y1;
	var __TempZ = _Z2 - _Z1;
	return Math.sqrt(__TempX * __TempX + __TempY * __TempY + __TempZ * __TempZ);
}

cMath.SlopeAngle2d = function (_P1X, _P1Y, _P2X, _P2Y)
{
	return Math.atan((_P2Y - _P1Y) / (_P2X - _P1X));
}


cMath.SlopeAngle3d = function (_X1, _Y1, _Z1, _X2, _Y2, _Z2)
{
	var __Distance2d = cMath.Distance2d(_X1, _Z1, _X2, _Z2);
	return cMath.SlopeAngle2d(0, _Y1, __Distance2d, _Y2);
}


cMath.DegToRad = function(_Angle)
{
    return _Angle * (Math.PI / 180.0);
}

cMath.RadToDeg = function (_Rad)
{
    return (180 * _Rad) / Math.PI;
}

cMath.DirectionedAngle = function(_Point1X, _Point1Y, _CommonPointX, _CommonPointY, _Point2X, _Point2Y)
{
	return cMath.LinesDirectionedAngle(_CommonPointX, _CommonPointY, _Point1X, _Point1Y, _CommonPointX, _CommonPointY, _Point2X, _Point2Y);
}

cMath.LinesDirectionedAngle = function(_L1P1_X, _L1P1_Y, _L1P2_X, _L1P2_Y, _L2P1_X, _L2P1_Y, _L2P2_X, _L2P2_Y)
{
    var __S1 = Math.atan2(_L1P2_Y - _L1P1_Y, _L1P2_X - _L1P1_X);
    var __S2 = Math.atan2(_L2P2_Y - _L2P1_Y, _L2P2_X - _L2P1_X);
    return __S2 - __S1;
   }

cMath.AngleBetween = function(_Vector1, _Vectro2) { 

	// turn vectors into unit vectors 
	n1 = _Vector1.Normalize();
	n2 = _Vectro2.Normalize();
	angle = Math.acos(n1.Dot(n2)); 
	return angle; 
}




cMath.NormalizeAngle = function(_Rad)
{
    var __Result = _Rad;
    if (__Result < 0)
    {
        while (__Result < 0)
        {
            __Result += 2.0 * Math.PI;
        }
    }
    else
    {
        while (__Result >= 2.0 * Math.PI)
        {
            __Result -= 2.0 * Math.PI;
        }
    }
    return __Result;
   }

   cMath.GetRotatedCoordinate = function (_RotateX, _RotateY, _CenterX, _CenterY, _CenterZ, _CurrentX, _CurrentY, _CurrentZ)
   {
   		var __Distance = cMath.Distance3d(_CurrentX, _CurrentY, _CurrentZ, _CenterX, _CenterY, _CenterZ);

		var __X = Math.sin(_RotateY) * __Distance;
		var __Z = Math.cos(_RotateY) * __Distance;
		var __XY_Mul = Math.cos(_RotateX);
		if (__XY_Mul != 0)
		{
			__X *= __XY_Mul;
			__Z *= __XY_Mul;
		}
		var __Y = Math.sin(_RotateX) * __Distance;

	   	__Result =
		{
			X: __X + _CenterX,
			Y: __Y + _CenterY,
			Z: __Z + _CenterZ
		}
	   	return __Result;

   }
   
	cMath.GetRotate = function (_X1, _Y1, _Z1, _X2, _Y2, _Z2)
	{
	    if (_Y1 != _Y2)
	    {
		    var __RotateX = cMath.SlopeAngle3d(_X1, _Y1, _Z1, _X2, _Y2, _Z2);
		}
		else
		{
		    var __RotateX = 0;
		}
		var __RotateY = cMath.NormalizeAngle(cMath.DirectionedAngle(_X2, _Z2, _X1,_Z1, _X1, _Z1 + 10));

		var __RotateZ = 0;

		__Result =
		{
			RotateX: __RotateX,
			RotateY: __RotateY,
			RotateZ: __RotateZ
		}
		return __Result;
	}   
   
	
    cMath.DETERMINANT_2x2 = function(A_1_1, A_1_2, A_2_1, A_2_2)
    {
        return (A_1_1 * A_2_2) - (A_1_2 * A_2_1);
    }

       cMath.EPSILON = 0.00000000001;

    cMath.GetProjectionOfPointOnLine2d = function (_PointX, _PointY, _LineX1, _LineY1, _LineX2, _LineY2)
    {
    	var __A11;
    	var __A12;
    	var __A21;
    	var __A22;
    	var __I_A11;
    	var __I_A12;
    	var __I_A21;
    	var __I_A22;
    	var __Determinant;
    	var __B11;
    	var __B21;
    	var __Result =
		{
			X: 0,
			Y: 0,
			Defined: false
		}

    	__A11 = _LineX2 - _LineX1;
    	__A12 = _LineY2 - _LineY1;
    	__A21 = -__A12;
    	__A22 = __A11;
    	__Determinant = cMath.DETERMINANT_2x2(__A11, __A12, __A21, __A22);
    	if (Math.Abs(__Determinant) > cMath.EPSILON)
    	{
    		__B11 = (_PointX * (__A11)) + (_PointY * (__A12));
    		__B21 = (_LineY1 * (__A11)) - (_LineX1 * (__A12));
    		__I_A11 = __A22;
    		__I_A22 = __A11;
    		__I_A21 = -__A21;
    		__I_A12 = -__A12;
    		__Result.X = (__I_A11 * __B11 + __I_A12 * __B21) / __Determinant;
    		__Result.Y = (__I_A21 * __B11 + __I_A22 * __B21) / __Determinant;
    		__Result.Defined = true;
    	}
    	else
    	{
    		__Result.Defined = false;
    	}
    	return __Result;
    }

 // Offset pIn by pOffset into pOut
cMath.VectorOffset  = function(pIn, pOffset, pOut)
{
   pOut.X = pIn.X - pOffset.X;
   pOut.Y = pIn.Y - pOffset.Y;
   pOut.Z = pIn.Z - pOffset.Z;
}


cMath.Sqr = function(_Value)
{
    return _Value * _Value;
}

cMath.PointAndLineDistance3d_InfinityLine = function (_PointX, _PointY, _PointZ, _LP1X, _LP1Y, _LP1Z, _LP2X, _LP2Y, _LP2Z)
{
	//çalışıyor ama sorun çıkarıyor.
	var __AB = new cVector3d(_LP2X - _LP1X, _LP2Y - _LP1Y, _LP2Z - _LP1Z);
	var __AP = new cVector3d(_PointX - _LP1X, _PointY - _LP1Y, _PointZ - _LP1Z);
	var __Crossed = __AB.Cross(__AP);
	var __A = __Crossed.Magnitude();
	var __Distance3d = cMath.Distance3d(_LP1X, _LP1Y, _LP1Z, _LP2X, _LP2Y, _LP2Z);

	return __A / __Distance3d;
}

cMath.PointAndLineDistance3d = function (_PointX, _PointY, _PointZ, _LP1X, _LP1Y, _LP1Z, _LP2X, _LP2Y, _LP2Z)
{
	var __AB = new cVector3d(_LP2X - _LP1X, _LP2Y - _LP1Y, _LP2Z - _LP1Z);
	var __AP = new cVector3d(_PointX - _LP1X, _PointY - _LP1Y, _PointZ - _LP1Z);
	var __C1 = __AP.Dot(__AB);

	if (__C1 <= 0)
	{
		return cMath.Distance3d(_PointX, _PointY, _PointZ, _LP1X, _LP1Y, _LP1Z);
	}

	var __C2 = __AB.Dot(__AB);

	if (__C2 <= __C1)
	{
		return cMath.Distance3d(_PointX, _PointY, _PointZ, _LP2X, _LP2Y, _LP2Z);
	}

	var __B = __C1 / __C2;
	__AB.ScalarMul(__B);
	var __PX = _LP1X + __AB.X;
	var __PY = _LP1Y + __AB.Y;
	var __PZ = _LP1Z + __AB.Z;
	var __Distance3d = cMath.Distance3d(__PX, __PY, __PZ, _PointX, _PointY, _PointZ);
	return __Distance3d;
}


cMath.PointAndLineHeight3d = function (_PointX, _PointY, _PointZ, _LP1X, _LP1Y, _LP1Z, _LP2X, _LP2Y, _LP2Z)
{
	var __DistanceAB = cMath.Distance3d(_LP1X, _LP1Y, _LP1Z, _LP2X, _LP2Y, _LP2Z);
	var __DistancePA = cMath.Distance3d(_PointX, _PointY, _PointZ, _LP1X, _LP1Y, _LP1Z);
	var __DistancePB = cMath.Distance3d(_PointX, _PointY, _PointZ, _LP2X, _LP2Y, _LP2Z);
	var __S = (__DistanceAB + __DistancePA + __DistancePB) / 2;
	var __TringleArea = Math.sqrt(__S * (__S - __DistanceAB) * (__S - __DistancePB) * (__S - __DistancePA));
	var __H = (2 * __TringleArea) / __DistanceAB;
	if (__H < __DistancePA && __H < __DistancePB)
	{
		return __H;
	}
	else
	{
		return Math.min(__DistancePA, __DistancePB);
	}
}




cMath.ComputeFaceNormal = function (_FacePoint1, _FacePoint2, _FacePoint3)
{

    a = new cVector3d();
    cMath.VectorOffset(_FacePoint3, _FacePoint2, a);
    b = new cVector3d();
    cMath.VectorOffset(_FacePoint1, _FacePoint2, b);

    pn = new cVector3d();
    pn.DoNormal(a, b);
    pn.Normalize

    return pn;
}


cMath.FaceVectorAngle = function (_FacePoint1, _FacePoint2, _FacePoint3, _Vector)
{
    __Vector = cMath.ComputeFaceNormal(_FacePoint1, _FacePoint2, _FacePoint3);
    return cMath.AngleBetween(_Vector, __Vector); 
}


/*cMath.IsPointInTriangle = function(_Point, _TrianglePoint1, _TrianglePoint2, _TrianglePoint3)
{
  var TotalArea = this.CalcTriArea(_TrianglePoint1, _TrianglePoint2, _TrianglePoint3);
  var Area1 = this.CalcTriArea(_Point, _TrianglePoint2, _TrianglePoint3);
  var Area2 = this.CalcTriArea(_Point, _TrianglePoint1, _TrianglePoint3);
  var Area3 = this.CalcTriArea(_Point, _TrianglePoint1, _TrianglePoint2);

  if((Area1 + Area2 + Area3) > TotalArea)
    return false;
  else
    return true;
}

cMath.CalcTriArea  = function(_TrianglePoint1, _TrianglePoint2, _TrianglePoint3)
{
  var det = 0.0;
  det = ((_TrianglePoint1.X - _TrianglePoint3.X) * (_TrianglePoint2.Y - _TrianglePoint3.Y)) - ((_TrianglePoint2.X - _TrianglePoint3.X) * (_TrianglePoint1.Y - _TrianglePoint3.Y));
  return (det / 2.0);
}*/

cMath.IsPointInTriangle = function(_Point, _TrianglePoint1, _TrianglePoint2, _TrianglePoint3)
{
    /*if ((_Point.X == _TrianglePoint1.X && _Point.Y == _TrianglePoint1.Y) || (_Point.X == _TrianglePoint2.X && _Point.Y == _TrianglePoint2.Y) || (_Point.X == _TrianglePoint3.X && _Point.Y == _TrianglePoint3.Y) )
    {
        return true;
    }*/
    // Compute vectors        
    v0 = new cVector3d(_TrianglePoint3.X - _TrianglePoint1.X, _TrianglePoint3.Y - _TrianglePoint1.Y, 0, 0);
    v1 = new cVector3d(_TrianglePoint2.X - _TrianglePoint1.X, _TrianglePoint2.Y - _TrianglePoint1.Y, 0, 0);
    v2 = new cVector3d(_Point.X - _TrianglePoint1.X, _Point.Y - _TrianglePoint1.Y, 0, 0);

    // Compute dot products
    dot00 = v0.Dot(v0);
    dot01 = v0.Dot(v1);
    dot02 = v0.Dot(v2);
    dot11 = v1.Dot(v1);
    dot12 = v1.Dot(v2);

    // Compute barycentric coordinates
    invDenom = 1 / (dot00 * dot11 - dot01 * dot01);
    u = (dot11 * dot02 - dot01 * dot12) * invDenom;
    v = (dot00 * dot12 - dot01 * dot02) * invDenom;

    // Check if point is in triangle
    return (u >= -0) && (v >= 0) && (u + v <= 1);
}


        cMath.DETERMINANT_2x2 = function(A_1_1, A_1_2, A_2_1, A_2_2)
        {
            return (A_1_1 * A_2_2) - (A_1_2 * A_2_1);
        }
        
        cMath.IsInsideClosedInterval = function(_Boundary1, _Boundary2, _Number)
        {
            return (Math.min(_Boundary1, _Boundary2) - cMath.EPSILON <= _Number) && (Math.max(_Boundary1, _Boundary2) + cMath.EPSILON >= _Number);
        }

        cMath.LinesIntersectionControl = function(_LSX1, _LSY1, _LSX2, _LSY2, _LX1, _LY1, _LX2, _LY2)
        {
            var __PAYDA;
            var __MPAY;
            var __m;

            __PAYDA = cMath.DETERMINANT_2x2(_LSX2 - _LSX1, _LX1 - _LX2, _LSY2 - _LSY1, _LY1 - _LY2);
            __MPAY = cMath.DETERMINANT_2x2(_LX1 - _LSX1, _LX1 - _LX2, _LY1 - _LSY1, _LY1 - _LY2);
            var __Result = 
            {
                X : 0,
                Y : 0,
                Defined : false
            }

            if (__PAYDA != 0)
            {
                __m = __MPAY / __PAYDA;
                __Result.Defined = true;
                __Result.X = _LSX1 + ((_LSX2 - _LSX1) * __m);
                __Result.Y = _LSY1 + ((_LSY2 - _LSY1) * __m);
            }
            return __Result;
        }
        
        cMath.CommonPointOfNonParallelLineSegments = function(_L1X1, _L1Y1, _L1X2, _L1Y2, _L2X1, _L2Y1, _L2X2, _L2Y2)
        {
            var __PAYDA;
            var __MPAY;
            var __NPAY;
            var __m;
            var __n;
            
            var __Result = 
            {
                X : 0,
                Y : 0,
                Defined : false
            }
            __PAYDA = cMath.DETERMINANT_2x2(_L1X2 - _L1X1, _L2X1 - _L2X2, _L1Y2 - _L1Y1, _L2Y1 - _L2Y2);
            __MPAY = cMath.DETERMINANT_2x2(_L2X1 - _L1X1, _L2X1 - _L2X2, _L2Y1 - _L1Y1, _L2Y1 - _L2Y2);
            __NPAY = cMath.DETERMINANT_2x2(_L1X2 - _L1X1, _L2X1 - _L1X1, _L1Y2 - _L1Y1, _L2Y1 - _L1Y1);

            __Result.Defined = false;
            if (__PAYDA != 0)
            {
                __m = __MPAY / __PAYDA;
                __n = __NPAY / __PAYDA;
                if (cMath.IsInsideClosedInterval(0, 1, __m) && cMath.IsInsideClosedInterval(0, 1, __n))
                {
                    __Result.Defined = true;
                    __Result.X = _L1X1 + ((_L1X2 - _L1X1) * __m);
                    __Result.Y = _L1Y1 + ((_L1Y2 - _L1Y1) * __m);
                }
            }
            return __Result;
        }
