
/////////////////////////////////////////////////////////播放音乐   src表示的是音乐的路径
function PlayMusic(src)
{
	var bgmusic = new Audio(src);
	bgmusic.play();
}

/////////////////////////////////////////////////////////添加物体到世界中去,
function  addObjectToWorld(world, position_x ,position_y, userdata, type,  fixDef)
{
	var defBody = new b2BodyDef;//定义 b2BodyDef;
	defBody.userData = userdata;
	
	defBody.type = type;
	defBody.position.Set(position_x,position_y);
	
	var commonBody = world.CreateBody(defBody);// b2Body;
	
	var fix = commonBody.CreateFixture(fixDef);//b2Fxiture		
}

/////////////////////////////////////////////////////////获得世界中的物体 
function getObjectFromWorld(world, userdata)
{
	var allBody = world.GetBodyList();
	while(allBody)
	{
		if(allBody.GetUserData() == userdata)
		{
			return allBody;
		}
		allBody = allBody.GetNext();
		
	}
}

/////////////////////////////////////////////////////////删除世界中的物体 

function deleteOjectFromWorld(world, userdata)//
{
	var bodyList = world.GetBodyList();
	while(bodyList)
	{
		if(bodyList.GetUserData() == userdata )
		{
			var fixList = bodyList.GetFixtureList();
			while(fixList)
			{
				bodyList.DestroyFixture(fixList);
				fixList = fixList.GetNext();
			}
			world.DestroyBody(bodyList);
		}
		bodyList = bodyList.GetNext();
	}
	
}

/////////////////////////////////////////////////////////绘制世界中的一个图形 
function DrawLayInSecene(context ,src, position_x, position_y,width, height)
{
	var image;
	image = new Image();
	image.src = src;
	context.drawImage(image, position_x, position_y, width, height);
}

///////////////////////////////////////////////////////处理每一帧都处理的东西。
function DrowWorldEveryObject(world, context, canvas)
{
	DrawCloud(world, context, canvas);///画云
	
	DrawTrack(world, context, canvas);//画轨道
	
	DrawGround(world, context, canvas);//画地面的树木
	
	DrawRole(world, context, canvas);//画角色
	
	DrawScore(world, context, canvas);//画分数
	
	DrawBody(world, context, canvas);//画建立的有属性的物体
	
	
}

////////////////////////////////////////////////////绘制云 
var cloudAnimationBegin = -800;
function DrawCloud(world, context, canvas)
{
	DrawLayInSecene(context, "images/cloud.png",cloudAnimationBegin,0, 800, 480);
	if(cloudAnimationBegin >= 800)
	{
		cloudAnimationBegin = -800;
	}
	cloudAnimationBegin += 0.5;	
}

////////////////////////////////////////////////////绘制轨道
function DrawTrack(world, context, canvas)
{
	DrawLayInSecene(context, "images/track.png", 0, 0, 800,480);//画轨道
}

////////////////////////////////////////////////////绘制树木
function DrawGround(world ,context, canvas)
{
	DrawLayInSecene(context, "images/lay.png", 0, 0, 800,480);//画地面的树木
}

///////////////////////////////////////////////////绘制角色
function DrawRole(world, context, canvas)
{
	DrawLayInSecene(context, "images/playOne.png", 0, 0, 160,70);//playOne
			
	DrawLayInSecene(context, "images/playTwo.png", 640, 0, 160,70);//playTwo
}

///////////////////////////////////////////////////绘制分数
function DrawScore(world, context, canvas)
{
	DrawLayInSecene(context, "number/1.png", 0, 0, 10,70);//数字 
}

///////////////////////////////////////////////////绘制Body样的东西

function DrawBody(world, context, canvas)
{
	var allBody = world.GetBodyList();
	
	while(allBody)
	{
		if(allBody.GetUserData() == 'RollBall')
		{
			var position = allBody.GetPosition();
			
			DrawLayInSecene(context, "images/ball.png", (position.x-0.5)*30,(position.y-0.5)*30, 30,30);//playTwo
					
		}
		if(allBody.GetUserData() == 'accelerate')
		{
			var position = allBody.GetPosition();
					
			DrawLayInSecene(context, "images/accelerate.png", (position.x-0.5)*30,(position.y-0.5)*30, 30,30);//playTwo
		}
		if(allBody.GetUserData() == 'Return')
		{
			var position = allBody.GetPosition();
			
			DrawLayInSecene(context, "images/return.png",(position.x - 0.5)*30, (position.y - 0.5)*30, 30,30);//return 图标
			
		}
		if(allBody.GetUserData() == "RollBall_1" || allBody.GetUserData() == "RollBall_2" ||allBody.GetUserData() == "RollBall_3" ||
		allBody.GetUserData() == "RollBall_4" ||allBody.GetUserData() == "RollBall_5" )
		{
			var position = allBody.GetPosition();
			
			DrawLayInSecene(context, "images/ball.png",(position.x - 0.5)*30, (position.y - 0.5)*30, 30,30);//画还有几个球的图标
		}
		
		if(allBody.GetUserData() == 'slowDown')
		{
			var position = allBody.GetPosition();
			
			DrawLayInSecene(context, "images/slowDown.png",(position.x - 0.5)*30, (position.y - 0.5)*30, 30,30);//return 图标
			
		}
		allBody = allBody.GetNext();
	}
}
/////////////////////////////////////////////////////返回场景中动态物体的个数
function NumberDynamicInScene(world)
{
	var allBody = world.GetBodyList();
	var i = 0;
	while(allBody)
	{
		if( allBody.GetType() == b2Body.b2_dynamicBody)
		{
			i = i +1;
		}
		allBody = allBody.GetNext();
	}
	return i;
}

/////////////////////////////////////////////////////判断一个物体是否静止 
function JudgeStatic(moveBody)
{
	return !moveBody.IsAwake();
}
///////////////////////////////////////////////////////////////////////////////////判断点击的是哪个球
function GetWhileRollBall(world, ev)
{
	var allBodyList = world.GetBodyList();
	while(allBodyList)
	{
		var position = allBodyList.GetPosition();
		if(allBodyList.GetUserData() == 'RollBall_1')
		{
			if(ev.offsetX< (position.x+0.5)*30 && ev.offsetX > (position.x-0.5)*30 && 
			ev.offsetY < (position.y + 0.5) *30 && ev.offsetY > (position.y-0.5)*30)
			{
				return allBodyList;
			}
		}
		if(allBodyList.GetUserData() == 'RollBall_2')
		{
			if(ev.offsetX< (position.x+0.5)*30 && ev.offsetX > (position.x-0.5)*30 && 
			ev.offsetY < (position.y + 0.5) *30 && ev.offsetY > (position.y-0.5)*30)
			{
				return allBodyList;
			}
		}
		if(allBodyList.GetUserData() == 'RollBall_3')
		{
			if(ev.offsetX< (position.x+0.5)*30 && ev.offsetX > (position.x-0.5)*30 && 
			ev.offsetY < (position.y + 0.5) *30 && ev.offsetY > (position.y-0.5)*30)
			{
				return allBodyList;
			}
		}
		if(allBodyList.GetUserData() == 'RollBall_4')
		{
			if(ev.offsetX< (position.x+0.5)*30 && ev.offsetX > (position.x-0.5)*30 && 
			ev.offsetY < (position.y + 0.5) *30 && ev.offsetY > (position.y-0.5)*30)
			{
				return allBodyList;
			}
		}
		if(allBodyList.GetUserData() == 'RollBall_5')
		{
			if(ev.offsetX< (position.x+0.5)*30 && ev.offsetX > (position.x-0.5)*30 && 
			ev.offsetY < (position.y + 0.5) *30 && ev.offsetY > (position.y-0.5)*30)
			{
				return allBodyList;
			}
		}
		allBodyList = allBodyList.GetNext();
	}
	return null;
}

/////////////////////////////////////////////////////////////////////////////////////////////////鼠标处理
////////////////////////////////////////////////////////////////////////////////////////////////
var mouseJoint = null;
var clickRollBallStation = 0;
/////////////////////////////////////////////////////鼠标按下
var bodyballRollBallPosition ;
function MouseClickDownRollBall(ev, world, context, canvas , fixDef)
{
	
//	bodyball = getObjectFromWorld(world, 'RollBall');
	
	if(NumberDynamicInScene(world) != 0)
	{
		return ;
	}
	
	bodyball = GetWhileRollBall(world, ev);
	if(bodyball == null)
	{
		return ;
	}
	
	var bodyballRollBallPosition = bodyball.GetPosition();
	
	if( !(ev.offsetX< (bodyballRollBallPosition.x+0.5)*30 && ev.offsetX > (bodyballRollBallPosition.x-0.5)*30 &&
	ev.offsetY < (bodyballRollBallPosition.y + 0.5) *30 && ev.offsetY > (bodyballRollBallPosition.y-0.5)*30))
	{
		return ;
	}
	clickRollBallStation = 1;
	bodyball.SetType(b2Body.b2_dynamicBody);
	
	addMultipleObject(world, fixDef);
	var mouseJointDef = new b2MouseJointDef();
	mouseJointDef.bodyA = world.GetGroundBody();
	mouseJointDef.bodyB = bodyball;
	mouseJointDef.target.Set(ev.offsetX/30, ev.offsetY/30);
	mouseJointDef.collideConnected = true;
	mouseJointDef.maxForce = 1000* bodyball.GetMass() ;//
	if(mouseJoint != null)
	{
		world.DestroyJoint(mouseJoint);
				       
		mouseJoint = null;
	}
	mouseJoint = world.CreateJoint(mouseJointDef);
}
//////////////////////////////////////////////////鼠标弹起
function MouseClickUpRollBall(ev, world, context, canvas, fixDef)
{
	if(mouseJoint != null)
	{
		clickRollBallStation = 0;
		world.DestroyJoint(mouseJoint);            
		mouseJoint = null;
	}
}

/////////////////////////////////////////////////鼠标移动
function MouseMoveRollBall(ev, world, context, canvas, fixDef)
{
	if(mouseJoint != null)
	{
		mouseJoint.SetTarget(new b2Vec2(ev.offsetX /30, ev.offsetY/30));
	
		if(ev.offsetX < 0.01 *30 || ev.offsetX > 800 - 0.01*30 ||
		ev.offsetY < 0.01 *30 || ev.offsetY > 480 - 0.01*30 )
		{
			world.DestroyJoint(mouseJoint);
			clickRollBallStation = 0;	       
			mouseJoint = null;
		}
		
	}
}
////////////////////////////////////////////////////////////////////////////////////////////鼠标处理return按钮
var clickReturnReturn  = 0;
var bodyballReturnPosition ;
function MouseClickDownReturn(ev, world, context, canvas, fixDef)
{
	bodyball = getObjectFromWorld(world, 'Return');
	
	bodyballReturnPosition = bodyball.GetPosition();
	
	if( ev.offsetX< (bodyballReturnPosition.x+0.5)*30 && ev.offsetX > (bodyballReturnPosition.x-0.5)*30 &&
	ev.offsetY < (bodyballReturnPosition.y + 0.5) *30 && ev.offsetY > (bodyballReturnPosition.y-0.5)*30)
	{
		clickReturnReturn = 1;
		
	}
}
function MouseClickUpReturn(ev, world, context, canvas, fixDef)
{
	if(clickReturnReturn == 1)
	{
		ClickReturnRecover(world, fixDef);
		clickReturnReturn = 0;
	}
}
function MouseMoveReturn(ev, world, context, canvas , fixDef)
{
	if(clickReturnReturn ==  1)
	{
		if( !(ev.offsetX< (bodyballReturnPosition.x+0.5)*30 && ev.offsetX > (bodyballReturnPosition.x-0.5)*30 &&
		ev.offsetY < (bodyballReturnPosition.y + 0.5) *30 && ev.offsetY > (bodyballReturnPosition.y-0.5)*30))
		{		
			clickReturnReturn = 0;
		}
	}
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////点击返回标识后的物体
function ClickReturnRecover(world, fixDef)
{
	var allBodyList = world.GetBodyList();
	while(allBodyList)
	{
		if(allBodyList.GetUserData() == "RollBall_1" ||allBodyList.GetUserData() == "RollBall_2" ||allBodyList.GetUserData() == "RollBall_3"
		||allBodyList.GetUserData() == "RollBall_4"||allBodyList.GetUserData() == "RollBall_5")
		{
			var fixList = allBodyList.GetFixtureList();
			while(fixList)
			{
				allBodyList.DestroyFixture(fixList);
				fixList = fixList.GetNext();
			}
			world.DestroyBody(allBodyList);
		}
		allBodyList = allBodyList.GetNext();
	}
	addObjectToWorld(world, 7, 1,'RollBall_1' ,b2Body.b2_staticBody, fixDef);
	addObjectToWorld(world, 8.5, 1,'RollBall_2' ,b2Body.b2_staticBody, fixDef);
	addObjectToWorld(world, 10, 1,'RollBall_3' ,b2Body.b2_staticBody, fixDef);
	addObjectToWorld(world, 11.5, 1,'RollBall_4' ,b2Body.b2_staticBody, fixDef);
	addObjectToWorld(world, 13, 1,'RollBall_5' ,b2Body.b2_staticBody, fixDef);		
}
///////////////////////////////////////////////////////////////////////////每次从新玩游戏都需要重新建立的对象
function addMultipleObject(world, fixDef)
{
	var allBodyList = world.GetBodyList();
	while(allBodyList)
	{
		if(allBodyList.GetUserData() == "accelerate" ||allBodyList.GetUserData() == "slowDown")
		{
			var fixList = allBodyList.GetFixtureList();
			while(fixList)
			{
				allBodyList.DestroyFixture(fixList);
				fixList = fixList.GetNext();
			}
			world.DestroyBody(allBodyList);
		}
		allBodyList = allBodyList.GetNext();
	}
	
	addObjectToWorld(world,13,11.5,'accelerate',b2Body.b2_staticBody,fixDef);//添加加上的物体
			
	addObjectToWorld(world,15,10,'slowDown',b2Body.b2_staticBody,fixDef);//添加爆炸的物体
	
}

/////////////////////////////////////////////////////////////////////////////////删除场景中动态静止的物体
function DeleteActionStaticObject(world)
{
	dynamicObject = GetDynamicObjectInScene(world);
	if(dynamicObject == null)
	{
		return null;
	}
	if(JudgeStatic(dynamicObject) && clickRollBallStation == 0)
	{
		////////////////////////////////////////////////////////////在该地方加上消失之前的一些特效。
		deleteOjectFromWorld(world, dynamicObject.GetUserData());
	}
}

/////////////////////////////////////////////////////////////////////////////////获得场景中动态的物体 
function GetDynamicObjectInScene(world)
{
	var allBodyList = world.GetBodyList();
	while(allBodyList)
	{
		if(allBodyList.GetType() == b2Body.b2_dynamicBody)
		{
			return allBodyList;
		}
		allBodyList = allBodyList.GetNext();
	}
	return null;
}
