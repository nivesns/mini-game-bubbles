
function DrawOneSceneEveryObject(world, context, canvas)
{
//	DrawBackground(world, context, canvas, "SceneOne/bg.jpg");
	var logVar = getObjectFromWorld(world, "sceneOneLogin");
	var register = getObjectFromWorld(world, "sceneOneRegister");
	var closeVar = getObjectFromWorld(world, "sceneOneClose");
	var bgMusic = getObjectFromWorld(world, "sceneOneBgMusic");
	var setUp = getObjectFromWorld(world, "sceneOneSetup");
		
	DrawLayInSecene(context ,"number/0.png", logVar.GetPosition().x*30 ,logVar.GetPosition().y*30,60, 30);
	DrawLayInSecene(context ,"number/1.png", register.GetPosition().x*30, register.GetPosition().y*30,60, 30);
	DrawLayInSecene(context ,"number/2.png", closeVar.GetPosition().x*30 - 30/2, closeVar.GetPosition().y*30-30/2,30, 30);
	DrawLayInSecene(context ,"number/3.png", bgMusic.GetPosition().x*30-30/2, bgMusic.GetPosition().y*30-30/2,30, 30);
	DrawLayInSecene(context ,"number/4.png", setUp.GetPosition().x*30-30/2, setUp.GetPosition().y*30-30/2,30, 30);
}
function SceneOneClickDown(ev, world, context, canvas, fixDef)
{
	
}
function SceneOneClickUp(ev, world, context, canvas, fixDef)
{
}
function SceneOneMove(ev, world, context, canvas, fixDef)
{
}