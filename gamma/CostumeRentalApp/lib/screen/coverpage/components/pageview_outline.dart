import 'package:flutter/material.dart';

class PageViewOutline extends StatelessWidget {
   PageViewOutline({
    Key? key,required this.desc,required this.head,required this.image
  }) : super(key: key);
  String image="",head="",desc="";

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(
          height: 520,
          width: 500,
          decoration: BoxDecoration(color: Colors.brown,borderRadius:
          BorderRadius.only(topLeft: Radius.circular(10),topRight: Radius.circular(10)),
              image: DecorationImage(image: AssetImage(image),
                  fit: BoxFit.cover
              )),
        ),
        Container(
          //padding: EdgeInsets.symmetric(vertical: 30,horizontal: 50),
          child: Column(
            children: [
              //SizedBox(height: 30,),
              Text(head,
                style: TextStyle(fontSize: 23,fontStyle: FontStyle.italic,fontWeight: FontWeight.w600,
                    color: Color.fromRGBO(128, 71, 28,1)),),
              SizedBox(height: 30,),
              Text(desc,
                textAlign: TextAlign.center,style: TextStyle(fontSize: 15,fontWeight: FontWeight.w500),),

            ],
          ),
        )
      ],
    );
  }
}
