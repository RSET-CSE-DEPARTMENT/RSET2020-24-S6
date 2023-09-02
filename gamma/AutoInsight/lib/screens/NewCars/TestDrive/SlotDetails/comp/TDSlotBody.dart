import 'package:autoinsight/screens/CarBook/Successful/BookingSuccess.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
class TDSlotBody extends StatefulWidget {
  const TDSlotBody({super.key});

  @override
  State<TDSlotBody> createState() => _TDSlotBodyState();
}

class _TDSlotBodyState extends State<TDSlotBody> {
  TextEditingController dateController = TextEditingController();

  List<String> items = ['Select Time','10:00am - 12:00pm','2:00pm - 5:00pm'];
  String? selectedItem = 'Select Time';

  List<String> showrooms = ['Select Showroom','EVM Autokraft-Kochi','EVM Autokraft-Calicut'];
  String? selectedShowroom = 'Select Showroom';

  List<String> models = ['Select Model','X3 Series','3 Series','X6 Series','I7 Series'];
  String? selectedModel = 'Select Model';

  @override
  void initState() {
    dateController.text = ""; //set the initial value of text field
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Center(
        child: Scaffold(
          appBar: AppBar(
            title: Image.asset("assets/topbar.png",fit: BoxFit.cover,),
            backgroundColor: Colors.black,
          ),
          body: Stack(
            children: [
              Container(color: Colors.black),
              Container(margin: EdgeInsets.only(top: 50,left: 100),
                height: 100, width: 100,
                child: Image.asset("assets/mLogo.png",fit: BoxFit.contain,),
              ),
              //mLogo
              Container(margin: EdgeInsets.only(top: 50,left: 190),
                height: 100, width: 100,
                child: Image.asset("assets/bmwlogo.png",fit: BoxFit.cover,),
              ),
              //bmwLogo
              Positioned(top: 170,
                child: Container(
                  margin: EdgeInsets.only(left: 10),
                  width: 350,
                  decoration: BoxDecoration(border: Border.all(color: Colors.white24,),
                      borderRadius: BorderRadius.circular(40)),
                  child: DropdownButton<String>(
                    value: selectedModel,
                    isExpanded: true,
                    borderRadius: BorderRadius.circular(40),
                    dropdownColor: Colors.black,
                    items: models.map((model) => DropdownMenuItem<String>(
                      value: model,
                      child: Text(model,
                          style: TextStyle(
                              fontSize: 22,
                              color: Colors.white60
                          )),
                    ))
                        .toList(),
                    onChanged: (model) => setState(() => selectedModel = model),
                  ),
                ),
              ),
              Positioned(top: 270,
                child: Container(
                  width: 350,
                  margin: EdgeInsets.only(left: 10),
                  decoration: BoxDecoration(border: Border.all(color: Colors.white24,),
                      borderRadius: BorderRadius.circular(40)),
                  child: DropdownButton<String>(
                    value: selectedShowroom,
                    isExpanded: true,
                    borderRadius: BorderRadius.circular(40),
                    dropdownColor: Colors.black,
                    items: showrooms.map((showroom) => DropdownMenuItem<String>(
                      value: showroom,
                      child: Text(showroom,
                          style: TextStyle(
                              fontSize: 22,
                              color: Colors.white60
                          )),
                    ))
                        .toList(),
                    onChanged: (showroom) => setState(() => selectedShowroom = showroom),
                  ),
                ),
              ),
              Container(
                // color: Colors.white,
                margin: EdgeInsets.only(top: 370,left: 10),
                padding:const EdgeInsets.all(15),
                height:50,
                width: 350,
                decoration: BoxDecoration(
                    border: Border.all(color: Colors.white.withOpacity(0.24)),
                    borderRadius: BorderRadius.circular(40)),
                child:TextField(
                  controller: dateController,
                  cursorColor: Colors.white,
                  textAlign: TextAlign.center,
                  style: TextStyle(
                      color: Colors.white60
                  ),
                  decoration: const InputDecoration(
                    icon: Icon(Icons.calendar_today),
                    hintText: 'Enter date',
                    hintStyle: TextStyle(color: Colors.white60),
                  ),
                  readOnly: true,  // when true user cannot edit text
                  onTap: () async {
                    DateTime? pickedDate = await showDatePicker(
                        context: context,
                        initialDate: DateTime.now(), //get today's date
                        firstDate: DateTime.now(), //DateTime.now() - not to allow to choose before today.
                        lastDate: DateTime(2101)
                    );

                    if(pickedDate != null ){
                      print(pickedDate);  //get the picked date in the format => 2022-07-04 00:00:00.000
                      String formattedDate = DateFormat('dd-MM-yyyy').format(pickedDate); // format date in required form here we use yyyy-MM-dd that means time is removed
                      print(formattedDate);
                      setState(() {
                        dateController.text = formattedDate; //set foratted date to TextField value.
                      });
                    }else{
                      print("Date is not selected");
                    }
                  },
                ),
              ),
              //date picker

              Container(margin: EdgeInsets.only(top: 130,left: 5),
                child: Text('Select Model',
                  style: TextStyle(
                    fontSize: 25,
                    fontFamily: 'PoppinsReg',
                    color: Colors.white,
                  ),
                ),
              ),
              Container(margin: EdgeInsets.only(top: 230,left: 5),
                child: Text('Select Showroom',
                  style: TextStyle(
                    fontSize: 25,
                    fontFamily: 'PoppinsReg',
                    color: Colors.white,
                  ),
                ),
              ),
              //showroom text
              Container(margin: EdgeInsets.only(top: 330,left: 5),
                child: Text('Select Preferred TD Date',
                  style: TextStyle(
                    fontSize: 25,
                    fontFamily: 'PoppinsReg',
                    color: Colors.white,
                  ),
                ),
              ),
              // date text
              Container(margin: EdgeInsets.only(top: 430,left: 5),
                child: Text('Select Preferred TD Time',
                  style: TextStyle(
                    fontSize: 25,
                    fontFamily: 'PoppinsReg',
                    color: Colors.white,
                  ),
                ),
              ),
              Positioned(top: 600, left: 155,
                child: InkWell(
                  onTap: (){
                    if (selectedModel == 'Select Model'||selectedShowroom == 'Select Showroom'||dateController.text == 'Enter date'||selectedItem == 'Select Time') {
                      ScaffoldMessenger.of(context).showSnackBar(SnackBar(
                        content: Text('Please fill all the fields .'), ));
                      print("Incomplete.");
                      return;
                    }
                    CollectionReference collref = FirebaseFirestore.instance.collection('/Test');
                    collref.add({
                      'Model': selectedModel,
                      'Showroom': selectedShowroom,
                      'Date': dateController.text,
                      'Time': selectedItem,
                    });
                    if(selectedModel != 'Select Model'||selectedShowroom != 'Select Showroom'||dateController.text != 'Enter date'||selectedItem != 'Select Time') {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                            builder: (context) => const BookingSucces()),
                      );
                    };
                  },
                  child: Container(height: 50,width: 50,
                    //margin: EdgeInsets.only(top: 420,left: 310),
                    decoration: const BoxDecoration(
                        image: DecorationImage(
                            image: AssetImage("assets/nextarrow.png"),
                            fit: BoxFit.contain)
                    ),
                  ),
                ),
              ),
              Positioned(top: 470,
                child: Container(
                  margin: EdgeInsets.only(left: 10),
                  width: 350,
                  decoration: BoxDecoration(border: Border.all(color: Colors.white24,),
                  borderRadius: BorderRadius.circular(40)),
                  child: DropdownButton<String>(
                    value: selectedItem,
                    isExpanded: true,
                    borderRadius: BorderRadius.circular(40),
                    dropdownColor: Colors.black,
                    items: items.map((item) => DropdownMenuItem<String>(
                      value: item,
                      child: Text(item,
                          style: TextStyle(
                          fontSize: 22,
                        color: Colors.white60
                      )),
                    ))
                        .toList(),
                    onChanged: (item) => setState(() => selectedItem = item),
                  ),
                ),
              ),
              //arrow next
            ],
          ),
        )

    );
  }
}