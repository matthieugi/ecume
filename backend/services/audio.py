import os
from azure.cognitiveservices.speech import AudioDataStream
import azure.cognitiveservices.speech as speechsdk

SPEECH_KEY = os.environ.get('SPEECH_KEY')
SPEECH_REGION = os.environ.get('SPEECH_REGION', 'francecentral')
SPEECH_VOICE = os.environ.get('SPEECH_VOICE', 'fr-FR-MauriceNeural')

langs = ['celeste vielle', 'Yvette Pia', '' ]

# This example requires environment variables named "SPEECH_KEY" and "SPEECH_REGION"
speech_config = speechsdk.SpeechConfig(subscription=SPEECH_KEY, region=SPEECH_REGION)
speech_config.speech_synthesis_voice_name=SPEECH_VOICE


def create_audio(filename, text):
    file_path = f"{filename}.wav"
    audio_config = speechsdk.audio.AudioOutputConfig(filename=file_path)

    speech_synthesizer = speechsdk.SpeechSynthesizer(speech_config=speech_config, audio_config=audio_config)
    speech_synthesis_result = speech_synthesizer.speak_text_async(text).get()

    if speech_synthesis_result.reason == speechsdk.ResultReason.SynthesizingAudioCompleted:
        print("Speech synthesized for text [{}]".format(text))
        return True

    elif speech_synthesis_result.reason == speechsdk.ResultReason.Canceled:
        cancellation_details = speech_synthesis_result.cancellation_details
        print("Speech synthesis canceled: {}".format(cancellation_details.reason))
        if cancellation_details.reason == speechsdk.CancellationReason.Error:
            if cancellation_details.error_details:
                print("Error details: {}".format(cancellation_details.error_details))
        return False
