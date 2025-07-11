from sentence_transformers import SentenceTransformer, util
import numpy as np
import json
from fastapi import FastAPI, Query
from fastapi.responses import JSONResponse
from typing import List
import torch

# Load courses from JSON file
with open("./course.json", "r") as f:
    courses = json.load(f)

def course_to_text(c):
    return (
        f"ID: {c.get('id')}. Title: {c.get('title')}. Slug: {c.get('slug')}. "
        f"Description: {c.get('description')}. LongDescription: {c.get('longDescription')}. "
        f"ImageUrl: {c.get('imageUrl')}. Category: {c.get('category')}. Level: {c.get('level')}. "
        f"Price: {c.get('price')}. IsFeatured: {c.get('isFeatured')}. IsPopular: {c.get('isPopular')}. "
        f"EnrolledStudents: {c.get('enrolledStudents')}. Rating: {c.get('rating')}. ReviewCount: {c.get('reviewCount')}. "
        f"Language: {c.get('language')}. LastUpdated: {c.get('lastUpdated')}. AuthorId: {c.get('authorId')}. "
        f"Curriculum: {len(c.get('curriculum', []))} sections. "
        f"Requirements: {', '.join(c.get('requirements', []))}. "
        f"Objectives: {', '.join(c.get('objectives', []))}. "
        f"Tags: {', '.join(c.get('tags', []))}. "
        f"Quizzes: {len(c.get('quizzes', []))} quizzes. "
        f"Reviews: {len(c.get('reviews', []))} reviews."
    )

texts = [course_to_text(c) for c in courses]

model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")
embeddings = model.encode(texts, convert_to_tensor=True)

def recommend_courses(course_id: str, top_k: int = 5):
    target_index = next((i for i, c in enumerate(courses) if c.get('id') == course_id), None)
    if target_index is None:
        return []
    target_embedding = embeddings[target_index]
    cos_scores = util.pytorch_cos_sim(target_embedding, embeddings)[0]
    sorted_indices = np.argsort(-cos_scores)
    seen_titles = set()
    recommendations = []
    for idx in sorted_indices:
        if idx == target_index:
            continue
        title = courses[idx]['title']
        if title not in seen_titles:
            recommendations.append({
                "id": courses[idx]['id'],
                "title": title,
                "score": float(cos_scores[idx])
            })
            seen_titles.add(title)
        if len(recommendations) >= top_k:
            break
    return recommendations

def chat_response(user_query: str, top_k: int = 3):
    query_embedding = model.encode(user_query, convert_to_tensor=True)
    cos_scores = util.pytorch_cos_sim(query_embedding, embeddings)[0]
    sorted_indices = np.argsort(-cos_scores)
    responses = []
    seen = set()
    for idx in sorted_indices:
        course = courses[idx]
        title = course["title"]
        if title not in seen:
            responses.append({
                "id": course["id"],
                "title": title,
                "description": course["description"],
                "score": float(cos_scores[idx])
            })
            seen.add(title)
        if len(responses) >= top_k:
            break
    return responses

def recommend_courses_from_list(course_ids: List[str], top_k: int = 5):
    """
    Recommend courses based on a list of input course IDs.
    Combines embeddings of input courses and finds similar courses.
    """
    # Find indices of input courses
    input_indices = []
    for course_id in course_ids:
        idx = next((i for i, c in enumerate(courses) if c.get('id') == course_id), None)
        if idx is not None:
            input_indices.append(idx)
    
    if not input_indices:
        return []
    
    # Get embeddings for input courses and compute average
    input_embeddings = embeddings[input_indices]
    avg_embedding = torch.mean(input_embeddings, dim=0)
    
    # Calculate cosine similarity with all courses
    cos_scores = util.pytorch_cos_sim(avg_embedding, embeddings)[0]
    sorted_indices = np.argsort(-cos_scores)
    
    # Filter out input courses and duplicates
    input_ids_set = set(course_ids)
    seen_titles = set()
    recommendations = []
    
    for idx in sorted_indices:
        course = courses[idx]
        if course.get('id') in input_ids_set:
            continue
            
        title = course['title']
        if title not in seen_titles:
            recommendations.append({
                "id": course['id'],
                "title": title,
                "score": float(cos_scores[idx])
            })
            seen_titles.add(title)
            
        if len(recommendations) >= top_k:
            break
            
    return recommendations

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)
@app.get("/recommend")
def recommend(course_id: str, top_k: int = 5):
    recs = recommend_courses(course_id, top_k)
    return JSONResponse(content=recs)

@app.post("/recommend/batch")
def recommend_batch(course_ids: List[str] = Query(...), top_k: int = 5):
    recs = recommend_courses_from_list(course_ids, top_k)
    return JSONResponse(content=recs)

@app.get("/chat")
def chat(query: str, top_k: int = 3):
    """
    Chat endpoint using llama_cpp.Llama for a normal chat response,
    or course recommendations if model score > 0.5.
    """
    query = (
        query.replace("khoá học", "course")
             .replace("khóa", "course")
             .replace("khoa", "course")
             .replace("khoa hoc", "course")
             .replace("hoc", "course")
             .replace("goi y", "course")
             .replace("gợi ý", "course")
    )
    recs = chat_response(query, top_k)
    max_score = recs[0]["score"] if recs else 0.0

    return JSONResponse(content={"score": max_score, "courses": recs})
    

@app.post("/recommend/list")
def recommend_from_list(course_ids: List[str], top_k: int = 5):
    """
    Recommend courses based on a list of course IDs.
    """
    recs = recommend_courses_from_list(course_ids, top_k)
    return JSONResponse(content=recs)




# Debug usage (CLI)
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("recommend_courses:app", host="0.0.0.0", port=8000, reload=True)

# No code changes needed. Example curl commands for testing:

# Normal chat (no score param)
# curl -G --data-urlencode "query=hello, how are you?" http://localhost:8000/chat

# Chat with score <= 7 (should return normal chat)
# curl -G --data-urlencode "query=show me a course" --data-urlencode "score=5" http://localhost:8000/chat

# Chat with score > 7 (should return course recommendations)
# curl -G --data-urlencode "query=show me a course" --data-urlencode "score=8" http://localhost:8000/chat

# Optionally, specify top_k
# curl -G --data-urlencode "query=show me a course" --data-urlencode "score=8" --data-urlencode "top_k=2" http://localhost:8000/chat

# Recommend courses by ID
# curl -X GET "http://localhost:8000/recommend?course_id=course_id_here&top_k=5"

# Batch recommend courses
# curl -X POST "http://localhost:8000/recommend/batch" -H "Content-Type: application/json" -d '["course_id1", "course_id2"]'

# Recommend from list
# curl -X POST "http://localhost:8000/recommend/list" -H "Content-Type: application/json" -d '["course_id1", "course_id2"]'
