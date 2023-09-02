import 'package:flutter/material.dart';

class Home extends StatefulWidget {
  const Home({super.key});

  @override
  State<Home> createState() => _HomeState();
}
class _HomeState extends State<Home> {
  @override
  Widget build(BuildContext context) {
    return Container(
      decoration:BoxDecoration(
          image:DecorationImage(
              image: AssetImage('assets/bhome.png'),fit: BoxFit.cover)),
      child:Scaffold(
          backgroundColor: Colors.transparent,
          body:Stack(
            children: [
              SizedBox(
                height:20,
              ),
              Container(
                padding: EdgeInsets.only(top:600,right:50,left:150),
                child:Column(
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        ElevatedButton(
                          onPressed: () {
                            Navigator.pushNamed(context, 'login');
                          },
                          child: Icon( //<-- SEE HERE
                            Icons.home_filled,
                            color: Colors.white,
                            size: 30,
                          ),
                          style: ElevatedButton.styleFrom(
                            backgroundColor:  Color(0XFF5A082D),
                            shape: CircleBorder(), //<-- SEE HERE
                            padding: EdgeInsets.all(20),
                          ),
                        ),
                      ],
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
