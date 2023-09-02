import 'dart:math';

import 'package:flutter/material.dart';
import 'package:mailer/mailer.dart';
import 'package:mailer/smtp_server.dart';

class ForgotPassword extends StatefulWidget {
  @override
  _ForgotPassword createState() => _ForgotPassword();
}

class _ForgotPassword extends State<ForgotPassword> {
  TextEditingController _emailController = TextEditingController();
  TextEditingController _otpController = TextEditingController();

  String _otp = '';

  void _sendOTP(String email) async {
    // Generate an OTP (e.g., using a random number generator library)
    _otp = generateOTP();

    final smtpServer = gmail('<YOUR_GMAIL_ADDRESS>', '<YOUR_GMAIL_PASSWORD>');

    final message = Message()
      ..from = Address('<SENDER_EMAIL_ADDRESS>')
      ..recipients.add(email)
      ..subject = 'OTP Verification'
      ..text = 'Your OTP is: $_otp';

    try {
      final sendReport = await send(message, smtpServer);
      print('Message sent: ${sendReport.toString()}');
    } catch (e) {
      print('Error sending OTP: $e');
    }
  }

  void _verifyOTP(String enteredOTP) {
    if (enteredOTP == _otp) {
      print('OTP Verification Successfull');
      onPressed: () {
        Navigator.pushNamed(context, 'donorrecp');
      };
    } else {
      print('Incorrect OTP');
      // Show error message or take appropriate action
    }
  }

  @override
  void dispose() {
    _emailController.dispose();
    _otpController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
        decoration:BoxDecoration(
        image:DecorationImage(
        image: AssetImage('assets/register page.png'),fit: BoxFit.cover)),
    child:Scaffold(
    backgroundColor: Colors.transparent,
   body: Stack(
    children:[
      Container(
        padding: EdgeInsets.only(top:150,right:35,left:35),
        child:Column(
          children: [
        TextField(
          controller: _emailController,
          keyboardType: TextInputType.emailAddress,
        decoration: InputDecoration(
        fillColor: Colors.grey.shade100,
          filled:true ,
          hintText: 'EMAIL',
          border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(10)
          ),
        ),),
            SizedBox(height: 16.0),
        ElevatedButton(
        style: ElevatedButton.styleFrom(backgroundColor:Color(0XFFC2858C),shape: StadiumBorder()),
    onPressed: () {
      String email = _emailController.text;
      _sendOTP(email);
    //Navigator.pushNamed(context, 'login');
    },
    child:Text('SEND OTP',style: TextStyle(
    color: Colors.white,
    fontSize: 27,fontWeight: FontWeight.w200
    )
    ),

    ),
            SizedBox(height: 16.0),
            TextField(
              controller: _otpController,
              keyboardType: TextInputType.number,
              onChanged: (value) {
                // Handle OTP input
              },
              decoration: InputDecoration(
                  fillColor: Colors.grey.shade100,
                  filled:true ,
                  hintText: 'ENTER OTP',
                  border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10)
                  )
              ),),

            SizedBox(height: 16.0),
        ElevatedButton(
        style: ElevatedButton.styleFrom(backgroundColor:Color(0XFFC2858C),shape: StadiumBorder()),
    onPressed: () {
      String enteredOTP = _otpController.text;
      _verifyOTP(enteredOTP);
    //Navigator.pushNamed(context, 'login');
    },
    child:Text('VERIFY OTP',style: TextStyle(
    color: Colors.white,
    fontSize: 27,fontWeight: FontWeight.w200
    )
    ),

    ),
            SizedBox(height: 50.0),
            ElevatedButton(
              style: ElevatedButton.styleFrom(backgroundColor:Color(0XFFC2858C),shape: StadiumBorder()),
              onPressed: () {
                Navigator.pushNamed(context, 'login');
              },
              child:Text('BACK',style: TextStyle(
                  color: Colors.white,
                  fontSize: 27,fontWeight: FontWeight.w200
              )
              ),

            ),
          ],
        ),
      ),
    ],),
    ),);
  }
}

String generateOTP() {
  Random random = Random();
  int otp = random.nextInt(9000) + 1000;
 // return otp.toString();
  return (1000 + Random().nextInt(9000)).toString();
}
