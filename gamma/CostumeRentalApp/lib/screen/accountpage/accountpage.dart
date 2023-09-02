import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:corental/screen/accountpage/components/accountpagebody.dart';
import 'package:corental/screen/loginpage/loginpage.dart';
import 'package:floating_navbar/floating_navbar_item.dart';
import 'package:flutter/material.dart';
import 'package:floating_navbar/floating_navbar.dart';
import 'package:shared_preferences/shared_preferences.dart';
class AccountPage extends StatefulWidget {
  AccountPage({Key? key}) : super(key: key);

  @override
  State<AccountPage> createState() => _AccountPageState();

}
  class _AccountPageState extends State<AccountPage> {
  @override
  Widget build(BuildContext context) {
  return Scaffold(
  body: AccountPageBody(list6:userData),
  /*bottomNavigationBar: FloatingNavBar(
    resizeToAvoidBottomInset: false,
    color: Color.fromRGBO(164, 110, 63, 1),
    selectedIconColor: Colors.black,
    unselectedIconColor: Colors.black.withOpacity(0.8),
    items: [
    FloatingNavBarItem(iconData: Icons.home_rounded, page: LoginPage(), title: 'Home',),
    FloatingNavBarItem(iconData: Icons.favorite_border_rounded, page: AccountPageBody(), title: 'Wishlist'),
    FloatingNavBarItem(iconData: Icons.shopping_cart_outlined, page: AccountPageBody(), title: 'Cart'),
    FloatingNavBarItem(iconData: Icons.person_outline, page: AccountPageBody(), title: 'Account'),
    ],
    horizontalPadding: 10.0,
    hapticFeedback: true,
    showTitle: false,
    ),*/
  );
  }

  List docIDs3=[];
  Map<String,dynamic> userData = {};
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    getDocId();
  }
  Future getDocId() async{
  var snap = await FirebaseFirestore.instance.collection('users').get();
  //List<Map<String, dynamic>> documentData = snapshot.data?.docs.map((e) => e.data() as Map<String, dynamic>?).toList();
  docIDs3 = snap.docs.map((e) => e.data() as Map<String,dynamic>).toList();
  SharedPreferences pref = await SharedPreferences.getInstance();
  String? mobile =  pref.getString("phone");
  docIDs3.forEach((element) {
    if(element["Phone Number"] == mobile){
      userData = element;
    }
  });
  print(docIDs3[0]['Name']);
  setState(() {

  });
  }
  }
