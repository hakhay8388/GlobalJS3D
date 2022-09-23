
cDelegate = Class(cBaseObject,
{
    FunctionList: null,
    ParameterList: null,
    ObjectType: ObjectTypes.cDelegate,
    ControlFunctionTypes: false,
    constructor: function(_Argumants)
    {
        cDelegate.BaseObject.constructor.call(this);

        this.FunctionList = new cListForBase(); ;
        this.ParameterList = new cListForBase();

        for (var i = 0; i < arguments.length - 1; i++)
        {
            if (JSTypeOperator.IsObject(arguments[i]))
            {
                if (ObjectTypes.ValidateObjectInObjectList(arguments[i]))
                {
                    this.ParameterList.Add(arguments[i]);
                }
                else
                {
                    DebugAlert.Show("Delegate İçinine Gönderilen Parametre/ler ObjectTypes da Kayıtlı Değil..!");
                }
            }
            else
            {
                DebugAlert.Show("Delegate Tanımlarken ObjectTypes İçindeki Türlerden Belirtmelisiniz..!");
            }
        }
        if (arguments.length > 0)
        {
            this.ControlFunctionTypes = arguments[arguments.length - 1];
        }
    }
    ,

    Add: function(_Sender, _Funcion)
    {
        if (_Funcion.length == this.ParameterList.Count())
        {
            if (JSTypeOperator.IsFunction(_Funcion))
            {
                this.FunctionList.Add(new cDelegateFunctionItem(_Sender, _Funcion));
            }
            else
            {
                DebugAlert.Show("Delegate Nesnesine Fonksiyondan Başka Nesne Eklenemez..!");
            }
        }
        else
        {
            DebugAlert.Show("Delegate'te Eklenmek İstenen Fonsiyonun Parametre Sayısı Uygun Değil..!");
        }
    }
    ,
    Remove: function(_Function)
    {
        if (_Function.length == this.ParameterList.Count())
        {
            for (var i = this.FunctionList.Count() - 1; i > -1; i--)
            {
                if (this.FunctionList.GetItem(i).FunctionObject == _Function)
                {
                    this.FunctionList.RemoveAt(i);
                }
            }
        }
        else
        {
            DebugAlert.Show("Delegate'ten Silinmek İstenen Fonsiyonun Parametre Sayısı Uygun Değil..!");
        }
    }
    ,
    Run: function()
    {
        if (this.ControlFunctionTypes)
        {
            if (arguments.length == this.ParameterList.Count())
            {
                for (var i = 0; i < arguments.length; i++)
                {
                    if (typeof (arguments[i]) == "object")
                    {
                        if (arguments[i].GetTypeID() != this.ParameterList.GetItem(i).ObjectTypeID)
                        {
                            DebugAlert.Show("Delegate Tanımı İle Run Fonsiyonu Parametreleri Tutmuyor..!");
                            return;
                        }
                    }
                    else if (typeof (arguments[i]) != this.ParameterList.GetItem(i).ObjectName)
                    {
                        DebugAlert.Show("Delegate Tanımı İle Run Fonsiyonu Parametreleri Tutmuyor..!");
                        return;
                    }
                }

            }
            else
            {
                DebugAlert.Show("Delegate Tanımı İle Run Fonsiyonu Parametreleri Sayısı Tutmuyor..!");
                return;
            }
        }
        for (i = 0; i < this.FunctionList.Count(); i++)
        {
            var __Item = this.FunctionList.GetItem(i);
            __Item.FunctionObject.apply(__Item.Sender, arguments);
        }
    },
    BaseObject: function()
    {
        return cBaseObject.prototype;
    }

    ,
    Destroy: function()
    {
        this.FunctionList.Destroy();
        this.ParameterList.Destroy();
        delete this.FunctionList;
        delete this.ParameterList;
        delete this.ControlFunctionTypes;
        cBaseObject.prototype.Destroy.call(this);        
    }


}, {});                           

