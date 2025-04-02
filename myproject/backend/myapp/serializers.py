from rest_framework import serializers
from .models import Author, Book, Member, Transaction, Category

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class BookSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source="category.name", read_only=True)
    author_name = serializers.CharField(source="author.name", read_only=True)

    class Meta:
        model = Book
        fields = ["id", "title", "author", "author_name", "category", "category_name", "published_date", "available"]

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = '__all__'

class TransactionSerializer(serializers.ModelSerializer):
    book_title = serializers.ReadOnlyField(source='book.title')
    member_name = serializers.ReadOnlyField(source='member.name')

    class Meta:
        model = Transaction
        fields = '__all__'
