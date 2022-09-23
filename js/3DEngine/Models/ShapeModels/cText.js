

var cText = Class(cBaseModel,
{
	ObjectType: ObjectTypes.cText
    , TextString : ""
    , FontPunto : 12
    , FixedFont : false
    , Font : "Arial"
    ,
	constructor: function (_OwnerScene, _Text, _X, _Y, _Z, _Color, _FontPunto, _FixedFont, _LighterModel)
	{
	    var __Mesh = new cLineMesh(_X, _Y, _Z, _X, _Y + 1, _Z);
		cText.BaseObject.constructor.call(this, _OwnerScene, _X, _Y, _Z, 0, 0, 0, 1, 1, 1, __Mesh, null, 0, true, false, false, _LighterModel);
		this.TextString = _Text;
		this.FontPunto = _FontPunto;
	    this.FixedFont = _FixedFont;	
		this.m_LineWidth = DefaultSceneSettings.LineWidth;

		if (_Color)
		{
			this.m_Color = _Color.CreateNewCopy();
		}
		else
		{
			this.m_Color = DefaultSceneSettings.DefultCurveColor.CreateNewCopy();
		}	
		
		
	}
	,
	SetTransparency : function(_Transparency)
	{
	    this.m_Color.Transparent = _Transparency;
	}
    ,
	BaseObject: function ()
	{
		return cBaseModel.prototype;
	}
    ,
	Destroy: function ()
	{
		cBaseModel.prototype.Destroy.call(this);
	}
	,
	Initalize: function (_Camera)
    {
        if (!this.NoUseEffectWhenChildObject || this.MyDadModel == null)
        {
            if (this.EffectController.EffectCount() > 0)
            {
                this.EffectController.CalculateEffects(_Camera);
            }
        	if (this.VelocityVector.X != 0 || this.VelocityVector.Y != 0 || this.VelocityVector.Z != 0 || this.RotateVelocityVector.X != 0 || this.RotateVelocityVector.Y != 0 || this.RotateVelocityVector.Z != 0)
        	{
        	    if (_Camera.FrameRate != 0)
        	    {
        	        var __IncX = (DefaultSceneSettings.GameFPS / _Camera.FrameRate) * this.VelocityVector.X;
        	        var __IncY = (DefaultSceneSettings.GameFPS / _Camera.FrameRate) * this.VelocityVector.Y;
        	        var __IncZ = (DefaultSceneSettings.GameFPS / _Camera.FrameRate) * this.VelocityVector.Z;
            	    
        	        this.Translate(this.TranslateX.Value() + __IncX, this.TranslateY.Value() + __IncY, this.TranslateZ.Value() + __IncZ);
    	        }
            }    	        

        }
            
        this.RotateForRender(_Camera, this.RotateX.Value(), this.RotateY.Value(), this.RotateZ.Value());
        _Camera.TransformVertexes(this.Mesh, this);
        
        var __WorldMat = new cMatrix4x4();
        __WorldMat.CopyFrom(this.OwnerScene.WorldMat);
        
        this.Visited = true;
        var __ChildModelCount = this.ChildModel.Count();
        for (var i = 0; i < __ChildModelCount; i++)
        {
        	var __Item = this.ChildModel.GetItem(i);
			__Item.Initalize(_Camera);
			this.OwnerScene.WorldMat.CopyFrom(__WorldMat);
        }

        this.OwnerScene.WorldMat.Ident();
        _Camera.CalcAllTransforms();
    }
    ,
    CompleteRender: function (_Camera)
    {
    }
    ,    
    DrawFace: function (_Camera, _Face)
    {
        if (this.LighterModel)
        {
            _Camera.Canvas2dContent.globalCompositeOperation = "lighter";
        }
            
        if (this.FixedFont)
        {
		    _Camera.Canvas2dContent.font =  this.FontPunto + "pt " + this.Font;
		    _Camera.Canvas2dContent.fillStyle = this.m_Color.toString();
		    _Camera.Canvas2dContent.fillText(this.TextString, this.Mesh.Translated_Vertex[0] - ((this.TextString.length / 2) * 7), this.Mesh.Translated_Vertex[1] - 5);
		}
		else
		{
		    var __Distance = this.DistanceTo(_Camera.CoordinateX.Value(), _Camera.CoordinateY.Value(), _Camera.CoordinateZ.Value());
		    _Camera.Canvas2dContent.font = (( 100 / __Distance ) * this.FontPunto)  + "pt " + this.Font;
		    _Camera.Canvas2dContent.fillStyle = this.m_Color.toString();
		    _Camera.Canvas2dContent.fillText(this.TextString, this.Mesh.Translated_Vertex[0] , this.Mesh.Translated_Vertex[1]);
		}
        if (this.LighterModel)
        {
            _Camera.Canvas2dContent.globalCompositeOperation = "source-over";
        }		
    }
    ,
	UpdateCoordinate: function (_X, _Y, _Z)
	{
		this.Mesh.Vertex[0] = _X;
		this.Mesh.Vertex[1] = _Y;
		this.Mesh.Vertex[2] = _Z;
		this.Mesh.Vertex[3] = _X;
		this.Mesh.Vertex[4] = _Y + 1;
		this.Mesh.Vertex[5] = _Z;
		this.Mesh.Vertex[6] = (_X + _X) / 2;
		this.Mesh.Vertex[7] = (_Y + (_Y + 1)) / 2;
		this.Mesh.Vertex[8] = (_Z + _Z) / 2;

	}
	,
	IsModel : function()
	{
	    return false;
	}
    ,
	IsLine: function ()
	{
		return true;
	}

}, {});




