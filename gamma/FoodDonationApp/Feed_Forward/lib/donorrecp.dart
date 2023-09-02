import 'package:flutter/material.dart';

class MyOptions extends StatefulWidget {
  const MyOptions({super.key});

  @override
  State<MyOptions> createState() => _MyOptionsState();
}

class _MyOptionsState extends State<MyOptions> {
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
                          Navigator.pushNamed(context, 'donor');
                        },
                        child:Text('DONOR',style: TextStyle(
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
                          Navigator.pushNamed(context, 'recepient');
                        },
                        child:Text('RECEPIENT',style: TextStyle(
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
