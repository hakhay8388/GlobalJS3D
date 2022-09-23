
var cActionID = Class(Object,
{
    ActionID: 0,
    ActionName: "",
    constructor: function(Int_ActionID, String_ActionName)
    {
        ActionIDs.ActionIDList.Add(this);
        if (JSTypeOperator.IsNumeric(Int_ActionID) && IsString(String_ActionName))
        {
            this.ActionID = Int_ActionID;
            this.ActionName = String_ActionName;
        }
        else
        {
            DebugAlert.Show("cActionID Class'ı Oluşturulurken Tür Uyuşmazlığı Saptandı..!");
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
        delete this.ActionID;
        delete this.ActionName;        
    }
}, {});
