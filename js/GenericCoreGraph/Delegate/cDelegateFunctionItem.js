
var cDelegateFunctionItem = Class(Object,
{
    Sender : null
    ,
    constructor: function(_Sender, _Function)
    {
        this.Sender = _Sender;
        if (JSTypeOperator.IsFunction(_Function))
        {
            this.FunctionObject = _Function;
        }
        else
        {
            DebugAlert.Show("Delegate Nesnesine Fonksiyon Dışı Obje Ekleme İsteği Yapıldı..!");
        }
    }
    ,    
    FunctionObject: function()
    {
        DebugAlert.Show("cDelegateFunctionItem Nesnesine Constructor'da Fonksiyon Atanmamış..!"); 
    }
    ,
    BaseObject: function()
    {
        return Object;
    }
}, {});
