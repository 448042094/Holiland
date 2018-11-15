<?php
	header("Access-Control-Allow-Origin:*");
	header("Access-Control-Allow-Methods:*");
	$phone = $_POST["phone"];
	$password = $_POST["password"];
	
	$conn = mysqli_connect("localhost", "root", "", "holiland");
	// SQL
	$sql = "SELECT * FROM holiland WHERE phone='$phone' AND password='$password'";

	// 执行SQL
	$result = mysqli_query($conn, $sql);

	// 判断
	if (mysqli_num_rows($result) === 1) {
		// 获取查询结果集中的记录
		$row = mysqli_fetch_assoc($result);
		$arr = array("res_code"=>1, "res_message"=>"success", "res_body"=>$row);
		echo json_encode($arr);
	} else { // 用户名或密码错误
		$arr = array("res_code"=>-1, "res_message"=>"error");
		echo json_encode($arr);
	}

	// 关闭
	mysqli_close($conn);

?>