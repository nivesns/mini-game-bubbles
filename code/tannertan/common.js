function PlayMusic(src)
{
	var bgmusic = new Audio(src);
	bgmusic.play();
}
function  addObjectToWorld(world, position_x ,position_y, userdata, type,  fixDef)
{
	var defBody = new b2BodyDef;//∂®“Â b2BodyDef;
	defBody.userData = userdata;
	
	defBody.type = type;
	defBody.position.Set(position_x,position_y);
	
	var commonBody = world.CreateBody(defBody);// b2Body;
	
	var fix = commonBody.CreateFixture(fixDef);//b2Fxiture
	
	
	
		
}
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
function DrawLayInSecene(constext ,src, position_x, position_y,width, height)
{
	var image;
	image = new Image();
	image.src = src;
	context.drawImage(image, position_x, position_y, width, height);
}