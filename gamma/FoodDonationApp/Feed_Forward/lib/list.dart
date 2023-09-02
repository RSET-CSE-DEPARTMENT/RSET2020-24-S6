import 'package:flutter/material.dart';
import  'package:http/http.dart' as http;
import 'dart:convert';
class Volunteer extends StatefulWidget {
  const Volunteer({super.key});

  @override
  State<Volunteer> createState() => _VolunteerState();
}

class _VolunteerState extends State<Volunteer> {
 Future getContactData() async{
   var url="http://192.168.156.96/api_feedforward/signin/volunteer.php";
   var response =await http.get(Uri.parse(url));
   return json.decode(response.body);
 }
  @override
  Widget build(BuildContext context) {
    return  Container(
      decoration:BoxDecoration(
          image:DecorationImage(
              image: AssetImage('assets/register page.png'),fit: BoxFit.cover)),
      child: Scaffold(
        floatingActionButton: FloatingActionButton(
          child: Icon(Icons.add),
          onPressed: (){
            Navigator.push(context,MaterialPageRoute(builder: (context)=>Volunteer()),) ;         },
        ),
         body: FutureBuilder(
           future: getContactData(),
             builder: (context,snapshot){
             if(snapshot.hasError)
               print(snapshot.error);
             return snapshot.hasData? ListView.builder(
                 itemCount: snapshot.data.length,
                 itemBuilder: (context,index){
              List list=snapshot.data;
               return ListTile(
                 title: Text(list[index]['name']),
                  subtitle:Text(list[index]['location']),
               );
    }
             ):Center(child: CircularProgressIndicator(),);

             },
         ),
        ),
      
    );
  }
}
