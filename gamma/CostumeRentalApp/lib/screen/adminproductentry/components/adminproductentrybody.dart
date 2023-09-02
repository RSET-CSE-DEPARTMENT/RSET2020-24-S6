import 'dart:io';
import 'package:corental/screen/adminproductentry/adminproductentry.dart';
import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
//import 'package:image_picker/image_picker.dart';
import 'package:firebase_storage/firebase_storage.dart' as firebase_storage;

class AdminProductEntryBody extends StatefulWidget {
  const AdminProductEntryBody({Key? key}) : super(key: key);

  @override
  State<AdminProductEntryBody> createState() => _AdminProductEntryBodyState();
}

class _AdminProductEntryBodyState extends State<AdminProductEntryBody> {
  @override
  String _productName = '';
  String _imageUrl= '';
  String _price = '';
  String _quantity = '';
  String _category = '';
  String _size = '';
  String _description = '';

  final TextEditingController _textEditingController1 = TextEditingController();
  final TextEditingController _textEditingController2 = TextEditingController();
  final TextEditingController _textEditingController3 = TextEditingController();
  final TextEditingController _textEditingController4 = TextEditingController();
  final TextEditingController _textEditingController5 = TextEditingController();
  final TextEditingController _textEditingController6 = TextEditingController();
  final TextEditingController _textEditingController7 = TextEditingController();

  // final ImagePicker _picker = ImagePicker();
  // PickedFile? _imageFile;
  Widget build(BuildContext context) {
    return SafeArea(
      child: Column(
        children: [
          Text("Product name"),
          TextField(
            controller: _textEditingController1,
            onChanged: (value) {
              setState(() {
                _productName = value;
              });
            },
          ),
          Text("Product image url"),
          TextField(
            controller: _textEditingController2,
            onChanged: (value) {
              setState(() {
                _imageUrl = value;
              });
            },
          ),

          /* ElevatedButton(

        onPressed: (){
          Future<void> chooseImage() async {
            var pickedFile = await _picker.getImage(source: ImageSource.gallery);
            setState(() {
              _imageFile = pickedFile;
            });
          }
        },
        child: const Text('Upload')),*/
          Text("Price"),
          TextField(
            controller: _textEditingController3,
            onChanged: (value) {
              setState(() {
                _price = value;
              });
            },
          ),
          Text("Quantity"),
          TextField(
            controller: _textEditingController4,
            onChanged: (value) {
              setState(() {
                _quantity = value;
              });
            },
          ),
          Text("Category"),
          TextField(
            controller: _textEditingController5,
            onChanged: (value) {
              setState(() {
                _category = value;
              });
            },
          ),
          Text("Size"),
          TextField(
            controller: _textEditingController6,
            onChanged: (value) {
              setState(() {
                _size = value;
              });
            },
          ),
          Text("Description"),
          TextField(
            controller: _textEditingController7,
            onChanged: (value) {
              setState(() {
                _description = value;
              });
            },
          ),
          ElevatedButton(onPressed: () {
            uploadingData(_productName,_imageUrl,_price,_quantity,_category,_size,_description);
            Navigator.push(context,
                MaterialPageRoute(builder: (context) => AdminProductEntry(),));
          }, child: Text("Submit"))
        ],
      ),
    );
  }

  Future<void> uploadingData(String _productName, String _productImageUrl,
      String _price, String _quantity, String _category, String _size,
      String _description) async {
    await FirebaseFirestore.instance.collection("products").add({
      'ProductName': _productName,
      'ProductImageUrl': _productImageUrl,
      'Price': _price,
      'Quantity': _quantity,
      'Category': _category,
      'Size': _size,
      'Description': _description,

    });
  }

/*Future<void> uploadingImage() async {
    if (_imageFile == null) return;

    File file = File(_imageFile!.path);
    String fileName = file.path.split('/').last;
    firebase_storage.Reference ref =
    firebase_storage.FirebaseStorage.instance.ref().child(fileName);
    await ref.putFile(file);
    String downloadURL = await ref.getDownloadURL();

    // Use the downloadURL as needed (e.g., save it to Firestore).

    // Clean up by deleting the temporary file.
    file.delete();

    uploadingData(_productName,downloadURL,
        _price,_quantity,_category, _size,_description);
  }
}*/
}
