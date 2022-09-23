IRenderReciver = Class(Interface, 
{
	ObjectType : ObjectTypes.Get("IRenderReciver"),
	Draw : function (_Camera)
	{
		DebugAlert.Show("IRenderReciver.Draw Override Edilmedi..!");
	}
}, {});




