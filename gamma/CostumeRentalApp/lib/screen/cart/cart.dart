import 'package:corental/screen/cart/components/cartbody.dart';
import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class Cart extends StatefulWidget {
  Cart({Key? key}) : super(key: key);
  //List docIDs2;
  @override
  State<Cart> createState() => _CartState();

  //List docIDs2 = [];
}

class _CartState extends State<Cart> {
  List docIDs2 = [];
  double subtotal= 0;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: CartBody(list4:docIDs2,subtotal:subtotal,total:total,discount:discount),);
  }
  //List docIDs2 = [];
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    getDocId2();
  }

  double discount=100.0;
  double total=0.0;
  Future getDocId2() async {
    var snap = await FirebaseFirestore.instance.collection('cart').get();
    //List<Map<String, dynamic>> documentData = snapshot.data?.docs.map((e) => e.data() as Map<String, dynamic>?).toList();
    docIDs2 = snap.docs.map((e) => e.data() as Map<String, dynamic>).toList();
    docIDs2.forEach((element) {
      //print("test"+element);
      subtotal = subtotal +
          (int.parse(element['Price']) * int.parse(element['Quantity']));
      print("test ${subtotal.toString()}");
    });
    if(subtotal==0||subtotal<1000){
       discount=0.0;}
     total=subtotal-discount;




    setState(() {

    });
  }

}