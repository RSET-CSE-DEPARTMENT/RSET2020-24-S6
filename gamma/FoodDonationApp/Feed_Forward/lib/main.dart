
import 'package:feed_forward/Profile.dart';
import 'package:feed_forward/TermsandConditions.dart';
import 'package:feed_forward/account.dart';
import 'package:feed_forward/donor%20success.dart';
import 'package:feed_forward/donor.dart';
import 'package:feed_forward/home.dart';
import 'package:feed_forward/list.dart';
import 'package:feed_forward/recepient.dart';
import 'package:feed_forward/recepientfrag.dart';
import 'package:feed_forward/registerplus.dart';
import 'package:feed_forward/signinsuccessful.dart';
import 'package:feed_forward/signupsuccessful.dart';
import 'package:feed_forward/userdetails.dart';
import 'package:feed_forward/LoginSuc.dart';
import 'package:feed_forward/forgotpassword.dart';
import 'package:feed_forward/login.dart';
import 'package:feed_forward/donorrecp.dart';
import 'package:feed_forward/register.dart';
import 'package:feed_forward/volactive.dart';
import 'package:feed_forward/volunteer.dart';
import 'package:feed_forward/volunteerfrag.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
    debugShowCheckedModeBanner: false,
    initialRoute: 'home',
    routes:{
      'login':(context)=>MyLogin(),
     'register':(context)=>MyRegister(),
      'donorrecp':(context)=>MyOptions(),
      'forgotpassword':(context)=>ForgotPassword(),
      'recepient':(context)=>Recepient(),
      'login successful':(context)=>LoginSuc(),
      'user details':(context)=>Userdetails(),
      'donor':(context)=>Donor(),
      'donor success':(context)=>DonorSuccess(),
      'registerplus':(context)=>RegisterPlus(),
      'home':(context)=>Home(),
      'TermsandConditions':(context)=>TermsOfUse(),
      'signupsuccessful':(context)=>Successful(),
      'list':(context)=>Volunteer(),
      'signinsuccessful':(context)=>SigninSuccess(),
      'recepientfrag':(context)=>RecipientFrag(),
      'volunteerfrag':(context)=>VolunteerFrag(),
      'account':(context)=>MyAccount(),
      'Profile':(context)=>Profile(),
      'volunteer':(context)=>Volunteerfetch(),
      'volactive':(context)=>VolunteerActive(),

    },
  ));
}


