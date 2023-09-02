//import 'package:feed_forward/TermsandConditions.dart';
import 'package:feed_forward/home.dart';
import 'package:flutter/material.dart';

class RegisterPlus extends StatefulWidget {
  const RegisterPlus({super.key});

  @override
  State<RegisterPlus> createState() => _RegisterPlusState();
}

class _RegisterPlusState extends State<RegisterPlus> {
  bool?isChecked=false;
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
                  padding:EdgeInsets.only(left: 35,top :40),
                  child:
                  Text('Register  Now!',style: TextStyle(color:Colors.blue, fontSize: 33),
                  ),
                ),
              ),
              Container(
                  padding: EdgeInsets.only(top:130,right:35,left:35),
                  child:Column(
                      children: [

                        TextField(
                          decoration: InputDecoration(
                              fillColor: Colors.grey.shade100,
                              filled:true ,
                              hintText: 'LICENCE NUMBER',
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
                              hintText: 'VEHICLE NUMBER',
                              border: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(10)
                              )
                          ),),

                        Container(
                          padding: EdgeInsets.only(top:30,right:35,left:35),
                          child:Column(
                            children: [
                              Row(
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                children: [
                                  Checkbox(
                                      value: isChecked,
                                      activeColor: Colors.white,
                                      checkColor: Colors.blueAccent,
                                      onChanged: (newBool){
                                        setState(() {
                                          isChecked=newBool;
                                        },
                                        );

                                      }
                                  ),
                                  TextButton(
                                    onPressed: (){
                                      Navigator.pushNamed(context, 'TermsandConditions');
                                    },
                                    child: Text('Terms and Conditions',style: TextStyle(
                                      decoration: TextDecoration.underline,
                                      fontSize: 15,color:  Color(0xff26c6da),
                                    ),),
                                  ),
                                ],
                              )
                            ],
                          ),
                        ),
                        SizedBox(
                          height: 20,
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            ElevatedButton(
                              onPressed: () {
                                Navigator.pushNamed(context, 'register');
                              },
                              child: Icon( //<-- SEE HERE
                                Icons.arrow_back,
                                color: Colors.black,
                                size: 20,
                              ),
                              style: ElevatedButton.styleFrom(
                                shape: CircleBorder(), //<-- SEE HERE
                                padding: EdgeInsets.all(20),
                              ),
                            ),
                            Text('REGISTER ',style: TextStyle(
                                color: Color(0xff26c6da),
                                fontSize: 27,fontWeight: FontWeight.w700
                            ),
                            ),
                            ElevatedButton(
                              onPressed: () {
                                Navigator.pushNamed(context, 'login');
                              },
                              child: Icon( //<-- SEE HERE
                                Icons.arrow_forward,
                                color: Colors.black,
                                size: 20,
                              ),
                              style: ElevatedButton.styleFrom(
                                shape: CircleBorder(), //<-- SEE HERE
                                padding: EdgeInsets.all(20),
                              ),
                            ),
                          ],
                        ),
                        SizedBox(
                          height:20,
                        ),

                      ]
                  )
              ),

            ]
        ),
      ),
    );
  }
}
