
ValueController = function()
{
}



ValueController.ControlSignedIntegerValue = function(_Value)
{
    var __TempString = _Value.toString();
    if (__TempString.charAt(0) == "-")
    {
        __TempString = __TempString.substring(1, __TempString.length - 1);
        return ValueController.ControlIntegerValue(__TempString);    
    }
    else
    {
        return ValueController.ControlIntegerValue(_Value);
    }
}


ValueController.ControlSignedDoubleValue = function(_Value)
{
    var __TempString = _Value.toString();
    if (__TempString.charAt(0) == "-")
    {
        __TempString = __TempString.substring(1, __TempString.length - 1);
        return ValueController.ControlDoubleValue(__TempString);
    }
    else
    {
        return ValueController.ControlDoubleValue(_Value);
    }
}



ValueController.ControlIntegerValue = function(_Value)
{
    var __TempString = _Value.toString();
    for (var i = 0; i < __TempString.length; i++)
    {
        var __Found = false;
        for (var j = 0; j < 10; j++)
        {
            if (__TempString.charAt(i) == j.toString())
            {
                __Found = true;
                break;
            }
        }
        if (!__Found)
        {
            return false;
        }
    }
    return true;
}

ValueController.ControlDoubleValue = function(_Value)
{
    var __TempString = _Value.toString();
    var __PointFound = false;
    for (var i = 0; i < __TempString.length; i++)
    {
        var __Found = false;
        for (var j = 0; j < 10; j++)
        {
            if (__TempString.charAt(i) == j.toString())
            {
                __Found = true;
                break;
            }
        }
        if (!__Found)
        {
            if (__TempString.charAt(i) == ".")
            {
                if (__PointFound)
                {
                    return false;
                }
                __Found = true;
                __PointFound = true;
            }
            else
            {
                return false;
            }
        }
    }
    return true;
}