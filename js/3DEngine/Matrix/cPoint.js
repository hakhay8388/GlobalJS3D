var cPoint = function(_X, _Y, _Z)
{
    this.X = _X || 0;
    this.Y = _Y || 0;
    this.Z = _Z || 0;
    this.ScalerMul = function(_Value)
    {
        this.X *= _Value;
        this.Y *= _Value;
        this.Z *= _Value;
    }

    this.ScalerMulCreateNew = function(_Value)
    {
        var __X = this.X * _Value;
        var __Y = this.Y * _Value;
        var __Z = this.Z * _Value;
        return new cPoint(__X, __Y, __Z);
    }

}


