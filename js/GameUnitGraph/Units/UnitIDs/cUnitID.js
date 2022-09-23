
var cUnitID = Class(Object,
{
    UnitID: 0,
    UnitName: "",
    constructor: function(Int_UnitID, String_UnitName)
    {
        UnitIDs.UnitIDList.Add(this);
        if (JSTypeOperator.IsNumeric(Int_UnitID) && IsString(String_UnitName))
        {
            this.UnitID = Int_UnitID;
            this.UnitName = String_UnitName;
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
        delete this.Int_UnitID;
        delete this.String_UnitName;        
    }
}, {});
