//import 'package:corental/screen/location/components/locationbody.dart';
import 'package:corental/screen/location/componets/locationbody.dart';
import 'package:flutter/material.dart';

class Location extends StatelessWidget {
  const Location({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: LocationBody(),
    );
  }
}