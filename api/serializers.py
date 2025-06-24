from .models import CarImage, Car, Review
from rest_framework import serializers
from django.contrib.auth import get_user_model




User = get_user_model()

class UserSignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'password',)

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'profile_picture',
            'first_name',
            'last_name',
            'phone',
        ]


class CarImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = CarImage
        fields = ['id','uploaded_at', 'car', 'image', 'is_thumbnail',]
        read_only_fields = ['id', 'uploaded_at',]


class CarSerializer(serializers.ModelSerializer):
    images = CarImageSerializer(many=True)

    class Meta:
        model = Car
        fields = "__all__"
        read_only_fields = ['owner','created_at',]


class ReviewSerializer(serializers.ModelSerializer):

    class Meta:
        model = Review
        fields = [
            "id",
            "owner",
            "car", 
            "created_at", 
            "updated_at", 
            "stars", 
            "comment", 
        ]
        read_only_fields = (
            "id", 
            "owner", 
            "car", 
            "created_at", 
            "updated_at", 
        )

        def validate_stars(self, value):
            if value < 1 or value > 5:
                raise serializers.ValidationError("Stars must be an integer from 1 to 5 inclusive.")
            return value
        
        