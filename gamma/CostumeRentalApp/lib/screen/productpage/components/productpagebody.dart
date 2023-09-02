import 'package:corental/screen/cart/cart.dart';
import 'package:corental/screen/firstpage/components/firstpagebody.dart';
import 'package:corental/screen/firstpage/firstpage.dart';
import 'package:corental/screen/location/location.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
class ProductBody extends StatefulWidget {
  ProductBody({Key? key,required this.docIDs}) : super(key: key);
  //Productbody({Key? key,required this.data}) : super(key: key);
  //Map<String,dynamic> data;
 Map<String,dynamic> docIDs;

  @override
  State<ProductBody> createState() => _ProductBodyState();
}

class _ProductBodyState extends State<ProductBody> {
  bool check=false;
  int s=0;
  int inc(){
    s++;
    return s;
  }

  int dec(){
    s--;
    if(s==-1)
      {
        s=0;
      }
    return s;
  }
  //String pname= '${docIDs['ProductName']}';
  @override
  Widget build(BuildContext context) {
    return Stack(
      children:[ Container(
        child: SingleChildScrollView(
          child: Container(
              margin: EdgeInsets.only(top: 50,bottom: 80),
              padding: EdgeInsets.only(left: 23,right: 23),
              child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Ink(
                          decoration: BoxDecoration(color: Colors.white,border: Border.all(width: 0.5),shape: BoxShape.circle),
                          child: IconButton(
                              iconSize: 25,
                              onPressed: (){
                                //Navigator.push(context, PageTransition(type: PageTransitionType.leftToRight, child: FoodApp(),duration: Duration(milliseconds: 400)));
                                Navigator.push(context, MaterialPageRoute(builder: (context)=>HomePage(),));
                              }, icon: Icon(Icons.arrow_back,color: Colors.black,)),
                        ),
                        /*Container(
                       padding: EdgeInsets.only(left: 20),height: 60,width: 40,
                        decoration: BoxDecoration(shape: BoxShape.circle,color: Colors.white,),
                        child: Icon(Icons.arrow_back,color: Colors.black,)),*/
                        SizedBox(
                          width: 250,
                        ),
                        InkWell(
                          onTap: (){
                            Navigator.push(context, MaterialPageRoute(builder: (context) => Cart(),));
                          },
                          child: Container(
                              height: 42, width: 42,
                              decoration: BoxDecoration(shape: BoxShape.circle,color: Colors.white,),
                              child:  Icon(Icons.shopping_cart,color: Colors.black)
                          //child: Icon(Icons.favorite_border_rounded,color: check==false? Colors.white : Colors.red,)),
                          ),)

                      ],
                    ),
                    SizedBox(height: 15,),
                    //Text((widget.data["name"]),style: TextStyle(fontWeight: FontWeight.bold,fontSize: 25),),
                    Text("${widget.docIDs["ProductName"]}",style: TextStyle(fontWeight: FontWeight.bold,fontSize: 25),),
                    SizedBox(
                      height: 10,
                    ),
                    Text("${widget.docIDs["desp"]}",style: TextStyle(fontWeight: FontWeight.w500,fontSize: 15,),
                      textAlign: TextAlign.justify,),
                    SizedBox(height: 20,),
                    Container(
                      height: 280,
                      width: 400,
                      //margin: EdgeInsets.only(left: 25,right: 25,),
                      //decoration: BoxDecoration(borderRadius: BorderRadius.circular(20),
                      //image: DecorationImage(image: AssetImage("${widget.data["image"]}"),fit: BoxFit.cover )),
                      decoration: BoxDecoration(borderRadius: BorderRadius.circular(20),
                          image: DecorationImage(image:NetworkImage("${widget.docIDs['ProductImageUrl']}"),fit: BoxFit.cover )),

                    ),
                    SizedBox(
                      height: 20,
                    ),

                    Text("Details",style: TextStyle(fontWeight: FontWeight.bold,fontSize: 23,),
                      textAlign: TextAlign.justify,),
                    SizedBox(
                      height: 12,
                    ),
                    Container(
                      //padding: EdgeInsets.only(left: 12,right: 10),
                      child: //Text((widget.data["desp"]),
                      //style: TextStyle(fontSize: 15),textAlign: TextAlign.justify,),
                      Text("${widget.docIDs["Description"]}",
                        style: TextStyle(fontSize: 18,),textAlign: TextAlign.justify,),
                    ),
                    SizedBox(
                      height: 20,
                    ),
                    Text("Rs."+"${widget.docIDs["Price"]}",style: TextStyle(fontWeight: FontWeight.bold,fontSize: 20,)),


                    SizedBox(height: 25,),
                    Text("Available Size",style: TextStyle(fontWeight: FontWeight.bold,fontSize: 20,), textAlign: TextAlign.justify,),
                    SizedBox(height: 5,),
                    Container(
                      // color: Colors.red,
                      // padding: EdgeInsets.only(left: 5),
                      // height: 280,
                      child: Row(
                        children: [
                          Container(padding: EdgeInsets.only(right: 5),
                              child: Text("${widget.docIDs['Size']}",style: TextStyle(color: Colors.black,fontSize: 20),)),
                          //Container(padding: EdgeInsets.only(left: 15),
                            //  child: Text("M",style: TextStyle(color: Colors.black,fontSize: 20),)),
                          //Container(padding: EdgeInsets.only(left: 15),
                           //   child:Text("L",style: TextStyle(color: Colors.black,fontSize: 20),)),
                          //Container(padding: EdgeInsets.only(left: 15),
                            //  child:Text("XL",style: TextStyle(color: Colors.black,fontSize: 20))),
                          SizedBox(width: 20,),
                          Container(
                            padding: EdgeInsets.only(left: 60),
                            child: Row(
                              children: [

                                SizedBox(width: 50,),

                                Container(
                                  width: 45,
                                  height: 30,
                                  child: ElevatedButton(
                                      onPressed: (){
                                        setState(() {});
                                        dec();
                                      },
                                      style: ElevatedButton.styleFrom(
                                          backgroundColor:Colors.black,
                                          foregroundColor: Colors.black
                                      ),
                                      child:Text("-",style: TextStyle(fontSize: 18,fontWeight: FontWeight.bold,color: Colors.white),)
                                  ),
                                ),
                                Container(
                                  width: 45,
                                  height: 30,
                                  child: Center(
                                    child: Text(
                                      s.toString(),textAlign: TextAlign.center,
                                    ),
                                  ),
                                ),
                                Container(
                                  width: 45,
                                  height: 30,
                                  child: ElevatedButton(
                                      onPressed: (){
                                        setState(() {});
                                        if(int.parse(widget.docIDs['Quantity'])>s){
                                        inc();}
                                      },
                                      style: ElevatedButton.styleFrom(
                                          backgroundColor:Colors.black,
                                          foregroundColor: Colors.black
                                      ),
                                      child:Text("+",style: TextStyle(fontSize: 18,fontWeight: FontWeight.bold,color: Colors.white),)
                                  ),
                                )

                              ],
                            ),
                          )
                        ],
                      )

                      ,),

                  ])),
        ),
      ),



        Row(

          children: [
            Container(width: 250,height: 45,
              decoration: BoxDecoration(borderRadius: BorderRadius.circular(20),color: Colors.yellow,),
              margin: EdgeInsets.only(left: 25,right: 25,top: 740),
              child: ElevatedButton(
                  style: ElevatedButton.styleFrom(backgroundColor: Colors.black87,shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20))),
                  onPressed: (){
                    uploadingData('${widget.docIDs['ProductName']}', '${widget.docIDs['ProductImageUrl']}', '${widget.docIDs['Price']}','${widget.docIDs['Size']}', s.toString());
                    //var result = cartItemsList.where((element) => element.containsValue(widget.data["name"]));
                    //print("$result");
                    //if(result.isEmpty){
                    //cartItemsList.add(widget.data);}
                    //cartItemsList.add(widget.data);
                    //Navigator.push(context, MaterialPageRoute(builder: (context) => AddCart(order: data4[index])));
                    //Navigator.push(context, MaterialPageRoute(builder: (context) => AddCart(data: data[index],)));
                    //Navigator.push(context, PageTransition(type: PageTransitionType.rightToLeft, child: AddCart(),duration: Duration(milliseconds: 400)));
                    //Navigator.push(context, MaterialPageRoute(builder: (context) => Cart()));
                  }, child: Text("Add to Cart",style: TextStyle(fontSize: 17),)),
            ),
            Container(
              margin: EdgeInsets.only(top: 730),
              width: 60,
              height: 60,

             color: Colors.transparent,
              child: InkWell(
                onTap: () {
                  showModalBottomSheet(
                      backgroundColor: Colors.transparent,
                      //isScrollControlled: true,
                      context: context,
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(20))),
                      builder: (context) =>Center(child:Location()));
                },

                child: Icon(
                  Icons.location_on_outlined,
                  color: Colors.black, size: 30,
                ),
              ),
            ),
          ],
        )
      ],);;
  }

  Future<void> uploadingData(String _productName, String _productImageUrl,
      String _price, String _size,String _quantity) async {
    await FirebaseFirestore.instance.collection("cart").add({
      'ProductName': _productName,
      'ProductImageUrl': _productImageUrl,
      'Price': _price,
      'Size' : _size,
      'Quantity': _quantity,


    });
  }
}
