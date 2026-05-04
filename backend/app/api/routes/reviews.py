from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from app.models.review import Review
from app.models.course import Course
from app.schemas.review import ReviewCreate, ReviewUpdate, ReviewOut
from app.core.security import get_current_user
from app.models.user import User
from beanie import PydanticObjectId

router = APIRouter()

@router.post("/", response_model=ReviewOut, status_code=201)
async def create_review(review_data: ReviewCreate, current_user: User = Depends(get_current_user)):
    # Verify that the course exists
    course = await Course.find_one(Course.code == review_data.course_code)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    # Check if user already reviewed this course
    existing = await Review.find_one(
        Review.user_id == current_user.id,
        Review.course_code == review_data.course_code
    )
    if existing:
        raise HTTPException(status_code=400, detail="You have already reviewed this course")
    
    review = Review(
        user_id=current_user.id,
        course_code=review_data.course_code,
        rating=review_data.rating,
        content=review_data.content,
        grade=review_data.grade,
        difficulty_level=review_data.difficulty_level or review_data.rating,
        resources=review_data.resources,
        goodInstructors=review_data.goodInstructors,
        badInstructors=review_data.badInstructors,
    )
    await review.insert()
    
    # Update course average rating
    all_reviews = await Review.find(Review.course_code == review_data.course_code).to_list()
    avg = sum(r.rating for r in all_reviews) / len(all_reviews)
    course.avg_rating = round(avg, 2)
    await course.save()
    
    return ReviewOut(
        id=str(review.id),
        user_id=str(review.user_id),
        course_code=review.course_code,
        rating=review.rating,
        content=review.content,
        grade=review.grade,
        difficulty_level=review.difficulty_level,
        resources=review.resources,
        goodInstructors=review.goodInstructors,
        badInstructors=review.badInstructors,
        created_at=review.created_at
    )

@router.get("/course/{course_code}", response_model=List[ReviewOut])
async def get_reviews_for_course(course_code: str):
    reviews = await Review.find(Review.course_code == course_code).to_list()
    return [
        ReviewOut(
            id=str(r.id),
            user_id=str(r.user_id),
            course_code=r.course_code,
            rating=r.rating,
            content=r.content,
            grade=r.grade,
            difficulty_level=r.difficulty_level,
            resources=r.resources,
            goodInstructors=r.goodInstructors,
            badInstructors=r.badInstructors,
            created_at=r.created_at
        ) for r in reviews
    ]

@router.put("/{review_id}", response_model=ReviewOut)
async def update_review(review_id: str, update_data: ReviewUpdate, current_user: User = Depends(get_current_user)):
    review = await Review.get(review_id)
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    
    # Only the author can update
    if review.user_id != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    
    for field, value in update_data.dict(exclude_unset=True).items():
        setattr(review, field, value)
    await review.save()
    
    # Recompute average rating for the course
    all_reviews = await Review.find(Review.course_code == review.course_code).to_list()
    if all_reviews:
        avg = sum(r.rating for r in all_reviews) / len(all_reviews)
        course = await Course.find_one(Course.code == review.course_code)
        if course:
            course.avg_rating = round(avg, 2)
            await course.save()
    
    return ReviewOut(
        id=str(review.id),
        user_id=str(review.user_id),
        course_code=review.course_code,
        rating=review.rating,
        content=review.content,
        grade=review.grade,
        difficulty_level=review.difficulty_level,
        resources=review.resources,
        goodInstructors=review.goodInstructors,
        badInstructors=review.badInstructors,
        created_at=review.created_at
    )

@router.delete("/{review_id}")
async def delete_review(review_id: str, current_user: User = Depends(get_current_user)):
    review = await Review.get(review_id)
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    
    if review.user_id != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    
    course_code = review.course_code
    await review.delete()
    
    # Recompute average rating
    remaining = await Review.find(Review.course_code == course_code).to_list()
    course = await Course.find_one(Course.code == course_code)
    if course:
        if remaining:
            avg = sum(r.rating for r in remaining) / len(remaining)
            course.avg_rating = round(avg, 2)
        else:
            course.avg_rating = 0.0
        await course.save()
    
    return {"detail": "Review deleted"}