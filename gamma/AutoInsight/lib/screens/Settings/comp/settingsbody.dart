import 'package:autoinsight/screens/Signin/signin.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class SettingsBody extends StatelessWidget {
  const SettingsBody({super.key});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Scaffold(
        appBar: AppBar(
          title: Image.asset("assets/topbar.png",fit: BoxFit.cover),
          backgroundColor: Colors.black,
        ),
        body: Stack(
          children: [
            Container(
              constraints: const BoxConstraints.expand(),
              decoration: const BoxDecoration(
                  color: Colors.black),
            ),
            Container/*Notifications*/(margin: EdgeInsets.only(top: 20),
              height: 60,
              width: 900,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(10),
                color: Colors.red,
              ),
              child: Container(margin: EdgeInsets.only(left: 10),
                child: Row(
                  children: [
                    Text('Notifications',
                      style: TextStyle(
                      color: Colors.black, fontSize: 30,
                      fontFamily: 'PoppinsMed'),
                    ),
                    Transform.scale(scale: 1.5,
                    child:
                    Container(margin: EdgeInsets.only(left: 90),
                      child: Switch(
                          activeColor: Colors.black,
                          activeTrackColor: Colors.white,
                          inactiveThumbColor: Colors.black,
                          inactiveTrackColor: Colors.white10,
                          onChanged: null, value: true,),
                    )
              ),
                  ],
                ),
              ),
            ),
            Container/*Privacy*/(
              margin: EdgeInsets.only(top: 100),
              height: 60,
              width: 800,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(10),
                color: Colors.red,
              ),
              child: Container(margin: EdgeInsets.only(left: 10,top: 5),
                child: Text('Privacy',
                  style: TextStyle(
                    color: Colors.black,fontSize: 30,
                    fontFamily: 'PoppinsMed'),
                  ),
              ),
            ),
            Container/*T&C*/(
              margin: EdgeInsets.only(top: 180),
              height: 60,
              width: 800,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(10),
                color: Colors.red,
              ),
              child: Container(margin: EdgeInsets.only(left: 10,top: 5),
                child: Text('Terms & Conditions',
                  style: TextStyle(
                      color: Colors.black,fontSize: 30,
                      fontFamily: 'PoppinsMed'),
                ),
              ),
            ),
            Container/*log out*/(
              margin: EdgeInsets.only(top: 260),
              height: 60,
              width: 800,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(10),
                color: Colors.red,
              ),
              child: Container(margin: EdgeInsets.only(left: 10,top: 5),
                child: InkWell(
                  onTap: () {
                    FirebaseAuth.instance.signOut();
                    Navigator.push(context,
                        MaterialPageRoute(builder: (context) => const signin()
                        )
                    );
                  },
                  child: Text('Log out',
                    style: TextStyle(
                        color: Colors.black,fontSize: 30,
                        fontFamily: 'PoppinsMed'),
                  ),
                ),
              ),
            ),
          ],
        ),
      )
    );
  }
}
