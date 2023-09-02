import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:corental/screen/firstpage/firstpage.dart';
import 'package:corental/screen/productpage/productpage.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class ProductListBody extends StatefulWidget {
   ProductListBody({Key? key,required this.list,required this.Category}) : super(key: key);
   List list;
   String Category;


  @override
  State<ProductListBody> createState() => _ProductListBodyState();
}

class _ProductListBodyState extends State<ProductListBody> {
  List list2=[];

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: SafeArea(
        child: Container(
          margin: EdgeInsets.only(left: 10,right: 10,top: 30),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              InkWell(
                onTap: (){
                  Navigator.push(context, MaterialPageRoute(builder: (context) => HomePage(),));
                },
                child: Container(
                  height: 45,width: 45,
                  decoration: BoxDecoration(borderRadius: BorderRadius.circular(50),color: Color.fromRGBO(180,140,140,1)),
                  child: Icon(Icons.arrow_back),
                ),
              ),
              SizedBox(height: 20,),
              Container(padding: EdgeInsets.only(left: 15),
                  child: Text("${widget.Category}",style: TextStyle(fontWeight: FontWeight.w500,fontSize: 25,))),
              Container(
              //height: 750,
              //color: Colors.red,
                child: GridView.count(
                  crossAxisCount: 2,
                  shrinkWrap: true,
                  childAspectRatio: 1 / 1.3,
                  primary: false,
                  padding: EdgeInsets.zero,
                  children:
                  List.generate(
                      widget.list.length,
                          (index) => InkWell(onDoubleTap: ()

                          {
                            Navigator.push(context, MaterialPageRoute(builder: (context) => Product(list3:widget.list[index])));},
                            child: Container(
                            height: 230,
                            width: 90,
                            //padding: EdgeInsets.only(left: 10, top: 10),
                            margin: EdgeInsets.only(top: 15,left: 10,right: 10),
                            decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(10),
                            //color: Color.fromRGBO(215, 234, 221, 1)
                            ),
                            child: Column(crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                            Container(
                            height: 170,
                            width: 170,
                            decoration: BoxDecoration(
                            image: DecorationImage(image:NetworkImage("${widget.list[index]['ProductImageUrl']}")
                            ,fit: BoxFit.cover )),
                            ),
                            SizedBox(height: 10,),
                            Container(//padding: EdgeInsets.only(right: 55,),
                              //color: Colors.red,
                              child: Column(crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text("${widget.list[index]["ProductName"]}",
                                    style: TextStyle(fontSize: 15),textAlign: TextAlign.left,),
                                  Text("Rs."+"${widget.list[index]["Price"]}",style: TextStyle(fontWeight: FontWeight.w600,fontSize: 14,),textAlign: TextAlign.left,),
                                ],
                              ),
                            ),
                        ]),
                      ),
                          )),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
