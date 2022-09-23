

ModelIDs = function()
{
}

ModelIDs.ModelIDList = new cListForBase();



//********************** Animation **************************

ModelIDs.Worker = new cModelID(0, "İşçi Modeli");
ModelIDs.SpaceShip1 = new cModelID(1, "Uzay Gemisi 1");
ModelIDs.SpaceShip2 = new cModelID(2, "Uzay Gemisi 2");

//***********************************************************




ModelIDs.ValidateObjectInObjectList = function(_Model)
{
    for (var i = 0; i < ModelIDs.ModelIDList.Count(); i++)
    {
        if (_Model.ModelID ==ModelIDs.ModelIDList.GetItem(i).ModelID)
        {
            return true;
        }
    }
    return false;
}

