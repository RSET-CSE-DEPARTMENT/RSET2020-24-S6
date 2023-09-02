import 'package:feed_forward/Profile.dart';
import 'package:feed_forward/donor.dart';
import 'package:feed_forward/login.dart';
import 'package:flutter/material.dart';
class Volunteerfetch extends StatefulWidget {
  const Volunteerfetch({super.key});

  @override
  State<Volunteerfetch> createState() => _VolunteerfetchState();
}

class _VolunteerfetchState extends State<Volunteerfetch> {
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
             child: Container(
                padding: EdgeInsets.only(top:150,right:35,left:20),
                child:Column(
                  children: [
                    Text('NGO 1',
                      style: TextStyle(color: Color(0XFF5A082D), fontSize: 22),
                    ),
                    SizedBox(
                      height:10,
                    ),
                    Text(
                      'LOCATION',
                      style: TextStyle(color: Color(0XFF5A082D), fontSize: 20),
                    ),
                    SizedBox(
                      height:10,
                    ),
                    Text(
                      'DISTANCE:5 KM',
                      style: TextStyle(color: Color(0XFF5A082D), fontSize: 18),
                    ),
                    SizedBox(
                      height:10,
                    ),
                    Center(
                      child: ElevatedButton(
                        style: ElevatedButton.styleFrom(backgroundColor:Color(0XFFC2858C),shape: StadiumBorder()),
                        onPressed: () {
                          Navigator.pushNamed(context, 'tracking');
                        },
                        child:Text('TRACK',style: TextStyle(
                            color: Colors.white,
                            fontSize: 27,fontWeight: FontWeight.w100
                        )
                        ),

                      ),
                    ),
                    Text('NGO 2',
                      style: TextStyle(color: Color(0XFF5A082D), fontSize: 22),
                    ),
                    SizedBox(
                      height:10,
                    ),
                    Text(
                      'LOCATION 2',
                      style: TextStyle(color: Color(0XFF5A082D), fontSize: 20),
                    ),
                    SizedBox(
                      height:10,
                    ),
                    Text(
                      'DISTANCE:10 KM',
                      style: TextStyle(color: Color(0XFF5A082D), fontSize: 18),
                    ),
                    SizedBox(
                      height:10,
                    ),
                    Center(
                      child: ElevatedButton(
                        style: ElevatedButton.styleFrom(backgroundColor:Color(0XFFC2858C),shape: StadiumBorder()),
                        onPressed: () {
                          Navigator.pushNamed(context, 'tracking');
                        },
                        child:Text('TRACK',style: TextStyle(
                            color: Colors.white,
                            fontSize: 27,fontWeight: FontWeight.w100
                        )
                        ),

                      ),
                    ),
                    SingleChildScrollView(
                        child:
                        Container(margin: EdgeInsets.only(top: 230),
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
                        )
                    ),
                      ],
                    )
                ),
              ),


    ],
    ),
      ),
    );
  }
}
