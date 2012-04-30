
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

///////////////////////////////////////////////////����Body���Ķ���

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
		if(allBody.GetUserData() == 'sun')
		{
			var position = allBody.GetPosition();
					
			DrawLayInSecene(context, "images/ball.png", (position.x-0.5)*30,(position.y-0.5)*30, 30,30);//playTwo
		}
		if(allBody.GetUserData() == 'Return')
		{
			var position = allBody.GetPosition();
			
			DrawLayInSecene(context, "images/return.png",(position.x - 0.5)*30, (position.y - 0.5)*30, 30,30);//return ͼ��
			
		}
		allBody = allBody.GetNext();
	}
}
/////////////////////////////////////////////////////���Ʒ���ͼ��




/////////////////////////////////////////////////////�ж�һ�������Ƿ�ֹ 
function JudgeStatic(moveBody)
{
	return !moveBody.IsAwake();
}

/////////////////////////////////////////////////////////////////////////////////////////////////��괦��

var mouseJoint = null;
/////////////////////////////////////////////////////��갴��
function MouseClickDownRollBall(ev, world, context, canvas)
{
	
	bodyball = getObjectFromWorld(world, 'RollBall');
	
	var bodyballPosition = bodyball.GetPosition();
	
	if( !(ev.offsetX< (bodyballPosition.x+0.5)*30 && ev.offsetX > (bodyballPosition.x-0.5)*30 &&
	ev.offsetY < (bodyballPosition.y + 0.5) *30 && ev.offsetY > (bodyballPosition.y-0.5)*30))
	{
		return ;
	}
	
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
function MouseClickUpRollBall(ev, world, context, canvas)
{
	if(mouseJoint != null)
	{
		world.DestroyJoint(mouseJoint);            
		mouseJoint = null;
	}
}

/////////////////////////////////////////////////����ƶ�
function MouseMoveRollBall(ev, world, context, canvas)
{
	if(mouseJoint != null)
	{
		mouseJoint.SetTarget(new b2Vec2(ev.offsetX /30, ev.offsetY/30));
	}
}
////////////////////////////////////////////////////////////////////////////////////////////��괦��return��ť
function MouseClickDownReturn(ev, world, context, canvas)
{
	bodyball = getObjectFromWorld(world, 'Return');
	
	var bodyballPosition = bodyball.GetPosition();
	
	if( ev.offsetX< (bodyballPosition.x+0.5)*30 && ev.offsetX > (bodyballPosition.x-0.5)*30 &&
	ev.offsetY < (bodyballPosition.y + 0.5) *30 && ev.offsetY > (bodyballPosition.y-0.5)*30)
	{
		alert("click");
	}
}
function MouseClickUpReturn(ev, world, context, canvas)
{
	
}
