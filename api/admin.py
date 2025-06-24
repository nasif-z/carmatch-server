from django.contrib import admin
from api.models import (
    User, 
    Car, 
    CarImage, 
    Review
)




admin.site.register(
    [
        User, 
        Car, 
        CarImage, 
        Review, 
    ]
)