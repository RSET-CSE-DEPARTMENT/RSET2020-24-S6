<?php
include "../connection.php";

$nm=$_POST["vname"];
$pn=$_POST["vphnos"];
$adr=$_POST["vaddr"];
$licnos=$_POST["lic"];
$vehnos=$_POST["veh"];
$mail=$_POST["vemail"];
$pass=md5($_POST["vpassword"]);


$qry="insert into volunteer(vname,vphnos,vaddr,vemail,lic,veh,vpassword) values ('$nm','$pn','$adr','$mail','$licnos','$vehnos','$pass')";

$result=$conn->query($qry);
if($result)
{
    echo json_encode(array("success"=>true));

}
else
{
    echo json_encode(array("success"=>false));
}