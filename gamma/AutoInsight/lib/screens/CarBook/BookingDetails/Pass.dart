import 'package:cloud_firestore/cloud_firestore.dart';
String colour="",interior="",showroom="",date="",model="";
class Pass {
  Future<void> recieveCI(String col,String intr)
  async {
    colour=col;
    interior=intr;
  }
  Future<void> receiveSD(String sr,String d)
  async {
    showroom = sr;
    date = d;
  }
  Future<void> receiveModel(String m)
    async {
      model=m;
    }
  Future<void> send()
  async{
    CollectionReference collref = FirebaseFirestore.instance.collection('/Book');
    collref.add({
      'Showroom': showroom,
      'Pdate': date,
      'Colour':colour,
      'Interior':interior,
      'Model':model,
    });
  }
}
