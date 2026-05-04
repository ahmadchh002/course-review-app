from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from app.models.course import Course
from app.models.review import Review
from app.schemas.course import CourseCreate, CourseUpdate, CourseOut
from app.core.security import get_current_user
from app.models.user import User

router = APIRouter()

@router.post("/", response_model=CourseOut, status_code=201)
async def create_course(course_data: CourseCreate, current_user: User = Depends(get_current_user)):
    # Only admin can create courses; for simplicity, check if user email contains "admin"
    # You can enhance this with roles later
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    
    existing = await Course.find_one(Course.code == course_data.code)
    if existing:
        raise HTTPException(status_code=400, detail="Course code already exists")
    
    course = Course(**course_data.dict())
    await course.insert()
    return CourseOut(id=str(course.id), **course_data.dict(), avg_rating=0.0, review_count=0)

@router.get("/", response_model=List[CourseOut])
async def list_courses(skip: int = 0, limit: int = 100):
    courses = await Course.find_all().skip(skip).limit(limit).to_list()
    return [
        CourseOut(
            id=str(c.id), code=c.code, name=c.name,
            description=c.description,
            avg_rating=c.avg_rating,
            review_count=c.review_count
        ) for c in courses
    ]

@router.get("/{course_id}", response_model=CourseOut)
async def get_course(course_id: str):
    course = await Course.get(course_id)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return CourseOut(id=str(course.id), code=course.code, name=course.name,
                     description=course.description,
                     avg_rating=course.avg_rating,
                     review_count=course.review_count)

@router.put("/{course_id}", response_model=CourseOut)
async def update_course(course_id: str, update_data: CourseUpdate, current_user: User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    
    course = await Course.get(course_id)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    for field, value in update_data.dict(exclude_unset=True).items():
        setattr(course, field, value)
    await course.save()
    return CourseOut(id=str(course.id), code=course.code, name=course.name,
                     description=course.description,
                     avg_rating=course.avg_rating,
                     review_count=course.review_count)

@router.delete("/{course_id}")
async def delete_course(course_id: str, current_user: User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    
    course = await Course.get(course_id)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    await course.delete()
    return {"detail": "Course deleted"}