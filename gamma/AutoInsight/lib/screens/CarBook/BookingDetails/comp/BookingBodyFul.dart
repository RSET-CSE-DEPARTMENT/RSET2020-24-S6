import 'package:autoinsight/screens/CarBook/BookingDetails/Pass.dart';
import 'package:autoinsight/screens/CarBook/Successful/BookingSuccess.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class BookingBodyFul extends StatefulWidget {
  const BookingBodyFul({super.key});

  @override
  State<BookingBodyFul> createState() => _BookingBodyFulState();
}

class _BookingBodyFulState extends State<BookingBodyFul> {
  TextEditingController dateController = TextEditingController();

  List<String> showrooms = ['Select Showroom','EVM Autokraft-Kochi','EVM Autokraft-Calicut'];
  String? selectedShowroom = 'Select Showroom';

  Pass obj = new Pass();

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
          title: Image.asset("assets/topbar.png",fit: BoxFit.cover),
          backgroundColor: Colors.black,
        ),
        body: Stack(
          children: [
            Container(
              constraints: const BoxConstraints.expand(),
              decoration: const BoxDecoration(
                image: DecorationImage(
                  image: AssetImage("assets/bg.png"),
                  fit: BoxFit.cover,
                ),
              ),
            ),
            //bg
            Positioned(top: 50,
              child: Container(
                width: 360,
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
            //showroom textbox
            Container(
              // color: Colors.white,
              margin: EdgeInsets.only(top: 160),
                padding:const EdgeInsets.all(15),
                height:50,
                decoration: BoxDecoration(
                  border: Border.all(color: Colors.white.withOpacity(0.24)),
                    borderRadius: BorderRadius.circular(40)),
                child:TextField(
                cursorColor: Colors.white,
                textAlign: TextAlign.center,
                style: TextStyle(
                  color: Colors.white60
                ),
                controller: dateController, //editing controller of this TextField
                decoration: const InputDecoration(
                  icon: Icon(Icons.calendar_today),
                  alignLabelWithHint: false,
                  hintText: 'Enter date',
                  hintStyle: TextStyle(color: Colors.white24),
              ),
              readOnly: true,  // when true user cannot edit text
              onTap: () async {
                DateTime? pickedDate = await showDatePicker(
                    context: context,
                    initialDate: DateTime.now(), //get today's date
                    firstDate: DateTime.now(),
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

            Container(margin: EdgeInsets.only(top: 12,left: 5),
              child: Text('Select Showroom',
                style: TextStyle(
                  fontSize: 25,
                  fontFamily: 'PoppinsReg',
                  color: Colors.white,
                ),
              ),
            ),
            //showroom text
            Container(margin: EdgeInsets.only(top: 117,left: 5),
              child: Text('Select Delivery Date',
                style: TextStyle(
                  fontSize: 25,
                  fontFamily: 'PoppinsReg',
                  color: Colors.white,
                ),
              ),
            ),
            // date text
            Container(margin: EdgeInsets.only(top: 230,left: 5),
              child: Text('*Note: Booking payment instructions will be given by the executive.',
                style: TextStyle(
                  fontSize: 18,
                  fontFamily: 'PoppinsLight',
                  color: Colors.white,
                ),
              ),
            ),
            //payment text
            Positioned(top: 330, left: 180,
              child: InkWell(
                onTap: (){
                  if (selectedShowroom == 'Select Showroom'||dateController.text == 'Enter date') {
                    ScaffoldMessenger.of(context).showSnackBar(SnackBar(
                      content: Text('Please fill all the fields .'), ));
                    print("Incomplete.");
                    return;
                  }
                  obj.receiveSD(selectedShowroom.toString(), dateController.text);
                  obj.send();
                  if(selectedShowroom != 'Select Showroom'||dateController.text != 'Enter date') {
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
            //next arrow
          ],
        ),
      ),
    );
  }
}
