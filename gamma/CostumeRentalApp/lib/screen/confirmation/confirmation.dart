
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:corental/screen/confirmation/components/confirmationbody.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

//import 'confirmation_body.dart';
class confirmation extends StatefulWidget {
   confirmation({Key? key,required this.total}) : super(key: key);
  double total;
  @override
  State<confirmation> createState() => _confirmationState();
}

class _confirmationState extends State<confirmation> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title:
        Image.asset("asset/Screenshot 2023-07-06 152757.jpg",fit: BoxFit.cover,),
        backgroundColor: Colors.white,
      ),
      backgroundColor: Colors.white,
      body: confirmation_body(total: widget.total,list7:userData),
    );
  }
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    deleteAllDocuments('cart');
    getDocId4();
  }
  List docIDs3=[];
  Map<String,dynamic> userData = {};
  Future getDocId4() async{
    var snap = await FirebaseFirestore.instance.collection('users').get();
    //List<Map<String, dynamic>> documentData = snapshot.data?.docs.map((e) => e.data() as Map<String, dynamic>?).toList();
    docIDs3 = snap.docs.map((e) => e.data() as Map<String,dynamic>).toList();
    SharedPreferences pref = await SharedPreferences.getInstance();
    String? mobile =  pref.getString("phone");
    docIDs3.forEach((element) {
      if(element["Phone Number"] == mobile){
        userData = element!;
      }
    });
    print(docIDs3[0]['Name']);
    setState(() {

    });
  }
  Future<void> deleteAllDocuments(String collectionPath) async {
    // Get a reference to the collection
    CollectionReference<Map<String, dynamic>> collectionReference =
    FirebaseFirestore.instance.collection(collectionPath);

    // Get all the documents in the collection
    QuerySnapshot<Map<String, dynamic>> querySnapshot =
    await collectionReference.get();

    // Create a batch
    WriteBatch batch = FirebaseFirestore.instance.batch();

    // Add delete operations to the batch
    querySnapshot.docs.forEach((document) {
      batch.delete(document.reference);
    });

    // Commit the batch
    await batch.commit();
  }
}