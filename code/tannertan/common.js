var globalAccountOfBall = 6;///����Ҫ�������ĸ���
var globalNumberOfBall_PlayerA = 0;//Ŀǰ���˼�����playOne;
var globalColorFrame = 0;//��ʾ��ɫ�仯��֡�Ƕ���
var globalCanChange = false;///�����Ƿ������ɫ����b
var globalAddOneAffect = 0;//��ʾ���������1��Ч���ܳ�����á�
var globalScoreOfPlayOne = 0, globalScoreOfPlayTwo = 0;//��ʾplayOne��playTwo�ķ���
var globalTime = 0;//������¼ʱ��
var globalAllTime =  60 * 180;//��¼�ܹ���Ҫ��ʱ��
////////////////////////////////////////////////////////////////////////////�ж��ַ������Ƿ���ĳ���Ӵ�
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
/////////////////////////////////////////////////////////��������   src��ʾ�������ֵ�·��
function PlayMusic(src)
{
	var bgmusic = new Audio(src);
	bgmusic.play();
	
}

/////////////////////////////////////////////////////////������嵽������ȥ,
function  addObjectToWorld(world, position_x ,position_y, userdata, type,  fixDef)
{
	var defBody = new b2BodyDef;//���� b2BodyDef;
	defBody.userData = userdata;
	
	defBody.type = type;
	defBody.position.Set(position_x,position_y);
	
	var commonBody = world.CreateBody(defBody);// b2Body;
	
	var fix = commonBody.CreateFixture(fixDef);//b2Fxiture		
}

/////////////////////////////////////////////////////////��������е����� 
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

/////////////////////////////////////////////////////////ɾ�������е����� 

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

/////////////////////////////////////////////////////////���������е�һ��ͼ�� 
function DrawLayInSecene(context ,src, position_x, position_y,width, height)
{
	var image;
	image = new Image();
	image.src = src;
	context.drawImage(image, position_x, position_y, width, height);
}

///////////////////////////////////////////////////////����ÿһ֡������Ķ�����
function DrowWorldEveryObject(world, context, canvas)
{
	DrawCloud(world, context, canvas);///����
	
	DrawTrack(world, context, canvas);//�����
	
	DrawGround(world, context, canvas);//���������ľ
	
	DrawRole(world, context, canvas);//����ɫ
	
	DrawScore(world, context, canvas);//������
	
	DrawBody(world, context, canvas);//�������������Ե�����
	
	
	
	if(globalTime > globalAllTime)///////////////////////////����
	{
		alert("over");
	}
	DrawTime(world, context, canvas);
	globalTime = globalTime + 1;
}

///////////////////////////////////////////////////////����ʱ��
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
////////////////////////////////////////////////////������ 
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

////////////////////////////////////////////////////���ƹ��
function DrawTrack(world, context, canvas)
{
	DrawLayInSecene(context, "images/track.png", 0, 0, 800,480);//�����
}

////////////////////////////////////////////////////������ľ
function DrawGround(world ,context, canvas)
{
	DrawLayInSecene(context, "images/lay.png", 0, 0, 800,480);//���������ľ
}

///////////////////////////////////////////////////���ƽ�ɫ
function DrawRole(world, context, canvas)
{
	DrawLayInSecene(context, "images/playOne.png", 0, 0, 160,70);//playOne
			
	DrawLayInSecene(context, "images/playTwo.png", 640, 0, 160,70);//playTwo
}

///////////////////////////////////////////////////���Ʒ���
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
	///playOne ����ʼλ��Ϊ 70,25  size 15, 20,  playTwo 720, 20, size 10, 30
	var playOnePositionBegin = new b2Vec2(65, 25);
	var playOneSize = new b2Vec2(15,20);
	
	var playTwoPositionBegin = new b2Vec2(710, 25);
	var playTwoSize = new b2Vec2(15,20);
	
	var middleOneScore = globalScoreOfPlayOne;
	var middleTwoScore = globalScoreOfPlayTwo;
	
	HandleScore(context, playOnePositionBegin, playOneSize, middleOneScore);
	HandleScore(context, playTwoPositionBegin, playTwoSize, middleTwoScore);	
}
/////////////////////////////////////////////////////����ʱ�������������ɫ
function DrawBallColor(context, position)
{
	var rate = 20;
	var index = parseInt(globalColorFrame / rate);
	if(index < 18)//��ʾͼƬ�ж�����
	{
		var filePath = "images/change/"+ parseInt(index/10) + parseInt(index %10)+ ".png"; 
		DrawLayInSecene(context, filePath, (position.x-0.5)*30,(position.y-0.5)*30, 30,30)
	}
	else
	{
		globalColorFrame = 0;
	}
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////��Ҫ���Ƶ���
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
///////////////////////////////////////////////////////////����Body���Ķ���
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
			
			DrawLayInSecene(context, "images/return.png",(position.x - 0.5)*30, (position.y - 0.5)*30, 30,30);//return ͼ��
			
		}
		if(allBody.GetUserData() == "RollBall_1" || allBody.GetUserData() == "RollBall_2" ||allBody.GetUserData() == "RollBall_3" ||
		allBody.GetUserData() == "RollBall_4" ||allBody.GetUserData() == "RollBall_5" )
		{
			var position = allBody.GetPosition();
			
			DrawLayInSecene(context, "images/ball.png",(position.x - 0.5)*30, (position.y - 0.5)*30, 30,30);//�����м������ͼ��
		}
		
		
		allBody = allBody.GetNext();
	}
	if(globalAddOneAffect > 0)
	{
		DrawLayInSecene(context, "images/finish.png",12*30 , globalAddOneAffect/2+60, 30,30);//���ƽ���Ŀ��Ӷ���
		globalAddOneAffect--;
	}
	{
		if(globalNumberOfBall_PlayerA >= globalAccountOfBall)
		{
			//////������һ�ء�
		//	alert("���Խ�����һ����");
			alert("enter the next scene");
		}
		var path = "number/"+globalNumberOfBall_PlayerA + ".png";//��ʽ����ɼ�����
		DrawLayInSecene(context, path,6*30 ,0.7*30 , 20,30)
	}
	{
		for(var i = 0 ; i < globalAccountOfBall -1 - globalNumberOfBall_PlayerA;i++)
		{
			DrawLayInSecene(context, "images/ball.png",(i+6) *35, 20, 30,30);//��ʣ�¼�����û���
		}
	}
	
	
}
/////////////////////////////////////////////////////���س����ж�̬����ĸ���
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

/////////////////////////////////////////////////////�ж�һ�������Ƿ�ֹ 
function JudgeStatic(moveBody)
{
	return !moveBody.IsAwake();
}
///////////////////////////////////////////////////////////////////////////////////�жϵ�������ĸ���
function GetWhileRollBall(world, ev)
{
	var allBodyList = world.GetBodyList();
	while(allBodyList)
	{
		var position = allBodyList.GetPosition();
		///��ӵ��´���
		if(allBodyList.GetUserData() == 'RollBall')
		{
			if(ev.offsetX< (position.x+0.5)*30 && ev.offsetX > (position.x-0.5)*30 && 
			ev.offsetY < (position.y + 0.5) *30 && ev.offsetY > (position.y-0.5)*30)
			{
				return allBodyList;
			}
		}
		
		////������Щ���ϵĴ���
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

/////////////////////////////////////////////////////////////////////////////////////////////////��괦��
////////////////////////////////////////////////////////////////////////////////////////////////
var mouseJoint = null;
var clickRollBallStation = 0;
var  beforeMouseMove  = new Box2D.Common.Math.b2Vec2();//����ֻ����һ�������ƶ���ʱ���õ�
/////////////////////////////////////////////////////��갴��
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
	globalColorFrame = 0;//������ɫ�ɱ�

	beforeMouseMove.x = 1000000;//ʹ��ÿ�ε���������ʱ������λ���������ģ�
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
//////////////////////////////////////////////////��굯��
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
		globalColorFrame = 0;//������ɫ�ı�ֹͣ
	}
}

/////////////////////////////////////////////////����ƶ�

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
			globalColorFrame = 0;//������ɫ�ı�ֹͣ
			
		}
		
	}
}
////////////////////////////////////////////////////////////////////////////////////////////��괦��return��ť
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
	//	ClickReturnRecover(world, fixDef);  //���ϣ������ˣ� ���ڵķ�����Ϣû����
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

//////////////////////////////////////////////////////////////////////////////////������ر�ʶ�������
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
///////////////////////////////////////////////////////////////////////////ÿ�δ�������Ϸ����Ҫ���½����Ķ���
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
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////������������嶼�������
	
	ChangeHelperAccordingNum(world, fixDef);
	
	
	
	
}
//////////////////////////////////////////////////////////////////////////////////���ݲ�ͬ�Ľ�����������ߵı仯
function ChangeHelperAccordingNum(world, fixDef)//////////////////////////////////ע����ͬһ��case   break֮�䲻����ͬ����accelerate��slowDown.������������accelerate1,accelerate2,..��slowDown1��slowDown2...��������ʽ
{
	switch(globalNumberOfBall_PlayerA)
	{
		case 0://û��������
			addObjectToWorld(world,15,10,'accelerate',b2Body.b2_staticBody,fixDef);//��Ӽ��ٵĵ�����(15,10)���������	
			addObjectToWorld(world,11,13,'accelerate1',b2Body.b2_staticBody,fixDef);//��Ӽ��ٵĵ�����(11,13)���������
			break;
		case 1://��1�������
			addObjectToWorld(world,15,10,'slowDown',b2Body.b2_staticBody,fixDef);//��Ӽ��ٵĵ�����(15,10)���������	
			addObjectToWorld(world,11,13,'slowDown1',b2Body.b2_staticBody,fixDef);//��Ӽ��ٵĵ�����(11,13)���������
			break;
		case 2://��2�������
			addObjectToWorld(world,15,10,'accelerate',b2Body.b2_staticBody,fixDef);//��Ӽ��ٵĵ�����(15,10)���������	
			addObjectToWorld(world,11,13,'slowDown',b2Body.b2_staticBody,fixDef);//��Ӽ��ٵĵ�����(11,13)���������
			break;
		case 3://��3�������
			addObjectToWorld(world,15,10,'accelerate',b2Body.b2_staticBody,fixDef);//��Ӽ��ٵĵ�����(15,10)���������	
			addObjectToWorld(world,11,13,'slowDown',b2Body.b2_staticBody,fixDef);//��Ӽ��ٵĵ�����(11,13)���������
			break;
		case 4://��4�������
			addObjectToWorld(world,15,10,'accelerate',b2Body.b2_staticBody,fixDef);//��Ӽ��ٵĵ�����(15,10)���������	
			addObjectToWorld(world,11,13,'slowDown',b2Body.b2_staticBody,fixDef);//��Ӽ��ٵĵ�����(11,13)���������
			break;
		case 5://��5�������
			addObjectToWorld(world,15,10,'accelerate',b2Body.b2_staticBody,fixDef);//��Ӽ��ٵĵ�����(15,10)���������	
			addObjectToWorld(world,11,13,'slowDown',b2Body.b2_staticBody,fixDef);//��Ӽ��ٵĵ�����(11,13)���������
			break;
		default://�����������������
			break;
		
	}
}
/////////////////////////////////////////////////////////////////////////////////ɾ�������ж�̬��ֹ������
function DeleteActionStaticObject(world, fixDef)
{
	dynamicObject = GetDynamicObjectInScene(world);
	if(dynamicObject == null)
	{
		return null;
	}
	if(JudgeStatic(dynamicObject) && clickRollBallStation == 0)
	{
		////////////////////////////////////////////////////////////�ڸõط�������ʧ֮ǰ��һЩ��Ч��
		
		position = dynamicObject.GetPosition();
		if(position.x > 26 && position.x < 27 )
		{
		//	alert(position.x *30 + " "+ position.y*30);
			globalAddOneAffect = 60;//�����1������ʱ��
			globalNumberOfBall_PlayerA = globalNumberOfBall_PlayerA + 1;//��ʾ������������
			PlayMusic('musicSrc/gotit.mp3');
			///˵����������ȷ�Ŀ���
		}
		else
		{
			//����ĿӲ���ȷ
		//	alert(position.x  + " "+ position.y);
		//	alert("error");
		}
		
		
		deleteOjectFromWorld(world, dynamicObject.GetUserData());
		addMultipleObject(world, fixDef);
		AddInitBall(world, fixDef);
		
		
		ResetTheNumber(0,0);//������Ϊ�˷�ֹ��ײʱ���ֵ�bug
		
		
	}
}

/////////////////////////////////////////////////////////////////////////////////��ó����ж�̬������ 
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
///////////////////////////////////////////////////////////////////////////////��ӳ�ʼ��ʱ��һ����
function AddInitBall(world, fixDef)
{
	addObjectToWorld(world, 5, 12.32, 'RollBall',b2Body.b2_staticBody ,fixDef);	
}
//////////////////////////////////////////////////////////////////////////////����һ��������ٶ�
function SetObjectSpeed(object, i)
{
	object.SetLinearVelocity(new b2Vec2(0, i/17));
}