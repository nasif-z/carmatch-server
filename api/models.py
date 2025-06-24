from django.db import models
from django.contrib.auth.models import AbstractUser




class User(AbstractUser): 
    profile_picture = models.ImageField(upload_to="profile_pictures/", blank=True)
    phone = models.CharField(max_length=20, blank=True)

    def __str__(self):
        return f"{self.username}"


class CarImage(models.Model):
    uploaded_at = models.DateTimeField(auto_now_add=True)
    car = models.ForeignKey('Car', on_delete=models.CASCADE, related_name='images')

    image = models.ImageField(upload_to='car_images/')
    is_thumbnail = models.BooleanField(default=False)

    def __str__(self):
        return f"Image for {self.car.owner}'s {self.car}"


# TODO: add booking model
class Car(models.Model):
    owner = models.ForeignKey('User', on_delete=models.CASCADE, related_name='cars')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    is_available = models.BooleanField(default=True)
    car_model = models.CharField(max_length=100)
    description = models.TextField()
    location = models.CharField(max_length=255)
    price_per_day = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.car_model}"
    

# TODO: add images to review
class Review(models.Model):
    owner = models.ForeignKey('User', on_delete=models.CASCADE, related_name='reviews')
    car = models.ForeignKey('Car', on_delete=models.CASCADE, related_name='reviews')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    stars = models.PositiveSmallIntegerField()
    comment = models.TextField()

    def __str__(self):
        return f"{self.owner} on {self.car}"

    class Meta:
        # A renter can only post one review per car
        unique_together = ["owner", "car"]