import 'package:corental/screen/coverpage/components/pageview_outline.dart';
import 'package:corental/screen/loginpage/loginpage.dart';
import 'package:flutter/material.dart';


class CoverPageBody extends StatefulWidget {
  CoverPageBody({Key? key}) : super(key: key);

  @override
  State<CoverPageBody> createState() => _CoverPageBodyState();
}

class _CoverPageBodyState extends State<CoverPageBody> {
  PageController pagecontroller = PageController();

  int current_index=0;
  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Expanded(
          child: PageView(controller: pagecontroller,
            onPageChanged: (value) {
              setState(() {
                current_index=value;
              });
            },
            children: [
              PageViewOutline(image: "asset/c1.jpg",head: "Buy less \n      Wear more \n            Start renting",
                desc: "Elegance - The Quality of being graceful and stylish in appearance, manner or style "),
              PageViewOutline(image: "asset/c2.jpg",head: "",
                desc: "You gotta have style. It helps you get down the stairs. It helps you get up in the morning. It’s a way of life. Without it, you’re nobody. I’m not talking about lots of clothes. —Diana Vreeland",),
              PageViewOutline(image: "asset/c3.jpg",head: "",
                desc: "Don't be into trends. Don't make fashion own you, but you decide what you are, what you want to express by the way you dress and the way to live. —Gianni Versace"),
            ],
          ),
        ),
        Container(height: 10,
          child: ListView.builder(shrinkWrap: true,physics: NeverScrollableScrollPhysics(),scrollDirection: Axis.horizontal,
              itemCount:3,itemBuilder: ((context, index) {
                return Container(width: 10,height: 10,margin: EdgeInsets.only(left: 10),
                  decoration: BoxDecoration(shape: BoxShape.circle,
                      color: current_index==index? Color.fromRGBO(158, 117, 85,1): Color.fromRGBO(128, 71, 28,1)),);
                //SizedBox(width: 10,),
              })
          ),
        ),
        SizedBox(height: 20,),
        current_index==0?Container(margin: EdgeInsets.only(left: 50),
        width: 100,height: 30,
        child: InkWell(onTap: (){Navigator.push(context, MaterialPageRoute(builder: (context) => LoginPage(),));},
            child: Text("Skip>>",style: TextStyle(fontSize: 20,color: Color.fromRGBO(149,125,96,1)),)),):Container(height: 1,),
        current_index==2?Container(margin: EdgeInsets.only(bottom: 25),
          width: 45,
          height: 45,
          decoration: BoxDecoration(borderRadius: BorderRadius.circular(30),
              color: Color.fromRGBO(158, 117, 85,1)),
          //color: Color.fromRGBO(73, 133, 83, 1),
          child: IconButton(onPressed: (){
          Navigator.push(context, MaterialPageRoute(builder: (context)=> LoginPage(),));
          },icon: Icon(Icons.arrow_forward_outlined),),
        )
            :Container(height: 45,)
      ],
    );
  }
}
