function LoadSceneOne(world, context, canvas, fixDef)
{
	var fixDef1 = new b2FixtureDef;
    fixDef1.density = 10.0;
    fixDef1.friction = 0.1;
    fixDef1.restitution =0;
	fixDef1.shape = new b2PolygonShape;
	fixDef1.shape.SetAsArray([new b2Vec2(0,0),new b2Vec2(2,0),new b2Vec2(2,1),new b2Vec2(0,1)]);
	addCubeToWorld(world,9,10 ,'sceneOneLogin', b2Body.b2_staticBody, fixDef1);
	addCubeToWorld(world,15,10 ,'sceneOneRegister', b2Body.b2_staticBody, fixDef1);
	
	addObjectToWorld(world, 800/30 - 3 ,1, "sceneOneClose", b2Body.b2_staticBody, fixDef);
	
	addObjectToWorld(world, 2, 480/30 -2, "sceneOneBgMusic", b2Body.b2_staticBody, fixDef);
	
	addObjectToWorld(world, 800/30 - 2, 480/30 -2, "sceneOneSetup", b2Body.b2_staticBody, fixDef);
}
function LoadSceneTwo(world, context, canvas, fixDef)
{
	
}
function LoadSceneThree(world, context, canvas, fixDef)
{
	//添加碰撞物体
		////////////////////////////////////////////////////添加该物体总是不变，只运行一次。
		{
			addObjectToWorld(world, 1, 480/30-1,'Return' ,b2Body.b2_staticBody, fixDef); //添加按钮
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
}
function DeleteSceneOne(world)
{
//	deleteOjectFromWorld(world, ""); 
}
function DeleteScenetTwo(world)
{
	
}
function DeleteSceneThree(world)
{
	
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