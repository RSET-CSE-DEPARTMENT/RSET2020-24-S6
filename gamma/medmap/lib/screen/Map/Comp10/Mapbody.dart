import 'dart:async';

import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class Mapbody extends StatefulWidget {
  const Mapbody({Key? key}) : super(key: key);

  @override
  State<Mapbody> createState() => _MapbodyState();
}

class _MapbodyState extends State<Mapbody> {
  GoogleMapController? mapController;
  List<Marker> markers = [];


  static const double defaultLatitude = 9.993756239481792;
  static const double defaultLongitude = 76.35897065866172;

  Future<void> _fetchNearbyHospitals() async {
    final String apiKey = "AIzaSyBPyMMBv-El4Yaw_BV4pLOfZzAEQeltHlM"; // Replace with your actual Google Maps API key

    final String url =
        "https://maps.googleapis.com/maps/api/place/nearbysearch/json" +
            "?location=$defaultLatitude,$defaultLongitude" +
            "&radius=5000" +
            "&type=hospital" +
            "&key=$apiKey";

    final response = await http.get(Uri.parse(url));

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      final List<dynamic> results = data["results"];

      setState(() {
        markers = results.map((result) {
          final lat = result["geometry"]["location"]["lat"];
          final lng = result["geometry"]["location"]["lng"];

          return Marker(
            markerId: MarkerId(result["place_id"]),
            position: LatLng(lat, lng),
            infoWindow: InfoWindow(
              title: result["name"],
              snippet: result["vicinity"],
            ),
          );
        }).toList();
      });

      if (mapController != null) {
        mapController!.animateCamera(
          CameraUpdate.newLatLngBounds(
            LatLngBounds(
              southwest: LatLng(defaultLatitude - 0.01, defaultLongitude - 0.01),
              northeast: LatLng(defaultLatitude + 0.01, defaultLongitude + 0.01),
            ),
            50.0,
          ),
        );
      }
    } else {
      print('Error fetching nearby hospitals');
    }
  }

  @override
  Widget build(BuildContext context) {
    return GoogleMap(
      onMapCreated: (controller) {
        setState(() {
          mapController = controller;
        });

        _fetchNearbyHospitals();
      },
      initialCameraPosition: CameraPosition(
        target: LatLng(defaultLatitude, defaultLongitude), // Set the default location
        zoom: 12.0,
      ),
      markers: Set<Marker>.from(markers),
    );
  }
}
