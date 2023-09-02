<?php
include "../connection.php";


$id=$_POST["did"];

$qry="select * from donor where did='$id'";

$result=$conn->query($qry);
if($result->num_rows==1)
{   $row = $result->fetch_assoc();
    echo json_encode(array("success"=>true,"name"=>$row['dname'],"email"=>$row['demail'],"addr"=>$row['daddr'],"pno"=>$row['dphnos'],"aadhar"=>$row['daadhar']));

}
else
{
    echo json_encode(array("success"=>false));
}