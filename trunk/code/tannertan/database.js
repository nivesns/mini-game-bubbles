var globalPassword;
var conn = null;
function ConnectDatabase()
{
/*	var db_bbs;
	var fileHead = location.href;
	fileHead = fileHead.substring(8, fileHead.length);
	fileHead = fileHead.substring(0, fileHead.lastIndexOf('/'));
	
  	db_bbs=fileHead + "/tannertan/database.mdb"//定义数据库
  	 conn = new ActiveXObject("ADODB.Connection");  
	conn.Open("Provider=Microsoft.Jet.OLEDB.4.0;Data Source="+db_bbs+"");  
  	 */ 
  	
}
function LoginClient(id, password)
{
/*	var i = 0;
	var sql="select score from [table] where "; //数据库中有authors表，name字段
	sql += "name = " +"\'" +id +"\' and password = \'";
	sql += password + "\'";
	var rs = new ActiveXObject("ADODB.Recordset");
	rs.open(sql,conn);
	while(!rs.EOF)
	{
		i++;
		rs.movenext();
	}
  	if(i > 0)
	{
		return true;
	}
	return false;
	*/
	globalPassword = password;
	var xmlhttp;
	if (window.XMLHttpRequest)
 	{// code for IE7+, Firefox, Chrome, Opera, Safari
 		 xmlhttp=new XMLHttpRequest();
	}
	else
 	 {// code for IE6, IE5
 		 xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  	}
  	url="http://mini.zat.cc/LoginClient.php?name="+id+"&psw="+password+"&ver="+Math.random();//nor newh
	xmlhttp.open("GET",url,false);
	xmlhttp.send();
	return xmlhttp.responseText;
//	conn.close();   
 // 	conn = null;  
}

function SendRequestForTwoModel(userId)
{
	var xmlhttp;
	if (window.XMLHttpRequest)
 	{// code for IE7+, Firefox, Chrome, Opera, Safari
 		 xmlhttp=new XMLHttpRequest();
	}
	else
 	 {// code for IE6, IE5
 		 xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  	}
  	url="http://mini.zat.cc/SendRequestForTwoModel.php?name="+userId+"&ver="+Math.random();//nor newh
	xmlhttp.open("GET",url,false);
	xmlhttp.send();
	return xmlhttp.responseText;
}//返回   {name:"but",score:"0"}  失败  -1
function GetOtherStation(userId, vsId)
{
	var xmlhttp;
	if (window.XMLHttpRequest)
 	{// code for IE7+, Firefox, Chrome, Opera, Safari
 		 xmlhttp=new XMLHttpRequest();
	}
	else
 	 {// code for IE6, IE5
 		 xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  	}
  	url="http://mini.zat.cc/GetOtherStation.php?name="+userId+"&vs="+vsId+"&ver="+Math.random();//nor newh
	xmlhttp.open("GET",url,false);
	xmlhttp.send();
	return xmlhttp.responseText;
}//成功 >0 不成功<=0
function RecordScore(userId, score)
{
	var xmlhttp;
	if (window.XMLHttpRequest)
 	{// code for IE7+, Firefox, Chrome, Opera, Safari
 		 xmlhttp=new XMLHttpRequest();
	}
	else
 	 {// code for IE6, IE5
 		 xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  	}
  	url="http://mini.zat.cc/RecordScore.php?name="+userId+"&score="+score+"&ver="+Math.random();//nor newh
	xmlhttp.open("GET",url,false);
	xmlhttp.send();
	return xmlhttp.responseText;
}//不用管