from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView, 
    TokenRefreshView, 
    TokenBlacklistView,
)
from api import views
from rest_framework import routers




router = routers.DefaultRouter()
router.register(r'cars', views.CarViewSet)
router.register(r'users', views.UserViewSet)

urlpatterns = [
    # router
    path('', include(router.urls)),

    # Auth
    path('auth/signup/', views.UserSignupView.as_view(), name='signup'),
    path('auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/token/blacklist/', TokenBlacklistView.as_view(), name='token_blacklist'),
    
    # Review
    path('cars/<int:pk>/reviews/', views.ReviewListCreateView.as_view(), name='car-reviews'),
    path('reviews/<int:pk>/', views.ReviewReadUpdateDeleteView.as_view(), name='reviews'),

    # Image
    path('cars/<int:pk>/images/', views.CarImageListCreateView.as_view(), name='car-images'),
    path('image/<int:pk>/delete/', views.CarImageDeleteView.as_view(), name='delete-image'),
]
