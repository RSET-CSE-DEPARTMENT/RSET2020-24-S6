import 'package:feed_forward/Profile.dart';
import 'package:feed_forward/donor.dart';
import 'package:feed_forward/donorrecp.dart';
import 'package:feed_forward/login.dart';
import 'package:flutter/material.dart';

class Userdetails extends StatefulWidget {
  const Userdetails({super.key});

  @override
  State<Userdetails> createState() => _UserdetailsState();
}

class _UserdetailsState extends State<Userdetails> {
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
                  padding:EdgeInsets.only(left: 35,top :100),

                ),
              ),
              SizedBox(
                height: 30,
              ),
              Container(
                  padding: EdgeInsets.only(top:150,right:35,left:35),
                  child:Column(
                    children: [
                      TextField(
                        decoration: InputDecoration(
                          fillColor: Colors.grey.shade100,
                          filled:true ,
                          hintText: 'NAME',
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
                            hintText: 'PHONE NUMBER',
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
                            hintText: 'ADDRESS',
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
                            hintText: 'AADHAR NUMBER',
                            border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(10)
                            )
                        ),),
                      SizedBox(
                        height: 20,
                      ),

                      TextField(
                        obscureText:true,
                        decoration: InputDecoration(
                            fillColor: Colors.grey.shade100,
                            filled:true ,
                            hintText: 'PASSWORD',
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
                          child:Text('REGISTER',style: TextStyle(
                              color: Colors.white,
                              fontSize: 27,fontWeight: FontWeight.w200
                          )
                          ),

                        ),
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
            ]
        ),
      ),
    );
  }
}
