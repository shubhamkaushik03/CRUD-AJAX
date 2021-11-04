<?php
include 'conn.php';
$conn = OpenCon();


$data = stripslashes(file_get_contents('php://input'));
$mydata = json_decode($data, true);

$id = $mydata['id'];
$name = $mydata['name'];
$email = $mydata['email'];
$pass = $mydata['pass'];

if(!empty($name) && !empty($email) && !empty($pass)){
    
    $sql = "INSERT INTO crud(id, name, email, pass) VALUES
   ('$id', '$name', '$email', '$pass') ON DUPLICATE KEY UPDATE name = '$name', email = '$email', pass = '$pass'";
 
   if($conn->query($sql) == true){
      echo "Entry added ";   
   }
   else{
      echo "Entry not added ";
   }
}
else{
    echo "all filed are required";
}


?>