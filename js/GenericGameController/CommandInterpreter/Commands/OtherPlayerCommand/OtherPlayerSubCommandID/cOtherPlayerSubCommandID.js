
var cOtherPlayerSubCommandID = Class(Object,
{
    CommandID: 0,
    CommandName: "",
    constructor: function(Int_CommandID, String_CommandName)
    {
    	OtherPlayerSubCommandIDs.CommandIDList.Add(this);
        if (JSTypeOperator.IsNumeric(Int_CommandID) && IsString(String_CommandName))
        {
            this.CommandID = Int_CommandID;
            this.CommandName = String_CommandName;
        }
        else
        {
        	DebugAlert.Show("cOtherPlayerSubCommandID Class'ı Oluşturulurken Tür Uyuşmazlığı Saptandı..!");
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
