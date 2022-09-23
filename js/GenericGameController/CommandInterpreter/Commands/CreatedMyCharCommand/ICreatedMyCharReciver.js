ICreatedMyCharReciver = Class(Interface, 
{
    ObjectType : ObjectTypes.Get("ICreatedMyCharReciver"),
    Recive_CreatedMyCharCommand : function (_Nick, _CharID, _UnitID, _Coordinate, _Velocity, _Healty, _Energy, _Speed, _Powers, _Level)
    {
    }
}, {});


