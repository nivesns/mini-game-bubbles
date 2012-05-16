function LoadSceneOne(world, context, canvas, fixDef)
{
	if(GetGlobalMusicState())//所有的场景切换音频都是在这个地方就行修改。
	{
		PlayBgMusicSceneOne();
		PauseBgMusicSceneThree();
	}
	DeleteAllObjectInScene(world);
	var fixDef1 = new b2FixtureDef;
    fixDef1.density = 10.0;
    fixDef1.friction = 0.1;
    fixDef1.restitution =0;
	fixDef1.shape = new b2PolygonShape;
	fixDef1.shape.SetAsArray([new b2Vec2(0,0),new b2Vec2(3,0),new b2Vec2(3,1),new b2Vec2(0,1)]);
	addCubeToWorld(world,9.2,10.95 ,'sceneOneLogin', b2Body.b2_staticBody, fixDef1);
	
	addCubeToWorld(world,14.3,10.95 ,'sceneOneRegister', b2Body.b2_staticBody, fixDef1);
	
	addObjectToWorld(world, 800/30 - 3.5 ,0.95, "sceneOneClose", b2Body.b2_staticBody, fixDef);
	
	addObjectToWorld(world, 1.25, 480/30 -1.20, "sceneOneBgMusic", b2Body.b2_staticBody, fixDef);
	
	addObjectToWorld(world, 800/30 - 1.25, 480/30 -1.1, "sceneOneSetup", b2Body.b2_staticBody, fixDef);
	
	var fixDef2 = new b2FixtureDef;
	fixDef2.density = 10.0;
	fixDef2.friction = 0.1;
	fixDef2.restitution = 0;
	fixDef2.shape = new b2PolygonShape;
	fixDef2.shape.SetAsArray([new b2Vec2(0,0),new b2Vec2(5,0),new b2Vec2(5,1),new b2Vec2(0,1)]);
	
	addCubeToWorld(world,12.1,7.1,'sceneOneId', b2Body.b2_staticBody, fixDef2);
	
	addCubeToWorld(world,12.1,8.6,'sceneOnePassword', b2Body.b2_staticBody, fixDef2);
}
function LoadSceneTwo(world, context, canvas, fixDef)
{
	
}
function LoadSceneThree(world, context, canvas, fixDef)
{
		if(GetGlobalMusicState())
		{
			PauseBgMusicSceneOne();
			PlayBgMusicSceneThree();
		}
		DeleteAllObjectInScene(world);
	//添加碰撞物体
		////添加背景音乐
		
		////////////////////////////////////////////////////添加该物体总是不变，只运行一次。
		{
			addObjectToWorld(world, 800/30 -2, 480/30-1,'Return' ,b2Body.b2_staticBody, fixDef); //添加按钮
		}  
		
		/////////////////////////////////////////////////////添加物体每次进行测试都要重新绘制的图形
		{
			
			addMultipleObject(world, fixDef);
					
		}
		///////////////////////////////////////////////////////添加五个球 报废，现在只能添加一个球，郁闷
		{
		//	ClickReturnRecover(world, fixDef);	
		    AddInitBall(world, fixDef);
		
		}
		///////////////////////////////////////////////////////////////////添加Music
		{
			addObjectToWorld(world, 1.25, 480/30 -1.20, "ReturnMusic", b2Body.b2_staticBody, fixDef);
		}
}
function DeleteAllObjectInScene(world)
{
	var allBodyList = world.GetBodyList();
	while(allBodyList)
	{
		if(JudgementSubstring(allBodyList.GetUserData(),'accelerate')  ||JudgementSubstring(allBodyList.GetUserData(),'slowDown') ||//场景三的物体
		JudgementSubstring(allBodyList.GetUserData(),'RollBall')||JudgementSubstring(allBodyList.GetUserData(),'Return')||//场景三的物体
		JudgementSubstring(allBodyList.GetUserData(),'sceneOne')||//场景一的物体,场景二设置好了的话，还可以添加场景二的物体
		JudgementSubstring(allBodyList.GetUserData(),'sceneTwo')//后面可能会用，所以现在加上算了
		)
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
//	deleteOjectFromWorld(world, ""); 
}

function  addCubeToWorld(world, position_x, position_y, userdata, type,  fixDef)
{
	var defBody = new b2BodyDef;//定义 b2BodyDef;
	defBody.userData = userdata;
	
	defBody.type = type;
	defBody.position.Set(position_x,position_y);
	var commonBody = world.CreateBody(defBody);// b2Body;
	
	var fix = commonBody.CreateFixture(fixDef);//b2Fxiture		
}