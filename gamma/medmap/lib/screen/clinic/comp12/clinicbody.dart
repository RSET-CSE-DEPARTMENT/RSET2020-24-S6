import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
class clinicbody extends StatefulWidget {
  const clinicbody({Key? key}) : super(key: key);

  @override
  State<clinicbody> createState() => _clinicbodyState();
}

class _clinicbodyState extends State<clinicbody> {
  late TextEditingController _searchController;

  List<QueryDocumentSnapshot<Map<String, dynamic>>> searchResults = [];
  final FirebaseFirestore firestore = FirebaseFirestore.instance;
  CollectionReference<Map<String, dynamic>> clinicsCollection =
  FirebaseFirestore.instance.collection('clinics');


  String textFieldValue='';
  @override
  void initState() {
    super.initState();
    _searchController = TextEditingController();
  }
  Future<void> _performSearch(String keyword) async {
    try {
      Query<Map<String, dynamic>> specializationQuery =
      clinicsCollection.where('specialization', isEqualTo: keyword);
      List<QuerySnapshot<Map<String, dynamic>>> querySnapshots = await Future.wait([
        specializationQuery.get(),
      ]);

      // Merge the query results into a single list
      List<QueryDocumentSnapshot<Map<String, dynamic>>> documents = [];
      for (var querySnapshot in querySnapshots) {
        documents.addAll(querySnapshot.docs);
      }

      setState(() {
        searchResults = documents;
      });
    } catch (error) {
      print('Failed to perform search: $error');
    }
  }


  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: TextField(
            cursorColor: Colors.black,
            controller: _searchController,
            onChanged: (value) {
              setState(() {
                textFieldValue = value;
              });
              _performSearch(value);
            },
            decoration: InputDecoration(
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(30),
              ),
              focusedBorder: OutlineInputBorder(
                  borderSide: BorderSide(color: Colors.black),
                  borderRadius: BorderRadius.circular(30)),
              hintText: "Enter any specialization",
              suffixIcon: Icon(Icons.search),
            ),
          ),
        ),
        Expanded(
          child: ListView.builder(
            itemCount: searchResults.length,
            itemBuilder: (context, index) {
              final clinic = searchResults[index].data();

              return ListTile(
                title: Text(clinic['name']),
                subtitle: Text(clinic['location']),
                // Display other hospital details as needed
              );
            },
          ),
        ),

      ],
    );
  }

}














