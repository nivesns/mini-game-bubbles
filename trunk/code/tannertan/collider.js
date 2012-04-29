var vec_X = 0;
var vec_Y = 0;
var flag = 0;
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
		if(contact.GetFixtureA().GetBody().GetUserData() == 'RollBall' && contact.GetFixtureB().GetBody().GetUserData() == 'sun'||
		contact.GetFixtureA().GetBody().GetUserData() == 'RollBall' && contact.GetFixtureB().GetBody().GetUserData() == 'prick')
		{
			
			if(flag == 0)
			{
				vec_X = objectA.GetLinearVelocity().x;
				vec_Y = objectA.GetLinearVelocity().y;
				flag = flag + 1;
			}
			
		}
		
		
	}
   	listener.PostSolve = function (contact, impulse)
	{
		var middle_Flags = world.e_locked;
		var middle_locked = world.e_locked;
		var objectA = contact.GetFixtureA().GetBody();
		var objectB = contact.GetFixtureB().GetBody();
		if(objectA.GetUserData() == 'RollBall' && objectB.GetUserData() == 'sun')//该情况是加速的情况
		{
			
			world.m_flags = 0;
			world.e_locked = 0;
			deleteOjectFromWorld(world,'sun');
			objectA.SetLinearVelocity(new b2Vec2(vec_X *2, vec_Y *2));
			flag = 0;
		}
		
	//	world.e_locked = middle_Locked;
	//	world.m_flags = middle_Flag;
	}
}
