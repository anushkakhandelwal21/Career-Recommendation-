# Use Python official image for the backend
FROM python:3.9-slim

# Set the working directory for the backend
WORKDIR /app

# Copy the backend requirements file
COPY backend/requirements.txt ./

# Install backend dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend source code
COPY backend/ ./

# Install Flask and Flask-CORS
RUN pip install flask flask-cors

# Expose the port on which the backend will run
EXPOSE 5000

# Set environment variables
ENV FLASK_APP=/app/app.py

# Start the Flask application
CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]
