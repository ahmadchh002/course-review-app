from fastapi import APIRouter, Depends, HTTPException, status
from app.models.user import User
from app.schemas.user import UserCreate, UserLogin, UserOut, Token
from app.core.security import get_password_hash, verify_password, create_access_token, get_current_user
from beanie import PydanticObjectId

router = APIRouter()

@router.post("/signup", response_model=UserOut)
async def register(user_data: UserCreate):
    # Check if user already exists
    existing = await User.find_one(User.email == user_data.email)
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed = get_password_hash(user_data.password)
    user = User(
        email=user_data.email,
        hashed_password=hashed,
        full_name=user_data.full_name,
    )
    await user.insert()
    return UserOut(id=str(user.id), email=user.email, full_name=user.full_name, is_active=user.is_active, created_at=user.created_at)

@router.post("/login", response_model=Token)
async def login(user_data: UserLogin):
    user = await User.find_one(User.email == user_data.email)
    if not user or not verify_password(user_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    access_token = create_access_token(data={"sub": str(user.id)})
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me", response_model=UserOut)
async def get_me(current_user: User = Depends(get_current_user)):
    return UserOut(id=str(current_user.id), email=current_user.email, full_name=current_user.full_name, is_active=current_user.is_active, created_at=current_user.created_at)