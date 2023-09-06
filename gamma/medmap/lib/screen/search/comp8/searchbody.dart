import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
class searchbody extends StatefulWidget {
  const searchbody({Key? key}) : super(key: key);

  @override
  State<searchbody> createState() => _searchbodyState();
}

class _searchbodyState extends State<searchbody> {
  late TextEditingController _searchController;

  List<QueryDocumentSnapshot<Map<String, dynamic>>> _searchResults = [];
  final FirebaseFirestore firestore = FirebaseFirestore.instance;
  CollectionReference<Map<String, dynamic>> hospitalsCollection =
  FirebaseFirestore.instance.collection('hospitals');


  String textFieldValue='';
  Map<String, dynamic>? selectedHospital;
  @override
  void initState() {
    super.initState();
    _searchController = TextEditingController();
  }
  Future<void> performSearch(String keyword) async {
    try {
      Query<Map<String, dynamic>> nameQuery =
      hospitalsCollection.where('name', isEqualTo: keyword);
      Query<Map<String, dynamic>> locationQuery =
      hospitalsCollection.where('location', isEqualTo: keyword);
      Query<Map<String, dynamic>> specializationsQuery =
      hospitalsCollection.where('specializations', arrayContains: keyword);
      Query<Map<String, dynamic>> insurancePoliciesQuery =
      hospitalsCollection.where('insurance_policies', arrayContains: keyword);
      Query<Map<String, dynamic>> mriQuery =
      hospitalsCollection.where(keyword, isEqualTo: true);
      List<QuerySnapshot<Map<String, dynamic>>> querySnapshots = await Future.wait([
        nameQuery.get(),
        locationQuery.get(),
        specializationsQuery.get(),
        insurancePoliciesQuery.get(),
        mriQuery.get(),
      ]);

      // Merge the query results into a single list
      List<QueryDocumentSnapshot<Map<String, dynamic>>> documents = [];
      for (var querySnapshot in querySnapshots) {
        documents.addAll(querySnapshot.docs);
      }

      setState(() {
        _searchResults = documents;
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
              performSearch(value);
            },
            decoration: InputDecoration(
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(30),
              ),
              focusedBorder: OutlineInputBorder(
                  borderSide: BorderSide(color: Colors.black),
                  borderRadius: BorderRadius.circular(30)),
              hintText: "Enter any keyword",
              suffixIcon: Icon(Icons.search),
            ),
          ),
        ),
        Expanded(
          child: ListView.builder(
            itemCount: _searchResults.length,
            itemBuilder: (context, index) {
              final hospital = _searchResults[index].data();

              return InkWell(
                child: ListTile(
                  title: Text(hospital['name']),
                  subtitle: Text(hospital['location']),
                  // Display other hospital details as needed
                ),
                onTap:(){ setState(() {
                  selectedHospital = hospital;
                });
                _showHospitalDetailsBottomSheet(context);
                },
              );
            },
          ),
        ),
        if (selectedHospital != null) ...[
          // Display the hospital details section if a hospital is selected

        ],
      ],
    );
  }
  void _showHospitalDetailsBottomSheet(BuildContext context) {
    showModalBottomSheet(
      context: context,
      builder: (BuildContext context) {
        return Container(
          decoration: BoxDecoration(borderRadius: BorderRadius.vertical(top: Radius.circular(20))),
          child: Container(

            padding: EdgeInsets.symmetric(horizontal: 16,vertical: 30),
            color: Colors.grey[200],
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('${selectedHospital!['name']}',
                  style: TextStyle(
                    fontWeight: FontWeight.w900,
                    fontSize: 25,
                  ),
                ),
                SizedBox(height: 8),

                Text('${selectedHospital!['description']}',style: TextStyle(color: Colors.black54),),

                Container(
                  margin: EdgeInsets.only(top: 10),
                  child: Row(
                    children: [
                      Icon(Icons.location_on,color: Colors.black,),
                      SizedBox(width: 10),
                      Text('${selectedHospital!['address']}'),
                    ],
                  ),
                ),
                Container(
                  margin: EdgeInsets.only(top: 10),
                  child: Row(
                    children: [
                      Icon(Icons.phone,color: Colors.black,),
                      SizedBox(width: 10),
                      Text('${selectedHospital!['contact']}'),
                    ],
                  ),
                ),
                Container(
                  margin: EdgeInsets.only(top: 10),
                  child: Row(
                    children: [
                      Icon(Icons.access_time_rounded,color: Colors.black,),
                      SizedBox(width: 10),
                      Text('${selectedHospital!['time']}'),
                    ],
                  ),
                ),
                Container(
                  margin: EdgeInsets.only(top: 10),
                  child: Row(
                    children: [
                      Icon(Icons.link_outlined,color: Colors.black,),
                      SizedBox(width: 10),
                      Text('${selectedHospital!['website']}'),
                    ],
                  ),
                ),
                Container(
                  margin: EdgeInsets.only(top: 10),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children:[
                  Text('Specializations:',style: TextStyle(fontWeight: FontWeight.w600,fontSize: 15),),
                  SizedBox(height: 10,),
                  Text('${selectedHospital!['specializations']}'),
                    ],
          ),
                ),
                Container(
                  margin: EdgeInsets.only(top: 10),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children:[
                      Text('Insurance Policies:',style: TextStyle(fontWeight: FontWeight.w600,fontSize: 15),),
                      SizedBox(height: 10,),
                      Text('${selectedHospital!['insurance_policies']}'),
                    ],
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}














