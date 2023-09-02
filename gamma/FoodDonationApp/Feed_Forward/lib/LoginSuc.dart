import 'package:flutter/material.dart';

class LoginSuc extends StatefulWidget {
  const LoginSuc({super.key});


  @override
  State<LoginSuc> createState() => _LoginSucState();
}

class _LoginSucState extends State<LoginSuc> {
  @override
  Widget build(BuildContext context) {
    return Container(
      decoration:BoxDecoration(
          image:DecorationImage(
              image: AssetImage('assets/options page.png'),fit: BoxFit.cover)),
      child:Scaffold(
          backgroundColor: Colors.transparent,
          body:Stack(
            children: [
              Container(
                padding: EdgeInsets.only(top: 450,left: 35,right: 35),
                child:Column(
                  children: [
                    ElevatedButton(
                      style: ElevatedButton.styleFrom(backgroundColor:Color(0XFFC2858C),shape: StadiumBorder()),
                      onPressed: () {
                        Navigator.pushNamed(context, 'volunteer');
                      },
                      child:Text('VOLUNTEER',style: TextStyle(
                          color: Colors.white,
                          fontSize: 27,fontWeight: FontWeight.w100
                      )
                      ),

                    ),
                    SizedBox(
                      height: 20,
                    ),
    ElevatedButton(
    style: ElevatedButton.styleFrom(backgroundColor:Color(0XFFC2858C),shape: StadiumBorder()),
    onPressed: () {
    Navigator.pushNamed(context, 'user details');
    },
    child:Text('DONOR',style: TextStyle(
    color: Colors.white,
    fontSize: 27,fontWeight: FontWeight.w100
    )
    ),

    ),
                    SizedBox(
                    height: 80,
    ),
                       Center(
                         child: ElevatedButton(
                            style: ElevatedButton.styleFrom(backgroundColor:Color(0XFFC2858C),shape: StadiumBorder()),
                            onPressed: () {
                              Navigator.pushNamed(context, 'login');
                            },
                            child:Text('BACK',style: TextStyle(
                                color: Colors.white,
                                fontSize: 27,fontWeight: FontWeight.w100
                            )
                            ),

                          ),
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
