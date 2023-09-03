import 'package:flutter/foundation.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:webviewx_plus/webviewx_plus.dart';
import 'package:url_launcher/url_launcher.dart';

import 'flutter_flow_util.dart';

class FlutterFlowWebView extends StatefulWidget {
  const FlutterFlowWebView({
    Key? key,
    required this.content,
    this.width,
    this.height,
    this.bypass = false,
    this.horizontalScroll = false,
    this.verticalScroll = false,
    this.html = false,
  }) : super(key: key);

  final String content;
  final double? height;
  final double? width;
  final bool bypass;
  final bool horizontalScroll;
  final bool verticalScroll;
  final bool html;

  @override
  _FlutterFlowWebViewState createState() => _FlutterFlowWebViewState();
}

class _FlutterFlowWebViewState extends State<FlutterFlowWebView> {
  @override
  Widget build(BuildContext context) => WebViewX(
        key: webviewKey,
        width: widget.width ?? MediaQuery.sizeOf(context).width,
        height: widget.height ?? MediaQuery.sizeOf(context).height,
        ignoreAllGestures: false,
        initialContent: widget.content,
        initialMediaPlaybackPolicy:
            AutoMediaPlaybackPolicy.requireUserActionForAllMediaTypes,
        initialSourceType: widget.html
            ? SourceType.html
            : widget.bypass
                ? SourceType.urlBypass
                : SourceType.url,
        javascriptMode: JavascriptMode.unrestricted,
        navigationDelegate: (request) async {
          if (isAndroid) {
            if (request.content.source
                .startsWith('https://api.whatsapp.com/send?phone')) {
              String url = request.content.source;

              await launchUrl(
                Uri.parse(url),
                mode: LaunchMode.externalApplication,
              );
              return NavigationDecision.prevent;
            }
          }
          return NavigationDecision.navigate;
        },
        webSpecificParams: const WebSpecificParams(
          webAllowFullscreenContent: true,
        ),
        mobileSpecificParams: MobileSpecificParams(
          debuggingEnabled: false,
          gestureNavigationEnabled: true,
          mobileGestureRecognizers: {
            if (widget.verticalScroll)
              Factory<VerticalDragGestureRecognizer>(
                () => VerticalDragGestureRecognizer(),
              ),
            if (widget.horizontalScroll)
              Factory<HorizontalDragGestureRecognizer>(
                () => HorizontalDragGestureRecognizer(),
              ),
          },
          androidEnableHybridComposition: true,
        ),
      );

  Key get webviewKey => Key(
        [
          widget.content,
          widget.width,
          widget.height,
          widget.bypass,
          widget.horizontalScroll,
          widget.verticalScroll,
          widget.html,
        ].map((s) => s?.toString() ?? '').join(),
      );
}
