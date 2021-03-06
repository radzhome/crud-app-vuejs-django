"""project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from rest_framework import routers
from django.conf.urls import url
from django.conf import settings

from article_app.viewsets import ArticleViewSet


router = routers.DefaultRouter()

# router.register(r'article', ArticleViewSet)
router.register(r'article', ArticleViewSet, base_name='article_app')


urlpatterns = [
    path('admin/', admin.site.urls),
    # path('api/', include(router.urls)),
    url(r'^api/', include(router.urls)),
    path('article', TemplateView.as_view(template_name='index.html')),
    path('', TemplateView.as_view(template_name='index.html')),

]
# If not debug, nginx will fetch static files
if settings.DEBUG:
    from django.conf.urls.static import static
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
