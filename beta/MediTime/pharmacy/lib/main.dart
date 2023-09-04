import 'package:flutter/material.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:pharmacy/Guardian.dart';
import 'package:pharmacy/pharmacy.dart';
import 'package:pharmacy/ReceiverPage.dart';
import 'package:pharmacy/SenderPage.dart';
import 'package:pharmacy/database_helper.dart';
import 'package:pharmacy/order_details.dart';

void main() {
  runApp(MyApp());
}



/*void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Pharmacy App',
      home: HomePage(),
      routes: {
        '/guardian': (context) => Guardian(),
        '/pharmacy': (context) => Pharmacy(orderId: orderId),
      },
    );
  }
}

class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Pharmacy App'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            ElevatedButton(
              onPressed: () {
                Navigator.pushNamed(context, '/guardian');
              },
              child: Text('Guardian'),
            ),
            ElevatedButton(
              onPressed: () {
                Navigator.pushNamed(context, '/pharmacy');
              },
              child: Text('Pharmacy'),
            ),
          ],
        ),
      ),
    );
  }
}*/

class MyApp extends StatelessWidget {
  // Create an instance of FlutterLocalNotificationsPlugin
  FlutterLocalNotificationsPlugin flutterLocalNotificationsPlugin =
      FlutterLocalNotificationsPlugin();
   //  String message;
  // MyApp({required this.message});

  @override
  Widget build(BuildContext context) {
    // Initialize the plugin in the build method
   // initializeNotifications();
   // displayNotification();
     //final String med_name="hello", quantity="10",location="kochi";
   // String message="hello";
    return MaterialApp(
      title: 'Notification App',
      home:Guardian(),
      // SenderPage(med_name: med_name, quantity: quantity,location: location,),
     /*  Scaffold(
        appBar: AppBar(
          title:const Text('Order Details'),
        ),
        body: Center(
         // child: Text('Notification will be displayed here.'),
         child: ElevatedButton(onPressed: (){
           /* Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) => ReceiverPage(message: message),
              )
            )*/
           // displayNotification();
         /*  Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) => SenderPage(message: message),
              ),
            );*/
           SenderPage(message: message);
           
          },
          child: const Text("Show notifications"),*/
          );
          //),
          
      //),

      //);
  }

  // Initialize the notification plugin
  /*void initializeNotifications() async {
    const AndroidInitializationSettings initializationSettingsAndroid =
        AndroidInitializationSettings('app_icon');

    final InitializationSettings initializationSettings =
        InitializationSettings(android: initializationSettingsAndroid);

    await flutterLocalNotificationsPlugin.initialize(initializationSettings);
  }*/

 


/*void displayNotification() async {
  const AndroidNotificationDetails androidPlatformChannelSpecifics =
      AndroidNotificationDetails(
    'channel_id',
    'channel_name',
    'channel_description',
    importance: Importance.max,
    priority: Priority.high,
  );*/

 /* const NotificationDetails platformChannelSpecifics =
      NotificationDetails(android: androidPlatformChannelSpecifics);

  await flutterLocalNotificationsPlugin.show(
    0,
    'Notification Title',
    'Notification Body',
    platformChannelSpecifics,
  );
}*/

 /*ElevatedButton(
  onPressed: () {
    displayNotification();
  },
  child : const Text('Show Notification'),
 )*/

}


/*class SenderPage extends StatelessWidget {
  final String message;

  SenderPage({required this.message});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Sender Page'),
      ),
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) => ReceiverPage(message: message),
              ),
            );
          },
          child: Text('Send Message'),
        ),
      ),
    );
  }
}*/







