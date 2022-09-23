

var cArial = Class(cBaseObject,
{
	ObjectType: ObjectTypes.cArial
	,
	constructor: function ()
	{
		cArial.BaseObject.constructor.call(this);
	}
	,
	GetCharWidth: function (_Char, _Punto)
	{
		if (_Char == 'A')
		{
			return Math.ceil(9 * (_Punto / 10));
		}
		else if (_Char == 'B')
		{
			return Math.ceil(9 * (_Punto / 10));
		}
		else if (_Char == 'C' || _Char == 'Ç')
		{
			return Math.ceil(9 * (_Punto / 10));
		}
		else if (_Char == 'D')
		{
			return Math.ceil(9 * (_Punto / 10));
		}
		else if (_Char == 'E')
		{
			return Math.ceil(9 * (_Punto / 10));
		}
		else if (_Char == 'F')
		{
			return Math.ceil(8 * (_Punto / 10));
		}
		else if (_Char == 'G' || _Char == 'Ğ')
		{
			return Math.ceil(10 * (_Punto / 10));
		}
		else if (_Char == 'H')
		{
			return Math.ceil(9 * (_Punto / 10));
		}
		else if (_Char == 'I' || _Char == 'İ')
		{
			return Math.ceil(3 * (_Punto / 10));
		}
		else if (_Char == 'J')
		{
			return Math.ceil(6 * (_Punto / 10));
		}
		else if (_Char == 'K')
		{
			return Math.ceil(9 * (_Punto / 10));
		}
		else if (_Char == 'L')
		{
			return Math.ceil(7 * (_Punto / 10));
		}
		else if (_Char == 'M')
		{
			return Math.ceil(11 * (_Punto / 10));
		}
		else if (_Char == 'N')
		{
			return Math.ceil(9 * (_Punto / 10));
		}
		else if (_Char == 'O' || _Char == 'Ö')
		{
			return Math.ceil(10 * (_Punto / 10));
		}
		else if (_Char == 'P')
		{
			return Math.ceil(9 * (_Punto / 10));
		}
		else if (_Char == 'Q')
		{
			return Math.ceil(10 * (_Punto / 10));
		}
		else if (_Char == 'R')
		{
			return Math.ceil(9 * (_Punto / 10));
		}
		else if (_Char == 'S')
		{
			return Math.ceil(9 * (_Punto / 10));
		}
		else if (_Char == 'T')
		{
			return Math.ceil(7 * (_Punto / 10));
		}
		else if (_Char == 'U')
		{
			return Math.ceil(9 * (_Punto / 10));
		}
		else if (_Char == 'V')
		{
			return Math.ceil(9 * (_Punto / 10));
		}
		else if (_Char == 'W')
		{
			return Math.ceil(13 * (_Punto / 10));
		}
		else if (_Char == 'X')
		{
			return Math.ceil(7 * (_Punto / 10));
		}
		else if (_Char == 'Y')
		{
			return Math.ceil(9 * (_Punto / 10));
		}
		else if (_Char == 'Z')
		{
			return Math.ceil(7 * (_Punto / 10));
		}
		else if (_Char == ' ')
		{
			return Math.ceil(4 * (_Punto / 10));
		}
		else
		{
			return Math.ceil(9 * (_Punto / 10));
		}
	}
	,
	GetPosisionInPixel: function (_Text, _Posision, _Punto)
	{
		var __Result = 0;
		if (_Text.length >= _Posision)
		{
			for (var i = 0; i < _Text.length; i++)
			{
				if (i < _Posision)
				{
					__Result += this.GetCharWidth(_Text.charAt(i), _Punto);
				}
				else
				{
					return __Result;
				}
			}
		}
		return __Result;
	}
	,
	BaseObject: function ()
	{
		return cBaseObject.prototype;
	}
    ,
	Destroy: function ()
	{
		cBaseObject.prototype.Destroy.call(this);
	}
}, {});




