<?php
include "../connection.php";

$nm=$_POST["rname"];
$pn=$_POST["rphnos"];
$adr=$_POST["raddr"];
$aad=$_POST["raadhar"];
$pass=md5($_POST["rpassword"]);
$mail=$_POST["remail"];

$qry="insert into recepient(rname,rphnos,raddr,raadhar,remail,rpassword) values ('$nm','$pn','$adr','$aad','$mail','$pass');";

$result=$conn->query($qry);
if($result)
{
    echo json_encode(array("success"=>true));

}
else
{
    echo json_encode(array("success"=>false));
}