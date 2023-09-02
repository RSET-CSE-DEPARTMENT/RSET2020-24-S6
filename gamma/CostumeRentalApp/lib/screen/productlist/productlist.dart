import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:corental/screen/productlist/components/productlistbody.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

class ProductList extends StatefulWidget {
   ProductList({Key? key,required this.Category}) : super(key: key);
   String Category;

  @override
  State<ProductList> createState() => _ProductListState();
}

class _ProductListState extends State<ProductList> {

  List list1 = [];
  //List docIDs1= [];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: ProductListBody(list:list1,Category:widget.Category),
    );
  }
  List docIDs=[];
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    getDocId();
  }
  Future getDocId() async{
    var snap = await FirebaseFirestore.instance.collection('products').get();
    //List<Map<String, dynamic>> documentData = snapshot.data?.docs.map((e) => e.data() as Map<String, dynamic>?).toList();
    docIDs = snap.docs.map((e) => e.data() as Map<String,dynamic>).toList();
    print(widget.Category);
    if (widget.Category != "All") {
      docIDs.forEach((element) {
        if(element["Category"] == widget.Category){
          list1.add(element);
        }
      });
    }else{
      list1 = docIDs;
    }
    setState(() {

    });
    print(list1);
    print(docIDs[0]["Category"]);

  }

}

