GetOtherStation(username, VsName)//////////////////////////////////////////////////////////////////////绘制场景中的东西
//添加一个变量用来检测是否由用户存在
/////////////////////////////////////////////////////////
var threeAccountOfBall =1;///共需要运输的球的个数
var threeNumberOfBall_PlayerA = 0;//目前进了几个球playOne;
var threeColorFrame = 0;//表示颜色变化的帧是多少
var threeCanChange = false;///现在是否可以颜色渐变b
var threeAddOneAffect = 0;//表示现在这个加1特效还能持续多久。
var threeScoreOfPlayOne = 0, threeScoreOfPlayTwo = 0;//表示playOne和playTwo的分数
var threeTime = 0;//用来记录时间
var threeAllTime =  60 * 180;//记录总共需要的时间
var threeSceneThreeMusic = true;
var threePlayOneName = "";
var threePlayTwoName = "";
var threeMusicPlay = true;
var threeSceneThreeSingleVar = 0, threeSceneThreeDoubleVar = 0;//表示选择的是单人模式还是双人模式
//////////////////////////////////////////
function DrawFiveSceneEveryObject(world, context, canvas)
{
	
	var bgMusic = getObjectFromWorld(world, "sceneFiveBgMusic");
	var returnVar = getObjectFromWorld(world, "sceneFiveReturn");
	
	DrawBackground(world, context, canvas, "SceneFive/continue.png");
	
	
	
	DrawCloud(world, context, canvas);///画云
	
	DrawTrack(world, context, canvas);//画轨道
	
	DrawGround(world, context, canvas);//画地面的树木
	
	
	
}

//////////////////////////////////////////////////////////////////鼠标消息处理
var clickDown = -1 , clickMove = -1, clickUp = -1;
var  singleVar = null, doubleVar = null, musicVar = null, returnVar = null;
function ScenceFiveGetObjectFormMouse(ev, world, context, canvas, fixDef)
{
	if(quitVar == null || continueVar == null)
	{
		musicVar = getObjectFromWorld(world,"sceneFiveBgMusic");
		returnVar = getObjectFromWorld(world,"sceneFiveReturn");	
		singleVar = getObjectFromWorld(world,"sceneFiveSingle");	
		doubleVar = getObjectFromWorld(world,"sceneFiveDouble");	
	}
	if(	ev.offsetX > singleVar.GetPosition().x*30 && ev.offsetX < singleVar.GetPosition().x*30 + 3*30 &&//singlelogin
	ev.offsetY > singleVar.GetPosition().y*30 && ev.offsetY < singleVar.GetPosition().y*30  + 1*30)
	{
		return 1;
	}
	if(	ev.offsetX > doubleVar.GetPosition().x*30 && ev.offsetX < doubleVar.GetPosition().x*30 + 3*30 &&//doublelogin
	ev.offsetY > doubleVar.GetPosition().y*30 && ev.offsetY < doubleVar.GetPosition().y*30  + 30*1)
	{
		return 2;
	}
	if(	ev.offsetX > musicVar.GetPosition().x*30-15 && ev.offsetX < musicVar.GetPosition().x*30 + 15 &&//close
	ev.offsetY > musicVar.GetPosition().y*30-15 && ev.offsetY < musicVar.GetPosition().y*30   + 15)
	{
		return 3;
	}
	if(	ev.offsetX > returnVar.GetPosition().x*30-15 && ev.offsetX < returnVar.GetPosition().x*30  + 15 &&//bgMusic
	ev.offsetY > returnVar.GetPosition().y*30-15 && ev.offsetY < returnVar.GetPosition().y*30  + 15)
	{
		return 4;
	}
	return -1;
}
function  SceneFiveClickDown(ev, world, context, canvas, fixDef)
{
	clickDown = ScenceFiveGetObjectFormMouse(ev, world, context, canvas, fixDef);
}
function SceneFiveClickUp(ev, world, context, canvas, fixDef)
{
	clickUp = ScenceFiveGetObjectFormMouse(ev, world, context, canvas, fixDef);
	if(clickDown == clickUp && clickDown != -1)
	{
	//	alert(clickUp);
		switch(clickUp)
		{
			case 1://double
		//		alert("1");
				
				ChangeScene(2, world, context, canvas, fixDef);	
				
				
			break;
			case 2://single
				RecoverTime();
				ChangeScene(3, world, context, canvas, fixDef);	
			//	ChangeScene(3, world, context, canvas, fixDef);	
				
			break;
			case 3:
				
			break;
			case 4://return 
				
			break;
			default:
			break;
		}
			
	}
}
function SceneFiveMove(ev, world, context, canvas, fixDef)
{
}
