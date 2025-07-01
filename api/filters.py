import django_filters
from django.db import models
from .models import Car

class CarFilter(django_filters.FilterSet):
    # Keyword search for make, model, and description (case-insensitive contains)
    keyword = django_filters.CharFilter(
        method='filter_by_keyword',
        label='Search by keyword (model, location, description)',
    )

    # Greater than or equal to price
    price_gte = django_filters.NumberFilter(
        field_name='price_per_day',
        lookup_expr='gte',
        label='Price (greater than or equal to)',
    )

    # Less than or equal to price
    price_lte = django_filters.NumberFilter(
        field_name='price_per_day',
        lookup_expr='lte',
        label='Price (less than or equal to)',
    )

    class Meta:
        model = Car
        fields = ['car_model', 'description', 'price_per_day', 'location',] # Add other fields you might want to filter directly

    def filter_by_keyword(self, queryset, name, value):
        # This method handles the 'keyword' filter
        if value:
            return queryset.filter(
                models.Q(car_model__icontains=value) |
                models.Q(location__icontains=value) |
                models.Q(description__icontains=value)
            )
        return queryset