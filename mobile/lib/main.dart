import 'package:flutter/material.dart';
import 'package:mobile/pages/login.dart';
import 'package:http/http.dart' as http;
import '../pages/home_page.dart';
import '../widgets/app.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(home: LoginPage());
  }
}
