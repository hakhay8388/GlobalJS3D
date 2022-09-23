
const Abstract = function ()
{
  DebugAlert.Show("Override Edilmeyen Abstract Fonksiyonlar Var..!")
}


var IsInterfaceInstanceFunctionHandler = function (_This)
{
  var This = _This;
  return function (_Object)
  {
    return BaseInterfaceControl(_Object, This);
  }
}

var IsClassInstanceFunctionHandler = function (_This)
{
  var This = _This;
  return function (_Object)
  {
    return BaseClassControl(_Object, This);
  }
}


var BaseObjectFunctionHandler = function (_BaseObject)
{
  var BaseObject = _BaseObject;
  return function ()
  {
    return BaseObject.prototype;
  }
}

var GetBinderConstructor = function (_ConstructorFunction)
{
  return function () {
    for (var __Function in this)
    {
      if (typeof this[__Function] === "function")
      {
        if (__Function.startsWith("Handle") || __Function.startsWith("VK_"))
        {
          this[__Function] = this[__Function].bind(this);
        }
        else
        {
          var __Temp = this[__Function];
          if (!__Temp.prototype.ObjectType)
          {
            this[__Function] = this[__Function].bind(this);
          }
        }
      }
    }
    _ConstructorFunction.apply(this, arguments);
  }
};


const Class = function ()
{
  // inline overrides
  var __InlineOverrider = function (_Object)
  {
    for (var m in _Object)
    {
      this[m] = _Object[m];
    }
  };
  var __ObjectConstructor = Object.prototype.constructor;

  return function ()
  {
    var _DerivedClass = null;
    var _BaseClass = null;
    var _Overrides = null;


    _DerivedClass = arguments[0];
    _BaseClass = arguments[arguments.length - 2];
    _Overrides = arguments[arguments.length - 1];



    if (typeof _BaseClass == 'object')
    {
      _Overrides = _BaseClass;
      _BaseClass = _DerivedClass;

      if (_Overrides.constructor != __ObjectConstructor)
      {
        _DerivedClass = GetBinderConstructor(_Overrides.constructor);
      }
      else
      {
        _DerivedClass = GetBinderConstructor(function ()
        {
          _BaseClass.apply(this, arguments);
        });
      }
    }

    var __FreeFunction = function () { };

    var __BaseClassPrototype = null;
    if (Object == _BaseClass)
    {
      __BaseClassPrototype = Object;
    }
    else
    {
      __BaseClassPrototype = _BaseClass.prototype;
    }


    __FreeFunction.prototype = __BaseClassPrototype;
    var __DerivedClassPrototype = _DerivedClass.prototype = new __FreeFunction();
    __DerivedClassPrototype.constructor = _DerivedClass;

    _DerivedClass.BaseObject = __BaseClassPrototype;

    if (__BaseClassPrototype.constructor == __ObjectConstructor)
    {
      __BaseClassPrototype.constructor = _BaseClass;
    }

    _DerivedClass.Override = function (_Object)
    {
      Override(_DerivedClass, _Object);
    };

    __DerivedClassPrototype.Override = __InlineOverrider;

    var __BaseObjectHandler = new BaseObjectFunctionHandler(_BaseClass);
    _DerivedClass.Override({
      BaseObject: __BaseObjectHandler
    });

    Override(_DerivedClass, _Overrides);

    if (arguments.length > 3)
    {
      for (var i = arguments.length - 3; i > 0; i--)
      {
        var __ControlSameMethod = false;
        for (var j = i - 1; j > -1; j--)
        {
          if (ControlInterfaceSameMethod(arguments[i], arguments[j]))
          {
            __ControlSameMethod = true;
            break;
          }
        }
        if (!__ControlSameMethod)
        {
          OverrideInterface(_DerivedClass, arguments[i].prototype);
        }
      }
    }


    _DerivedClass.Extend = function (_Object)
    {
      Class(_DerivedClass, _Object, {});
    };

    try{
        if (_BaseClass == Interface)
        {
          _DerivedClass.IsInstance = new IsInterfaceInstanceFunctionHandler(__DerivedClassPrototype);
          _DerivedClass.IsAssignableFrom = new IsInterfaceInstanceFunctionHandler(__DerivedClassPrototype);
        }
        else
        {
          _DerivedClass.IsInstance = new IsClassInstanceFunctionHandler(__DerivedClassPrototype);
          _DerivedClass.IsAssignableFrom = new IsClassInstanceFunctionHandler(__DerivedClassPrototype);
        }
    }
    catch(_Ex)
    {
        _DerivedClass.IsInstance = new IsClassInstanceFunctionHandler(__DerivedClassPrototype);
        _DerivedClass.IsAssignableFrom = new IsClassInstanceFunctionHandler(__DerivedClassPrototype);
    }
    

    return _DerivedClass;
  };
}();


var BaseInterfaceControl = function (_Object, _Interface)
{
  var __Temp = null;
  eval("__Temp = _Object." + _Interface.ObjectType.ObjectName);
  if (__Temp == _Interface)
  {
    return true;
  }
  else
  {
    return false;
  }

}

var BaseClassControl = function (_Object, _BaseClass)
{
  try
  {
    if (_Object.ObjectType.ObjectTypeID == _BaseClass.ObjectType.ObjectTypeID)
    {
      return true;
    }
    else if (_Object.ObjectType.ObjectTypeID == ObjectTypes.cBaseObject.ObjectTypeID)
    {
      return false;
    }
    else
    {
      return BaseClassControl(_Object.BaseObject(), _BaseClass);
    }
  }
  catch (ex)
  {
    return false;
  }

}

var ControlInterfaceSameMethod = function (_Interface1, _Interface2)
{
  if (!_Interface1 || !_Interface2)
  {
    console.trace();
  }
  var ___Interface1Prototypes = _Interface1.prototype;
  var ___Interface2Prototypes = _Interface2.prototype;
  for (var _Method1 in ___Interface1Prototypes)
  {
    for (var _Method2 in ___Interface2Prototypes)
    {
      if (_Method1 == _Method2 && _Method1 != "constructor" && _Method1 != "Override" && _Method1 != "ObjectType" && _Method1 != "toJSONString" && _Method1 != "parseJSON" && _Method1 != "BaseObject")
      {
        DebugAlert.Show("BaseClass ve Interface'ler İçinde Aynı İsimde Methoda Rastlandı..!\nAynı Kullanılan Fonksiyon Adı '" + _Method1 + "' ");
        return true;
      }
    }
  }
  return false;
}


var OverrideInterface = function (_OriginalClass, _Overrides)
{
  if (_Overrides)
  {
    var __OriginalClassPrototypes = _OriginalClass.prototype;
    for (var __Method in _Overrides)
    {
      if (__Method != "ObjectType")
      {
        if (__Method != "constructor" && __Method != "Override")
        {
          var __Found = false;
          for (var __OrginalClassMethod in __OriginalClassPrototypes)
          {
            if (__OrginalClassMethod == __Method)
            {
              var __Object1 = _Overrides[__Method];
              var __Object2 = __OriginalClassPrototypes[__OrginalClassMethod];

              if (JSTypeOperator.IsFunction(__Object1) && JSTypeOperator.IsFunction(__Object2))
              {
                __OriginalClassPrototypes[_Overrides["ObjectType"].ObjectName] = _Overrides;
                if (__Object1.length == __Object2.length)
                {
                  __Found = true;
                  break;
                }
                else
                {
                  DebugAlert.Show(_Overrides["InterfaceName"].ObjectName + "." + __Method + "() Fonksiyonu Interface'deki parametreden Farklı Parametre Alıyor.");
                }
              }
              else
              {
                if (!JSTypeOperator.IsFunction(__Object1))
                {
                  DebugAlert.Show(_Overrides["InterfaceName"].ObjectName + "." + __Method + "  Değişken Olarak Tanımlanmış.\nInterface İçinde Değişken Tanımlanamaz..!");
                }
                else if (!JSTypeOperator.IsFunction(__Object2))
                {
                  DebugAlert.Show(_Overrides["InterfaceName"].ObjectName + " Interface'nden Türetilen Class'ta" + __Method + " Değişken Olarak Tanımlanmış..!");
                }

              }
            }
          }
          if (!__Found)
          {
            DebugAlert.Show(__Method + " Override Edilmemiş..!");
          }
        }
      }
    }
  }
};


var Override = function (_OriginalClass, _Overrides)
{
  if (_Overrides)
  {
    var __Prototypes = _OriginalClass.prototype;
    for (var _Method in _Overrides)
    {
      __Prototypes[_Method] = _Overrides[_Method];
    }
  }
};