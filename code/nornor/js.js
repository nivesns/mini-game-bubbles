var World,Body1,Body2;
var canvas, context;
var Shape1;
var bgmusic = new Audio('sc/bg.mp3');

//初始化
function init(){
	
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
	canvasWidth = parseInt(canvas.width);
    canvasHeight = parseInt(canvas.height);
    canvasTop = parseInt(canvas.offsetTop);
    canvasLeft = parseInt(canvas.offsetLeft);
	box2dMain();
	playbgmusic();
	
}

//初始化box2d
function box2dMain() {
	
    setupWorld();				//1. 创建一个世界
    addBodys();					//2. 为世界创建物体
    setInterval(step, 1000/60);	//3. 让世界动起来

}
function playbgmusic(){
		bgmusic.play();
	}
//setupWorld()
function setupWorld(){

    //1. 设置有效区域大小 - b2AABB 类 （左上角向量,右下角向量）
    worldAABB = new b2AABB();
    worldAABB.minVertex.Set(-1000, -1000);	//左上角
    worldAABB.maxVertex.Set(1000, 1000); 	//右下角

    //2. 定义重力 - 2D向量 - b2Vec2 类 （x,y）
    gravity = new b2Vec2(0, 300);

    //3. 忽略休眠的物体
    var doSleep = true;

    //4. 创建世界 - b2World
    World = new b2World(worldAABB, gravity, doSleep);
}


//addBodys()
function addBodys(){

    //1. 定义形状	b2CircleDef,b2BoxDef,b2PolyDef 类
	Shape1 = new b2CircleDef();	//Shape1:圆形
	Shape1.radius = 15;					//半径
	Shape1.localPosition.Set(0, 0);		//偏移量
    Shape1.density = 1.0;				//密度
    Shape1.restitution = .4;			//弹性
    Shape1.friction = 1;				//摩擦力
	Shape1.userData='ball';
	//2. 定义物体	b2BodyDef 类
    var BodyDef1 = new b2BodyDef();
	
    BodyDef1.position.Set(200, 10);	//设置物体的初始位置
    BodyDef1.AddShape(Shape1);			//物体中加入Shape1
    //BodyDef1.AddShape(Shape2);			//物体中加入Shape2

	//3. 将物体添加至world
    Body = World.CreateBody(BodyDef1);	//在世界中创建物体


	//...可用同样流程继续添加物体，再定义一块地板
	var Shape3 = new b2BoxDef();	//Shape3:矩形
	
    Shape3.extents.Set(800, 1);			//定义矩形高、宽
    //Shape2.density = 1;					//墙体密度为0
    //Shape2.restitution = .9;			//弹性
    //Shape2.friction = 1;				//摩擦力
	var BodyDef2 = new b2BodyDef();
    BodyDef2.position.Set(0, 450);	//设置物体的初始位置
    BodyDef2.AddShape(Shape3);			//物体中加入Shape3
    Body2 = World.CreateBody(BodyDef2);	//在世界中创建物体

}


//计算和绘制世界的下一帧
function step(){
	var dt = 1/60;
	//迭代次数，影响物体碰撞的计算精度，太高会导致速度过慢
	var iterations = 5;
	//计算dt秒之后世界中物体的位置
	World.Step(dt,iterations);
	//绘制世界
	drawWorld();
}


//绘制世界
function drawWorld(){
	//绘制之前将上一帧的内容清除
	context.clearRect(0, 0, canvasWidth, canvasHeight);
	//遍历世界中的物体
    for (var b = World.m_bodyList; b; b = b.m_next) {
		//遍历物体中的形状
        for (var s = b.GetShapeList(); s != null; s = s.GetNext()) {
            this.drawShape(s);	//绘制一个形状
        }
    }
}
//绘制一个形状
function drawShape(shape){
    context.strokeStyle = '#333';		//线形
    context.beginPath();
    switch (shape.m_type) {
        case b2Shape.e_circleShape:{	//如果是圆形，画圆
            var circle = shape;
            var r = circle.m_radius;
            var pos = circle.m_position;
            var pos2 = circle.m_R.col1.clone().scale(r).add(pos);
            //context.arc(pos.x, pos.y, r, 0, Math.PI * 2, false);
           // context.moveTo(pos.x, pos.y);
           // context.lineTo(pos2.x, pos2.y);
			var ballimage;
			ballimage = new Image();
			ballimage.src = "images/ball.png";
			console.log("draw circle");
			context.drawImage(ballimage, pos.x, pos.y, 30, 30);
			//drawImage(图片，位置x,位置Y,长，宽)
            break;
        }
        case b2Shape.e_polyShape:{		//如果是多边形，画多边形
            var poly = shape;
            var tV = b2Math.AddVV(poly.m_position, b2Math.b2MulMV(poly.m_R, poly.m_vertices[0]));
            context.moveTo(tV.x, tV.y);
            for (var i = 0; i < poly.m_vertexCount; i++) {
                var v = b2Math.AddVV(poly.m_position, b2Math.b2MulMV(poly.m_R, poly.m_vertices[i]));
                context.lineTo(v.x, v.y);
            }
            context.lineTo(tV.x, tV.y);
            break;
        }
    }
    context.stroke();	//绘制
}

 //mouse
         
         var mouseX, mouseY, mousePVec, isMouseDown, selectedBody, mouseJoint;
        // var canvasPosition = getElementPosition(document.getElementById("canvas"));
        // console.log(document.getElementById("canvas").offsetTop);
         document.addEventListener("mousedown", function(e) {
            isMouseDown = true;
            handleMouseMove(e);
            document.addEventListener("mousemove", handleMouseMove, true);
         }, true);
         
         document.addEventListener("mouseup", function() {
            document.removeEventListener("mousemove", handleMouseMove, true);
			//console.log("handleMouseUp------------------------");
            isMouseDown = false;
            mouseX = undefined;
            mouseY = undefined;
         }, true);
         
         function handleMouseMove(e) {
           // mouseX = (e.clientX - canvasPosition.x) / 20;
            //mouseY = (e.clientY - canvasPosition.y) / 20;
			//console.log(e.offsetX+" "+e.offsetY);
			for (var b = World.m_bodyList; b; b = b.m_next) {
		//遍历物体中的形状
				for (var s = b.GetShapeList(); s != null; s = s.GetNext()) {
					//this.drawShape(s);	//绘制一个形状
				console.log(s.m_userData);
					if(s.m_userData =="ball"){console.log('buddy,你点到球了，可以下班了');}
					//bgmusic.pause();
					
				}
			}
			//var collision = World.m_contactList;
			//if (collision.GetShapeList().GetUserData() == 'ball'){console.log("ball");}
         };
		  function handleMouseUp(e) {
           		console.log("------------------------handleMouseUp------------------------");
        	 };
         
         function getBodyAtMouse() {
            mousePVec = new b2Vec2(mouseX, mouseY);
            var aabb = new b2AABB();
            aabb.lowerBound.Set(mouseX - 0.001, mouseY - 0.001);
            aabb.upperBound.Set(mouseX + 0.001, mouseY + 0.001);
            
            // Query the world for overlapping shapes.

            selectedBody = null;
            world.QueryAABB(getBodyCB, aabb);
            return selectedBody;
         }

         function getBodyCB(fixture) {
            if(fixture.GetBody().GetType() != b2Body.b2_staticBody) {
               if(fixture.GetShape().TestPoint(fixture.GetBody().GetTransform(), mousePVec)) {
                  selectedBody = fixture.GetBody();
                  return false;
               }
            }
            return true;
         }
		 