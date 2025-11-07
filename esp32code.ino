#include <SPI.h>
#include <SD.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <MFRC522.h>

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_RESET -1

// OLED 使用 I2C
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

// RFID 設定
#define RST_PIN 4
#define SS_PIN 2
MFRC522 rfid(SS_PIN, RST_PIN);

// SD 卡 SPI 腳位
#define SD_CS   15
#define SD_MOSI 13
#define SD_MISO 12
#define SD_SCK  14
SPIClass spiSD(VSPI);  // 自訂 SPI 給 SD 卡

// 儲存最近刷卡 UID
String lastUID = "";
bool isInside = false;

void setup() {
  Serial.begin(115200);

  // 初始化 OLED
  Wire.begin(17, 21);  // SDA, SCL
  if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
    Serial.println("OLED 初始化失敗！");
    while (1);
  }
  display.clearDisplay();
  display.setTextSize(2);
  display.setTextColor(SSD1306_WHITE);
  display.setCursor(0, 0);
  display.println("啟動中...");
  display.display();

  // 初始化 RFID
  SPI.begin(); // 預設 SPI 用於 RFID
  rfid.PCD_Init();

  // 初始化 SD 卡
  spiSD.begin(SD_SCK, SD_MISO, SD_MOSI, SD_CS);
  if (!SD.begin(SD_CS, spiSD)) {
    Serial.println("SD 卡初始化失敗！");
  } else {
    Serial.println("SD 卡啟用成功");
  }

  delay(1000);
  display.clearDisplay();
  display.setCursor(0, 0);
  display.println("your card");
  display.display();
}

void loop() {
  // 檢查是否有新卡片
  if (!rfid.PICC_IsNewCardPresent() || !rfid.PICC_ReadCardSerial()) {
    return;
  }

  String uid = "";
  for (byte i = 0; i < rfid.uid.size; i++) {
    uid += String(rfid.uid.uidByte[i] < 0x10 ? "0" : "");
    uid += String(rfid.uid.uidByte[i], HEX);
  }

  uid.toUpperCase();
  Serial.println("讀到 UID: " + uid);

  if (uid == lastUID) {
    // 重複刷同一張卡，不做動作
    return;
  }

  lastUID = uid;
  isInside = !isInside;  // 切換進入/離開狀態

  display.clearDisplay();
  display.setCursor(0, 0);
  display.println(isInside ? "進入" : "離開");
  display.display();

  delay(2000);
  display.clearDisplay();
  display.setCursor(0, 0);
  display.println("請刷卡");
  display.display();

  rfid.PICC_HaltA();
}
