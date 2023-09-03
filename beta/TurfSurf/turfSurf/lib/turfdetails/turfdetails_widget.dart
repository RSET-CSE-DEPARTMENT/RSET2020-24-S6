import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'turfdetails_model.dart';
export 'turfdetails_model.dart';

class TurfdetailsWidget extends StatefulWidget {
  const TurfdetailsWidget({Key? key}) : super(key: key);

  @override
  _TurfdetailsWidgetState createState() => _TurfdetailsWidgetState();
}

class _TurfdetailsWidgetState extends State<TurfdetailsWidget> {
  late TurfdetailsModel _model;

  final scaffoldKey = GlobalKey<ScaffoldState>();

  @override
  void initState() {
    super.initState();
    _model = createModel(context, () => TurfdetailsModel());
  }

  @override
  void dispose() {
    _model.dispose();

    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    context.watch<FFAppState>();

    return GestureDetector(
      onTap: () => FocusScope.of(context).requestFocus(_model.unfocusNode),
      child: Scaffold(
        key: scaffoldKey,
        backgroundColor: FlutterFlowTheme.of(context).secondaryBackground,
        appBar: AppBar(
          backgroundColor: Color(0xFF2FCD74),
          automaticallyImplyLeading: true,
          title: Text(
            'Turf Details',
            style: FlutterFlowTheme.of(context).titleLarge.override(
                  fontFamily: 'Outfit',
                  color: FlutterFlowTheme.of(context).primaryBtnText,
                  fontSize: 25.0,
                  fontWeight: FontWeight.bold,
                ),
          ),
          actions: [],
          centerTitle: true,
          elevation: 4.0,
        ),
      ),
    );
  }
}
