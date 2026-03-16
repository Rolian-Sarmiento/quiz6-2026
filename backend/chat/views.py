from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions

class AIChatbotView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        user_message = request.data.get('message', '')
        
        bot_reply = f"I am a dummy AI. You said: '{user_message}'. I am ready to be wired up to a real LLM!"
        
        return Response({'reply': bot_reply})