<?php
include "../connection.php";


$id=$_POST["rid"];

$qry="select * from recepient where rid='$id'";

$result=$conn->query($qry);
if($result->num_rows==1)
{   $row = $result->fetch_assoc();
    echo json_encode(array("success"=>true,"name"=>$row['rname'],"email"=>$row['remail'],"addr"=>$row['raddr'],"pno"=>$row['rphnos'],"aadhar"=>$row['raadhar']));

}
else
{
    echo json_encode(array("success"=>false));
}