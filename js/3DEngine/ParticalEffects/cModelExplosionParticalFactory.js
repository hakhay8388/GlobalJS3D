
var cModelExplosionParticalFactory = Class(cBaseParticalFactory, {
	ObjectType: ObjectTypes.cModelExplosionParticalFactory
	, OwnerScene : null
	, Model : null
	, ParticalCreated : false
	, DestroyRealModel : true
    , DestroyParticalOneByOne : true	
    , Solid : false
	,
	constructor: function (_OwnerScene, _Model, _DestroyRealModel, _LighterPartical, _Solid)
	{
		cModelExplosionParticalFactory.BaseObject.constructor.call(this, _OwnerScene, _LighterPartical);
        this.OwnerScene = _OwnerScene;
        this.Model = _Model;
        this.DestroyRealModel = _DestroyRealModel;
        this.Solid = _Solid;
	}
	,
	BaseObject: function ()
	{
		return cBaseParticalFactory.prototype;
	}
	,
	Destroy: function ()
	{
		cBaseParticalFactory.prototype.Destroy.call(this);
	}
	,
	CreatePartical : function(_OwnerEmiter, _Count)
	{
	    if (!this.ParticalCreated)
	    {   
  	        var __TempVelocity = new cVector3d(_OwnerEmiter.ParticalVelocity.X, _OwnerEmiter.ParticalVelocity.Y, _OwnerEmiter.ParticalVelocity.Z);
  	        var __TempRandomParticalVelocity = _OwnerEmiter.UseRandomParticalVelocity;  	        
  	        var __TempRandomRotate = _OwnerEmiter.UseRandomParticalRotate;
  	        var __TempRotate = _OwnerEmiter.ParticalRotate ;
  	        


            var __Center = this.Model.GetMeshCenter();
            for (var i = 0; i < this.Model.Mesh.SurfaceVertexIndices.length; i+=3)
            {
                var __ParticalMesh = new cParticalMesh();
                __ParticalMesh.Vertex[0] = this.Model.Mesh.Vertex[(this.Model.Mesh.SurfaceVertexIndices[i] * 3)];
                __ParticalMesh.Vertex[1] = this.Model.Mesh.Vertex[(this.Model.Mesh.SurfaceVertexIndices[i] * 3) + 1];
                __ParticalMesh.Vertex[2] = this.Model.Mesh.Vertex[(this.Model.Mesh.SurfaceVertexIndices[i] * 3) + 2];

                __ParticalMesh.Vertex[3] = this.Model.Mesh.Vertex[(this.Model.Mesh.SurfaceVertexIndices[i + 1] * 3)];
                __ParticalMesh.Vertex[4] = this.Model.Mesh.Vertex[(this.Model.Mesh.SurfaceVertexIndices[i + 1] * 3) + 1];
                __ParticalMesh.Vertex[5] = this.Model.Mesh.Vertex[(this.Model.Mesh.SurfaceVertexIndices[i + 1] * 3) + 2];
                
                __ParticalMesh.Vertex[6] = this.Model.Mesh.Vertex[(this.Model.Mesh.SurfaceVertexIndices[i + 2] * 3)];
                __ParticalMesh.Vertex[7] = this.Model.Mesh.Vertex[(this.Model.Mesh.SurfaceVertexIndices[i + 2] * 3) + 1];
                __ParticalMesh.Vertex[8] = this.Model.Mesh.Vertex[(this.Model.Mesh.SurfaceVertexIndices[i + 2] * 3) + 2];                


                var __TextureIndices = (i / 3) * 2;
                __ParticalMesh.UVTextureCoordinates[0] = this.Model.Mesh.UVTextureCoordinates[(this.Model.Mesh.SurfaceTextureIndices[i] * 2)];
                __ParticalMesh.UVTextureCoordinates[1] = this.Model.Mesh.UVTextureCoordinates[(this.Model.Mesh.SurfaceTextureIndices[i] * 2) + 1];

                __ParticalMesh.UVTextureCoordinates[2] = this.Model.Mesh.UVTextureCoordinates[(this.Model.Mesh.SurfaceTextureIndices[i + 1] * 2)];
                __ParticalMesh.UVTextureCoordinates[3] = this.Model.Mesh.UVTextureCoordinates[(this.Model.Mesh.SurfaceTextureIndices[i + 1] * 2) + 1];
                
                __ParticalMesh.UVTextureCoordinates[4] = this.Model.Mesh.UVTextureCoordinates[(this.Model.Mesh.SurfaceTextureIndices[i + 2] * 2)];
                __ParticalMesh.UVTextureCoordinates[5] = this.Model.Mesh.UVTextureCoordinates[(this.Model.Mesh.SurfaceTextureIndices[i + 2] * 2) + 1];
                
                var __NewMeshCenter = new cPoint((__ParticalMesh.Vertex[0] + __ParticalMesh.Vertex[3] + __ParticalMesh.Vertex[6]) / 3, (__ParticalMesh.Vertex[1] + __ParticalMesh.Vertex[4] + __ParticalMesh.Vertex[7]) / 3, (__ParticalMesh.Vertex[2] + __ParticalMesh.Vertex[5] + __ParticalMesh.Vertex[8]) / 3);
                
                var __Model = this.OwnerScene.CreateModel(0, 0, 0, 0, 0, 0, 1, 1, 1, __ParticalMesh, this.Model.Material, 0, true, false, false, this.LighterPartical);
                
      	        var __Count = _OwnerEmiter.EffectList.Count();
	            for (var j = 0; j < __Count; j++)
	            {
	                var __Item = _OwnerEmiter.EffectList.GetItem(j);
	                __Model.EffectController.AddEffect(__Item);
	            }
	            
	        	_OwnerEmiter.ParticalVelocity = new cVector3d(__NewMeshCenter.X - __Center.X, __NewMeshCenter.Y - __Center.Y, __NewMeshCenter.Z - __Center.Z);
        		_OwnerEmiter.UseRandomParticalVelocity = false;
        		
                _OwnerEmiter.UseRandomParticalRotate = false;
      	        _OwnerEmiter.ParticalRotate = new cVector3d(this.Model.RotateX.Value(), this.Model.RotateY.Value(), this.Model.RotateZ.Value());


                var __Partical = new cPartical(_OwnerEmiter, __Model);
                __Model.Translate(__NewMeshCenter.X, __NewMeshCenter.Y, __NewMeshCenter.Z);

            }         
            _OwnerEmiter.ParticalVelocity = __TempVelocity;
            _OwnerEmiter.UseRandomParticalVelocity = __TempRandomParticalVelocity;
            _OwnerEmiter.UseRandomParticalRotate = _OwnerEmiter.UseRandomParticalRotate;
      	    _OwnerEmiter.ParticalRotate = _OwnerEmiter.ParticalRotate; 

            if (this.DestroyRealModel)
            {
                this.Model.Destroy();
            }
               
            this.ParticalCreated = true;
	    }
    }
    /*CreatePartical : function(_OwnerEmiter, _Count)
	{
	    if (!this.ParticalCreated)
	    {   
  	        var __TempVelocity = new cVector3d(_OwnerEmiter.ParticalVelocity.X, _OwnerEmiter.ParticalVelocity.Y, _OwnerEmiter.ParticalVelocity.Z);
  	        var __TempRandomParticalVelocity = _OwnerEmiter.UseRandomParticalVelocity;  	        
  	        var __TempRandomRotate = _OwnerEmiter.UseRandomParticalRotate;
  	        var __TempRotate = _OwnerEmiter.ParticalRotate ;
  	        


            var __Center = this.Model.GetMeshCenter();
            for (var i = 0; i < this.Model.Mesh.SurfaceVertexIndices.length; i+=3)
            {
                var __ParticalMesh = new cParticalSolidMesh();
                __ParticalMesh.Vertex[0] = this.Model.Mesh.Vertex[(this.Model.Mesh.SurfaceVertexIndices[i] * 3)];
                __ParticalMesh.Vertex[1] = this.Model.Mesh.Vertex[(this.Model.Mesh.SurfaceVertexIndices[i] * 3) + 1];
                __ParticalMesh.Vertex[2] = this.Model.Mesh.Vertex[(this.Model.Mesh.SurfaceVertexIndices[i] * 3) + 2];

                __ParticalMesh.Vertex[3] = this.Model.Mesh.Vertex[(this.Model.Mesh.SurfaceVertexIndices[i + 1] * 3)];
                __ParticalMesh.Vertex[4] = this.Model.Mesh.Vertex[(this.Model.Mesh.SurfaceVertexIndices[i + 1] * 3) + 1];
                __ParticalMesh.Vertex[5] = this.Model.Mesh.Vertex[(this.Model.Mesh.SurfaceVertexIndices[i + 1] * 3) + 2];
                
                __ParticalMesh.Vertex[6] = this.Model.Mesh.Vertex[(this.Model.Mesh.SurfaceVertexIndices[i + 2] * 3)];
                __ParticalMesh.Vertex[7] = this.Model.Mesh.Vertex[(this.Model.Mesh.SurfaceVertexIndices[i + 2] * 3) + 1];
                __ParticalMesh.Vertex[8] = this.Model.Mesh.Vertex[(this.Model.Mesh.SurfaceVertexIndices[i + 2] * 3) + 2];                


                __ParticalMesh.Vertex[9] = __Center.X;
                __ParticalMesh.Vertex[10] = __Center.Y;
                __ParticalMesh.Vertex[11] = __Center.Z;





                var __TextureIndices = (i / 3) * 2;
                __ParticalMesh.UVTextureCoordinates[0] = this.Model.Mesh.UVTextureCoordinates[(this.Model.Mesh.SurfaceTextureIndices[i] * 2)];
                __ParticalMesh.UVTextureCoordinates[1] = this.Model.Mesh.UVTextureCoordinates[(this.Model.Mesh.SurfaceTextureIndices[i] * 2) + 1];

                __ParticalMesh.UVTextureCoordinates[2] = this.Model.Mesh.UVTextureCoordinates[(this.Model.Mesh.SurfaceTextureIndices[i + 1] * 2)];
                __ParticalMesh.UVTextureCoordinates[3] = this.Model.Mesh.UVTextureCoordinates[(this.Model.Mesh.SurfaceTextureIndices[i + 1] * 2) + 1];
                
                __ParticalMesh.UVTextureCoordinates[4] = this.Model.Mesh.UVTextureCoordinates[(this.Model.Mesh.SurfaceTextureIndices[i + 2] * 2)];
                __ParticalMesh.UVTextureCoordinates[5] = this.Model.Mesh.UVTextureCoordinates[(this.Model.Mesh.SurfaceTextureIndices[i + 2] * 2) + 1];
                
                var __NewMeshCenter = new cPoint((__ParticalMesh.Vertex[0] + __ParticalMesh.Vertex[3] + __ParticalMesh.Vertex[6]) / 3, (__ParticalMesh.Vertex[1] + __ParticalMesh.Vertex[4] + __ParticalMesh.Vertex[7]) / 3, (__ParticalMesh.Vertex[2] + __ParticalMesh.Vertex[5] + __ParticalMesh.Vertex[8]) / 3);
                
                var __Model = this.OwnerScene.CreateModel(0, 0, 0, 0, 0, 0, 1, 1, 1, __ParticalMesh, this.Model.Material, 0, true, false, false, this.LighterPartical);
                
      	        var __Count = _OwnerEmiter.EffectList.Count();
	            for (var j = 0; j < __Count; j++)
	            {
	                var __Item = _OwnerEmiter.EffectList.GetItem(j);
	                __Model.EffectController.AddEffect(__Item);
	            }
	            
	        	_OwnerEmiter.ParticalVelocity = new cVector3d(__NewMeshCenter.X - __Center.X, __NewMeshCenter.Y - __Center.Y, __NewMeshCenter.Z - __Center.Z);
        		_OwnerEmiter.UseRandomParticalVelocity = false;
        		
                _OwnerEmiter.UseRandomParticalRotate = false;
      	        _OwnerEmiter.ParticalRotate = new cVector3d(this.Model.RotateX.Value(), this.Model.RotateY.Value(), this.Model.RotateZ.Value());


                var __Partical = new cPartical(_OwnerEmiter, __Model);
                __Model.Translate(__NewMeshCenter.X, __NewMeshCenter.Y, __NewMeshCenter.Z);

            }         
            _OwnerEmiter.ParticalVelocity = __TempVelocity;
            _OwnerEmiter.UseRandomParticalVelocity = __TempRandomParticalVelocity;
            _OwnerEmiter.UseRandomParticalRotate = _OwnerEmiter.UseRandomParticalRotate;
      	    _OwnerEmiter.ParticalRotate = _OwnerEmiter.ParticalRotate; 

            if (this.DestroyRealModel)
            {
                this.Model.Destroy();
            }
               
            this.ParticalCreated = true;
	    }
    }    */
    
}, {});






