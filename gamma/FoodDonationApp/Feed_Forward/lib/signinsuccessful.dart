import 'package:feed_forward/Profile.dart';
import 'package:feed_forward/donor.dart';
import 'package:feed_forward/donorrecp.dart';
import 'package:feed_forward/login.dart';
import 'package:flutter/material.dart';
class SigninSuccess extends StatefulWidget {
  const SigninSuccess({super.key});

  @override
  State<SigninSuccess> createState() => _SigninSuccessState();
}

class _SigninSuccessState extends State<SigninSuccess> {
  @override
  Widget build(BuildContext context) {
    return Container(
      decoration:BoxDecoration(
          image:DecorationImage(
              image: AssetImage('assets/SigninSuccess.png'),fit: BoxFit.cover)),
      child:Scaffold(
        backgroundColor: Colors.transparent,
        body:Stack(
            children: [

              Container(
                  padding: EdgeInsets.only(top:150,right:35,left:35),
                  child:Column(
                    children: [
                      SingleChildScrollView(
                          child:
                          Container(margin: EdgeInsets.only(top: 480),
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
                    ],
                  )
              ),
            ]
        ),
      ),
    );
  }
}
