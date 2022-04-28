import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:mobile/widgets/form_input.dart';
import '../widgets/form_input.dart';
import 'dart:io' show Platform;
import 'package:http/http.dart' as http;

import 'home_page.dart';

class FaqPage extends StatefulWidget {
  @override
  _FaqPage createState() => _FaqPage();
}

class _FaqPage extends State<FaqPage> {
  String? _errorText = "";
  final nameController = TextEditingController();
  final emailController = TextEditingController();
  final questionController = TextEditingController();

  @override
  void dispose() {
    nameController.dispose();
    emailController.dispose();
    questionController.dispose();
    super.dispose();
  }

  send(String name, String email, String question, BuildContext context) async {
    final response = await http.post(
      Uri.parse(getUrlForDevice()),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, String>{
        'name': name,
        'email': email,
        'question': question,
      }),
    );

    if (response.statusCode != 200) {
      setState(() => _errorText = response.body);
    } else {
      Navigator.pop(context, true);
      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (context) => FaqPage(),
        ),
      );
    }
  }

  String getUrlForDevice() {
    if (Platform.isAndroid) {
      return 'http://10.0.2.2:8080/api/feedback/create';
    } else {
      return 'http://localhost:8080/api/feedback/create';
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFF303030),
      appBar: AppBar(
        title: Text('FAQ'),
        backgroundColor: Color(0xFF303030),
      ),
      body: Center(
        child: SingleChildScrollView(
          child: Column(
            children: <Widget>[
              const Padding(
                padding: EdgeInsets.all(10),
                child: Text(
                    "\n\n1) Who are we?\nWe are a startup corporation that provides personal surveillance systems."
                    "\n\n\n2) How much are our services?\nWe have multiple service options starting at 9.99 USD/Month/Camera. With each additional camera, there is a 5% discount (Max 20%)."
                    "\n\n\n3) Do we ever offer promotions?\nWe never offer promotions in order to prevent new customer from thinking they will lose out if they do not wait. Our prices are fixed."
                    "\n\n\n4) Where are our servers located?\nOur servers are located in Illinois, USA."
                    "\n\n\n5) What is love?\nBaby don't hurt me, don't hurt me."
                    "\n\n\n6) How many cameras can I use with your service?\nOur current limit is 10 cameras per account. "
                    "\n\n\n7) How do I create an account?\nYou can create an account by clicking on the Sign-Up button on the top right. "
                    "\n\n\n8) Can I change the quality of picture/video?\nYes you can. We offer 360 px, 480 px, 720 px, and 1080 px. "
                    "\n\n\n9) What is the maximum length of video I can record?\nYou can record up to 30 seconds of video."
                    "\n\n\n10) Can your service detect motion?\nYes, we can detect motion up to a distance of 10 meters from the camera."
                    "\n\n\n11) What guarantees do you offer?\nIf you are not satisfied with our service, you can get a full refund within the first 30 days."
                    "\n\n\n12) What does the fox say?\nRing-ding-ding-ding-dingeringeding!"
                    "\n\n\n13) Can we schedule recording?\nWe are still working on that feature. We will update you soon!"
                    "\n\n\n14) Will there be a mobile app?\nWe are seriously considering this, but it is on the back-burner for now!"
                    "\n\n\n15) How long do you store the images and videos for?\nImages are stored for 30 days and video are stored for 24 hours.\n\n\n\n\n"
                    "Ask Us A Question:",
                    style: TextStyle(
                        fontWeight: FontWeight.bold,
                        height: 1.25,
                        fontSize: 25,
                        color: Colors.white)),
              ),
              FormInput(nameController, 'Name', 'Enter Name'),
              FormInput(emailController, 'E-Mail', 'Enter E-Mail'),
              FormInput(questionController, 'Question', 'Enter Question'),
              ElevatedButton(
                  style: ButtonStyle(
                      backgroundColor:
                          MaterialStateProperty.all<Color>(Colors.black)),
                  child: const Text('Send'),
                  onPressed: () => send(nameController.text,
                      emailController.text, questionController.text, context)),
            ],
          ),
        ),
      ),
    );
  }
}
