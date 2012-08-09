GetOtherStation(username, VsName)//////////////////////////////////////////////////////////////////////绘制场景中的东西
//添加一个变量用来检测是否由用户存在
/////////////////////////////////////////////////////////

function DrawTwoSceneEveryObject(world, context, canvas)
{
	
	var bgMusic = getObjectFromWorld(world, "sceneTwoBgMusic");
	var returnVar = getObjectFromWorld(world, "sceneTwoReturn");
	
	DrawBackground(world, context, canvas, "SceneTwo/choose.jpg");
	
	if(!GetGlobalMusicState())
	{
		DrawLayInSecene(context ,"SceneOne/music off.png", bgMusic.GetPosition().x*30-30/2, bgMusic.GetPosition().y*30-30/2,31, 40);
	}
	
	DrawLayInSecene(context ,"images/return.png", returnVar.GetPosition().x*30-30/2 , returnVar.GetPosition().y*30-30/2,30, 30);
	
}

//////////////////////////////////////////////////////////////////鼠标消息处理
var clickDown = -1 , clickMove = -1, clickUp = -1;
var  singleVar = null, doubleVar = null, musicVar = null, returnVar = null;
function ScenceTwoGetObjectFormMouse(ev, world, context, canvas, fixDef)
{
	if(quitVar == null || continueVar == null)
	{
		musicVar = getObjectFromWorld(world,"sceneTwoBgMusic");
		returnVar = getObjectFromWorld(world,"sceneTwoReturn");	
		singleVar = getObjectFromWorld(world,"sceneTwoSingle");	
		doubleVar = getObjectFromWorld(world,"sceneTwoDouble");	
	}
	if(	ev.offsetX > singleVar.GetPosition().x*30 && ev.offsetX < singleVar.GetPosition().x*30 + 6*30 &&//singlelogin
	ev.offsetY > singleVar.GetPosition().y*30 && ev.offsetY < singleVar.GetPosition().y*30  + 5.4*30)
	{
		return 1;
	}
	if(	ev.offsetX > doubleVar.GetPosition().x*30 && ev.offsetX < doubleVar.GetPosition().x*30 + 6*30 &&//doublelogin
	ev.offsetY > doubleVar.GetPosition().y*30 && ev.offsetY < doubleVar.GetPosition().y*30  + 30*5.4)
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
function  SceneTwoClickDown(ev, world, context, canvas, fixDef)
{
	clickDown = ScenceTwoGetObjectFormMouse(ev, world, context, canvas, fixDef);
}
function SceneTwoClickUp(ev, world, context, canvas, fixDef)
{
	clickUp = ScenceTwoGetObjectFormMouse(ev, world, context, canvas, fixDef);
	if(clickDown == clickUp && clickDown != -1)
	{
	//	alert(clickUp);
		switch(clickUp)
		{
			case 1://double
				SceneThreeDouble();
				//等待第二个用户登录
				var currentUserName = GetUserName();
			//	SendRequestForTwoModel(GetUserName());
				var flag = 2;
				var getdata = "" ;
				var name , score;
				while(getdata == "")
				{
					getdata = SendRequestForTwoModel(currentUserName);
					getdata =  eval("(" + getdata + ")");
					name = getdata.name;
					score = getdata.score;
					getdata = getdata.name;
					
					
					if(flag == 1&& getdata == "" )
					 	alert("please wait on matching");
					flag --;
				}
				
				
				SetUserTwoNameAndScore(name, score);
				
				
				ChangeScene(3, world, context, canvas, fixDef);	
				
			break;
			case 2://single
				ChangeScene(3, world, context, canvas, fixDef);	
				SceneThreeSingle();
			break;
			case 3:
				SetGlobalMusicState(!GetGlobalMusicState());////声音
				if(GetGlobalMusicState())
				{
					PlayBgMusicSceneOne();
				}
				else
				{
					PauseBgMusicSceneOne();
				}
			break;
			case 4://return 
				ChangeScene(1, world, context, canvas, fixDef);	
				SceneOneInitApha();	
			break;
			default:
			break;
		}
			
	}
}
function SceneTwoMove(ev, world, context, canvas, fixDef)
{
}
