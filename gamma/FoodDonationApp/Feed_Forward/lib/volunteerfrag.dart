import 'package:feed_forward/Profile.dart';
import 'package:feed_forward/donorrecp.dart';
import 'package:feed_forward/list.dart';
import 'package:flutter/material.dart';
class VolunteerFrag extends StatefulWidget {
  const VolunteerFrag({super.key});

  @override
  State<VolunteerFrag> createState() => _VolunteerFragState();
}

class _VolunteerFragState extends State<VolunteerFrag> {
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
                  child:
                  Container(margin: EdgeInsets.only(top: 620),
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
                                  context, MaterialPageRoute(builder: (context) => const Volunteer(),
                                ),
                                );
                              },
                              child: Container(
                                height: 60,
                                width: 50,
                                decoration: const BoxDecoration(
                                    image: DecorationImage(
                                        image: AssetImage("assets/volunteer.png"), fit: BoxFit.contain)
                                ),
                              )
                            //Icon(Icons.settings,color:Colors.white,size: 50)
                          )
                          ),
                        ],
                      )
                  )
              ),],
          )
      ),

    );
  }
}
