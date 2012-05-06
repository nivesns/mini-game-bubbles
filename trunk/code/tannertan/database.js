function ConnectDatabase()
{
	var db_bbs
	var fileHead = location.href;
	fileHead = fileHead.substring(8, fileHead.length);
	fileHead = fileHead.substring(0, fileHead.lastIndexOf('/'));
	
  	db_bbs=fileHead + "/tannertan/database.mdb"//定义数据库
  	var conn = new ActiveXObject("ADODB.Connection");  
	conn.Open("Provider=Microsoft.Jet.OLEDB.4.0;Data Source="+db_bbs+"");  
  	var rs = new ActiveXObject("ADODB.Recordset");  
  	var sql="select name from [table]"; //数据库中有authors表，name字段
	
	rs.open(sql,conn);
	while(!rs.EOF)
	{
		alert(rs(0))//取出第一个来z
		rs.movenext();
	}
  	
	

	conn.close();   
  	conn = null;  
}