



Bool = Class(cBaseValueType,
{
    m_Value: true,
    ObjectType: ObjectTypes.Bool,
    EventBeforeValueSet: null,
    EventAfterValueSet: null,
    EventValueGet: null,


    constructor: function(Bool_Value)
    {
        Bool.BaseObject.constructor.call(this, Bool_Value);

        this.EventBeforeValueSet = new cDelegate(ObjectTypes.Bool, true);
        this.EventAfterValueSet = new cDelegate(ObjectTypes.Bool, true);
        this.EventValueGet = new cDelegate(ObjectTypes.Bool, true);

        if (JSTypeOperator.IsBool(Bool_Value))
        {
            this.m_Value = Bool_Value;
        }
        else
        {
            DebugAlert.Show("Bool.Constructor'da Boolean Bir Veri Gönderilmeli..!");
        }
    }
    ,
    Value: function(_Value)
    {
        if (arguments.length < 2)
        {
            if (JSTypeOperator.IsBool(_Value))
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
                DebugAlert.Show("Integer.Value() Fonksiyonu Uygun Olmayan Bir Biçimde Çağrıldı..!");
            }
        }
        else
        {
            DebugAlert.Show("Integer.Value Fonsiyonuna Birden Fazla Değer Gönderilemez..!");
        }
    }
    ,
    AddEventBeforeValueSet: function(_Sender, _Function)
    {
        this.EventBeforeValueSet.Add(_Sender, _Function);
    },
    RemoveEventBeforeValueSet: function(_Sender, _Function)
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
        this.EventValueGet.Add(_Function);
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