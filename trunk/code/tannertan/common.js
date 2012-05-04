
var globalNumberOfBall_PlayerA = 0;
var globalColorFrame = 0;
var globalCanChange = false;///�����Ƿ������ɫ����
var globalAddOneAffect = 0;//��ʾ���������1��Ч���ܳ�����á�
/////////////////////////////////////////////////////////��������   src��ʾ�������ֵ�·��
function PlayMusic(src)
{
	var bgmusic = new Audio(src);
	bgmusic.play();
}

/////////////////////////////////////////////////////////�������嵽������ȥ,
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

///////////////////////////////////////////////////////����ÿһ֡�������Ķ�����
function DrowWorldEveryObject(world, context, canvas)
{
	DrawCloud(world, context, canvas);///����
	
	DrawTrack(world, context, canvas);//�����
	
	DrawGround(world, context, canvas);//���������ľ
	
	DrawRole(world, context, canvas);//����ɫ
	
	DrawScore(world, context, canvas);//������
	
	DrawBody(world, context, canvas);//�������������Ե�����
	
	
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
function DrawScore(world, context, canvas)
{
	DrawLayInSecene(context, "number/1.png", 0, 0, 10,70);//���� 
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
///////////////////////////////////////////////////����Body���Ķ���

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
		if(allBody.GetUserData() == 'accelerate')
		{
			var position = allBody.GetPosition();
					
			DrawLayInSecene(context, "images/accelerate.png", (position.x-0.5)*30,(position.y-0.5)*30, 30,30);//playTwo
		}
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
		
		if(allBody.GetUserData() == 'slowDown')
		{
			var position = allBody.GetPosition();
			
			DrawLayInSecene(context, "images/slowDown.png",(position.x - 0.5)*30, (position.y - 0.5)*30, 30,30);//return ͼ��
			
		}
		allBody = allBody.GetNext();
	}
	if(globalAddOneAffect > 0)
	{
		DrawLayInSecene(context, "images/finish.png",12*30 , globalAddOneAffect/2+60, 30,30);//���ƽ���Ŀ��Ӷ���
		globalAddOneAffect--;
	}
	{
		if(globalNumberOfBall_PlayerA == 5)
		{
			//////������һ�ء�
			alert("���Խ�����һ����");
		}
		var path = "number/"+globalNumberOfBall_PlayerA + ".png";
		DrawLayInSecene(context, path,6*30 ,0.7*30 , 20,30)
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
		///���ӵ��´���
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
	
	addObjectToWorld(world,13,11.5,'accelerate',b2Body.b2_staticBody,fixDef);//���Ӽ��ϵ�����
			
	addObjectToWorld(world,15,10,'slowDown',b2Body.b2_staticBody,fixDef);//���ӱ�ը������
	
	
	
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
		if(position.x > 18 && position.x < 20 && position.y < 13 && position.y > 11)
		{
			globalAddOneAffect = 60;//�����1������ʱ��
			globalNumberOfBall_PlayerA = globalNumberOfBall_PlayerA + 1;//��ʾ������������
			
			///˵����������ȷ�Ŀ���
		}
		else
		{
			//����ĿӲ���ȷ
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
///////////////////////////////////////////////////////////////////////////////���ӳ�ʼ��ʱ��һ����
function AddInitBall(world, fixDef)
{
	addObjectToWorld(world, 5, 12.32, 'RollBall',b2Body.b2_staticBody ,fixDef);
}
//////////////////////////////////////////////////////////////////////////////����һ��������ٶ�
function SetObjectSpeed(object, i)
{
	object.SetLinearVelocity(new b2Vec2(0, i/20));
}