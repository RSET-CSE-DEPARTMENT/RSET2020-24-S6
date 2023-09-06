import 'package:flutter/material.dart';
import 'package:medmap/screen/Map/Comp10/Mapbody.dart';

class Map extends StatelessWidget {
  const Map({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Mapbody(),
    );
  }
}
