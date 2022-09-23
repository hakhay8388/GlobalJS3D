
var cModelID = Class(Object,
{
    ModelID: 0,
    ModelName: "",
    constructor: function(Int_ModelID, String_ModelName)
    {
        ModelIDs.ModelIDList.Add(this);
        if (JSTypeOperator.IsNumeric(Int_ModelID) && IsString(String_ModelName))
        {
            this.ModelID = Int_ModelID;
            this.ModelName = String_ModelName;
        }
        else
        {
            DebugAlert.Show("cUnitID Class'ı Oluşturulurken Tür Uyuşmazlığı Saptandı..!");
        }
    }
     ,
    BaseObject: function()
    {
        return Object;
    }
    ,
    Destroy: function()
    {
        delete this.Int_ModelID;
        delete this.String_ModelName;        
    }
}, {});
