import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:corental/screen/productlist/productlist.dart';
import 'package:corental/screen/productpage/productpage.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class HomePageBody extends StatefulWidget {
   HomePageBody({Key? key,required this.list5}) : super(key: key);
  List list5;

  @override
  State<HomePageBody> createState() => _HomePageBodyState();
}

class _HomePageBodyState extends State<HomePageBody> {
  List<Map<String,dynamic>> data1= [
    {"name":"Wedding Gown","image":"asset/gown1.jpg","price":8.99,"rate":"5.0(3.8k)","qty":1,"dp":"Cheesy Burger","desp":"Comes in either beef or chicken; Topped with lettuce, tomatoes, onions served with ketchup,mayo,mustard on a toasted bun.","select":false,},
    {"name":"Floral Saree","image":"asset/saree.jpeg","price":9.90,"rate":"4.8(2.5k)","qty":1,"dp":"Creamy Pasta ","desp":"Creamy cheese sauce, olives, onion, garlic, olive oil, herbs and grana padona cheese.","select":false,},
    {"name":"Lehenga","image":"asset/lehenga1.jpg","price":6.67,"rate":"4.5(3.4k)","qty":1,"dp":"Hot Wings    ","desp":"Breaded chicken wings deep fried and tossed with honey garlic sauce .","select":false,},
    {"name":"Winter Sweater","image":"asset/sweater.jpeg","price":5.56,"rate":"4.3(3.0k)","qty":1,"dp":"Special Biriyani","desp":"Clay oven cooked tender pieces of chicken cooked along with basmati rice with special biriyani masala .","select":false,},
  ];

  List<Map<String,dynamic>> data2= [
    {"name":"Tan Jacket","image":"asset/tanjacket.jpg","price":9.63,"rate":"4.8(2.5k)","qty":1,"dp":"Pizza Italian","desp":"3 1/2 cups (355 ml) warm water (105F-115F), 1 package (2 1/4 teaspoons) active dry yeast, 3/4 cups(450 g) bread flour.","select":false,},
    {"name":"Necklace","image":"asset/necklace.jpg","price":5.45,"rate":"4.4(3.8k)","qty":1,"dp":"Nutella Pancake","desp":"Delicious pancake served with fruits and cream, served with melted triple chocolates .","select":false,},
    {"name":"Printed Shirt","image":"asset/leafshirt.jpg","price":4.49,"rate":"3.5(3.9k)","qty":1,"dp":"Garden Salad  ","desp":"Crunchy cucumber, carrots, radish and tomatoes on the bed of lettuce .","select":false,},
    {"name":"Kerala Saree","image":"asset/onamsaree.jpg","price":5.57,"rate":"3.5(3.9k)","qty":1,"dp":"Special Thai   ","desp":"Stir fry noodles with tofu, scrambled eggs and bean sprouts.","select":false,},
  ];

  List<Map<String,dynamic>> data3= [
    {"name":"All","image":"asset/tanjacket.jpg",},
    {"name":"Wedding","image":"asset/gown1.jpg",},
    {"name":"Western","image":"asset/leafshirt.jpg",},
    {"name":"Traditional","image":"asset/saree.jpeg",},
  ];
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    fetchData();
  }
  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Container(
          margin: EdgeInsets.only(top: 80,bottom: 30),
          child: Column(
              children: [
                Container(
                  padding: EdgeInsets.only(left: 35),
                  child: Text("CORENTAL",style: TextStyle(fontSize: 20,fontWeight: FontWeight.w500,color: Color.fromRGBO(163, 115, 77, 1)),),
                ),
                SizedBox(
                  height: 20,
                ),
                Container(
                  height: 190,
                  child: ListView.builder(
                      shrinkWrap: true,
                      scrollDirection: Axis.horizontal,
                      itemCount: data3.length,
                      itemBuilder: (context,index) {
                        return InkWell(
                          onTap: () {
                            Navigator.push(context, MaterialPageRoute(builder: (context) => ProductList(Category:data3[index]["name"]),));
                          },
                          child: Column(
                            children: [
                              Container(
                                margin: EdgeInsets.only(left: 15,right: 15),
                                height: 150, width: 140,
                                decoration: BoxDecoration(borderRadius: BorderRadius.circular(20),image: DecorationImage(image: AssetImage("${data3[index]["image"]}"),fit: BoxFit.cover),),

                              ),
                              Text((data3[index]["name"]),style: TextStyle(fontSize: 20,fontWeight: FontWeight.w500),),
                            ],),
                        );
                      }
                  ),
                ),
                SizedBox(
                  height: 10,
                ),
                Container(

                    padding: EdgeInsets.only(right: 195,left: 10),
                    child: Text("Fashion Trends",style: TextStyle(fontSize: 22,fontWeight: FontWeight.w600),)),
                SizedBox(
                  height: 20,
                ),
                Container(
                  height: 370,
                  child: ListView.builder(
                      itemCount: 4,
                      scrollDirection: Axis.horizontal,
                      itemBuilder: (context,index) {
                        return InkWell(
                          onDoubleTap: (){
                            //Navigator.push(context, PageTransition(type: PageTransitionType.rightToLeft, child: FoodSec(data: data1[index],),duration: Duration(milliseconds: 400)));
                            //Navigator.push(context, MaterialPageRoute(builder: (context) => Product(list3: data1[index],)));
                            Navigator.push(context, MaterialPageRoute(builder: (context) => Product(list3: widget.list5[index],)));
                          },
                          child: Container(
                            padding: EdgeInsets.all(15),
                            height: 350, width: 350,
                            margin: EdgeInsets.only(left: 20,right: 20,),
                            decoration: BoxDecoration(borderRadius: BorderRadius.circular(20),image: DecorationImage(image: NetworkImage("${widget.list5[index]['ProductImageUrl']}"),fit: BoxFit.cover )),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Container(
                                  padding: EdgeInsets.only(left: 15,),
                                  child: Column(
                                    children: [
                                      Text("${widget.list5[index]['ProductName']}",style: TextStyle(fontSize: 24,fontWeight:FontWeight.bold,color: Colors.white),),
                                    Text("${widget.list5[index]['desp']}",style: TextStyle(fontSize: 17,fontWeight: FontWeight.bold,color: Colors.white),)],
                                  ),
                                ),

                                SizedBox(height: 20,),
                                Text("Rs." + "${widget.list5[index]['Price']}",style: TextStyle(fontSize: 25,fontWeight: FontWeight.bold,color: Colors.white),),
                              ],
                            ),
                          ),
                        );
                      }
                  ),
                ),
                SizedBox(
                  height: 20,
                ),
                Container(
                    padding: EdgeInsets.only(right: 195,),
                    child: Text("Popular Items",style: TextStyle(fontSize: 22,fontWeight: FontWeight.w600),textAlign: TextAlign.left,)),
                SizedBox(
                  height: 25,
                ),
                Container(
                  height: 350,
                  child: ListView.builder(
                    //reverse: true,
                      scrollDirection: Axis.horizontal,
                      itemCount: 3,
                      itemBuilder: (context,index) {
                        return InkWell(
                          onDoubleTap: (){
                            //Navigator.push(context, PageTransition(type: PageTransitionType.rightToLeft, child: FoodSec(data: data2[index],),duration: Duration(milliseconds: 400)));
                            Navigator.push(context, MaterialPageRoute(builder: (context) => Product(list3: widget.list5[index+3],)));
                          },
                          child: Container(
                            padding: EdgeInsets.all(15),
                            height: 350, width: 350,
                            margin: EdgeInsets.only(left: 20,right: 20,),
                            decoration: BoxDecoration(borderRadius: BorderRadius.circular(20),image: DecorationImage(image: NetworkImage("${widget.list5[index+3]['ProductImageUrl']}"),fit: BoxFit.cover )),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Container(
                                  padding: EdgeInsets.only(left: 15),
                                  child: Column(
                                    children: [
                                      Text("${widget.list5[index+3]['ProductName']}",style: TextStyle(fontSize: 24,fontWeight: FontWeight.bold,color: Colors.white),),
                                  Text("${widget.list5[index+3]['desp']}",style: TextStyle(fontSize: 17,fontWeight: FontWeight.bold,color: Colors.white)) ],
                                  ),
                                ),
                                SizedBox(height: 20,),
                                Text("Rs." + "${widget.list5[index+3]['Price']}",style: TextStyle(fontSize: 25,fontWeight: FontWeight.bold,color: Colors.white),),

                              ],
                            ),
                          ),
                        );
                      }
                  ),
                ),
                SizedBox(height: 60),
              ])),
    );
  }

  Future<void> fetchData() async {
    var resp = await FirebaseFirestore.instance.collection("products").get();
    print(resp.docs.first.data());
    //data1.
  }
}