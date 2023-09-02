import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';

class BookList extends StatelessWidget {
  final String documentId;
  
  BookList({required this.documentId});
  
  @override
  Widget build(BuildContext context) {
    CollectionReference users = FirebaseFirestore.instance.collection('/User/hg9ZeOmC4EsWYw8IqS4U/Book');

    return FutureBuilder<DocumentSnapshot>(
      future: users.doc(documentId).get(),
      builder: ((context,snapshot) {
      if(snapshot.connectionState == ConnectionState.done){
        Map<String, dynamic> data = snapshot.data!.data() as Map<String, dynamic>;
        return
            Container(
              height: 150,
              width: 400,
              decoration: BoxDecoration(
                color: Colors.black, borderRadius: BorderRadius.circular(40),border: Border.all(color: Color(0xff18e2e2))),
              child: Container(margin: EdgeInsets.only(left: 20,top: 10),
                child: Text('Model: ${data['Model']}\n'
                    'Showroom: ${data['Showroom']}\n'
                    'Colour: ${data['Colour']}\n'
                    'Interior: ${data['Interior']}\n'
                    'Date: ${data['Pdate']}\n',
                  style: TextStyle(color: Colors.white,
                    fontFamily: 'PoppinsSB'
                  ),),
              ),
            );
          //Text('Model: ${data['Model']}');
      }
      return Container(
        height: 150,
        width: 400,
        decoration: BoxDecoration(
            color: Colors.black, borderRadius: BorderRadius.circular(40),border: Border.all(color: Color(0xff18e2e2))),
        child: Container(margin: EdgeInsets.only(left: 20,top: 10),
          child: Text('loading...',
            style: TextStyle(color: Colors.white,
                fontFamily: 'PoppinsSB'
            ),),
        ),
      );
    }
    ),
    );
  }
}
