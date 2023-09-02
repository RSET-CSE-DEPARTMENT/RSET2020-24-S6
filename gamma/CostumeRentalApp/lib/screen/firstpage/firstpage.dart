import 'package:corental/screen/accountpage/accountpage.dart';
import 'package:corental/screen/cart/cart.dart';
import 'package:corental/screen/firstpage/components/firstpagebody.dart';
import 'package:floating_navbar/floating_navbar_item.dart';
import 'package:flutter/material.dart';
import 'package:floating_navbar/floating_navbar.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class HomePage extends StatefulWidget {
   HomePage({Key? key}) : super(key: key);

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      //body: HomePageBody(),
      bottomNavigationBar: FloatingNavBar(
        resizeToAvoidBottomInset: false,
        color: Color.fromRGBO(164, 110, 63, 1),
        selectedIconColor: Colors.black,
        unselectedIconColor: Colors.black.withOpacity(0.8),
        items: [
          FloatingNavBarItem(
            iconData: Icons.home_rounded, page: HomePageBody(list5:docIDs5), title: 'Home',),
          //FloatingNavBarItem(iconData: Icons.favorite_border_rounded, page: HomePageBody(), title: 'Wishlist'),
          //FloatingNavBarItem(iconData: Icons.shopping_cart_outlined, page: Cart(), title: 'Cart'),
          FloatingNavBarItem(iconData: Icons.person_outline,
              page: AccountPage(),
              title: 'Account'),
        ],
        horizontalPadding: 10.0,

        hapticFeedback: true,
        showTitle: false,
      ),
    );
  }

  List docIDs5= [];
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    getDocId();
  }
  Future getDocId() async {
    var snap = await FirebaseFirestore.instance.collection('products').get();
    //List<Map<String, dynamic>> documentData = snapshot.data?.docs.map((e) => e.data() as Map<String, dynamic>?).toList();
    docIDs5= snap.docs.map((e) => e.data() as Map<String, dynamic>).toList();
    setState(() {

    });
  }
}