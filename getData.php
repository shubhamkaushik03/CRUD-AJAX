<?php 
include 'conn.php';
$conn = OpenCon();

$sql = "SELECT * FROM crud";
$result = $conn->query($sql);

if($result->num_rows >0){
  $data = array();
  while($row = $result->fetch_assoc()){
      $data[] = $row;
  }
}

echo json_encode($data);


?>