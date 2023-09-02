import 'package:corental/screen/confirmation/confirmation.dart';
import 'package:corental/screen/firstpage/firstpage.dart';
import 'package:corental/screen/payment/payment.dart';
import 'package:corental/screen/productpage/productpage.dart';
import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class CartBody extends StatefulWidget {
   CartBody({Key? key,required this.list4,required this.subtotal,required this.total,required this.discount}) : super(key: key);
  List list4;
double subtotal;
double total;
double discount;
  @override
  State<CartBody> createState() => _CartBodyState();
}

class _CartBodyState extends State<CartBody> {
  int counter = 0;
  //double total = 0.0;
  double tax = 10.0;


  @override
  Widget build(BuildContext context) {
    print("cart");
    return SafeArea(
      child: Column(
        children: [
          Expanded(
            child: Container(
              margin: EdgeInsets.only(top: 10),
              padding: EdgeInsets.only(left: 25, right: 25),
              child: SingleChildScrollView(
                child: Column(
                  children: [

                    /// App bar
                    Container(
                      child: Row(
                        children: [
                          Ink(
                            decoration: BoxDecoration(
                                color: Colors.white,
                                border: Border.all(width: 0.5),
                                shape: BoxShape.circle),
                            child: IconButton(
                              iconSize: 10,
                              onPressed: () {
                                Navigator.push(context, MaterialPageRoute(
                                    builder: (context) => HomePage()));
                              },
                              icon: Icon(
                                Icons.arrow_back,
                                color: Colors.black,
                                size: 25,
                              ),
                            ),
                          ),
                          SizedBox(
                            width: 90,
                          ),
                          Text(
                            "My Cart",
                            style: TextStyle(
                              fontWeight: FontWeight.bold,
                              fontSize: 24,
                            ),
                            textAlign: TextAlign.center,
                          ),
                        ],
                      ),
                    ),
                    SizedBox(height: 20),
                    Container(
                      //color: Colors.green,
                      // height: 500,
                      child: ListView.builder(
                          shrinkWrap: true,
                          primary: false,
                          itemCount: widget.list4.length,
                          //cartItemsList.length,
                          itemBuilder: (context, index) {
                            return Container(
                              //color: Colors.yellow,
                              margin: EdgeInsets.only(bottom: 10,),
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.start,
                                children: [
                                  Container(
                                    height: 110,
                                    width: 130,
                                    decoration: BoxDecoration(
                                      color: Colors.red,
                                      borderRadius: BorderRadius.circular(15),
                                      image: DecorationImage(
                                          image: NetworkImage(
                                              "${widget
                                                  .list4[index]['ProductImageUrl']}"),
                                          //"${cartItemsList[index]["image"]}"),
                                          fit: BoxFit.cover),
                                    ),
                                  ),
                                  SizedBox(width: 20),
                                  Column(
                                    crossAxisAlignment: CrossAxisAlignment
                                        .start,
                                    //mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                    children: [
                                      Text(
                                        "${widget.list4[index]['ProductName']}",
                                        //"${cartItemsList[index]["name"]}",
                                        style: TextStyle(
                                            fontSize: 17,
                                            fontWeight: FontWeight.bold,
                                            color: Colors.black),
                                      ),
                                      SizedBox(
                                        height: 10,
                                      ),
                                      Text("Rs." +
                                          "${widget.list4[index]["Price"]}",
                                        //"\$" + (cartItemsList[index]["price"]).toString(),
                                        style: TextStyle(
                                            fontSize: 14, color: Colors.black),
                                      ),
                                      SizedBox(height: 5),
                                      Row(
                                        children: [Text("Qty: "),

                                          Text('${widget
                                              .list4[index]['Quantity']}',
                                            //(cartItemsList[index]["qty"]).toString(),
                                            style: TextStyle(fontSize: 14),),
                                          //Text("${counter.toString()}"),
                                          /*SizedBox(
                                                width: 20,
                                              ),*/
                                          SizedBox(
                                            width: 40,
                                          ),
                                          /*IconButton(
                                              iconSize: 18,
                                              onPressed: () {
                                                //setState(() {
                                                //cartItemsList.removeAt(index);
                                                //getTotal();
                                                //itotal();
                                                //counter = 0;
                                                //});
                                              },
                                              icon: Icon(Icons.close_rounded))*/
                                        ],
                                      )
                                    ],
                                  ),
                                ],
                              ),
                            );
                          }),
                    ),
                    SizedBox(height: 30),
                  ],
                ),
              ),
            ),
          ),
          Container(padding: EdgeInsets.only(left: 25, right: 25),
            child: Column(
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      "Sub total",
                      style: TextStyle(
                          fontSize: 17, fontWeight: FontWeight.w500),
                    ),
                    //SizedBox(width: 217,),

                    Text("Rs."+"${widget.subtotal}",
                      style: TextStyle(fontSize: 17),
                    )
                  ],
                ),
                SizedBox(
                  height: 15,
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      "Discount",
                      style: TextStyle(
                          fontSize: 17, fontWeight: FontWeight.w500),
                    ),
                    //SizedBox(width: 185,),
                    Text(
                      "-Rs."+"${widget.discount}",
                      style: TextStyle(fontSize: 17),
                    )
                  ],
                ),
                SizedBox(
                  height: 15,
                ),

                Container(
                  decoration: BoxDecoration(color: Colors.black12),
                  height: 2,
                ),
                SizedBox(
                  height: 13,
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      "Total",
                      style: TextStyle(
                          fontSize: 20, fontWeight: FontWeight.bold),
                    ),
                    //SizedBox(width: 232,),
                    Text("Rs."+"${widget.total}",
                      //"\$"+total.toStringAsFixed(2),
                      style: TextStyle(
                          fontSize: 20, fontWeight: FontWeight.bold),
                    )
                  ],
                ),
                /*SizedBox(height: 30,),
                            SizedBox(height: 45, width: 335,
                              child: ElevatedButton(
                                  style: ElevatedButton.styleFrom(primary: Colors.black87,shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20))),
                                  onPressed: (){//Navigator.push(context, MaterialPageRoute(builder: (context) => AddCart()));
                                  }, child: Text("Checkout",style: TextStyle(fontSize: 17),)),
                            )*/
              ],
            ),
          ),

          /// Button
          Container(
            width: 350,
            // height: 45,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(20),
            ),
            margin: EdgeInsets.only(left: 25, right: 25, top: 10),
            child: ElevatedButton(
                style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.black87,
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(20))),
                onPressed: () {


                  Navigator.push(context,
                      MaterialPageRoute(builder: (context) => Payment(total:widget.subtotal),));
                },
                child: Text(
                  "Checkout",
                  style: TextStyle(fontSize: 17),
                )),
          )
        ],
      ),
    );
  }

}

