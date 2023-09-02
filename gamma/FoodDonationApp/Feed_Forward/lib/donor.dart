import 'package:feed_forward/Profile.dart';
import 'package:feed_forward/Settings.dart';
import 'package:feed_forward/donorrecp.dart';
import 'package:feed_forward/home.dart';
import 'package:feed_forward/login.dart';
import 'package:flutter/material.dart';

class Donor extends StatefulWidget {
  const Donor({super.key});

  @override
  State<Donor> createState() => _DonorState();
}

class _DonorState extends State<Donor> {
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
            SingleChildScrollView(
              child:  Container(
                  padding: EdgeInsets.only(top:150,right:35,left:35),
                  child:Column(
                      children: [
                        TextField(
                          decoration: InputDecoration(
                            fillColor: Colors.grey.shade100,
                            filled:true ,
                            hintText: 'NAME OF DONOR',
                            border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(10)
                            ),
                          ),),
                        SizedBox(
                          height:20,
                        ),
                        TextField(
                          decoration: InputDecoration(
                              fillColor: Colors.grey.shade100,
                              filled:true ,
                              hintText: 'FOOD ITEM',
                              border: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(10)
                              )
                          ),),
                        SizedBox(
                          height: 20,
                        ),
                        TextField(
                          decoration: InputDecoration(
                              fillColor: Colors.grey.shade100,
                              filled:true ,
                              hintText: 'NAME OF RECEIVER',
                              border: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(10)
                              )
                          ),),
                        SizedBox(
                          height: 20,
                        ),
                        TextFormField(
                          decoration: InputDecoration(
                              fillColor: Colors.grey.shade100,
                              filled:true ,
                              hintText: 'TIME AFTER FOOD IS COOKED',
                              border: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(10)
                              )
                          ),
                          /* validator: (value) {
                            if (value>4) {
                              return 'Cannot deliver!';
                            }
                          },*/
                        ),
                        SizedBox(
                          height: 20,
                        ),
                        TextField(
                          decoration: InputDecoration(
                              fillColor: Colors.grey.shade100,
                              filled:true ,
                              hintText: 'QUANTITY',
                              border: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(10)
                              )
                          ),),
                        SizedBox(
                          height: 20,
                        ),

                        Center(
                          child: ElevatedButton(
                            style: ElevatedButton.styleFrom(backgroundColor:Color(0XFFC2858C),shape: StadiumBorder()),
                            onPressed: () {
                              Navigator.pushNamed(context, 'login');
                            },
                            child:Text('DONATE',style: TextStyle(
                                color: Colors.white,
                                fontSize: 27,fontWeight: FontWeight.w200
                            )
                            ),

                          ),
                        ),
                        SizedBox(
                          height:20,
                        ),
                        SingleChildScrollView(
                            child:
                            Container(margin: EdgeInsets.only(top: 110),
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
                                              context, MaterialPageRoute(builder: (context) => const MyOptions())
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
                            )
                        ),
                      ]
                  )
              ),
            ),
            ]
        ),
      ),
    );
  }
}
