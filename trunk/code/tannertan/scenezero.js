 ///////////////////////////////////////////////////////////绘制场景0中的所有图标
function DrawZeroSceneEveryObject(world, context, canvas)
{
	DrawBackground(world, context, canvas, "SceneOne/start.jpg");
	DrawBackground(world, context, canvas, "SceneZero/quit.png");
}
///获得鼠标点击消息
var clickDown = -1 , clickMove = -1, clickUp = -1;
var  quitVar = null,  continueVar = null;
function ScenceZeroGetObjectFormMouse(ev, world, context, canvas, fixDef)
{
	if(quitVar == null || continueVar == null)
	{
		quitVar = getObjectFromWorld(world,"sceneZeroQuit");
		continueVar = getObjectFromWorld(world,"sceneZeroContinue");	
	}
	if(	ev.offsetX > quitVar.GetPosition().x*30 && ev.offsetX < quitVar.GetPosition().x*30 + 90 &&//login
	ev.offsetY > quitVar.GetPosition().y*30 && ev.offsetY < quitVar.GetPosition().y*30  + 30)
	{
		return 1;
	}
	if(	ev.offsetX > continueVar.GetPosition().x*30 && ev.offsetX < continueVar.GetPosition().x*30 + 90 &&//login
	ev.offsetY > continueVar.GetPosition().y*30 && ev.offsetY < continueVar.GetPosition().y*30  + 30)
	{
		return 2;
	}
	return -1;
}
function  SceneZeroClickDown(ev, world, context, canvas, fixDef)
{
	clickDown = ScenceZeroGetObjectFormMouse(ev, world, context, canvas, fixDef);
}
function SceneZeroClickUp(ev, world, context, canvas, fixDef)
{
	clickUp = ScenceZeroGetObjectFormMouse(ev, world, context, canvas, fixDef);
	if(clickDown == clickUp && clickDown != -1)
	{
		if(clickDown == 1)
		{
			window.close();//确认退出
		}
		if(clickDown == 2)
		{
			ChangeScene(1, world, context, canvas, fixDef);
			SceneOneInitApha();
		}
		
	}
}
function SceneZeroMove(ev, world, context, canvas, fixDef)
{
}
