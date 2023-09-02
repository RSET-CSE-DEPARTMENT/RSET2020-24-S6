//import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:corental/screen/productpage/components/productpagebody.dart';
import 'package:flutter/material.dart';
class  Product extends StatefulWidget {
  Product({Key? key,required this.list3}) : super(key: key);
  Map<String,dynamic> list3;

  @override
  State<Product> createState() => _ProductState();
}

class _ProductState extends State<Product> {

  @override
  Widget build(BuildContext context) {
    print(widget.list3);
   // List list3;
    return Scaffold(
      body: ProductBody(docIDs:widget.list3)
    );
  }

  //List docIDs=[];
  //@override
  //void initState() {
    // TODO: implement initState
   //super.initState();
   //getDocId();
  }

 // Future getDocId() async {
   //var snap = await FirebaseFirestore.instance.collection('products').get();
    //docIDs = snap.docs.toList();
  //}

