
NoLightableVideoIDCreater = function ()
{
}

NoLightableVideoIDCreater.ID = 0;
NoLightableVideoIDCreater.GetID = function ()
{
	NoLightableVideoIDCreater.ID++;
	return NoLightableVideoIDCreater.ID;
}

var cNoLightableVideo = Class(cBaseMaterial,
{
	ObjectType: ObjectTypes.cNoLightableVideo
	, Video : null
	, Loop : true
    ,
	constructor: function (_OwnerScene, _VideoPath, _Loop)
	{
	    cNoLightableVideo.BaseObject.constructor.call(this, _OwnerScene, null, null, null, null, null, null, null, null, null, null);
	    
	    this.Video = document.createElement("video");
		this.Video.setAttribute("id", "Video" + NoLightableVideoIDCreater.GetID().toString());
        this.Video.autoplay = true;
        this.Video.loop = _Loop;
        this.Loop = _Loop;
        this.Video.setAttribute("src", _VideoPath);
        this.Video.setAttribute("type", "video/mp4");   
        this.Video.pause();
        var __This = this;
        const playPromise = this.Video.play();
        if (playPromise !== null) {
            playPromise.catch(() => { this.Video.play(); })
        }
        //this.Video.play();     
	}
    ,
	BaseObject: function ()
	{
		return cBaseMaterial.prototype;
	}
    ,	
    FindCameraController: function ()
    {
        if (this.OwnerScene.CameraControllerList.Count() > 0)
        {
            this.CameraController = this.OwnerScene.CameraControllerList.GetItem(0);
        }
    }    
    ,
	Destroy: function ()
	{
		cBaseMaterial.prototype.Destroy.call(this);        
	}
	,
    IsRenderable: function ()
    {
        return true;
    }
    ,
    Initalize: function (_Camera, _Model)
    {
        if(!isNaN(this.Video.duration))
        {
            if (this.Loop)
            {
                if (this.Video.currentTime + 2 > this.Video.duration)
                {
                    this.Video.currentTime = 0;
                }
            }
        }            
    }	
    ,
    Ready : function()
    {
        return !isNaN(this.Video.duration);
        
    }

}, {});




