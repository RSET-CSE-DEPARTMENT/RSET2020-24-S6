import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class TermsOfUse extends StatefulWidget {
  const TermsOfUse({super.key});

  @override
  State<TermsOfUse> createState() => _TermsOfUseState();
}

class _TermsOfUseState extends State<TermsOfUse> {
  bool?isChecked=false;
  @override
  Widget build(BuildContext context) {
    return Container(
      decoration:BoxDecoration(
          image:DecorationImage(
              image: AssetImage('assets/terms page.png'),fit: BoxFit.cover)),
      child:Scaffold(
          backgroundColor: Colors.transparent,
          body:Stack(
            children: [
              SingleChildScrollView(
              child:Container(
                padding: EdgeInsets.only(top:680,right:35,left:35),
                         child:Center(
                          child: ElevatedButton(
                            style: ElevatedButton.styleFrom(backgroundColor:Color(0XFFC2858C),shape: StadiumBorder()),
                            onPressed: () {
                              Navigator.pushNamed(context, 'register');
                            },
                            child:Text('BACK',style: TextStyle(
                                color: Colors.white,
                                fontSize: 27,fontWeight: FontWeight.w100
                            )
                            ),

                          ),
                        ),

                    ),
                    ),

            ],
          )
      ),
    );

  }
}


