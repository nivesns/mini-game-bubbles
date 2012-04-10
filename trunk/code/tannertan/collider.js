function addListen(word)
{
	var listener = new Box2D.Dynamics.b2ContactListener();
	world.SetContactListener(listener);
	listener. BeginContact = function(contact)
	{
		alert(contact.GetFixtureA().GetBody().GetUserData());//可以得到被监听对象的名字
		alert(contact.GetFixtureB().GetBody().GetUserData());
	}
	listener.EndContact = function(contact)
	{
		;
	}
	listener.PreSolve = function (contact, oldManifold)
	{}
   	listener.PostSolve = function (contact, impulse)//获得冲量
	{
		
	}
}
