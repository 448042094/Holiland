<?php
	header("Access-Control-Allow-Origin:*");
	header("Access-Control-Allow-Methods:*");
	$phone = $_POST["phone"];
	$password = $_POST["password"];
	
	$conn = mysqli_connect("localhost", "root", "", "holiland");
	
	$sql = "INSERT INTO holiland (phone,password) VALUES ('$phone','$password')";
	
	$result = mysqli_query($conn, $sql);
	
	if ($result){
		$arr = array("res_code"=>1, "res_message"=>"success");
		echo json_encode($arr);
	}
	else{
		$arr = array("res_code"=>-1, "res_message"=>"failed：" . mysqli_error($conn));
		echo json_encode($arr);
	}

	// 关闭数据库连接
	mysqli_close($conn);
?>