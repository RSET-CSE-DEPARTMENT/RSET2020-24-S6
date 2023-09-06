import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';


class emergencybody extends StatefulWidget {
  const emergencybody({Key? key}) : super(key: key);

  @override
  State<emergencybody> createState() => _emergencybodyState();
}

class _emergencybodyState extends State<emergencybody> {
  Set<Marker> _markers = {};
  List<Place> _selectedPlaces = [];




  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          GoogleMap(
            onTap: (LatLng latLng) {
              _addMarker(latLng, 'Place ${_selectedPlaces.length + 1}', 'Address ${_selectedPlaces.length + 1}',);
            },
            markers: _markers,
            initialCameraPosition: CameraPosition(
              target: LatLng(9.99359774878785, 76.35873462426268),
              zoom: 14.0,
            ),
          ),
          if (_selectedPlaces.isNotEmpty)
            PlaceInfoWidget(
              places: _selectedPlaces,
              onPlaceSelected: (index) {
                _showPlaceDetails(context, _selectedPlaces[index]);
              },
            ),
        ],
      ),
    );
  }

  void _addMarker(LatLng latLng, String name, String address) {
    final Place1 = Place(
      name: "Sunrise Hospital",
      address: "Seaport - Airport Rd, Thrikkakara, Kakkanad, Kerala 682030",
    );
    setState(() {
      _markers.add(
        Marker(
          markerId: MarkerId('${_selectedPlaces.length}'),
          position: latLng,
        ),
      );
      _selectedPlaces.add(Place1);
    });
  }

  Future<void> _showPlaceDetails(BuildContext context, Place place) {
    return showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text(place.name),
          content: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisSize: MainAxisSize.min,
            children: [
              Text('Address: ${place.address}'),
              // Add additional place details as needed
            ],
          ),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: Text('Close'),
            ),
          ],
        );
      },
    );
  }
}

class PlaceInfoWidget extends StatelessWidget {
  final List<Place> places;
  final Function(int) onPlaceSelected;

  const PlaceInfoWidget({required this.places, required this.onPlaceSelected});

  @override
  Widget build(BuildContext context) {
    return Positioned(
      top: 16.0,
      left: 16.0,
      right: 16.0,
      child: Container(
        padding: EdgeInsets.all(12.0),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(8.0),
          boxShadow: [
            BoxShadow(
              color: Colors.grey.withOpacity(0.5),
              spreadRadius: 2,
              blurRadius: 4,
              offset: Offset(0, 2),
            ),
          ],
        ),
        child: ListView.builder(
          shrinkWrap: true,
          itemCount: places.length,
          itemBuilder: (context, index) {
            final place = places[index];
            return ListTile(
              title: Text(place.name),
              subtitle: Text(place.address),
              onTap: () {
                onPlaceSelected(index);
              },
            );
          },
        ),
      ),
    );
  }
}

class Place {
  final String name;
  final String address;

  Place({
    required this.name,
    required this.address,

  });
}