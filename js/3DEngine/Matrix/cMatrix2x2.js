// matrix 2x2
function cMatrix2x2()
{
	this._11 = 1;
	this._12 = 0;
	this._21 = 0;
	this._22 = 1;
}

cMatrix2x2.prototype.GetInvert = function ()
{
	var out = new cMatrix2x2();
	var det = this._11 * this._22 - this._12 * this._21;
	if (det > -0.0001 && det < 0.0001)
		return null;

	out._11 = this._22 / det;
	out._22 = this._11 / det;

	out._12 = -this._12 / det;
	out._21 = -this._21 / det;

	return out;
}	
