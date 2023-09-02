import 'package:flutter/material.dart';

class DonorSuccess extends StatefulWidget {
  const DonorSuccess({super.key});

  @override
  State<DonorSuccess> createState() => _DonorSuccessState();
}

class _DonorSuccessState extends State<DonorSuccess> {
  @override
  Widget build(BuildContext context) {
    return Container(
        decoration:BoxDecoration(
        image:DecorationImage(
        image: AssetImage('assets/Donor Success.png'),fit: BoxFit.cover)),
      child:Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
          ElevatedButton(
          onPressed: () {
    Navigator.pushNamed(context, 'donor');
    },
      child: Icon( //<-- SEE HERE
        Icons.arrow_back_ios_new,
        color: Colors.black,
        size: 20,
      ),
      ) ,
    ],
      ),
    );
  }
}
