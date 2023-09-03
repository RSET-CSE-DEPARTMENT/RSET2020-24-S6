import 'dart:async';

import 'package:collection/collection.dart';

import '/backend/schema/util/firestore_util.dart';
import '/backend/schema/util/schema_util.dart';

import 'index.dart';
import '/flutter_flow/flutter_flow_util.dart';

class TurfDetailsRecord extends FirestoreRecord {
  TurfDetailsRecord._(
    DocumentReference reference,
    Map<String, dynamic> data,
  ) : super(reference, data) {
    _initializeFields();
  }

  // "turfName" field.
  String? _turfName;
  String get turfName => _turfName ?? '';
  bool hasTurfName() => _turfName != null;

  // "location" field.
  String? _location;
  String get location => _location ?? '';
  bool hasLocation() => _location != null;

  // "district" field.
  String? _district;
  String get district => _district ?? '';
  bool hasDistrict() => _district != null;

  // "description" field.
  String? _description;
  String get description => _description ?? '';
  bool hasDescription() => _description != null;

  // "rate" field.
  int? _rate;
  int get rate => _rate ?? 0;
  bool hasRate() => _rate != null;

  // "turfImg" field.
  List<String>? _turfImg;
  List<String> get turfImg => _turfImg ?? const [];
  bool hasTurfImg() => _turfImg != null;

  // "slot1" field.
  String? _slot1;
  String get slot1 => _slot1 ?? '';
  bool hasSlot1() => _slot1 != null;

  // "slot2" field.
  String? _slot2;
  String get slot2 => _slot2 ?? '';
  bool hasSlot2() => _slot2 != null;

  // "slot3" field.
  String? _slot3;
  String get slot3 => _slot3 ?? '';
  bool hasSlot3() => _slot3 != null;

  // "slot4" field.
  String? _slot4;
  String get slot4 => _slot4 ?? '';
  bool hasSlot4() => _slot4 != null;

  // "slot5" field.
  String? _slot5;
  String get slot5 => _slot5 ?? '';
  bool hasSlot5() => _slot5 != null;

  // "slot6" field.
  String? _slot6;
  String get slot6 => _slot6 ?? '';
  bool hasSlot6() => _slot6 != null;

  // "slot7" field.
  String? _slot7;
  String get slot7 => _slot7 ?? '';
  bool hasSlot7() => _slot7 != null;

  // "slot8" field.
  String? _slot8;
  String get slot8 => _slot8 ?? '';
  bool hasSlot8() => _slot8 != null;

  // "slot9" field.
  String? _slot9;
  String get slot9 => _slot9 ?? '';
  bool hasSlot9() => _slot9 != null;

  // "slot10" field.
  String? _slot10;
  String get slot10 => _slot10 ?? '';
  bool hasSlot10() => _slot10 != null;

  // "slot11" field.
  String? _slot11;
  String get slot11 => _slot11 ?? '';
  bool hasSlot11() => _slot11 != null;

  // "slot12" field.
  String? _slot12;
  String get slot12 => _slot12 ?? '';
  bool hasSlot12() => _slot12 != null;

  // "slot13" field.
  String? _slot13;
  String get slot13 => _slot13 ?? '';
  bool hasSlot13() => _slot13 != null;

  // "slot14" field.
  String? _slot14;
  String get slot14 => _slot14 ?? '';
  bool hasSlot14() => _slot14 != null;

  // "slot15" field.
  String? _slot15;
  String get slot15 => _slot15 ?? '';
  bool hasSlot15() => _slot15 != null;

  // "slot16" field.
  String? _slot16;
  String get slot16 => _slot16 ?? '';
  bool hasSlot16() => _slot16 != null;

  // "geopoint" field.
  LatLng? _geopoint;
  LatLng? get geopoint => _geopoint;
  bool hasGeopoint() => _geopoint != null;

  void _initializeFields() {
    _turfName = snapshotData['turfName'] as String?;
    _location = snapshotData['location'] as String?;
    _district = snapshotData['district'] as String?;
    _description = snapshotData['description'] as String?;
    _rate = castToType<int>(snapshotData['rate']);
    _turfImg = getDataList(snapshotData['turfImg']);
    _slot1 = snapshotData['slot1'] as String?;
    _slot2 = snapshotData['slot2'] as String?;
    _slot3 = snapshotData['slot3'] as String?;
    _slot4 = snapshotData['slot4'] as String?;
    _slot5 = snapshotData['slot5'] as String?;
    _slot6 = snapshotData['slot6'] as String?;
    _slot7 = snapshotData['slot7'] as String?;
    _slot8 = snapshotData['slot8'] as String?;
    _slot9 = snapshotData['slot9'] as String?;
    _slot10 = snapshotData['slot10'] as String?;
    _slot11 = snapshotData['slot11'] as String?;
    _slot12 = snapshotData['slot12'] as String?;
    _slot13 = snapshotData['slot13'] as String?;
    _slot14 = snapshotData['slot14'] as String?;
    _slot15 = snapshotData['slot15'] as String?;
    _slot16 = snapshotData['slot16'] as String?;
    _geopoint = snapshotData['geopoint'] as LatLng?;
  }

  static CollectionReference get collection =>
      FirebaseFirestore.instance.collection('turfDetails');

  static Stream<TurfDetailsRecord> getDocument(DocumentReference ref) =>
      ref.snapshots().map((s) => TurfDetailsRecord.fromSnapshot(s));

  static Future<TurfDetailsRecord> getDocumentOnce(DocumentReference ref) =>
      ref.get().then((s) => TurfDetailsRecord.fromSnapshot(s));

  static TurfDetailsRecord fromSnapshot(DocumentSnapshot snapshot) =>
      TurfDetailsRecord._(
        snapshot.reference,
        mapFromFirestore(snapshot.data() as Map<String, dynamic>),
      );

  static TurfDetailsRecord getDocumentFromData(
    Map<String, dynamic> data,
    DocumentReference reference,
  ) =>
      TurfDetailsRecord._(reference, mapFromFirestore(data));

  @override
  String toString() =>
      'TurfDetailsRecord(reference: ${reference.path}, data: $snapshotData)';

  @override
  int get hashCode => reference.path.hashCode;

  @override
  bool operator ==(other) =>
      other is TurfDetailsRecord &&
      reference.path.hashCode == other.reference.path.hashCode;
}

Map<String, dynamic> createTurfDetailsRecordData({
  String? turfName,
  String? location,
  String? district,
  String? description,
  int? rate,
  String? slot1,
  String? slot2,
  String? slot3,
  String? slot4,
  String? slot5,
  String? slot6,
  String? slot7,
  String? slot8,
  String? slot9,
  String? slot10,
  String? slot11,
  String? slot12,
  String? slot13,
  String? slot14,
  String? slot15,
  String? slot16,
  LatLng? geopoint,
}) {
  final firestoreData = mapToFirestore(
    <String, dynamic>{
      'turfName': turfName,
      'location': location,
      'district': district,
      'description': description,
      'rate': rate,
      'slot1': slot1,
      'slot2': slot2,
      'slot3': slot3,
      'slot4': slot4,
      'slot5': slot5,
      'slot6': slot6,
      'slot7': slot7,
      'slot8': slot8,
      'slot9': slot9,
      'slot10': slot10,
      'slot11': slot11,
      'slot12': slot12,
      'slot13': slot13,
      'slot14': slot14,
      'slot15': slot15,
      'slot16': slot16,
      'geopoint': geopoint,
    }.withoutNulls,
  );

  return firestoreData;
}

class TurfDetailsRecordDocumentEquality implements Equality<TurfDetailsRecord> {
  const TurfDetailsRecordDocumentEquality();

  @override
  bool equals(TurfDetailsRecord? e1, TurfDetailsRecord? e2) {
    const listEquality = ListEquality();
    return e1?.turfName == e2?.turfName &&
        e1?.location == e2?.location &&
        e1?.district == e2?.district &&
        e1?.description == e2?.description &&
        e1?.rate == e2?.rate &&
        listEquality.equals(e1?.turfImg, e2?.turfImg) &&
        e1?.slot1 == e2?.slot1 &&
        e1?.slot2 == e2?.slot2 &&
        e1?.slot3 == e2?.slot3 &&
        e1?.slot4 == e2?.slot4 &&
        e1?.slot5 == e2?.slot5 &&
        e1?.slot6 == e2?.slot6 &&
        e1?.slot7 == e2?.slot7 &&
        e1?.slot8 == e2?.slot8 &&
        e1?.slot9 == e2?.slot9 &&
        e1?.slot10 == e2?.slot10 &&
        e1?.slot11 == e2?.slot11 &&
        e1?.slot12 == e2?.slot12 &&
        e1?.slot13 == e2?.slot13 &&
        e1?.slot14 == e2?.slot14 &&
        e1?.slot15 == e2?.slot15 &&
        e1?.slot16 == e2?.slot16 &&
        e1?.geopoint == e2?.geopoint;
  }

  @override
  int hash(TurfDetailsRecord? e) => const ListEquality().hash([
        e?.turfName,
        e?.location,
        e?.district,
        e?.description,
        e?.rate,
        e?.turfImg,
        e?.slot1,
        e?.slot2,
        e?.slot3,
        e?.slot4,
        e?.slot5,
        e?.slot6,
        e?.slot7,
        e?.slot8,
        e?.slot9,
        e?.slot10,
        e?.slot11,
        e?.slot12,
        e?.slot13,
        e?.slot14,
        e?.slot15,
        e?.slot16,
        e?.geopoint
      ]);

  @override
  bool isValidKey(Object? o) => o is TurfDetailsRecord;
}
