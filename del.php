<?php 
include 'conn.php';
$conn = OpenCon();

$data = stripslashes(file_get_contents('php://input'));
$mydata = json_decode($data, true);

$id = $mydata['sid'];

if(!empty($id)){
$sql = "DELETE FROM crud WHERE id = {$id}";

  
    if($conn->query($sql) == true){

        echo "Entry added ";   
     }
     else{
        echo "Entry not added ";
     }
}
else{
    echo "not delted";
}

?>