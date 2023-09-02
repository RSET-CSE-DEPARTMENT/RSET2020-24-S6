import 'package:feed_forward/donor.dart';
import 'package:feed_forward/login.dart';
import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/basic.dart';
import 'package:flutter/src/widgets/framework.dart';
class Profile extends StatefulWidget {
  const Profile({super.key});

  @override
  State<Profile> createState() => _ProfileState();
}

class _ProfileState extends State<Profile> {
  @override
  Widget build(BuildContext context) {
    return Container(
      decoration:BoxDecoration(
          image:DecorationImage(
              image: AssetImage('assets/register page.png'),fit: BoxFit.cover)),
      child: Center(
        child: SingleChildScrollView(
          child: Container(
            padding: EdgeInsets.only(top:80,right:35,left:35),
            child: Column(
              children: [
                SizedBox(
                  height: 115,
                  width: 115,
                  child: Stack(
                    fit: StackFit.expand,
                    clipBehavior: Clip.none,
                    children: [
                      CircleAvatar(
                        backgroundImage: AssetImage('assets/profile.png'),
                        backgroundColor: Color(0XFFC2858C),
                      ),
                      Positioned(
                        right: -12,
                        bottom: 0,
                        child: SizedBox(
                          height: 46,
                          width: 46,
                          child: ElevatedButton(
                              style: ElevatedButton.styleFrom(backgroundColor:Colors.white,shape:RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(50),
                                side: BorderSide(color: Color(0XFFC2858C))
                              ),
                              ),
                              onPressed: (){},
                              child:Image.asset("assets/camera.png"),),
                        ),
                      ),
                    ],
                  ),
                ),
                SizedBox(height: 20,),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 20,vertical: 10),
                      child:Column(
                        children: [
                          ElevatedButton.icon(
                          onPressed: () {

                },
                  style: ElevatedButton.styleFrom(backgroundColor:Color(0XFFC2858C),shape: StadiumBorder()),
                  icon: Icon( // <-- Icon
                    Icons.account_circle_rounded,
                    size: 24.0,
                  ),
                  label: Text('   MY ACCOUNT   ',style: TextStyle(
                      color: Color(0XFF5A082D),
                      fontSize: 27,fontWeight: FontWeight.w200), // <-- Text
                  ),
                ),
              SizedBox(
                height: 30,
              ),
              ElevatedButton.icon(
                style: ElevatedButton.styleFrom(backgroundColor:Color(0XFFC2858C),shape: StadiumBorder()),
                onPressed: () {
                  Navigator.pushNamed(context, 'login');
                },
                icon: Icon( // <-- Icon
                  Icons.lock_reset_outlined,
                  size: 27.0,
                ),
                label: Text(' RE-PASSWORD ',style: TextStyle(
                    color: Color(0XFF5A082D),
                    fontSize: 27,fontWeight: FontWeight.w200), // <-- Text
                ),
              ),
              SizedBox(
                height: 30,
              ),
              ElevatedButton.icon(
                style: ElevatedButton.styleFrom(backgroundColor:Color(0XFFC2858C),shape: StadiumBorder()),
                onPressed: () {
                  Navigator.pushNamed(context, 'login');
                },
                icon: Icon( // <-- Icon
                  Icons.login_outlined,
                  size: 24.0,
                ),
                label:Text('      LOGOUT      ',style: TextStyle(
                    color: Color(0XFF5A082D),
                    fontSize: 27,fontWeight: FontWeight.w200
                )
                ),

              ),
              SizedBox(
                height: 30,) ,
              ],
            ),
          ),

            ],
    ),
          ),
        ),
      ),

    );
  }
}
