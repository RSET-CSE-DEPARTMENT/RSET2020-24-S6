import 'package:flutter/material.dart';
import '/backend/backend.dart';
import 'backend/api_requests/api_manager.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'flutter_flow/flutter_flow_util.dart';

class FFAppState extends ChangeNotifier {
  static final FFAppState _instance = FFAppState._internal();

  factory FFAppState() {
    return _instance;
  }

  FFAppState._internal();

  Future initializePersistedState() async {}

  void update(VoidCallback callback) {
    callback();
    notifyListeners();
  }

  List<DocumentReference> _turfChosen = [];
  List<DocumentReference> get turfChosen => _turfChosen;
  set turfChosen(List<DocumentReference> _value) {
    _turfChosen = _value;
  }

  void addToTurfChosen(DocumentReference _value) {
    _turfChosen.add(_value);
  }

  void removeFromTurfChosen(DocumentReference _value) {
    _turfChosen.remove(_value);
  }

  void removeAtIndexFromTurfChosen(int _index) {
    _turfChosen.removeAt(_index);
  }

  void updateTurfChosenAtIndex(
    int _index,
    DocumentReference Function(DocumentReference) updateFn,
  ) {
    _turfChosen[_index] = updateFn(_turfChosen[_index]);
  }
}

LatLng? _latLngFromString(String? val) {
  if (val == null) {
    return null;
  }
  final split = val.split(',');
  final lat = double.parse(split.first);
  final lng = double.parse(split.last);
  return LatLng(lat, lng);
}

void _safeInit(Function() initializeField) {
  try {
    initializeField();
  } catch (_) {}
}

Future _safeInitAsync(Function() initializeField) async {
  try {
    await initializeField();
  } catch (_) {}
}
