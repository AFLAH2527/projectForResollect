from django.shortcuts import render
from rest_framework import viewsets
from .models import Author, Book, Member, Transaction
from .serializers import AuthorSerializer, BookSerializer, MemberSerializer, TransactionSerializer

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from django.db.models import Q
from rest_framework import status, viewsets

class AuthorViewSet(viewsets.ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer
    permission_classes = [AllowAny]

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [AllowAny]

    # def list(self, request):
    #     search_query = request.GET.get("search", "")
    #     books = Book.objects.filter(
    #         Q(title__icontains=search_query) | Q(author__icontains=search_query)
    #     )

    #     grouped_books = {}
    #     for book in books:
    #         category = book.category
    #         if category not in grouped_books:
    #             grouped_books[category] = []
    #         grouped_books[category].append(BookSerializer(book).data)

    #     return Response(grouped_books)

class MemberViewSet(viewsets.ModelViewSet):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer

class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        
        if 'access' in response.data:
            access_token = response.data['access']
            refresh_token = response.data['refresh']

            user = User.objects.get(username=request.data["username"])

            refresh = RefreshToken.for_user(user)
            refresh["username"] = user.username

            return Response({
                "token": str(refresh.access_token),
                "refresh": str(refresh),
                "user": {
                    "id": user.id,
                    "username": user.username
                }
            })

        return Response({"error": "Invalid credentials"}, status=400)
    
    
@api_view(["POST"])
@permission_classes([AllowAny])
def register(request):
    username = request.data.get("username")
    password = request.data.get("password")

    if not username or not password:
        return Response({"error": "Username and password are required"}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, password=password)
    return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
