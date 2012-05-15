
var conn = null;
function ConnectDatabase()
{
	var db_bbs;
	var fileHead = location.href;
	fileHead = fileHead.substring(8, fileHead.length);
	fileHead = fileHead.substring(0, fileHead.lastIndexOf('/'));
	
  	db_bbs=fileHead + "/tannertan/database.mdb"//定义数据库
  	 conn = new ActiveXObject("ADODB.Connection");  
	conn.Open("Provider=Microsoft.Jet.OLEDB.4.0;Data Source="+db_bbs+"");  
  	  
  	
}
function LoginClient(id, password)
{
	var i = 0;
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
	

//	conn.close();   
 // 	conn = null;  
}