import 'dart:async';

import 'package:collection/collection.dart';

import '/backend/schema/util/firestore_util.dart';
import '/backend/schema/util/schema_util.dart';

import 'index.dart';
import '/flutter_flow/flutter_flow_util.dart';

class DistrictsRecord extends FirestoreRecord {
  DistrictsRecord._(
    DocumentReference reference,
    Map<String, dynamic> data,
  ) : super(reference, data) {
    _initializeFields();
  }

  // "Name" field.
  String? _name;
  String get name => _name ?? '';
  bool hasName() => _name != null;

  // "img" field.
  String? _img;
  String get img => _img ?? '';
  bool hasImg() => _img != null;

  void _initializeFields() {
    _name = snapshotData['Name'] as String?;
    _img = snapshotData['img'] as String?;
  }

  static CollectionReference get collection =>
      FirebaseFirestore.instance.collection('Districts');

  static Stream<DistrictsRecord> getDocument(DocumentReference ref) =>
      ref.snapshots().map((s) => DistrictsRecord.fromSnapshot(s));

  static Future<DistrictsRecord> getDocumentOnce(DocumentReference ref) =>
      ref.get().then((s) => DistrictsRecord.fromSnapshot(s));

  static DistrictsRecord fromSnapshot(DocumentSnapshot snapshot) =>
      DistrictsRecord._(
        snapshot.reference,
        mapFromFirestore(snapshot.data() as Map<String, dynamic>),
      );

  static DistrictsRecord getDocumentFromData(
    Map<String, dynamic> data,
    DocumentReference reference,
  ) =>
      DistrictsRecord._(reference, mapFromFirestore(data));

  @override
  String toString() =>
      'DistrictsRecord(reference: ${reference.path}, data: $snapshotData)';

  @override
  int get hashCode => reference.path.hashCode;

  @override
  bool operator ==(other) =>
      other is DistrictsRecord &&
      reference.path.hashCode == other.reference.path.hashCode;
}

Map<String, dynamic> createDistrictsRecordData({
  String? name,
  String? img,
}) {
  final firestoreData = mapToFirestore(
    <String, dynamic>{
      'Name': name,
      'img': img,
    }.withoutNulls,
  );

  return firestoreData;
}

class DistrictsRecordDocumentEquality implements Equality<DistrictsRecord> {
  const DistrictsRecordDocumentEquality();

  @override
  bool equals(DistrictsRecord? e1, DistrictsRecord? e2) {
    return e1?.name == e2?.name && e1?.img == e2?.img;
  }

  @override
  int hash(DistrictsRecord? e) => const ListEquality().hash([e?.name, e?.img]);

  @override
  bool isValidKey(Object? o) => o is DistrictsRecord;
}
