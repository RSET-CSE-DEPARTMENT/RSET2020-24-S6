import 'package:autoinsight/screens/Maintenance/comp/X3Scene.dart';
import 'package:flutter/material.dart';

class X3MaintenanceBody extends StatelessWidget {
  const X3MaintenanceBody({super.key});

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
            child: X3Scene(),
          )
      ),
    );
  }
}
