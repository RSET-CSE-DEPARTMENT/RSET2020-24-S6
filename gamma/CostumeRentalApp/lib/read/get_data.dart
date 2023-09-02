import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';

class GetData extends StatelessWidget {

  final String documentId;
  GetData({required this.documentId});
  @override
  Widget build(BuildContext context) {
    CollectionReference products= FirebaseFirestore.instance.collection('products');
    return FutureBuilder<DocumentSnapshot>(
      builder: ((context, snapshot){
        if(snapshot.connectionState==ConnectionState.done){
          Map<String,dynamic> data=
              snapshot.data!.data() as Map<String,dynamic>;
          return Text('Product Name: ${data['Product Name']}');
        }
        return Text('loading');
        }),
    );
  }
}

  
