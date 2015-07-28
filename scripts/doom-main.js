var _Debug = false;
var _Images = {};
var _Loader = new function() {
	var self = this;

	self.loadImage = function(name,image) {
		_Images[name] = new PIXI.Texture.fromImage(image);
		if(_Debug){ console.log("Loaded:","\""+name+"\"","::",image); }
	}
}
_Mouse = { x:0, y:0 };
_Keyboard = {};
var _Scenes = {};
var _RenderTarget = document.getElementById("render");;
var _Renderer = new PIXI.WebGLRenderer(800,600,{autoResize:true,view:_RenderTarget,transparent:true});
var _Player = {};

function Init() {
	_Loader.loadImage("player","images/player.png");
	_Player = new Creature(_Images["player"],80,80);
	_Player.sprite.scale.x = _Player.sprite.scale.y = 0.4;
	_Scenes.test = new PIXI.Container();
	_Scenes.test.addChild(_Player.sprite);

	_RenderTarget.onmousemove = function(e) {
		_Mouse.x = e.pageX -  _RenderTarget.offsetLeft;
		_Mouse.y = e.pageY - _RenderTarget.offsetTop;
		return false;
	}
	_RenderTarget.onmousedown = function(e) {
		_Mouse.x = e.pageX - _RenderTarget.offsetLeft;
		_Mouse.y = e.pageY - _RenderTarget.offsetTop;
		_Mouse.left = (e.which==1?true:_Mouse.left);
		_Mouse.middle = (e.which==2?true:_Mouse.middle);
		_Mouse.right = (e.which==3?true:_Mouse.right);
		return false;
	}
	_RenderTarget.onmouseup = function(e) {
		_Mouse.x = e.pageX -  _RenderTarget.offsetLeft;
		_Mouse.y = e.pageY - _RenderTarget.offsetTop;
		_Mouse.left = (e.which==1?false:_Mouse.left);
		_Mouse.middle = (e.which==2?false:_Mouse.middle);
		_Mouse.right = (e.which==3?false:_Mouse.right);
		return false;
	}
	document.onkeydown = function(e) {
		var char = String.fromCharCode(e.keyCode || e.charCode)
		_Keyboard[char] = true;
		return false;
	}
	document.onkeyup = function(e) {
		var char = String.fromCharCode(e.keyCode || e.charCode)
		_Keyboard[char] = false;
		return false;
	}

	Loop();
}
Init();

function Loop() {
	_Player.rotation( pointDirection(_Player.x,_Player.y,_Mouse.x,_Mouse.y) );

	if(_Keyboard["W"]){ _Player.move( 0,-1); }
	if(_Keyboard["S"]){ _Player.move( 0, 1); }
	if(_Keyboard["A"]){ _Player.move(-1, 0); }
	if(_Keyboard["D"]){ _Player.move( 1, 0); }

	_Renderer.render(_Scenes.test);
	requestAnimationFrame(Loop);
}

function Creature(sprite,x,y) {
	var self = this;
	self.move = function(dx,dy) { self.position(self.x+dx,self.y+dy); }
	self.position = function(x,y) {
		self.x = x;
		self.y = y;
		self.sprite.position.x = x;
		self.sprite.position.y = y;
	}
	self.rotate = function(da) { self.rotation(self.angle+da); }
	self.rotation = function(angle) {
		angle = angle%360; if(angle<0){ angle+=360; }
		self.angle = angle;
		self.sprite.rotation = angle/Math.radtodeg;
	}

	self.sprite = new PIXI.Sprite(sprite);
	self.sprite.anchor.x = self.sprite.anchor.y = 0.5;
	self.position(x,y);
	self.rotation(0)
}

// Math
Math.radtodeg = 180/Math.PI;
function pointDirection(ax,ay,bx,by) { return Math.atan2((by-ay),(bx-ax)) * Math.radtodeg+90; }
function pointDistance(ax,ay,bx,by) { return Math.sqrt( Math.pow(ax-bx,2) + Math.pow(ay-by,2) ); }
function range(min,val,max) { if(min>max){ var t=min; min=max; max=t; } return (val>max?max:(val<min?min:val)); }
