import 'dart:convert';
import 'dart:math' as math;

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:intl/intl.dart';
import 'package:timeago/timeago.dart' as timeago;
import 'lat_lng.dart';
import 'place.dart';
import 'uploaded_file.dart';
import '/backend/backend.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import '/auth/firebase_auth/auth_util.dart';

List<DateTime> getAvailSlots(
  List<DateTime> reservedSlots,
  DateTime startDateArg,
) {
  List<DateTime> availableBookings = [];
  DateTime now = startDateArg;
  DateTime startTime = DateTime(now.year, now.month, now.day, now.hour, 0);
  DateTime endTime = startTime.add(const Duration(days: 2)); //now + 2

// loop through the time slots from start to end time
  for (DateTime currentTime = startTime;
      currentTime.isBefore(endTime);
      currentTime = currentTime.add(const Duration(hours: 1))) {
    bool isReserved = false;

// check if the current time slot is reserved
    for (DateTime reservedTime in reservedSlots) {
      if (currentTime.year == reservedTime.year &&
          currentTime.month == reservedTime.month &&
          currentTime.day == reservedTime.day &&
          currentTime.hour == reservedTime.day) {
        isReserved = true;
        break;
      }
    }
    //add the current time slot to available bookings if its not reserved
    if (!isReserved && currentTime.hour >= 9 && currentTime.hour <= 17) {
      availableBookings.add(currentTime);
    }
  }

  List<DateTime> availableSlots = availableBookings
      .where((dateTime) => dateTime.day == availableBookings[0].day)
      .toList();
  return availableSlots;
}
