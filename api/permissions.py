from rest_framework import permissions




class IsSelfOrReadOnly(permissions.BasePermission):
    """
    Custom permission class for allowing authenticated users
    to only update their own user object, otherwise readonly.
    """

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj == request.user
    

class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission class for allowing any user to read, 
    but only owner to update object. Only authenticated users
    can create.
    """
    
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.owner == request.user
    

class IsCarOwner(permissions.BasePermission):
    """
    Custom permission class, primarily for image upload, 
    checks if the related car is owned by the current user.
    """

    def has_object_permission(self, request, view, obj):
        return obj.car.owner == request.user
    
