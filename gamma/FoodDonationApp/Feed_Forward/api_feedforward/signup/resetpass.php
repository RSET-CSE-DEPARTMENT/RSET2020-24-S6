<?php
include "../connection.php";

$demail=$_POST["demail"];
$remail=$_POST["remail"];
$vemail=$_POST["vemail"];
$dpass=md5($_POST["dpassword"]);
$rpass=md5($_POST["rpassword"]);
$vpass=md5($_POST["vpassword"]);

$qry1="UPDATE donor SET dpassword = '$dpass' WHERE demail='$demail'";
$qry2="UPDATE recepient SET rpassword = '$rpass' WHERE remail='$remail'";
$qry3="UPDATE volunteer SET vpassword = '$vpass' WHERE vemail='$vemail'";


$result1=$conn->query($qry1);
$result2=$conn->query($qry2);
$result3=$conn->query($qry3);

if($result1||$result2||$result3)
{
    echo json_encode(array("success"=>true));

}
else
{
    echo json_encode(array("success"=>false));
}