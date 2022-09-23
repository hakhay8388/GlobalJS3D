const ObjectTypeIDCreater = function ()
{
}


ObjectTypeIDCreater.ID = 0;
ObjectTypeIDCreater.GetID = function ()
{
  ObjectTypeIDCreater.ID++;
  return ObjectTypeIDCreater.ID;
}



const cObjType = Class(Object,
{
      ObjectTypeID: 0,
      ObjectName: "",
      constructor: function (String_ObjectName)
      {
        ObjectTypes.TypeList.Add(this);
        if (JSTypeOperator.IsString(String_ObjectName))
        {
          this.ObjectTypeID = ObjectTypeIDCreater.GetID();
          this.ObjectName = String_ObjectName;
        }
        else
        {
          DebugAlert.Show("ObjType Class'ı Oluşturulurken Tür Uyuşmazlığı Saptandı..!");
        }
      }
      ,
      Destroy: function ()
      {
        delete this.ObjectTypeID;
        delete this.ObjectName;
      }
}, {});
  