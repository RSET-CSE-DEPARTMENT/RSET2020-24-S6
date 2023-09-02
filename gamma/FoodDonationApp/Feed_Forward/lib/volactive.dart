import 'package:feed_forward/Profile.dart';
import 'package:feed_forward/donor.dart';
import 'package:feed_forward/login.dart';
import 'package:flutter/material.dart';
class VolunteerActive extends StatefulWidget {
  const VolunteerActive({super.key});

  @override
  State<VolunteerActive> createState() => _VolunteerActiveState();
}

class _VolunteerActiveState extends State<VolunteerActive> {
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
                  padding:EdgeInsets.only(left: 35,top :150),

                  child:Text(' VOLUNTEER ACTIVATION ',style: TextStyle(color:Color(0XFF5A082D), fontSize: 25),
                  ),
                ),
              ),
              Container(
                padding: EdgeInsets.only(top:300,right:35,left:35),
                child:Column(
                  children: [
                    Center(
                      child: ElevatedButton(
                        style: ElevatedButton.styleFrom(backgroundColor:Color(0XFFC2858C),shape: StadiumBorder()),
                        onPressed: () {
                          // Navigator.pushNamed(context, 'signupsuccessful');
                          Navigator.pushNamed(context, 'volunteer');
                        },
                        child:Text('ACTIVE',style: TextStyle(
                            color: Colors.white,
                            fontSize: 27,fontWeight: FontWeight.w100
                        )
                        ),

                      ),
                    ),
                    SizedBox(
                      height:30,
                    ),
                    Center(
                      child: ElevatedButton(
                        style: ElevatedButton.styleFrom(backgroundColor:Color(0XFFC2858C),shape: StadiumBorder()),
                        onPressed: () {
                          // Navigator.pushNamed(context, 'signupsuccessful');
                         Navigator.pushNamed(context, 'login');
                        },
                        child:Text('INACTIVE',style: TextStyle(
                            color: Colors.white,
                            fontSize: 27,fontWeight: FontWeight.w100
                        )
                        ),

                      ),
                    ),
                    SizedBox(
                      height:30,
                    ),
                    SingleChildScrollView(
                        child:
                        Container(margin: EdgeInsets.only(top: 250),
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
                ),
              )
            ],
          )
      ),
    );
  }
}
