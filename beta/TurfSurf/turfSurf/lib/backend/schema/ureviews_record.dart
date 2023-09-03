import 'dart:async';

import 'package:collection/collection.dart';

import '/backend/schema/util/firestore_util.dart';
import '/backend/schema/util/schema_util.dart';

import 'index.dart';
import '/flutter_flow/flutter_flow_util.dart';

class UreviewsRecord extends FirestoreRecord {
  UreviewsRecord._(
    DocumentReference reference,
    Map<String, dynamic> data,
  ) : super(reference, data) {
    _initializeFields();
  }

  // "rating" field.
  int? _rating;
  int get rating => _rating ?? 0;
  bool hasRating() => _rating != null;

  // "reviews" field.
  String? _reviews;
  String get reviews => _reviews ?? '';
  bool hasReviews() => _reviews != null;

  DocumentReference get parentReference => reference.parent.parent!;

  void _initializeFields() {
    _rating = castToType<int>(snapshotData['rating']);
    _reviews = snapshotData['reviews'] as String?;
  }

  static Query<Map<String, dynamic>> collection([DocumentReference? parent]) =>
      parent != null
          ? parent.collection('ureviews')
          : FirebaseFirestore.instance.collectionGroup('ureviews');

  static DocumentReference createDoc(DocumentReference parent) =>
      parent.collection('ureviews').doc();

  static Stream<UreviewsRecord> getDocument(DocumentReference ref) =>
      ref.snapshots().map((s) => UreviewsRecord.fromSnapshot(s));

  static Future<UreviewsRecord> getDocumentOnce(DocumentReference ref) =>
      ref.get().then((s) => UreviewsRecord.fromSnapshot(s));

  static UreviewsRecord fromSnapshot(DocumentSnapshot snapshot) =>
      UreviewsRecord._(
        snapshot.reference,
        mapFromFirestore(snapshot.data() as Map<String, dynamic>),
      );

  static UreviewsRecord getDocumentFromData(
    Map<String, dynamic> data,
    DocumentReference reference,
  ) =>
      UreviewsRecord._(reference, mapFromFirestore(data));

  @override
  String toString() =>
      'UreviewsRecord(reference: ${reference.path}, data: $snapshotData)';

  @override
  int get hashCode => reference.path.hashCode;

  @override
  bool operator ==(other) =>
      other is UreviewsRecord &&
      reference.path.hashCode == other.reference.path.hashCode;
}

Map<String, dynamic> createUreviewsRecordData({
  int? rating,
  String? reviews,
}) {
  final firestoreData = mapToFirestore(
    <String, dynamic>{
      'rating': rating,
      'reviews': reviews,
    }.withoutNulls,
  );

  return firestoreData;
}

class UreviewsRecordDocumentEquality implements Equality<UreviewsRecord> {
  const UreviewsRecordDocumentEquality();

  @override
  bool equals(UreviewsRecord? e1, UreviewsRecord? e2) {
    return e1?.rating == e2?.rating && e1?.reviews == e2?.reviews;
  }

  @override
  int hash(UreviewsRecord? e) =>
      const ListEquality().hash([e?.rating, e?.reviews]);

  @override
  bool isValidKey(Object? o) => o is UreviewsRecord;
}
