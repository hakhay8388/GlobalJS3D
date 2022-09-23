

UnitIDs = function()
{
}

UnitIDs.UnitIDList = new cListForBase();



//********************** Animation **************************

UnitIDs.BaseUnit = new cUnitID(0, "Temel Hareketli Birim");
UnitIDs.SpaceShip1 = new cUnitID(1, "Uzay Gemisi 1");
UnitIDs.SpaceShip2 = new cUnitID(2, "Uzay Gemisi 2");


//***********************************************************




UnitIDs.ValidateObjectInObjectList = function(_Unit)
{
    for (var i = 0; i < UnitIDs.UnitIDList.Count(); i++)
    {
        if (_Unit.UnitID ==UnitIDs.UnitIDList.GetItem(i).UnitID)
        {
            return true;
        }
    }
    return false;
}
