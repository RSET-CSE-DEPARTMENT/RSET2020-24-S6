<?php
include "../connection.php";

$nm=$_POST["dname"];
$pn=$_POST["dphnos"];
$adr=$_POST["daddr"];
$aad=$_POST["daadhar"];
$pass=md5($_POST["dpassword"]);
$mail=$_POST["demail"];

$qry="insert into donor(dname,dphnos,daddr,daadhar,demail,dpassword) values ('$nm','$pn','$adr','$aad','$mail','$pass')";

$result=$conn->query($qry);
if($result)
{
    echo json_encode(array("success"=>true));

}
else
{
    echo json_encode(array("success"=>false));
}