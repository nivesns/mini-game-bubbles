
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
		if(allBody.GetUserData() == 'sun')
		{
			var position = allBody.GetPosition();
					
			DrawLayInSecene(context, "images/ball.png", (position.x-0.5)*30,(position.y-0.5)*30, 30,30);//playTwo
		}
		allBody = allBody.GetNext();
	}
}
/////////////////////////////////////////////////////判断一个物体是否静止 
function JudgeStatic(moveBody)
{
	return !moveBody.IsAwake();
}


