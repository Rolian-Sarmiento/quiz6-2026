from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import SellerApplication
from .serializers import SellerApplicationSerializer

class SubmitApplicationView(generics.CreateAPIView):
    serializer_class = SellerApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ListApplicationView(generics.ListAPIView):
    queryset = SellerApplication.objects.all()
    serializer_class = SellerApplicationSerializer
    permission_classes = [permissions.IsAdminUser]

class ApproveApplicationView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def post(self, request, pk):
        try:
            application = SellerApplication.objects.get(pk=pk)
            application.status = 'Approved'
            application.save()
            user = application.user
            user.role = 'Seller'
            user.is_expert = True
            user.save()
            
            return Response({'message': 'Application approved and user upgraded to Seller.'})
        except SellerApplication.DoesNotExist:
            return Response({'error': 'Application not found'}, status=status.HTTP_404_NOT_FOUND)

class DeclineApplicationView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def post(self, request, pk):
        try:
            application = SellerApplication.objects.get(pk=pk)
            application.status = 'Declined'
            application.decline_reason = request.data.get('decline_reason', 'No reason provided.')
            application.save()
            return Response({'message': 'Application declined.'})
        except SellerApplication.DoesNotExist:
            return Response({'error': 'Application not found'}, status=status.HTTP_404_NOT_FOUND)