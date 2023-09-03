import '/backend/api_requests/api_calls.dart';
import '/flutter_flow/flutter_flow_icon_button.dart';
import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/flutter_flow/flutter_flow_widgets.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';

class PaymentModel extends FlutterFlowModel {
  ///  State fields for stateful widgets in this page.

  // State field(s) for upiID widget.
  TextEditingController? upiIDController;
  String? Function(BuildContext, String?)? upiIDControllerValidator;
  // Stores action output result for [Backend Call - API (Order Pay)] action in Button-Login widget.
  ApiCallResponse? apiResult31v;

  /// Initialization and disposal methods.

  void initState(BuildContext context) {}

  void dispose() {
    upiIDController?.dispose();
  }

  /// Action blocks are added here.

  /// Additional helper methods are added here.
}
