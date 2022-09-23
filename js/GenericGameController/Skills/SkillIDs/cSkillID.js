
var cSkillID = Class(Object,
{
	SkillID: 0,
	SkillName: "",
    constructor: function(Int_SkillID, String_SkillName)
    {
    	SkillIDs.SkillIDList.Add(this);
    	if (JSTypeOperator.IsNumeric(Int_SkillID) && IsString(String_SkillName))
        {
        	this.SkillID = Int_SkillID;
        	this.SkillName = String_SkillName;
        }
        else
        {
        	DebugAlert.Show("cSkillID Class'ı Oluşturulurken Tür Uyuşmazlığı Saptandı..!");
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
    	delete this.SkillID;
        delete this.SkillName;        
    }
}, {});
