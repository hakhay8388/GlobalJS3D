DebugAlert = function()
{
}

DebugAlert.Enabled = true;

DebugAlert.Show = function(String_Msg)
{
    if (this.Enabled)
    {
        alert(String_Msg);
    }
}