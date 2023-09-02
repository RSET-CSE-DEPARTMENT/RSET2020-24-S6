import 'package:feed_forward/Profile.dart';
import 'package:feed_forward/donor.dart';
import 'package:feed_forward/login.dart';
import  'package:http/http.dart' as http;
import 'dart:convert';
import 'package:flutter/material.dart';
class Recepient extends StatefulWidget {
   Recepient({super.key});
  @override
  State<Recepient> createState() => _RecepientState();
}
class _RecepientState extends State<Recepient> {
//  String quantity = ''; // Added declaration and initialization
 // String location = ''; // Added declaration and initialization
 // List<FoodItem> searchResults = [];
//  Future<void> searchFood() async { // Removed quantity and location parameters
    // Make API request
  //final url = 'http://192.168.56.1/api_feedforward/recipient.php';
  //  final response = await http.get(Uri.parse('url'));

  /*  if (response.statusCode == 200) {
      // Parse API response
      final data = json.decode(response.body);
      List<dynamic> results = data['results'];

      setState(() {
        // Update searchResults with parsed data
        searchResults = results
            .map((item) => FoodItem(
          name: item['name'],
          quantity: item['quantity'],
          location: item['location'],
        ))
            .toList();
      });
    }
  }*/

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration:BoxDecoration(
          image:DecorationImage(
              image: AssetImage('assets/register page.png'),fit: BoxFit.cover)),
      child:Scaffold(
          backgroundColor: Colors.transparent,
          body:Stack(
            children: [
              Container(
                padding: EdgeInsets.only(top:150,right:35,left:35),
                child:Column(
                  children: [

                    TextField(
                      onChanged: (value) {
                        setState(() {
                          //quantity = value; // Update quantity based on input
                        });
                      },
                      decoration: InputDecoration(
                        fillColor: Colors.grey.shade100,
                        filled:true ,
                        hintText: 'ENTER QUANTITY',
                        border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(10)
                        ),
                      ),),
                    SizedBox(
                      height:20,
                    ),
                    TextField(
                      onChanged: (value) {
                        setState(() {
                          //location = value; // Update location based on input
                        });
                      },
                      decoration: InputDecoration(
                          fillColor: Colors.grey.shade100,
                          filled:true ,
                          hintText: 'ENTER LOCALITY',
                          border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(10)
                          )
                      ),),
                    SizedBox(
                      height: 20,
                    ),
                    ElevatedButton.icon(
                      style: ElevatedButton.styleFrom(backgroundColor:Color(0XFFC2858C),shape: StadiumBorder(),),
                      onPressed: () {
                          //searchFood(); // Call searchFood function without parameters
                        Navigator.pushNamed(context, 'list');
                      },
                      label:Text('SEARCH ',style: TextStyle(
                          color: Colors.white,
                          fontSize: 27,fontWeight: FontWeight.w200
                      ),
                      ),
                      icon: Icon(Icons.search,color: Color(0XFF5A082D),size: 30,),
                    ),
                   /* Expanded(
                      child: ListView.builder(
                        itemCount: searchResults.length,
                        itemBuilder: (context, index) {
                          final foodItem = searchResults[index];
                          return ListTile(
                            title: Text(foodItem.name),
                            subtitle: Text('Quantity: ${foodItem.quantity}'),
                            trailing: Text('Location: ${foodItem.location}'),
                          );
                        },
                      ),
                    ),*/
                  ],
                ),
              ),
              SizedBox(
                height: 30,
              ),
              Container(margin: EdgeInsets.only(top: 630),
                  height: 40,
                  width: 400,
                  color: Colors.transparent,
                  child: Row(
                    children: [
                      Expanded(child: InkWell(
                          onTap: () {
                            Navigator.push(
                                context, MaterialPageRoute(builder: (context) => const Profile())
                            );
                          },
                          child: Container(
                            height: 60,
                            width: 60,
                            decoration: const BoxDecoration(
                                image: DecorationImage(
                                    image: AssetImage("assets/profile.png")
                                )
                            ),
                          )
                        //Icon(Icons.horizontal_split_rounded,color: Colors.white,size: 50)
                      )
                      ),
                      Expanded(child: InkWell(
                          onTap: () {
                            Navigator.push(
                                context, MaterialPageRoute(builder: (context) => const MyLogin())
                            );
                          },
                          child: Container(
                            height: 60,
                            width: 60,
                            decoration: const BoxDecoration(
                                image: DecorationImage(
                                    image: AssetImage("assets/Home.png"),fit: BoxFit.contain)
                            ),
                          )
                        //Icon(Icons.home,color:Colors.white,size: 50)
                      )
                      ),
                      Expanded(child: InkWell(
                          onTap: () {
                            Navigator.push(
                              context, MaterialPageRoute(builder: (context) => const Donor()),
                            );
                          },
                          child: Container(
                            height: 60,
                            width: 50,
                            decoration: const BoxDecoration(
                                image: DecorationImage(
                                    image: AssetImage("assets/settings.png"), fit: BoxFit.contain)
                            ),
                          )
                        //Icon(Icons.settings,color:Colors.white,size: 50)
                      )
                      ),
                    ],
                  )
              ),
            ],
          )
      ),
    );
  }
}
/*class FoodItem {
  final String name;
  final String quantity;
  final String location;

  FoodItem({required this.name, required this.quantity, required this.location});
}*/


