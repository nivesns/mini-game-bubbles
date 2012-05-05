var globalAccountOfBall = 6;///共需要运输的球的个数
var globalNumberOfBall_PlayerA = 0;//目前进了几个球playOne;
var globalColorFrame = 0;//表示颜色变化的帧是多少
var globalCanChange = false;///现在是否可以颜色渐变b
var globalAddOneAffect = 0;//表示现在这个加1特效还能持续多久。
var globalScoreOfPlayOne = 0, globalScoreOfPlayTwo = 0;//表示playOne和playTwo的分数
var globalTime = 0;//用来记录时间
var globalAllTime =  60 * 180;//记录总共需要的时间
////////////////////////////////////////////////////////////////////////////判断字符串中是否含有某个子串
function JudgementSubstring(string ,subString)
{	
	if(string == null)
	{
		return false;
	}
	if(string.search(subString) >= 0)
	{	
		return true;
	}
	else
	{
		return false;
	}
}
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
	
	
	
	if(globalTime > globalAllTime)///////////////////////////分钟
	{
		alert("over");
	}
	DrawTime(world, context, canvas);
	globalTime = globalTime + 1;
}

///////////////////////////////////////////////////////绘制时间
function DrawTime(world, context, canvas)
{
	var leftTime = globalAllTime - globalTime;
	var leftSecond = leftTime /60;
	var numArray = new Array([3]);
	numArray[0] = parseInt(leftSecond /100);
	numArray[1] = parseInt((leftSecond - numArray[0] *100) /10);
	numArray[2] = parseInt(leftSecond % 10);
	
	for(var i = 0 ; i < 3; i ++)
	{
		
		var path = "number/"+ numArray[i] + ".png";
		if(numArray[i] < 0)
		{
			path = "number/" + 0 + ".png";
		}
		DrawLayInSecene(context, path,390 + i * 15, 25, 15, 20);
	}
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
function HandleScore(context, playPositionBegin , playSize, score)
{
	
	var numArray = new Array([4]);
	numArray[0] = parseInt(score/1000);
	numArray[1] = parseInt((score %1000)/100);
	numArray[2] = parseInt((score %100)/10);
	numArray[3]= parseInt(score%10);
	
	for(var i = 0 ; i < 4; i ++)
	{
		var path = "number/"+ numArray[i] + ".png";
		DrawLayInSecene(context, path, playPositionBegin.x + 20 *i ,playPositionBegin.y , playSize.x, playSize.y);
	}
}

function DrawScore(world, context, canvas)
{
	///playOne 的起始位置为 70,25  size 15, 20,  playTwo 720, 20, size 10, 30
	var playOnePositionBegin = new b2Vec2(65, 25);
	var playOneSize = new b2Vec2(15,20);
	
	var playTwoPositionBegin = new b2Vec2(710, 25);
	var playTwoSize = new b2Vec2(15,20);
	
	var middleOneScore = globalScoreOfPlayOne;
	var middleTwoScore = globalScoreOfPlayTwo;
	
	HandleScore(context, playOnePositionBegin, playOneSize, middleOneScore);
	HandleScore(context, playTwoPositionBegin, playTwoSize, middleTwoScore);	
}
/////////////////////////////////////////////////////根据时间来绘制球的颜色
function DrawBallColor(context, position)
{
	var rate = 20;
	var index = parseInt(globalColorFrame / rate);
	if(index < 18)//表示图片有多少张
	{
		var filePath = "images/change/"+ parseInt(index/10) + parseInt(index %10)+ ".png"; 
		DrawLayInSecene(context, filePath, (position.x-0.5)*30,(position.y-0.5)*30, 30,30)
	}
	else
	{
		globalColorFrame = 0;
	}
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////主要绘制道具
function DrawHelpTool(context , object)
{
	if(JudgementSubstring(object.GetUserData(),'accelerate'))
	{
		var position = object.GetPosition();
		DrawLayInSecene(context, "images/accelerate.png", (position.x-0.5)*30,(position.y-0.5)*30, 30,30);
	}
	if(JudgementSubstring(object.GetUserData(),'slowDown'))
	{
		var position = object.GetPosition();
		DrawLayInSecene(context, "images/slowDown.png", (position.x-0.5)*30,(position.y-0.5)*30, 30,30);
	}
} 
///////////////////////////////////////////////////////////绘制Body样的东西
function DrawBody(world, context, canvas)
{
	var allBody = world.GetBodyList();
	
	while(allBody)
	{
		if(allBody.GetUserData() == 'RollBall')
		{
			var position = allBody.GetPosition();
			
			DrawBallColor(context, position);
			
			if(globalCanChange == true)
			{
				globalColorFrame =  globalColorFrame + 1;
			}
		}
		DrawHelpTool(context, allBody);
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
		
		
		allBody = allBody.GetNext();
	}
	if(globalAddOneAffect > 0)
	{
		DrawLayInSecene(context, "images/finish.png",12*30 , globalAddOneAffect/2+60, 30,30);//绘制进入目标坑动画
		globalAddOneAffect--;
	}
	{
		if(globalNumberOfBall_PlayerA >= globalAccountOfBall)
		{
			//////进入下一关。
		//	alert("可以进入下一关了");
			alert("enter the next scene");
		}
		var path = "number/"+globalNumberOfBall_PlayerA + ".png";//显式以完成几个球
		DrawLayInSecene(context, path,6*30 ,0.7*30 , 20,30)
	}
	{
		for(var i = 0 ; i < globalAccountOfBall -1 - globalNumberOfBall_PlayerA;i++)
		{
			DrawLayInSecene(context, "images/ball.png",(i+6) *35, 20, 30,30);//还剩下几个球没完成
		}
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
		///添加的新代码
		if(allBodyList.GetUserData() == 'RollBall')
		{
			if(ev.offsetX< (position.x+0.5)*30 && ev.offsetX > (position.x-0.5)*30 && 
			ev.offsetY < (position.y + 0.5) *30 && ev.offsetY > (position.y-0.5)*30)
			{
				return allBodyList;
			}
		}
		
		////下面这些报废的代码
	/*	if(allBodyList.GetUserData() == 'RollBall_1')
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
		}*/
		allBodyList = allBodyList.GetNext();
	}
	return null;
}

/////////////////////////////////////////////////////////////////////////////////////////////////鼠标处理
////////////////////////////////////////////////////////////////////////////////////////////////
var mouseJoint = null;
var clickRollBallStation = 0;
var  beforeMouseMove  = new Box2D.Common.Math.b2Vec2();//进行只能向一个方向移动的时候用到
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
	
	globalCanChange = true;
	globalColorFrame = 0;//设置颜色可变

	beforeMouseMove.x = 1000000;//使得每次点击球来玩的时候他的位置总是最大的，
	beforeMouseMove.y = 1000000;
	
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
		var object = getObjectFromWorld(world,"RollBall");
		
		SetObjectSpeed(object, globalColorFrame);
		clickRollBallStation = 0;
		world.DestroyJoint(mouseJoint);            
		mouseJoint = null;
		globalCanChange = false;
		globalColorFrame = 0;//设置颜色改变停止
	}
}

/////////////////////////////////////////////////鼠标移动

function MouseMoveRollBall(ev, world, context, canvas, fixDef)
{
	if(mouseJoint != null)
	{
			
		 if(beforeMouseMove.x > ev.offsetX || ev.offsetX /30< 2)
		 {
			mouseJoint.SetTarget(new b2Vec2(ev.offsetX/30, ev.offsetY/30));//ev.offsetX /30
		
			beforeMouseMove.x = ev.offsetX;
		 }
		 else
		 {
			 mouseJoint.SetTarget(new b2Vec2(beforeMouseMove.x/30, ev.offsetY/30));//ev.offsetX /30
		 }
		if(ev.offsetX < 0.01 *30 || ev.offsetX > 800 - 0.01*30 ||
		ev.offsetY < 0.01 *30 || ev.offsetY > 480 - 0.01*30 )
		{
			var object = getObjectFromWorld(world,"RollBall");
			SetObjectSpeed(object, globalColorFrame);
			
			world.DestroyJoint(mouseJoint);
			clickRollBallStation = 0;	       
			mouseJoint = null;
			globalCanChange = false;
			globalColorFrame = 0;//设置颜色改变停止
			
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
	//	ClickReturnRecover(world, fixDef);  //报废，不用了， 现在的返回消息没有了
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
	
	addMultipleObject(world, fixDef);
		
}
///////////////////////////////////////////////////////////////////////////每次从新玩游戏都需要重新建立的对象
function addMultipleObject(world, fixDef)
{
	var allBodyList = world.GetBodyList();
	while(allBodyList)
	{
		if(JudgementSubstring(allBodyList.GetUserData(),'accelerate')  ||JudgementSubstring(allBodyList.GetUserData(),'slowDown'))
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
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////所有提添加物体都在这添加
	
	ChangeHelperAccordingNum(world, fixDef);
	
	
	
	
}
//////////////////////////////////////////////////////////////////////////////////根据不同的进球个数，道具的变化
function ChangeHelperAccordingNum(world, fixDef)//////////////////////////////////注意在同一个case   break之间不能有同名的accelerate和slowDown.起名都必须是accelerate1,accelerate2,..和slowDown1，slowDown2...这样的形式
{
	switch(globalNumberOfBall_PlayerA)
	{
		case 0://没进球的情况
			addObjectToWorld(world,15,10,'accelerate',b2Body.b2_staticBody,fixDef);//添加加速的道具在(15,10)这个坐标上	
			addObjectToWorld(world,11,13,'accelerate1',b2Body.b2_staticBody,fixDef);//添加减速的道具在(11,13)这个坐标上
			break;
		case 1://进1个的情况
			addObjectToWorld(world,15,10,'slowDown',b2Body.b2_staticBody,fixDef);//添加加速的道具在(15,10)这个坐标上	
			addObjectToWorld(world,11,13,'slowDown1',b2Body.b2_staticBody,fixDef);//添加减速的道具在(11,13)这个坐标上
			break;
		case 2://进2个的情况
			addObjectToWorld(world,15,10,'accelerate',b2Body.b2_staticBody,fixDef);//添加加速的道具在(15,10)这个坐标上	
			addObjectToWorld(world,11,13,'slowDown',b2Body.b2_staticBody,fixDef);//添加减速的道具在(11,13)这个坐标上
			break;
		case 3://进3个的情况
			addObjectToWorld(world,15,10,'accelerate',b2Body.b2_staticBody,fixDef);//添加加速的道具在(15,10)这个坐标上	
			addObjectToWorld(world,11,13,'slowDown',b2Body.b2_staticBody,fixDef);//添加减速的道具在(11,13)这个坐标上
			break;
		case 4://进4个的情况
			addObjectToWorld(world,15,10,'accelerate',b2Body.b2_staticBody,fixDef);//添加加速的道具在(15,10)这个坐标上	
			addObjectToWorld(world,11,13,'slowDown',b2Body.b2_staticBody,fixDef);//添加减速的道具在(11,13)这个坐标上
			break;
		case 5://进5个的情况
			addObjectToWorld(world,15,10,'accelerate',b2Body.b2_staticBody,fixDef);//添加加速的道具在(15,10)这个坐标上	
			addObjectToWorld(world,11,13,'slowDown',b2Body.b2_staticBody,fixDef);//添加减速的道具在(11,13)这个坐标上
			break;
		default://其他情况，不再讨论
			break;
		
	}
}
/////////////////////////////////////////////////////////////////////////////////删除场景中动态静止的物体
function DeleteActionStaticObject(world, fixDef)
{
	dynamicObject = GetDynamicObjectInScene(world);
	if(dynamicObject == null)
	{
		return null;
	}
	if(JudgeStatic(dynamicObject) && clickRollBallStation == 0)
	{
		////////////////////////////////////////////////////////////在该地方加上消失之前的一些特效。
		
		position = dynamicObject.GetPosition();
		if(position.x > 26 && position.x < 27 )
		{
		//	alert(position.x *30 + " "+ position.y*30);
			globalAddOneAffect = 60;//定义加1动画的时间
			globalNumberOfBall_PlayerA = globalNumberOfBall_PlayerA + 1;//表示进球数量增加
			PlayMusic('musicSrc/gotit.mp3');
			///说明调入了正确的坑内
		}
		else
		{
			//调入的坑不正确
		//	alert(position.x  + " "+ position.y);
		//	alert("error");
		}
		
		
		deleteOjectFromWorld(world, dynamicObject.GetUserData());
		addMultipleObject(world, fixDef);
		AddInitBall(world, fixDef);
		
		
		ResetTheNumber(0,0);//作用是为了防止碰撞时出现的bug
		
		
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
///////////////////////////////////////////////////////////////////////////////添加初始化时的一个球
function AddInitBall(world, fixDef)
{
	addObjectToWorld(world, 5, 12.32, 'RollBall',b2Body.b2_staticBody ,fixDef);	
}
//////////////////////////////////////////////////////////////////////////////设置一个对象的速度
function SetObjectSpeed(object, i)
{
	object.SetLinearVelocity(new b2Vec2(0, i/17));
}