function StartFuction(canvas , context)
{
	PlayMusic('musicSrc/bg.mp3');
	
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
         var unicode=evtobj.charCode? evtobj.charCode : evtobj.keyCode
         var actualkey=String.fromCharCode(unicode)
         if (actualkey=="f")
             push1();
         if (actualkey=="i")
             hit();
         if (actualkey=="v")
             speed();
         if (actualkey=="t")
             teleport();
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
	   var fixDef3 = new b2FixtureDef;
       fixDef3.density = 10.0;
        fixDef3.friction = 0.1;
        fixDef3.restitution =0;
		fixDef3.shape = new b2PolygonShape;
		var aa = genVec2Array();
		aa.push(new b2Vec2(9.7, 2));
		aa.push(new b2Vec2(0, 2));
		fixDef3.shape.SetAsArray([new b2Vec2(0, 14),new b2Vec2(0.2, 13.8),new b2Vec2(0.2, 16),new b2Vec2(0, 16)]);
		
		
		var fixDef4 = new b2FixtureDef;
       	fixDef4.density = 10.0;
        fixDef4.friction = 0.1;
        fixDef4.restitution =0;
		fixDef4.shape = new b2PolygonShape;
		fixDef4.shape.SetAsArray([new b2Vec2(5, -2.5),new b2Vec2(25, -9),new b2Vec2(25, 2),new b2Vec2(0, 2)]);
		


         var popy = world.CreateBody(bodyDef);
		 popy.SetBullet(false);
         popy.CreateFixture(fixDef);

         
         var v0 = new b2Vec2(2, 4);
		 var v1 = new b2Vec2(4, 2);
		 var v2 = new b2Vec2(6, 4);
		 var v3 = new b2Vec2(7, 8);
		 var edge = new b2EdgeShape(v1,v2);
		//edge.Set(v1, v2);
		 edge.m_hasVertex0 = true;
		 edge.m_hasVertex3 = true;
         edge.m_vertex0 = v0;
		 edge.m_vertex3 = v3;
		var edgeDef = new b2BodyDef;
         edgeDef.type = b2Body.b2_dynamicBody;
         edgeDef.position.Set(3, 6);
         var edger = world.CreateBody(edgeDef);
		 var fixDef2 = new b2FixtureDef;
         fixDef2.density = 10.0;
         fixDef2.friction = 0.5;
         fixDef2.restitution =1;

		// fixDef2.shape = edge;
		 fixDef2.shape = new b2PolygonShape;
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
				if( allBodyList.GetType() == b2Body.b2_dynamicBody)
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
		
		//添加碰撞物体
		////////////////////////////////////////////////////添加该物体总是不变，只运行一次。
		{
			addObjectToWorld(world, 1, 480/30-1,'Return' ,b2Body.b2_staticBody, fixDef); //添加按钮
		}  
		
		/////////////////////////////////////////////////////添加物体每次进行测试都要重新绘制的图形
		{
			
			addMultipleObject(world, fixDef);
					
		}
		///////////////////////////////////////////////////////添加五个球 报废，现在只能添加一个球，郁闷
		{
		//	ClickReturnRecover(world, fixDef);	
		    AddInitBall(world, fixDef);
		
		}
		/////////////////////////////////////////////////////////////鼠标消息
	
		canvas.onmousedown = function(ev)
		{	
			MouseClickDownRollBall(ev, world, context, canvas, fixDef);	
			
			MouseClickDownReturn(ev, world, context, canvas, fixDef);	
			
		}
        canvas.onmouseup = function(ev)
		{	
			MouseClickUpRollBall(ev, world, context, canvas, fixDef);
			
			MouseClickUpReturn(ev, world, context, canvas, fixDef);	
		}
		canvas.onmousemove = function(ev)
		{
			MouseMoveRollBall(ev, world, context, canvas, fixDef);
			
			MouseMoveReturn(ev, world, context, canvas, fixDef);
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
		  
         ///////////////////////////////////////////////每一帧都要操作的函数update
         function update() {
            world.Step(1 /24, 10, 10);
            world.DrawDebugData();			
            world.ClearForces();
			document.onkeypress=swtkeyboard;
			RedrawWorld();
         };
		 
		 function RedrawWorld()
		{
			
			canvasWidth = parseInt(canvas.width);
    		canvasHeight = parseInt(canvas.height);
			context.clearRect(0, 0, canvasWidth, canvasHeight);
			
			DrowWorldEveryObject(world, context, canvas);
			
			
			DeleteActionStaticObject(world, fixDef);	
			
		}
}