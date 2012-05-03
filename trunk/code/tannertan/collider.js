var vec_X = 0;
var vec_Y = 0;
var flag_accelerate = 0;
var flag_slowDown = 0;
function addListen(world)//在世界中添加监听 
{
	var i = 1;
	var listener = new Box2D.Dynamics.b2ContactListener();
	world.SetContactListener(listener);
	var Vec2 ;
	listener. BeginContact = function(contact)
	{
//		alert(contact.GetFixtureA().GetBody().GetUserData());//可以得到被监听对象的名字
	//	alert(contact.GetFixtureB().GetBody().GetUserData());
	//	alert(contact.GetFixtureA().GetBody().GetPosition().x);
	//	alert(contact.GetFixtureB().GetBody().GetPosition().x);
	//	alert(contact.GetFixtureB().GetBody().
		
	
	}
	listener.EndContact = function(contact)
	{
		;
	}
	listener.PreSolve = function (contact, oldManifold)
	{
		var objectA = contact.GetFixtureA().GetBody();
		var objectB = contact.GetFixtureB().GetBody();
		if(ColliderJudge(objectA) && objectB.GetUserData() == 'accelerate')//加速度的情况
		{
			if(flag_accelerate == 0)
			{
				vec_X = objectA.GetLinearVelocity().x;
				vec_Y = objectA.GetLinearVelocity().y;	
			//	alert("qian " + vec_X + " " + vec_Y);		
				flag_accelerate = flag_accelerate + 1;
			}		
		}
		if(ColliderJudge(objectA) && objectB.GetUserData() == 'slowDown')//减速的情况
		{
			if(flag_slowDown == 0)
			{
				vec_X = objectA.GetLinearVelocity().x;
				vec_Y = objectA.GetLinearVelocity().y;				
				flag_slowDown = flag_slowDown + 1;
			}		
		}
		
		
	}
   	listener.PostSolve = function (contact, impulse)
	{
		var middle_Flags = world.e_locked;
		var middle_locked = world.e_locked;
		var objectA = contact.GetFixtureA().GetBody();
		var objectB = contact.GetFixtureB().GetBody();
		if(ColliderJudge(objectA)&& objectB.GetUserData() == 'accelerate')//该情况是加速的情况
		{
			
			world.m_flags = 0;
			world.e_locked = 0;
			deleteOjectFromWorld(world,'accelerate');
		//	alert("hou " + vec_X + " " + vec_Y);		
			objectA.SetLinearVelocity(new b2Vec2(vec_X *3, vec_Y *3));
			flag_accelerate = 0;
		}
		if(ColliderJudge(objectA)&& objectB.GetUserData() == 'slowDown')//该情况是减速的情况
		{
			
			world.m_flags = 0;
			world.e_locked = 0;
			deleteOjectFromWorld(world,'slowDown');
			objectA.SetLinearVelocity(new b2Vec2(vec_X/3, vec_Y/3 ));
			flag_slowDown = 0;
		}
	//	world.e_locked = middle_Locked;
	//	world.m_flags = middle_Flag;
	}
}

////////////////////////////////////////////////////////////////////////进入判断条件的函数
function ColliderJudge(object)
{
	if(object.GetUserData() =='RollBall' ||
	object.GetUserData() =='RollBall_1' ||
	object.GetUserData() =='RollBall_2' ||
	object.GetUserData() =='RollBall_3' ||
	object.GetUserData() =='RollBall_4' ||
	object.GetUserData() =='RollBall_5' )
	return true;
}
function ResetTheNumber(accelerateReset, slowDownReset)
{
	flag_accelerate = accelerateReset;
	flag_slowDown = slowDownReset;
}
