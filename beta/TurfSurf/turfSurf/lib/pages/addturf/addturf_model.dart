import '/auth/firebase_auth/auth_util.dart';
import '/backend/backend.dart';
import '/backend/firebase_storage/storage.dart';
import '/flutter_flow/flutter_flow_drop_down.dart';
import '/flutter_flow/flutter_flow_expanded_image_view.dart';
import '/flutter_flow/flutter_flow_icon_button.dart';
import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/flutter_flow/flutter_flow_widgets.dart';
import '/flutter_flow/form_field_controller.dart';
import '/flutter_flow/upload_data.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:page_transition/page_transition.dart';
import 'package:provider/provider.dart';

class AddturfModel extends FlutterFlowModel {
  ///  State fields for stateful widgets in this page.

  // State field(s) for turfName widget.
  TextEditingController? turfNameController;
  String? Function(BuildContext, String?)? turfNameControllerValidator;
  // State field(s) for location widget.
  TextEditingController? locationController;
  String? Function(BuildContext, String?)? locationControllerValidator;
  // State field(s) for district widget.
  String? districtValue;
  FormFieldController<String>? districtValueController;
  // State field(s) for myBio widget.
  TextEditingController? myBioController;
  String? Function(BuildContext, String?)? myBioControllerValidator;
  // State field(s) for turfRate widget.
  TextEditingController? turfRateController;
  String? Function(BuildContext, String?)? turfRateControllerValidator;
  bool isDataUploading = false;
  List<FFUploadedFile> uploadedLocalFiles = [];
  List<String> uploadedFileUrls = [];

  /// Initialization and disposal methods.

  void initState(BuildContext context) {}

  void dispose() {
    turfNameController?.dispose();
    locationController?.dispose();
    myBioController?.dispose();
    turfRateController?.dispose();
  }

  /// Action blocks are added here.

  /// Additional helper methods are added here.
}
