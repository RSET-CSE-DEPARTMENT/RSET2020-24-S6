import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';

class bookrecbody extends StatelessWidget {
  const bookrecbody({super.key});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Scaffold(
        appBar: AppBar(
          title: Image.asset("assets/topbar.png",fit: BoxFit.cover),
          backgroundColor: Colors.black,
        ),
        body: Stack(
          children: [
            Container(
              constraints: const BoxConstraints.expand(),
              decoration: const BoxDecoration(
                image: DecorationImage(
                  image: AssetImage("assets/blackbg.png"),
                  fit: BoxFit.cover,
                ),
              ),
            ),
            //bg

           /*StreamBuilder<QuerySnapshot>(
             stream: FirebaseFirestore.instance.collection('Book').snapshots(),
             builder: (context,snapshot){
               List<Row> BookWidgets = [];
               if (snapshot.hasData){
                 final Books = snapshot.data?.docs.reversed.toList();
                 for(var Book in Books!){
                   final BookWidget = Row(
                     mainAxisAlignment: MainAxisAlignment.spaceBetween,
                     children: [
                       Text(Book['Showroom']),
                     ],
                   );
                   BookWidgets.add(BookWidget);
                 }
               }
               return Expanded(
                 child: ListView(
                   children: BookWidgets ,
                 ),
               );
             }
           ),*/

],
),
),
);
}
}
