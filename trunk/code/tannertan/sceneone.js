var logVar = null, register = null, closeVar = null, bgMusic = null, setUp = null, id = null, password = null;
var mouseClickDown = 0 , mouseMove = 0, mouseClickUp = 0;
var whichTable = 0 ;//	1表示的是id, 2表示的是密码;
var whichTableBefore = 0;//记录上次whichTable的值;
var inputStringId = "", inputStringPassword = "", cursorStringModelId = "", cursorStringModelPassword = "";//记录现在的字符串
var cursorSpeed = 20;//设置光标多久闪一下;
var countI = 0;//统计帧数;
var musicBool = true;


////////////////////////////////////////场景1中的音乐播放
var bgsceneonemusic;
function BgMusicSceneOne(src)
{
	bgsceneonemusic = new Audio(src);
}
function PlayBgMusicSceneOne()
{
	bgsceneonemusic.play();	
}
function PauseBgMusicSceneOne()
{
	bgsceneonemusic.pause();
}
/////////////////////////////////
function DrawOneSceneEveryObject(world, context, canvas)
{
	DrawBackground(world, context, canvas, "SceneOne/start.jpg");
	
	logVar = getObjectFromWorld(world, "sceneOneLogin");
	register = getObjectFromWorld(world, "sceneOneRegister");
	closeVar = getObjectFromWorld(world, "sceneOneClose");
	bgMusic = getObjectFromWorld(world, "sceneOneBgMusic");
	setUp = getObjectFromWorld(world, "sceneOneSetup");
	id = getObjectFromWorld(world,"sceneOneId");	
	password = getObjectFromWorld(world,"sceneOnePassword");	
	
/*	DrawLayInSecene(context ,"images/water.png", logVar.GetPosition().x*30 ,logVar.GetPosition().y*30,90, 30);
	DrawLayInSecene(context ,"images/water.png", register.GetPosition().x*30, register.GetPosition().y*30,90, 30);
	DrawLayInSecene(context ,"images/water.png", closeVar.GetPosition().x*30 - 30/2, closeVar.GetPosition().y*30-30/2,30, 30);
//	DrawLayInSecene(context ,"SceneOne/music.png", bgMusic.GetPosition().x*30-30/2, bgMusic.GetPosition().y*30-30/2,30, 40);
	DrawLayInSecene(context ,"images/water.png", setUp.GetPosition().x*30-30/2, setUp.GetPosition().y*30-30/2,30, 30);
	DrawLayInSecene(context ,"images/water.png", id.GetPosition().x*30, id.GetPosition().y*30,170, 30);
	DrawLayInSecene(context ,"images/water.png", password.GetPosition().x*30, password.GetPosition().y*30,170, 30);*/
	if(!GetGlobalMusicState())
	{
		DrawLayInSecene(context ,"SceneOne/music off.png", bgMusic.GetPosition().x*30-30/2, bgMusic.GetPosition().y*30-30/2,31, 40);
	}
	
	
	//绘制字符
	context.font ="15pt Script MT";
	context.fillStyle = "#000000";
	
	if(whichTable == 1 )
	{
		if(countI >= cursorSpeed)
		{
			cursorStringModelId = inputStringId + "|";
			DealInputCharactorLength(context, cursorStringModelId, id, 17);
		}
		else
		{
			cursorStringModelId = inputStringId;
			DealInputCharactorLength(context, cursorStringModelId, id, 16);
		}
		DealInputCharactorLength(context,  ChangeAlphaToStar(inputStringPassword), password, 16);
	}
	if(whichTable == 2 )
	{
		var passwordStr = ChangeAlphaToStar(inputStringPassword);
		if(countI >= cursorSpeed)
		{
			DealInputCharactorLength(context, passwordStr + "|", password, 17);
		}
		else
		{
			cursorStringModelPassword = inputStringPassword;
			DealInputCharactorLength(context, passwordStr, password, 16);
		}
		DealInputCharactorLength(context, inputStringId, id, 16);
		
	}
	if(whichTable != 1 && whichTable != 2)
	{
		var passwordStr = ChangeAlphaToStar(inputStringPassword);
		context.fillText(inputStringId, id.GetPosition().x*30, id.GetPosition().y*30 + 20);
		context.fillText(passwordStr, password.GetPosition().x*30, password.GetPosition().y*30 + 20);
	}
	
	
	
	if(countI > cursorSpeed *2)
	{
		countI = 0;
	}
	countI++;
}
function GetPutDownObject(ev)
{
	if(logVar == null  || register == null || closeVar == null || bgMusic == null || setUp == null || id == null || password == null)
		return 0;
	if(	ev.offsetX > logVar.GetPosition().x*30 && ev.offsetX < logVar.GetPosition().x*30 + 90 &&//login
	ev.offsetY > logVar.GetPosition().y*30 && ev.offsetY < logVar.GetPosition().y*30  + 30)
	{
		return 1;
	}
	if(	ev.offsetX > register.GetPosition().x*30 && ev.offsetX < register.GetPosition().x*30 + 90 &&//register
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
	if(	ev.offsetX > id.GetPosition().x*30 && ev.offsetX < id.GetPosition().x*30 + 170 &&//id
	ev.offsetY > id.GetPosition().y*30 && ev.offsetY < id.GetPosition().y*30  + 30)
	{
		return 6;
	}
	if(	ev.offsetX > password.GetPosition().x*30 && ev.offsetX < password.GetPosition().x*30 + 170 &&//login
	ev.offsetY > password.GetPosition().y*30 && ev.offsetY < password.GetPosition().y*30  + 30)
	{
		return 7;
	}
	return 0;
	
}
function SceneOneClickDown(ev, world, context, canvas, fixDef)
{
//	ChangeScene(3, world, context, canvas, fixDef)
	
	mouseClickDown = GetPutDownObject(ev);
	
//	ev.offsetX< (bodyballReturnPosition.x+0.5)*30
}
function SceneOneClickUp(ev, world, context, canvas, fixDef)
{
	mouseClickUp = GetPutDownObject(ev);
	if(mouseClickUp == mouseClickDown )
	{
		whichTable = 0;
		switch(mouseClickDown)
		{
			case 0:
		//	alert("click another");
			break;
			case 1:
			musicBool = true;
			if(LoginClient(inputStringId, inputStringPassword))
			{
				ChangeScene(2, world, context, canvas, fixDef);
				
				GetNameOfPlay(inputStringId);
				
				PauseSceneOneMusic();
				
			}
			else
			{
				alert("账号或密码错误!");
			//	inputStringId = "";
			//	inputStringPassword = "";
				SceneOneInitApha();
			}
			break;
			case 2:
			window.open('register.html');
			SceneOneInitApha();
			break;
			case 3:
				ChangeScene(0, world, context, canvas, fixDef);
			break;
			case 4:
			{
				
				SetGlobalMusicState(!GetGlobalMusicState());
				if(GetGlobalMusicState())
				{
					PlayBgMusicSceneOne();
				}
				else
				{
					PauseBgMusicSceneOne();
				}
			}
			break;
			case 5:
			alert("setup");
			break;
			case 6:
			{
				whichTable = 1;
			}
			break;
			case 7:
			{
				whichTable = 2;
			}
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

//////////处理场景1中的键盘消息
function GetInputString(world, context, canvas, charValue)
{
	
	if((whichTable == whichTableBefore && whichTable == 1) || (inputStringId == "" && whichTable == 1))
	{
		inputStringId = inputStringId + charValue;
		
		DrawOneSceneEveryObject(world, context, canvas);
		whichTableBefore = whichTable;
		return ;
		
	}
	if((whichTable == whichTableBefore && whichTable == 2) ||(inputStringPassword == "" && whichTable == 2))
	{
		inputStringPassword = inputStringPassword + charValue;
		DrawOneSceneEveryObject(world, context, canvas);
		whichTableBefore = whichTable;
		return;
	}
	whichTableBefore = whichTable;
}

////////////////////////////////////处理场景1中的键盘中的删除消息
function DeletInputString(world, context, canvas)
{
	var middle = "";
	if(whichTable == 1 && inputStringId.length >= 1)
	{
		middle = inputStringId.substring(0, inputStringId.length -1);
		inputStringId = middle;
	}
	if(whichTable == 2 && inputStringPassword.length >= 1)
	{
		middle = inputStringPassword.substring(0, inputStringPassword.length -1);
		inputStringPassword = middle;
	}
}

////////////////////////////////////////////////////////处理输入时的字符串过多的问题
function DealInputCharactorLength(context, str, object, length)
{
	var strMiddle = "";
	if(str.length > length)
	{
		strMiddle = str.substring(str.length -length, str.length);
	}
	else
	{
		strMiddle = str;
	}
	context.fillText(strMiddle, object.GetPosition().x*30, object.GetPosition().y*30 + 20);
}
//////////////////////////////////////////////////////////////处理密码时转化为*
function ChangeAlphaToStar(str)
{
	var length = str.length;
	var i = 0;
	var middleStr = "";
	while(i < length)
	{
		middleStr += "*";
		i++;
	}
	return middleStr;
}
////////////////////////////////////////////////////////////将所有的字符串都设置为NULL
function SceneOneInitApha()
{
	inputStringPassword = "";
	cursorStringModelPassword = "";//记录现在的字符串
}