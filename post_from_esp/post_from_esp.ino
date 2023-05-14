#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

const char* ssid = "Dam Jati";
const char* password = "12345678";
//void postHttp();
void getHttp();

void setup() {
  Serial.begin(115200);                 
 
  WiFi.begin(ssid, password);
  Serial.println("Establishing connection to WiFi with SSID: " + String(ssid));
 
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  Serial.print("Connected to network with IP address: ");
  Serial.println(WiFi.localIP());
 
  //postHttp();
  getHttp();
}

void loop() {
  
}

void postHttp(){
  Serial.println ("Posting...");
  String url = "192.168.1.23:3000/village/create";
  HTTPClient http;
  String response;

  StaticJsonDocument<200> buff;
  String jsonParams;

  buff["name"] = "Sta. Solo";
  buff["description"] = "Solo";
  buff["created_at"] = "2023-05-06 17:25:00";
  
  serializeJson (buff, jsonParams);
  Serial.println(jsonParams);

  http.begin(url);
  http.addHeader("Content-Type", "application/json");
  http.POST(jsonParams);
  delay(3000);
  response = http.getString();
  Serial.println(response);
}

void getHttp(){
  String url = "https://reqres.in/api/users/2";
  HTTPClient http;
  String response;

  http.begin(url);
  http.GET();
  response = http.getString();
  Serial.println(response);
}
