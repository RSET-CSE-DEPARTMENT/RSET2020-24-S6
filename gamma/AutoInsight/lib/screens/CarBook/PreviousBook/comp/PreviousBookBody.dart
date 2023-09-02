import 'package:autoinsight/screens/CarBook/PreviousBook/booklist.dart';
import 'package:autoinsight/screens/Contents/contents.dart';
import 'package:autoinsight/screens/FirstScreen/FirstScreen.dart';
import 'package:autoinsight/screens/Settings/settings.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';

class prevbookbody extends StatefulWidget {
  const prevbookbody({super.key});

  @override
  State<prevbookbody> createState() => _prevbookbodyState();
}

class _prevbookbodyState extends State<prevbookbody> {

  final user = FirebaseAuth.instance.currentUser!;

  List<String> docIDs = [];  
  
  Future getdocID() async {
    await FirebaseFirestore.instance.collection('/User/hg9ZeOmC4EsWYw8IqS4U/Book').get().then(
            (snapshot) => snapshot.docs.forEach((document) {
              print(document.reference);
              docIDs.add(document.reference.id);
            }),
      );
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Scaffold(
        appBar: AppBar(
          title: Image.asset("assets/topbar.png", fit: BoxFit.cover),
          backgroundColor: Colors.black,
        ),
        body: Stack(
          children: [
            Container(
              constraints: const BoxConstraints.expand(),
              decoration: const BoxDecoration(color: Colors.black),
            ),
            //bg
            Expanded(
              child: FutureBuilder(
                  future: getdocID(),
                  builder: (context,snapshot) {
                return ListView.builder(
                  itemCount:docIDs.length,
                  itemBuilder: (context,index){
                    return Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: ListTile(
                        tileColor: Colors.grey[200],
                        title: BookList(documentId: docIDs[index]),
                      ),
                    );
                },
                );
              })
            ),
            Container(
              margin: EdgeInsets.only(top: 634),
              height: 70,
              width: 410,
              color: Colors.black,
              child: Row(children: [
                Expanded(
                    child: InkWell(
                        onTap: () {
                          Navigator.push(
                              context,
                              MaterialPageRoute(
                                  builder: (context) => const Contents()));
                        },
                        child: Container(
                          height: 60,
                          width: 60,
                          decoration: const BoxDecoration(
                              image: DecorationImage(
                                  image:
                                      AssetImage("assets/contents_cyan.png"))),
                        )
                        //Icon(Icons.horizontal_split_rounded,color: Colors.white,size: 50)
                        )),
                Expanded(
                    child: InkWell(
                        onTap: () {
                          Navigator.push(
                              context,
                              MaterialPageRoute(
                                  builder: (context) => const FirstScreen()));
                        },
                        child: Container(
                          height: 60,
                          width: 60,
                          decoration: const BoxDecoration(
                              image: DecorationImage(
                                  image: AssetImage("assets/home_cyan.png"),
                                  fit: BoxFit.contain)),
                        )
                        //Icon(Icons.home,color:Colors.white,size: 50)
                        )),
                Expanded(
                    child: InkWell(
                        onTap: () {
                          Navigator.push(
                              context,
                              MaterialPageRoute(
                                  builder: (context) => const SettingsPage()));
                        },
                        child: Container(
                          height: 60,
                          width: 50,
                          decoration: const BoxDecoration(
                              image: DecorationImage(
                                  image: AssetImage("assets/settings_cyan.png"),
                                  fit: BoxFit.contain)),
                        )
                        //Icon(Icons.settings,color:Colors.white,size: 50)
                        )),
              ]),
            ),
          ],
        ),
      ),
    );
  }
}
