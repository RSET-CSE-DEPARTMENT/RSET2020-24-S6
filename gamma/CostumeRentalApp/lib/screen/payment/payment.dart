import 'package:corental/screen/payment/components/paymentbody.dart';
import 'package:flutter/material.dart';

class Payment extends StatelessWidget {
   Payment({Key? key,required this.total}) : super(key: key);
   double total;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title:
        Image.asset("asset/Screenshot 2023-07-06 152757.jpg",fit: BoxFit.cover,),
        backgroundColor: Colors.white,
      ),
      backgroundColor: Colors.white,
      body: paymentbody(total:total),
    );
  }
}
