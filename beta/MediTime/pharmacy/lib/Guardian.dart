import 'package:flutter/material.dart';
import 'package:pharmacy/pharmacy.dart';
import 'package:pharmacy/database_helper.dart';
import 'package:pharmacy/order_details.dart';

class Guardian extends StatefulWidget {
  @override
  _GuardianState createState() => _GuardianState();
}

class _GuardianState extends State<Guardian> {
  List<Map<String, dynamic>> _ordersList = [];

  TextEditingController _nameController = TextEditingController();
  TextEditingController _addressController = TextEditingController();
  TextEditingController _phoneController = TextEditingController();
  TextEditingController _itemController = TextEditingController();
  TextEditingController _quantityController = TextEditingController();

  @override
  void dispose() {
    _nameController.dispose();
    _addressController.dispose();
    _phoneController.dispose();
    _itemController.dispose();
    _quantityController.dispose();
    super.dispose();
  }

  void _submitOrder() async {
    // Handle the order submission here
    String name = _nameController.text;
    String address = _addressController.text;
    String phone = _phoneController.text;
    String item = _itemController.text;
    int quantity = int.parse(_quantityController.text);

    // Process the order details (e.g., send to backend, store in database, etc.)
    // You can perform validations, API calls, or any other necessary logic here
    DatabaseHelper databaseHelper = DatabaseHelper();
    int orderId = await databaseHelper.insertOrder({
      'name': name,
      'address': address,
      'phone': phone,
      'item': item,
      'quantity': quantity,
    });

    // Reset the input fields
    _nameController.clear();
    _addressController.clear();
    _phoneController.clear();
    _itemController.clear();
    _quantityController.clear();

    // Store the order details in the list
    _ordersList.add({
      'orderId': orderId,
      'name': name,
      'address': address,
      'phone': phone,
      'item': item,
      'quantity': quantity,
    });

    // Show a success message or navigate to another page
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Order Placed'),
          content: const Text('Your order has been successfully placed!'),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.pop(context);
              },
              child: const Text('OK'),
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Place Order'),
      ),
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: ListView(
          children: <Widget>[
            TextField(
              controller: _nameController,
              decoration: InputDecoration(labelText: 'Medicine Name'),
            ),
            TextField(
              controller: _addressController,
              decoration: InputDecoration(labelText: 'Patient\'s Address'),
            ),
            TextField(
              controller: _phoneController,
              decoration: InputDecoration(labelText: 'Phone no'),
            ),
            TextField(
              controller: _itemController,
              decoration: InputDecoration(labelText: 'Dosage'),
            ),
            TextField(
              controller: _quantityController,
              decoration: InputDecoration(labelText: 'Quantity'),
              keyboardType: TextInputType.number,
            ),
            SizedBox(height: 16.0),
            ElevatedButton(
              onPressed: _submitOrder,
              child: Text('Place Order'),
            ),
            SizedBox(height: 16.0),
            ElevatedButton(
              onPressed: () {
                // Navigate to the Pharmacy page and pass the list of orders
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => Pharmacy(ordersList: _ordersList),
                  ),
                );
              },
              child: Text('View Orders'),
            ),
          ],
        ),
      ),
    );
  }
}
