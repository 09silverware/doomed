var _Images = {};
var _loader = new function() {
	var self = this;

	self.loadImage = function(name,image) {
		_Images[name] = new PIXI.Texture.fromImage(image);
	}
}

_loader.loadImage("goat","images/goatWhite.png")
var _Scenes = {};
var _RenderTarget = document.getElementById("render");
var _Renderer = new PIXI.WebGLRenderer(800,600,{autoResize:true,view:_RenderTarget,transparent:true});


var Goat = new PIXI.Sprite(_Images.goat);
Goat.pivot.x = Goat.pivot.y = 0.5;
Goat.x = 400; Goat.y = 300;
var Trust = new PIXI.Text("In Josh We Trust.",{font:'9px Arial',fill:0x30a030});
Trust.x = 725; Trust.y = 590;

_Scenes.test = new PIXI.Container;
_Scenes.test.addChild(Trust);
_Scenes.test.addChild(Goat);

function Loop() {
	Goat.rotation += 0.01;

	_Renderer.render(_Scenes.test);
	requestAnimationFrame(Loop);
}

Loop();
