



Double = Class(cBaseValueType,
{
    m_Value: 0,
    ObjectType: ObjectTypes.Double,
    EventBeforeValueSet: null,
    EventAfterValueSet: null,
    EventValueGet: null,


    constructor: function(Number_Value)
    {
        Double.BaseObject.constructor.call(this, Number_Value);

        this.EventBeforeValueSet = new cDelegate(ObjectTypes.Double, true);
        this.EventAfterValueSet = new cDelegate(ObjectTypes.Double, true);
        this.EventValueGet = new cDelegate(ObjectTypes.Double,true);
        
        if (Number_Value < cMath.EPSILON && Number_Value > 0)
        {
            Number_Value = 0
        }
        if (Number_Value > (-cMath.EPSILON) && Number_Value < 0)
        {
            Number_Value = 0
        }

        if (JSTypeOperator.IsNumeric(Number_Value))
        {
            this.m_Value = Number_Value;
         /*   if (ValueController.ControlSignedDoubleValue(Number_Value))
            {
                this.m_Value = Number_Value;
            }
            else
            {
                DebugAlert.Show("Double Objesine Uygun Olmayan Bir Biçim Setlenmeye Çalışıldı..!");
            }*/
        }
        else
        {
            DebugAlert.Show("Double.Constructor'da Sayısal Bir Veri Gönderilmeli..!");
        }
    }
    ,
    Value: function(_Value)
    {
        if (arguments.length < 2)
        {
            if (_Value < cMath.EPSILON && _Value > 0)
            {
                _Value = 0
            }
            if (_Value > (-cMath.EPSILON) && _Value < 0)
            {
                _Value = 0
            }
            if (JSTypeOperator.IsNumeric(_Value))
            {

                    this.EventBeforeValueSet.Run(this);
                    this.m_Value = _Value;
                    this.EventAfterValueSet.Run(this);
                
/*                if (ValueController.ControlSignedDoubleValue(_Value))
                {
                    this.EventBeforeValueSet.Run(this);
                    this.m_Value = _Value;
                    this.EventAfterValueSet.Run(this);
                }
                else
                {
                    DebugAlert.Show("Double Objesine Uygun Olmayan Bir Biçim Setlenmeye Çalışıldı..!");
                }*/

            }
            else if (!JSTypeOperator.IsDefined(_Value))
            {
                this.EventValueGet.Run(this);
                return this.m_Value;
            }
            else
            {
                DebugAlert.Show("Double.Value() Fonksiyonu Uygun Olmayan Bir Biçimde Çağrıldı..!");
            }
        }
        else
        {
            DebugAlert.Show("Double.Value Fonsiyonuna Birden Fazla Değer Gönderilemez..!");
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
    ToStringObject: function()
    {
        return new cString(this.m_Value.toString());
    }
    ,
    ToString: function()
    {
        return this.m_Value.toString();
    }
    ,
    BaseObject: function()
    {
        return cBaseValueType.prototype;
    }
        ,
    Destroy: function()
    {
        cBaseValueType.prototype.Destroy.call(this);
    }


}, {});