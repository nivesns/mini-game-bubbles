//////////////////////////////////////////////////////////////////////绘制场景中的东西
//添加一个变量用来检测是否由用户存在
var winOrlost = 1;//0表示输了，1表示赢了
/////////////////////////////////////////////////////////
//设置赢还是输

///////

function DrawFourSceneEveryObject(world, context, canvas)
{
	
	var bgMusic = getObjectFromWorld(world, "sceneFourBgMusic");
	var returnVar = getObjectFromWorld(world, "sceneFourReturn");
	
	DrawBackground(world, context, canvas, "images/background.png");
	
	DrawCloud(world, context, canvas);///画云
	
	DrawTrack(world, context, canvas);//画轨道
	
	DrawGround(world, context, canvas);//画地面的树木
	
	if(winOrlost == 1)
	DrawBackground(world, context, canvas, "SceneFour/win.png");
	else
	DrawBackground(world, context, canvas, "SceneFour/lose.png");
	context.font ="20pt Script MT";
	context.fillStyle = "#0000ff";
	if(winOrlost ==1)
	{
		context.fillText( "win! "+globalPlayOneName,220,260);
	}
	else
	{
		context.fillText("so sorry!"+ globalPlayOneName,220,260);
	}
	context.fillText("hello",0,0);
	if(!GetGlobalMusicState())
	{
//		DrawLayInSecene(context ,"SceneOne/music off.png", bgMusic.GetPosition().x*30-30/2, bgMusic.GetPosition().y*30-30/2,31, 40);
	}
	
//	DrawLayInSecene(context ,"images/return.png", returnVar.GetPosition().x*30-30/2 , returnVar.GetPosition().y*30-30/2,30, 30);
	
}

//////////////////////////////////////////////////////////////////鼠标消息处理
var clickDown = -1 , clickMove = -1, clickUp = -1;
var  singleVar = null, doubleVar = null, musicVar = null, returnVar = null;
function ScenceFourGetObjectFormMouse(ev, world, context, canvas, fixDef)
{
	if(quitVar == null || continueVar == null)
	{
		musicVar = getObjectFromWorld(world,"sceneFourBgMusic");
		returnVar = getObjectFromWorld(world,"sceneFourReturn");	
		singleVar = getObjectFromWorld(world,"sceneFourSingle");	
		doubleVar = getObjectFromWorld(world,"sceneFourDouble");	
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
function  SceneFourClickDown(ev, world, context, canvas, fixDef)
{
	clickDown = ScenceFourGetObjectFormMouse(ev, world, context, canvas, fixDef);
}
function SceneFourClickUp(ev, world, context, canvas, fixDef)
{
	clickUp = ScenceFourGetObjectFormMouse(ev, world, context, canvas, fixDef);
	if(clickDown == clickUp && clickDown != -1)
	{
	//	alert(clickUp);
		switch(clickUp)
		{
			case 1://double
				if(SceneThreeDoubleVar == 1)
				{
					var GetData =LoginClient(inputStringId, globalPassword);
				
				var record = eval("(" + GetData + ")");
				
				
				GetNameOfPlay(record.name, record.score );
				ChangeScene(2, world, context, canvas, fixDef);	
				}
				else
				{
				
				ChangeScene(3, world, context, canvas, fixDef);	
				
				var GetData =LoginClient(inputStringId, globalPassword);
				
				var record = eval("(" + GetData + ")");
				
				
				GetNameOfPlay(record.name, record.score );
				}
			//	ChangeScene(3, world, context, canvas, fixDef);	
				
			break;
			case 2://single
				
				var GetData =LoginClient(inputStringId, globalPassword);
				
				var record = eval("(" + GetData + ")");
				
				
				GetNameOfPlay(record.name, record.score );
				ChangeScene(2, world, context, canvas, fixDef);	
				
			break;
			case 3:
			//	SetGlobalMusicState(!GetGlobalMusicState());////声音
			//	if(GetGlobalMusicState())
				{
			//		PlayBgMusicSceneOne();
				}
			//	else
				{
			//		PauseBgMusicSceneOne();
				}
			break;
			case 4://return 
			//	ChangeScene(1, world, context, canvas, fixDef);	
			//	SceneOneInitApha();	
			break;
			default:
			break;
		}
			
	}
}
function SceneFourMove(ev, world, context, canvas, fixDef)
{
}
