import 'package:flutter/material.dart';
import 'package:pharmacy/Guardian.dart';
import 'package:pharmacy/database_helper.dart';
import 'package:pharmacy/order_details.dart';


class Pharmacy extends StatefulWidget {
  final List<Map<String, dynamic>> ordersList;

  const Pharmacy({required this.ordersList});

  @override
  _PharmacyState createState() => _PharmacyState();
}

class _PharmacyState extends State<Pharmacy> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Received Orders'),
      ),
      body: ListView.builder(
        itemCount: widget.ordersList.length,
        itemBuilder: (context, index) {
          Map<String, dynamic> orderMap = widget.ordersList[index];
          return OrderItemWidget(
            orderId: orderMap['orderId'],
            name: orderMap['name'],
            address: orderMap['address'],
            phone: orderMap['phone'],
            item: orderMap['item'],
            quantity: orderMap['quantity'],
          );
        },
      ),
    );
  }
}

class OrderItemWidget extends StatelessWidget {
  final int orderId;
  final String name;
  final String address;
  final String phone;
  final String item;
  final int quantity;

  OrderItemWidget({
    required this.orderId,
    required this.name,
    required this.address,
    required this.phone,
    required this.item,
    required this.quantity,
  });

  @override
  Widget build(BuildContext context) {
    return ListTile(
      title: Text(
          '\nOrder ID: $orderId\nMedicine name: $name\nAddress: $address\nPhone_Number: $phone\nDosage: $item\nQuantity: $quantity'),
      //subtitle: Text('\nDosage:$item \n$quantity '),
      //trailing: Text(quantity.toString()),
    );
  }
}
