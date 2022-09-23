function cMatrix4x4(Cpy)
{
	if (Cpy)
		this.CopyFrom(Cpy);
	else
	{
		this.Ident();
	}
}

cMatrix4x4.prototype = {
	Ident: function ()
	{
		this._12 = this._13 = this._14 = 0;
		this._21 = this._23 = this._24 = 0;
		this._31 = this._32 = this._34 = 0;
		this._41 = this._42 = this._43 = 0;

		this._11 = this._22 = this._33 = this._44 = 1;

		return this;
	},

	CopyFrom: function (m)
	{
		this._11 = m._11;
		this._12 = m._12;
		this._13 = m._13;
		this._14 = m._14;

		this._21 = m._21;
		this._22 = m._22;
		this._23 = m._23;
		this._24 = m._24;

		this._31 = m._31;
		this._32 = m._32;
		this._33 = m._33;
		this._34 = m._34;

		this._41 = m._41;
		this._42 = m._42;
		this._43 = m._43;
		this._44 = m._44;

		return this;
	},

	TransVector3d: function (out, x, y, z)
	{
		out[0] = x * this._11 + y * this._21 + z * this._31 + this._41;
		out[1] = x * this._12 + y * this._22 + z * this._32 + this._42;
		out[2] = x * this._13 + y * this._23 + z * this._33 + this._43;
		out[3] = x * this._14 + y * this._24 + z * this._34 + this._44;
	},

	TransVector3dRot: function (out, x, y, z)
	{
		out[0] = x * this._11 + y * this._21 + z * this._31;
		out[1] = x * this._12 + y * this._22 + z * this._32;
		out[2] = x * this._13 + y * this._23 + z * this._33;
	},

    PerspectiveLH: function (vw, vh, z_near, z_far)
	{
        __fov = DefaultSceneSettings.CameraMatrixFov;

		this._11 = __fov;
		this._12 = 0;
		this._13 = 0;
		this._14 = 0;

		this._21 = 0;
		this._22 = __fov * (vw / vh);
		this._23 = 0;
		this._24 = 0;

		this._31 = 0;
		this._32 = 0;
		this._33 = z_far / (z_far - z_near);
		this._34 = 1;

		this._41 = 0;
		this._42 = 0;
		this._43 = (z_near * z_far) / (z_near - z_far);
		this._44 = 0;

		return this;
	},

	/*PerspectiveLH: function (vw, vh, z_near, z_far)
	{
	this._11 = 2.0 * z_near / vw;
	this._12 = 0;
	this._13 = 0;
	this._14 = 0;

	this._21 = 0;
	this._22 = 2 * z_near / vh;
	this._23 = 0;
	this._24 = 0;

	this._31 = 0;
	this._32 = 0;
	this._33 = z_far / (z_far - z_near);
	this._34 = 1;

	this._41 = 0;
	this._42 = 0;
	this._43 = (z_near * z_far) / (z_near - z_far);
	this._44 = 0;

	return this;
	},*/

	LookAtLH: function (aUp, aFrom, aAt)
	{
		var aX = new cVector3d();
		var aY = new cVector3d();

		var aZ = new cVector3d(aAt.X, aAt.Y, aAt.Z);
		aZ.Sub(aFrom).Normalize();

		aX.DoNormal(aUp, aZ).Normalize();
		aY.DoNormal(aZ, aX);

		this._11 = aX.X; this._12 = aY.X; this._13 = aZ.X; this._14 = 0;
		this._21 = aX.Y; this._22 = aY.Y; this._23 = aZ.Y; this._24 = 0;
		this._31 = aX.Z; this._32 = aY.Z; this._33 = aZ.Z; this._34 = 0;

		this._41 = -aFrom.Dot(aX);
		this._42 = -aFrom.Dot(aY);
		this._43 = -aFrom.Dot(aZ);
		this._44 = 1;

		return this;
	},

	Mul: function (A, B)
	{
		this._11 = A._11 * B._11 + A._12 * B._21 + A._13 * B._31 + A._14 * B._41;
		this._12 = A._11 * B._12 + A._12 * B._22 + A._13 * B._32 + A._14 * B._42;
		this._13 = A._11 * B._13 + A._12 * B._23 + A._13 * B._33 + A._14 * B._43;
		this._14 = A._11 * B._14 + A._12 * B._24 + A._13 * B._34 + A._14 * B._44;

		this._21 = A._21 * B._11 + A._22 * B._21 + A._23 * B._31 + A._24 * B._41;
		this._22 = A._21 * B._12 + A._22 * B._22 + A._23 * B._32 + A._24 * B._42;
		this._23 = A._21 * B._13 + A._22 * B._23 + A._23 * B._33 + A._24 * B._43;
		this._24 = A._21 * B._14 + A._22 * B._24 + A._23 * B._34 + A._24 * B._44;

		this._31 = A._31 * B._11 + A._32 * B._21 + A._33 * B._31 + A._34 * B._41;
		this._32 = A._31 * B._12 + A._32 * B._22 + A._33 * B._32 + A._34 * B._42;
		this._33 = A._31 * B._13 + A._32 * B._23 + A._33 * B._33 + A._34 * B._43;
		this._34 = A._31 * B._14 + A._32 * B._24 + A._33 * B._34 + A._34 * B._44;

		this._41 = A._41 * B._11 + A._42 * B._21 + A._43 * B._31 + A._44 * B._41;
		this._42 = A._41 * B._12 + A._42 * B._22 + A._43 * B._32 + A._44 * B._42;
		this._43 = A._41 * B._13 + A._42 * B._23 + A._43 * B._33 + A._44 * B._43;
		this._44 = A._41 * B._14 + A._42 * B._24 + A._43 * B._34 + A._44 * B._44;

		return this;
	},

	Translate: function (x, y, z)
	{
		this._11 = 1; this._12 = 0; this._13 = 0; this._14 = 0;
		this._21 = 0; this._22 = 1; this._23 = 0; this._24 = 0;
		this._31 = 0; this._32 = 0; this._33 = 1; this._34 = 0;

		this._41 = x; this._42 = y; this._43 = z; this._44 = 1;
		return this;
	},

	Transpose3x3: function ()
	{
		var t;

		t = this._12;
		this._12 = this._21;
		this._21 = t;

		t = this._13;
		this._13 = this._31;
		this._31 = t;

		t = this._23;
		this._23 = this._32;
		this._32 = t;

		return this;
	},

	// OpenGL style rotation
	GlRotate: function (angle, x, y, z)
	{
		var s = Math.sin(angle);
		var c = Math.cos(angle);

		var xx = x * x;
		var yy = y * y;
		var zz = z * z;
		var xy = x * y;
		var yz = y * z;
		var zx = z * x;
		var xs = x * s;
		var ys = y * s;
		var zs = z * s;
		var one_c = 1.0 - c;
		/*
		this._11 = (one_c * xx) + c;
		this._21 = (one_c * xy) - zs;
		this._31 = (one_c * zx) + ys;
		this._41 = 0;

		this._12 = (one_c * xy) + zs;
		this._22 = (one_c * yy) + c;
		this._32 = (one_c * yz) - xs;
		this._42 = 0;

		this._13 = (one_c * zx) - ys;
		this._23 = (one_c * yz) + xs;
		this._33 = (one_c * zz) + c;
		this._43 = 0;

		this._14 = 0;
		this._24 = 0;
		this._34 = 0;
		this._44 = 1;
		*/

		this._11 = (one_c * xx) + c;
		this._12 = (one_c * xy) - zs;
		this._13 = (one_c * zx) + ys;
		this._14 = 0;

		this._21 = (one_c * xy) + zs;
		this._22 = (one_c * yy) + c;
		this._23 = (one_c * yz) - xs;
		this._24 = 0;

		this._31 = (one_c * zx) - ys;
		this._32 = (one_c * yz) + xs;
		this._33 = (one_c * zz) + c;
		this._34 = 0;

		this._41 = 0;
		this._42 = 0;
		this._43 = 0;
		this._44 = 1;

		return this;
	}

}
