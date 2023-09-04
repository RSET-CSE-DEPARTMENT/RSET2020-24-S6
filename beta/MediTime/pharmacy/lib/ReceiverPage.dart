import 'package:flutter/material.dart';

class ReceiverPage extends StatelessWidget {
  //final String message;
  final String med_name,quantity,location;

  ReceiverPage({required this.med_name, required this.quantity,required this.location});

  @override
  Widget build(BuildContext context) {
    return Row(
     /* appBar: AppBar(
        title: Text('Receiver Page'),
      ),*/
     // body:
     children: <Widget>[
        Text( 'Medicine Name: $med_name ,\n  Quantity: $quantity ,\n Location:  $location',
          style: TextStyle(fontSize: 18),),
        Text( 'Medicine Name: $med_name ,\n  Quantity: $quantity ,\n Location:  $location',
          style: TextStyle(fontSize: 18),),
        Text( 'Medicine Name: $med_name ,\n  Quantity: $quantity ,\n Location:  $location',
          style: TextStyle(fontSize: 18),),
      ],
      /* Text(
          'Medicine Name: $med_name ,\n  Quantity: $quantity ,\n Location:  $location',
          style: TextStyle(fontSize: 18),
        ),
         Text('Medicine Name: $med_name ,\n  Quantity: $quantity ,\n Location:  $location',
          style: TextStyle(fontSize: 18),)*/
      );
  }
}
