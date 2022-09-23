IMyCharMovedReciver = Class(Interface, 
{
    ObjectType : ObjectTypes.Get("IMyCharMovedReciver"),
    Recive_MyCharMovedCommand : function (_CharID, _Coordinate, _Velocity, _Vector, _CurrentSpeed, _Remote)
    {
    }
}, {});


