import 'package:flutter/material.dart';
import 'package:pharmacy/ReceiverPage.dart';
class SenderPage extends StatelessWidget {
  final String med_name,quantity,location;

  SenderPage({required this.med_name, required this.quantity,required this.location});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Sender Page'),
      ),
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) => ReceiverPage(med_name: med_name, quantity: quantity,location: location),
              ),
            );
          },
          child: Text('Place Order'),
        ),
      ),
    );
  }
}
