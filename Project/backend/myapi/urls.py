from django.urls import path
from myapi import views

urlpatterns = [
    path('register/', views.register),
    path('login/', views.login),
    path('test_token/', views.test_token),
    path('logout/', views.logout),
    path('create_admin/', views.create_admin),
    path('create_support/', views.create_support),
    path('create_category/', views.create_category),
    path('create_product/', views.create_product),
    path('create_item/', views.create_item),
    path('categories/', views.category_list),
    path('products/', views.product_list),
    path('product/<int:id>/', views.product_detail),
    path('create_order/', views.create_order),
    path('create_user_review/', views.create_user_review),
    path('user_reviews/', views.user_reviews),
    path('this_user_reviews/', views.this_user_reviews),
    path('finalize_order/', views.finalize_order),
    path('update_order/', views.update_order),
    path('get_cart/', views.get_cart),
    path('purchased_items/', views.purchased_items),
    path('groups/', views.groups)
]
