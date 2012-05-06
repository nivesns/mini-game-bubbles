function LoadSceneOne(world, context, canvas, fixDef)
{
	
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