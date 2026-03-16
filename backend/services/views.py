from rest_framework import generics, permissions
from .models import Service
from .serializers import ServiceSerializer

# Public Views (Anyone can see services)
class ServiceListView(generics.ListAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [permissions.AllowAny]

class ServiceDetailView(generics.RetrieveAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [permissions.AllowAny]

# Seller Views (Only Sellers can create/edit their own services)
class SellerServiceManageView(generics.ListCreateAPIView):
    serializer_class = ServiceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Sellers only see their own services in the management dashboard
        return Service.objects.filter(seller=self.request.user)

    def perform_create(self, serializer):
        # Automatically attach the logged-in seller to the new service
        serializer.save(seller=self.request.user)

class SellerServiceDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ServiceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Ensure a seller can only edit/delete their OWN service
        return Service.objects.filter(seller=self.request.user)