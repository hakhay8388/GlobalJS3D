
Convert = function()
{
}



Convert.ToInt = function(_Object)
{
    if (JSTypeOperator.IsObject(_Object))
    {
        if (_Object.GetTypeID() == ObjectTypes.Integer.ObjectTypeID)
        {
            return _Object;
        }
        else if (_Object.GetTypeID() == ObjectTypes.Double.ObjectTypeID)
        {
            return new Integer(parseInt(_Object.ToString()));
        }
        else if (_Object.GetTypeID() == ObjectTypes.cString.ObjectTypeID)
        {
            if (ValueController.ControlSignedDoubleValue(_Object.Value()))
            {
                return new Integer(parseInt(_Object.Value()));
            }
            else
            {
                DebugAlert.Show("cString.Value() Değerinden Integer Değerine Döndürülemicek Bir Değer Var..!")
            }
        }
        else if (_Object.GetTypeID() == ObjectTypes.Bool.ObjectTypeID)
        {
            if (_Object.Value())
            {
                return new Integer(1);
            }
            else
            {
                return new Integer(0);
            }
        }
        else
        {
            DebugAlert.Show("Convert.ToInt Fonksiyonuna Tanımlanamayan Bir Obje Gönderildi..!");
        }
    }
    else if (JSTypeOperator.IsNumeric(_Object))
    {
        if (ValueController.ControlSignedDoubleValue(_Object))
        {
            return new Integer(parseInt(_Object.toString()));
        }
    }
    else if (JSTypeOperator.IsString(_Object))
    {
        if (ValueController.ControlSignedDoubleValue(_Object))
        {
            return new Integer(parseInt(_Object));
        }
        else
        {
            DebugAlert.Show("Convert.ToInt Fonksiyonuna Gönderilen String Değer Sayısal Bir Değere Çevrilemiyor..!");
        }
    }
    else if (JSTypeOperator.IsBool(_Object))
    {
        if (_Object)
        {
            return new Integer(1);
        }
        else
        {
            return new Integer(0);
        }
    }
    else
    {
        DebugAlert.Show("Convert.ToInt Fonksiyonuna Gönderilen Değişken Tipi Sayısal Bir Değere Çevrilemiyor..!");
    }
}

Convert.ToDouble = function(_Object)
{
    if (JSTypeOperator.IsObject(_Object))
    {
        if (_Object.GetTypeID() == ObjectTypes.Double.ObjectTypeID)
        {
            return _Object;
        }
        else if (_Object.GetTypeID() == ObjectTypes.Integer.ObjectTypeID)
        {
            return new Double(_Object.Value()); ;
        }
        else if (_Object.GetTypeID() == ObjectTypes.cString.ObjectTypeID)
        {
            if (ValueController.ControlSignedDoubleValue(_Object.Value()))
            {
                return new Double(parseFloat(_Object.Value()));
            }
            else
            {
                DebugAlert.Show("cString.Value() Değerinden Double Değerine Döndürülemicek Bir Değer Var..!")
            }
        }
        else if (_Object.GetTypeID() == ObjectTypes.Bool.ObjectTypeID)
        {
            if (_Object.Value())
            {
                return new Double(1);
            }
            else
            {
                return new Double(0);
            }
        }
        else
        {
            DebugAlert.Show("Convert.ToDouble Fonksiyonuna Tanımlanamayan Bir Obje Gönderildi..!");
        }
    }
    else if (JSTypeOperator.IsNumeric(_Object))
    {
        if (ValueController.ControlSignedDoubleValue(_Object))
        {
            return new Double(parseFloat(_Object.toString()));
        }
    }
    else if (JSTypeOperator.IsString(_Object))
    {
        if (ValueController.ControlSignedDoubleValue(_Object))
        {
            return new Double(parseFloat(_Object));
        }
        else
        {
            DebugAlert.Show("Convert.ToDouble Fonksiyonuna Gönderilen String Değer Sayısal Bir Değere Çevrilemiyor..!");
        }
    }
    else if (JSTypeOperator.IsBool(_Object))
    {
        if (_Object)
        {
            return new Double(1);
        }
        else
        {
            return new Double(0);
        }
    }
    else
    {
        DebugAlert.Show("Convert.ToDouble Fonksiyonuna Gönderilen Değişken Tipi Sayısal Bir Değere Çevrilemiyor..!");
    }
}


Convert.ToBool = function(_Object)
{
    if (JSTypeOperator.IsObject(_Object))
    {
        if (_Object.GetTypeID() == ObjectTypes.Bool.ObjectTypeID)
        {
            return _Object;
        }
        else if (_Object.GetTypeID() == ObjectTypes.Integer.ObjectTypeID || _Object.GetTypeID() == ObjectTypes.Double.ObjectTypeID)
        {
            return new Bool(_Object.Value() > 0);
        }
        else if (_Object.GetTypeID() == ObjectTypes.cString.ObjectTypeID)
        {
            if (_Object.ToUpper() == "true".toUpperCase())
            {
                return new Bool(true);
            }
            else if (_Object.ToUpper() == "false".toUpperCase())
            {
                return new Bool(false);
            }
            else
            {
                DebugAlert.Show("cString.Value() Değerinden Bool Değerine Döndürülemicek Bir Değer Var..!")
            }
        }
        else
        {
            DebugAlert.Show("Convert.ToBool Fonksiyonuna Tanımlanamayan Bir Obje Gönderildi..!");
        }
    }
    else if (JSTypeOperator.IsNumeric(_Object))
    {
        return new Bool(_Object > 0);
    }
    else if (JSTypeOperator.IsString(_Object))
    {
        if (_Object.toUpperCase() == "true".toUpperCase())
        {
            return new Bool(true);
        }
        else if (_Object.toUpperCase() == "false".toUpperCase())
        {
            return new Bool(false);
        }
        else
        {
            DebugAlert.Show("Convert.ToBool Değerinden Bool Değerine Döndürülemicek Bir Değer Var..!")
        }
    }
    else if (JSTypeOperator.IsBool(_Object))
    {
        return new Bool(_Object);
    }
    else
    {
        DebugAlert.Show("Conver.ToBool Fonksiyonuna Gönderilen Değişken Tipi Boolean Bir Değere Çevrilemiyor..!");
    }
}


Convert.ToString = function(_Object)
{
    if (JSTypeOperator.IsObject(_Object))
    {
        return new cString(_Object.ToString());
    }
    else
    {
        return new cString(_Object.toString());
    }
}