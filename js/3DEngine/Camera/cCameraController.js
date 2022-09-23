



CameraControllerIDCreater = function () {
}

CameraControllerIDCreater.ID = 0;
CameraControllerIDCreater.GetID = function () {
    CameraControllerIDCreater.ID++;
    return CameraControllerIDCreater.ID;
}

cCameraController = Class(cObserverable,
{
        ObjectType: ObjectTypes.cCameraController
        , OwnerScene: null
        , Camera: null
        , Width: 0
        , Height: 0
        , BackColor: null
        , CameraControllerID: 0
        , Canvas2dContent: null
        , TempCanvas2dContent: null
        , OwnerDomID: null
        , SceneCanvas: null
        , TempSceneCanvas: null
        , RefreshInterval: null
        , RotateHelper: 0
        , AltKey: false
        , CtrlKey: false
        , W_Key: false
        , A_Key: false
        , S_Key: false
        , D_Key: false
        , Rotate_WhenMouseMove: false
        , Rotate_Z_WhenMouseMove: false
        , Change_OpticalLens: false
        , Pan_WhenMouseMove: false
        , Zoom_WhenMouseMove: false
        , Rotate_CameraAround: false
        , DocumentContextMenuEvent: null
        , MouseClicked:
        {
            X: 0,
            Y: 0,
            Clicked: false
        }
        ,
        constructor: function (_OwnerScene, _OwnerDomID, _TempCanvasDomID, _Width, _Height, _BackColor, _RefreshInterval) {
            cCameraController.BaseObject.constructor.call(this);
            this.RefreshInterval = _RefreshInterval;

            this.OwnerScene = _OwnerScene;
            this.OwnerDomID = _OwnerDomID;

            this.Width = _Width;
            this.Height = _Height;

            this.BackColor = _BackColor;


            this.CameraControllerID = CameraControllerIDCreater.GetID();

            this.SceneCanvas = document.createElement("canvas");
            this.SceneCanvas.setAttribute("id", "CameraController_" + this.CameraControllerID.toString());
            this.SceneCanvas.setAttribute("width", _Width);
            //this.SceneCanvas.setAttribute("style", "border: 1px solid #FF0000; background-color:" + _BackColor + ";");
            this.SceneCanvas.setAttribute("style", "background-color:" + _BackColor + ";");
            this.SceneCanvas.setAttribute("height", _Height);
            document.getElementById(_OwnerDomID).appendChild(this.SceneCanvas);
            this.Canvas2dContent = this.SceneCanvas.getContext("2d");


            this.TempSceneCanvas = document.createElement("canvas");
            this.TempSceneCanvas.setAttribute("id", "TempCanvas_" + this.CameraControllerID.toString());
            this.TempSceneCanvas.setAttribute("width", 0);
            this.TempSceneCanvas.setAttribute("height", 0);
            this.TempSceneCanvas.setAttribute("style", "background-color:" + _BackColor + ";");
            document.getElementById(_TempCanvasDomID).appendChild(this.TempSceneCanvas);
            this.TempCanvas2dContent = this.TempSceneCanvas.getContext("2d");


            this.OnInit = new cDelegate(ObjectTypes.cFreeObject, false);
            this.OnLoad = new cDelegate(ObjectTypes.cFreeObject, false);
            this.OnUnload = new cDelegate(ObjectTypes.cFreeObject, false);
            this.OnBinding = new cDelegate(ObjectTypes.cFreeObject, false);


            this.SceneCanvas.ondisposed = new EventHandlerFunction(this.OnDisposed);
            this.SceneCanvas.oninit = new EventHandlerFunction(this.OnInit);
            this.SceneCanvas.onload = new EventHandlerFunction(this.OnLoad);
            this.SceneCanvas.onprerender = new EventHandlerFunction(this.OnPrerender);
            this.SceneCanvas.onclick = new EventHandlerFunction(this.OnClick);
            this.SceneCanvas.ondblclick = new EventHandlerFunction(this.OnDblClick);
            document.onkeydown = new EventHandlerFunction(this.OnKeyDown);
            document.onkeypress = new EventHandlerFunction(this.OnKeyPress);
            document.onkeyup = new EventHandlerFunction(this.OnKeyUp);
            this.SceneCanvas.onmousedown = new EventHandlerFunction(this.OnMouseDown);
            this.SceneCanvas.onmousemove = new EventHandlerFunction(this.OnMouseMove);
            this.SceneCanvas.onmouseout = new EventHandlerFunction(this.OnMouseOut);
            this.SceneCanvas.onmouseover = new EventHandlerFunction(this.OnMouseOver);
            this.SceneCanvas.onmouseup = new EventHandlerFunction(this.OnMouseUp);
            this.SceneCanvas.onunload = new EventHandlerFunction(this.OnUnload);


            this.OnMouseDown.Add(this, this.MouseDownFunction);
            this.OnMouseMove.Add(this, this.MouseMoveFunction);
            this.OnMouseUp.Add(this, this.MouseUpFunction);
            this.OnKeyDown.Add(this, this.KeyDownFunction);
            this.OnKeyUp.Add(this, this.KeyUpFunction);
            this.OnKeyPress.Add(this, this.KeyPressFunction);

            this.SetDefaultEvents();
            this.IsAmbientMode = new Bool(false);
            this.MaxFPS = new Integer(15);
            this.MaxAmbiantFPS = 5;
            this.DrawAmbientWatch(this);
            this.AnimTimeout = null;

            //window.requestAnimationFrame(function () { _this.Render(); });
        }
        ,
        DrawAmbientWatch: function (_this) {
            'use strict';
            if (_this.AnimTimeout ) {
                clearTimeout(_this.AnimTimeout );
            }

            if (_this.IsAmbientMode.Value()) {
                _this.MaxFPS.Value(_this.MaxAmbiantFPS);
                //console.log("_this.MaxFPS = " + _this.MaxAmbiantFPS);
            }
            else {
                _this.MaxFPS.Value(30);
                //console.log("_this.MaxFPS = 30;");
            }


            // Import the current time
            var date = DateTimeUtils.GetDate(),
                hours = date.getHours(),
                minutes = date.getMinutes(),
                seconds = date.getSeconds(),
                nextMove = (1000 / _this.MaxFPS.Value()) - (date.getMilliseconds() % (1000 / _this.MaxFPS.Value())),
                i;
            //tizen.power.request("CPU", "CPU_AWAKE");
            _this.Render();

            _this.AnimTimeout  = setTimeout(function () {
                var animRequest = window.requestAnimationFrame(function () { _this.DrawAmbientWatch(_this) });
            }, nextMove);
        }
        ,
        SetDefaultEvents: function () {
            'use strict';

            var _this = this;

            // Add an eventListener for ambientmodechanged
            window.addEventListener("ambientmodechanged", function (e) {
                if (e.detail.ambientMode === true) {
                    // Rendering ambient mode case
                    _this.IsAmbientMode.Value(true);
                    /*setTimeout(function(){
                        tizen.power.turnScreenOn();
                                  _this.MaxAmbiantFPS--;
                        _this.DrawAmbientWatch(_this);
                    }, 10000);*/
                }
                else {
                    // Rendering normal case
                    _this.IsAmbientMode.Value(false);
                }
                _this.DrawAmbientWatch(_this);
            });

            // Add an event listener to update the screen immediately when the device wakes up
            document.addEventListener("visibilitychange", function () {
                if (document.hidden) {

                    console.log("Kapandı");
                }

            });
        }
        ,
        CloseSpaceBar: function (_Event) {
            if (_Event.keyCode == 32 || _Event.keyCode == 32) {
                return false;
            }
        }
        ,
        SetCamera: function (_Camera) {
            _Camera.SetCameraContent(this, this.Width, this.Height, this.BackColor);
            this.Camera = _Camera;
        }
        ,
        MakeImageObject: function (_StrSource) {
            var __ImgElement = document.createElement("img");
            __ImgElement.src = _StrSource;
            return __ImgElement;
        }
        ,
        GetImageFromCanvas: function (_Canvas) {
            var __StrMime = "image/jpeg";
            //var __StrMime = "image/png";

            var __StrData = _Canvas.toDataURL(__StrMime);

            return this.MakeImageObject(__StrData);

        }
        ,
        GetDataFromImage: function (_Image) {
            if (_Image.complete) {
                try {
                    this.TempSceneCanvas.width = _Image.width;
                    this.TempSceneCanvas.height = _Image.height;
                    this.TempCanvas2dContent.drawImage(_Image, 0, 0);
                    var __Data = this.TempCanvas2dContent.getImageData(0, 0, _Image.width, _Image.height);
                    this.TempSceneCanvas.width = 0;
                    this.TempSceneCanvas.height = 0;
                    return __Data;
                }
                catch (e) {
                    DebugAlert.Show("cCameraController içindeki GetDataFromImage Sıkıntı Çıktı..!");
                    return null;
                }
            }
            return null;
        }
        ,
        GetImageFromImageData: function (_ImageData) {
            if (_ImageData != null) {
                try {
                    this.TempSceneCanvas.width = _ImageData.width;
                    this.TempSceneCanvas.height = _ImageData.height;
                    this.TempCanvas2dContent.putImageData(_ImageData, 0, 0);
                    var __Image = this.GetImageFromCanvas(this.TempSceneCanvas);
                    this.TempSceneCanvas.width = 0;
                    this.TempSceneCanvas.height = 0;
                    return __Image;

                }
                catch (e) {
                    DebugAlert.Show("cCameraController içindeki GetDataFromImage Sıkıntı Çıktı..!");
                    return null;

                }
            }
            return null;
        }
        ,
        CreateNewImage: function (_Color, _Width, _Height) {
            try {
                this.TempSceneCanvas.width = _Width;
                this.TempSceneCanvas.height = _Height;
                this.TempCanvas2dContent.fillStyle = _Color.toString();
                this.TempCanvas2dContent.fillRect(0, 0, _Width, _Height);
                var __Texture = this.GetImageFromCanvas(this.TempSceneCanvas);
                this.TempSceneCanvas.width = 0;
                this.TempSceneCanvas.height = 0;
                return __Texture;
            }
            catch (e) {
                DebugAlert.Show("cCameraController içindeki CreateNewImage foksiyonunda problem yaşandı..!");
            }
            return null;
        }
        ,
        Render: function () {
            if (this.Camera) {
                this.Camera.Render();
                this.OwnerScene.ComponentController.Draw();
            }
            if (this.W_Key) {
                this.MoveForward(0.5, false);
            }
            if (this.A_Key) {
                this.MoveVelocityRotate(-15);
            }
            if (this.S_Key) {
                this.MoveForward(-0.5, false);
            }
            if (this.D_Key) {
                this.MoveVelocityRotate(15);
            }

            var _this = this;

            //setTimeout(function () { _this.Render(); }, _this.RefreshInterval);
            //setTimeout(function () { window.requestAnimationFrame(function () { _this.Render(); }); }, _this.RefreshInterval);
        }
        ,
        KeyPressFunction: function (_Event) {
            this.OwnerScene.ComponentController.KeyPress(_Event);
            return false;
        }
        ,
        KeyDownFunction: function (_Event) {
            this.OwnerScene.ComponentController.KeyDown(_Event);
            this.AltKey = _Event.altKey;
            this.CtrlKey = _Event.ctrlKey;
            this.W_Key = (_Event.keyCode == 87);
            this.A_Key = (_Event.keyCode == 65);
            this.S_Key = (_Event.keyCode == 83);
            this.D_Key = (_Event.keyCode == 68);
            return false;
        }
        ,
        KeyUpFunction: function (_Event) {
            this.OwnerScene.ComponentController.KeyUp(_Event);
            this.AltKey = _Event.altKey;
            this.CtrlKey = _Event.ctrlKey;
            this.W_Key = false;
            this.A_Key = false;
            this.S_Key = false;
            this.D_Key = false;
            return false;
        }
        ,
        MoveForward: function (_Step, _Fixed_Y) {
            var __Rotate = this.Camera.GetRotate();

            if (!_Fixed_Y) {
                __X = (Math.sin(__Rotate.RotateY) * _Step) * (Math.cos(__Rotate.RotateX));
                __Z = (Math.cos(__Rotate.RotateY) * _Step) * (Math.cos(__Rotate.RotateX));
                __Y = (Math.sin(__Rotate.RotateX)) * _Step;
            }
            else {
                __X = (Math.sin(__Rotate.RotateY) * _Step);
                __Z = (Math.cos(__Rotate.RotateY) * _Step);
            }

            this.Camera.CoordinateX.Value(this.Camera.CoordinateX.Value() - __X);
            this.Camera.CoordinateZ.Value(this.Camera.CoordinateZ.Value() - __Z);

            this.Camera.AimCoordinateX.Value(this.Camera.AimCoordinateX.Value() - __X);
            this.Camera.AimCoordinateZ.Value(this.Camera.AimCoordinateZ.Value() - __Z);

            if (!_Fixed_Y) {
                this.Camera.CoordinateY.Value(this.Camera.CoordinateY.Value() - __Y);
                this.Camera.AimCoordinateY.Value(this.Camera.AimCoordinateY.Value() - __Y);

            }
        }
        ,
        MoveVelocityRotate: function (_RotateY) {
            this.RotateCameraAround(_RotateY, 0)
        }
        ,
        MousePopupDisabler: function (_Event) {
            return false;
        }
        ,
        MouseDownFunction: function (_Event) {
            this.OwnerScene.ComponentController.MouseDown(_Event);
            this.MouseClicked.X = _Event.offsetX;
            this.MouseClicked.Y = _Event.offsetY;
            this.MouseClicked.Clicked = true;

            if (_Event.button == 0) {
                this.Rotate_WhenMouseMove = true;
                this.Rotate_CameraAround = true;

                /*var __Model = this.Camera.GetNearestModel(_Event.offsetX, _Event.offsetY, 5);
                if (__Model != null)
                {
                __Model.Scale(__Model.ScaleX.Value() + 0.5, __Model.ScaleY.Value() + 0.5, __Model.ScaleZ.Value() + 0.5);		
                }*/
            }
            else if (_Event.button == 1) {
                this.Pan_WhenMouseMove = true;
                this.Change_OpticalLens = true;
            }
            else if (_Event.button == 2) {
                this.Zoom_WhenMouseMove = true;
                this.Rotate_Z_WhenMouseMove = true;
            }

            document.oncontextmenu = this.DocumentContextMenuEvent;
        }
        ,
        MouseMoveFunction: function (_Event) {
            try {
                if (!_Event.offsetX) {
                    _Event.offsetX = _Event.clientX;
                    _Event.offsetY = _Event.clientY;
                }
            }
            catch (_Ex) {
            }

            this.OwnerScene.ComponentController.MouseMove(_Event);

            if (this.Zoom_WhenMouseMove && this.MouseClicked.Clicked && this.AltKey) {
                var __Zoom = this.MouseClicked.Y - _Event.offsetY;
                __Zoom = ((__Zoom * 0.01) + 1) * this.Camera.GetCameraAimDistance();
                if (__Zoom > 0.000001) {
                    this.Camera.Zoom(__Zoom);
                }
                this.MouseClicked.X = _Event.offsetX;
                this.MouseClicked.Y = _Event.offsetY;
            }
            else if (this.Pan_WhenMouseMove && this.MouseClicked.Clicked && this.AltKey) {
                __IncX = this.MouseClicked.X - _Event.offsetX;
                __IncY = this.MouseClicked.Y - _Event.offsetY;
                this.Pan(__IncX, __IncY);

                this.MouseClicked.X = _Event.offsetX;
                this.MouseClicked.Y = _Event.offsetY;
            }
            else if (this.Rotate_WhenMouseMove && this.MouseClicked.Clicked && this.AltKey) {
                __IncX = this.MouseClicked.X - _Event.offsetX;
                __IncY = this.MouseClicked.Y - _Event.offsetY;
                this.RotateXY(__IncX, __IncY);

                this.MouseClicked.X = _Event.offsetX;
                this.MouseClicked.Y = _Event.offsetY;
            }

            else if (this.Rotate_Z_WhenMouseMove && this.MouseClicked.Clicked && this.CtrlKey) {
                __IncX = this.MouseClicked.X - _Event.offsetX;
                __IncY = this.MouseClicked.Y - _Event.offsetY;
                this.RotateZ(__IncX, __IncY);

                this.MouseClicked.X = _Event.offsetX;
                this.MouseClicked.Y = _Event.offsetY;
            }
            else if (this.Rotate_CameraAround && this.MouseClicked.Clicked && this.CtrlKey) {
                __IncX = this.MouseClicked.X - _Event.offsetX;
                __IncY = this.MouseClicked.Y - _Event.offsetY;
                this.RotateCameraAround(__IncX, __IncY);

                this.MouseClicked.X = _Event.offsetX;
                this.MouseClicked.Y = _Event.offsetY;
            }
            else if (this.Change_OpticalLens && this.MouseClicked.Clicked && this.CtrlKey) {
                __IncX = this.MouseClicked.X - _Event.offsetX;
                __IncY = this.MouseClicked.Y - _Event.offsetY;
                this.ChangeOpticalLens(__IncY);

                this.MouseClicked.X = _Event.offsetX;
                this.MouseClicked.Y = _Event.offsetY;
            }


            document.oncontextmenu = this.DocumentContextMenuEvent;
        }
        ,
        MouseUpFunction: function (_Event) {
            this.OwnerScene.ComponentController.MouseUp(_Event);
            this.Change_OpticalLens = false;
            this.Zoom_WhenMouseMove = false;
            this.Rotate_WhenMouseMove = false;
            this.Rotate_Z_WhenMouseMove = false;
            this.Pan_WhenMouseMove = false;
            this.MouseClicked.Clicked = false;
            this.Rotate_CameraAround = false;
            this.DocumentContextMenuEvent = document.oncontextmenu;
            document.oncontextmenu = this.MousePopupDisabler;
        }
        ,
        ChangeOpticalLens: function (_TranslateY) {
            this.Camera.Projection_Far += _TranslateY;
            this.Camera.SetupTransform();
        }
        ,
        RotateZ: function (_TranslateX, _TranslateY) {
            var __Rotate = this.Camera.GetRotate();
            this.Camera.SetRotate(__Rotate.RotateX, __Rotate.RotateY, __Rotate.RotateZ + (cMath.DegToRad(_TranslateX)));
        }
        ,
        RotateCameraAround: function (_TranslateX, _TranslateY) {
            var __Distance3d = 1;
            var __AngleX = (cMath.DegToRad((((_TranslateY * Math.cos(this.Camera.RotateZ)) + (_TranslateX * Math.sin(this.Camera.RotateZ))) / (2 * Math.PI * __Distance3d)) * 360) * (__Distance3d / 1000));
            var __AngleY = (cMath.DegToRad((((_TranslateY * Math.sin(this.Camera.RotateZ)) + (_TranslateX * Math.cos(this.Camera.RotateZ))) / (2 * Math.PI * __Distance3d)) * 360) * (__Distance3d / 1000));
            var __Rotate = this.Camera.GetRotate();
            var __RotateX = __Rotate.RotateX + __AngleX;

            if (__RotateX <= cMath.DegToRad(-90)) {
                __RotateX = cMath.DegToRad(-90) + 0.001;
            }
            else if (__RotateX >= cMath.DegToRad(90)) {
                __RotateX = cMath.DegToRad(90) - 0.001;
            }

            this.Camera.SetRotate(__RotateX, __Rotate.RotateY - __AngleY, __Rotate.RotateZ);

        }
        ,
        Pan: function (_TranslateX, _TranslateY)
        {
            var __Distance3d = this.Camera.GetCameraAimDistance();
            var __Rotate = this.Camera.GetRotate();
            var __IncY = (Math.cos(__Rotate.RotateX) * _TranslateY) * ((__Distance3d / (350 * DefaultSceneSettings.CameraMatrixFov)));
            var __Inc_XZ = (Math.sin(__Rotate.RotateX) * _TranslateY) * ((__Distance3d / (350 * DefaultSceneSettings.CameraMatrixFov)));

            var __IncZ = ((Math.sin(__Rotate.RotateY) * _TranslateX) * ((__Distance3d / (350 * DefaultSceneSettings.CameraMatrixFov)))) - (__Inc_XZ * Math.cos(__Rotate.RotateY));
            var __IncX = ((Math.cos(__Rotate.RotateY) * _TranslateX) * ((__Distance3d / (350 * DefaultSceneSettings.CameraMatrixFov)))) + (__Inc_XZ * Math.sin(__Rotate.RotateY));

            __CameraAimPosision = this.Camera.GetAimPosision();
            __CameraPosision = this.Camera.GetCameraPosision();

            this.Camera.SetAimPosision(__CameraAimPosision.X + __IncX, __CameraAimPosision.Y - __IncY, __CameraAimPosision.Z - __IncZ);
            this.Camera.SetCameraPosision(__CameraPosision.X + __IncX, __CameraPosision.Y - __IncY, __CameraPosision.Z - __IncZ);
        }
        ,
        Zoom: function (_Distance) {
            this.Camera.Zoom(_Distance);
        }
        ,
        RotateXY: function (_TranslateX, _TranslateY) {

            var __Distance3d = this.Camera.GetCameraAimDistance();
            var __AngleX = (cMath.DegToRad((((_TranslateY * Math.cos(this.Camera.RotateZ)) + (_TranslateX * Math.sin(this.Camera.RotateZ))) / (2 * Math.PI * __Distance3d)) * 360) * (__Distance3d / 100));
            var __AngleY = (cMath.DegToRad((((_TranslateY * Math.sin(this.Camera.RotateZ)) + (_TranslateX * Math.cos(this.Camera.RotateZ))) / (2 * Math.PI * __Distance3d)) * 360) * (__Distance3d / 100));
            var __Rotate = this.Camera.GetRotate();
            var __RotateX = __Rotate.RotateX - __AngleX;

            if (__RotateX <= cMath.DegToRad(-90)) {
                __RotateX = cMath.DegToRad(-90) + 0.001;
            }
            else if (__RotateX >= cMath.DegToRad(90)) {
                __RotateX = cMath.DegToRad(90) - 0.001;
            }

            this.Camera.SetAimFixedRotate(__RotateX, __Rotate.RotateY + __AngleY, __Rotate.RotateZ);
        }
        ,
        BaseObject: function () {
            return cObserverable.prototype;
        }
        ,
        Destroy: function () {
            cObserverable.prototype.Destroy.call(this);
        }
        ,
        GetDomID: function () {
            return "CameraController_" + this.CameraControllerID.toString();
        }
        ,
        GetDomElement: function () {
            return document.getElementById(this.GetDomID());
        }

    }, {});






