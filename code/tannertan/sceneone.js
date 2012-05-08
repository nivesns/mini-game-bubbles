var logVar, register, closeVar, bgMusic, setUp;
var mouseClickDown = 0 , mouseMove = 0, mouseClickUp = 0;
function DrawOneSceneEveryObject(world, context, canvas)
{
	DrawBackground(world, context, canvas, "SceneOne/bg.jpg");
	logVar = getObjectFromWorld(world, "sceneOneLogin");
	register = getObjectFromWorld(world, "sceneOneRegister");
	closeVar = getObjectFromWorld(world, "sceneOneClose");
	bgMusic = getObjectFromWorld(world, "sceneOneBgMusic");
	setUp = getObjectFromWorld(world, "sceneOneSetup");
		
	DrawLayInSecene(context ,"number/0.png", logVar.GetPosition().x*30 ,logVar.GetPosition().y*30,60, 30);
	DrawLayInSecene(context ,"number/1.png", register.GetPosition().x*30, register.GetPosition().y*30,60, 30);
	DrawLayInSecene(context ,"number/2.png", closeVar.GetPosition().x*30 - 30/2, closeVar.GetPosition().y*30-30/2,30, 30);
	DrawLayInSecene(context ,"number/3.png", bgMusic.GetPosition().x*30-30/2, bgMusic.GetPosition().y*30-30/2,30, 30);
	DrawLayInSecene(context ,"number/4.png", setUp.GetPosition().x*30-30/2, setUp.GetPosition().y*30-30/2,30, 30);
}
function GetPutDownObject(ev)
{
	if(	ev.offsetX > logVar.GetPosition().x*30 && ev.offsetX < logVar.GetPosition().x*30 + 60 &&//login
	ev.offsetY > logVar.GetPosition().y*30 && ev.offsetY < logVar.GetPosition().y*30  + 30)
	{
		return 1;
	}
	if(	ev.offsetX > register.GetPosition().x*30 && ev.offsetX < register.GetPosition().x*30 + 60 &&//register
	ev.offsetY > register.GetPosition().y*30 && ev.offsetY < register.GetPosition().y*30  + 30)
	{
		return 2;
	}
	if(	ev.offsetX > closeVar.GetPosition().x*30-15 && ev.offsetX < closeVar.GetPosition().x*30 + 15 &&//close
	ev.offsetY > closeVar.GetPosition().y*30-15 && ev.offsetY < closeVar.GetPosition().y*30   + 15)
	{
		return 3;
	}
	if(	ev.offsetX > bgMusic.GetPosition().x*30-15 && ev.offsetX < bgMusic.GetPosition().x*30  + 15 &&//bgMusic
	ev.offsetY > bgMusic.GetPosition().y*30-15 && ev.offsetY < bgMusic.GetPosition().y*30  + 15)
	{
		return 4;
	}
	if(	ev.offsetX > setUp.GetPosition().x*30-15 && ev.offsetX < setUp.GetPosition().x*30  + 15 &&//setup
	ev.offsetY > setUp.GetPosition().y*30-15 && ev.offsetY < setUp.GetPosition().y*30   + 15)
	{
		return 5;
	}
	
	return 0;
	
}
function SceneOneClickDown(ev, world, context, canvas, fixDef)
{
//	ChangeScene(3, world, context, canvas, fixDef);
	mouseClickDown = GetPutDownObject(ev);
	
//	ev.offsetX< (bodyballReturnPosition.x+0.5)*30
}
function SceneOneClickUp(ev, world, context, canvas, fixDef)
{
	mouseClickUp = GetPutDownObject(ev);
	if(mouseClickUp == mouseClickDown && mouseClickDown != 0)
	{
		switch(mouseClickDown)
		{
			case 1:
			ChangeScene(3, world, context, canvas, fixDef);
			break;
			case 2:
			window.open('baidu.htm');
			break;
			case 3:
			alert("close");
			break;
			case 4:
			alert("music");
			break;
			case 5:
			alert("setup");
			break;
			default:
			break;
		}
	}
	
}
function SceneOneMove(ev, world, context, canvas, fixDef)
{
	mouseMove = GetPutDownObject(ev);
	if(mouseMove != mouseClickDown)
	{
		mouseClickDown = 0;
	}
}