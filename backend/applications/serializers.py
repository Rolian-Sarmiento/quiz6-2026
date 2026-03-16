from rest_framework import serializers
from .models import SellerApplication

class SellerApplicationSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = SellerApplication
        fields = ['id', 'user', 'username', 'status', 'decline_reason', 'created_at']
        read_only_fields = ['user', 'status', 'decline_reason']