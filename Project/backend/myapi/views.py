from rest_framework.decorators import api_view
from rest_framework.response import Response

from rest_framework import status
from .serializers import GroupSerializer, UserSerializer, ProductSerializer, CategorySerializer, ItemSerializer, UserReviewSerializer, OrderSerializer
from .models import Product, Category, Item, UserReview, Order
from django.contrib.auth.models import Group, User
from rest_framework.authtoken.models import Token

from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated, BasePermission
import datetime

class IsAdminUser(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and (request.user.is_authenticated and request.user.groups.filter(name='admin').exists() or request.user.is_staff))

from django.shortcuts import get_object_or_404
### Authentication

@api_view(['POST'])
def register(request):
    serializer = UserSerializer(data=request.data)
    print(request.data)
    if serializer.is_valid():
        user = serializer.save()
        user.set_password(user.password)
        user.save()
        group = Group.objects.get(name='customer')
        user.groups.add(group)
        token = Token.objects.create(user=user)
        return Response({'token': token.key}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login(request):
    user = get_object_or_404(User, username=request.data['username'])
    if not user.check_password(request.data['password']):
        return Response({"detail":"Wrong Password."}, status=status.HTTP_400_BAD_REQUEST)
    token, created = Token.objects.get_or_create(user=user)
    serializer = UserSerializer(instance=user)
    return Response({'token': token.key, "user": serializer.data}, status=status.HTTP_200_OK)

@api_view(['GET'])
def groups(request):
    groups = Group.objects.all()
    serializer = GroupSerializer(groups, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def test_token(request):
    return Response("OK")

@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def logout(request):
    request.auth.delete()
    return Response("OK")

# create admin
@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAdminUser])
def create_admin(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        user.set_password(user.password)
        user.save()
        group = Group.objects.get(name='admin')
        user.groups.add(group)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# create support
@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAdminUser])
def create_support(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        user.set_password(user.password)
        user.save()
        group = Group.objects.get(name='support')
        user.groups.add(group)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# create category
@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAdminUser])
def create_category(request):
    serializer = CategorySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        # handle image file
        if 'image' in request.data:
            category = Category.objects.get(id=serializer.data['id'])
            category.image = request.data['image']
            category.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# create product
@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAdminUser])
def create_product(request):
    serializer = ProductSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# create item
@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAdminUser])
def create_item(request):
    serializer = ItemSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# create user review
@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def create_user_review(request):
    serializer = UserReviewSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# create order
@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def create_order(request):
    product = Product.objects.get(id=request.data['product'])
    request.data['order_date'] = datetime.datetime.now()
    request.data['user'] = request.user.id
    print(request.data)
    serializer = OrderSerializer(data=request.data)
    if serializer.is_valid():
        # check if in stock
        if serializer.validated_data['product'].item_set.filter(is_owned=False).count() < serializer.validated_data['quantity']:
            return Response("Not enough stock", status=status.HTTP_400_BAD_REQUEST)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    print('invalid data', serializer.errors)
    return Response('Invalid data', status=status.HTTP_400_BAD_REQUEST)

# get categories list
@api_view(['GET'])
def category_list(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    print(serializer.data)
    return Response(serializer.data)

# get products list
@api_view(['GET'])
def product_list(request):
    # handle search
    if 'search' in request.GET:
        products = Product.objects.filter(name__icontains=request.GET['search'])
    # handle category
    elif 'category' in request.GET:
        products = Product.objects.filter(category=request.GET['category'])
    else:
        products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    # handle stocks
    for product in serializer.data:
        product['stock'] = Item.objects.filter(product=product['id']).filter(is_owned=False).count()
    # handle files
    return Response(serializer.data, status=status.HTTP_200_OK)


# get product detail
@api_view(['GET'])
def product_detail(request, id):
    try:
        product = Product.objects.get(id=id)
    except Product.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = ProductSerializer(product)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_cart(request):
    print(request.user)
    orders = Order.objects.filter(user=request.user).filter(is_finalized=False)
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def finalize_order(request):
    orders = Order.objects.filter(user=request.user).filter(is_finalized=False)
    for order in orders:
        order.is_finalized = True
        # set items to owned
        items = order.product.item_set.filter(is_owned=False)[:order.quantity]
        for item in items:
            item.is_owned = True
            item.user = request.user
            item.save()
        order.save()
    return Response("OK")


@api_view(['PUT'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def update_order(request):
    order = Order.objects.get(id=request.data['id'])
    # check if quantity is valid
    if request.data['quantity'] < 0:
        return Response("Invalid quantity", status=status.HTTP_400_BAD_REQUEST)
    # if quantity is 0, delete the order
    if request.data['quantity'] == 0:
        order.delete()
        return Response("OK")
    # check if in stock
    if order.product.item_set.filter(is_owned=False).count() < request.data['quantity']:
        return Response("Not enough stock", status=status.HTTP_400_BAD_REQUEST)
    order.quantity = request.data['quantity']
    order.save()
    serializer = OrderSerializer(order)
    return Response(serializer.data, status=status.HTTP_200_OK)

# get purchased items
@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def purchased_items(request):
    items = Item.objects.filter(user=request.user).filter(is_owned=True)
    serializer = ItemSerializer(items, many=True)
    return Response(serializer.data)

# get user reviews
@api_view(['GET'])
def user_reviews(request):
    # filter by product
    if 'product' in request.GET:
        reviews = UserReview.objects.filter(product=request.GET['product'])
    else:
        reviews = UserReview.objects.all()
    serializer = UserReviewSerializer(reviews, many=True)
    return Response(serializer.data)

# get this user reviews
@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def this_user_reviews(request):
    reviews = UserReview.objects.filter(user=request.user)
    serializer = UserReviewSerializer(reviews, many=True)
    return Response(serializer.data)

