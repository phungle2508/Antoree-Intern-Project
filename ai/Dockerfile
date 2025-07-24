FROM python:3.12-slim

# Install system dependencies
RUN apt update && apt install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt install -y nodejs && \
    npm install -g pm2 && \
    apt clean

# Set working directory
WORKDIR /app

# Copy requirements first (for Docker caching)
COPY requirements.txt .

# Install Python dependencies
RUN pip install --upgrade pip && \
    pip install -r requirements.txt

# Copy application code
COPY . .

# Expose app port
EXPOSE 8000

# Start app with PM2
CMD ["pm2", "start", "uvicorn", "--name", "ai-backend", "--interpreter", "python3", "--", "recommend_courses:app", "--host", "0.0.0.0", "--port", "8000", "--reload", "--log-level", "info"]
