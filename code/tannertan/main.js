var currentScene = 1;

function StartFuction(canvas , context)
{
	BgMusicSceneOne('musicSrc/bgSceneOne.mp3');/////播放场景1的背景音乐
	BgMusicSceneThree('musicSrc/bgSceneThree.mp3');
	GetOneMusicSceneThree('musicSrc/gotit.mp3');
	
	PlayBgMusicSceneOne();
	
	var a1 = new Array();
	a1.push(trackArray[0]);
	for (var i = 1; i < trackArray.length; i++){
		if ((trackArray[i][0] - a1[a1.length-1][0] > 1) && (Math.abs(trackArray[i][1] - a1[a1.length-1][1]) > 1))
			a1.push(trackArray[i]);
			
	}
	
	
//	txt.value = a1.join(",");
	
	
	  function push1() {
         popy.ApplyForce(new b2Vec2(5,5), popy.GetWorldCenter());
	  }
	  function hit() {
         popy.ApplyImpulse(new b2Vec2(1,0), popy.GetWorldCenter())
	  }
	  function speed() {
		 alert(popy.GetLinearVelocity().x + ", " + popy.GetLinearVelocity().y);
         popy.SetLinearVelocity(new b2Vec2(-9,1))
	  }
	  function teleport() {
         popy.SetPositionAndAngle(new b2Vec2(5,6),1);
	  }
	  
	function swtkeyboard(e){
         var evtobj=window.event? event : e //distinguish between IE's explicit event object (window.event) and Firefox's implicit.
		 alert(evtobj);
         var unicode=evtobj.charCode? evtobj.charCode : evtobj.keyCode
         var actualkey=String.fromCharCode(unicode)
         
	}
	  
	  
	  function genVec2Array(){
		var vec2Array = new Array();
		for (var i = 0; i < 98; i++){
			var x = 0.1 * i;
			var y = -0.05 * i;
			vec2Array.push(new b2Vec2(x,y));
		}
		return vec2Array;
	  }

		 
		 
		
         //创世
        var world = new b2World(new b2Vec2(0, 10), true);
         //造盒
         var bodyDef = new b2BodyDef;
         bodyDef.type = b2Body.b2_dynamicBody;
		 bodyDef.userData = 'RollBall';
         bodyDef.position.Set(1.1, 1.2);
         var fixDef = new b2FixtureDef;
         fixDef.density = 1.0;
         fixDef.friction = 0.5;
         fixDef.restitution = 0.2;

     //    fixDef.shape = new b2PolygonShape;
    //     fixDef.shape.SetAsBox(1, 1);
		 fixDef.shape = new b2CircleShape(0.5);
		 //fixDef.shape.SetLocalPosition( new b2Vec2(0 ,0)); 
		 
		 addListen(world);//tannertan 添加监视
		 
		// fixDef.shape = new b2PolygonShape;
		// fixDef.shape.SetAsBox(0.5,0.5);
	/*	fixDef.shape.SetAsArray([
       new b2Vec2(0 , -2),
       new b2Vec2(0.1, -1.8),
       new b2Vec2(0.1, 2),
       new b2Vec2(0, 2),
       ]);*/
	   //造Holder
         var holderDef = new b2BodyDef;
         holderDef.type = b2Body.b2_staticBody;
         holderDef.position.Set(0, 0);
         var holder = world.CreateBody(holderDef);
        
	   /////////////////////////////////////////////////////////////////////////////////////赛道
	  for (var i = 0; i < a1.length-1; i++){	  
		   var fixDef1 = new b2FixtureDef;
       	   fixDef1.density = 10.0;
           fixDef1.friction = 0.1;
           fixDef1.restitution =0;
		   fixDef1.shape = new b2PolygonShape;
		  
		   fixDef1.shape.SetAsArray([new b2Vec2(a1[i][0]/30,a1[i][1]/30),new b2Vec2(a1[i+1][0]/30,a1[i+1][1]/30),
		   new b2Vec2(a1[i+1][0]/30, 16),new b2Vec2(a1[i][0]/30, 16)]);
		   
			 holder.CreateFixture(fixDef1);
        // holder.CreateFixture(fixDef3);		
		}
		 //fixDef2.shape.SetAsBox(15, 2);
		// alert(fixDef2.shape.m_hasVertex0);
        // edger.CreateFixture(fixDef2);
		
         //设DebugDraw
         var debugDraw = new b2DebugDraw();
	     debugDraw.SetSprite( document.getElementById ("canvas").getContext("2d") );
	     debugDraw.SetDrawScale(30.0);
	     debugDraw.SetFillAlpha(0.5);
	     debugDraw.SetLineThickness(1.0);
	     debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
		/* b2DebugDraw.prototype.DrawSolidPolygon = function (vertices, vertexCount, color) {		 
      		if (!vertexCount) return;
			var s = this.m_ctx;
   		 };*/
         world.SetDebugDraw(debugDraw);

         window.setInterval(update, 10);
		 ///////////////////////////////////////////////////////////////////////////删除场景中的一个没有名字的动态物体
		 {
			var allBodyList = world.GetBodyList();
			
			while(allBodyList)
			{
				if( allBodyList.GetType() == b2Body.b2_dynamicBody )
				{
					if(allBodyList.GetUserData() == null || allBodyList.GetUserData() == 'RollBall')
					{
						var fixList = allBodyList.GetFixtureList();
						while(fixList)
						{
							allBodyList.DestroyFixture(fixList);
							fixList = fixList.GetNext();
						}
						world.DestroyBody(allBodyList);
					}
				}
				allBodyList = allBodyList.GetNext();
			}
		 }
		
		///添加场景二总物体
		if(currentScene == 3)
		{
			LoadSceneThree(world, context, canvas, fixDef);
		}
		if(currentScene == 2)
		{
			LoadSceneTwo(world, context, canvas, fixDef);//
		}
		if(currentScene == 1)
		{
			//
			LoadSceneOne(world, context, canvas, fixDef);
		}
		if(currentScene == 0)
		{
			LoadSceneZero(world, context, canvas, fixDef);
		}
		
		
		////////////////////////////////////////////////////添加四周的围墙，以致求不会掉出该场景
		{
			
			var wallFixtureDef = new b2FixtureDef();
			wallFixtureDef.density = 10.0;
            wallFixtureDef.friction = 0.1;
            wallFixtureDef.restitution =0;
		    wallFixtureDef.shape = new b2PolygonShape;
			wallFixtureDef.shape.SetAsArray([new b2Vec2(0,0), new b2Vec2(0.01,0), new b2Vec2(0.01,480/30), new b2Vec2(0,480/30)]);//leftWall
			addObjectToWorld(world,0,0,'LeftWall',b2Body.b2_staticBody, wallFixtureDef);
			
			wallFixtureDef.shape.SetAsArray([new b2Vec2(0,0), new b2Vec2(800/30,0), new b2Vec2(800/30,0.01), new b2Vec2(0,0.01)]);//middleWall
			addObjectToWorld(world,0,0,'MiddleWall',b2Body.b2_staticBody, wallFixtureDef);
			
			wallFixtureDef.shape.SetAsArray([new b2Vec2(800/30-0.01,0), new b2Vec2(800/30,0), new b2Vec2(800/30,480/30), new b2Vec2(800/30-0.01,480/30)]);//rightWall
			addObjectToWorld(world,0,0,'MiddleWall',b2Body.b2_staticBody, wallFixtureDef);
		}
		///////////////////////////////////////////////////////////////键盘消息
		document.onkeypress = function(ev)
		{
			if(currentScene == 1)
			{
				var uInt = ev.keyCode;
			
				var charValue= String.fromCharCode(uInt);
			
				GetInputString(world, context, canvas, charValue);
				
			}


		}
		document.onkeydown = function(ev)
		{
			if(currentScene == 1)
			{
				if(ev.keyCode == 8)
				{
					DeletInputString(world, context, canvas);
				}
			}
		}
		////////////////////////////////////////////////////////////////键盘消息结束
		  /////////////////////////////////////////////////////////////鼠标消息
	
		canvas.onmousedown = function(ev)
		{	
			if(currentScene == 3)
			{
				MouseClickDownRollBall(ev, world, context, canvas, fixDef);	
			
				MouseClickDownReturn(ev, world, context, canvas, fixDef);	
				
				MouseClickDownReturnMusic(ev, world, context, canvas, fixDef);	
			}
			if(currentScene == 2)
			{
				SceneTwoClickDown(ev, world, context, canvas, fixDef);//
			}
			if(currentScene == 1)
			{
				SceneOneClickDown(ev, world, context, canvas, fixDef);
			}
			if(currentScene == 0)
			{
				SceneZeroClickDown(ev, world, context, canvas, fixDef)
			}
			
		}
        canvas.onmouseup = function(ev)
		{	
			if(currentScene == 3 )
			{
				MouseClickUpRollBall(ev, world, context, canvas, fixDef);
			
				MouseClickUpReturn(ev, world, context, canvas, fixDef);	
				
				MouseClickUpReturnMusic(ev, world, context, canvas, fixDef);	
			}
			if(currentScene == 2)
			{
				SceneTwoClickUp(ev, world, context, canvas, fixDef);//
			}
			if(currentScene == 1)
			{
				//
				SceneOneClickUp(ev, world, context, canvas, fixDef)
			}
			if(currentScene == 0)
			{
				SceneZeroClickUp(ev, world, context, canvas, fixDef)
			}
		}
		canvas.onmousemove = function(ev)
		{
			if(currentScene == 3)
			{
				MouseMoveRollBall(ev, world, context, canvas, fixDef);
			
				MouseMoveReturn(ev, world, context, canvas, fixDef);
				
				MouseMoveReturnMusic(ev, world, context, canvas, fixDef);
			}
			if(currentScene == 2)
			{
				SceneTwoMove(ev, world, context, canvas, fixDef)//
			}
			if(currentScene == 1)
			{
				//
				SceneOneMove(ev, world, context, canvas, fixDef);
			}
			if(currentScene == 0)
			{
				SceneZeroMove(ev, world, context, canvas, fixDef);
			}
		}
		
         ///////////////////////////////////////////////每一帧都要操作的函数update
         function update() {
            world.Step(1 /24, 10, 10);
            world.DrawDebugData();			
            world.ClearForces();
		//	document.onkeypress=swtkeyboard;//键盘消息
			RedrawWorld();
         };
		 
		 function RedrawWorld()
		{
			
			canvasWidth = parseInt(canvas.width);
    		canvasHeight = parseInt(canvas.height);
	//		context.clearRect(0, 0, canvasWidth, canvasHeight);//刷掉所有的物体显示
			
			if(currentScene == 3)
			{
				DrowWorldEveryObject(world, context, canvas);
				DeleteActionStaticObject(world, fixDef);	
			}
			if(currentScene == 2)
			{
				//
				DrawTwoSceneEveryObject(world, context, canvas);
			}
			if(currentScene == 1)
			{
				//
				DrawOneSceneEveryObject(world, context, canvas);
				
			}
			if(currentScene == 0)
			{
				DrawZeroSceneEveryObject(world, context, canvas);
			}
			
		}
}
function ChangeScene(change, world, context, canvas, fixDef)
{
	currentScene = change;
	if(currentScene == 1)
	{
		LoadSceneOne(world, context, canvas, fixDef);
	}
	if(currentScene == 2)
	{
		LoadSceneTwo(world, context, canvas, fixDef);
	}
	if(currentScene == 3)
	{
		LoadSceneThree(world, context, canvas, fixDef);
	}
	if(currentScene == 0)
	{
		LoadSceneZero(world, context, canvas, fixDef);
	}
	
}