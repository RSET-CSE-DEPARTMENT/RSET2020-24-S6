import 'package:autoinsight/screens/Maintenance/new.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';

class threeSmaintenanceBody extends StatelessWidget {
  const threeSmaintenanceBody({super.key});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Scaffold(
        resizeToAvoidBottomInset: false,
        appBar: AppBar(
          title: Image.asset("assets/topbar.png",fit: BoxFit.cover,
          ),
          backgroundColor: Colors.black,
        ),
        body: SingleChildScrollView(
          child: Scene(),
        )
      ),
    );
  }
}
