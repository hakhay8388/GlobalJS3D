
var cCommandID = Class(Object,
{
    CommandID: 0,
    CommandName: "",
    constructor: function(Int_CommandID, String_CommandName)
    {
        CommandIDs.CommandIDList.Add(this);
        if (JSTypeOperator.IsNumeric(Int_CommandID) && IsString(String_CommandName))
        {
            this.CommandID = Int_CommandID;
            this.CommandName = String_CommandName;
        }
        else
        {
            DebugAlert.Show("cCommandID Class'ı Oluşturulurken Tür Uyuşmazlığı Saptandı..!");
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
        delete this.CommandID;
        delete this.CommandName;        
    }
}, {});
