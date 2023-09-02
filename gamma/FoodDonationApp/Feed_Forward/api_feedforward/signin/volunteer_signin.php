<?php
include "../connection.php";


$email=$_POST["vemail"];
$pass=$_POST["vpassword"];


$qry="select user_id from volunteer where vemail='$email'";
$qry2="select user_id from volunteer where vpassword='$pass'";

$result=$conn->query($qry);
$result2=$conn->query($qry2);
if($result==$result2)
{   
    echo json_encode(array("success"=>true));

}
else
{
    echo json_encode(array("success"=>false));
}