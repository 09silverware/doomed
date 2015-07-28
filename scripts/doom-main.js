var _Images = {};
var _Loader = new function() {
	var self = this;

	self.loadImage = function(name,image) {
		_Images[name] = new PIXI.Texture.fromImage(image);
	}
}
_Mouse = { x:0, y:0 };
_Keyboard = {};
var _Scenes = {};
var _RenderTarget = null;
var _Renderer = new PIXI.WebGLRenderer(800,600,{autoResize:true,view:_RenderTarget,transparent:true});
var _Player = {};

$(document).ready(Init);

function Init() {
	_Loader.loadImage("player","images/player.png");
	_RenderTarget = document.getElementById("render");0
	_Player = new Object(_Images.player,40,40);
	_Scenes.test = new PIXI.Container;
	_Scenes.test.addChild(_Player.sprite);

	_RenderTarget.onmousemove = function(e) {
		var pos = _renderTarget.position();
		_Mouse.x = e.pageX - pos.left;
		_Mouse.y = e.pageY - pos.top;
		return false;
	}
	_RenderTarget.onmousedown = function(e) {
		var pos = _renderTarget.position();
		_Mouse.x = e.pageX - pos.left;
		_Mouse.y = e.pageY - pos.top;
		_Mouse.left = (e.which==1?true:_Mouse.left);
		_Mouse.middle = (e.which==2?true:_Mouse.middle);
		_Mouse.right = (e.which==3?true:_Mouse.right);
		return false;
	}
	_RenderTarget.onmouseup = function(e) {
		var pos = _renderTarget.position();
		_Mouse.x = e.pageX - pos.left;
		_Mouse.y = e.pageY - pos.top;
		_Mouse.left = (e.which==1?false:_Mouse.left);
		_Mouse.middle = (e.which==2?false:_Mouse.middle);
		_Mouse.right = (e.which==3?false:_Mouse.right);
		return false;
	}
	_RenderTarget.onkeydown = function(e) {
		var char = String.fromCharCode(e.keyCode || e.charCode)
		_Keyboard[char] = true;
		return false;
	}
	_RenderTarget.onkeyup = function(e) {
		var char = String.fromCharCode(e.keyCode || e.charCode)
		_Keyboard[char] = false;
		return false;
	}
}

function Loop() {
	_Player.rotate( range(-1,pointDirection(_Player.x,_Player.y,_Mouse.x,_Mouse.y),1) );

	if(_Keyboard["W"]){ _Player.move( 0,-1); }
	if(_Keyboard["S"]){ _Player.move( 0, 1); }
	if(_Keyboard["A"]){ _Player.move(-1, 0); }
	if(_Keyboard["D"]){ _Player.move( 1, 0); }

	_Renderer.render(_Scenes.test);
	requestAnimationFrame(Loop);
}
Loop();

function Object(sprite,x,y) {
	var self = this;
	self.move(x,y);
	self.sprite = new PIXI.Sprite(sprite);

	self.move = function(dx,dy) { self.position(self.x+dx,self.y+dy); }
	self.position = function(x,y) {
		self.x = x;
		self.y = y;
		self.sprite.x = x;
		self.sprite.y = y;
	}
	self.rotate = function(da) { self.rotation(self.angle+da); }
	self.rotation = function(angle) {
		angle = angle%360; if(angle<0){ angle+=360; }
		self.angle = angle;
		self.sprite.rotation = angle;
	}
}

// Math
Math.radtodeg = 180/Math.pi;
function pointDirection(ax,ay,bx,by) { return Math.atan2((bx-ax),(by-ay)) * Math.radtodeg; }
function pointDistance(ax,ay,bx,by) { return Math.sqrt( Math.pow(ax-bx,2) + Math.pow(ay-by,2) ); }
function range(min,val,max) { if(min>max){ var t=min; min=max; max=t; } return (val>max?max:(val<min?min:val)); }
