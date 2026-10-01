from typing import Dict, Any

class MultilingualVoiceService:
    VOICE_KNOWLEDGE_BASE = {
        "en": {
            "pesticide": "Do not spray pesticide today! Heavy rainfall of 48 millimeters will wash away the chemical. Spray on Friday morning when weather is dry.",
            "irrigation": "Do not start irrigation! Even though your soil is dry at 28 percent, heavy storm rainfall is arriving within 4 hours.",
            "soil": "Your soil moisture is 28 percent (Dry), temperature is 29.4 degrees, and pH is 6.5 which is balanced.",
            "disease": "Tomato Early Blight detected with 94 percent confidence. Apply Copper Oxychloride after Friday's rain clears.",
            "default": "AgriCrisis Assistant: Weather alert active. 48mm storm approaching. Keep drainage furrows clear."
        },
        "kn": {
            "pesticide": "ಇಂದು ಕೀಟನಾಶಕ ಸಿಂಪಡಿಸಬೇಡಿ! ಮುಂದಿನ 4 ಗಂಟೆಗಳಲ್ಲಿ 48ಮಿಮೀ ಭಾರಿ ಮಳೆಯಿಂದ ಔಷಧಿ ವ್ಯರ್ಥವಾಗುತ್ತದೆ. ಶುಕ್ರವಾರ ಬೆಳಿಗ್ಗೆ ಸಿಂಪಡಿಸಿ.",
            "irrigation": "ದಯವಿಟ್ಟು ನೀರಾವರಿ ಪಂಪ್ ಆನ್ ಮಾಡಬೇಡಿ! ಮಣ್ಣಿನಲ್ಲಿ ತೇವಾಂಶ 28% ಇದ್ದರೂ ಭಾರಿ ಮಳೆ ಬರಲಿದೆ.",
            "soil": "ನಿಮ್ಮ ಮಣ್ಣಿನ ತೇವಾಂಶ 28% (ಕಡಿಮೆ), ತಾಪಮಾನ 29.4°C ಮತ್ತು ಪಿಹೆಚ್ 6.5 (ಉತ್ತಮ) ಮಟ್ಟದಲ್ಲಿದೆ.",
            "disease": "ಟೊಮೆಟೊ ಎಲೆಗಳಲ್ಲಿ ಅರ್ಲಿ ಬ್ಲೈಟ್ ಶಿಲೀಂಧ್ರ ರೋಗ ಪತ್ತೆಯಾಗಿದೆ. ಮಳೆ ನಿಂತ ನಂತರ ಶಿಲೀಂಧ್ರನಾಶಕ ಸಿಂಪಡಿಸಿ.",
            "default": "ಅಗ್ರಿಕ್ರೈಸಿಸ್ ಸಹಾಯವಾಣಿ: 48ಮಿಮೀ ಭಾರಿ ಮಳೆ ನಿರೀಕ್ಷೆಯಿದೆ. ನೀರಾವರಿ ಸ್ಥಗಿತಗೊಳಿಸಿ, ಚರಂಡಿ ಸ್ವಚ್ಛಗೊಳಿಸಿ."
        },
        "hi": {
            "pesticide": "आज कीटनाशक का छिड़काव न करें! 48mm भारी बारिश से दवा बह जाएगी। शुक्रवार सुबह धूप निकलने पर छिड़काव करें।",
            "irrigation": "सिंचाई पंप चालू न करें! मिट्टी में नमी कम होने पर भी कुछ ही घंटों में भारी बारिश होने वाली है।",
            "soil": "आपकी मिट्टी की नमी 28% (कम) है, तापमान 29.4 डिग्री सेल्सियस और पीएच 6.5 उत्तम है।",
            "disease": "टमाटर में अर्ली ब्लाइट रोग पाया गया है। बारिश रुकने के बाद कॉपर ऑक्सीक्लोराइड का छिड़काव करें।",
            "default": "कृषि संकट सहायक: भारी बारिश का अलर्ट जारी है। सिंचाई रोकें और पानी निकासी सुनिश्चित करें।"
        },
        "te": {
            "pesticide": "ఈరోజు పురుగుమందు పిచికారీ చేయవద్దు! 48 మి.మీ భారీ వర్షం కురవనుంది. శుక్రవారం ఉదయం పిచికారీ చేయండి.",
            "irrigation": "మోటారు ఆన్ చేయవద్దు! నేల తేమ తక్కువగా ఉన్నప్పటికీ త్వరలో భారీ వర్షం రానుంది.",
            "soil": "మీ నేల తేమ 28% (తక్కువ), ఉష్ణోగ్రత 29.4 డిగ్రీలు, pH 6.5 సాధారణంగా ఉంది.",
            "disease": "టమోటా పంటలో ఎర్లీ బ్లైట్ తెగులు గుర్తించబడింది. వర్షం తగ్గిన తర్వాత మందు పిచಿಕారీ చేయండి.",
            "default": "వ్యవసాయ సంక్షోభ సహాయం: 48మి.మీ భారీ వర్షం రానుంది. మోటారు ఆఫ్ చేయండి."
        },
        "ta": {
            "pesticide": "இன்று பூச்சிக்கொல்லி தெளிக்க வேண்டாம்! கனமழையால் மருந்து வீணாகும். வெள்ளிக்கிழமை தெளிக்கவும்.",
            "irrigation": "பாசனத்தை தொடங்க வேண்டாம்! மழை வரவிருப்பதால் பயிர்கள் அழுகும் அபாயம் உள்ளது.",
            "soil": "மண் ஈரப்பதம் 28%, வெப்பநிலை 29.4°C மற்றும் pH அளவு 6.5 ஆக உள்ளது.",
            "disease": "தக்காளி இலையில் ஏர்லி பிளைட் நோய் கண்டறியப்பட்டுள்ளது. பரிந்துரைக்கப்பட்ட பூஞ்சாணக்கொல்லியைப் பயன்படுத்தவும்.",
            "default": "விவசாய உதவி: 48 மி.மீ கனமழை வரவிருக்கிறது. பாசனத்தை உடனடியாக நிறுத்தவும்."
        },
        "mr": {
            "pesticide": "आज औषध फवारणी करू नका! मुसळधार पावसामुळे औषध वाहून जाईल. शुक्रवारी फवारणी करा.",
            "irrigation": "पंप सुरू करू नका! थोड्याच वेळात मोठा पाऊस येत आहे.",
            "soil": "तुमच्या शेतातील ओलावा २८%, तापमान २९.४ अंश आणि सामू ६.५ आहे.",
            "disease": "टोमॅटोवर अर्ली ब्लाइट रोगाचा प्रादुर्भाव झाला आहे. पाऊस थांबल्यानंतर योग्य बुरशीनाशक फवारा.",
            "default": "कृषी संकट नियंत्रण: मुसळधार पावसाचा इशारा. पाणी देणे त्वरित थांबवा."
        }
    }

    @classmethod
    def process_voice_query(cls, query_text: str, language: str = "kn") -> Dict[str, Any]:
        lang_dict = cls.VOICE_KNOWLEDGE_BASE.get(language, cls.VOICE_KNOWLEDGE_BASE["en"])
        q_lower = query_text.lower()

        intent = "general"
        if any(w in q_lower for w in ["spray", "pesticide", "ಸಿಂಪಡಿಸ", "कीटनाशक", "పిచికారీ", "தெளிக்க", "फवारणी"]):
            intent = "pesticide"
            resp = lang_dict["pesticide"]
        elif any(w in q_lower for w in ["irrigate", "water", "pump", "ನೀರಾವರಿ", "ನೀರು", "सिंचाई", "నీటిపారుదల", "பாசனம்", "पाणी"]):
            intent = "irrigation"
            resp = lang_dict["irrigation"]
        elif any(w in q_lower for w in ["soil", "moisture", "ph", "ಮಣ್ಣು", "मिट्टी", "నేల", "மண்", "माती"]):
            intent = "soil"
            resp = lang_dict["soil"]
        elif any(w in q_lower for w in ["disease", "blight", "fungus", "ರೋಗ", "रोग", "తెగులు", "நோய்"]):
            intent = "disease"
            resp = lang_dict["disease"]
        else:
            resp = lang_dict["default"]

        return {
            "detected_intent": intent,
            "language": language,
            "spoken_response": resp,
            "audio_synthesis_ready": True
        }

voice_service = MultilingualVoiceService()
