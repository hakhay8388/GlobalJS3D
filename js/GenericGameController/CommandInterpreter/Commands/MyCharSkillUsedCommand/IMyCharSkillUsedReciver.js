IMyCharSkillUsedReciver = Class(Interface, 
{
    ObjectType : ObjectTypes.Get("IMyCharSkillUsedReciver"),
    Recive_MyCharSkillUsedCommand : function (_CharID, _SkillID, _Coordinate, _Velocity, _AttackAccelerationPower)
    {
    }
}, {});



