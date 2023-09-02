<?php
include "../connection.php";

print_r($_POST);

$nm=$_POST["donor_id"];
$did=$_POST["did"];
$item=$_POST["item"];
$time=$_POST["time"];
$qnty=$_POST["qnty"];


$qry1="insert into donation(donor_id,item,time,qnty) values ($nm,'$item',$time,$qnty)";
$qry2="update donor set donor_active=1 where did=$did";


$result1=$conn->query($qry1);
$result2=$conn->query($qry2);

if($result1)
{   if($result2){
    echo json_encode(array("success"=>true));}

}
else
{
    echo json_encode(array("success"=>false));
}