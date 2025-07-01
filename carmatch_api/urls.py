from django.contrib import admin
from django.urls import path, include, re_path
from django.conf.urls.static import static
from django.conf import settings
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView, SpectacularRedocView
from django.views.generic import TemplateView
import os




urlpatterns = [
    # django
    path('admin/', admin.site.urls),

    # drf
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api/', include('api.urls')),
    
    # drf-spectacular URLs
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    # Optional UI:
    path('api/schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/schema/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),

    path('', TemplateView.as_view(template_name='index.html')),
]
# media
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static('/assets/', document_root=os.path.join(settings.BASE_DIR, 'frontend', 'dist', 'assets'))
