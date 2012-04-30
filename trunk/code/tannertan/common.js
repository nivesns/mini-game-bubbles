
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
		allBody = allBody.GetNext();
	}
}
/////////////////////////////////////////////////////�ж�һ�������Ƿ�ֹ 
function JudgeStatic(moveBody)
{
	return !moveBody.IsAwake();
}


