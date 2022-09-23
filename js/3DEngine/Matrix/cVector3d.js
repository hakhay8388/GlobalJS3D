function cVector3d(_x, _y, _z)
{
	this.X= _x || 0;
	this.Y = _y || 0;
	this.Z = _z || 0;
}

cVector3d.prototype = {
	Zero: function ()
	{
		this.X= this.Y = this.Z = 0;
	},

	Sub: function (v)
	{
		this.X-= v.X;
		this.Y -= v.Y;
		this.Z -= v.Z;

		return this;
	},
	ScalarSub: function (v)
	{
		this.X-= v;
		this.Y -= v;
		this.Z -= v;

		return this;
	},

	Add: function (v)
	{
		this.X+= v.X;
		this.Y += v.Y;
		this.Z += v.Z;

		return this;
	},
	Mul: function (v)
	{
		this.X *= v.X;
		this.Y *= v.Y;
		this.Z *= v.Z;

		return this;
	},

	CopyFrom: function (v)
	{
		this.X= v.X;
		this.Y = v.Y;
		this.Z = v.Z;

		return this;
	},

	Magnitude: function ()
	{
		return Math.sqrt(this.X* this.X+ this.Y * this.Y + this.Z * this.Z);
	},

	Normalize: function ()
	{
		var nrm = Math.sqrt(this.X* this.X+ this.Y * this.Y + this.Z * this.Z);
		if (nrm != 0)
		{
			this.X/= nrm;
			this.Y /= nrm;
			this.Z /= nrm;
		}
		return this;
	},

	ScalarMul: function (k)
	{
		this.X*= k;
		this.Y *= k;
		this.Z *= k;

		return this;
	}
	,
	ScalarMulCreateNew: function (k)
	{
		var __X = this.X * k;
		var __Y = this.Y * k;
		var __Z = this.Z * k;

		return new cVector3d(__X, __Y, __Z);
	}
	,
	ScalarDiv: function (k)
	{
		this.X /= k;
		this.Y /= k;
		this.Z /= k;

		return this;
	}
	,
	Cross : function(w) 
	{
        return new cVector3d(-this.Z * w.Y + this.Y * w.Z, this.Z * w.X - this.X * w.Z, -this.Y * w.X + this.X * w.Y);
    }
    ,
	Dot: function (v)
	{
		return this.X* v.X+ this.Y * v.Y + this.Z * v.Z;
	}
	,
	DoNormal: function (v, w)
	{
		this.X= (w.Y * v.Z) - (w.Z * v.Y);
		this.Y = (w.Z * v.X) - (w.X* v.Z);
		this.Z = (w.X* v.Y) - (w.Y * v.X);

		return this;
	},
	Invert : function()
	{
	    this.X = -this.X;
	    this.Y = -this.Y;
	    this.Z = -this.Z;
	    return this;
	}
    ,   
	toString: function ()
	{
		return this.X+ ", " + this.Y + "," + this.Z;
	}
}
