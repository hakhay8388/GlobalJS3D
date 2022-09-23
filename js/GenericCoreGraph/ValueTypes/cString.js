



cString = Class(cBaseValueType,
{
    m_Value: "",
    ObjectType: ObjectTypes.cString,
    EventBeforeValueSet: null,
    EventAfterValueSet: null,
    EventValueGet: null,


    constructor: function(String_Value)
    {
        cString.BaseObject.constructor.call(this, String_Value);

        this.EventBeforeValueSet = new cDelegate(ObjectTypes.cString, true);
        this.EventAfterValueSet = new cDelegate(ObjectTypes.cString, true);
        this.EventValueGet = new cDelegate(ObjectTypes.cString, true);

        if (JSTypeOperator.IsString(String_Value))
        {
            this.m_Value = String_Value;
        }
        else
        {
            DebugAlert.Show("cString.Constructor'da String Bir Veri Gönderilmeli..!");
        }
    }
    ,
    Value: function(_Value)
    {
        if (arguments.length < 2)
        {
            if (JSTypeOperator.IsString(_Value))
            {
                this.EventBeforeValueSet.Run(this);
                this.m_Value = _Value;
                this.EventAfterValueSet.Run(this);
            }
            else if (!JSTypeOperator.IsDefined(_Value))
            {
                this.EventValueGet.Run(this);
                return this.m_Value;
            }
            else
            {
                DebugAlert.Show("cString.Value() Fonksiyonu Uygun Olmayan Bir Biçimde Çağrıldı..!");
            }
        }
        else
        {
            DebugAlert.Show("cString.Value Fonsiyonuna Birden Fazla Değer Gönderilemez..!");
        }
    }
    ,
    AddEventBeforeValueSet: function(_Sender, _Function)
    {
        this.EventBeforeValueSet.Add(_Sender, _Function);
    },
    RemoveEventBeforeValueSet: function(_Function)
    {
        this.EventBeforeValueSet.Remove(_Function);
    },
    AddEventAferValueSet: function(_Sender, _Function)
    {
        this.EventAfterValueSet.Add(_Sender, _Function);
    },
    RemoveEventAferValueSet: function(_Function)
    {
        this.EventAfterValueSet.Remove(_Function);
    },
    AddEventValueGet: function(_Sender, _Function)
    {
        this.EventValueGet.Add(_Sender, _Function);
    },
    RemoveEventValueGet: function(_Function)
    {
        this.EventValueGet.Remove(_Function);
    }
    ,
    ToString: function()
    {
        return this;
    }
    ,
    Length: function()
    {
        return this.m_Value.length;
    }
    ,
    SubString: function(Number_StartIndex, Number_Count)
    {
        if (JSTypeOperator.IsNumeric(Number_StartIndex) && JSTypeOperator.IsNumeric(Number_Count))
        {
            if (ValueController.ControlIntegerValue(Number_StartIndex) && ValueController.ControlIntegerValue(Number_Count))
            {
                if (Number_Count + Number_StartIndex > this.m_Value.length)
                {
                    DebugAlert.Show("cString.SubString() Fonsiyonunda String Uzunluğu Aşıldı..!");
                }
                else
                {
                    return this.m_Value.substring(Number_StartIndex, Number_Count);
                }
            }
            else
            {
                DebugAlert.Show("cString.SubString() Fonsiyonu Başlangıç ve Uzunluk Değerleri Olmak Üzere 2 Integer Değer Almalıdır..!");
            }
        }
        else
        {
            DebugAlert.Show("cString.SubString() Fonsiyonu Başlangıç ve Uzunluk Değerleri Olmak Üzere 2 Integer Değer Almalıdır..!");
        }
    }
    ,
    SplitBySeparator: function(String_Separator)
    {
        if (JSTypeOperator.IsString(String_Separator))
        {
            return this.m_Value.split(String_Separator);
        }
        else
        {
            DebugAlert.Show("cString.SplitBySeparator() Fonsiyonunda Ayırıcı Olarak Bir String Gönderilmedi..!");
        }
    }

    ,
    CharAt: function(Number_Index)
    {
        if (JSTypeOperator.IsNumeric(Number_Index))
        {
            if (ValueController.ControlIntegerValue(Number_Index))
            {
                if (Number_Index < this.m_Value.length)
                {
                    return this.m_Value.charAt(Number_Index);
                }
                else
                {
                    DebugAlert.Show("cString.CharAt() Fonksiyonuna Gönderilen Değer String Uzunluğunu Aşıyor..!");
                }
            }
            else
            {
                DebugAlert.Show("cString.CharAt() Fonksiyonuna Ondalık Bir Sayı Gönderilemez..!");
            }
        }
        else
        {
            DebugAlert.Show("cString.SplitBySeparator() Fonsiyonunda Ayırıcı Olarak Bir String Gönderilmedi..!");
        }
    }
    ,
    IndexOf: function(String_SearchString, Number_StartIndex)
    {
        if (JSTypeOperator.IsString(String_SearchString) && JSTypeOperator.IsNumber(Number_StartIndex))
        {
            if (ValueController.ControlIntegerValue(Number_StartIndex))
            {
                if (Number_StartIndex < this.m_Value.length)
                {
                    return this.m_Value.indexOf(String_SearchString, Number_Index);
                }
                else
                {
                    DebugAlert.Show("cString.IndexOf() Fonksiyonuna Gönderilen Başlangıç Indeksi String Uzunluğunu Aşıyor..!");
                }
            }
            else
            {
                DebugAlert.Show("cString.IndexOf() Fonksiyonuna Başlangıç Indeksi Olarak Ondalık Bir Sayı Gönderilemez..!");
            }
        }
        else if (JSTypeOperator.IsString(String_SearchString))
        {
            return this.m_Value.indexOf(String_SearchString);
        }
        else
        {
            DebugAlert.Show("cString.IndexOf() Fonksiyonunu Uygun Parametrelerle Çağırılmadı..!");
        }
    }
    ,
    LastIndexOf: function(String_SearchString)
    {
        if (JSTypeOperator.IsString(String_SearchString))
        {
            return this.m_Value.lastIndexOf(String_SearchString);
        }
        else
        {
            DebugAlert.Show("cString.LastIndexOf() Fonksiyonunu Uygun Parametrelerle Çağırılmadı..!");
        }
    }   
    ,
       
    ToUpper: function()
    {
        return this.m_Value.toUpperCase();
    }
    ,
    ToLower: function()
    {
        return this.m_Value.toLowerCase();
    }
    ,
    BaseObject: function()
    {
        return cBaseValueType.prototype;
    }
    ,
    ToString: function()
    {
        return this.m_Value;
    }
    ,
    ToStringObject: function()
    {
        return this;
    }
        ,
    Destroy: function()
    {
        cBaseValueType.prototype.Destroy.call(this);
    }

    
}, {});