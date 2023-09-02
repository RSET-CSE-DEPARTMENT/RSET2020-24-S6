import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class FoodSearchPage extends StatefulWidget {
  @override
  _FoodSearchPageState createState() => _FoodSearchPageState();
}

class _FoodSearchPageState extends State<FoodSearchPage> {
  String quantity = ''; // Added declaration and initialization
  String location = ''; // Added declaration and initialization
  List<FoodItem> searchResults = [];

  Future<void> searchFood() async { // Removed quantity and location parameters
    // Make API request
    final url = 'https://api.example.com/food?q=$quantity&location=$location';
    final response = await http.get(Uri.parse(url));

    if (response.statusCode == 200) {
      // Parse API response
      final data = json.decode(response.body);
      List<dynamic> results = data['results'];

      setState(() {
        // Update searchResults with parsed data
        searchResults = results
            .map((item) => FoodItem(
          name: item['name'],
          quantity: item['quantity'],
          location: item['location'],
        ))
            .toList();
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Food Search'),
      ),
      body: Column(
        children: [
          // Search input fields and submit button
          TextField(
            decoration: InputDecoration(hintText: 'Quantity'),
            onChanged: (value) {
              setState(() {
                quantity = value; // Update quantity based on input
              });
            },
          ),
          TextField(
            decoration: InputDecoration(hintText: 'Location'),
            onChanged: (value) {
              setState(() {
                location = value; // Update location based on input
              });
            },
          ),
          ElevatedButton(
            onPressed: () {
              searchFood(); // Call searchFood function without parameters
            },
            child: Text('Search'),
          ),
          // Display search results
          Expanded(
            child: ListView.builder(
              itemCount: searchResults.length,
              itemBuilder: (context, index) {
                final foodItem = searchResults[index];
                return ListTile(
                  title: Text(foodItem.name),
                  subtitle: Text('Quantity: ${foodItem.quantity}'),
                  trailing: Text('Location: ${foodItem.location}'),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}

class FoodItem {
  final String name;
  final String quantity;
  final String location;

  FoodItem({required this.name, required this.quantity, required this.location});
}

void main() {
  runApp(MaterialApp(
    home: FoodSearchPage(),
  ));
}

