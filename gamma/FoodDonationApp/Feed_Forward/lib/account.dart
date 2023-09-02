
import 'package:feed_forward/Profile.dart';
import 'package:feed_forward/donor.dart';
import 'package:feed_forward/login.dart';
import 'package:flutter/material.dart';

class MyAccount extends StatefulWidget {
  const MyAccount({Key? key}) : super(key: key);

  @override
  State<MyAccount> createState() => _MyAccountState();
}

class _MyAccountState extends State<MyAccount> {
  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        image: DecorationImage(
          image: AssetImage('assets/register page.png'),
          fit: BoxFit.cover,
        ),
      ),

      child: Column(
        mainAxisAlignment: MainAxisAlignment.center, // Added main axis alignment
        children: [
          Text(
            'USERNAME',
            style: TextStyle(color: Color(0XFF5A082D), fontSize: 25),
          ),
          Text(
            'Email@gmail.com',
            style: TextStyle(color: Color(0XFF5A082D), fontSize: 25),
          ),
          SizedBox(
            height: 20,
          ),
          Center(
            child: ElevatedButton(
              style: ElevatedButton.styleFrom(backgroundColor:Color(0XFFC2858C),shape: StadiumBorder()),
              onPressed: () {
                Navigator.pushNamed(context, 'Profile');

              },
              child:Text('BACK',style: TextStyle(
                  color: Colors.white,
                  fontSize: 27,fontWeight: FontWeight.w200
              )
              ),

            ),
          ),
        ],
      ),
    );
  }
}