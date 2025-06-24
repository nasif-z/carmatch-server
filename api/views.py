from django.shortcuts import get_object_or_404
from rest_framework import viewsets, generics
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, action
from api.models import (
    CarImage, 
    Car, 
    Review, 
)
from api.permissions import IsSelfOrReadOnly, IsOwnerOrReadOnly, IsCarOwner
from api.serializers import (
    UserSignupSerializer, 
    UserSerializer,
    CarImageSerializer, 
    CarSerializer, 
    ReviewSerializer, 
)
from django.contrib.auth import get_user_model




User = get_user_model()


class UserSignupView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSignupSerializer
    permission_classes = [permissions.AllowAny,]


class UserViewSet(viewsets.ModelViewSet):
    """
    get:
    Returns a list of all users.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsSelfOrReadOnly]

    @action(
            methods=['GET', 'PUT', 'PATCH'], 
            detail=False,
            permission_classes=[permissions.IsAuthenticated, IsSelfOrReadOnly]
        )
    def me(self, request):
        """
        get: 
        Returns the current authenticated user's profile.

        put:
        Updates the current user's profile with all fields.

        patch: 
        Partially updates the current user's profile with specified fields.
        """
        # retrieve
        if request.method == 'GET':
            serializer = self.get_serializer(request.user)
            return Response(serializer.data)
        # update
        elif request.method == 'PUT' or request.method == 'PATCH':
            partial = request.method == 'PATCH'
            serializer = self.get_serializer(
                instance=request.user, 
                data=request.data, 
                partial=partial
            )
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)


class CarViewSet(viewsets.ModelViewSet):
    """
    get: 
    Gets list of all Car objects.

    put: 
    Updates Car object.

    patch: 
    Partially updates Car object.

    delete: 
    Deletes Car object.
    """
    queryset = Car.objects.all()
    serializer_class = CarSerializer
    permission_classes = [IsOwnerOrReadOnly,]

    # set car.owner to current user when creating Car object
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class CarImageListCreateView(generics.ListCreateAPIView):
    """
    get: 
    Gets list of images related to the Car object.

    post: 
    Uploads new image and relates it to the Car object.
    """
    serializer_class = CarImageSerializer
    permission_classes = [IsCarOwner]

    # return all images for car.id
    def get_queryset(self):
        pk = self.kwargs["pk"]
        car = get_object_or_404(Car, pk=pk)
        return CarImage.objects.filter(car=car)

    # create new image, sets car to car.id
    def perform_create(self, serializer):
        pk = self.kwargs["pk"]
        car = get_object_or_404(Car, pk=pk)
        serializer.save(car=car)


class CarImageDeleteView(generics.DestroyAPIView):
    """
    delete: 
    Deletes the CarImage object.
    """
    queryset = CarImage.objects.all()
    serializer_class = CarImageSerializer
    permission_classes = [IsOwnerOrReadOnly,]


class ReviewListCreateView(generics.ListCreateAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [IsOwnerOrReadOnly,]

    # return all reviews for car.id
    def get_queryset(self):
        pk = self.kwargs["pk"]
        car = get_object_or_404(Car, pk=pk)
        return Review.objects.filter(car=car)

    # create new review, sets owner to current user and car to car.id
    def perform_create(self, serializer):
        pk = self.kwargs["pk"]
        car = get_object_or_404(Car, pk=pk)
        serializer.save(owner=self.request.user, car=car)


class ReviewReadUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    """
    get: 
    Get Review object by pk.

    put/patch: 
    Update/partially update Review object by pk.

    delete: 
    Delete Review object by pk.
    """
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsOwnerOrReadOnly,]
    lookup_field = "pk"



